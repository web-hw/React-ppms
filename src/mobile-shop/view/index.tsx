import * as React from 'react'
import { observer, inject } from 'mobx-react'

import { cache, session } from 'global@util/storage'
import { LOGIN_MSG, HISTORY_STATE } from 'global@constant'
import { ams } from 'global@util/init'
import { serialize } from 'global@util/serialize'
import { onChangeURL, goBack, onBackButton } from 'global@util/history'
import BaseApp from 'global@component/app'
import { getPlus } from 'global@util/plus'
import { toast } from 'global@util/toast/mobile'
import { chat } from '../store/chat'
import { user } from '../store/user'
import { REPEAT_SEND } from '../constant'

const initPlus = () => {
  let isOnline = true
  let timer: any = null
  let currmsg: { title: string; content: string; payload: string } = null

  const onClickMsg = (msg: any) => {
    if (!msg) {
      return
    }

    currmsg = null

    // Todo根据消息类型切换 对应逻辑
    session.remove(HISTORY_STATE)
    ams.get().history.replace('/') // 聊天消息
  }

  document.addEventListener(
    'pause',
    () => {
      isOnline = false
      currmsg = null
      // 延迟10s断开连接
      timer = setTimeout(() => {
        timer = null
        chat.closeWs()
      },                 10 * 1000)
    },
    false
  )

  document.addEventListener(
    'resume',
    () => {
      isOnline = true
      onClickMsg(currmsg)
      // 建立连接
      if (timer) {
        clearTimeout(timer)
        timer = null
      } else {
        user.isResetLogin('init')
      }
    },
    false
  )

  getPlus()
    .then((plus: any) => {
      /******************** 个推消息推送 ********************/
      plus.push.setAutoNotification(false)
      // 通知消息 -- 通知栏点击进入上一次页面，不会触发click
      // 透传 -- 不会进入通知栏，会触发receive, createMessage会触发点击事件
      plus.push.addEventListener('click', (msg: any) => onClickMsg(msg), false)
      plus.push.addEventListener(
        'receive',
        (msg: any) => {
          if (isOnline || !msg.content) {
            return
          }

          plus.push.createMessage(msg.content, msg.payload || '', {
            cover: false,
            sound: 'system'
          })
          currmsg = msg
        },
        false
      )

      /******************** 检测网络是否断开 ********************/
      document.addEventListener(
        'netchange',
        () => {
          const type = plus.networkinfo.getCurrentType()
          switch (type) {
            case plus.networkinfo.CONNECTION_ETHERNET:
            case plus.networkinfo.CONNECTION_WIFI:
            // return toast.info('当前网络--wifi')
            case plus.networkinfo.CONNECTION_CELL2G:
            case plus.networkinfo.CONNECTION_CELL3G:
            case plus.networkinfo.CONNECTION_CELL4G:
              // return toast.info('当前网络--流量')
              return
            default:
              return toast.info('请检查网络设置是否打开！')
          }
        },
        false
      )

      /*********************** 原生title ************************/
      // const cwb = plus.webview.currentWebview()
      // const titleNView = cwb.getTitleNView()
      // titleNView.isVisible() && titleNView.hide()
    })
    .catch(err => console.log(err.message))
}

const backMapping: any = {
  '/msg': null,
  '/login': null,
  '/add-friend': '/msg',
  '/address-book': '/msg'
}

const gb = async (url: 0 | -1 | string, rootCallback?: () => void) => {
  let cu: string = ''
  const hashIdx = location.href.indexOf('#/')
  if (hashIdx !== -1) {
    cu = location.href.slice(hashIdx + 1)
  }

  if (cu === '/address-book') {
    session.remove(REPEAT_SEND) // 删除转发内容
  }

  const { history } = ams.get()
  if (url === -1 || url === 0) {
    history.go(url)
  }

  if (typeof url === 'string') {
    if (cu.startsWith('/chat/single') || cu.startsWith('/chat/group')) {
      let data: any = cu.replace(/^(\/chat\/single\/)|(\/chat\/group\/)/, '')
      data = serialize.parseOfDecode(data) || {}
      if (data.chat_id) {
        await chat.leaveChat({ toChatId: data.chat_id })
      }
    }
    history.replace(url)
  }

  // 根
  if (url === null) {
    rootCallback ? rootCallback() : history.go(0)
  }

  // 清空跳转历史记录
  // if (url === '/msg') {
  //   setTimeout(() => session.remove(HISTORY_STATE))
  // }
}

@inject('user')
@observer
export default class App extends BaseApp {
  static isLogin(): boolean {
    return !!(cache.get(LOGIN_MSG) || {}).access_token
  }

  static goBack() {
    goBack(backMapping, gb)
  }

  componentDidMount() {
    super.componentDidMount && super.componentDidMount()
    if (this.props.location.pathname !== '/app-share') {
      this.props.user.isResetLogin('init')
    }

    // window.addEventListener('resize', () => {
    //   const activeElement: any = document.activeElement
    //   const tagName = activeElement.tagName

    //   const scrollIntoView = () => {
    //     if ('scrollIntoView' in activeElement) {
    //       activeElement.scrollIntoView()
    //     } else {
    //       activeElement.scrollIntoViewIfNeeded()
    //     }
    //   }

    //   // 键盘挡住输入框
    //   if (tagName === 'INPUT' || tagName === 'TEXTAREA') {
    //     setTimeout(scrollIntoView, 0)
    //   }
    // })
    onChangeURL()
    onBackButton(backMapping, gb)
    initPlus()
  }
}

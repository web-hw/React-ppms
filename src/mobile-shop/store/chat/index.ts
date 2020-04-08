import { observable, action, runInAction } from 'mobx'
import moment from 'moment'

import { serialize } from 'global@util/serialize'
import { local } from 'global@util/storage'
import { Ws } from 'global@util/connect'
import { toast } from 'global@util/toast/mobile'
import { ams } from 'global@util/init'
import { user, contact } from '../../store'
import { IAcceptMsg, ISendMsg, IMsgs, IChats, TChat } from './chat'
import { E_CHAT_ACTION, E_MESSAGE_TYPE, E_CHAT_TYPE } from './constant'
import { E_ACCEPT_TYPE } from 'global@util/gallery-camera'
import { fetch } from '../../connect'
const { IS_PRO } = process.env

export default class Chat {
  // 缓存聊天key
  private CHAT_MSG = 'CHAT_MSG'
  // 缓存陌生人
  private stranger = 'STRANGER'
  // 缓存条数
  private CHAT_MSG_NUM = 20
  // ws对象
  @observable private ws: Ws = null
  // 历史消息toChatId
  @observable private toChatIdOfHis: string = ''
  // 消息列表
  @observable msgs: IMsgs = {}
  // 历史聊天记录
  @observable chats: IChats = {}

  // 关闭ws
  @action closeWs() {
    if (!this.ws) {
      return
    }

    this.ws.close()
    this.ws = null
  }

  // 创建ws
  @action createWs() {
    if (this.ws) {
      return
    }

    const chat_id = ((user || {}).info || {}).chat_id
    if (!chat_id) {
      // return toast.info('当前用户没有chatId,无法连接ws')
      return
    }

    this.chats = local.get(this.CHAT_MSG) || {}

    this.ws = new Ws({
      // host: IS_PRO ? 'chat.amisheng.com' : '199.199.199.223',
      host: 'chat.amisheng.com',
      port: 9501,
      query: `?chatId=${chat_id}`,
      onsiteslogin: () => user.logout(),
      onmessage: (e: any) => {
        const message = serialize.parse(e.data) || {}
        const { action, code, msg = '未知错误', data } = message
        console.log('*****************', action, data, '*****************')
        if (code === 'success') {
          // 成功追加数据
          data && this.onChangeMessage(action, data)
        } else {
          // 提示错误
          toast.info(msg)
          // 如果是反馈发送信息的数据
          if (action === E_CHAT_ACTION.SEND_FEED_BACK && data) {
            this.onChangeMessage(action, { ...data, loading: -1 })
          }
        }
      }
    })
  }

  @action onChangeMessage(action: E_CHAT_ACTION, data: any) {
    // 获取聊天对象的chatId
    const { chat_id, cb_nickname, head_img } = (user || {}).info || {}
    let toChatId = ''
    if (chat_id) {
      const res = data instanceof Array ? data[0] || {} : data
      if (res.chatType === E_CHAT_TYPE.GROUP) {
        toChatId = res.toChatId
      }
      if (res.chatType === E_CHAT_TYPE.SINGLE) {
        toChatId = chat_id === res.fromChatId ? res.toChatId : res.fromChatId
      }
    }

    switch (action) {
      // 新数据
      case E_CHAT_ACTION.NEW_MESSAGE:
      case E_CHAT_ACTION.MISSED_MESSAGE:
        this.acceptMsg({ ...data, unread: true })
        this.cacheStranger(toChatId)
        return this.cacheChats(toChatId)
      // // 离线数据
      // case E_CHAT_ACTION.MISSED_MESSAGE:
      //   this.acceptMsg({ ...data, unread: true })
      //   return this.cacheChats(toChatId)
      // 发送的反馈数据
      case E_CHAT_ACTION.SEND_FEED_BACK:
        if (!toChatId) {
          return
        }

        // 获取当前聊天对象的消息列表
        const messages: any = serialize.copy(this.msgs)
        const msgs = messages[toChatId] || []
        const oldIdx = msgs.findIndex(
          (m: any) =>
            m.fromChatId === data.fromChatId &&
            m.clientId === data.clientId &&
            m.loading === 1
        )
        if (oldIdx !== -1) {
          msgs.splice(oldIdx, 1)
          messages[toChatId] = msgs
          this.msgs = messages
        }
        // return (
        //   chatType === E_CHAT_TYPE.SINGLE &&
        //   this.acceptMsg({ ...data, unread: true })
        // )
        if (chat_id === data.fromChatId) {
          const userInfo = data.fromUserInfo || {}
          data.fromUserInfo = {
            avatar: userInfo.avatar || head_img || '',
            name: userInfo.name || cb_nickname || ''
          }
        }
        this.acceptMsg({ ...data, unread: true })
        this.cacheStranger(toChatId)
        return this.cacheChats(toChatId)
      // 历史数据
      case E_CHAT_ACTION.HISTORY_MESSAGE:
        if (data instanceof Array && data.length > 0) {
          data.forEach(d =>
            this.acceptMsg({ ...d, hasData: data.length === 20, unread: true })
          )
          this.cacheChats(toChatId)
        } else {
          if (!this.toChatIdOfHis) {
            return
          }
          const messages: any = serialize.copy(this.msgs)
          const msgs = messages[this.toChatIdOfHis] || []
          const msg = msgs[0]
          if (msg) {
            msg.hasData = false
            this.msgs = messages
          }
        }
    }
  }

  @action async cacheStranger(chatId: string) {
    if (!chatId) {
      return
    }

    let messages = serialize.copy(this.msgs)
    messages = messages[chatId] || []
    const { chatType } = messages[messages.length - 1] || {}
    if (chatType !== E_CHAT_TYPE.SINGLE) {
      return
    }

    const {
      id,
      name,
      head_img,
      realname,
      pet_name
    } = await contact.getGroupOrUserMsg(chatId)
    const data = {
      id,
      chatId,
      head_img: head_img || '',
      name: pet_name || realname || name || ''
    }

    if (!data.id || !data.name) {
      return
    }

    const datas: any[] = local.get(this.stranger) || []
    const oldIdx = datas.findIndex(d => d.chatId === data.chatId)
    if (oldIdx >= 0) {
      datas.splice(oldIdx, 1)
    }

    const result = await fetch('/chat/is-friend', {
      method: 'POST',
      data: { chat_id: chatId }
    })
    const res = result.data || {}
    if (res.status === 0) {
      datas.unshift(data)
    }

    // 限制缓存条数
    if (datas.length > 30) {
      datas.length = 30
    }

    local.set(this.stranger, datas)
  }

  @action getMsgStr(messageType: E_MESSAGE_TYPE, message: any) {
    let messageTypeStr = message

    if (messageType === E_MESSAGE_TYPE.MAP) {
      messageTypeStr = '[地图]'
    }
    if (messageType === E_MESSAGE_TYPE.NAMECARD) {
      messageTypeStr = '[名片]'
    }
    if (messageType === E_MESSAGE_TYPE.RECORD) {
      messageTypeStr = '[语音]'
    }
    if (messageType === E_MESSAGE_TYPE.FILE_IMG) {
      messageTypeStr = '[图片]'
    }
    if (messageType === E_MESSAGE_TYPE.FILE_AUDIO) {
      messageTypeStr = '[音频]'
    }
    if (messageType === E_MESSAGE_TYPE.FILE_VIDEO) {
      messageTypeStr = '[视频]'
    }
    if (messageType === E_MESSAGE_TYPE.GROUP_NOTICE) {
      messageTypeStr = '[公告]'
    }
    if (messageType === E_MESSAGE_TYPE.GROUP_MEETING) {
      messageTypeStr = '[会议]'
    }
    if (messageType === E_MESSAGE_TYPE.FILE_WORD) {
      messageTypeStr = '[文件]'
    }
    if (messageType === E_MESSAGE_TYPE.FILE_ZIP) {
      messageTypeStr = '[文件]'
    }
    if (messageType === E_MESSAGE_TYPE.FILE_PPT) {
      messageTypeStr = '[文件]'
    }
    if (messageType === E_MESSAGE_TYPE.FILE_TXT) {
      messageTypeStr = '[文件]'
    }
    if (messageType === E_MESSAGE_TYPE.FILE_XLS) {
      messageTypeStr = '[文件]'
    }
    if (messageType === E_MESSAGE_TYPE.FILE_OTHER) {
      messageTypeStr = '[文件]'
    }

    return messageTypeStr
  }

  @action acceptMsg(msg: IAcceptMsg) {
    // 获取聊天对象的chatId
    const chat_id = ((user || {}).info || {}).chat_id
    if (!chat_id) {
      return
    }
    const { chatType } = msg
    let toChatId = ''
    if (chatType === E_CHAT_TYPE.GROUP) {
      toChatId = msg.toChatId
    }
    if (chatType === E_CHAT_TYPE.SINGLE) {
      toChatId = chat_id === msg.fromChatId ? msg.toChatId : msg.fromChatId
    }
    if (!toChatId) {
      return
    }

    // 获取当前聊天对象的消息列表
    const messages: any = serialize.copy(this.msgs)
    const msgs = messages[toChatId] || []

    // 检查是否存在
    const oldIdx = msgs.findIndex((m: any) => m.mid === msg.mid)
    if (oldIdx === -1) {
      msgs.push(msg)
    }
    // // 追加消息
    // msgs.push(msg)

    // 排序
    messages[toChatId] = msgs.sort(
      (a: any, b: any) =>
        moment(a.sendTime).valueOf() - moment(b.sendTime).valueOf()
    )

    // 重置消息列表
    this.msgs = messages
  }

  @action cacheChats(toChatId: string) {
    if (!toChatId) {
      return
    }

    /******************** 缓存聊天记录 **************************/
    // const { fromUserInfo, message, sendTime, unread, messageType } = msg
    const messages = serialize.copy(this.msgs)
    const newMsgs = messages[toChatId] || []
    const { fromUserInfo, message, sendTime, unread, messageType, chatType } =
      newMsgs[newMsgs.length - 1] || {}
    if (!message) {
      return
    }
    const messageTypeStr = this.getMsgStr(messageType, message)
    const chat: any = {}
    const userIf: any = fromUserInfo || {}
    // 群消息
    if (chatType === E_CHAT_TYPE.GROUP) {
      chat.toChatId = toChatId
      chat.message = `${userIf.name ? `${userIf.name}: ` : ''}${messageTypeStr}`
    }
    // 单聊
    if (chatType === E_CHAT_TYPE.SINGLE) {
      chat.toChatId = toChatId
      chat.message = messageTypeStr
    }
    chat.toChatId && this.setChats({ ...chat, chatType, sendTime, unread }, 1)
  }

  @action async setChats(msg: TChat, type: 0 | 1 | 2) {
    // 0-删除 1-添加 2-置顶
    const chat_id = ((user || {}).info || {}).chat_id
    if (!chat_id) {
      return
    }

    const chatMsgs = local.get(this.CHAT_MSG) || {}
    const chats = chatMsgs[chat_id] || []
    const index = chats.findIndex((c: any) => c.toChatId === msg.toChatId)

    if (type === 0) {
      index !== -1 && chats.splice(index, 1)
    } else if (type === 2) {
      if (index !== -1) {
        const chat = chats[index]
        chats[index] = { ...chat, isTop: !chat.isTop }
        // if (chat.isTop) {

        // } else {
        //   chats.splice(index, 1)
        //   chats.unshift({ ...chat, isTop: true })
        // }
      }
    } else if (type === 1) {
      const {
        message,
        chatType,
        sendTime,
        unread,
        isTop,
        toChatName,
        toChatAvatar
      } = chats[index] || {}
      const chat = {
        message,
        chatType,
        sendTime,
        isTop,
        unread,
        toChatName,
        toChatAvatar,
        ...msg
      }

      const {
        name = '',
        head_img = '',
        realname = '',
        nickname = ''
      } = await contact.getGroupOrUserMsg(chat.toChatId)
      chat.toChatName = nickname || realname || name
      chat.toChatAvatar = head_img

      // if (!chat.toChatName) {
      //   const {
      //     name = '',
      //     head_img = '',
      //     realname = '',
      //     nickname = ''
      //   } = await contact.getGroupOrUserMsg(chat.toChatId)
      //   chat.toChatName = nickname || realname || name
      //   chat.toChatAvatar = head_img
      // }

      index === -1 ? chats.push(chat) : (chats[index] = chat)
    }
    const tops = chats.filter((c: any) => c.isTop)
    const others = chats.filter((c: any) => !c.isTop)
    const result = [
      ...tops.sort(
        (a: any, b: any) =>
          moment(b.sendTime).valueOf() - moment(a.sendTime).valueOf()
      ),
      ...others.sort(
        (a: any, b: any) =>
          moment(b.sendTime).valueOf() - moment(a.sendTime).valueOf()
      )
    ]

    result.length > this.CHAT_MSG_NUM && (result.length = this.CHAT_MSG_NUM)
    chatMsgs[chat_id] = result

    // 重置chats
    runInAction(() => {
      // 去空
      chatMsgs[chat_id] = (chatMsgs[chat_id] || []).filter(
        (c: any) => !!c.message
      )
      this.chats = chatMsgs
      local.set(this.CHAT_MSG, this.chats)
    })
  }

  // 置顶历史聊天记录
  @action async topChat(msg: TChat) {
    await this.setChats(msg, 2)
  }

  // 删除历史聊天记录
  @action async deleteChat(msg: TChat) {
    await this.setChats(msg, 0)
  }

  // 发送消息
  @action sendMsg(
    message: ISendMsg,
    type: 'all' | 'mock' | 'real' | 'errorMock' = 'all'
  ) {
    if (!this.ws) {
      return
    }

    const content: any = message.content || {}
    const { messageType, chatType, toChatId } = content

    let msgTypeStr = this.getMsgStr(messageType, content.message || '')
    if (typeof msgTypeStr === 'string') {
      msgTypeStr = msgTypeStr.replace(/(\<\/?p\>)|(\<br\/?\>)/gi, '')
    }

    // 组装发送参数
    const msg: ISendMsg = {
      class: 'chat',
      action: message.action || E_CHAT_ACTION.SEND_MESSAGE,
      content: {
        messageType,
        chatType,
        toChatId,
        msgTypeStr,
        message: content.message || '',
        fromChatId: content.fromChatId || user.info.chat_id,
        loading: 0,
        clientId: Date.now()
      }
    }

    const msgStr = serialize.stringify(msg) || ''
    if (!msgStr) {
      return
    }

    // 检查是否是重新发送
    if (content.loading === -1) {
      const msgs = serialize.copy(this.msgs)
      const currMsgs = msgs[content.toChatId] || []
      const idx = currMsgs.findIndex(
        (m: any) =>
          content.fromChatId === m.fromChatId && content.clientId === m.clientId
      )
      if (idx !== -1) {
        currMsgs.splice(idx, 1)
        this.msgs = msgs
      }
    }

    // 追加消息
    const currMsg: any = {
      ...msg.content,
      loading: 1,
      unread: true,
      sendTime: msg.content.clientId,
      fromUserInfo: {
        avatar: user.info.head_img,
        name: user.info.name
      },
      groupInfo: {
        avatar: '',
        name: ''
      }
    }
    this.acceptMsg(currMsg)
    // 发送消息
    this.ws.send(msgStr)
  }

  // 获取历史数据
  @action getHisMsgs(content: {
    otherChatId: string
    mid: string
    chatType: E_CHAT_TYPE
  }) {
    if (!this.ws) {
      return
    }

    const msgs = {
      class: 'chat',
      action: E_CHAT_ACTION.GET_HISTORY_MESSAGE,
      content: {
        myChatId: user.info.chat_id,
        ...content
      }
    }
    const msgsStr = serialize.stringify(msgs) || ''

    if (!msgsStr) {
      return
    }

    this.toChatIdOfHis = content.otherChatId
    this.ws.send(msgsStr)
  }

  // 进入聊天界面
  @action async entryChat(chatType: E_CHAT_TYPE, toChatId: string) {
    if (!toChatId) {
      return toast.info('当前用户chatID不存在')
    }

    const {
      chat_id = '',
      name = '',
      id = '',
      head_img = '',
      realname = '',
      nickname = '',
      is_blacklist = 0
    } = await contact.getGroupOrUserMsg(toChatId)
    if (!id || !chat_id) {
      return toast.info('当前用户不存在')
    }

    // const repeatMsgs = session.get(REPEAT_SEND)
    // if (repeatMsgs) {
    //   session.remove(REPEAT_SEND)
    //   // 转发
    // } else {
    // 进入聊天室
    const data =
      serialize.stringifyOrEncode({
        id,
        chat_id,
        name,
        head_img,
        realname,
        nickname,
        is_blacklist
      }) || ''

    runInAction(() => {
      // 初始化数据
      const messages = serialize.copy(this.msgs)
      messages[chat_id] = []
      this.msgs = messages

      // 进入聊天室
      ams.get().history.replace(`/chat/${chatType}/${data}`)
    })
    // }
  }

  // 离开聊天界面
  @action async leaveChat(msg: TChat, callback?: Function) {
    msg.unread = false
    await this.setChats(msg, 1)
    callback && callback()
  }
}

export const chat = new Chat()

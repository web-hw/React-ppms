import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { RouteComponentProps } from 'react-router-dom'
import { Icon } from 'antd-mobile'
import moment from 'moment'

import { session } from 'global@util/storage'
import { throttle } from 'global@util/throttle'
import { serialize } from 'global@util/serialize'
import { AmrRecorderOfPlusAndJS, AmrPlay } from 'global@util/audio/amr-record'
import { toast } from 'global@util/toast/mobile'
import {
  fileOrBlob2Base64,
  compressAndOrientationImage,
  captureImgOfVideo
} from 'global@util/file'
import {
  getFileByCapture,
  getFilesByAccept,
  E_ACCEPT_TYPE,
  E_CAPTURE_TYPE
} from 'global@util/gallery-camera'
import { fetch } from '../../connect'
import AMap from '../../component/amap'
import Record from '../../component/record'
import { decodeMsg } from '../../component/emoji'
import { CustomRefresh, EDirection } from '../../component/custom-refresh'
import { IAcceptMsg } from '../../store/chat/chat'
import { defHead, REPEAT_SEND } from '../../constant'
import { E_CHAT_TYPE, E_MESSAGE_TYPE } from '../../store/chat/constant'
import ChatStore from '../../store/chat'
import Contact from '../../store/contact'
import User from '../../store/user'
import { Header } from '../../component/header'
import { ChatSendV1 } from '../../component/send'
import Loading from '../../component/loading'
import PreviewFile from '../../component/preview-file'
import Voice from './voice'
import Video from './video'
import { EOpeType } from '../../component/send-ope'
import Image from '../../component/image'
const style = require('./style')

interface ITargetPosition {
  id?: string
  name?: string
  address?: string
  distance?: string
  location?: {
    lng: number
    lat: number
  }
}

interface IFile {
  type?: E_MESSAGE_TYPE
  name?: string
  size?: string
  icon?: string
  url?: string
}

interface IPropsChat extends RouteComponentProps {
  chat: ChatStore
  contact: Contact
  user: User
}

interface IStateChat {
  is_blacklist: 1 | 0 | -1 // 1 自己加目标对象加入黑名单 -1目标对象加你为黑名单
  isOpenSendOpe: boolean
  chatType: E_CHAT_TYPE
  toChatId: string
  toName: string
  toId: string
  isShowFileModal: boolean
  fileModal: IFile
  record: {
    status: 'record' | 'recording' | 'recordCancel'
    startPosY: number
    timer: any
    maxTime: number
    currentTime: number
  }
  otherOpes: EOpeType[]
  loading: boolean
}

export const System = (props: { content: string }) => {
  const { content } = props

  if (!content) {
    return null
  }

  return (
    <div className={`${style.systemInfo} mb10 bsb fs12 tes tac fl wp100`}>
      {content}
    </div>
  )
}

export const Text = (props: {
  content: string
  history?: any
  url?: string
}) => {
  const { content } = props

  if (!content) {
    return null
  }

  const onClick = (e: any) => {
    const target = e.target
    if (!target) {
      return
    }

    const className = target.className || ''

    // 群会议
    if (className.includes('meeting')) {
      props.history.replace(props.url)
    }
  }

  return (
    <div
      className="text"
      onClick={onClick}
      dangerouslySetInnerHTML={{ __html: decodeMsg(content) }}
    />
  )
}

export const ChatAMap = (props: {
  content: ITargetPosition
  history: any
  chatType: any
  toChatId: any
}) => {
  const { content } = props

  return (
    <div
      onClick={() =>
        props.history.replace(
          `/position-msg-send/${props.chatType}/${
            props.toChatId
          }/${serialize.stringifyOrEncode(content)}`
        )
      }
      className="chat-amap pr bsb"
    >
      <div className="target wp100 palt bsb">
        <div className="name wp100 tes fs12">{content.name}</div>
        <div className="address wp100 tes fs10">{content.address}</div>
      </div>
      <div className="content wp100 hp100 bsb">
        <AMap
          isTargetPosition={true}
          dragEnable={false}
          targetPosition={[content.location.lng, content.location.lat]}
        />
      </div>
    </div>
  )
}

export const Namecard = (props: {
  history: any
  content: { id: string; name: string; realname: string; head_img: string }
}) => {
  const { history, content } = props

  return (
    <div
      onClick={() => history.replace(`/msg-info-detail/${content.id}`)}
      className="name-cart bsb plr10"
    >
      <div className="name-cart-msg wp100 bsb pr">
        <Image className="img palt" url={content.head_img} defImg={defHead} />
        <div className="name-cart-content wp100">
          <div className="realname wp100 fs12 tes">{content.realname}</div>
          <div className="wp100 fs10 tes">{content.name}</div>
        </div>
      </div>
      <div className="name-cart-footer wp100 fs12 tes bsb">个人名片</div>
    </div>
  )
}

export const ChatFile = (props: { content: IFile; onClick: () => void }) => {
  const { content, onClick } = props

  return (
    <div onClick={onClick ? onClick : null} className="chat-file bsb pr">
      <div className="wp100 hp100 tal">
        <div className="name wp100 fs12 tes">{content.name}</div>
        <div className="size wp100 fs12 tes">{content.size}</div>
      </div>
      <img src={content.icon} />
    </div>
  )
}

export const ChatImg = (props: { content: IFile; onClick: () => void }) => {
  const { content, onClick } = props

  return (
    <div onClick={onClick ? onClick : null} className="chat-img bsb pr">
      <img className="mc" src={content.url} />
    </div>
  )
}

@inject('user', 'chat', 'contact')
@observer
export default class Chat extends React.Component<IPropsChat, IStateChat> {
  // header right icon
  private _hdSIcon = require('../../assets/images/chat-sg-icon.png')
  private _hdGIcon = require('../../assets/images/chat-gp-icon.png')
  private _scrollCallback: Function = null
  private audio: AmrRecorderOfPlusAndJS = null
  private amrPlay: AmrPlay = null
  private move: number = 300
  private prevVoiceId: string = null
  private onTouchTimer: any = null
  private info: any = {
    record: {
      info: '按住说话'
    },
    recording: {
      info: '松开结束',
      warn: '上滑取消',
      icon: require('../../component/record/images/record.png')
    },
    recordCancel: {
      info: '松开取消',
      warn: '松开取消',
      icon: require('../../component/record/images/record-cancel.png')
    }
  }

  // 发送消息
  private onSend(messageType: E_MESSAGE_TYPE, message: any) {
    const { chatType, toChatId, is_blacklist } = this.state
    if (is_blacklist === 1) {
      return toast.info('你已拉黑对方')
    }
    if (is_blacklist === -1) {
      return toast.info('你已被对方拉黑')
    }
    this.props.chat.sendMsg({
      content: { chatType, messageType, toChatId, message }
    })
  }

  private onReSend(msg: IAcceptMsg) {
    this.props.chat.sendMsg({ content: msg })
  }

  private onTouchStartVoice(event: any) {
    event.preventDefault()
    event.stopPropagation()
    event.persist()
    const target = event.currentTarget

    clearTimeout(this.onTouchTimer)
    this.onTouchTimer = setTimeout(() => {
      const dataStatus = target.getAttribute('data-status')
      if (dataStatus !== '0') {
        return
      }
      target.setAttribute('data-status', '1')
      const defState: any = {
        status: 'record',
        startPosY: 0,
        timer: null,
        maxTime: this.state.record.maxTime,
        currentTime: 0
      }

      const reset = () => {
        const { record } = this.state
        clearInterval(record.timer)
        target.innerHTML = this.info[defState.status].info
        return defState
      }

      let audio = this.audio
      if (!audio) {
        audio = new AmrRecorderOfPlusAndJS({
          onStart: () => {
            const dataStatus = target.getAttribute('data-status')
            if (dataStatus !== '1') {
              return audio.cancel()
            }

            const status = 'recording'
            this.setState({
              record: {
                ...reset(),
                status,
                startPosY: event.touches[0].pageY,
                timer: setInterval(() => {
                  const { record } = this.state
                  if (record.currentTime >= record.maxTime) {
                    audio.finish()
                  } else {
                    this.setState({
                      record: { ...record, currentTime: record.currentTime + 1 }
                    })
                  }
                },                 1000)
              }
            })
            target.innerHTML = this.info[status].info
          },
          onFinish: (blob: Blob | string, duration: number) => {
            // 缓存当前录音数据
            const record = serialize.copy(this.state.record)
            // 重置
            this.setState({ record: { ...reset() } })
            target.setAttribute('data-status', '0')

            // 发送数据
            if (record.currentTime >= 1 && blob) {
              if (typeof blob === 'string') {
                this.onSend(E_MESSAGE_TYPE.RECORD, {
                  url: blob,
                  duration: duration || record.currentTime
                })
              } else {
                fileOrBlob2Base64(blob, (err: Error, base64: string) => {
                  if (err) {
                    toast.info(err.message || '未知错误')
                  } else {
                    this.onSend(E_MESSAGE_TYPE.RECORD, {
                      url: base64,
                      duration: duration || record.currentTime
                    })
                  }
                })
              }
            }
          },
          onCancel: () => {
            this.setState({ record: { ...reset() } })
            target.setAttribute('data-status', '0')
          },
          onError: (err: Error) => {
            toast.info(err.message || '未知错误')
            this.setState({ record: { ...reset() } })
            target.setAttribute('data-status', '0')
          }
        })
        this.audio = audio
      }

      audio.start()
    },                             800)
  }
  private onTouchMoveVoice(event: any) {
    event.preventDefault()
    event.stopPropagation()
    event.persist()

    const { record } = this.state
    const { status, startPosY } = record
    const movePos = event.targetTouches[0].pageY
    const ofPosY = Math.abs(startPosY - movePos)

    let newStatus: any = status

    if (ofPosY < this.move && status !== 'recording') {
      newStatus = 'recording'
    }
    if (ofPosY >= this.move && status !== 'recordCancel') {
      newStatus = 'recordCancel'
    }

    if (newStatus !== status) {
      this.setState({ record: { ...record, status: newStatus } })
      event.currentTarget.innerHTML = this.info[newStatus].info
    }
  }
  private onTouchEndVoice(event: any) {
    event.preventDefault()
    event.stopPropagation()
    event.persist()
    clearTimeout(this.onTouchTimer)

    const { record } = this.state
    const { startPosY } = record
    const endPosY = event.changedTouches[0].pageY
    const ofPosY = Math.abs(startPosY - endPosY)
    if (ofPosY < this.move) {
      this.audio && this.audio.finish()
    } else {
      this.audio && this.audio.cancel()
    }
  }

  // 处理时间
  private getTime(sendTime: number | string, prevSendTime: number | string) {
    if (!sendTime) {
      return ''
    }

    const sendDate = moment(sendTime).valueOf()
    if (
      prevSendTime &&
      sendDate - moment(prevSendTime).valueOf() < 10 * 60 * 1000
    ) {
      return ''
    }

    if (
      new Date().setHours(0, 0, 0) - new Date(sendDate).setHours(0, 0, 0) <
      24 * 60 * 60 * 1000
    ) {
      return moment(sendTime).format('HH:mm:ss')
    }

    return moment(sendTime).format('YYYY年MM月DD日 HH:mm:ss')
  }

  // 选中ope
  private onSelectOpe(type: string) {
    const { chatType, toChatId, is_blacklist } = this.state

    if (is_blacklist === 1) {
      return toast.info('你已拉黑对方')
    }
    if (is_blacklist === -1) {
      return toast.info('你已被对方拉黑')
    }

    if (type === EOpeType.POSITION) {
      // 位置
      this.props.history.replace(`/position-send/${chatType}/${toChatId}`)
    } else if (type === EOpeType.BUS_CARD) {
      // 名片
      // const { info } = this.props.user

      // this.onSend(E_MESSAGE_TYPE.NAMECARD, {
      //   id: info.id,
      //   name: info.name,
      //   // realname: info.realname,
      //   realname: info.realname || info.name || '',
      //   head_img: info.head_img
      // })
      this.props.history.replace(`/bus-card-share/${chatType}/${toChatId}`)
    } else if (type === EOpeType.SHOT || type === EOpeType.SHOT_IMG) {
      // 录像 | 拍照
      getFileByCapture(
        type === EOpeType.SHOT ? E_CAPTURE_TYPE.VIDEO : E_CAPTURE_TYPE.IMAGE,
        (err: Error, files: File[]) => {
          if (err) {
            return toast.info(err.message)
          }

          const file = files[0]
          this.onSendBeforeFile(file)
        }
      )
    } else if (type === EOpeType.ALBUM || type === EOpeType.FILE) {
      getFilesByAccept(
        type === EOpeType.ALBUM ? E_ACCEPT_TYPE.NONE : E_ACCEPT_TYPE.OTHER,
        (err: Error, files: File[]) => {
          if (err) {
            return toast.info(err.message)
          }

          const file = files[0]
          this.onSendBeforeFile(file)
        },
        false
      )
    }
  }

  // 发送文件
  private onSendBeforeFile(file: File) {
    if (!file) {
      return
    }

    const fileType: any = this.validTypeOfFile(file)

    this.onSendFile(fileType, file)
  }

  // 发送文件
  private onSendFile(type: E_MESSAGE_TYPE, file: File) {
    const data = {
      type,
      name: file.name || '',
      size: this.getFileSize(file.size),
      icon: require('../../assets/images/chat-fileother.png'),
      url: '',
      poster: ''
    }

    // 处理文件头像
    if (
      type === E_MESSAGE_TYPE.FILE_IMG ||
      type === E_MESSAGE_TYPE.FILE_VIDEO
    ) {
      data.icon = ''
    }
    if (type === E_MESSAGE_TYPE.FILE_AUDIO) {
      data.icon = require('../../assets/images/chat-fileaudio.png')
    }
    if (type === E_MESSAGE_TYPE.FILE_WORD) {
      data.icon = require('../../assets/images/chat-fileword.png')
    }
    if (type === E_MESSAGE_TYPE.FILE_ZIP) {
      data.icon = require('../../assets/images/chat-filezip.png')
    }
    if (type === E_MESSAGE_TYPE.FILE_PPT) {
      data.icon = require('../../assets/images/chat-fileppt.png')
    }
    if (type === E_MESSAGE_TYPE.FILE_TXT) {
      data.icon = require('../../assets/images/chat-filetxt.png')
    }
    if (type === E_MESSAGE_TYPE.FILE_XLS) {
      data.icon = require('../../assets/images/chat-filexls.png')
    }

    const send = (f: File, data: any) => {
      const sendF = async (fs: File[], data: any) => {
        // 上传文件
        const formData = new FormData()
        formData.append(data.type, fs[0])
        if (data.type === E_MESSAGE_TYPE.FILE_VIDEO) {
          formData.append('poster', fs[1] || '')
        }

        this.setState({ loading: true })
        const result = await fetch('/chat/upload', {
          method: 'POST',
          data: formData
        })
        const uploadData: any = result.data || {}
        if (!uploadData.path) {
          toast.info(uploadData.msg || '未知错误')
        } else {
          data.url = uploadData.path
          data.poster = uploadData.posterpath || ''
          this.onSend(data.type, data)
        }
        this.setState({ loading: false })
      }

      // 验证文件大小
      let fileSize = 10485760
      if (data.type === E_MESSAGE_TYPE.FILE_IMG) {
        fileSize = 5242880
      }
      if (data.type === E_MESSAGE_TYPE.FILE_VIDEO) {
        fileSize = 52428800
      }

      if (f.size > fileSize) {
        return toast.info(
          `文件大小不能超过${(fileSize / (1024 * 1024)).toFixed(1)}M!`
        )
      }

      // 截取视频第一帧
      if (data.type !== E_MESSAGE_TYPE.FILE_VIDEO) {
        sendF([f], data)
      } else {
        captureImgOfVideo(f, (err: Error, poster: File) => {
          if (err || !poster) {
            sendF([f], data)
          } else {
            sendF([f, poster], data)
          }
        })
      }
    }

    // 压缩图片
    if (type !== E_MESSAGE_TYPE.FILE_IMG) {
      send(file, data)
    } else {
      const isGif = new RegExp('^.+.gif$').test(data.name.toLowerCase())
      if (isGif) {
        return send(file, data)
      }

      compressAndOrientationImage(file, {}, (err: Error, f: File) => {
        if (err) {
          send(file, data)
        } else {
          data.name = data.name.replace(/\.(jpg|jpeg|png|gif|webp)?$/, '.jpeg')
          send(f, data)
        }
      })
      // orientationImg(
      //   file,
      //   (err: Error, f: File) => {
      //     const fe = f || file
      //     compressImage(
      //       fe,
      //       {},
      //       (err: Error, f: File) => {
      //         if (err) {
      //           send(file, data)
      //         } else {
      //           data.name = data.name.replace(/\.(jpg|jpeg|png|gif|webp)?$/, '.jpeg')
      //           send(f, data)
      //         }
      //       }
      //     )
      //   }
      // )

      // compressImage(
      //   file,
      //   {},
      //   (err: Error, f: File) => {
      //     if (err) {
      //       send(file, data)
      //     } else {
      //       data.name = data.name.replace(/\.(jpg|jpeg|png|gif|webp)?$/, '.jpeg')
      //       send(f, data)
      //     }
      //   }
      // )
    }
  }

  private getFileSize(size: number) {
    const fileSize = +size
    if (isNaN(fileSize)) {
      return ''
    }

    if (size < 1024) {
      return `${fileSize.toFixed(2)}B`
    }

    if (size < 1024 * 1024) {
      return `${(fileSize / 1024).toFixed(2)}KB`
    }

    if (size < 1024 * 1024 * 1024) {
      return `${(fileSize / (1024 * 1024)).toFixed(2)}MB`
    }

    return `${(fileSize / (1024 * 1024 * 1024)).toFixed(2)}GB`
  }

  // 文件类型检查
  private validTypeOfFile(file: File) {
    const configs: any = {
      img: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
      audio: ['mp3', 'amr', 'ogg', 'wav'],
      video: ['mp4', 'webm', 'mov'],
      word: ['doc', 'docx'],
      zip: ['zip', 'rar'],
      ppt: ['ppt', 'pptx'],
      txt: ['txt'],
      xls: ['xls', 'xlsx']
    }

    const name = file.name.toLowerCase()
    let type = ''
    for (const k in configs) {
      const formats = configs[k]
      const result = formats.find((format: string) => {
        return new RegExp(`^.+\.${format}$`).test(name)
      })

      if (result) {
        type = k
        break
      }
    }

    return `file${type || 'other'}`
  }

  // 切换send 操作状态
  private onSwitchSendOpe(status: boolean) {
    this.setState({ isOpenSendOpe: status })
  }

  // 滚动到底部
  private scrollToBottom() {
    const cbChat: any = document.querySelector('.am-pull-to-refresh')
    if (!cbChat) {
      return
    }

    const sh = cbChat.scrollHeight
    const oh = cbChat.offsetHeight
    if (sh > oh) {
      cbChat.scrollTop = sh - oh
    }
  }

  // 刷新数据
  private onRefreshMsgs(done: Function) {
    const { toChatId } = this.state
    const messages: any = this.props.chat.msgs
    const msgs: IAcceptMsg[] = messages[toChatId] || []
    const { mid, hasData } = msgs[0] || {}
    if (this._scrollCallback || !hasData || !mid) {
      done()
    } else {
      this._scrollCallback = () => done()
      this.getMsgs(mid)
    }
  }

  private async onClickHead(isSelf: boolean, msg: any = {}) {
    const fromChatId = msg.fromChatId
    if (!fromChatId) {
      return
    }

    const user = await this.props.contact.getGroupOrUserMsg(fromChatId)
    if (!user || !user.id) {
      return
    }
    this.props.history.replace(`/msg-info-detail/${user.id}`)
  }

  private getMsgs(mid: string) {
    const { chatType, toChatId } = this.state
    this.props.chat.getHisMsgs({ mid, chatType, otherChatId: toChatId })
  }

  private onWillReact() {
    // 处理滚动
    if (this._scrollCallback) {
      this._scrollCallback()
      this._scrollCallback = null
    } else {
      this.scrollToBottom()

      // 转发
      const repeatMsgs = session.get(REPEAT_SEND)
      if (repeatMsgs) {
        session.remove(REPEAT_SEND)
        repeatMsgs.forEach((d: any) =>
          setTimeout(() => this.onSend(d.type, d), 5)
        )
      }
    }
  }

  private onVisibleFileModal(isShowFileModal: boolean, fileModal: any = {}) {
    const state: any = { isShowFileModal }
    if (isShowFileModal) {
      const fm = serialize.copy(fileModal)
      fm.collect_type = this.state.chatType === E_CHAT_TYPE.GROUP ? 2 : 1
      fm.toChatId = this.state.toChatId
      fm.sendTime = fm.sendTime ? moment(fm.sendTime).format('YYYY-MM-DD') : ''
      state.fileModal = fm
    }
    this.setState({ ...state })
  }

  private onPlayOrPauseOfVoice(event: any, msg: IAcceptMsg) {
    event.preventDefault()
    event.stopPropagation()

    const { message = {} } = msg
    if (!message.url) {
      return
    }

    const target = event.currentTarget.parentElement
    const amrPlay = this.amrPlay

    const isPlaying = amrPlay && amrPlay.isPlayingOrPausedOrStop() === 1
    if (isPlaying) {
      amrPlay.stop()
    }

    const createAmrPlay = (target: any, url: string, mid: string) => {
      const amrPlay = new AmrPlay({
        onPlay: () => this.setStyleOfVoice(target, 'play'),
        onEnd: () => this.setStyleOfVoice(target, 'stop'),
        onError: (err: Error) => toast.info(err.message || '未知错误')
      })
      amrPlay.play(url, 0)
      this.prevVoiceId = mid
      this.amrPlay = amrPlay
    }

    if (this.prevVoiceId === msg.mid) {
      !isPlaying && createAmrPlay(target, message.url, msg.mid)
    } else {
      createAmrPlay(target, message.url, msg.mid)
    }
  }

  private setStyleOfVoice(target: any, type: 'stop' | 'play') {
    const icon = target.querySelector('.icon')

    if (type === 'stop') {
      icon.style.animationName = ''
    }

    if (type === 'play') {
      const className = target.className || ''
      let aniName = ''
      if (className.includes('self')) {
        aniName = style.selfVoiceAni
      }
      if (className.includes('other')) {
        aniName = style.otherVoiceAni
      }
      icon.style.animationName = aniName
    }
  }

  constructor(props: IPropsChat) {
    super(props)

    const params: any = this.props.match.params
    const { chatType, data } = params || {}
    const {
      id = '',
      chat_id = '',
      name = '',
      head_img = '',
      realname = '',
      nickname = '',
      is_blacklist = 0
    } = serialize.parseOfDecode(data) || {}

    this.state = {
      chatType,
      is_blacklist,
      toName: nickname || realname || name,
      toId: id,
      toChatId: chat_id,
      isOpenSendOpe: false,
      isShowFileModal: false,
      fileModal: {},
      record: {
        startPosY: 0,
        timer: null,
        maxTime: 60,
        currentTime: 0,
        status: 'record'
      },
      loading: false,
      // otherOpes: chatType !== E_CHAT_TYPE.GROUP ? [] : [
      //   EOpeType.ALBUM,
      //   EOpeType.SHOT,
      //   EOpeType.POSITION,
      //   EOpeType.BUS_CARD,
      //   EOpeType.FILE
      // ]
      otherOpes: [
        EOpeType.ALBUM, // 相册 none
        EOpeType.SHOT_IMG, // 拍照
        EOpeType.SHOT, // 录像
        EOpeType.FILE, // 文件 other
        EOpeType.POSITION, // 位置
        EOpeType.BUS_CARD // 名片
      ]
    }

    this.onSelectOpe = this.onSelectOpe.bind(this)
    this.onSwitchSendOpe = this.onSwitchSendOpe.bind(this)
    this.onRefreshMsgs = this.onRefreshMsgs.bind(this)
    this.onTouchStartVoice = this.onTouchStartVoice.bind(this)
    this.onTouchMoveVoice = this.onTouchMoveVoice.bind(this)
    this.onTouchEndVoice = this.onTouchEndVoice.bind(this)
    this.onWillReact = throttle(this.onWillReact, 400, 1000)
  }

  componentDidMount() {
    // this.props.chat.createWs()

    const { toChatId } = this.state
    const msgs: any = this.props.chat.msgs
    const currMsgs: IAcceptMsg[] = msgs[toChatId] || []
    currMsgs.length === 0 && this.getMsgs('')
    setTimeout(() => this.scrollToBottom())

    window.addEventListener('resize', this.scrollToBottom)
  }

  componentWillUnmount() {
    clearTimeout(this.onTouchTimer)
    this.audio && this.audio.cancel()
    this.amrPlay && this.amrPlay.stop()
    window.removeEventListener('resize', this.scrollToBottom)
  }

  componentWillReact() {
    this.onWillReact()
  }

  render() {
    const {
      chatType,
      otherOpes,
      toChatId,
      toId,
      toName,
      record,
      isShowFileModal,
      fileModal,
      loading
    } = this.state
    const msgs: any = this.props.chat.msgs
    const currMsgs: IAcceptMsg[] = msgs[toChatId] || []
    const hasData = !!(currMsgs[0] || {}).hasData
    const isGroupChat = chatType === E_CHAT_TYPE.GROUP

    return (
      <Loading
        spinning={loading}
        className={`${style.chat} ${
          this.state.isOpenSendOpe ? 'pb210' : 'pb50'
        } wp100 ts300 hp100 pr bsb pt50 fs0 oh`}
      >
        <Header
          // onClickLeft={() =>
          //   this.props.chat.leaveChat({ toChatId }, Header.goBack)
          // }
          right={[
            <img
              key="ltjl"
              className="mr10"
              src={require('../../assets/images/chat-ltjl.png')}
              onClick={() => {
                this.props.history.replace(
                  `/${
                    isGroupChat ? 'group-chat-msgs' : 'single-chat-msgs'
                  }/${toName}/${toId}/${toChatId}/all`
                )
              }}
            />,
            <img
              key="detail"
              onClick={() =>
                this.props.history.replace(
                  isGroupChat
                    ? `/group-set/${toId}/${toChatId}`
                    : `/msg-info-detail/${toId}`
                )
              }
              src={isGroupChat ? this._hdGIcon : this._hdSIcon}
            />
          ]}
        >
          {toName}
        </Header>
        <div className="wp100 hp100 bg-fff pr pl10 pr10 pb15 pt15 bsb">
          <CustomRefresh
            direction={EDirection.DOWN}
            hasData={hasData}
            onRefresh={this.onRefreshMsgs}
          >
            {currMsgs.map((msg, i) => {
              const isSelf = msg.fromChatId === this.props.user.info.chat_id
              const avatar = (msg.fromUserInfo || {}).avatar || ''
              const sendTime = this.getTime(
                msg.sendTime,
                (currMsgs[i - 1] || {}).sendTime
              )

              return (
                <div
                  key={`${msg.fromChatId}-${msg.mid}`}
                  className="msg-itm wp100 clearfix mt10"
                >
                  {/* 时间 */}
                  {sendTime && <System content={sendTime} />}
                  <div
                    className={`${style.chatItem} ${
                      isSelf ? 'self' : 'other'
                    } pr`}
                  >
                    <Image
                      className="head pa"
                      url={avatar}
                      defImg={defHead}
                      onClick={() => this.onClickHead(isSelf, msg)}
                    />
                    <div className="pr">
                      {/* 群名称 */}
                      {isSelf ? (
                        msg.loading === 1 ? (
                          <span className="loading">
                            <Icon type="loading" size="xs" />
                          </span>
                        ) : msg.loading === -1 ? (
                          <span
                            onClick={() => this.onReSend(msg)}
                            className="resend fs12"
                          >
                            重发
                          </span>
                        ) : null
                      ) : isGroupChat ? (
                        <div className={`${style.fromSend} db tes fs12`}>
                          {/* 是群主 */}
                          {/* <span className="mr10">群主</span> */}
                          {/* {msg.groupInfo.name} */}
                          {msg.fromUserInfo.name}
                        </div>
                      ) : null}
                      {/* 文本 */}
                      {msg.messageType === E_MESSAGE_TYPE.TEXT && (
                        <Text content={msg.message} />
                      )}
                      {/* 公告 */}
                      {msg.messageType === E_MESSAGE_TYPE.GROUP_NOTICE && (
                        <Text content={msg.message} />
                      )}
                      {/* 会议 */}
                      {msg.messageType === E_MESSAGE_TYPE.GROUP_MEETING && (
                        <Text
                          content={msg.message.data}
                          url={msg.message.url}
                          history={this.props.history}
                        />
                      )}
                      {/* 地图 */}
                      {msg.messageType === E_MESSAGE_TYPE.MAP && (
                        <ChatAMap
                          content={msg.message}
                          chatType={chatType}
                          toChatId={toChatId}
                          history={this.props.history}
                        />
                      )}
                      {/* 名片 */}
                      {msg.messageType === E_MESSAGE_TYPE.NAMECARD && (
                        <Namecard
                          content={msg.message}
                          history={this.props.history}
                        />
                      )}
                      {/* 语音 */}
                      {msg.messageType === E_MESSAGE_TYPE.RECORD && (
                        <Voice
                          maxTime={record.maxTime}
                          duration={msg.message.duration}
                          className={isSelf ? 'self' : 'other'}
                          onPlayOrPause={(event: any) =>
                            this.onPlayOrPauseOfVoice(event, msg)
                          }
                        />
                      )}
                      {/* 文件 */}
                      {msg.messageType === E_MESSAGE_TYPE.FILE_IMG && (
                        <ChatImg
                          content={msg.message}
                          onClick={() =>
                            this.onVisibleFileModal(true, {
                              ...msg.message,
                              sendTime: msg.sendTime,
                              fromChatId: msg.fromChatId
                            })
                          }
                        />
                      )}
                      {msg.messageType === E_MESSAGE_TYPE.FILE_VIDEO && (
                        <Video
                          data={msg.message}
                          onClickVideoBox={() =>
                            this.onVisibleFileModal(true, {
                              ...msg.message,
                              sendTime: msg.sendTime,
                              fromChatId: msg.fromChatId
                            })
                          }
                        />
                      )}
                      {(msg.messageType === E_MESSAGE_TYPE.FILE_AUDIO ||
                        msg.messageType === E_MESSAGE_TYPE.FILE_WORD ||
                        msg.messageType === E_MESSAGE_TYPE.FILE_ZIP ||
                        msg.messageType === E_MESSAGE_TYPE.FILE_PPT ||
                        msg.messageType === E_MESSAGE_TYPE.FILE_TXT ||
                        msg.messageType === E_MESSAGE_TYPE.FILE_XLS ||
                        msg.messageType === E_MESSAGE_TYPE.FILE_OTHER) && (
                        <ChatFile
                          content={msg.message}
                          onClick={() =>
                            this.onVisibleFileModal(true, {
                              ...msg.message,
                              sendTime: msg.sendTime,
                              fromChatId: msg.fromChatId
                            })
                          }
                        />
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </CustomRefresh>
          <Record
            status={record.status}
            info={this.info[record.status]}
            className="palt"
          />
        </div>
        {/* <ChatSendV1
          onSend={msg => this.onSend(E_MESSAGE_TYPE.TEXT, msg)}
          onOpenOpe={this.onSwitchSendOpe}
          onSelectOpe={this.onSelectOpe}
          opes={otherOpes}
          isFocusSent={true}
        /> */}
        <ChatSendV1
          onSend={msg => this.onSend(E_MESSAGE_TYPE.TEXT, msg)}
          onOpenOpe={this.onSwitchSendOpe}
          onSelectOpe={this.onSelectOpe}
          opes={otherOpes}
          onTouchStartOfVoice={this.onTouchStartVoice}
          onTouchMoveOfVoice={this.onTouchMoveVoice}
          onTouchEndOfVoice={this.onTouchEndVoice}
        />
        <PreviewFile
          visible={isShowFileModal}
          file={fileModal}
          onClose={() => this.onVisibleFileModal(false)}
        />
      </Loading>
    )
  }
}

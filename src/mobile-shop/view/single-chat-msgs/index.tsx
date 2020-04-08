import * as React from 'react'
import { observer, inject } from 'mobx-react'
import { RouteComponentProps } from 'react-router-dom'
import { Tabs, Grid, Calendar } from 'antd-mobile'
import moment from 'moment'

import { zhSort } from 'global@util/zh-sort'
import { serialize } from 'global@util/serialize'
import { AmrPlay } from 'global@util/audio/amr-record'
import { toast } from 'global@util/toast/mobile'
import { StateUnmount } from 'global@component/state-unmount'
import { defHead } from '../../constant'
import Loading from '../../component/loading'
import Empty from '../../component/empty'
import Image from '../../component/image'
import Search from '../../component/search'
import { Header } from '../../component/header'
import LetterSort from '../../component/letter-sort'
import PreviewFile from '../../component/preview-file'
import { CustomRefresh, EDirection } from '../../component/custom-refresh'
import Contact from '../../store/contact'
import { E_MESSAGE_TYPE, E_CHAT_TYPE } from '../../store/chat/constant'
import User from '../../store/user'
import Video from '../chat/video'
import Voice from '../chat/voice'
import { System, Text, ChatAMap, Namecard, ChatFile, ChatImg } from '../chat'
const chatStyle = require('../chat/style')
const style = require('./style')

interface IPropsGroupChatMsgs extends RouteComponentProps {
  user: User
  contact: Contact
}

interface IStateGroupChatMsgs {
  msgs: any[]
  files: any[]
  imgVideos: { [propName: string]: any[] }
  groupId: string
  groupName: string
  groupChatId: string
  loading: boolean
  msgLoading: boolean
  fileLoading: boolean
  imgVideoLoading: boolean
  isShowFileModal: boolean
  fileModal: any
  hasData: boolean
  calendar: {
    visible: boolean
    now: Date
    defaultDate: Date
  }
  param: {
    type: E_MSG_TYPE
    date: string // E_MSG_TYPE.DATE -- YYYY-MM-DD
    fromChatId: string // E_MSG_TYPE.MEMBER
    toChatId: string
    start_time: string // YYYY-MM-DD HH:mm:ss
    keyword: string
    page: number
  }
}

enum E_MSG_TYPE {
  ALL = 'all', // 所有消息
  ALL_FILES = 'all_files', // 所有文件
  DATE = 'date', // 时间
  FILES = 'files', // 除开图片 视图的文件
  IMAGES_VIDEO = 'images_video' // 图片视频
}

@StateUnmount
@inject('contact', 'user')
@observer
export default class GroupChatMsgs extends React.Component<
  IPropsGroupChatMsgs,
  IStateGroupChatMsgs
> {
  private prevVoiceId: string = null
  private amrPlay: AmrPlay = null

  private _tabs = [
    { title: '全部', key: E_MSG_TYPE.ALL },
    { title: '日期', key: E_MSG_TYPE.DATE },
    { title: '图片/视频', key: E_MSG_TYPE.IMAGES_VIDEO },
    { title: '文件', key: E_MSG_TYPE.FILES }
  ]

  private onChangeTab(tab: any, keyword?: string) {
    const { loading, param } = this.state
    if (loading) {
      return
    }

    // 重置
    this.setState({
      hasData: false,
      calendar: { ...this.initCalendar() },
      param: {
        ...param,
        type: tab.key,
        date: '',
        fromChatId: '',
        keyword: keyword || ''
      }
    })

    // 获取数据
    switch (tab.key) {
      case E_MSG_TYPE.ALL:
      case E_MSG_TYPE.ALL_FILES:
        return this.getMsgs({ type: tab.key, page: 1, keyword: keyword || '' })
      case E_MSG_TYPE.IMAGES_VIDEO:
        return this.getImgVideo({ type: tab.key, page: 1, keyword: '' })
      case E_MSG_TYPE.FILES:
        return this.getFiles({ type: tab.key, page: 1, keyword: '' })
    }

    // moment(Date.now()).format('YYYY-MM-DD')
    // Todo初始化数据
  }

  private onRefresh(done: Function) {
    const { loading, param } = this.state
    if (loading) {
      return
    }

    switch (param.type) {
      case E_MSG_TYPE.ALL:
      case E_MSG_TYPE.ALL_FILES:
      case E_MSG_TYPE.DATE:
        const data: any = {
          type: param.type,
          page: param.page + 1,
          keyword: param.keyword || ''
        }

        if (param.type === E_MSG_TYPE.DATE) {
          data.date = param.date
        }

        return this.getMsgs(data, done)
      case E_MSG_TYPE.IMAGES_VIDEO:
        return this.getImgVideo(
          { type: param.type, page: param.page + 1, keyword: '' },
          done
        )
      case E_MSG_TYPE.FILES:
        return this.getFiles(
          {
            type: param.type,
            page: param.page + 1,
            keyword: param.keyword || ''
          },
          done
        )
    }
  }

  private onSureSearch() {
    const { loading, param } = this.state
    if (loading) {
      return
    }

    this.setState({ hasData: false })
    switch (param.type) {
      case E_MSG_TYPE.ALL:
      case E_MSG_TYPE.ALL_FILES:
      case E_MSG_TYPE.DATE:
        const data: any = {
          type: param.type,
          page: 1,
          keyword: param.keyword || ''
        }

        if (param.type === E_MSG_TYPE.DATE) {
          data.date = param.date
        }

        return this.getMsgs(data)
      case E_MSG_TYPE.FILES:
        return this.getFiles({
          type: param.type,
          page: 1,
          keyword: param.keyword || ''
        })
    }
  }

  private onConfirmDate(start: Date, end: Date) {
    const { loading, param } = this.state
    const date = moment(start).format('YYYY-MM-DD')
    if (loading || !date) {
      return
    }

    this.setState({
      hasData: false,
      msgs: [],
      calendar: { ...this.initCalendar() },
      param: { ...param, date, keyword: '' }
    })

    this.getMsgs({ date, type: param.type, page: 1, keyword: '' })
  }

  private async getMsgs(params: any, callback?: Function) {
    const param = {
      // fromChatId: this.props.user.info.chat_id,
      toChatId: this.state.param.toChatId,
      start_time: this.state.param.start_time,
      ...params
    }
    this.setState({ msgLoading: params.page === 1, loading: true })
    const result = await this.props.contact.getGroupHisMsgs({
      ...param,
      chatType: 'single'
    })

    let state: any = {
      msgLoading: false,
      loading: false
    }
    const data = result.data || {}
    if (data.code === 200) {
      let dt = data.data || []
      if (params.page !== 1) {
        dt = dt.concat(serialize.copy(this.state.msgs || []))
      }

      // 排序
      dt = dt.sort(
        (a: any, b: any) =>
          moment(a.sendTime).valueOf() - moment(b.sendTime).valueOf()
      )

      state = {
        ...state,
        msgs: dt,
        hasData: !(dt.length < params.page * 30),
        param: { ...this.state.param, ...param }
      }
    }
    this.setState({ ...state })
    params.page === 1 && setTimeout(() => this.onScrollBottom())
    callback && callback()
  }

  private async getFiles(params: any, callback?: Function) {
    const param = {
      toChatId: this.state.param.toChatId,
      start_time: this.state.param.start_time,
      ...params
    }
    this.setState({ fileLoading: params.page === 1, loading: true })
    const result = await this.props.contact.getGroupHisMsgs({
      ...param,
      chatType: 'single'
    })

    let state: any = {
      fileLoading: false,
      loading: false
    }
    const data = result.data || {}
    if (data.code === 200) {
      let dt = data.data || []
      if (params.page !== 1) {
        dt = dt.concat(serialize.copy(this.state.files || []))
      }

      // 排序
      dt = dt.sort(
        (a: any, b: any) =>
          moment(b.sendTime).valueOf() - moment(a.sendTime).valueOf()
      )

      state = {
        ...state,
        files: dt,
        hasData: !(dt.length < params.page * 30),
        param: { ...this.state.param, ...param }
      }
    }
    this.setState({ ...state })
    callback && callback()
  }

  private async getImgVideo(params: any, callback?: Function) {
    const param = {
      toChatId: this.state.param.toChatId,
      start_time: this.state.param.start_time,
      ...params
    }
    this.setState({ imgVideoLoading: params.page === 1, loading: true })
    const result = await this.props.contact.getGroupHisMsgs({
      ...param,
      chatType: 'single'
    })

    let state: any = {
      imgVideoLoading: false,
      loading: false
    }
    const data = result.data || {}
    if (data.code === 200) {
      const imgVideos =
        params.page > 1 ? serialize.copy(this.state.imgVideos || {}) : {}
      const dt = data.data || []
      dt.forEach((d: any) => {
        if (
          !d.sendTime ||
          !(
            d.messageType === E_MESSAGE_TYPE.FILE_IMG ||
            d.messageType === E_MESSAGE_TYPE.FILE_VIDEO
          )
        ) {
          return
        }

        const key = moment(d.sendTime).format('YYYY年MM月')
        if (!key) {
          return
        }

        const currItm = imgVideos[key] || []
        currItm.push(d)
        imgVideos[key] = currItm
      })

      state = {
        ...state,
        imgVideos,
        hasData: !(dt.length < params.page * 30),
        param: { ...this.state.param, ...param }
      }
    }

    this.setState({ ...state })
    callback && callback()
  }

  private initCalendar() {
    const d = new Date()
    const y = d.getFullYear()
    const m = d.getMonth() + 1
    const dDate = new Date(+new Date(`${y}/${m}/1`) - 1000)

    return {
      visible: true,
      now: d,
      defaultDate: dDate
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

  private onVisibleFileModal(isShowFileModal: boolean, fileModal: any = {}) {
    const state: any = { isShowFileModal }
    if (isShowFileModal) {
      const fm = serialize.copy(fileModal)
      fm.collect_type = 1
      fm.toChatId = this.state.param.toChatId
      fm.sendTime = fm.sendTime ? moment(fm.sendTime).format('YYYY-MM-DD') : ''
      state.fileModal = fm
    }
    this.setState({ ...state })
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
        aniName = chatStyle.selfVoiceAni
      }
      if (className.includes('other')) {
        aniName = chatStyle.otherVoiceAni
      }
      icon.style.animationName = aniName
    }
  }

  private onPlayOrPauseOfVoice(event: any, msg: any) {
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

  private onScrollBottom() {
    const elem: any = document.querySelector('.am-pull-to-refresh')
    if (!elem) {
      return
    }

    const sh = elem.scrollHeight
    const oh = elem.offsetHeight
    if (sh > oh) {
      elem.scrollTop = sh - oh
    }
  }

  private msgWrap() {
    const { msgs, param, hasData, msgLoading } = this.state

    return (
      <div key={E_MSG_TYPE.ALL} className="all wp100 hp100 oh bsb pr">
        <div className="search bg-fff">
          <Search
            value={param.keyword}
            onChange={k =>
              this.setState({ param: { ...param, keyword: k.trim() } })
            }
            onSure={this.onSureSearch}
            placeholder="输入关键字搜索"
          />
        </div>
        <Loading
          spinning={msgLoading}
          className="pl10 pr10 pb15 pt15 bsb bg-fff oay sb"
        >
          {msgs.length === 0 ? (
            <Empty />
          ) : (
            <CustomRefresh
              direction={EDirection.DOWN}
              hasData={hasData}
              onRefresh={this.onRefresh}
            >
              {msgs.map((msg, i) => {
                const isSelf = msg.fromChatId === this.props.user.info.chat_id
                const avatar = (msg.fromUserInfo || {}).avatar || ''
                const sendTime = this.getTime(
                  msg.sendTime,
                  (msgs[i - 1] || {}).sendTime
                )

                return (
                  <div
                    key={`${msg.fromChatId}-${msg.mid}`}
                    className="msg-itm wp100 clearfix mt10"
                  >
                    {/* 时间 */}
                    {sendTime && <System content={sendTime} />}
                    <div
                      className={`${chatStyle.chatItem} ${
                        isSelf ? 'self' : 'other'
                      } pr`}
                    >
                      <Image
                        className="head pa"
                        url={avatar}
                        defImg={defHead}
                      />
                      <div className="pr">
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
                            chatType={E_CHAT_TYPE.SINGLE}
                            toChatId={msg.toChatId}
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
                            maxTime={60}
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
          )}
        </Loading>
      </div>
    )
  }

  constructor(props: IPropsGroupChatMsgs) {
    super(props)

    const params: any = props.match.params
    this.state = {
      msgs: [],
      files: [],
      imgVideos: {},
      groupId: params.id || '',
      groupName: params.name || '',
      groupChatId: params.chatId || '',
      loading: false,
      msgLoading: false,
      imgVideoLoading: false,
      isShowFileModal: false,
      fileLoading: false,
      hasData: false,
      fileModal: {},
      calendar: { ...this.initCalendar() },
      param: {
        type: params.type || E_MSG_TYPE.ALL,
        date: '',
        fromChatId: '',
        toChatId: params.chatId || '',
        start_time: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
        keyword: '',
        page: 1
      }
    }

    this.onConfirmDate = this.onConfirmDate.bind(this)
    this.onSureSearch = this.onSureSearch.bind(this)
    this.onChangeTab = this.onChangeTab.bind(this)
    this.onGoBack = this.onGoBack.bind(this)
    this.onRefresh = this.onRefresh.bind(this)
  }

  private onGoBack() {
    const { param } = this.state

    if (param.type === E_MSG_TYPE.DATE && param.date) {
      return this.setState({ param: { ...param, date: '', keyword: '' } })
    }

    Header.goBack()
  }

  componentDidMount() {
    const params: any = this.props.match.params
    this.onChangeTab({ key: this.state.param.type }, params.keyword)
  }

  componentWillUnmount() {
    this.amrPlay && this.amrPlay.stop()
  }

  render() {
    const {
      calendar,
      fileModal,
      isShowFileModal,
      param,
      groupName,
      imgVideoLoading,
      imgVideos,
      hasData,
      files,
      fileLoading
    } = this.state

    let imgVideokeys: any[] = []
    if (param.type === E_MSG_TYPE.IMAGES_VIDEO) {
      imgVideokeys = Object.keys(imgVideos).sort(
        (a: any, b: any) =>
          moment(`${b}1日`, 'YYYY年MM月DD日').valueOf() -
          moment(`${a}1日`, 'YYYY年MM月DD日').valueOf()
      )
    }

    return (
      <div className="wp100 hp100 pr bsb pt50 fs0 bg-f0f0f0 oh">
        <Header onClickLeft={this.onGoBack}>
          {groupName ? `与${groupName}的聊天记录` : '未设置'}
        </Header>
        {param.type === E_MSG_TYPE.ALL_FILES ||
        (param.type === E_MSG_TYPE.DATE && param.date) ? (
          <div className={`${style.singleChatMsgs} wp100 hp100 bsb pr oh`}>
            {this.msgWrap()}
          </div>
        ) : (
          <div className={`${style.singleChatMsgs} wp100 pt40 hp100 bsb pr oh`}>
            <em className="model-l-r palt zi400 bg-fff" />
            <em className="model-l-r part zi400 bg-fff" />
            <Tabs
              page={param.type}
              tabs={this._tabs}
              onChange={tab => this.onChangeTab(tab)}
              swipeable={false}
              renderTabBar={props => <Tabs.DefaultTabBar {...props} page={4} />}
            >
              {this.msgWrap()}
              <div
                key={E_MSG_TYPE.DATE}
                className="cb-date wp100 hp100 pr oh bg-fff bsb"
              >
                <Calendar
                  type="one"
                  visible={calendar.visible}
                  defaultDate={calendar.defaultDate}
                  minDate={new Date('2019/10/1')}
                  maxDate={calendar.now}
                  renderHeader={() => null}
                  initalMonths={3}
                  getDateExtra={(date: Date) => {
                    if (+date === +new Date(new Date().setHours(0, 0, 0, 0))) {
                      return { info: '今天' }
                    }
                    return null
                  }}
                  onConfirm={this.onConfirmDate}
                />
              </div>
              <div
                key={E_MSG_TYPE.IMAGES_VIDEO}
                className="img-or-video wp100 hp100 oh bsb"
              >
                <Loading spinning={imgVideoLoading}>
                  {imgVideokeys.length === 0 ? (
                    <Empty />
                  ) : (
                    <CustomRefresh
                      direction={EDirection.UP}
                      hasData={hasData}
                      onRefresh={this.onRefresh}
                    >
                      <div
                        ref={(el: any) => {
                          if (!el) {
                            return
                          }
                          const w = el.parentElement.parentElement.parentElement
                          const s = window.getComputedStyle(w, null)
                          el.style.minHeight = s.height
                        }}
                      >
                        {imgVideokeys.map((key: string) => {
                          const val = imgVideos[key]

                          return (
                            <div key={key} className="item wp100 pt10">
                              <div className="time plr10 bsb tes wp100 fs12">
                                {key === moment(Date.now()).format('YYYY年MM月')
                                  ? '本月'
                                  : key}
                              </div>
                              <div className="content bsb wp100 pr10">
                                <Grid
                                  data={val}
                                  columnNum={4}
                                  square={true}
                                  hasLine={false}
                                  activeStyle={false}
                                  renderItem={(itm: any) => {
                                    // 视频
                                    if (
                                      itm.messageType ===
                                      E_MESSAGE_TYPE.FILE_VIDEO
                                    ) {
                                      return (
                                        <Video
                                          data={itm.message}
                                          onClickVideoBox={() =>
                                            this.onVisibleFileModal(true, {
                                              ...itm.message,
                                              sendTime: itm.sendTime,
                                              fromChatId: itm.fromChatId
                                            })
                                          }
                                        />
                                      )
                                    }

                                    // 图片
                                    return (
                                      <Image
                                        className="img"
                                        url={(itm.message || {}).url}
                                        onClick={() =>
                                          this.onVisibleFileModal(true, {
                                            ...itm.message,
                                            sendTime: itm.sendTime,
                                            fromChatId: itm.fromChatId
                                          })
                                        }
                                      />
                                    )
                                  }}
                                />
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </CustomRefresh>
                  )}
                </Loading>
              </div>
              <div
                key={E_MSG_TYPE.FILES}
                className="file wp100 hp100 oh bg-fff pr bsb"
              >
                <div className="search">
                  <Search
                    value={param.keyword}
                    onChange={k =>
                      this.setState({ param: { ...param, keyword: k.trim() } })
                    }
                    onSure={this.onSureSearch}
                    placeholder="输入关键字搜索"
                  />
                </div>
                <Loading spinning={fileLoading} className="oay sb">
                  {files.length === 0 ? (
                    <Empty />
                  ) : (
                    <CustomRefresh
                      direction={EDirection.UP}
                      hasData={hasData}
                      onRefresh={this.onRefresh}
                    >
                      <div
                        ref={(el: any) => {
                          if (!el) {
                            return
                          }
                          const w = el.parentElement.parentElement.parentElement
                          const s = window.getComputedStyle(w, null)
                          el.style.minHeight = s.height
                        }}
                      >
                        {files.map((f: any) => {
                          const m = f.message || {}
                          const u = f.fromUserInfo || {}

                          return (
                            <div key={f.mid} className="item wp100 bsb pr">
                              <Image className="img palt" url={m.icon} />
                              <div
                                className="wp100 hp100"
                                onClick={() =>
                                  this.onVisibleFileModal(true, {
                                    ...m,
                                    sendTime: f.sendTime,
                                    fromChatId: f.fromChatId
                                  })
                                }
                              >
                                <div className="name wp100 fs12 tes">
                                  {m.name}
                                </div>
                                <div className="desc wp100">
                                  <span className="fs12 bsb tes">
                                    {moment(f.sendTime).format('YYYY-MM-DD')}
                                  </span>
                                  <span className="fs12 bsb tes">
                                    来自<em>{u.name || '未知'}</em>
                                  </span>
                                  <span className="fs12 bsb tes">{m.size}</span>
                                </div>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </CustomRefresh>
                  )}
                </Loading>
              </div>
            </Tabs>
          </div>
        )}
        <PreviewFile
          visible={isShowFileModal}
          file={fileModal}
          onClose={() => this.onVisibleFileModal(false)}
        />
      </div>
    )
  }
}

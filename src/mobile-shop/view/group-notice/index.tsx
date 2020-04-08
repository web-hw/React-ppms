import * as React from 'react'
import { observer, inject } from 'mobx-react'
import { RouteComponentProps } from 'react-router-dom'
import { Modal, TextareaItem, Icon } from 'antd-mobile'
import moment from 'moment'

import { toast } from 'global@util/toast/mobile'
import Empty from '../../component/empty'
import Loading from '../../component/loading'
import Image from '../../component/image'
import { Header } from '../../component/header'
import { defHead } from '../../constant'
import Contact from '../../store/contact'
import User from '../../store/user'
import Chat from '../../store/chat'
import { E_CHAT_TYPE, E_MESSAGE_TYPE } from '../../store/chat/constant'
import { INotice } from '../../store/contact/contact'
const style = require('./style')

interface IPropsGroupNotice extends RouteComponentProps {
  contact: Contact
  user: User
  chat: Chat
}

interface IStateGroupNotice {
  loading: boolean
  visibleDetail: boolean
  initDetail: string
  detail: string
  editing: boolean
  isEdit: boolean
  isMng: boolean
  id: string
  noticeId: string
  headImg: string
  username: string
  chatId: string
  time: string
}

@inject('contact', 'user', 'chat')
@observer
export default class GroupNotice extends React.Component<
  IPropsGroupNotice,
  IStateGroupNotice
> {
  // 进入 | 保存编辑
  private async onInitOrSaveEdit() {
    const { editing, detail, initDetail, noticeId, id, chatId } = this.state

    // 进入编辑
    if (!editing) {
      this.setState({ editing: true, isEdit: true })
    } else {
      if (!detail.trim()) {
        return toast.info('请输入公告')
      }

      // 保存编辑
      const state: any = {
        editing: false,
        isEdit: false,
        visibleDetail: false
      }
      if (detail !== initDetail) {
        const result = await this.props.contact.editNotice(
          noticeId ? 'edit' : 'add',
          noticeId ? noticeId : chatId,
          detail
        )

        const data = result.data || {}
        if (data.code === 200) {
          if (!noticeId) {
            // 发送消息
            this.props.chat.sendMsg({
              content: {
                chatType: E_CHAT_TYPE.GROUP,
                messageType: E_MESSAGE_TYPE.GROUP_NOTICE,
                toChatId: chatId,
                message: `【公告】${detail}`
              }
            })
          }
          this.getNotices()
        }
      }

      this.setState({ ...state })
    }
  }

  // 取消 | 返回公告详情
  private onCancelOrBackDetail() {
    const { editing, initDetail } = this.state
    if (editing) {
      this.setState({ editing: false, isEdit: false, detail: initDetail })
    } else {
      this.setState({ visibleDetail: false })
    }
  }

  // 打开详情
  private onOpenDetail(type: 'add' | 'update', item: any = {}) {
    const info = this.props.user.info || {}

    let state: any = {
      visibleDetail: true,
      editing: false,
      isEdit: false,
      initDetail: item.notice || '',
      detail: item.notice || '',
      noticeId: item.id || '',
      headImg: item.head_img || info.head_img || '',
      username: item.username || info.cb_nickname || '',
      time: item.created_at || new Date()
    }
    if (type === 'add') {
      state = { ...state, editing: true, isEdit: true }
    }

    this.setState({ ...state })
  }

  private async getNotices() {
    const { id, chatId } = this.state
    if (!id) {
      return
    }

    this.setState({ loading: true })
    await this.props.contact.getNotices(chatId)
    this.setState({ loading: false })
  }

  constructor(props: IPropsGroupNotice) {
    super(props)

    const params: any = this.props.match.params || {}

    this.state = {
      loading: false,
      visibleDetail: false,
      initDetail: '',
      detail: '',
      editing: false,
      isEdit: false,
      isMng: !!+params.mng,
      id: params.id || '',
      chatId: params.chatId || '',
      noticeId: '',
      headImg: '',
      username: '',
      time: ''
    }

    this.onInitOrSaveEdit = this.onInitOrSaveEdit.bind(this)
    this.onCancelOrBackDetail = this.onCancelOrBackDetail.bind(this)
  }

  componentDidMount() {
    this.getNotices()
    // this.props.chat.createWs()
  }

  render() {
    const {
      loading,
      visibleDetail,
      detail,
      editing,
      isEdit,
      isMng,
      headImg,
      username,
      time
    } = this.state
    const { notices = [] } = this.props.contact

    return (
      <Loading
        spinning={loading}
        className={`${style.groupNotice} fs0 pt50 bsb pr bg-f0f0f0 oh`}
      >
        <Header
          right={
            !isMng ? null : (
              <span
                onClick={() => this.onOpenDetail('add', {})}
                style={{
                  backgroundImage: `url(${require('../../assets/images/edit-notice-icon.png')})`
                }}
              />
            )
          }
        >
          群公告
        </Header>
        <div className="wp100 hp100 bsb pt5">
          <div className="wp100 hp100 oay sb">
            {notices.length === 0 ? (
              <Empty />
            ) : (
              notices.map((n: INotice) => (
                <div
                  key={n.id}
                  className="notice-item wp100 bg-fff bsb pr"
                  onClick={() => this.onOpenDetail('update', n)}
                >
                  <div className="content wp100 tes3">{n.notice}</div>
                  <div className="footer wp100 palb plr10 bsb">
                    <span className="fl tes">发布人: {n.username}</span>
                    <span className="fr tes">
                      {moment(n.created_at).format('YYYY-MM-DD HH:mm:ss')}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        <Modal
          popup={true}
          visible={visibleDetail}
          onClose={this.onCancelOrBackDetail}
          animationType="slide-up"
          className={style.noticeDetail}
        >
          <div className="wp100 hp100 fs0 pt50 bsb pr bg-f0f0f0 oh">
            <Header
              onClickLeft={this.onCancelOrBackDetail}
              left={
                editing ? (
                  <span>取消</span>
                ) : (
                  <Icon type="left" className="cb-left-lg" size="lg" />
                )
              }
              right={
                !isMng ? null : (
                  <span onClick={this.onInitOrSaveEdit}>
                    {editing ? '完成' : '编辑'}
                  </span>
                )
              }
            >
              群公告
            </Header>
            <div className="wp100 hp100 pt5 bsb">
              <div className="content cbtextarea wp00 hp100 bsb bg-fff pr">
                <div className="mng-msg wp100 bsb palt">
                  <Image url={headImg} defImg={defHead} className="img palt" />
                  <div className="mng-content wp100 hp100">
                    <div className="name wp100 fs14 tes">{username}</div>
                    <div className="time wp100 fs12 tes">
                      {moment(time).format('YYYY-MM-DD HH:mm:ss')}
                    </div>
                  </div>
                </div>
                <TextareaItem
                  editable={isEdit}
                  value={detail}
                  onChange={detail => this.setState({ detail })}
                />
              </div>
            </div>
          </div>
        </Modal>
      </Loading>
    )
  }
}

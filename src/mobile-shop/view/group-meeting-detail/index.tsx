import * as React from 'react'
import { observer, inject } from 'mobx-react'
import { RouteComponentProps } from 'react-router-dom'
import { InputItem, TextareaItem, Button, DatePicker, List } from 'antd-mobile'
import moment from 'moment'

import Contact from '../../store/contact'
import User from '../../store/user'
import Chat from '../../store/chat'
import { toast } from 'global@util/toast/mobile'
import Loading from '../../component/loading'
import { E_CHAT_TYPE, E_MESSAGE_TYPE } from '../../store/chat/constant'
import { Header } from '../../component/header'
const style = require('./style')

interface IPropsGroupMeetingDetail extends RouteComponentProps {
  contact: Contact
  user: User
  chat: Chat
}

interface IStateGroupMeetingDetail {
  loading: boolean
  isEdit: boolean
  isDelete: boolean
  groupId: string
  groupChatId: string
  meetingId: string
  title: string
  originator: string
  address: string
  info: string
  startDate: Date
  endDate: Date
}

@inject('contact', 'user', 'chat')
@observer
export default class GroupMeetingDetail extends React.Component<
  IPropsGroupMeetingDetail,
  IStateGroupMeetingDetail
> {
  private async onDeleteMeeting() {
    const { meetingId } = this.state
    const res = await this.props.contact.deleteMeet(meetingId)
    const data = res.data || {}
    if (data.code === 200) {
      toast.info('会议删除成功', 2, Header.goBack)
    }
  }

  private async onSure() {
    const {
      title,
      originator,
      address,
      info,
      startDate,
      endDate,
      meetingId,
      groupId,
      groupChatId
    } = this.state

    if (!title) {
      return toast.info('请输入会议主题')
    }
    if (!originator) {
      return toast.info('请输入发起人')
    }
    if (!startDate) {
      return toast.info('请选择开始时间')
    }
    if (!endDate) {
      return toast.info('请选择结束时间')
    }
    if (!address) {
      return toast.info('请输入会议室')
    }
    if (!info) {
      return toast.info('请输入会议说明')
    }

    // 添加 | 编辑会议内容
    const data: any = {
      title,
      start_time: moment(startDate).format('YYYY/MM/DD HH:mm'),
      end_time: moment(endDate).format('YYYY/MM/DD HH:mm'),
      content: info,
      room: address,
      chat_id: groupChatId
    }
    meetingId && (data.id = meetingId)
    const result = await this.props.contact.editMeet(data)
    const dt = result.data || {}
    if (dt.code === 200) {
      // 发送消息
      this.props.chat.sendMsg({
        content: {
          chatType: E_CHAT_TYPE.GROUP,
          messageType: E_MESSAGE_TYPE.GROUP_MEETING,
          toChatId: groupChatId,
          message: {
            url: `/group-meeting-detail/${groupId}/${groupChatId}/${dt.meet.id}`,
            data: `【群会议】主题: ${title},时间: ${moment(startDate).format(
              'YYYY年MM月DD日 HH:mm'
            )} <span class="meeting">查看详情</span>`
          }
        }
      })

      toast.info(`会议${meetingId ? '编辑' : '添加'}成功`, 2, Header.goBack)
    }
  }

  private async isMng() {
    const { groupId, groupChatId, meetingId } = this.state
    if (!meetingId) {
      return
    }

    await this.props.contact.getGroupById(groupId, groupChatId)
    const { is_admin } = this.props.contact.groupDetail
    this.setState({ isDelete: is_admin === 1 })
  }

  private async init() {
    const { meetingId, isEdit } = this.state
    if (!meetingId) {
      return
    }

    this.setState({ loading: true })

    const res = await this.props.contact.getMeet(meetingId)
    const data = res.data || {}
    const { id } = this.props.user.info
    let state: any = { loading: false }
    if (data.code === 200) {
      const meet = data.meet || {}
      state = {
        ...state,
        // isEdit: isEdit || id === meet.account_id, // 当前人能修改的状态
        title: meet.title,
        originator: meet.username,
        address: meet.room,
        info: meet.content,
        startDate: new Date(meet.start_time.replace(/-/g, '/')),
        endDate: new Date(meet.end_time.replace(/-/g, '/'))
      }
    } else {
      toast.info('当前会议已被移除', 2, Header.goBack)
    }
    this.setState(state)
  }

  constructor(props: IPropsGroupMeetingDetail) {
    super(props)

    const params: any = this.props.match.params
    const { realname, name, pet_name } = this.props.user.info
    this.state = {
      groupId: params.groupId,
      groupChatId: params.groupChatId,
      meetingId: params.id,
      loading: false,
      isEdit: !params.id, // 添加 | 编辑
      isDelete: false, // 群主可以删除
      title: '',
      originator: realname || name || pet_name,
      address: '',
      info: '',
      startDate: null,
      endDate: null
    }

    this.onDeleteMeeting = this.onDeleteMeeting.bind(this)
    this.onSure = this.onSure.bind(this)
  }

  componentDidMount() {
    this.isMng()
    this.init()
    // this.props.chat.createWs()
  }

  render() {
    const {
      loading,
      startDate,
      endDate,
      isEdit,
      isDelete,
      title,
      originator,
      address,
      info,
      meetingId
    } = this.state

    return (
      <Loading
        spinning={loading}
        className={`${style.groupMeetingDetail} fs0 bsb pr bg-f0f0f0 oh`}
      >
        <Header
          right={
            isDelete ? <span onClick={this.onDeleteMeeting}>删除</span> : null}
        >
          {meetingId ? '会议详情' : '添加会议'}
        </Header>
        <div className="wp100 hp100 bg-fff pl10 pr10 pb5 bsb oay sb">
          <div className="item wp100 pt10 bsb">
            <div className="header wp100 fs12">会议主题</div>
            <div className="input-content wp100">
              <InputItem
                placeholder="请输入会议主题"
                value={title}
                onChange={val => this.setState({ title: val.trim() })}
                disabled={!isEdit}
              />
            </div>
          </div>
          <div className="item wp100 pt10 bsb">
            <div className="header wp100 fs12">发起人</div>
            <div className="input-content wp100">
              <InputItem
                placeholder="请输入发起人"
                value={originator}
                onChange={val => this.setState({ originator: val.trim() })}
                disabled={true}
              />
            </div>
          </div>
          <div className="item wp100 pt10 bsb">
            <div className="header wp100 fs12">开始时间</div>
            <List className="date-content date-picker-list">
              <DatePicker
                mode="datetime"
                className={style.amPickerMeeting}
                disabled={!isEdit}
                value={startDate}
                extra="请选择开始时间"
                onChange={startDate => this.setState({ startDate })}
              >
                <List.Item className={!startDate ? 'empty' : ''} />
              </DatePicker>
            </List>
          </div>
          <div className="item wp100 pt10 bsb">
            <div className="header wp100 fs12">结束时间</div>
            <List className="date-content date-picker-list">
              <DatePicker
                mode="datetime"
                className={style.amPickerMeeting}
                disabled={!isEdit}
                value={endDate}
                extra="请选择结束时间"
                onChange={endDate => this.setState({ endDate })}
              >
                <List.Item className={!endDate ? 'empty' : ''} />
              </DatePicker>
            </List>
          </div>
          <div className="item wp100 pt10 bsb">
            <div className="header wp100 fs12">会议室</div>
            <div className="input-content wp100">
              <InputItem
                placeholder="请输入会议室"
                value={address}
                onChange={val => this.setState({ address: val.trim() })}
                disabled={!isEdit}
              />
            </div>
          </div>
          <div className="item wp100 pt10 bsb">
            <div className="header wp100 fs12">会议说明</div>
            <div className="textarea-content wp100">
              <TextareaItem
                maxLength={200}
                value={info}
                onChange={val => this.setState({ info: val.trim() })}
                placeholder="请输入会议说明"
                disabled={!isEdit}
              />
            </div>
          </div>
          {isEdit && (
            <div className="btn wp100 ptb20">
              <Button onClick={this.onSure}>确定</Button>
            </div>
          )}
        </div>
      </Loading>
    )
  }
}

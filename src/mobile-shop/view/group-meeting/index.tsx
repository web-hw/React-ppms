import * as React from 'react'
import { observer, inject } from 'mobx-react'
import { RouteComponentProps } from 'react-router-dom'
import {} from 'antd-mobile'
import moment from 'moment'

import Contact from '../../store/contact'
import Empty from '../../component/empty'
import Loading from '../../component/loading'
import { Header } from '../../component/header'
const style = require('./style')

interface IPropsGroupMeeting extends RouteComponentProps {
  contact: Contact
}

interface IStateGroupMeeting {
  loading: boolean
  groupId: string
  groupChatId: string
  data: any[]
}

@inject('contact')
@observer
export default class GroupMeeting extends React.Component<
  IPropsGroupMeeting,
  IStateGroupMeeting
> {
  private async init() {
    this.setState({ loading: true })
    const res = await this.props.contact.getMeets(this.state.groupChatId)
    const data = res.data || {}
    const state: any = { loading: false }
    if (data.code === 200) {
      state.data = data.meet || []
    }
    this.setState(state)
  }

  constructor(props: IPropsGroupMeeting) {
    super(props)

    const params: any = this.props.match.params
    this.state = {
      loading: false,
      groupId: params.groupId,
      data: [],
      groupChatId: params.groupChatId
    }
  }

  componentDidMount() {
    this.init()
  }

  render() {
    const { loading, groupId, groupChatId, data } = this.state

    return (
      <Loading
        spinning={loading}
        className={`${style.groupMeeting} fs0 pt50 bsb pr bg-f0f0f0 oh`}
      >
        <Header
          right={
            <span
              onClick={() =>
                this.props.history.replace(
                  `/group-meeting-detail/${groupId}/${groupChatId}`
                )
              }
              style={{
                backgroundImage: `url(${require('../../assets/images/edit-group-meeting.png')})`
              }}
            />
          }
        >
          群会议
        </Header>
        <div className="wp100 hp100 oay sb">
          {data.length === 0 ? (
            <Empty />
          ) : (
            data.map(d => (
              <div
                key={d.id}
                className="item wp100 plr10 bsb mt5 bg-fff"
                onClick={() =>
                  this.props.history.replace(
                    `/group-meeting-detail/${groupId}/${groupChatId}/${d.id}`
                  )
                }
              >
                <div className="wp100">
                  <span>会议主题</span>
                  <span className="tes">{d.title}</span>
                </div>
                <div className="wp100">
                  <span>发起人</span>
                  <span className="tes">{d.username}</span>
                </div>
                <div className="wp100">
                  <span>开始时间</span>
                  <span className="tes">
                    {moment(d.start_time).format('MM月DD日 HH:mm')}
                  </span>
                </div>
                <div className="wp100">
                  <span>会议室</span>
                  <span className="tes">{d.room}</span>
                </div>
                <p className="wp100">
                  <span className="tes">
                    {d.status === '0' ? (
                      <em className="wks">未开始</em>
                    ) : d.status === '1' ? (
                      <em className="jxz">进行中</em>
                    ) : d.status === '2' ? (
                      <em>已结束</em>
                    ) : null}
                    已有{d.hits}人查看
                  </span>
                  <span className="tes">
                    于{moment(d.created_at).format('YYYY/MM/DD HH:mm')}发起
                  </span>
                </p>
              </div>
            ))
          )}
        </div>
      </Loading>
    )
  }
}

import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { RouteComponentProps } from 'react-router-dom'
import { Icon, Grid, Button, Radio, InputItem } from 'antd-mobile'
import moment from 'moment'

import { toast } from 'global@util/toast/mobile'
import { defHead, defGroupHead } from '../../constant'
import Contact from '../../store/contact'
import User from '../../store/user'
import Loading from '../../component/loading'
import { Header } from '../../component/header'
import CbModal from '../../component/modal'
import Image from '../../component/image'
const style = require('./style')

interface IPropsGroupSet extends RouteComponentProps {
  contact: Contact
  user: User
}

interface IStateGroupSet {
  loading: boolean
  isShowWay: boolean
  isShowMsgStatus: boolean
  msgStatus: 0 | 1
  joinWay: '0' | '1' | '2'
}

@inject('user', 'contact')
@observer
export default class GroupSet extends React.Component<
  IPropsGroupSet,
  IStateGroupSet
> {
  // 加群方式
  private _addWay: any = {
    0: '允许任何人加群',
    1: '需要群主验证',
    2: '不允许任何人主动加群'
  }
  // 群消息状态
  private _msgStatus: any = {
    0: '屏蔽',
    1: '接收'
  }

  private async init() {
    const param: any = this.props.match.params
    if (!param.id) {
      return
    }

    this.setState({ loading: true })
    await this.props.contact.getGroupById(param.id, param.chatId)
    this.setState({ loading: false })
  }

  private onOpenWay(isMng: boolean, joinWay: '0' | '1' | '2') {
    if (!isMng) {
      return
    }
    this.setState({ joinWay, isShowWay: true })
  }

  private async onSureWay() {
    const param: any = this.props.match.params
    if (!param.id) {
      return
    }

    const { join_type = '0' } = this.props.contact.groupDetail
    const { joinWay } = this.state

    this.setState({ isShowWay: false, loading: true })
    if (joinWay !== join_type) {
      const result = await this.props.contact.updateJoinGroupStatus(
        param.id,
        joinWay
      )
      if ((result.data || {}).code === 200) {
        toast.info('编辑加群方式成功')
        await this.props.contact.getGroupById(param.id, param.chatId)
      }
    }

    this.setState({ loading: false })
  }

  private async onSureMsgStatus() {
    const param: any = this.props.match.params
    if (!param.id) {
      return
    }

    const { msgStatus } = this.state

    this.setState({ isShowMsgStatus: false, loading: true })
    const { status = 1 } = this.props.contact.groupDetail
    if (+msgStatus !== +status) {
      const result = await this.props.contact.updateGroupStatus({
        group_id: param.id,
        chat_id: param.chatId,
        status: msgStatus
      })

      if ((result.data || {}).code === 200) {
        toast.info('编辑群消息状态成功')
        await this.props.contact.getGroupById(param.id, param.chatId)
      }
    }
    this.setState({ loading: false })
  }

  // 解散群聊
  private async dissolveGroup() {
    const param: any = this.props.match.params
    if (!param.id) {
      return
    }
    this.setState({ loading: true })
    const result = await this.props.contact.dissolveGroup(param.id)
    if ((result.data || {}).code === 200) {
      this.props.history.replace('/msg')
    } else {
      this.setState({ loading: false })
    }
  }

  // 退群
  private async quitGroup() {
    const param: any = this.props.match.params
    const { id = '' } = this.props.user.info || {}
    if (!param.id || !id) {
      return
    }
    this.setState({ loading: true })
    const result = await this.props.contact.deleteGroupMembers(param.id, [id])
    if ((result.data || {}).code === 200) {
      this.props.history.replace('/msg')
    } else {
      this.setState({ loading: false })
    }
  }

  constructor(props: IPropsGroupSet) {
    super(props)

    this.state = {
      joinWay: '0',
      loading: false,
      isShowWay: false,
      isShowMsgStatus: false,
      msgStatus: 1
    }

    this.onSureWay = this.onSureWay.bind(this)
    this.dissolveGroup = this.dissolveGroup.bind(this)
    this.quitGroup = this.quitGroup.bind(this)
    this.onSureMsgStatus = this.onSureMsgStatus.bind(this)
  }

  componentDidMount() {
    this.init()
  }

  render() {
    const {
      loading,
      isShowWay,
      joinWay,
      isShowMsgStatus,
      msgStatus
    } = this.state
    const {
      id = '',
      chat_id = '',
      name = '',
      group_no = '',
      head_img = '',
      join_type = '0',
      is_admin = 0,
      members = [],
      notice = {},
      meet = {},
      status = 1,
      group_type
    } = this.props.contact.groupDetail
    const isMng = is_admin === 1
    let mbs = []
    if (group_type === 'group') {
      mbs = members.length > 6 ? members.slice(0, 6) : members
    } else {
      mbs = (members.length > 5 ? members.slice(0, 5) : members).concat({
        head_img: require('../../assets/images/add-member-icon.png')
      })
    }

    return (
      <Loading spinning={loading} className="fs0 pt50 bsb pr bg-f0f0f0 oh">
        <Header>群聊设置</Header>
        <div className="wp100 hp100 oay sb">
          <div className={`${style.title} wp100 mt5 pt15 pb15 bg-fff bsb pr`}>
            <Image
              className="img palt brp50"
              url={head_img}
              defImg={defGroupHead}
              onClick={() =>
                group_type === 'chat_group' &&
                isMng &&
                this.props.history.replace(`/avatar/group/${id}/${chat_id}`)
              }
            />
            <div className={`wp100 hp100 bsb ${group_no ? 'has-info' : ''}`}>
              <h6 className="fs14 tes fw500">{name}</h6>
              {group_no ? <p className="fs12 tes">群号:{group_no}</p> : null}
            </div>
          </div>
          <div className="wp100 mt5 bg-fff">
            <div
              onClick={() =>
                group_type === 'chat_group' &&
                isMng &&
                this.props.history.replace(`/edit-name-group/${id}/${chat_id}`)
              }
              className={`${style.item} ${
                group_type === 'chat_group' && isMng ? '' : 'no-rgt'
              } wp100 bsb pr`}
            >
              <span className="fl tes">群名称</span>
              <span className="fr tes">{name || '未设置'}</span>
              {group_type === 'chat_group' && isMng && (
                <Icon className="part" type="right" size="md" color="#999" />
              )}
            </div>
            <div
              className={`${style.item} wp100 bsb pr`}
              onClick={() =>
                this.props.history.replace(
                  `/group-notice/${+isMng}/${id}/${chat_id}`
                )
              }
            >
              <span className="fl tes">群公告</span>
              <span className="fr tes">
                {(notice || {}).notice || '未设置'}
              </span>
              <Icon className="part" type="right" size="md" color="#999" />
            </div>
            <div
              className={`${style.item} wp100 bsb pr`}
              onClick={() =>
                this.props.history.replace(`/group-meeting/${id}/${chat_id}`)
              }
            >
              <span className="fl tes" style={{ maxWidth: '15%' }}>
                群会议
              </span>
              <span className="fr tes" style={{ maxWidth: '80%' }}>
                {meet && meet.title
                  ? `${meet.title}(${moment(meet.start_time).format(
                      'YYYY/MM/DD HH:mm'
                    )})`
                  : '未设置'}
              </span>
              <Icon className="part" type="right" size="md" color="#999" />
            </div>
          </div>
          <div className={`${style.member} wp100 mt5 bg-fff`}>
            <div
              className={`${style.item} wp100 bsb pr`}
              onClick={() =>
                this.props.history.replace(`/group-member/${id}/${chat_id}`)
              }
            >
              <span className="fl tes">群成员</span>
              <span className="fr tes">{members.length}人</span>
              <Icon className="part" type="right" size="md" color="#999" />
            </div>
            <Grid
              data={mbs}
              columnNum={6}
              square={false}
              hasLine={false}
              activeStyle={false}
              onClick={itm =>
                this.props.history.replace(
                  itm.id === undefined
                    ? `/select-contact/${id}/${chat_id}`
                    : `/msg-info-detail/${itm.id}`
                )
              }
              renderItem={item => (
                <div className="wp100 mb15">
                  <Image
                    className="mb-icon"
                    url={item.head_img}
                    defImg={defHead}
                  />
                </div>
              )}
            />
          </div>
          <div className="wp100 mt5 bg-fff">
            <div
              onClick={() =>
                this.setState({ msgStatus: status, isShowMsgStatus: true })
              }
              className={`${style.item} wp100 bsb pr`}
            >
              <span className="fl tes">群消息状态</span>
              <span className="fr tes">{this._msgStatus[status] || ''}</span>
              <Icon className="part" type="right" size="md" color="#999" />
            </div>
            <div
              onClick={() =>
                this.onOpenWay(group_type === 'chat_group' && isMng, join_type)
              }
              className={`${style.item} ${
                group_type === 'chat_group' && isMng ? '' : 'no-rgt'
              } wp100 bsb pr`}
            >
              <span className="fl tes">加群方式</span>
              <span className="fr tes">{this._addWay[join_type] || ''}</span>
              {group_type === 'chat_group' && isMng && (
                <Icon className="part" type="right" size="md" color="#999" />
              )}
            </div>
            {/* {this._isMng && (
              <div className={`${style.item} wp100 bsb pr no-rgt`}>
                <span className="fl tes">加群密码</span>
                <span className="fr tes">123</span>
              </div>
            )} */}
          </div>
          <div className="wp100 mt5 bg-fff">
            <div
              onClick={() =>
                this.props.history.replace(
                  `/group-chat-msgs/${name}/${id}/${chat_id}/all_files`
                )
              }
              className={`${style.item} wp100 bsb pr`}
            >
              <span className="fl tes">收发的文件/图片/视频</span>
              <Icon className="part" type="right" size="md" color="#999" />
            </div>
            <div
              onClick={() =>
                this.props.history.replace(
                  `/group-chat-msgs/${name}/${id}/${chat_id}/all`
                )
              }
              className={`${style.item} wp100 bsb pr`}
            >
              <span className="fl tes">查找聊天记录</span>
              <Icon className="part" type="right" size="md" color="#999" />
            </div>
          </div>
          <div className="wp100 mt5 bg-fff">
            {/* <div className={`${style.item} wp100 bsb pr bb1`}>
              <span className="fl tes">清空聊天记录</span>
            </div> */}
            {group_type !== 'chat_group' ? null : isMng ? (
              <div className={`${style.btn} wp100 bsb`}>
                <Button
                  onClick={() =>
                    this.props.history.replace(`/assign-group/${id}/${chat_id}`)
                  }
                >
                  转让群主
                </Button>
                <Button onClick={this.dissolveGroup}>解散群聊</Button>
              </div>
            ) : (
              <div className={`${style.btn} wp100 bsb`}>
                <Button onClick={this.quitGroup}>退出群聊</Button>
              </div>
            )}
          </div>
        </div>
        <CbModal
          title="加群方式"
          className={style.cbRadio}
          isShow={isShowWay}
          onClose={() => this.setState({ isShowWay: false })}
          onSure={this.onSureWay}
        >
          <div className="wp100 cb-radio">
            {Object.keys(this._addWay).map((k: any) => {
              const itm = this._addWay[k]

              return (
                <Radio.RadioItem
                  key={k}
                  checked={k === joinWay}
                  onClick={() => this.setState({ joinWay: k })}
                >
                  {itm}
                </Radio.RadioItem>
              )
            })}
          </div>
        </CbModal>
        <CbModal
          title="群消息状态"
          className={style.cbRadio}
          isShow={isShowMsgStatus}
          onClose={() => this.setState({ isShowMsgStatus: false })}
          onSure={this.onSureMsgStatus}
        >
          <div className="wp100 cb-radio">
            {Object.keys(this._msgStatus).map((k: any) => {
              const itm = this._msgStatus[k]

              return (
                <Radio.RadioItem
                  key={k}
                  checked={k === `${msgStatus}`}
                  onClick={() => this.setState({ msgStatus: k })}
                >
                  {itm}
                </Radio.RadioItem>
              )
            })}
          </div>
        </CbModal>
      </Loading>
    )
  }
}

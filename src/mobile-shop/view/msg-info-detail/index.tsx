import * as React from 'react'
import { observer, inject } from 'mobx-react'
import { RouteComponentProps } from 'react-router-dom'
import { InputItem, Icon } from 'antd-mobile'

import { toast } from 'global@util/toast/mobile'
import { telByPlusOrJS } from 'global@util/send-msg'
import { defHead } from '../../constant'
import Contact from '../../store/contact'
import Chat from '../../store/chat'
import { E_CHAT_TYPE } from '../../store/chat/constant'
import Loading from '../../component/loading'
import { Header } from '../../component/header'
import { EllipsisPopover } from '../../component/popover'
import { SharePopup } from '../../component/share'
import CbModal from '../../component/modal'
import Image from '../../component/image'
const style = require('./style')

interface IPropsMsgInfoDetail extends RouteComponentProps {
  contact: Contact
  chat: Chat
}

interface IStateMsgInfoDetail {
  isShowDelFriend: boolean
  isShowEditName: boolean
  isShowShare: boolean
  name: string
  loading: boolean
}

@inject('contact', 'chat')
@observer
export default class MsgInfoDetail extends React.Component<
  IPropsMsgInfoDetail,
  IStateMsgInfoDetail
> {
  private _msgs = {
    person: {
      // 仅仅是好友，不在同一公司
      title: '个人信息',
      msgs: ['trade', 'auth', 'address', 'chathis', 'report', 'blacklist']
    },
    company: {
      // 在同一公司
      title: '企业信息',
      msgs: [
        'trade',
        'auth',
        'company',
        'address',
        'chathis',
        'report',
        'blacklist'
      ]
      // msgs: ['trade', 'main', 'auth', 'company', 'address']
    }
  }
  // on select item
  private onSelectPopoverItem(item: any) {
    if (item.key === '分享') {
      this.setState({ isShowShare: true })
    } else if (item.key === '举报') {
      this.props.history.push('/report-complaint')
    }
  }

  // 初始化数据
  private async initMsg() {
    const param: any = this.props.match.params
    if (!param.id) {
      return
    }

    this.setState({ loading: true })
    await this.props.contact.getUserById(param.id)
    this.setState({ loading: false })
  }

  // 删除好友
  private async onDelFriend() {
    const param: any = this.props.match.params
    if (!param.id) {
      return
    }

    this.setState({ isShowDelFriend: false, loading: true })
    const result = await this.props.contact.deleteFriend(param.id)
    const data = result.data || {}
    if (data.code === 200) {
      toast.info('好友删除成功')
      await this.props.contact.getUserById(param.id)
    }
    this.setState({ loading: false })
  }

  // 编辑备注
  private async onEditName() {
    const param: any = this.props.match.params
    const { nickname = '' } = this.props.contact.user
    const { name } = this.state
    if (!param.id || name === nickname) {
      return
    }

    this.setState({ isShowEditName: false, loading: true })
    const result = await this.props.contact.editNickname({
      account_id: param.id,
      nickname: name
    })
    const data = result.data || {}
    if (data.code === 200) {
      toast.info('昵称编辑成功')
      await this.props.contact.getUserById(param.id)
    }
    this.setState({ loading: false })
  }

  private onOpenNameModal() {
    const { nickname = '' } = this.props.contact.user
    this.setState({ isShowEditName: true, name: nickname })
  }

  private async onMsgItem(hasChild: boolean, msg: any) {
    if (!hasChild) {
      return
    }
    const param: any = this.props.match.params
    const { realname, nickname, name, chat_id } = this.props.contact.user

    switch (msg.key) {
      case 'company':
        return this.props.history.replace(`/company-page/${param.id}`)
      case 'chathis':
        return this.props.history.replace(
          `/single-chat-msgs/${nickname || realname || name}/${
            param.id
          }/${chat_id}/all`
        )
      case 'report':
        return this.props.history.replace(`/report-complaint/${param.id}`)
      case 'blacklist':
        const result = await this.props.contact.addOrCancelBlacklist(
          param.id,
          msg.isAdded
        )
        const data = result.data || {}
        if (data.code === 200) {
          toast.info(`${msg.isAdded ? '取消' : '添加'}黑名单成功`, 2, () =>
            this.props.history.replace('/msg')
          )
        }
        return
    }
  }

  constructor(props: IPropsMsgInfoDetail) {
    super(props)

    this.state = {
      isShowDelFriend: false,
      isShowEditName: false,
      isShowShare: false,
      loading: false,
      name: ''
    }

    this.onSelectPopoverItem = this.onSelectPopoverItem.bind(this)
    this.onDelFriend = this.onDelFriend.bind(this)
    this.onEditName = this.onEditName.bind(this)
    this.onOpenNameModal = this.onOpenNameModal.bind(this)
  }

  componentDidMount() {
    this.initMsg()
  }

  render() {
    const {
      loading,
      name,
      isShowShare,
      isShowEditName,
      isShowDelFriend
    } = this.state
    const {
      id,
      bname,
      head_img,
      chat_id,
      is_member,
      product_brand,
      profession,
      realname,
      nickname,
      trade,
      type,
      user_type,
      sex,
      address_detail,
      is_blacklist,
      bind_phone
    } = this.props.contact.user

    const msgs: any = {
      trade: { title: '所属行业', content: trade },
      main: { title: '主营信息', content: product_brand },
      auth: { title: '认证信息', content: user_type },
      company: { title: '企业主页', content: bname, hasChild: true },
      address: { title: '所在地区', content: address_detail }
      // chathis: { title: '查看聊天记录', content: ' ', hasChild: true }
    }
    if (is_member !== 0) {
      msgs.chathis = { title: '查看聊天记录', content: ' ', hasChild: true }
      msgs.report = { title: '举报投诉', content: ' ', hasChild: true }
      msgs.blacklist = {
        title: `${!!is_blacklist ? '取消' : '加入'}黑名单`,
        content: ' ',
        hasChild: true,
        isAdded: !!is_blacklist
      }
    }

    const msg =
      type === '2' || type === '5' ? this._msgs.company : this._msgs.person

    const NiceName = () => (
      <span
        key="info"
        onClick={this.onOpenNameModal}
        className="info part tes fs12 cp tar"
      >
        修改备注
      </span>
    )

    return (
      <Loading spinning={loading} className="bg-fff oay sb pb50 bsb">
        {/* banner */}
        <div className={`${style.banner} wp100 pr`}>
          <Header
          // right={<EllipsisPopover onSelect={this.onSelectPopoverItem} />}
          >
            详情资料
          </Header>
          <img
            src={require('../../assets/images/msg-info-detail-banner.png')}
            className="wp100 hp100"
          />
        </div>
        {/* content */}
        <div className="wp100">
          {/* 名片 */}
          <div className={`${style.busCard} pl10 pr10 bsb wp100 pr zi100`}>
            <div className="wp100 bg-fff br5 bsb pl30 pr30 pt25 pb20">
              <div className={`${style.busCardTitle} pr bsb wp100`}>
                <Image
                  className="img palt bg-f0f0f0"
                  url={head_img}
                  defImg={defHead}
                />
                <h6
                  className={`fw400 fs14 pr bsb ${!profession ? 'mt10' : ''}`}
                >
                  <span className="name dib vat tes bsb pr">
                    {nickname || realname || this.props.contact.user.name}
                    {is_member === 1 && sex && (
                      <span
                        className="gender part"
                        style={{
                          backgroundImage: `url(${require(`../../assets/images/${
                            sex === '1' ? 'male' : 'female'
                          }-icon.png`)})`
                        }}
                      />
                    )}
                  </span>
                  {is_member === 1 && <NiceName key="info" />}
                </h6>
                {profession && (
                  <p className="wp100 fs12">
                    <span className="dib vat tes">{profession}</span>
                    {/* <span className="dib vat tes">研发部长</span> */}
                  </p>
                )}
              </div>
              <p className="wp100 fs12 mt15 clearfix">
                <span className="dib vat tes fl">
                  爱米盛号：{this.props.contact.user.name}
                </span>
                {is_member !== 0 && /^1[34578]\d{9}$/.test(bind_phone) && (
                  <span
                    onClick={() => telByPlusOrJS(bind_phone)}
                    className="tel-span dib vat tes fr cp bsb"
                    style={{
                      backgroundImage: `url(${require('../../assets/images/phone-icon.png')})`
                    }}
                  >
                    {bind_phone}
                  </span>
                )}
              </p>
            </div>
          </div>
          {/* msg */}
          <div className={`${style.msg} wp100`}>
            <h6 className="wp100 fw400 fs14 mt10 plr10 bsb">{msg.title}</h6>
            {msg.msgs.map((k: any) => {
              const m = msgs[k]
              if (!m) {
                return null
              }
              const hasChild = m.hasChild && m.content

              return (
                <div
                  key={m.title}
                  onClick={() => this.onMsgItem(hasChild, { key: k, ...m })}
                  className={`msg-item wp100 bsb fs12 bb1 pr ${
                    k === 'address' ? 'address-item' : ''
                  }`}
                >
                  <span className="fl">{m.title}</span>
                  <span className="dib vat tes fr">{m.content}</span>
                  {hasChild && (
                    <Icon
                      className="part"
                      type="right"
                      size="md"
                      color="#666"
                    />
                  )}
                </div>
              )
            })}
          </div>
          {/* send msg */}
          {is_member !== 0 && !is_blacklist && (
            <span
              onClick={() =>
                this.props.chat.entryChat(E_CHAT_TYPE.SINGLE, chat_id)
              }
              className={`${style.btn} cp db ma bg-fb3f3e fs-fff fs12 tac`}
            >
              发送信息
            </span>
          )}
          {is_member === 1 ? (
            <span
              onClick={() => this.setState({ isShowDelFriend: true })}
              // className="dib vat tes fr fs-fb3f3e cp"
              className={`${style.telBtn} cp db ma fs12 tac`}
            >
              删除好友
            </span>
          ) : is_member === 2 ? (
            <span
              // className="dib vat tes fr fs-fb3f3e cp"
              className={`${style.telBtn} cp db ma fs12 tac`}
              onClick={() => this.props.history.replace(`/add-send/${id}`)}
            >
              加为好友
            </span>
          ) : null}
        </div>
        {/* 删除好友 */}
        <CbModal
          isShow={isShowDelFriend}
          onClose={() => this.setState({ isShowDelFriend: false })}
          onSure={this.onDelFriend}
        >
          <div className={`${style.delFriend} wp100`}>
            <em
              className="db"
              style={{
                backgroundImage: `url(${require('../../assets/images/delete-info-icon.png')})`
              }}
            />
            <p className="fs12">确定要删除该商友，同时删除与TA的聊天记录吗？</p>
          </div>
        </CbModal>
        {/* 修改备注 */}
        <CbModal
          isShow={isShowEditName}
          onClose={() => this.setState({ isShowEditName: false })}
          onSure={this.onEditName}
        >
          <div className={`${style.nicknameInput} cb-input wp100`}>
            <InputItem
              value={name}
              placeholder="请输入"
              onChange={val => this.setState({ name: val.trim() })}
            >
              备注：
            </InputItem>
          </div>
        </CbModal>
        {/* 分享 */}
        <SharePopup
          title="分享商友名片到"
          isShow={isShowShare}
          onClose={() => this.setState({ isShowShare: false })}
        />
      </Loading>
    )
  }
}

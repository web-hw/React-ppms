import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { RouteComponentProps, Link } from 'react-router-dom'
import { SwipeAction, Drawer, Flex, Icon, Accordion, Grid } from 'antd-mobile'
import moment from 'moment'

import { E_SHARE_TYPE } from 'global@util/share/config'
import { shareUrl } from 'global@util/share'
import { serialize } from 'global@util/serialize'
import 'global@util/share/style.scss'
import { toast } from 'global@util/toast/mobile'
import { session } from 'global@util/storage'
import { HISTORY_STATE } from 'global@constant'
import { defGroupHead, defHead, REPEAT_SEND } from '../../constant'
import Chat from '../../store/chat'
import User from '../../store/user'
import Contact from '../../store/contact'
import Empty from '../../component/empty'
import { E_CHAT_TYPE } from '../../store/chat/constant'
import { Header } from '../../component/header'
import { FooterV1 } from '../../component/footer'
import Image from '../../component/image'
import { AddPopover } from '../../component/popover'
import { CustomRefresh, EDirection } from '../../component/custom-refresh'
import { TChat } from '../../store/chat/chat'
import { ICompanyGroup } from '../../store/contact/contact'
const style = require('./style')

interface IPropsMsg extends RouteComponentProps {
  chat: Chat
  user: User
  contact: Contact
}

interface IStateMsg {
  isVisibleDrawer: boolean
  isVisibleShare: boolean
  isVisibleOther: boolean
}

@inject('user', 'chat', 'contact')
@observer
export default class Msg extends React.Component<IPropsMsg, IStateMsg> {
  // 消息图标
  private _msgIcon = require('../../assets/images/msg-hd-lf-icon.png')
  // to contact icon
  private _cttIcon = require('../../assets/images/contact-icon.png')
  private _others: any = [
    {
      name: '产品中心',
      icon: require('../../assets/images/other-pro.png'),
      url: 'http://wap.amisheng.com/mall/new_product/main.html'
    },
    {
      name: '会务中心',
      icon: require('../../assets/images/other-hw.png'),
      url: 'http://wap.amisheng.com/index/index/exh_list.html'
    },
    {
      name: '新闻中心',
      icon: require('../../assets/images/other-xw.png'),
      url: 'http://wap.amisheng.com/index/news/cate_list.html'
    },
    {
      name: '项目中心',
      icon: require('../../assets/images/other-xm.png'),
      url: 'http://wap.amisheng.com/index/project/cate_list.html'
    }
  ]

  // select item
  private onSelectMore(item: any) {
    this.props.history.replace(item.key)
  }
  // 分享
  private onShare(type: E_SHARE_TYPE) {
    const origin = location.origin

    shareUrl(type, {
      title: '爱米哒哒',
      description: '上爱米哒哒，做不凡的自己！',
      pic: `${origin}/${require('../../assets/images/about-us-logo.png')}`,
      url: `${origin}/#/app-share`,
      reason: ''
    }).catch(err => toast.info(err.message || '未知错误'))
  }

  private onJumpOther(other: any) {
    const data = serialize.stringifyOrEncode({
      name: other.name,
      url: other.url
    })
    this.props.history.replace(`/iframe-other/${data}`)
  }

  // 初始化通讯录
  private async initBooks() {
    await this.props.contact.getBooks()
  }

  private onEntryChat(e: any, type: E_CHAT_TYPE, itm: any) {
    e.preventDefault()
    e.stopPropagation()
    // 检查是否是群成员
    // if (type === E_CHAT_TYPE.GROUP && !itm.is_exist) {
    //   return
    //   // return toast.info('你当前不是该群成员')
    // }
    this.props.chat.entryChat(type, itm.chat_id)

    // // 检查是否是有效转发
    // const repeatMsgs = session.get(REPEAT_SEND)
    // if (repeatMsgs) {
    //   this.props.chat.entryChat(type, itm.chat_id)
    // } else {
    //   if (type === 'group') {
    //     this.props.chat.entryChat(type, itm.chat_id)
    //   }

    //   if (type === 'single') {
    //     this.props.history.replace(`/msg-info-detail/${itm.id}`)
    //   }
    // }
  }

  private getCompanyGroup(groups: ICompanyGroup[], level: number = 1) {
    const Item = (props: { group: any }) => {
      const {
        pid,
        group_type,
        is_exist, // 群特有
        name,
        realname,
        head_img,
        chat_id,
        id
      } = props.group || {}
      const isGroup = group_type !== undefined
      let chatIcon = ''
      if (!isGroup) {
        chatIcon = require('../../assets/images/chat-single.png')
      } else {
        if (!is_exist) {
          return null
        }

        if (pid === '0') {
          chatIcon = require('../../assets/images/chat-company.png')
        } else {
          if (group_type === 'department') {
            chatIcon = require('../../assets/images/chat-department.png')
          }
          if (group_type === 'group') {
            chatIcon = require('../../assets/images/chat-group.png')
          }
        }
      }

      return (
        <div
          className={pid === '0' ? style.msgBookItemRoot : style.msgBookItem}
          style={{ paddingLeft: `${0.4286 * (level - 1) + 2}rem` }}
        >
          <Image
            url={head_img}
            defImg={isGroup ? defGroupHead : defHead}
            className="icon"
            style={{ left: `${0.4286 * level}rem` }}
          />
          <div className="content tes">{realname || name}</div>
          <span
            className="right-icon"
            style={{ backgroundImage: !chatIcon ? 'none' : `url(${chatIcon})` }}
            onClick={(e: any) =>
              this.onEntryChat(
                e,
                isGroup ? E_CHAT_TYPE.GROUP : E_CHAT_TYPE.SINGLE,
                { chat_id, is_exist, group_type, id }
              )
            }
          />
        </div>
      )
    }

    return groups.map((g: any) => {
      const children = [...(g.children || []), ...(g.members || [])]
      // const hasChildren = g.children && g.children.length > 0
      const hasChildren = children.length > 0

      if (!hasChildren) {
        return <Item key={`${g.pid}-${g.id}`} group={g} />
      }

      return (
        <Accordion.Panel key={`${g.pid}-${g.id}`} header={<Item group={g} />}>
          <Accordion accordion={true}>
            {/* {this.getCompanyGroup(g.children, level + 1)} */}
            {this.getCompanyGroup(children, level + 1)}
          </Accordion>
        </Accordion.Panel>
      )
    })
  }

  private onLoadOther(done: Function, status: boolean) {
    this.setState(() => ({ isVisibleOther: status }), () => done && done())
  }

  constructor(props: IPropsMsg) {
    super(props)

    this.state = {
      isVisibleShare: false,
      isVisibleDrawer: false,
      isVisibleOther: false
    }

    this.onSelectMore = this.onSelectMore.bind(this)
  }

  componentDidMount() {
    this.initBooks()
    // session.remove(HISTORY_STATE)
    // this.props.chat.createWs()
  }

  render() {
    const { isVisibleShare, isVisibleOther } = this.state
    const { cb_nickname, head_img } = this.props.user.info
    const { books } = this.props.contact
    const { company_group = [] } = books
    const { chats } = this.props.chat
    const msgs = chats[this.props.user.info.chat_id] || []

    return (
      <Drawer
        className={style.msgDrawer}
        sidebar={
          <div className="wp100 hp100 oh fs0 pr pb50 bsb">
            <div className="person-msg wp100 palt oh">
              <img
                src={require('../../assets/images/chat-msg-person-bg.png')}
                onLoad={(e: any) => {
                  const target = e.target
                  if (target) {
                    target.parentElement.parentElement.style.paddingTop = `${target.height}px`
                  }
                }}
              />
              <div className="content mc bsb">
                <Image className="img palt" url={head_img} defImg={defHead} />
                <div className="wp100 hp100 fs16 tes">{cb_nickname}</div>
              </div>
            </div>
            <div className="wp100 hp100 oay sb">
              <div className="ope-itm wp100 pl10 bsb">
                <Link
                  to="/chat-person-msg"
                  replace={true}
                  className="tes"
                  style={{
                    backgroundImage: `url(${require('../../assets/images/chat-msg-person-msg.png')})`
                  }}
                >
                  个人资料
                </Link>
              </div>
              <div className="ope-itm wp100 pl10 bsb">
                <Link
                  to="/account-info"
                  replace={true}
                  className="tes"
                  style={{
                    backgroundImage: `url(${require('../../assets/images/chat-msg-account-info.png')})`
                  }}
                >
                  账号信息
                </Link>
              </div>
              <div className="ope-itm wp100 pl10 bsb">
                <Link
                  to="/my-collect"
                  replace={true}
                  className="tes"
                  style={{
                    backgroundImage: `url(${require('../../assets/images/chat-msg-person-file.png')})`
                  }}
                >
                  我的收藏
                </Link>
              </div>
              <div className="ope-itm wp100 pl10 bsb">
                <Link
                  to="/msg-set"
                  replace={true}
                  className="tes"
                  style={{
                    backgroundImage: `url(${require('../../assets/images/chat-msg-set.png')})`
                  }}
                >
                  消息设置
                </Link>
              </div>
              <div className="ope-itm wp100 pl10 bsb">
                <Link
                  to="/about-us"
                  replace={true}
                  className="tes"
                  style={{
                    backgroundImage: `url(${require('../../assets/images/chat-msg-person-about.png')})`
                  }}
                >
                  关于我们
                </Link>
              </div>
              <div className="ope-itm wp100 pl10 bsb">
                <a
                  href="javascript:void(0);"
                  className="tes"
                  onClick={() => this.setState({ isVisibleShare: true })}
                  style={{
                    backgroundImage: `url(${require('../../assets/images/chat-msg-share.png')})`
                  }}
                >
                  分享
                </a>
              </div>
            </div>
            <div className="logout wp100 palb tac bsb ptb10">
              <span
                className="fs12 fs-fff"
                onClick={() => this.props.user.logout()}
              >
                退出
              </span>
            </div>
            <div
              onClick={() => this.setState({ isVisibleShare: false })}
              className={`share-app wp100 hp100 zi100 oh palt ${
                isVisibleShare ? 'active' : ''
              }`}
            >
              <div
                onClick={(e: any) => e.stopPropagation()}
                className="share-app-content palb wp100 bg-fff"
              >
                <div className="share-app-title wp100 oh tac fs12">分享到</div>
                <div className="share-app-body wp100 oh bsb">
                  <Flex>
                    <Flex.Item
                      onClick={() => this.onShare(E_SHARE_TYPE.WEIXIN)}
                    >
                      <img
                        src={require('../../assets/images/share-wxpy-app.png')}
                      />
                      <div className="wp100 tes">微信</div>
                    </Flex.Item>
                    <Flex.Item
                      onClick={() => this.onShare(E_SHARE_TYPE.WEIXIN_TIMELINE)}
                    >
                      <img
                        src={require('../../assets/images/share-wxpyq-app.png')}
                      />
                      <div className="wp100 tes">朋友圈</div>
                    </Flex.Item>
                    <Flex.Item onClick={() => this.onShare(E_SHARE_TYPE.QQ)}>
                      <img
                        src={require('../../assets/images/share-qq-app.png')}
                      />
                      <div className="wp100 tes">QQ</div>
                    </Flex.Item>
                  </Flex>
                </div>
              </div>
            </div>
          </div>
        }
        position="left"
        open={this.state.isVisibleDrawer}
        onOpenChange={isVisibleDrawer => this.setState({ isVisibleDrawer })}
      >
        <div className={`${style.refresh} wp100 hp100 pr bsb pt50 fs0 oh`}>
          <Header
            onClickLeft={() =>
              this.setState({ isVisibleDrawer: true, isVisibleShare: false })
            }
            left={
              // <span
              //   className={style.msgHdLf}
              //   style={{ backgroundImage: `url(${this._msgIcon})` }}
              // >
              //   消息
              // </span>
              <Image
                className={style.msgHdLfImg}
                url={head_img}
                defImg={defHead}
              />}
            right={
              <span className={style.msgHdRt}>
                {/* <em
                  onClick={() => this.props.history.replace('/address-book')}
                  style={{ backgroundImage: `url(${this._cttIcon})` }}
                /> */}
                <Icon
                  type="search"
                  size="md"
                  color="#333"
                  onClick={() => this.props.history.replace('/chat-search')}
                />
                <AddPopover onSelect={this.onSelectMore} />
              </span>}
          />
          <div className="wp100 hp100 bsb pb50 pr oh">
            <CustomRefresh
              hasData={true}
              direction={EDirection.DOWN}
              onRefresh={done => this.onLoadOther(done, true)}
              indicator={{
                activate: (
                  <Icon type="down" size="lg" className="vat" color="#fff" />
                ),
                finish: (
                  <Icon type="down" size="lg" className="vat" color="#fff" />
                ),
                deactivate: (
                  <Icon type="down" size="lg" className="vat" color="#fff" />
                ),
                release: (
                  <Icon type="down" size="lg" className="vat" color="#fff" />
                )
              }}
            >
              <div
                className={`${style.msg} wp100 bg-fff`}
                ref={(el: any) => {
                  if (!el) {
                    return
                  }
                  const s = window.getComputedStyle(
                    el.parentElement.parentElement.parentElement,
                    null
                  )
                  el.style.minHeight = s.height
                }}
              >
                {company_group.length === 0 && msgs.length === 0 && <Empty />}
                {company_group.length > 0 && (
                  <div
                    className={`${style.msgCompanyGroup} wp100 top`}
                    onClick={(event: any) => {
                      event.preventDefault()
                      event.stopPropagation()
                    }}
                  >
                    <Accordion accordion={true}>
                      {this.getCompanyGroup(company_group)}
                      {/* */}
                    </Accordion>
                  </div>
                )}
                {msgs.length > 0 &&
                  msgs.map((c: any) => {
                    const defHd =
                      c.chatType === E_CHAT_TYPE.GROUP ? defGroupHead : defHead
                    return (
                      <SwipeAction
                        key={c.toChatId}
                        autoClose={true}
                        right={[
                          {
                            text: c.isTop ? '取消' : '置顶',
                            className: 'top-btn',
                            onPress: () => this.props.chat.topChat(c)
                          },
                          {
                            text: '删除',
                            className: 'del-btn',
                            onPress: () => this.props.chat.deleteChat(c)
                          }
                        ]}
                      >
                        <div
                          className={`${style.msgItem} ${
                            c.isTop ? 'top' : ''
                          } bsb wp100 pr`}
                          onClick={() =>
                            this.props.chat.entryChat(c.chatType, c.toChatId)
                          }
                        >
                          <div className="head palt bg-f0f0f0">
                            {c.unread && (
                              <em className="part brp50 bg-fb3f3e" />
                            )}
                            <Image
                              className="br4"
                              url={c.toChatAvatar}
                              defImg={defHd}
                              style={{ width: '100%', height: '100%' }}
                            />
                          </div>
                          <div className="content wp100 hp100 bsb pt10 pb10 pr">
                            <h6 className="fs16 fw500 wp100 tes">
                              {c.toChatName}
                            </h6>
                            <p
                              className="fs12 wp100 tes"
                              dangerouslySetInnerHTML={{ __html: c.message }}
                            />
                            <div className="right hp100 part bsb ptb15 tar">
                              <div className="time fs11 wp100 tes">
                                {c.sendTime
                                  ? moment(c.sendTime).format('MM-DD HH:mm:ss')
                                  : ''}
                              </div>
                            </div>
                          </div>
                        </div>
                      </SwipeAction>
                    )
                  })}
              </div>
            </CustomRefresh>
            <FooterV1 />
            <div
              className={`other-content wp100 hp100 palb oh ${
                isVisibleOther ? 'active' : ''
              }`}
            >
              <div className="other-body wp100 hp100 bsb pr">
                <div className="other-title wp100 fs15 palt tac">小程序</div>
                <div className="wp100 hp100 oay sb">
                  <Grid
                    data={this._others}
                    columnNum={4}
                    square={false}
                    hasLine={false}
                    activeStyle={false}
                    renderItem={item => (
                      <div
                        className="other-item oh"
                        onClick={() => this.onJumpOther(item)}
                      >
                        <Image className="img" fit="auto" url={item.icon} />
                        <span className="fs12 db tes">{item.name}</span>
                      </div>
                    )}
                  />
                </div>
                <div className="other-footer wp100 palb">
                  <Icon
                    type="up"
                    size="lg"
                    className="vat"
                    color="#fff"
                    onClick={() => this.onLoadOther(null, false)}
                  />
                </div>
              </div>
              {/* <CustomRefresh
                hasData={true}
                direction={EDirection.UP}
                onRefresh={done => this.onLoadOther(done, false)}
                indicator={{
                  activate: (
                    <Icon type="up" size="lg" className="vat" color="#fff" />
                  ),
                  finish: (
                    <Icon type="up" size="lg" className="vat" color="#fff" />
                  ),
                  deactivate: (
                    <Icon type="up" size="lg" className="vat" color="#fff" />
                  ),
                  release: (
                    <Icon type="up" size="lg" className="vat" color="#fff" />
                  )
                }}
              >

              </CustomRefresh> */}
            </div>
          </div>
        </div>
      </Drawer>
    )
  }
}

import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { Link, RouteComponentProps } from 'react-router-dom'
import { Icon, Accordion } from 'antd-mobile'

import { session } from 'global@util/storage'
import { toast } from 'global@util/toast/mobile'
import { defHead, defGroupHead, REPEAT_SEND } from '../../constant'
import Contact from '../../store/contact'
import { ICompanyGroup } from '../../store/contact/contact'
import Chat from '../../store/chat'
import { E_CHAT_TYPE } from '../../store/chat/constant'
import Loading from '../../component/loading'
import { Header } from '../../component/header'
import { FooterV1 } from '../../component/footer'
import Image from '../../component/image'
import { AddPopover } from '../../component/popover'
import LetterSort from '../../component/letter-sort'
const style = require('./style')

interface IPropsAddressBook extends RouteComponentProps {
  contact: Contact
  chat: Chat
}

interface IStateAddressBook {
  loading: boolean
  verifyMsgs: any[]
}

@inject('contact', 'chat')
@observer
export default class AddressBook extends React.Component<
  IPropsAddressBook,
  IStateAddressBook
> {
  // select item
  private onSelectMore(item: any) {
    this.props.history.replace(item.key)
  }

  // 初始化通讯录
  private async initBooks() {
    this.setState({ loading: true })
    await this.props.contact.getBooks()
    this.setState({ loading: false })
  }

  private onClickBody(event: any) {
    // event.preventDefault()
    event.stopPropagation()
    // 删除转发内容
    session.remove(REPEAT_SEND)
  }

  private onEntryChat(e: any, type: E_CHAT_TYPE, itm: any) {
    e.preventDefault()
    e.stopPropagation()
    // 检查是否是群成员
    if (type === E_CHAT_TYPE.GROUP && !itm.is_exist) {
      return
      // return toast.info('你当前不是该群成员')
    }

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
        if (!!is_exist) {
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
      }

      return (
        <div
          className={style.bookItem}
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

  private async getUnreadMsgVerify() {
    await this.props.contact.getMsgVerifies()
    const msgs: any = []
    this.props.contact.verifies.forEach((v: any) => {
      const msg = this.props.contact.getVerify(v)
      msg.id && msg.status === '0' && msgs.push(msg)
    })
    this.setState({ verifyMsgs: msgs })
  }

  private getLetters(letters: any[], hasTop = true) {
    const lts = letters.map(f => f.upper)
    if (hasTop && !lts.includes('#')) {
      lts.push('#')
    }

    return lts
  }

  constructor(props: IPropsAddressBook) {
    super(props)

    this.state = {
      loading: false,
      verifyMsgs: []
    }

    this.onSelectMore = this.onSelectMore.bind(this)
  }

  componentDidMount() {
    this.initBooks()
    this.getUnreadMsgVerify()
  }

  render() {
    const { loading } = this.state
    const { books } = this.props.contact
    const { friend = [], company_group = [] } = books

    return (
      <Loading spinning={loading}>
        <div
          onClick={this.onClickBody}
          className="wp100 hp100 pr fs0 ptb50 bsb bg-f0f0f0 oh"
        >
          <Header
            left={
              <span>
                <Icon type="left" className="cb-left-lg vat" size="lg" />
                通讯录
              </span>
            }
            right={
              <span>
                <AddPopover onSelect={this.onSelectMore} />
              </span>
            }
          />
          <LetterSort letters={this.getLetters(friend)}>
            <div data-anchor="#" className="wp100 pt10">
              <Link className={style.bookItem} to="/msg-verify" replace={true}>
                <img
                  className="icon"
                  src={require('../../assets/images/yztx-icon.png')}
                />
                {this.state.verifyMsgs.length > 0 && (
                  <em className="verify-info" />
                )}
                <div className="content tes">验证提醒</div>
              </Link>
              <Link className={style.bookItem} to="/group" replace={true}>
                <img
                  className="icon"
                  src={require('../../assets/images/wdqz-icon.png')}
                />
                <div className="content tes">我的群组</div>
              </Link>
              <Link className={style.bookItem} to="/stranger" replace={true}>
                <img
                  className="icon"
                  src={require('../../assets/images/msr-icon.png')}
                />
                <div className="content tes">陌生人</div>
              </Link>
            </div>
            {company_group.length > 0 && (
              <div
                className={`${style.companyGroup} wp100 mt10 bg-fff`}
                onClick={(event: any) => {
                  event.preventDefault()
                  event.stopPropagation()
                }}
              >
                <Accordion accordion={true}>
                  {this.getCompanyGroup(company_group)}
                </Accordion>
              </div>
            )}

            {friend.map((f, i) => (
              <div key={i} data-anchor={f.lower} className="wp100">
                <h6 className="cb-contact-title">{f.upper}</h6>
                <div className="wp100 bg-fff">
                  {(f.data || []).map(itm => (
                    <div
                      key={`${i}-${itm.id}`}
                      // onClick={() => {
                      //   console.log('进入')
                      //   this.props.history.replace(`/msg-info-detail/${itm.id}`)
                      // }}
                      onClick={(e: any) =>
                        this.onEntryChat(e, E_CHAT_TYPE.SINGLE, itm)
                      }
                      className={`${style.cttItmContent} cb-contact-content`}
                    >
                      <Image
                        url={itm.head_img}
                        defImg={defHead}
                        className="icon"
                      />
                      <div className="content">
                        <h6 className="content-title">
                          {itm.realname}
                          {itm.nickname ? `(${itm.nickname})` : ''}
                        </h6>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </LetterSort>
          <FooterV1 />
        </div>
      </Loading>
    )
  }
}

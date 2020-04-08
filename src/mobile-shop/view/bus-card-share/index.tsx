import * as React from 'react'
import { observer, inject } from 'mobx-react'
import { RouteComponentProps } from 'react-router-dom'
import { Button } from 'antd-mobile'

import { toast } from 'global@util/toast/mobile'
import Empty from '../../component/empty'
import Loading from '../../component/loading'
import { Header } from '../../component/header'
import { defHead } from '../../constant'
import Image from '../../component/image'
import LetterSort from '../../component/letter-sort'
import Contact from '../../store/contact'
import Chat from '../../store/chat'
import { E_CHAT_TYPE, E_MESSAGE_TYPE } from '../../store/chat/constant'
const style = require('./style')

interface IPropsBusCardShare extends RouteComponentProps {
  contact: Contact
  chat: Chat
}

interface IStateBusCardShare {
  selectItem: any
  loading: boolean
}

@inject('contact', 'chat')
@observer
export default class BusCardShare extends React.Component<
  IPropsBusCardShare,
  IStateBusCardShare
> {
  private _selIcon = require('../../assets/images/select-icon.png')

  // 初始化通讯录
  private async init() {
    this.setState({ loading: true })
    await this.props.contact.getBooks()
    this.setState({ loading: false })
  }

  constructor(props: IPropsBusCardShare) {
    super(props)

    this.state = {
      loading: false,
      selectItem: null
    }

    this.onShareCart = this.onShareCart.bind(this)
  }

  private getLetters(letters: any[], hasTop = true) {
    const lts = letters.map(f => f.upper)
    if (hasTop && !lts.includes('#')) {
      lts.push('#')
    }

    return lts
  }

  private onShareCart() {
    const { selectItem } = this.state
    if (!selectItem || !selectItem.id) {
      return toast.info('请选择有效的好友')
    }

    const param: any = this.props.match.params
    this.props.chat.sendMsg({
      content: {
        chatType: param.chatType,
        toChatId: param.toChatId,
        messageType: E_MESSAGE_TYPE.NAMECARD,
        message: {
          id: selectItem.id,
          name: selectItem.name,
          realname: selectItem.realname || selectItem.name || '',
          head_img: selectItem.head_img
        }
      }
    })

    setTimeout(() => Header.goBack(), 1)
  }

  componentDidMount() {
    this.init()
    // this.props.chat.createWs()
  }

  render() {
    const { loading, selectItem } = this.state
    const { friend = [] } = this.props.contact.books || {}

    return (
      <Loading
        spinning={loading}
        className={`${style.shareBusCard} fs0 pt50 bsb pr bg-f0f0f0 oh`}
      >
        <Header
          right={
            <Button size="small" onClick={this.onShareCart}>
              完成
            </Button>}
        >
          好友名片分享
        </Header>
        <LetterSort letters={this.getLetters(friend, false)}>
          {friend.length === 0 ? (
            <Empty />
          ) : (
            friend.map((f, i) => (
              <div key={i} data-anchor={f.lower} className="wp100">
                <h6 className="cb-contact-title">{f.upper}</h6>
                <div className="wp100 bg-fff">
                  {(f.data || []).map((itm: any) => {
                    const isSel = (selectItem || {}).id === itm.id

                    return (
                      <div
                        onClick={() =>
                          this.setState({
                            selectItem: isSel ? null : itm
                          })
                        }
                        key={`${i}-${itm.id}`}
                        className={`${style.item} cb-contact-content`}
                      >
                        <em
                          className={`${isSel ? 'active' : ''} sel-icon`}
                          style={{
                            backgroundImage: `url(${
                              isSel ? this._selIcon : ''
                            })`
                          }}
                        />
                        <Image
                          className="icon"
                          url={itm.head_img}
                          defImg={defHead}
                        />
                        <div className="content">
                          <h6 className="content-title">{itm.realname}</h6>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))
          )}
        </LetterSort>
      </Loading>
    )
  }
}

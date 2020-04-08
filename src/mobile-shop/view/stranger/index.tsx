import * as React from 'react'
import { observer, inject } from 'mobx-react'
import { RouteComponentProps } from 'react-router-dom'
import {} from 'antd-mobile'

import { serialize } from 'global@util/serialize'
import { local } from 'global@util/storage'
import { Header } from '../../component/header'
import Search from '../../component/search'
import { defHead } from '../../constant'
import Loading from '../../component/loading'
import Empty from '../../component/empty'
import Image from '../../component/image'
import Contact from '../../store/contact'
import Chat from '../../store/chat'
import { E_CHAT_TYPE } from '../../store/chat/constant'
import LetterSort from '../../component/letter-sort'
import { zhSort } from 'global@util/zh-sort'
const style = require('./style')

interface IPropsStranger extends RouteComponentProps {
  contact: Contact
  chat: Chat
}

interface IStateStranger {
  search: string
  loading: boolean
  strangers: any[]
  data: any[]
}

@inject('contact', 'chat')
@observer
export default class Stranger extends React.Component<
  IPropsStranger,
  IStateStranger
> {
  private onSureSearch() {
    const { search, strangers } = this.state
    let data = serialize.copy(strangers)

    if (search) {
      data = data.filter((d: any) => d.name.includes(search))
    }

    this.setState({ data: zhSort({ data, key: 'name' }) })
  }

  private getLetters(letters: any[], hasTop = true) {
    const lts = letters.map(f => f.upper)
    if (hasTop && !lts.includes('#')) {
      lts.push('#')
    }

    return lts
  }

  async init() {
    this.setState({ loading: true })
    await this.props.contact.getBooks()
    const { books } = this.props.contact
    const { friend = [] } = books
    const strangers = (local.get('STRANGER') || []).filter(
      (d: any) => !friend.find((f: any) => f.chat_id === d.chatId)
    )
    local.set('STRANGER', strangers)
    this.setState({
      strangers: serialize.copy(strangers),
      data: zhSort({ key: 'name', data: strangers }),
      loading: false
    })
  }

  constructor(props: IPropsStranger) {
    super(props)

    this.state = {
      search: '',
      loading: false,
      strangers: [],
      data: []
    }
  }

  componentDidMount() {
    this.init()
  }

  render() {
    const { search, loading, data } = this.state

    return (
      <div className="wp100 hp100 fs0 pt50 bsb pr bg-f0f0f0 oh">
        <Header>陌生人</Header>
        <Loading spinning={loading} className={`${style.stranger} bsb`}>
          <div className="search wp100 bsb tac palt bsb bg-fff">
            <Search
              value={search}
              onChange={search => this.setState({ search: search.trim() })}
              onSure={() => this.onSureSearch()}
              placeholder="输入关键字搜索"
            />
          </div>
          <div className="wp100 hp100">
            <LetterSort letters={this.getLetters(data, false)}>
              {data.length === 0 ? (
                <Empty />
              ) : (
                data.map((p: any) => {
                  return (
                    <div key={p.lower} data-anchor={p.lower} className="wp100">
                      <h6 className="cb-contact-title">{p.upper}</h6>
                      <div className="wp100 bg-fff">
                        {(p.data || []).map((m: any) => (
                          <div
                            key={`${p.lower}-${m.chatId}`}
                            className="cb-contact-content"
                            onClick={() =>
                              this.props.chat.entryChat(
                                E_CHAT_TYPE.SINGLE,
                                m.chatId
                              )
                            }
                          >
                            <Image
                              className="icon"
                              url={m.head_img}
                              defImg={defHead}
                            />
                            <div className="content">
                              <h6 className="content-title">{m.name}</h6>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                })
              )}
            </LetterSort>
          </div>
        </Loading>
      </div>
    )
  }
}

import * as React from 'react'
import { observer, inject } from 'mobx-react'
import { RouteComponentProps } from 'react-router-dom'
import { Icon } from 'antd-mobile'

import { toast } from 'global@util/toast/mobile'
import { serialize } from 'global@util/serialize'
import { Header } from '../../component/header'
import { defHead, defGroupHead } from '../../constant'
import Loading from '../../component/loading'
import Image from '../../component/image'
import Search from '../../component/search'
import Contact from '../../store/contact'
import Chat from '../../store/chat'
import { E_CHAT_TYPE } from '../../store/chat/constant'
const style = require('./style')

interface IPropsChatSearch extends RouteComponentProps {
  chat: Chat
  contact: Contact
}

interface IStateChatSearch {
  search: string
  loading: boolean
  searchRes: any
}

@inject('chat', 'contact')
@observer
export default class ChatSearch extends React.Component<
  IPropsChatSearch,
  IStateChatSearch
> {
  private _types: any = ['friend', 'colleague', 'group', 'dis_group', 'message']

  private handleData(
    type: 'friend' | 'colleague' | 'group-chat' | 'group' | 'chat-record',
    search: string,
    data: any[]
  ) {
    const result: any[] = []
    data.forEach((itm: any) => {
      const {
        id = '',
        chat_id,
        head_img,
        chatType = '',
        chatId,
        count = 0,
        name = '',
        nickname = '',
        pet_name = '',
        realname = ''
      } = itm
      const res: any = { type, chatType, count, id }
      if (
        type === 'friend' || // nickname | pet_name | realname | name
        type === 'colleague' || // pet_name | realname | name
        type === 'group' || // name
        type === 'group-chat' // name
      ) {
        if (nickname.includes(search)) {
          res.name = nickname.replace(search, `<em>${search}</em>`)
        }
        if (pet_name.includes(search)) {
          res.name = pet_name.replace(search, `<em>${search}</em>`)
        }
        if (realname.includes(search)) {
          res.name = realname.replace(search, `<em>${search}</em>`)
        }
        if (name.includes(search)) {
          res.name = name.replace(search, `<em>${search}</em>`)
        }

        if (res.id && chat_id && res.name) {
          result.push({
            ...res,
            chat_id,
            head_img,
            chatType:
              type === 'group' || type === 'group-chat' ? 'group' : 'single'
          })
        }
      }

      if (type === 'chat-record') {
        const info = itm.info || {}
        if (info.name && chatId && res.chatType && res.count) {
          result.push({
            ...res,
            name: info.name,
            chat_id: chatId,
            head_img: info.avatar
          })
        }
      }
    })

    return result
  }

  private async onSureSearch() {
    const { search } = this.state
    if (!search) {
      return
    }

    this.setState({ loading: true })
    const result = await this.props.contact.getChatSearchAll(search)
    const data = result.data || {}
    let state: any = { loading: false }
    if (data.code === 200) {
      const friend = data.friend || []
      const colleague = data.colleague || []
      const group = data.group || []
      const disGroup = data.dis_group || []
      const message = data.message || []
      if (
        friend.length === 0 &&
        colleague.length === 0 &&
        group.length === 0 &&
        disGroup.length === 0 &&
        message.length === 0
      ) {
        toast.info('暂无数据')
      } else {
        state = {
          ...state,
          searchRes: {
            friend: this.handleData('friend', search, friend),
            colleague: this.handleData('colleague', search, colleague),
            group: this.handleData('group-chat', search, group),
            dis_group: this.handleData('group', search, disGroup),
            message: this.handleData('chat-record', search, message)
          }
        }
      }
    }

    this.setState(state)
  }

  private jumpMore(data: any) {
    this.props.history.replace(
      `/chat-search-more/${serialize.stringifyOrEncode(data)}`
    )
  }

  private async jumpItem(data: any) {
    const { search } = this.state
    const { id, type, chat_id, chatType, name } = data

    switch (type) {
      case 'friend':
      case 'colleague':
        return this.props.history.replace(`/msg-info-detail/${id}`)
      case 'group':
      case 'group-chat':
        return this.props.chat.entryChat(E_CHAT_TYPE.GROUP, chat_id)
      case 'chat-record':
        const dt = await this.props.contact.getGroupOrUserMsg(chat_id)
        return this.props.history.replace(
          `/${chatType}-chat-msgs/${name}/${dt.id}/${chat_id}/all/${search}`
        )
    }
  }

  constructor(props: IPropsChatSearch) {
    super(props)

    this.state = {
      search: '',
      loading: false,
      searchRes: {
        friend: [],
        colleague: [],
        group: [],
        dis_group: [],
        message: []
      }
    }

    this.onSureSearch = this.onSureSearch.bind(this)
  }

  render() {
    const { search, loading, searchRes } = this.state

    return (
      <div className="wp100 hp100 pr bsb pt50 fs0 bg-f0f0f0 oh">
        <Header>搜索</Header>
        <div className={`${style.chatSearch} wp100 hp100 pr bsb`}>
          <div className="search bg-fff wp100">
            <Search
              value={search}
              onChange={search => this.setState({ search: search.trim() })}
              onSure={this.onSureSearch}
              placeholder="输入关键字搜索"
            />
          </div>
          <div className="search-info wp100 tes fs12 plr10 bsb">
            搜索好友、同事、群聊、讨论组、聊天记录
          </div>
          <Loading spinning={loading}>
            <div className="wp100 hp100 oay sb">
              {/* 好友、同事、群聊、讨论组、聊天记录 */}
              {this._types.map((type: any) => {
                const data = searchRes[type] || []
                if (data.length === 0) {
                  return null
                }
                const title =
                  type === 'friend'
                    ? '好友'
                    : type === 'colleague'
                    ? '同事'
                    : type === 'group'
                    ? '群聊'
                    : type === 'dis_group'
                    ? '讨论组'
                    : type === 'message'
                    ? '聊天记录'
                    : ''

                return (
                  <div key={type} className="search-item wp100 pl10 bsb bg-fff">
                    <div className="search-title wp100 bsb fs12 tes">
                      {title}
                    </div>
                    <div className="wp100">
                      {data.map((d: any) => (
                        <div
                          key={`${type}-${d.chat_id}`}
                          className="search-item-content wp100 pl45 bsb pr"
                          onClick={() => this.jumpItem(d)}
                        >
                          <Image
                            className="img palt"
                            url={d.head_img}
                            defImg={
                              d.chatType === 'group' ? defGroupHead : defHead
                            }
                          />
                          <div className="content wp100 hp100 bsb pt10 pb10 pr10">
                            <div
                              className={`name fs14 wp100 tes ${
                                type === 'message' ? '' : 'no-info'
                              }`}
                              dangerouslySetInnerHTML={{ __html: d.name }}
                            />
                            {type === 'message' && (
                              <div className="info fs12 wp100 tes">
                                包含{d.count}条相关{title}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div
                      className="search-more wp100 bsb fs12 tes"
                      onClick={() =>
                        this.jumpMore({ title, search, type: data[0].type })
                      }
                    >
                      <Icon type="search" size="sm" color="#666" />
                      更多相关{title}
                    </div>
                  </div>
                )
              })}
            </div>
          </Loading>
        </div>
      </div>
    )
  }
}

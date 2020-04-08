import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { RouteComponentProps } from 'react-router-dom'
import {} from 'antd-mobile'

import { serialize } from 'global@util/serialize'
import { CustomRefresh, EDirection } from '../../component/custom-refresh'
import { Header } from '../../component/header'
import { defHead, defGroupHead } from '../../constant'
import Contact from '../../store/contact'
import Chat from '../../store/chat'
import { E_CHAT_TYPE } from '../../store/chat/constant'
import Image from '../../component/image'
const style = require('./style')

interface IPropsChatSearchMore extends RouteComponentProps {
  contact: Contact
  chat: Chat
}

interface IStateChatSearchMore {
  loading: boolean
  search: string
  title: string
  data: any[]
  page: number
  pageSize: number
  hasData: boolean
  type: 'friend' | 'colleague' | 'group-chat' | 'group' | 'chat-record'
}

@inject('chat', 'contact')
@observer
export default class ChatSearchMore extends React.Component<
  IPropsChatSearchMore,
  IStateChatSearchMore
> {
  private onRefresh(done: Function) {
    const { loading, page } = this.state
    if (loading) {
      return
    }

    this.getData(page + 1, done)
  }

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

  private async getData(page: number, callback?: Function) {
    const { search, type, pageSize } = this.state

    this.setState({ loading: true })
    const result = await this.props.contact.getChatSearchByType(type, {
      page,
      pageSize,
      keyword: search
    })
    const data = result.data || {}
    const state: any = { loading: false }
    if (data.code === 200) {
      let res = []
      if (type === 'friend' || type === 'colleague') {
        res = data.user || []
      }
      if (type === 'group-chat' || type === 'group') {
        res = data.group || []
      }
      if (type === 'chat-record') {
        res = data.message || []
      }
      state.page = page
      state.hasData = res.length >= pageSize
      state.data = [...this.state.data, ...this.handleData(type, search, res)]
    }
    callback && callback()
    this.setState(state)
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

  constructor(props: IPropsChatSearchMore) {
    super(props)

    const param: any = props.match.params
    const data = serialize.parseOfDecode(param.data)
    this.state = {
      loading: false,
      search: data.search,
      title: data.title,
      type: data.type,
      page: 1,
      pageSize: 20,
      data: [],
      hasData: false
    }

    this.onRefresh = this.onRefresh.bind(this)
  }

  componentDidMount() {
    this.getData(1)
  }

  render() {
    const { title, type, search, hasData, data } = this.state

    return (
      <div className="wp100 hp100 pr bsb pt50 fs0 bg-f0f0f0 oh">
        <Header>{title}搜索</Header>
        <div className={`${style.chatSearchMore} wp100 hp100 bsb pr pt35`}>
          <div className="search-info wp100 tes fs12 plr10 bsb palt">
            {`${
              type === 'friend' || type === 'colleague'
                ? '昵称'
                : type === 'group' || type === 'group-chat'
                ? '名称'
                : ''
            }含关键词“${search}”的${title}`}
          </div>
          <div className="wp100 hp100 bsb pt35 pr">
            <div className="search-title palt wp100 tes fs12 plr10 bsb bg-fff">
              {title}
            </div>
            <CustomRefresh
              direction={EDirection.UP}
              hasData={hasData}
              onRefresh={this.onRefresh}
            >
              <div
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
                {data.map((d: any) => (
                  <div
                    key={d.chat_id}
                    className="item wp100 bsb pr bg-fff"
                    onClick={() => this.jumpItem(d)}
                  >
                    <Image
                      className="img palt"
                      url={d.head_img}
                      defImg={d.chatType === 'group' ? defGroupHead : defHead}
                    />
                    <div className="content wp100 hp100 bsb pt10 pb10 pr10">
                      <div
                        className={`name fs14 wp100 tes ${
                          d.type === 'chat-record' ? '' : 'no-info'
                        }`}
                        dangerouslySetInnerHTML={{ __html: d.name }}
                      />
                      {d.type === 'chat-record' && (
                        <div className="info fs12 wp100 tes">
                          包含{d.count}条相关{title}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CustomRefresh>
          </div>
        </div>
      </div>
    )
  }
}

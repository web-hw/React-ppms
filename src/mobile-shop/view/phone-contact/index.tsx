import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { RouteComponentProps } from 'react-router-dom'
import { Icon } from 'antd-mobile'

import { sendMsgByPlurOrJS } from 'global@util/send-msg'
import { toast } from 'global@util/toast/mobile'
import { serialize } from 'global@util/serialize'
import { zhSort } from 'global@util/zh-sort'
import Search from '../../component/search'
import { defHead } from '../../constant'
import Contact from '../../store/contact'
import User from '../../store/user'
import Loading from '../../component/loading'
import Empty from '../../component/empty'
import { Header } from '../../component/header'
import Image from '../../component/image'
import LetterSort from '../../component/letter-sort'
const style = require('./style')

interface IPropsPhoneContact extends RouteComponentProps {
  user: User
  contact: Contact
}

interface IStatePhoneContact {
  loading: boolean
  search: string
  phones: any[]
  initPhones: any[]
}

@inject('contact', 'user')
@observer
export default class PhoneContact extends React.Component<
  IPropsPhoneContact,
  IStatePhoneContact
> {
  private async init() {
    this.setState({ loading: true })
    await this.props.contact.getContacts()
    const { phones = [] } = this.props.contact
    this.onSureSearch(phones)
    this.setState({ loading: false, initPhones: serialize.copy(phones) })
  }

  private async onAddOrInvite(itm: any, isUser: boolean) {
    if (isUser) {
      this.props.history.replace(`/msg-info-detail/${itm.id}`)
    } else {
      const info = this.props.user.info || {}
      this.onSendMsg(info.realname || '爱米哒哒平台', itm.mobiles)
    }
  }

  private getLetters(letters: any[], hasTop = true) {
    const lts = letters.map(f => f.upper)
    if (hasTop && !lts.includes('#')) {
      lts.push('#')
    }

    return lts
  }

  private onSureSearch(data?: any[]) {
    const { search = '', initPhones } = this.state
    let phones = serialize.copy(data || initPhones || [])

    if (search) {
      phones = phones.filter(
        (p: any) =>
          (p.name || '').includes(search) || (p.mobiles || '').includes(search)
      )
    }

    const users: any[] = []
    const others: any[] = []
    let phone: any[] = []

    phones.forEach((m: any) => {
      if (!m.name || !m.mobiles) {
        return
      }
      m.id ? users.push(m) : others.push(m)
    })

    // 排序
    if (others.length > 0) {
      phone = zhSort({ key: 'name', data: others })
    }

    // 追加
    if (users.length > 0) {
      phone.unshift({ lower: '#', upper: '#', data: users })
    }

    this.setState({ phones: phone })
  }

  private onSendMsg(name: string, to: string) {
    sendMsgByPlurOrJS(
      {
        phones: [to],
        body: `${name}邀请您下载爱米哒哒,下载地址https://www.amisheng.com/app/amdd.apk`
      },
      (type: 'error' | 'success', err: Error) => {
        if (type === 'error') {
          toast.info(err.message || '未知错误')
        }

        if (type === 'success') {
          // toast.info('发送成功')
        }
      }
    )
  }

  constructor(props: IPropsPhoneContact) {
    super(props)

    this.state = {
      loading: false,
      search: '',
      phones: [],
      initPhones: []
    }
  }

  componentDidMount() {
    this.init()
  }

  render() {
    const { loading, search, phones } = this.state

    return (
      <Loading spinning={loading} className="fs0 pt50 bsb pr bg-f0f0f0 oh">
        <Header
        // right={
        //   <Icon className="vat" type="search" color="#1a1a1a" size="sm" />
        // }
        >
          手机联系人
        </Header>
        <div className={`${style.phoneContactContent} wp100 hp100 bsb pr`}>
          <div className="search wp100 bsb tac palt bsb bg-fff">
            <Search
              value={search}
              onChange={search => this.setState({ search: search.trim() })}
              onSure={() => this.onSureSearch()}
              placeholder="输入关键字搜索"
            />
          </div>
          <div className="wp100 hp100">
            <LetterSort
              letters={this.getLetters(
                phones.filter(p => p.upper !== '#'),
                !!phones.find(p => p.upper === '#')
              )}
            >
              {phones.length === 0 ? (
                <Empty />
              ) : (
                phones.map((p: any) => {
                  const isUser = p.upper === '#'

                  return (
                    <div key={p.lower} data-anchor={p.lower} className="wp100">
                      <h6 className="cb-contact-title">
                        {isUser
                          ? `以下联系人已开通爱米盛(${(p.data || []).length})`
                          : p.upper}
                      </h6>
                      <div className="wp100 bg-fff">
                        {(p.data || []).map((m: any) => (
                          <div
                            key={`${p.lower}-${m.mobiles}`}
                            className={`${style.cttItmContent} cb-contact-content`}
                          >
                            <Image
                              className="icon"
                              url={m.head_img}
                              defImg={defHead}
                            />
                            <div className="content has-info">
                              <h6 className="content-title">{m.name}</h6>
                              <p className="content-info">
                                {/* 已开通爱米盛 -- 爱米盛昵称：啦啦啦 */}
                                {m.mobiles}
                              </p>
                              {/* 添加|邀请 */}
                              {/* {isUser && (
                                <span
                                  className={`${isUser ? 'opened' : ''} part`}
                                  onClick={() => this.onAddOrInvite(m, isUser)}
                                >
                                  {isUser ? '添加' : '邀请'}
                                </span>
                              )} */}
                              <span
                                className={`${isUser ? 'opened' : ''} part`}
                                onClick={() => this.onAddOrInvite(m, isUser)}
                              >
                                {isUser ? '添加' : '邀请'}
                              </span>
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
        </div>
      </Loading>
    )
  }
}

import * as React from 'react'
import { observer, inject } from 'mobx-react'
import { Link, RouteComponentProps } from 'react-router-dom'
import { Icon } from 'antd-mobile'

import { toast } from 'global@util/toast/mobile'
import User from '../../store/user'
import Contact from '../../store/contact'
import { Header } from '../../component/header'
import Search from '../../component/search'
import CbModal from '../../component/modal'
const style = require('./style')

interface IPropsAddFriend extends RouteComponentProps {
  user: User
  contact: Contact
}

interface IStateAddFriend {
  search: string
  isShowPhoneInfo: boolean
}

@inject('user', 'contact')
@observer
export default class AddFriend extends React.Component<
  IPropsAddFriend,
  IStateAddFriend
> {
  // 确认
  private async onSureSearch() {
    const { search } = this.state
    if (!search) {
      return
    }

    const result = await this.props.contact.searchFriendByKeyword(search)
    const data = result.data
    // 出现错误
    if (!data) {
      return
    }

    // 不存在好友
    const friend = data.friend || {}
    if (!friend.id) {
      return toast.info('暂无数据')
    }

    this.props.history.replace(`/msg-info-detail/${friend.id}`)
  }

  private onJump(itm: any) {
    const u = navigator.userAgent

    // if (
    //   itm.url === '/phone-contact'
    //   && !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // is ios
    // ) {
    //   this.setState({ isShowPhoneInfo: true })
    // } else {
    //   this.props.history.replace(itm.url)
    // }
    this.props.history.replace(itm.url)
  }

  private onSurePhoneInfo() {
    this.props.history.replace('/phone-contact')
  }

  constructor(props: IPropsAddFriend) {
    super(props)

    this.state = {
      search: '',
      isShowPhoneInfo: false
    }
    this.onSureSearch = this.onSureSearch.bind(this)
    this.onSurePhoneInfo = this.onSurePhoneInfo.bind(this)
  }

  render() {
    const items = [
      {
        url: '/phone-contact',
        icon: require('../../assets/images/phone-contact-icon.png'),
        title: '手机联系人',
        info: '添加或邀请手机通讯录中的商友'
      },
      {
        url: '/edit-name-group', // 创建群
        icon: require('../../assets/images/group-chat-icon.png'),
        title: '发起群聊'
      }
    ]
    return (
      <div className="wp100 hp100 fs0 pt50 bsb pr bg-f0f0f0 oh">
        <Header
          left={
            <span>
              <Icon type="left" className="cb-left-lg vat" size="lg" />
              添加好友
            </span>
          }
        />
        <div className={`${style.addFriend} wp100 hp100 pr`}>
          {/* search */}
          <div className={`${style.search} wp100 p10 bsb tac palt bsb`}>
            <Search
              value={this.state.search}
              onChange={val => this.setState({ search: val.trim() })}
              onSure={this.onSureSearch}
              placeholder="爱米盛号/手机号"
            />
            <p className="mt10 fs12 tes">
              我的爱米盛号：{this.props.user.info.name}
            </p>
          </div>
          <div className="wp100 hp100 bg-fff">
            {items.map(item => (
              <a
                key={item.title}
                href="javascript:void(0)"
                onClick={() => this.onJump(item)}
                className={`${style.addFdItem} db pt10 pb10 pr15 bsb wp100 bb1 pr`}
              >
                <img className="palt brp50" src={item.icon} />
                <div className={`${item.info ? 'has-info' : ''} wp100 hp100`}>
                  <h6 className="fs14 fw500 wp100 tes">{item.title}</h6>
                  {item.info && <p className="fs12 wp100 tes">{item.info}</p>}
                </div>
              </a>
            ))}
          </div>
        </div>
        <CbModal
          isShow={this.state.isShowPhoneInfo}
          onClose={() => this.setState({ isShowPhoneInfo: false })}
          onSure={this.onSurePhoneInfo}
        >
          <div className={`${style.phoneInfo} wp100`}>111</div>
        </CbModal>
      </div>
    )
  }
}

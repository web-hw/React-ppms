import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { RouteComponentProps } from 'react-router-dom'
import { Button, Icon } from 'antd-mobile'

import { toast } from 'global@util/toast/mobile'
import Loading from '../../component/loading'
import Empty from '../../component/empty'
import { defHead } from '../../constant'
import Contact from '../../store/contact'
import { Header } from '../../component/header'
import Image from '../../component/image'
import LetterSort from '../../component/letter-sort'
const style = require('./style')

interface IPropsSelectContact extends RouteComponentProps {
  contact: Contact
}

interface IStateSelectContact {
  selectItems: string[]
  loading: boolean
}

@inject('contact')
@observer
export default class SelectContact extends React.Component<
  IPropsSelectContact,
  IStateSelectContact
> {
  private _selIcon = require('../../assets/images/select-icon.png')

  // select | cancel
  private onSwitchSelectStatus(item: any) {
    const selectItems = [...this.state.selectItems]

    const index = selectItems.findIndex(id => id === item.id)

    // 已经存在则取消
    if (index !== -1) {
      selectItems.splice(index, 1)
    } else {
      const { members = [] } = this.props.contact.groupDetail
      const result = members.find(m => m.id === item.id)
      if (result) {
        toast.info('已经是群成员')
      } else {
        selectItems.push(item.id)
      }
    }

    this.setState({ selectItems })
  }

  // 检查是否选中
  private isSelect(item: any) {
    const { selectItems } = this.state

    return selectItems.findIndex(id => id === item.id) !== -1
  }

  // 初始化通讯录
  private async init() {
    const params: any = this.props.match.params
    if (!params.id) {
      return
    }

    this.setState({ loading: true })
    await this.props.contact.getBooks()
    await this.props.contact.getGroupById(params.id, params.chatId)
    this.setState({ loading: false })
  }

  private async onSelectMembers() {
    const params: any = this.props.match.params
    if (!params.id) {
      return
    }

    const { selectItems } = this.state
    this.setState({ loading: true })
    const result = await this.props.contact.addGroupMembers(
      params.id,
      selectItems
    )
    if ((result.data || {}).code === 200) {
      this.props.history.replace(`/group-set/${params.id}/${params.chatId}`)
    } else {
      this.setState({ loading: false })
    }
  }

  private getLetters(letters: any[], hasTop = true) {
    const lts = letters.map(f => f.upper)
    if (hasTop && !lts.includes('#')) {
      lts.push('#')
    }

    return lts
  }

  constructor(props: IPropsSelectContact) {
    super(props)

    this.state = {
      loading: false,
      selectItems: []
    }

    this.onSwitchSelectStatus = this.onSwitchSelectStatus.bind(this)
    this.isSelect = this.isSelect.bind(this)
    this.onSelectMembers = this.onSelectMembers.bind(this)
  }

  componentDidMount() {
    this.init()
  }

  render() {
    const { friend = [] } = this.props.contact.books || {}

    return (
      <Loading
        spinning={this.state.loading}
        className="fs0 ptb50 bsb pr bg-f0f0f0 oh"
      >
        <Header
          right={
            <Icon className="vat" type="search" color="#1a1a1a" size="sm" />
          }
        >
          选择联系人
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
                    const isSel = this.isSelect(itm)

                    return (
                      <div
                        onClick={() => this.onSwitchSelectStatus(itm)}
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
        <footer className="cb-group-footer">
          <div className="content">已选择{this.state.selectItems.length}人</div>
          <Button
            onClick={this.onSelectMembers}
            disabled={!this.state.selectItems.length}
          >
            确定
          </Button>
        </footer>
      </Loading>
    )
  }
}

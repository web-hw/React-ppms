import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { RouteComponentProps } from 'react-router-dom'
import { Button } from 'antd-mobile'

import { toast } from 'global@util/toast/mobile'
import { defHead } from '../../constant'
import { zhSort } from 'global@util/zh-sort'
import Empty from '../../component/empty'
import Loading from '../../component/loading'
import Contact from '../../store/contact'
import { Header } from '../../component/header'
import Image from '../../component/image'
import LetterSort from '../../component/letter-sort'
const style = require('./style')

interface IPropsRemoveGroupMember extends RouteComponentProps {
  contact: Contact
}

interface IStateRemoveGroupMember {
  selectItems: string[]
  loading: boolean
  members: any[]
}

@inject('contact')
@observer
export default class RemoveGroupMember extends React.Component<
  IPropsRemoveGroupMember,
  IStateRemoveGroupMember
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
      selectItems.push(item.id)
    }

    this.setState({ selectItems })
  }

  // 检查是否选中
  private isSelect(item: any) {
    const { selectItems } = this.state

    return selectItems.findIndex(id => id === item.id) !== -1
  }

  private async init() {
    const param: any = this.props.match.params
    if (!param.id) {
      return
    }

    this.setState({ loading: true })
    await this.props.contact.getGroupById(param.id, param.chatId)
    const { members = [], admin_id } = this.props.contact.groupDetail || {}
    const result: any[] = zhSort({
      key: 'realname',
      data: members.filter(m => m.id !== admin_id)
    })
    this.setState({ loading: false, members: result })
  }

  private async onDelete() {
    const param: any = this.props.match.params
    if (!param.id) {
      return
    }

    this.setState({ loading: true })
    const { selectItems } = this.state
    const result = await this.props.contact.deleteGroupMembers(
      param.id,
      selectItems
    )
    if ((result.data || {}).code === 200) {
      toast.info('群成员移除成功')
      await this.init()
    }
    this.setState({ loading: false })
  }

  private getLetters(letters: any[], hasTop = true) {
    const lts = letters.map(f => f.upper)
    if (hasTop && !lts.includes('#')) {
      lts.push('#')
    }

    return lts
  }

  constructor(props: IPropsRemoveGroupMember) {
    super(props)

    this.state = {
      loading: false,
      members: [],
      selectItems: []
    }

    this.onSwitchSelectStatus = this.onSwitchSelectStatus.bind(this)
    this.isSelect = this.isSelect.bind(this)
    this.onDelete = this.onDelete.bind(this)
  }

  componentDidMount() {
    this.init()
  }

  render() {
    const { loading, members } = this.state

    return (
      <Loading spinning={loading} className="fs0 ptb50 bsb pr bg-f0f0f0 oh">
        <Header>移除群成员</Header>
        <LetterSort letters={this.getLetters(members, false)}>
          {members.length === 0 ? (
            <Empty />
          ) : (
            members.map(m => (
              <div key={m.upper} data-anchor={m.lower} className="wp100">
                <h6 className="cb-contact-title">{m.upper}</h6>
                <div className="wp100 bg-fff">
                  {m.data.map((d: any) => (
                    <div
                      onClick={() => this.onSwitchSelectStatus(d)}
                      key={`${m.upper}-${d.id}`}
                      className={`${style.item} cb-contact-content`}
                    >
                      <em
                        className={`${
                          this.isSelect(d) ? 'active' : ''
                        } sel-icon`}
                        style={{
                          backgroundImage: `url(${
                            this.isSelect(d) ? this._selIcon : ''
                          })`
                        }}
                      />
                      <Image
                        className="icon"
                        url={d.head_img}
                        defImg={defHead}
                      />
                      <div className="content">
                        <h6 className="content-title">{d.realname}</h6>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </LetterSort>
        <footer className="cb-group-footer">
          <div className="content">已选择{this.state.selectItems.length}人</div>
          <Button
            onClick={this.onDelete}
            disabled={!this.state.selectItems.length}
          >
            移除
          </Button>
        </footer>
      </Loading>
    )
  }
}

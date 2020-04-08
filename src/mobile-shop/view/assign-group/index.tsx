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
  selectItem: any
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

  private getLetters(letters: any[], hasTop = true) {
    const lts = letters.map(f => f.upper)
    if (hasTop && !lts.includes('#')) {
      lts.push('#')
    }

    return lts
  }

  private async onAssignGroup() {
    const param: any = this.props.match.params
    if (!param.id) {
      return
    }

    const { selectItem } = this.state
    if (!selectItem || !selectItem.id) {
      return toast.info('请选择有效的转让成员')
    }

    this.setState({ loading: true })
    const result = await this.props.contact.editGroup({
      chat_id: param.chatId,
      admin_id: selectItem.id
    })
    if ((result.data || {}).code === 200) {
      toast.info('群主转让成功', 2, () => Header.goBack())
    }
    this.setState({ loading: false })
  }

  constructor(props: IPropsRemoveGroupMember) {
    super(props)

    this.state = {
      loading: false,
      members: [],
      selectItem: null
    }

    this.onAssignGroup = this.onAssignGroup.bind(this)
  }

  componentDidMount() {
    this.init()
  }

  render() {
    const { loading, members, selectItem } = this.state

    return (
      <Loading
        spinning={loading}
        className={`${style.assignGroup} fs0 pt50 bsb pr bg-f0f0f0 oh`}
      >
        <Header
          right={
            <Button size="small" onClick={this.onAssignGroup}>
              完成
            </Button>}
        >
          转让群主
        </Header>
        <LetterSort letters={this.getLetters(members, false)}>
          {members.length === 0 ? (
            <Empty />
          ) : (
            members.map(m => (
              <div key={m.lower} data-anchor={m.lower} className="wp100">
                <h6 className="cb-contact-title">{m.upper}</h6>
                <div className="wp100 bg-fff">
                  {m.data.map((d: any) => (
                    <div
                      onClick={() =>
                        this.setState({
                          selectItem: (selectItem || {}).id === d.id ? null : d
                        })
                      }
                      key={`${m.upper}-${d.id}`}
                      className={`${style.item} cb-contact-content`}
                    >
                      <em
                        className={`${
                          (selectItem || {}).id === d.id ? 'active' : ''
                        } sel-icon`}
                        style={{
                          backgroundImage: `url(${
                            (selectItem || {}).id === d.id ? this._selIcon : ''
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
      </Loading>
    )
  }
}

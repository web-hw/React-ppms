import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { RouteComponentProps } from 'react-router-dom'
import {} from 'antd-mobile'

import { defHead } from '../../constant'
import { zhSort } from 'global@util/zh-sort'
import Empty from '../../component/empty'
import Loading from '../../component/loading'
import Contact from '../../store/contact'
import { Header } from '../../component/header'
import LetterSort from '../../component/letter-sort'
import Image from '../../component/image'
const style = require('./style')

interface IPropsGroupMember extends RouteComponentProps {
  contact: Contact
}

interface IStateGroupMember {
  loading: boolean
  members: any[]
  isAdmin: boolean
}

@inject('contact')
@observer
export default class GroupMember extends React.Component<
  IPropsGroupMember,
  IStateGroupMember
> {
  private async init() {
    const param: any = this.props.match.params
    if (!param.id) {
      return
    }

    this.setState({ loading: true })
    await this.props.contact.getGroupById(param.id, param.chatId)
    const { members = [], admin_id, is_admin, group_type } =
      this.props.contact.groupDetail || {}
    const result: any[] = zhSort({ key: 'realname', data: members })
    const admin = members.find(m => m.id === admin_id)
    if (admin) {
      result.unshift({ lower: '#', upper: '#', data: [admin] })
    }
    this.setState({
      loading: false,
      members: result,
      // isAdmin: group_type === 'chat_group' && !!is_admin
      isAdmin: group_type !== 'group' && !!is_admin
    })
  }

  private getLetters(letters: any[], hasTop = true) {
    const lts = letters.map(f => f.upper)
    if (hasTop && !lts.includes('#')) {
      lts.push('#')
    }

    return lts
  }

  constructor(props: IPropsGroupMember) {
    super(props)

    this.state = {
      members: [],
      loading: false,
      isAdmin: false
    }
  }

  componentDidMount() {
    this.init()
  }

  render() {
    const { loading, members, isAdmin } = this.state
    const param: any = this.props.match.params

    return (
      <Loading spinning={loading} className="fs0 pt50 bsb pr bg-f0f0f0 oh">
        <Header
          right={
            !isAdmin ? null : (
              <span
                onClick={() =>
                  this.props.history.replace(
                    `/remove-group-member/${param.id}/${param.chatId}`
                  )
                }
              >
                管理
              </span>
            )
          }
        >
          群成员
        </Header>
        <LetterSort
          letters={this.getLetters(
            members.filter(m => m.upper !== '#'),
            !!members.find(m => m.upper === '#')
          )}
        >
          {members.length === 0 ? (
            <Empty />
          ) : (
            members.map(m => (
              <div key={m.lower} data-anchor={m.lower} className="wp100">
                <h6 className="cb-contact-title">
                  {m.upper === '#' ? '群主' : m.upper}
                </h6>
                <div className="wp100 bg-fff">
                  {m.data.map((d: any) => (
                    <div
                      key={`${m.upper}-${d.id}`}
                      className={`${style.cttItmContent} cb-contact-content`}
                      onClick={() =>
                        this.props.history.replace(`/msg-info-detail/${d.id}`)
                      }
                    >
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

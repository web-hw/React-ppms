import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { RouteComponentProps } from 'react-router-dom'
// import { Button } from 'antd-mobile'

import Contact from '../../store/contact'
import Chat from '../../store/chat'
import { E_CHAT_TYPE } from '../../store/chat/constant'
import { defGroupHead } from '../../constant'
import Loading from '../../component/loading'
import Empty from '../../component/empty'
import { Header } from '../../component/header'
import Search from '../../component/search'
import Image from '../../component/image'
const style = require('./style')

interface IPropsGroup extends RouteComponentProps {
  contact: Contact
  chat: Chat
}

interface IStateGroup {
  search: string
  loading: boolean
}

@inject('contact', 'chat')
@observer
export default class Group extends React.Component<IPropsGroup, IStateGroup> {
  // change search
  private onChangeSearch(search: string) {
    this.setState({ search })
  }

  // sure search
  private async onSureSearch() {
    this.setState({ loading: true })
    await this.props.contact.getGroups(this.state.search)
    this.setState({ loading: false })
  }

  constructor(props: IPropsGroup) {
    super(props)

    this.state = {
      loading: false,
      search: ''
    }

    this.onChangeSearch = this.onChangeSearch.bind(this)
    this.onSureSearch = this.onSureSearch.bind(this)
  }

  componentDidMount() {
    this.onSureSearch()
  }

  render() {
    const { groups = [] } = this.props.contact

    return (
      <Loading
        spinning={this.state.loading}
        className="bsb pt50 fs0 bg-f0f0f0 oh"
      >
        <Header
          right={
            <span
              onClick={() => this.props.history.replace('/edit-name-group')}
            >
              建群
            </span>
          }
        >
          我的群聊
        </Header>
        <div className="wp100 hp100 pt50 bsb pr">
          <div className={`${style.search} palt wp100 bsb p10`}>
            <Search
              value={this.state.search}
              onChange={this.onChangeSearch}
              onSure={this.onSureSearch}
            />
          </div>
          <div className="wp100 hp100 bg-fff oay sb">
            {groups.length === 0 ? (
              <Empty />
            ) : (
              groups.map(g => (
                <div
                  key={g.id}
                  className={`${style.groupItem} wp100 bsb bb1 pr`}
                  onClick={() =>
                    this.props.chat.entryChat(E_CHAT_TYPE.GROUP, g.chat_id)
                  }
                >
                  <Image
                    className="img palt br3"
                    url={g.head_img}
                    defImg={defGroupHead}
                  />
                  <h6 className="fs14 fw500 tes wp100 hp100">{g.name}</h6>
                  {/* {(!g.is_member) && <Button className="part">加群</Button>} */}
                </div>
              ))
            )}
          </div>
        </div>
      </Loading>
    )
  }
}

import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { RouteComponentProps } from 'react-router-dom'
import { Button, InputItem } from 'antd-mobile'

import { toast } from 'global@util/toast/mobile'
import Contact from '../../store/contact'
import Chat from '../../store/chat'
import { E_CHAT_TYPE } from '../../store/chat/constant'
import { Header } from '../../component/header'
const style = require('./style')

interface IPropsGroupNameEdit extends RouteComponentProps {
  contact: Contact
  chat: Chat
}

interface IStateGroupNameEdit {
  loading: boolean
  name: string
}

@inject('contact', 'chat')
@observer
export default class GroupNameEdit extends React.Component<
  IPropsGroupNameEdit,
  IStateGroupNameEdit
> {
  private async onSaveGroupName() {
    const { name } = this.state
    if (!name || name === this.props.contact.groupDetail.name) {
      return
    }

    this.setState({ loading: true })
    const params: any = this.props.match.params || {}
    const result = await this.props.contact.editGroup({
      name,
      // id: params.id || ''
      chat_id: params.chatId || ''
    })
    const data = result.data || {}
    if (data.code === 200) {
      toast.info(`群${!params.id ? '创建' : '编辑'}成功`, 2, () =>
        params.id
          ? Header.goBack()
          : this.props.chat.entryChat(E_CHAT_TYPE.GROUP, data.chat_id || '')
      )
    } else {
      this.setState({ loading: false })
    }
  }

  private async init() {
    const params: any = this.props.match.params || {}
    if (!params.id) {
      return
    }

    await this.props.contact.getGroupById(params.id, params.chatId)
    this.setState({ name: this.props.contact.groupDetail.name || '' })
  }

  constructor(props: IPropsGroupNameEdit) {
    super(props)

    this.state = {
      loading: false,
      name: ''
    }

    this.onSaveGroupName = this.onSaveGroupName.bind(this)
  }

  componentDidMount() {
    this.init()
  }

  render() {
    const { name, loading } = this.state

    return (
      <div className={`${style.editName} wp100 hp100 bsb pt50 fs0 oh`}>
        <Header
          right={
            <Button
              loading={loading}
              disabled={loading}
              size="small"
              onClick={this.onSaveGroupName}
            >
              完成
            </Button>
          }
        >
          群聊名称
        </Header>
        <div className="wp100 hp100 bg-f0f0f0 bsb p10">
          <div className="cb-input">
            <InputItem
              placeholder="请输入群聊名称"
              onChange={name => this.setState({ name: name.trim() })}
              value={name}
            />
          </div>
        </div>
      </div>
    )
  }
}

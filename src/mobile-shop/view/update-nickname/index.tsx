import * as React from 'react'
import { inject, observer } from 'mobx-react'
import {} from 'react-router-dom'
import { Button, InputItem } from 'antd-mobile'

import { toast } from 'global@util/toast/mobile'
import { Header } from '../../component/header'
import User from '../../store/user'
const style = require('./style')

interface IPropsUpdateNickName {
  user: User
}

interface IStateUpdateNickName {
  loading: boolean
  nickName: string
  initNickName: string
}

@inject('user')
@observer
export default class UpdateNickName extends React.Component<
  IPropsUpdateNickName,
  IStateUpdateNickName
> {
  private async onSaveNickName() {
    const { nickName, initNickName } = this.state
    if (nickName === initNickName) {
      return
    }

    if (!nickName) {
      return toast.info('昵称不能为空')
    }

    this.setState({ loading: true })
    await this.props.user.editUser({ pet_name: nickName })
    const { cb_nickname } = this.props.user.info
    this.setState({
      loading: false,
      initNickName: cb_nickname,
      nickName: cb_nickname
    })
  }

  constructor(props: IPropsUpdateNickName) {
    super(props)
    const { cb_nickname } = this.props.user.info

    this.state = {
      loading: false,
      nickName: cb_nickname,
      initNickName: cb_nickname
    }

    this.onSaveNickName = this.onSaveNickName.bind(this)
  }

  render() {
    const { loading, nickName } = this.state

    return (
      <div className={`${style.editNickName} wp100 hp100 bsb pt50 fs0 oh`}>
        <Header
          right={
            <Button
              loading={loading}
              disabled={loading}
              size="small"
              onClick={this.onSaveNickName}
            >
              完成
            </Button>
          }
        >
          修改昵称
        </Header>
        <div className="wp100 hp100 bg-f0f0f0 bsb p10">
          <div className="cb-input">
            <InputItem
              placeholder="请输入昵称"
              onChange={nickName =>
                this.setState({ nickName: nickName.trim() })
              }
              value={nickName}
            />
          </div>
        </div>
      </div>
    )
  }
}

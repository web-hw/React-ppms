import * as React from 'react'
import { observer, inject } from 'mobx-react'
import {} from 'react-router-dom'
import { Switch } from 'antd-mobile'

import User from '../../store/user'
import { Header } from '../../component/header'
const style = require('./style')

interface IPropsMsgSet {
  user: User
}

interface IStateMsgSet {
  receiveInfo: boolean
  isVoice: boolean
  isShock: boolean
}

@inject('user')
@observer
export default class MsgSet extends React.Component<
  IPropsMsgSet,
  IStateMsgSet
> {
  private async updateStatus() {
    const { receiveInfo } = this.state
    const receiveStatus = !receiveInfo ? '1' : '0'
    const result = await this.props.user.updateStatus({ status: receiveStatus })
    const data = result.data
    if (data.code === 200) {
      await this.props.user.isResetLogin()
    }

    const info = this.props.user.info || {}
    const receiveInfoStatus = info.receive_status || '1'
    this.setState({ receiveInfo: receiveInfoStatus === '1' })
  }

  constructor(props: IPropsMsgSet) {
    super(props)

    const info = this.props.user.info || {}
    const receiveInfo = info.receive_status || '1'

    this.state = {
      receiveInfo: receiveInfo === '1',
      isVoice: false,
      isShock: false
    }

    this.updateStatus = this.updateStatus.bind(this)
  }

  render() {
    const { receiveInfo, isVoice, isShock } = this.state

    return (
      <div className={`${style.msgSet} bg-f0f0f0 wp100 hp100 bsb pt50 fs0 oh`}>
        <Header>消息设置</Header>
        <div className="wp100 hp100 oay sb">
          <div className="wp100">
            <div className="content wp100">
              <div className="item wp100 bsb plr10 bg-fff">
                <span className="fl fs14">接收新消息提醒</span>
                <span className="fr">
                  <Switch checked={receiveInfo} onChange={this.updateStatus} />
                </span>
              </div>
            </div>
          </div>
          {/* <div className="wp100">
            <div className="title wp100 fs14 bsb">
              通知方式
            </div>
            <div className="content wp100">
              <div className="item wp100 bsb plr10 bg-fff">
                <span className="fl fs14">声音</span>
                <span className="fr">
                  <Switch
                    checked={isVoice}
                    onChange={() => this.setState({ isVoice: !isVoice })}
                  />
                </span>
              </div>
              <div className="item wp100 bsb plr10 bg-fff">
                <span className="fl fs14">震动</span>
                <span className="fr">
                  <Switch
                    checked={isShock}
                    onChange={() => this.setState({ isShock: !isShock })}
                  />
                </span>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    )
  }
}

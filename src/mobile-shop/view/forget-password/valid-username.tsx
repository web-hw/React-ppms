import * as React from 'react'
import { Link } from 'react-router-dom'
import { InputItem, Button } from 'antd-mobile'

import { validCaptcha, E_CAPTCHA_Type, validUsername } from '../../validate'
import InputCaptcha from '../../component/input-captcha'
const style = require('./style')

interface IPropsValidUsername {
  onNextStep: () => void
}

interface IStateValidUsername {
  username: string
  captcha: string
}

export default class ValidUsername extends React.PureComponent<
  IPropsValidUsername,
  IStateValidUsername
> {
  // 修改state 值
  private onChange(name: string, value: any) {
    const state: any = { [name]: value }
    this.setState(state)
  }

  // 获取验证码
  private getCaptcha(done: (captcha: string) => void) {
    // 获取验证码
    done(require('../../assets/images/test.png'))
  }

  // 下一步
  private onNextStep() {
    const { username, captcha } = this.state
    // Todo验证用户名
    if (!validUsername(username)) {
      return
    }
    // 验证验证码
    if (!validCaptcha.captcha(captcha, E_CAPTCHA_Type.IMG)) {
      return
    }

    // 下一步
    this.props.onNextStep()
  }

  constructor(props: IPropsValidUsername) {
    super(props)

    this.state = {
      username: '',
      captcha: ''
    }

    this.getCaptcha = this.getCaptcha.bind(this)
    this.onNextStep = this.onNextStep.bind(this)
  }

  render() {
    return (
      <div className="wp100 plr15 bsb">
        <div className="cb-input mt10">
          <InputItem
            placeholder="请输入登录账号"
            onChange={value => this.onChange('username', value)}
            value={this.state.username}
          >
            账号
          </InputItem>
        </div>
        <InputCaptcha
          value={this.state.captcha}
          onChange={value => this.onChange('captcha', value)}
          getCaptcha={this.getCaptcha}
          type={E_CAPTCHA_Type.IMG}
        />
        <div className="cb-input-other wp100">
          <Link className="fr" to="/forget-password/phone">
            忘记登录账号?
          </Link>
        </div>
        <div className={`${style.nextStep} cb-btn`}>
          <Button onClick={this.onNextStep}>下一步</Button>
        </div>
      </div>
    )
  }
}

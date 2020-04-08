import * as React from 'react'
import {} from 'react-router-dom'
import { InputItem, Button } from 'antd-mobile'

import CaptchaInfo from '../../component/captcha-info'
import InputPhone from '../../component/input-phone'
import InputCaptcha from '../../component/input-captcha'
import { validPhone, validCaptcha } from '../../validate'
const style = require('./style')

interface IPropsValidPhoneManual {
  onNextStep: () => void
}

interface IStateValidPhoneManual {
  phone: string
  captcha: string
}

export default class ValidPhoneManual extends React.PureComponent<
  IPropsValidPhoneManual,
  IStateValidPhoneManual
> {
  // 修改state 值
  private onChange(name: string, value: any) {
    const state: any = { [name]: value }
    this.setState(state)
  }

  // 下一步
  private onNextStep() {
    const { phone, captcha } = this.state

    // 验证手机号
    if (!validPhone(phone)) {
      return
    }

    // 验证验证码
    if (!validCaptcha.captcha(captcha)) {
      return
    }

    // 验证验证码是否正确
    console.log(phone, captcha)
    this.props.onNextStep()
  }

  // 获取验证码
  private getCaptcha(done: (captcha?: string) => void) {
    const { phone } = this.state

    // 验证手机号
    if (!validPhone(phone)) {
      return
    }

    // Todo获取验证码
    done()
  }

  constructor(props: IPropsValidPhoneManual) {
    super(props)

    this.state = {
      phone: '',
      captcha: ''
    }

    this.onNextStep = this.onNextStep.bind(this)
    this.getCaptcha = this.getCaptcha.bind(this)
  }

  render() {
    return (
      <div className="wp100 plr15 bsb">
        <h6 className={`${style.manualTitle} fs14 fw400`}>
          请输入您注册时绑定的手机号码
        </h6>
        <InputPhone
          className="mt10"
          value={this.state.phone}
          onChange={value => this.onChange('phone', value)}
        />
        <InputCaptcha
          value={this.state.captcha}
          onChange={value => this.onChange('captcha', value)}
          getCaptcha={this.getCaptcha}
        />
        <div className="cb-input-other wp100">
          <CaptchaInfo className="fr" />
        </div>
        <div className={`${style.nextStep} cb-btn`}>
          <Button onClick={this.onNextStep}>下一步</Button>
        </div>
      </div>
    )
  }
}

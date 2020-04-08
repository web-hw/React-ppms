import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Button } from 'antd-mobile'

import CaptchaInfo from '../../component/captcha-info'
import InputCaptcha from '../../component/input-captcha'
import InputPhone from '../../component/input-phone'
import { Header } from '../../component/header'
import { validCaptcha, validPhone } from '../../validate'
import CbModal from '../../component/modal'
const style = require('./style')

interface IPropsLoginPhone extends RouteComponentProps {}

interface IStateLoginPhone {
  phone: string
  captcha: string
}

export default class LoginPhone extends React.PureComponent<
  IPropsLoginPhone,
  IStateLoginPhone
> {
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

  // 登录
  private onLogin() {
    const { phone, captcha } = this.state

    // 验证手机号
    if (!validPhone(phone)) {
      return
    }

    // 验证验证码
    if (!validCaptcha.captcha(captcha)) {
      return
    }

    // Todo验证验证码是否正确
    console.log(phone, captcha)
  }

  constructor(props: IPropsLoginPhone) {
    super(props)

    this.state = {
      phone: '',
      captcha: ''
    }

    this.getCaptcha = this.getCaptcha.bind(this)
    this.onLogin = this.onLogin.bind(this)

    // 提示
    CbModal.alert('提示', '您输入的手机号未在爱米盛平台注册！', {
      text: '注册',
      onPress: () => this.props.history.push('/register')
    })
  }

  render() {
    return (
      <div className={`${style.loginPhone} wp100 hp100 fs0 pt50 bsb pr oh`}>
        <Header>手机号登录</Header>
        <div className="wp100 hp100 sb oay plr15 bsb">
          <h6 className={`${style.title} fs14 fw400`}>
            请输入您注册时绑定的手机号码
          </h6>
          <InputPhone
            className="mt10"
            value={this.state.phone}
            onChange={phone => this.setState({ phone })}
          />
          <InputCaptcha
            value={this.state.captcha}
            onChange={captcha => this.setState({ captcha })}
            getCaptcha={this.getCaptcha}
          />
          <div className="cb-input-other wp100">
            <CaptchaInfo className="fr" />
          </div>
          <div className="cb-btn">
            <Button onClick={this.onLogin}>登录</Button>
          </div>
        </div>
      </div>
    )
  }
}

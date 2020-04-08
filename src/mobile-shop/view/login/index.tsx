import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { Link, RouteComponentProps } from 'react-router-dom'
import { InputItem, Button } from 'antd-mobile'

import { local } from 'global@util/storage'
import User from '../../store/user'
import { validLoginPwd, validPhone, validUsername } from '../../validate'
// import { Header } from '../../component/header'
const style = require('./style')

interface IPropsLogin extends RouteComponentProps {
  user: User
}

interface IStateLogin {
  logining: boolean
  username: string // 用户名
  password: string // 密码
  pwdType: any // text password
}

@inject('user')
@observer
export default class Login extends React.Component<IPropsLogin, IStateLogin> {
  // 修改state 值
  private onChange(name: string, value: string) {
    const state: any = { [name]: value.trim() }
    this.setState(state)
  }

  // 切换password type
  private onChangePwdType() {
    const { pwdType } = this.state
    const type = pwdType === 'text' ? 'password' : 'text'

    this.onChange('pwdType', type)
  }

  // 登录
  private async onLogin() {
    const { username, password } = this.state

    // 验证是手机号 || 账号
    if (!validPhone(username, false)) {
      if (!validUsername(username)) {
        return
      }
    }

    // 验证密码
    if (!validLoginPwd(password)) {
      return
    }

    // 登录
    this.setState({ logining: true })
    await this.props.user.onLogin({ password, name: username })
    this.setState({ logining: false })
    // local.remove('CHAT_MSG') // 清数据
    this.props.history.replace('/msg')
  }

  constructor(props: IPropsLogin) {
    super(props)

    this.state = {
      username: '',
      password: '',
      logining: false,
      pwdType: 'password'
    }

    this.onChangePwdType = this.onChangePwdType.bind(this)
    this.onLogin = this.onLogin.bind(this)
  }

  render() {
    const { username, password, pwdType, logining } = this.state
    return (
      <div className={`${style.login} wp100 hp100 fs0 pt50 bsb pr bg-fff oh`}>
        {/* <Header /> */}
        <div className="wp100 hp100 tac sb oay">
          {/* logo */}
          <img
            className={`${style.logo} mt35`}
            src={require('../../assets/images/login-logo-icon.png')}
          />
          {/* content */}
          <div className={`${style.content} wp100 bsb plr15`}>
            <div className="cb-input">
              <InputItem
                placeholder="账号/手机号"
                onChange={value => this.onChange('username', value)}
                value={username}
              />
            </div>
            <div className="cb-input">
              <InputItem
                type={pwdType}
                placeholder="登录密码"
                onChange={value => this.onChange('password', value)}
                value={password}
                extra={
                  <em
                    className={style.eyeIcon}
                    style={{
                      backgroundImage: `url(${require('../../assets/images/login-eye-def.png')})`
                    }}
                  >
                    <em className={`mc ${pwdType === 'text' ? 'hide' : ''}`} />
                  </em>
                }
                onExtraClick={this.onChangePwdType}
              />
            </div>
            {/* <div className="cb-input-other wp100">
              <Link className="fl" to="/login-phone">
                手机号登录
              </Link>
              <Link className="fr" to="/forget-password">
                忘记密码?
              </Link>
            </div> */}
            <div className="wp100 mt20 cb-btn mb20">
              <Button
                disabled={logining}
                loading={logining}
                onClick={this.onLogin}
              >
                登录
              </Button>
              <Button onClick={() => this.props.history.replace('/register')}>
                免费注册
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

import * as React from 'react'
import {} from 'react-router-dom'
import { InputItem, Button } from 'antd-mobile'

import { validResetPwd } from '../../validate'
const style = require('./style')

interface IPropsResetPwd {}

interface IStateResetPwd {
  password: string // 密码
  surePwd: string // 确认密码
}

export default class ResetPwd extends React.PureComponent<
  IPropsResetPwd,
  IStateResetPwd
> {
  private onSubmit() {
    const { password, surePwd } = this.state

    // 验证新密码
    if (!validResetPwd.password(password)) {
      return
    }

    // 验证确认密码
    if (!validResetPwd.surePwd(password, surePwd)) {
      return
    }

    // Todo修改密码
    console.log(password, surePwd)
  }

  constructor(props: IPropsResetPwd) {
    super(props)

    this.state = {
      password: '',
      surePwd: ''
    }

    this.onSubmit = this.onSubmit.bind(this)
  }

  render() {
    return (
      <div className={`${style.resetPwd} wp100 plr15 bsb`}>
        <div className="cb-input mt10">
          <InputItem
            type="password"
            placeholder="请输入新密码"
            onChange={password => this.setState({ password })}
            value={this.state.password}
          />
        </div>
        <div className="cb-input mt10">
          <InputItem
            type="password"
            placeholder="请确认密码"
            onChange={surePwd => this.setState({ surePwd })}
            value={this.state.surePwd}
          />
        </div>
        <div className={`${style.pwdInfo} fs12`}>
          密码长度为6-32位，须包含数字、字母、符号至少2中或以上元素。
        </div>
        <div className="cb-btn mt20">
          <Button onClick={this.onSubmit}>确认提交</Button>
        </div>
      </div>
    )
  }
}

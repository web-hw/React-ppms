import * as React from 'react'
import { observer, inject } from 'mobx-react'
import {} from 'react-router-dom'
import { InputItem } from 'antd-mobile'

import { validCaptcha, validLoginPwd } from '../../validate'
import { Interval } from 'global@util/interval'
import { toast } from 'global@util/toast/mobile'
import { Header } from '../../component/header'
import Loading from '../../component/loading'
import User from '../../store/user'
const style = require('./style')

interface IPropsUpdatePwd {
  user: User
}

interface IStateUpdatePwd {
  phone: string
  captcha: string
  time: number
  password: string
  surepwd: string
  loading: boolean
}

@inject('user')
@observer
export default class UpdatePwd extends React.Component<
  IPropsUpdatePwd,
  IStateUpdatePwd
> {
  // 定时器
  private _interval: Interval = null

  // 定时任务
  private startTime() {
    if (!this._interval) {
      this._interval = new Interval(() => {
        if (this.state.time < 0) {
          this._interval.stop()
        }
        this.setState({ time: this.state.time - 1 })
      })
    }

    this.setState({ time: 60 })
    this._interval.start()
  }

  // 获取验证码
  private async getCaptcha() {
    const { time } = this.state
    if (time >= 0) {
      return
    }

    const { phone } = this.state

    if (!phone) {
      return
    }

    // 获取验证码
    const result = await this.props.user.getCaptchaOfPwd({
      bind_phone: phone
    })
    const data = result.data || {}
    if (data.code === 200) {
      this.startTime()
    }
  }

  // 保存
  private async savaPwd() {
    const { captcha, password, surepwd } = this.state

    // 验证验证码
    if (!validCaptcha.captcha(captcha)) {
      return
    }

    // 验证密码
    if (!validLoginPwd(password)) {
      return
    }

    if (password !== surepwd) {
      return toast.info('两次密码不一致')
    }

    this.setState({ loading: true })
    const result = await this.props.user.updatePwd({ password, code: captcha })
    const data = result.data || {}
    if (data.code === 200) {
      toast.info('密码修改成功', 2, () => this.props.user.logout())
    }
    this.setState({ loading: false })
  }

  constructor(props: IPropsUpdatePwd) {
    super(props)

    const info = (this.props.user || {}).info || {}
    this.state = {
      phone: info.bind_phone || '',
      captcha: '',
      password: '',
      surepwd: '',
      time: -1,
      loading: false
    }

    this.getCaptcha = this.getCaptcha.bind(this)
    this.savaPwd = this.savaPwd.bind(this)
  }

  componentWillUnmount() {
    this._interval && this._interval.stop()
  }

  render() {
    const { captcha, time, password, surepwd, phone, loading } = this.state

    return (
      <Loading
        spinning={loading}
        className={`${style.updatePwd} bg-f0f0f0 wp100 hp100 bsb pt50 fs0 oh`}
      >
        <Header right={<span onClick={this.savaPwd}>保存</span>}>
          修改密码
        </Header>
        <div className="wp100 hp100 oay sb">
          <div className="wp100 bsb plr10 bsb bg-fff">
            <div className="cb-input">
              <InputItem
                placeholder="请输入6位数字"
                onChange={captcha => this.setState({ captcha })}
                value={captcha}
                extra={
                  <span
                    className={`pl10 ${time >= 0 ? 'valid' : ''}`}
                    onClick={this.getCaptcha}
                  >
                    {time >= 0 ? `重新发送(${time}s)` : '获取验证码'}
                  </span>
                }
              >
                {phone.replace(/^(\d{3})\d*(\d{4})$/, '$1****$2')}
              </InputItem>
            </div>
            <div className="cb-input">
              <InputItem
                placeholder="请输入6~32位字符"
                type="password"
                onChange={password => this.setState({ password })}
                value={password}
              >
                输入新密码
              </InputItem>
            </div>
            <div className="cb-input">
              <InputItem
                placeholder="请输入6~32位字符"
                type="password"
                onChange={surepwd => this.setState({ surepwd })}
                value={surepwd}
              >
                重复新密码
              </InputItem>
            </div>
          </div>
        </div>
      </Loading>
    )
  }
}

import * as React from 'react'
import { observer, inject } from 'mobx-react'
import { RouteComponentProps } from 'react-router-dom'
import { InputItem } from 'antd-mobile'

import { Interval } from 'global@util/interval'
import { toast } from 'global@util/toast/mobile'
import { Header } from '../../component/header'
import Loading from '../../component/loading'
import User from '../../store/user'
import { validPhone, validCaptcha, validLoginPwd } from '../../validate'
const style = require('./style')

interface IPropsUpdatePhone extends RouteComponentProps {
  user: User
}

interface IStateUpdatePhone {
  oldPhone: string
  oldCaptcha: string
  phone: string
  captcha: string
  time: number
  loading: boolean
  step: 'validOldPhone' | 'done'
}

@inject('user')
@observer
export default class UpdatePhone extends React.Component<
  IPropsUpdatePhone,
  IStateUpdatePhone
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

  private async getCaptcha(type: 'old' | 'new') {
    const { time } = this.state
    if (time >= 0) {
      return
    }

    const { phone, oldPhone } = this.state

    if (type === 'old') {
      if (!oldPhone) {
        return
      }
    } else {
      if (!validPhone(phone)) {
        return
      }
    }

    let result: any = {}
    if (type === 'old') {
      result = await this.props.user.getCaptchaOfPhone({ bind_phone: oldPhone })
    }

    if (type === 'new') {
      result = await this.props.user.getCaptchaOfNewPhone({ bind_phone: phone })
    }

    const data = result.data || {}
    if (data.code === 200) {
      this.startTime()
    }
  }

  private async validOldPhone() {
    const { oldCaptcha } = this.state

    // 验证验证码
    if (!validCaptcha.captcha(oldCaptcha)) {
      return
    }

    const result = await this.props.user.checkCaptchaOfPhone({
      code: oldCaptcha
    })
    const data = result.data || {}
    if (data.code === 200) {
      this._interval && this._interval.stop()
      this.setState({ time: -1, step: 'done' })
    }
  }

  private async updatePhoneDone() {
    const { phone, captcha } = this.state

    // 验证手机号
    if (!validPhone(phone)) {
      return
    }

    // 验证验证码
    if (!validCaptcha.captcha(captcha)) {
      return
    }

    const result = await this.props.user.updatePhone({
      bind_phone: phone,
      code: captcha
    })
    const data = result.data || {}
    if (data.code === 200) {
      await this.props.user.isResetLogin()
      toast.info('手机号修改成功', 2, () => this.props.history.replace('/msg'))
    }
  }

  private onSure() {
    const { step } = this.state

    switch (step) {
      case 'validOldPhone':
        return this.validOldPhone()
      case 'done':
        return this.updatePhoneDone()
    }
  }

  constructor(props: IPropsUpdatePhone) {
    super(props)

    const info = (this.props.user || {}).info || {}
    this.state = {
      oldPhone: info.bind_phone || '',
      oldCaptcha: '',
      phone: '',
      captcha: '',
      time: -1,
      loading: false,
      step: 'validOldPhone'
    }

    this.onSure = this.onSure.bind(this)
  }

  componentWillUnmount() {
    this._interval && this._interval.stop()
  }

  render() {
    const {
      oldPhone,
      oldCaptcha,
      time,
      phone,
      captcha,
      step,
      loading
    } = this.state

    return (
      <Loading
        spinning={loading}
        className={`${style.updatePhone} bg-f0f0f0 wp100 hp100 bsb pt50 fs0 oh`}
      >
        <Header
          right={
            <span onClick={this.onSure}>
              {step === 'done' ? '完成' : '下一步'}
            </span>}
        >
          修改手机号
        </Header>
        <div className="wp100 hp100 oay sb">
          <div className="wp100 bg-fff">
            {step === 'validOldPhone' && (
              <div className="step1 wp100 bsb plr10">
                <div className="cb-input">
                  <InputItem
                    placeholder="请输入6位数字"
                    onChange={oldCaptcha => this.setState({ oldCaptcha })}
                    value={oldCaptcha}
                    extra={
                      <span
                        className={`pl10 ${time >= 0 ? 'valid' : ''}`}
                        onClick={() => this.getCaptcha('old')}
                      >
                        {time >= 0 ? `重新发送(${time}s)` : '获取验证码'}
                      </span>
                    }
                  >
                    {oldPhone.replace(/^(\d{3})\d*(\d{4})$/, '$1****$2')}
                  </InputItem>
                </div>
              </div>
            )}
            {step === 'done' && (
              <div className="step2 wp100 bsb plr10">
                <div className="wp100 clearfix">
                  <div className="fl pr5 bsb">
                    <div className="cb-input">
                      <InputItem
                        placeholder="请输入新手机号"
                        onChange={phone => this.setState({ phone })}
                        value={phone}
                      />
                    </div>
                  </div>
                  <div className="fl pl5 bsb">
                    <div className="cb-input">
                      <InputItem
                        placeholder="请输入6位数字"
                        onChange={captcha => this.setState({ captcha })}
                        value={captcha}
                        extra={
                          <span
                            className={`pl10 ${time >= 0 ? 'valid' : ''}`}
                            onClick={() => this.getCaptcha('new')}
                          >
                            {time >= 0 ? `重新发送(${time}s)` : '获取验证码'}
                          </span>
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </Loading>
    )
  }
}

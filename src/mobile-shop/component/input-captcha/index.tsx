import * as React from 'react'
import {} from 'react-router-dom'
import { InputItem, Button } from 'antd-mobile'

import { Interval } from 'global@util/interval'
import { E_CAPTCHA_Type } from '../../validate'
const style = require('./style')

interface IPropsInputCaptcha {
  type?: E_CAPTCHA_Type
  className?: string
  getCaptcha: (callback: (captcha?: string) => void) => void
  value: string
  onChange: (value: string) => void
}

interface IStateInputCaptcha {
  captcha: string
  time: number
}

export default class InputCaptcha extends React.PureComponent<
  IPropsInputCaptcha,
  IStateInputCaptcha
> {
  // 定时器
  private _interval: Interval = null

  // 是否是数字验证码
  private isNum() {
    const { type = E_CAPTCHA_Type.NUM } = this.props

    return type === E_CAPTCHA_Type.NUM
  }

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
  private getCaptcha() {
    if (this.state.time >= 0) {
      return
    }

    this.props.getCaptcha((captcha: string = '') => {
      this.setState({ captcha })
      // 数字验证码
      this.isNum() && this.startTime()
    })
  }

  constructor(props: IPropsInputCaptcha) {
    super(props)

    this.state = {
      captcha: '',
      time: -1
    }

    this.getCaptcha = this.getCaptcha.bind(this)
  }

  componentDidMount() {
    !this.isNum() && this.getCaptcha()
  }

  componentWillUnmount() {
    this._interval && this._interval.stop()
  }

  render() {
    const { onChange, value, className = '' } = this.props
    const { time, captcha } = this.state

    return (
      <div className={`${className} cb-input`}>
        <InputItem
          // type={this.isNum() ? 'digit' : 'text'}
          placeholder="请输入验证码"
          onChange={onChange}
          value={value}
          extra={
            <Button
              onClick={this.getCaptcha}
              className={`${style.captchaBtn} ${
                this.isNum() ? 'num' : 'img'
              } cb-btn`}
              style={{
                backgroundImage: this.isNum() ? 'none' : `url(${captcha})`
              }}
            >
              {this.isNum() ? (time >= 0 ? `${time}s` : '获取验证码') : ''}
            </Button>
          }
        >
          验证码
        </InputItem>
      </div>
    )
  }
}

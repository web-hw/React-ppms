import * as React from 'react'
import { Link } from 'react-router-dom'
import { Button, Grid, InputItem } from 'antd-mobile'

import { Interval } from 'global@util/interval'
import { validCaptcha, validInput } from '../../validate'
import CaptchaInfo from '../../component/captcha-info'
const style = require('./style')

interface IPropsValidPhone {
  onNextStep: () => void
}

interface IStateValidPhone {
  captcha: string
  time: number
}

export default class ValidPhone extends React.PureComponent<
  IPropsValidPhone,
  IStateValidPhone
> {
  // number input
  private _numberInput: any = null
  // 计时器
  private _interval: Interval = null

  // on change captcha
  private onChangeCaptcha(val: string) {
    let captcha = this.state.captcha
    if (validCaptcha.change(val)) {
      captcha = val
    }

    this.setState({ captcha })
  }

  // 获取captchas
  private getCaptchas() {
    const captchas: any = ['', '', '', '', '', '']
    const { captcha } = this.state
    captcha.split('').forEach((val, idx) => (captchas[idx] = val))

    return captchas
  }

  // 开启定时器
  private startTime() {
    if (!this._interval) {
      this._interval = new Interval(() => {
        if (this.state.time < 0) {
          this._interval.stop()
        }
        console.log('啦啦啦')
        this.setState({ time: this.state.time - 1 })
      })
    }

    this.setState({ time: 60 })
    this._interval.start()
  }

  // 获取验证码
  private getCaptcha() {
    // Todo发送验证码
    // 开启定时器
    this.startTime()
  }

  // 初始化
  private init() {
    // 处理number input可以输入e问题
    this._numberInput = document.querySelector(`.${style.validPhone} input`)
    this._numberInput.onkeypress = validInput.number

    // 获取验证码
    this.getCaptcha()
  }

  // 下一步
  private onNextStep() {
    const { captcha } = this.state

    if (!validCaptcha.captcha(captcha)) {
      return
    }

    console.log(captcha)
    // Todo 验证验证码是否正确
    // Todo 跳转 | 提示

    this.props.onNextStep()
  }

  // 重新获取验证码
  private onGetCaptcha() {
    if (this.state.time >= 0) {
      return
    }

    this.getCaptcha()
  }

  constructor(props: IPropsValidPhone) {
    super(props)
    this.state = {
      captcha: '',
      time: 60
    }

    this.onChangeCaptcha = this.onChangeCaptcha.bind(this)
    this.getCaptchas = this.getCaptchas.bind(this)
    this.onNextStep = this.onNextStep.bind(this)
    this.onGetCaptcha = this.onGetCaptcha.bind(this)
  }

  componentDidMount() {
    this.init()
  }

  componentWillUnmount() {
    this._numberInput.onkeypress = null
    this._interval && this._interval.stop()
  }

  render() {
    const { time } = this.state
    return (
      <div className="wp100 plr15 bsb mt10">
        <div className={`${style.validPhone} bg-fff wp100`}>
          <h6 className="fw400 fs15 plr10">
            验证码已发送至{' '}
            {'13408226449'.replace(/^(\d{3})\d{4}(\d{4})/, '$1****$2')}
          </h6>
          <span
            onClick={this.onGetCaptcha}
            className={`${time < 0 ? 'active' : ''} fs12 mb15 dib vat plr10`}
          >
            {time >= 0 ? `${time}s后` : ''}重新获取
          </span>
          <InputItem
            type="digit"
            value={this.state.captcha}
            onChange={this.onChangeCaptcha}
          />
          <div onClickCapture={() => this._numberInput.focus()}>
            <Grid
              data={this.getCaptchas()}
              columnNum={6}
              square={true}
              hasLine={false}
              activeStyle={false}
              renderItem={item => (
                <span className="fs12 wp100 hp100">{item}</span>
              )}
            />
          </div>
          <div className="cb-input-other wp100">
            <CaptchaInfo />
          </div>
        </div>
        <div className={`${style.nextStep} cb-btn mt20`}>
          <Button onClick={this.onNextStep}>下一步</Button>
        </div>
      </div>
    )
  }
}

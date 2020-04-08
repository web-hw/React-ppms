import * as React from 'react'
import {} from 'react-router-dom'
import { Icon, Button } from 'antd-mobile'

import { CountDown } from 'global@util/interval'
import { Header } from '../../component/header'
const style = require('./style')

interface IPropsPay {}

interface IStatePay {
  payWays: IPayWays[] // 所有的支付方式
  pay: number // 支付金额
  payWay: E_PAYWAY_TYPE // 选择的支付方式
  time: string
}

enum E_PAYWAY_TYPE {
  AMS = 'ams',
  ZFB = 'zfb',
  YL = 'yl'
}

interface IConfigPayWays {
  type: E_PAYWAY_TYPE
  icon: string
  title: string
  info: string | number
  isDisable: boolean
  isRecommend: boolean
}

interface IPayWays extends IConfigPayWays {}

const configPayWays: IConfigPayWays[] = [
  {
    type: E_PAYWAY_TYPE.AMS,
    icon: require('../../assets/images/pay-ams-icon.png'),
    title: '爱米盛钱包支付',
    info: 0,
    isDisable: false,
    isRecommend: true
  },
  {
    type: E_PAYWAY_TYPE.ZFB,
    icon: require('../../assets/images/pay-zfb-icon.png'),
    title: '支付宝支付',
    isDisable: false,
    isRecommend: false,
    info: '支付宝安全支付'
  },
  {
    type: E_PAYWAY_TYPE.YL,
    icon: require('../../assets/images/pay-yl-icon.png'),
    title: '银联网银支付',
    isDisable: false,
    isRecommend: false,
    info: '支持全国18家银行储蓄卡支付'
  }
]

export default class Pay extends React.PureComponent<IPropsPay, IStatePay> {
  private _defIcon = require('../../assets/images/pay-def.png')
  private _disableIcon = require('../../assets/images/pay-disable.png')
  private _actIcon = require('../../assets/images/pay-act.png')
  private _tjIcon = require('../../assets/images/pay-tj-icon.png')
  private _countDown = new CountDown(20 * 60 * 1000)

  private init() {
    let { payWays } = this.state

    payWays = payWays.map((py: IPayWays) => {
      if (this.isMoneyOfInfo(py)) {
        // Todo 初始化可用额度

        // 判断是否额度是否满足支付
        py.isDisable = this.isShowRecharge(py) || py.isDisable
      }

      return py
    })

    this.setState({ payWays })
  }

  // is info 额度
  private isMoneyOfInfo(item: IPayWays) {
    const isMoneyTypes = [E_PAYWAY_TYPE.AMS]

    return isMoneyTypes.includes(item.type)
  }

  private onSelectPayWay(item: IPayWays) {
    if (item.isDisable) {
      return
    }

    this.setState({
      payWay: item.type === this.state.payWay ? null : item.type
    })
  }

  private isShowRecharge(item: IPayWays) {
    return Number(item.info) < Number(this.state.pay)
  }

  constructor(props: IPropsPay) {
    super(props)

    this.state = {
      payWays: configPayWays,
      pay: 190,
      payWay: null,
      time: ''
    }
  }

  componentWillMount() {}

  componentDidMount() {
    this.init()
    this._countDown.start(time => this.setState({ time }))
  }

  componentWillUnmount() {
    this._countDown.stop()
  }

  render() {
    return (
      <div className={`${style.pay} wp100 hp100 fs0 ptb50 bsb pr oh`}>
        <Header
          left={
            <span>
              <Icon type="left" className="cb-left-lg vat" size="lg" />
              支付订单
            </span>
          }
        />
        <div className={`${style.content} pr wp100 hp100 bsb`}>
          <div className={`${style.title} wp100 palt tac bsb`}>
            <h6 className="fw400 fs12">支付剩余时间: {this.state.time}</h6>
            <div className="fs30 fw700">
              <span className="fs18">￥</span>
              {this.state.pay}
            </div>
            <p className="fs12">订单编号: 201918956201259</p>
          </div>
          <div className="wp100 hp100 oay sb">
            {this.state.payWays.map(py => (
              <div key={py.type} className={`${style.item} wp100 bsb`}>
                <h6
                  className="fw400 fs17 pr bsb wp100"
                  onClick={() => this.onSelectPayWay(py)}
                >
                  <em
                    className="palt"
                    style={{ backgroundImage: `url(${py.icon})` }}
                  />
                  <div className="wp100 hp100 bsb">
                    <span
                      className={`${
                        py.isRecommend ? 'has-tj' : ''
                      } title-content hp100 tes bsb`}
                      style={{
                        backgroundImage: py.isRecommend
                          ? `url(${this._tjIcon})`
                          : 'none'
                      }}
                    >
                      {py.title}
                    </span>
                  </div>
                  <em
                    className="part"
                    style={{
                      backgroundImage: `url(${
                        py.isDisable
                          ? this._disableIcon
                          : py.type === this.state.payWay
                          ? this._actIcon
                          : this._defIcon
                      })`
                    }}
                  />
                </h6>
                <span className="db pl45 wp100 bsb">
                  <p className="tes fs12 wp100 bsb">
                    {!this.isMoneyOfInfo(py)
                      ? py.info
                      : [
                        <span key="price" className="price tes">
                            ￥{py.info}
                          </span>,
                        !this.isShowRecharge(py) ? null : (
                            <span key="recharge" className="recharge tes">
                              余额不足，请充值
                              <Icon type="right" size="md" />
                            </span>
                          )
                      ]}
                  </p>
                </span>
              </div>
            ))}
          </div>
        </div>
        <Button disabled={!this.state.payWay} className="cb-btn palb wp100">
          确认支付
        </Button>
      </div>
    )
  }
}

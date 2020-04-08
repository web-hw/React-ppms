import * as React from 'react'
import { RouteComponentProps, Link } from 'react-router-dom'
import {} from 'antd-mobile'

import CbModal from '../../component/modal'
import { Header } from '../../component/header'
const style = require('./style')

enum E_BID_STATUS {
  TO_DOCK = 'toDock', // 待对接
  PASS_DOCK = 'passDock', // 对接通过
  NOT_PASS_DOCK = 'notPassDock', // 对接未通过
  SUC_BID = 'sucBid', // 中标
  FAIL_BID = 'failBid' // 落标
}

interface IPropsTenderDetailsBid extends RouteComponentProps {}

interface IStateTenderDetailsBid {
  bidStatus: E_BID_STATUS
}
const bidStatus = {
  [E_BID_STATUS.TO_DOCK]: '待对接',
  [E_BID_STATUS.PASS_DOCK]: '对接已通过',
  [E_BID_STATUS.NOT_PASS_DOCK]: '对接未通过',
  [E_BID_STATUS.SUC_BID]: '中标',
  [E_BID_STATUS.FAIL_BID]: '落标'
}

export default class TenderDetailsBid extends React.PureComponent<
  IPropsTenderDetailsBid,
  IStateTenderDetailsBid
> {
  private bidStatusInfo() {
    const { bidStatus } = this.state
    let title = null
    let msg = null
    let btn = null

    if (bidStatus === E_BID_STATUS.NOT_PASS_DOCK) {
      title = '投标对接未通过，可重新投标'
      msg = '竞标保证金将在3个工作日内退回您的个人账户'
      btn = [
        { text: '稍后再说' },
        {
          text: '重新投标',
          onPress: () => {
            console.log('重新投标')
            this.props.history.push('/partake-biding')
          }
        }
      ]
    } else if (bidStatus === E_BID_STATUS.PASS_DOCK) {
      title = '投标对接已通过'
      msg = '投标对接已通过，进入下一轮定标'
      btn = [{ text: '我知道了' }]
    } else if (bidStatus === E_BID_STATUS.FAIL_BID) {
      title = '抱歉！此需求您未中标'
      msg = '竞标保证金将在3个工作日内退回您的个人账户'
      btn = [
        { text: '稍后再说' },
        {
          text: '竞标其他需求',
          onPress() {
            console.log('竞标其他需求')
            this.props.history.push('/task')
          }
        }
      ]
    } else if (bidStatus === E_BID_STATUS.SUC_BID) {
      title = '恭喜，您已中标此需求！'
      msg = '竞标保证金将在3个工作日内退回您的个人账户'
      btn = [{ text: '我知道了' }]
    }

    if (title && msg) {
      CbModal.alert(title, msg, btn)
    }
  }

  private randerMessge() {
    const { bidStatus } = this.state

    switch (bidStatus) {
      case E_BID_STATUS.SUC_BID:
        return <div className="fs14 pb30 bottom">恭喜，您已中标此需求！</div>
      case E_BID_STATUS.FAIL_BID:
        return (
          <div className="fs14 pb30 bottom">
            <span className="hint">抱歉！此需求您未中标</span>
            <p className="explain ptb15">
              竞标保证金将在3个工作日内退回您的个人账户
            </p>
            <Link to="/task" className="btn plr15 pt5 pb5">
              竞标其他需求
            </Link>
          </div>
        )
      case E_BID_STATUS.NOT_PASS_DOCK:
        return (
          <div className="fs14 pb30 bottom">
            <span className="hint">投标对接未通过，可重新投标</span>
            <p className="explain ptb15">
              竞标保证金将在3个工作日内退回您的个人账户
            </p>
            <Link to="/partake-biding" className="btn plr15 pt5 pb5">
              重新竞标
            </Link>
          </div>
        )
      case E_BID_STATUS.PASS_DOCK:
        return (
          <div className="fs14 pb30 bottom">投标对接已通过，进入下一轮定标</div>
        )
      default:
        return null
    }
  }

  constructor(props: IPropsTenderDetailsBid) {
    super(props)

    this.state = {
      bidStatus: E_BID_STATUS.NOT_PASS_DOCK
    }

    this.bidStatusInfo()
  }

  render() {
    return (
      <div className={`${style.tenderDetails} wp100 hp100 pr pt50 bsb oh fs0`}>
        <Header>
          <span className="fs14">详情</span>
        </Header>
        <div className="hp100 oay sb bsb">
          <div className={`${style.bidTitle} wp100 bsb bg-fff mt5`}>
            <div className="title wp100">
              <span className="fl tes fs14">【000019】系统维护与开发</span>
              <span className="fr tes fs12">
                {bidStatus[this.state.bidStatus]}
              </span>
            </div>
          </div>
          <div className={`${style.taskMsgItem} wp100 bsb bg-fff mt5`}>
            <div className="bid-item pr fs13">
              <span className="palt oh hp100">投标提交时间</span>
              <div className="wp100 tes">2019-05-05 10:10</div>
            </div>
            <div className="bid-item pr fs13">
              <span className="palt oh hp100">报价</span>
              <div className="wp100 tes fs-ff0000">￥56233</div>
            </div>
            <div className="bid-item pr fs13">
              <span className="palt oh hp100">预估执行周期</span>
              <div className="wp100 tes">56天</div>
            </div>
            <div className="bid-item pr fs13">
              <span className="palt oh hp100">竞标保证金</span>
              <div className="wp100 tes">
                <span className="fs-ff0000">￥56233</span>(已提交)
              </div>
            </div>
            <div className="bid-item pr fs13">
              <span className="palt oh hp100">投标人姓名</span>
              <div className="wp100 tes">闷油瓶</div>
            </div>
            <div className="bid-item pr fs13">
              <span className="palt oh hp100">投标人电话</span>
              <div className="wp100 tes">13438163556</div>
            </div>
          </div>
          <div className={`${style.taskDesc} wp100 bsb bg-fff mt5`}>
            <div className="title wp100 fs14 bsb">简要策划</div>
            <p className="fs12">
              四路高速光纤接口卡由4路光纤接收模块和pcie3.0传输模块组成。
              每路光纤数据传输速率可达10Gbp、传输协议为aurora。 pcie接口
              遵从PCIe Gen3.0标准规范，单lane传输速率8.0GT/s。四路高速
              光纤接口卡由4路光纤接收模块和pcie3.0传输模块组成。
              每路光纤数据传输速率可达10Gbp、传输协议为
            </p>
          </div>
          <div className={`${style.taskFile} wp100 bsb bg-fff mt5`}>
            <div className="title wp100 fs14 bsb">需求附件(2)</div>
            <div className="item wp100">
              <a href="javascript:void(0);" className="fl fs12">
                <em
                  style={{
                    backgroundImage: `url(${require('../../assets/images/task-xqsms.png')})`
                  }}
                />
                需求说明书
              </a>
              <a
                href="javascript:void(0);"
                download="需求说明书"
                className="fr fs12 tac bsb"
              >
                <em
                  style={{
                    backgroundImage: `url(${require('../../assets/images/download-icon.png')})`
                  }}
                />
                下载
              </a>
            </div>
            <div className="item wp100">
              <a href="javascript:void(0);" className="fl fs12">
                <em
                  style={{
                    backgroundImage: `url(${require('../../assets/images/task-cpsms.png')})`
                  }}
                />
                产品说明书
              </a>
              <a
                href="javascript:void(0);"
                download="产品说明书"
                className="fr fs12 tac bsb"
              >
                <em
                  style={{
                    backgroundImage: `url(${require('../../assets/images/download-icon.png')})`
                  }}
                />
                下载
              </a>
            </div>
          </div>
          <div className={`${style.taskDesc} wp100 bsb bg-fff mt5`}>
            <div className="title wp100 fs14 bsb">对接反馈</div>
            <p className="fs12">
              四路高速光纤接口卡由4路光纤接收模块和pcie3.0传输模块组成。
              每路光纤数据传输速率可达10Gbp、传输协议为aurora。 pcie接口
              遵从PCIe Gen3.0标准规范，单lane传输速率8.0GT/s。四路高速
              光纤接口卡由4路光纤接收模块和pcie3.0传输模块组成。
              每路光纤数据传输速率可达10Gbp、传输协议为
            </p>
          </div>
          <div className="wp100 bsb bg-fff fs14 pb30 pt15">
            {this.randerMessge()}
          </div>
        </div>
      </div>
    )
  }
}

import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Flex } from 'antd-mobile'

import { Header } from '../../component/header'
const style = require('./style')

interface IPropsDeamndDone {}

interface IStateDeamndDone {}

export default class DeamndDone extends React.PureComponent<
  IPropsDeamndDone,
  IStateDeamndDone
> {
  render() {
    return (
      <div className={`${style.demandDone} wp100 hp100 pr pt50 bsb oh fs0`}>
        <Header right={<span className={`${style.biding} end`}>竞标结束</span>}>
          详情
        </Header>
        <div className="hp100 oay sb bsb">
          <div className={`${style.bidTitle} wp100 bsb bg-fff mt5`}>
            <div className="title wp100">
              <span className="fl tes fs14">【000019】系统维护与开发</span>
              <span className="fr tes fs12">
                状态:
                <span className="ml5">待对接</span>
              </span>
            </div>
            <Flex className={style.taskStatus}>
              <Flex.Item className="fs-ff0000">
                <em
                  style={{
                    backgroundImage: `url(${require('../../assets/images/task-jj-icon.png')})`
                  }}
                />
                紧急
              </Flex.Item>
              <Flex.Item>
                <em
                  style={{
                    backgroundImage: `url(${require('../../assets/images/task-eye-icon.png')})`
                  }}
                />
                104
              </Flex.Item>
              <Flex.Item>
                <em
                  style={{
                    backgroundImage: `url(${require('../../assets/images/task-bm-icon.png')})`
                  }}
                />
                104
              </Flex.Item>
            </Flex>
          </div>
          <div className={`${style.taskMsgItem} wp100 bsb bg-fff mt5`}>
            <div className="bid-item pr fs13">
              <span className="palt oh hp100">发布时间</span>
              <div className="wp100 tes">2019-05-13 10:10</div>
            </div>
            <div className="bid-item pr fs13">
              <span className="palt oh hp100">定标时间</span>
              <div className="wp100 tes">2019-01-01</div>
            </div>
            <div className="bid-item pr fs13">
              <span className="palt oh hp100">执行周期</span>
              <div className="wp100 tes">30天</div>
            </div>
          </div>
          <div className={`${style.taskMsgItem} wp100 bsb bg-fff mt5`}>
            <div className="bid-item pr fs13">
              <span className="palt oh hp100">需求预算</span>
              <div className="wp100 fs15 fs-ff0000 tes">￥6789</div>
            </div>
            <div className="bid-item pr fs13">
              <span className="palt oh hp100">竞标保证金</span>
              <div className="wp100 tes fs15 fs-ff0000">￥66623</div>
            </div>
            <div className="bid-item pr fs13">
              <span className="palt oh hp100">需求人数</span>
              <div className="wp100 tes">
                <span>5</span>人
              </div>
            </div>
            <div className="bid-item pr fs13">
              <span className="palt oh hp100">需求分类</span>
              <div className="wp100 tes">生产</div>
            </div>
            <div className="bid-item pr fs13">
              <span className="palt oh hp100">需求领域</span>
              <div className="wp100 tes">元件器件</div>
            </div>
            <div className="bid-item pr fs13">
              <span className="palt oh hp100">需求来源</span>
              <div className="wp100 tes">企业</div>
            </div>
          </div>
          <div className={`${style.taskDesc} wp100 bsb bg-fff mt5`}>
            <div className="title wp100 fs14 bsb">需求描述</div>
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
          <div className={`${style.taskDesc} wp100 bsb bg-fff mt5 pb30`}>
            <div className="title wp100 fs14 bsb">需求补充</div>
            <p className="fs12">
              四路高速光纤接口卡由4路光纤接收模块和pcie3.0传输模块组成。
              每路光纤数据传输速率可达10Gbp、传输协议为aurora。 pcie接口
              遵从PCIe Gen3.0标准规范，单lane传输速率8.0GT/s。四路高速
              光纤接口卡由4路光纤接收模块和pcie3.0传输模块组成。
              每路光纤数据传输速率可达10Gbp、传输协议为
            </p>
          </div>
        </div>
      </div>
    )
  }
}

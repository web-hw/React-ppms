import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import {} from 'antd-mobile'

import { Header } from '../../component/header'
const style = require('./style')

interface IPropsBidWinnerDetails {}

interface IStateBidWinnerDetails {}

export default class BidWinnerDetails extends React.PureComponent<
  IPropsBidWinnerDetails,
  IStateBidWinnerDetails
> {
  render() {
    return (
      <div
        className={`${style.bidWinnerDetails} wp100 hp100 pr pt50 bsb oh fs0`}
      >
        <Header>
          <span className="fs14">中标人</span>
        </Header>
        <div className="hp100 oay sb bsb">
          <div className={`${style.bidTitle} wp100 bsb bg-fff mt5`}>
            <div className="title wp100">
              <span className="fl tes fs14">【000019】系统维护与开发</span>
            </div>
          </div>
          <div className={`${style.taskMsgItem} wp100 bsb bg-fff mt5`}>
            <div className="bid-item pr fs13">
              <span className="palt oh hp100">投标提交时间</span>
              <div className="wp100 tes">2019-05-05 10:10</div>
            </div>
            <div className="bid-item pr fs13">
              <span className="palt oh hp100">竞标人</span>
              <div className="wp100 tes">闷油瓶</div>
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
            <div className="title wp100 fs14 bsb">简要策划：</div>
            <p className="fs12 pt5">
              第一阶段先确定好项目进展的时间，第二阶段确定好项目进行的流程，第三阶段确定好项目内容，
              第一阶段先确定好项目进展的时间，第二阶段确定好项目进行的流程，第三阶段确定好项目内容，
              第一阶段先确定好项目进展的时间，第二阶段确定好项目进行的流程，第三阶段确定好项目内容，
              第一阶段先确定好项目进展的时间，第二阶段确定好项目进行的流程，第三阶段确定好项目内容，
              第一阶段先确定好项目进展的时间，第二阶段确定好项目进行的流程，第三阶段确定好项目内容，
              第一阶段先确定好项目进展的时间，第二阶段确定好项目进行的流程，第三阶段确定好项目内容，
            </p>
          </div>
          <div className={`${style.taskFile} wp100 bsb bg-fff mt5`}>
            <span className="title wp100 fs14 bsb">需求附件(2)</span>
            <div className="item wp100 pt10">
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
            <div className="title wp100 fs14 bsb">对接反馈:</div>
            <p className="fs12 pt5">
              第一阶段先确定好项目进展的时间，第二阶段确定好项目进行的流程，第三阶段确定好项目内容，
              第一阶段先确定好项目进展的时间，第二阶段确定好项目进行的流程，第三阶段确定好项目内容，
              第一阶段先确定好项目进展的时间，第二阶段确定好项目进行的流程，第三阶段确定好项目内容，
            </p>
          </div>
        </div>
      </div>
    )
  }
}

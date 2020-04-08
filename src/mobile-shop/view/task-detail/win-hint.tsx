import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Button, Toast } from 'antd-mobile'

import { Header } from '../../component/header'
export const toast = {
  // 显示时间
  _duration: 2,

  info(msg: string, duration: number = this._duration) {
    Toast.info(msg, duration, null, true)
  }
}
const style = require('./style')

interface IPropsWinHint {}

interface IStateWinHint {}

export default class WinHint extends React.PureComponent<
  IPropsWinHint,
  IStateWinHint
> {
  constructor(props: IPropsWinHint) {
    super(props)
  }
  render() {
    return (
      <div className={`${style.winHint} wp100 hp100 pr pt50 bsb oh fs0`}>
        <Header>
          <span className="fs14">投标</span>
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
            <p className="fs12 pt5">
              第一阶段先确定好项目进展的时间，第二阶段确定好项目进行的流程，第三阶段确定好项目内容，
              第一阶段先确定好项目进展的时间，第二阶段确定好项目进行的流程，第三阶段确定好项目内容，
              第一阶段先确定好项目进展的时间，第二阶段确定好项目进行的流程，第三阶段确定好项目内容，
              第一阶段先确定好项目进展的时间，第二阶段确定好项目进行的流程，第三阶段确定好项目内容，
              第一阶段先确定好项目进展的时间，第二阶段确定好项目进行的流程，第三阶段确定好项目内容，
              第一阶段先确定好项目进展的时间，第二阶段确定好项目进行的流程，第三阶段确定好项目内容，
            </p>
          </div>
          <div className="button fs12 mt5">
            <div className="drop wp50">
              <Button>落标</Button>
            </div>
            <div className="win wp50">
              <Button
                onClick={() =>
                  Toast.info('闷油瓶已中标,闷油瓶已中标,闷油瓶已中标')
                }
              >
                中标
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

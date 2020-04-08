import * as React from 'react'
import { Link } from 'react-router-dom'
import {} from 'antd-mobile'

import { Header } from '../../component/header'
const style = require('./style')

interface IPropsTheWinner {}

interface IStateTheWinner {}

export default class TheWinner extends React.PureComponent<
  IPropsTheWinner,
  IStateTheWinner
> {
  render() {
    return (
      <div className="wp100 hp100 pr bsb pt50 fs0 bg-f0f0f0 oh">
        <Header>中标人</Header>
        <div className="mt5 ml10 mr10 bg-fff">
          <div className="detail pt10 pb10">
            <div className="title pl10 ">
              <img src={require('../../assets/images/personal-center.png')} />
              <span className="fs14 ml10 tes">竞标人：闷油瓶</span>
            </div>
            <div className="time">
              <span className="fs12 pr10 tes">
                提交时间：2019-05-01 12:56:21
              </span>
            </div>
          </div>
          <div className="item pt10 pb10 fs12">
            <p className="offer pl10 tes">
              报价：<span className="price">￥6789</span>
            </p>
            <p className="date pr10 tes">周期：60天</p>
          </div>
          <div className="intro pt10 pb10 fs12">
            <p className="pb10 pl10 pr10">
              <span className="bord pl10">简要策划：</span>
              第一阶段先确定好项目进展的时间，第二阶段确定好项目进行的流程，第三阶段确定好项目内容
            </p>
            <div className="foot wp100 fs12 pb10 pt10 ">
              <Link to="/task-detail/bid-winner-details">查看</Link>
            </div>
          </div>
        </div>
        <div className="mt5 ml10 mr10 bg-fff">
          <div className="detail pt10 pb10">
            <div className="title pl10 ">
              <img src={require('../../assets/images/personal-center.png')} />
              <span className="fs14 ml10 tes">竞标人：闷油瓶</span>
            </div>
            <div className="time">
              <span className="fs12 pr10 tes">
                提交时间：2019-05-01 12:56:21
              </span>
            </div>
          </div>
          <div className="item pt10 pb10 fs12">
            <p className="offer pl10 tes">
              报价：<span className="price">￥6789</span>
            </p>
            <p className="date pr10 tes">周期：60天</p>
          </div>
          <div className="intro pt10 pb10 fs12">
            <p className="pb10 pl10 pr10">
              <span className="bord pl10">简要策划：</span>
              第一阶段先确定好项目进展的时间，第二阶段确定好项目进行的流程，第三阶段确定好项目内容
            </p>
            <div className="foot wp100 fs12 pb10 pt10 ">
              <Link to="">查看</Link>
            </div>
          </div>
        </div>
        <div className="mt5 ml10 mr10 bg-fff">
          <div className="detail pt10 pb10">
            <div className="title pl10 ">
              <img src={require('../../assets/images/personal-center.png')} />
              <span className="fs14 ml10 tes">竞标人：闷油瓶</span>
            </div>
            <div className="time">
              <span className="fs12 pr10 tes">
                提交时间：2019-05-01 12:56:21
              </span>
            </div>
          </div>
          <div className="item pt10 pb10 fs12">
            <p className="offer pl10 tes">
              报价：<span className="price">￥6789</span>
            </p>
            <p className="date pr10 tes">周期：60天</p>
          </div>
          <div className="intro pt10 pb10 fs12">
            <p className="pb10 pl10 pr10">
              <span className="bord pl10">简要策划：</span>
              第一阶段先确定好项目进展的时间，第二阶段确定好项目进行的流程，第三阶段确定好项目内容
            </p>
            <div className="foot wp100 fs12 pb10 pt10 ">
              <Link to="">查看</Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

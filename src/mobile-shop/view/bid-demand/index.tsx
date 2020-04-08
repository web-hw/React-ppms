import * as React from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'
import {} from 'antd-mobile'

import { Header } from '../../component/header'
const style = require('./style')

interface IPropsBidDemand extends RouteComponentProps {}

interface IStateBidDemand {}

export default class BidDemand extends React.PureComponent<
  IPropsBidDemand,
  IStateBidDemand
> {
  render() {
    return (
      <div className={`${style.bidDemand} wp100 hp100 pr pt50 bsb oh fs0`}>
        <Header>
          <span className="fs14">我竞标的</span>
        </Header>
        <div className=" hp100 oay sb bsb">
          <div className={`${style.list} pb10 bg-fff mt5 ml10 mr10`}>
            <div className="title  fs12 pt10 pb10">
              <span
                className="tit pl5 tes"
                onClick={() => this.props.history.push('/task-detail/bid')}
              >
                【000023】系统维护与开发
              </span>
              <span className="win fs12 tes">中标</span>
            </div>
            <div className="date fs12 pr10">
              <span className="issue tes pl15">发布日期：2019-01-01</span>
              <span className="domain tes">领域：元件组件</span>
            </div>
            <div className="people fs12 pr10">
              <span className="issue-p tes pl15">发布人：三叔</span>
              <span className="f tes">分类：全部</span>
            </div>
            <div className="foot wp100 tes fs12 pb10 pt10 ">
              <Link to="/task-detail/tender-bid">查看投标详情</Link>
            </div>
          </div>
          <div className={`${style.list} pb10 bg-fff mt5 ml10 mr10`}>
            <div className="title fs12 pt10 pb10">
              <span className="tit pl5 tes">【000023】系统维护与开发</span>
              <span className="outbid fs12 tes">落标</span>
            </div>
            <div className="date fs12 pr10">
              <span className="issue tes  pl15">发布日期：2019-01-01</span>
              <span className="domain tes">领域：元件组件</span>
            </div>
            <div className="people fs12 pr10">
              <span className="issue-p tes  pl15">发布人：三叔</span>
              <span className="f tes">分类：全部</span>
            </div>
            <div className="foot wp100 tes fs12 pb10 pt10 ">
              <Link to="">查看竞标详情</Link>
            </div>
          </div>
          <div className={`${style.list} pb10 bg-fff mt5 ml10 mr10`}>
            <div className="title  fs12 pt10 pb10">
              <span className="tit pl5 tes">【000023】系统维护与开发</span>
              <span className="wait fs12 tes">待对接</span>
            </div>
            <div className="date fs12 pr10">
              <span className="issue tes pl15">发布日期：2019-01-01</span>
              <span className="domain tes">领域：元件组件</span>
            </div>
            <div className="people fs12 pr10">
              <span className="issue-p tes pl15">发布人：三叔</span>
              <span className="f tes">分类：全部</span>
            </div>
            <div className="foot wp100 tes fs12 pb10 pt10 ">
              <Link to="">查看竞标详情</Link>
            </div>
          </div>
          <div className={`${style.list} pb10 bg-fff mt5 ml10 mr10`}>
            <div className="title fs12 pt10 pb10">
              <span className="tit pl5 tes">【000023】系统维护与开发</span>
              <span className="suc fs12 tes">对接已通过</span>
            </div>
            <div className="date fs12 pr10">
              <span className="issue tes pl15">发布日期：2019-01-01</span>
              <span className="domain tes">领域：元件组件</span>
            </div>
            <div className="people fs12 pr10">
              <span className="issue-p tes pl15">发布人：三叔</span>
              <span className="f tes">分类：全部</span>
            </div>
            <div className="foot wp100 tes fs12 pb10 pt10 ">
              <Link to="">查看竞标详情</Link>
            </div>
          </div>
          <div className={`${style.list} pb10 bg-fff mt5 ml10 mr10`}>
            <div className="title  fs12 pt10 pb10">
              <span className="tit pl5 tes">【000023】系统维护与开发</span>
              <span className="false fs12 tes">对接未通过</span>
            </div>
            <div className="date fs12 pr10">
              <span className="issue tes pl15">发布日期：2019-01-01</span>
              <span className="domain tes">领域：元件组件</span>
            </div>
            <div className="people fs12 pr10">
              <span className="issue-p tes pl15">发布人：三叔</span>
              <span className="f tes">分类：全部</span>
            </div>
            <div className="foot wp100 tes fs12 pb10 pt10 ">
              <Link to="">查看竞标详情</Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

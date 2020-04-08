import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Button, Toast, TextareaItem } from 'antd-mobile'

import { Header } from '../../component/header'
const style = require('./style')

interface IPropsWinThrough {}

interface IStateWinThrough {}

export default class WinThrough extends React.PureComponent<
  IPropsWinThrough,
  IStateWinThrough
> {
  constructor(props: IPropsWinThrough) {
    super(props)
  }
  render() {
    return (
      <div className={`${style.winThrough} wp100 hp100 pr pt50 bsb oh fs0`}>
        <Header>
          <span className="fs14">投标</span>
        </Header>
        <div className="hp100 oay sb bsb">
          <div className="header pt10 pb10 fs12 bg-fff mt5 pl10">
            <span className="title fs14">【000011】系统维护与开发</span>
          </div>
          <div className="list bg-fff">
            <ul className="fs12 pl10 tes">
              <li>
                投标提交时间<span>2019-05-05 10:10</span>
              </li>
              <li>
                竞标人<span>闷油瓶</span>
              </li>
              <li>
                报价<span>￥56233</span>
              </li>
              <li>
                预估执行周期<span>56天</span>
              </li>
              <li>
                竞标保证金<span>(已提交)</span>
                <span className="price">￥56233</span>
              </li>
              <li>
                投标人姓名<span>李奕奕</span>
              </li>
              <li className="phone">
                投标人电话<span>13888889090</span>
              </li>
            </ul>
          </div>
          <div className="detail bg-fff pt10 pb10 fs12 pl10">
            <span className="sm-title pl10">简要策划：</span>
            <p className="pt10">
              第一阶段先确定好项目进展的时间，第二阶段确定好项目进行的流程，第三阶段确定好项目内容，
              第一阶段先确定好项目进展的时间，第二阶段确定好项目进行的流程，第三阶段确定好项目内容，
              第一阶段先确定好项目进展的时间，第二阶段确定好项目进行的流程，第三阶段确定好项目内容，
              第一阶段先确定好项目进展的时间，第二阶段确定好项目进行的流程，第三阶段确定好项目内容，
              第一阶段先确定好项目进展的时间，第二阶段确定好项目进行的流程，第三阶段确定好项目内容，
              第一阶段先确定好项目进展的时间，第二阶段确定好项目进行的流程，第三阶段确定好项目内容，
            </p>
          </div>
          <div
            className={`${
              style.tenderFile
            } wp100 bsb bg-fff mt5 pt10 pl10 pb10 pr10`}
          >
            <span className="tit wp100 fs12 bsb ">需求附件(2)</span>
            <div className="item wp100 pt15">
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
          <div className="foot pt10 bg-fff fs12 pl10">
            <span className="sm-title pl10">对接反馈:</span>
            <TextareaItem />
          </div>
          <div className="button fs12 mt5">
            <div className="drop wp50">
              <Button>拒绝</Button>
            </div>
            <div className="win wp50">
              <Button onClick={() => Toast.info('闷油瓶的中标通过成功')}>
                通过
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

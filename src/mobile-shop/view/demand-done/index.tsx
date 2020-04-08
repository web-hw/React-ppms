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
        <Header>
          <span className="fs14">详情</span>
        </Header>
        <div className="hp100 oay sb bsb">
          <div className={`${style.had} pb10 bg-fff mt5 pt10 pl10`}>
            <span className="sm-title fs12 pl10">竞标结束</span>
            <div className="header pb10 fs12 bg-fff">
              <span className="sm-tit fs12 pt10 tes">
                【000019】系统维护与开发
              </span>
              <span className="state pr10 pt10 tes">状态：待对接</span>
            </div>
            <Flex className="pr10 wp100">
              <Flex.Item>
                <img src={require('../../assets/images/danger-icon.png')} />
                <span className="fs12 pl10 wp0">警告</span>
              </Flex.Item>
              <Flex.Item className="pos">
                <img src={require('../../assets/images/look-icon.png')} />
                <span className="fs12 pl10 wp0">235</span>
              </Flex.Item>
              <Flex.Item className="pos">
                <img src={require('../../assets/images/join-icon.png')} />
                <span className="fs12 pl10 wp0">235</span>
              </Flex.Item>
            </Flex>
          </div>
          <div className={`${style.list} bg-fff mt5 `}>
            <ul className="fs12 pl10">
              <li>
                发布时间<span>2018-05-01 12:56:45</span>
              </li>
              <li>
                定标时间<span>2019-05-05</span>
              </li>
              <li>
                执行周期<span className="source">30天</span>
              </li>
            </ul>
          </div>
          <div className={`${style.list} bg-fff mt5 `}>
            <ul className="fs12 pl10">
              <li>
                需求预算<span className="price">￥6233</span>
              </li>
              <li>
                竞标保证金<span className="price">￥56233</span>
              </li>
              <li>
                需求人数<span>5人</span>
              </li>
              <li>
                需求分类<span>生产</span>
              </li>
              <li>
                需求领域<span>元件器件</span>
              </li>
              <li className="source">
                需求来源<span>企业</span>
              </li>
            </ul>
          </div>
          <div className="detail bg-fff pt10 mt5 pb10 fs12 pl10">
            <span className="sm-title pl10 fs12">需求相关描述：</span>
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
          <div className="foot pt10 bg-fff fs12 mt5 pl10">
            <span className="sm-title pl10 fs12">需求补充：</span>
            <p className="pt10 pb30">
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

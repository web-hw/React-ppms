import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Flex, TextareaItem, Button } from 'antd-mobile'

import { Header } from '../../component/header'
const style = require('./style')

interface IPropsEndDocking {}

interface IStateEndDocking {
  msg: string
}

export default class EndDocking extends React.PureComponent<
  IPropsEndDocking,
  IStateEndDocking
> {
  constructor(props: IPropsEndDocking) {
    super(props)

    this.state = {
      msg: ''
    }

    this.onChangeMsg = this.onChangeMsg.bind(this)
    this.onSendMsg = this.onSendMsg.bind(this)
  }

  onChangeMsg(msg: string) {
    this.setState({ msg })
  }

  onSendMsg() {
    const { msg } = this.state
    console.log(msg)
  }
  render() {
    return (
      <div className={`${style.endDocking} wp100 hp100 pr pt50 bsb oh fs0`}>
        <Header right={<span className={style.biding}>结束对接</span>}>
          详情
        </Header>
        <div className="hp100 oay sb bsb">
          <div className="time mt5 bg-fff wp100 ptb10">
            <div className=" fs12 ">
              <span className="text">距离对接截止还有：</span>
              <span className="date">0</span>
              <span className="date">6</span>天
              <span className="date ml5">1</span>
              <span className="date">2</span>小时
            </div>
          </div>
          <div className={`${style.had} pb10 bg-fff mt5 pt10 pl10`}>
            <div className="header pb15 fs12 bg-fff">
              <span className="title fs14 tes">【000019】系统维护与开发</span>
              <span className="state pr10 tes">状态：待对接</span>
            </div>
            <Flex className="pr10 wp100">
              <Flex.Item>
                <img src={require('../../assets/images/danger-icon.png')} />
                <span className="fs12 pl10 wp0">紧急</span>
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
          <div className="foot pt10 bg-fff fs12 mt5 pl10 pb30">
            <span className="sm-title pl10 fs12">需求补充：</span>
            <TextareaItem value={this.state.msg} onChange={this.onChangeMsg} />
            <Button
              onClick={this.onSendMsg}
              disabled={!this.state.msg}
              className="mt20 fs12 db ma"
            >
              提交
            </Button>
          </div>
        </div>
      </div>
    )
  }
}

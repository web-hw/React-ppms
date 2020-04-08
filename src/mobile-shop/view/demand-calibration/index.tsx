import * as React from 'react'
import { Link } from 'react-router-dom'
import { Tabs, Flex } from 'antd-mobile'

import { Header } from '../../component/header'
const style = require('./style')

interface IPropsDemandCalibration {}

interface IStateDemandCalibration {}

const configTabs = [{ title: '待定标' }, { title: '中标' }, { title: '落标' }]
export default class DemandCalibration extends React.PureComponent<
  IPropsDemandCalibration,
  IStateDemandCalibration
> {
  private onChangeTab(item: any) {
    console.log(item)
  }
  constructor(props: IPropsDemandCalibration) {
    super(props)
    this.onChangeTab = this.onChangeTab.bind(this)
  }
  render() {
    return (
      <div className="wp100 hp100 pr bsb pt50 fs0 bg-f0f0f0 oh">
        <Header>需求对接</Header>
        <div className={`${style.demandDocking} hp100 bsb pt35 pr`}>
          {/* 左右遮罩 */}
          <em className="model-l-r palt zi400 bg-fff" />
          <em className="model-l-r part zi400 bg-fff" />
          <Tabs
            tabs={configTabs}
            onChange={this.onChangeTab}
            renderTabBar={props => <Tabs.DefaultTabBar {...props} page={3} />}
          >
            {/* 全部 */}
            <div className="oay sb">
              <div className="header wp100 bg-fff fs12">
                <em
                  style={{
                    backgroundImage: `url(${require('../../assets/images/flag-icon.png')})`
                  }}
                />
                <span className=" pb10 pl20 head">
                  该需求总需5人，对接通过10人，已中标2人
                </span>
              </div>
              <div className="mt5 ml10 mr10 bg-fff">
                <div className="detail pt10 pb10">
                  <div className="title pl10 ">
                    <img
                      src={require('../../assets/images/personal-center.png')}
                    />
                    <span className="fs14 ml10 tes">竞标人：闷油瓶</span>
                  </div>
                  <div className="time">
                    <span className="fs12 pr10 tes">
                      提交时间：2019-05-01 12:56:21
                    </span>
                  </div>
                </div>
                <div className="item pt15 pb15">
                  <Flex>
                    <Flex.Item className=" pl10 fs12 tes">
                      报价：<span className="price tes">￥6789</span>
                    </Flex.Item>
                    <Flex.Item className="fs12 fos tes">
                      周期：<span className="fs12 tes">60天</span>
                    </Flex.Item>
                    <Flex.Item className="fs12 fos tes">
                      状态：<span className="fs12 tes">待定标</span>
                    </Flex.Item>
                  </Flex>
                </div>
                <div className="intro pt10 pb10 fs12">
                  <p className="pb10  pl10">
                    <span className="bord pl10">简要策划：</span>
                    第一阶段先确定好项目进展的时间，第二阶段确定好项目进行的流程，第三阶段确定好项目内容
                  </p>
                  <div className="foot wp100 fs12 pb10 pt10 ">
                    <Link to="/task-detail/win-hint">查看</Link>
                  </div>
                </div>
              </div>
              <div className="mt5 ml10 mr10 bg-fff">
                <div className="detail pt10 pb10">
                  <div className="title pl10 ">
                    <img
                      src={require('../../assets/images/personal-center.png')}
                    />
                    <span className="fs14 ml10 tes">竞标人：闷油瓶</span>
                  </div>
                  <div className="time">
                    <span className="fs12 pr10 tes">
                      提交时间：2019-05-01 12:56:21
                    </span>
                  </div>
                </div>
                <div className="item pt15 pb15">
                  <Flex>
                    <Flex.Item className=" pl10 fs12 tes">
                      报价：<span className="price tes">￥6789</span>
                    </Flex.Item>
                    <Flex.Item className="fs12 fos tes">
                      周期：<span className="fs12 tes">60天</span>
                    </Flex.Item>
                    <Flex.Item className="fs12 fos tes">
                      状态：<span className="fs12 tes">待定标</span>
                    </Flex.Item>
                  </Flex>
                </div>
                <div className="intro pt10 pb10 fs12">
                  <p className="pb10  pl10">
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
                    <img
                      src={require('../../assets/images/personal-center.png')}
                    />
                    <span className="fs14 ml10 tes">竞标人：闷油瓶</span>
                  </div>
                  <div className="time">
                    <span className="fs12 pr10 tes">
                      提交时间：2019-05-01 12:56:21
                    </span>
                  </div>
                </div>
                <div className="item pt15 pb15">
                  <Flex>
                    <Flex.Item className=" pl10 fs12 tes">
                      报价：<span className="price tes">￥6789</span>
                    </Flex.Item>
                    <Flex.Item className="fs12 fos tes">
                      周期：<span className="fs12 tes">60天</span>
                    </Flex.Item>
                    <Flex.Item className="fs12 fos tes">
                      状态：<span className="fs12 tes">待定标</span>
                    </Flex.Item>
                  </Flex>
                </div>
                <div className="intro pt10 pb10 fs12">
                  <p className="pb10  pl10">
                    <span className="bord pl10">简要策划：</span>
                    第一阶段先确定好项目进展的时间，第二阶段确定好项目进行的流程，第三阶段确定好项目内容
                  </p>
                  <div className="foot wp100 fs12 pb10 pt10 ">
                    <Link to="">查看</Link>
                  </div>
                </div>
              </div>
            </div>
            {/* 中标*/}
            <div className="oay sb">
              <div className="header wp100 bg-fff fs12">
                <em
                  style={{
                    backgroundImage: `url(${require('../../assets/images/flag-icon.png')})`
                  }}
                />
                <span className=" pb10 pl20 head">
                  该需求总需5人，对接通过10人，已中标2人
                </span>
              </div>
              <div className="mt5 ml10 mr10 bg-fff">
                <div className="detail pt10 pb10">
                  <div className="title pl10 ">
                    <img
                      src={require('../../assets/images/personal-center.png')}
                    />
                    <span className="fs14 ml10 tes">竞标人：闷油瓶</span>
                  </div>
                  <div className="time">
                    <span className="fs12 pr10 tes">
                      提交时间：2019-05-01 12:56:21
                    </span>
                  </div>
                </div>
                <div className="item pt15 pb15">
                  <Flex>
                    <Flex.Item className=" pl10 fs12 tes">
                      报价：<span className="price tes">￥6789</span>
                    </Flex.Item>
                    <Flex.Item className="fs12 fos tes">
                      周期：<span className="fs12 tes">60天</span>
                    </Flex.Item>
                    <Flex.Item className="fs12 fos tes">
                      状态：<span className="fs12 tes">中标</span>
                    </Flex.Item>
                  </Flex>
                </div>
                <div className="intro pt10 pb10 fs12">
                  <p className="pb10  pl10">
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
                    <img
                      src={require('../../assets/images/personal-center.png')}
                    />
                    <span className="fs14 ml10 tes">竞标人：闷油瓶</span>
                  </div>
                  <div className="time">
                    <span className="fs12 pr10 tes">
                      提交时间：2019-05-01 12:56:21
                    </span>
                  </div>
                </div>
                <div className="item pt15 pb15">
                  <Flex>
                    <Flex.Item className=" pl10 fs12 tes">
                      报价：<span className="price tes">￥6789</span>
                    </Flex.Item>
                    <Flex.Item className="fs12 fos tes">
                      周期：<span className="fs12 tes">60天</span>
                    </Flex.Item>
                    <Flex.Item className="fs12 fos tes">
                      状态：<span className="fs12 tes">中标</span>
                    </Flex.Item>
                  </Flex>
                </div>
                <div className="intro pt10 pb10 fs12">
                  <p className="pb10 pl10">
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
                    <img
                      src={require('../../assets/images/personal-center.png')}
                    />
                    <span className="fs14 ml10 tes">竞标人：闷油瓶</span>
                  </div>
                  <div className="time">
                    <span className="fs12 pr10 tes">
                      提交时间：2019-05-01 12:56:21
                    </span>
                  </div>
                </div>
                <div className="item pt15 pb15">
                  <Flex>
                    <Flex.Item className=" pl10 fs12 tes">
                      报价：<span className="price tes">￥6789</span>
                    </Flex.Item>
                    <Flex.Item className="fs12 fos tes">
                      周期：<span className="fs12 tes">60天</span>
                    </Flex.Item>
                    <Flex.Item className="fs12 fos tes">
                      状态：<span className="fs12 tes">中标</span>
                    </Flex.Item>
                  </Flex>
                </div>
                <div className="intro pt10 pb10 fs12">
                  <p className="pb10  pl10">
                    <span className="bord pl10">简要策划：</span>
                    第一阶段先确定好项目进展的时间，第二阶段确定好项目进行的流程，第三阶段确定好项目内容
                  </p>
                  <div className="foot wp100 fs12 pb10 pt10 ">
                    <Link to="">查看</Link>
                  </div>
                </div>
              </div>
            </div>
            {/* 落标 */}
            <div className="oay sb">
              <div className="header wp100 bg-fff fs12">
                <em
                  style={{
                    backgroundImage: `url(${require('../../assets/images/flag-icon.png')})`
                  }}
                />
                <span className=" pb10 pl20 head">
                  该需求总需5人，对接通过10人，已中标2人
                </span>
              </div>
              <div className="mt5 ml10 mr10 bg-fff">
                <div className="detail pt10 pb10">
                  <div className="title pl10 ">
                    <img
                      src={require('../../assets/images/personal-center.png')}
                    />
                    <span className="fs14 ml10 tes">竞标人：闷油瓶</span>
                  </div>
                  <div className="time">
                    <span className="fs12 pr10 tes">
                      提交时间：2019-05-01 12:56:21
                    </span>
                  </div>
                </div>
                <div className="item pt15 pb15">
                  <Flex>
                    <Flex.Item className=" pl10 fs12 tes">
                      报价：<span className="price tes">￥6789</span>
                    </Flex.Item>
                    <Flex.Item className="fs12 fos tes">
                      周期：<span className="fs12 tes">60天</span>
                    </Flex.Item>
                    <Flex.Item className="fs12 fos tes">
                      状态：<span className="fs12 tes">落标</span>
                    </Flex.Item>
                  </Flex>
                </div>
                <div className="intro pt10 pb10 fs12">
                  <p className="pb10  pl10">
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
                    <img
                      src={require('../../assets/images/personal-center.png')}
                    />
                    <span className="fs14 ml10 tes">竞标人：闷油瓶</span>
                  </div>
                  <div className="time">
                    <span className="fs12 pr10 tes">
                      提交时间：2019-05-01 12:56:21
                    </span>
                  </div>
                </div>
                <div className="item pt15 pb15">
                  <Flex>
                    <Flex.Item className=" pl10 fs12 tes">
                      报价：<span className="price tes">￥6789</span>
                    </Flex.Item>
                    <Flex.Item className="fs12 fos tes">
                      周期：<span className="fs12 tes">60天</span>
                    </Flex.Item>
                    <Flex.Item className="fs12 fos tes">
                      状态：<span className="fs12 tes">落标</span>
                    </Flex.Item>
                  </Flex>
                </div>
                <div className="intro pt10 pb10 fs12">
                  <p className="pb10  pl10">
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
                    <img
                      src={require('../../assets/images/personal-center.png')}
                    />
                    <span className="fs14 ml10 tes">竞标人：闷油瓶</span>
                  </div>
                  <div className="time">
                    <span className="fs12 pr10 tes">
                      提交时间：2019-05-01 12:56:21
                    </span>
                  </div>
                </div>
                <div className="item pt15 pb15">
                  <Flex>
                    <Flex.Item className=" pl10 fs12 tes">
                      报价：<span className="price tes">￥6789</span>
                    </Flex.Item>
                    <Flex.Item className="fs12 fos tes">
                      周期：<span className="fs12 tes">60天</span>
                    </Flex.Item>
                    <Flex.Item className="fs12 fos tes">
                      状态：<span className="fs12 tes">落标</span>
                    </Flex.Item>
                  </Flex>
                </div>
                <div className="intro pt10 pb10 fs12">
                  <p className="pb10  pl10">
                    <span className="bord pl10">简要策划：</span>
                    第一阶段先确定好项目进展的时间，第二阶段确定好项目进行的流程，第三阶段确定好项目内容
                  </p>
                  <div className="foot wp100 fs12 pb10 pt10 ">
                    <Link to="">查看</Link>
                  </div>
                </div>
              </div>
            </div>
          </Tabs>
        </div>
      </div>
    )
  }
}

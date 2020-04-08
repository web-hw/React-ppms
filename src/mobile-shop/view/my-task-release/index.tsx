import * as React from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'
import { Tabs, Icon, Flex } from 'antd-mobile'

import { Header } from '../../component/header'
const style = require('./style')

interface IPropsMyTaskRelease extends RouteComponentProps {}

interface IStateMyTaskRelease {}

const configTabs = [
  { title: '待对接' },
  { title: '待定标' },
  { title: '已完成' }
]

export default class MyTaskRelease extends React.PureComponent<
  IPropsMyTaskRelease,
  IStateMyTaskRelease
> {
  private onChangeTab(item: any) {
    console.log(item)
  }

  constructor(props: IPropsMyTaskRelease) {
    super(props)

    this.onChangeTab = this.onChangeTab.bind(this)
  }

  render() {
    return (
      <div className="wp100 hp100 pr bsb pt50 fs0 bg-f0f0f0 oh">
        <Header>已发布</Header>
        <div className={`${style.myTaskRelease} wp100 hp100 bsb pt35 pr`}>
          {/* 左右遮罩 */}
          <em className="model-l-r palt zi400 bg-fff" />
          <em className="model-l-r part zi400 bg-fff" />
          <Tabs
            tabs={configTabs}
            onChange={this.onChangeTab}
            renderTabBar={props => <Tabs.DefaultTabBar {...props} page={3} />}
          >
            {/* 待对接 */}
            <div className="wp100 hp100 oay sb">
              <div className={`${style.item} wp100 bsb plr10 bg-fff`}>
                <Link
                  to="/task-detail/end-docking"
                  className={`${style.title} fs14 db wp100 tes bb1 bsb pr`}
                >
                  【000011】系统维护与开发
                  <Icon type="right" size="md" className="part" />
                </Link>
                <Flex className={`${style.info} wp100`}>
                  <Flex.Item>
                    <div className="remain-time fs-ff6600 fs15">1</div>
                    <div className="remain-time">剩余天数</div>
                  </Flex.Item>
                  <Flex.Item>
                    <div>
                      投标人数:<span>20</span>
                    </div>
                    <div>
                      已对接:<span>20</span>
                    </div>
                  </Flex.Item>
                  <Flex.Item>
                    <Link to="/demand-docking">对接</Link>
                  </Flex.Item>
                </Flex>
              </div>
            </div>
            {/* 待定标 */}
            <div className="wp100 hp100 oay sb">
              <div className={`${style.item} wp100 bsb plr10 bg-fff`}>
                <Link
                  to="/task-detail/end-calibration"
                  className={`${style.title} fs14 db wp100 tes bb1 bsb pr`}
                >
                  【000011】系统维护与开发
                  <Icon type="right" size="md" className="part" />
                </Link>
                <Flex className={`${style.info} wp100`}>
                  <Flex.Item>
                    <div className="remain-time fs-ff6600 fs15">1</div>
                    <div className="remain-time">剩余天数</div>
                  </Flex.Item>
                  <Flex.Item>
                    <div>
                      已对接人数:<span>20</span>
                    </div>
                    <div>
                      发布日期:<span>2019-01-01</span>
                    </div>
                  </Flex.Item>
                  <Flex.Item>
                    <Link to="/demand-calibration">定标</Link>
                  </Flex.Item>
                </Flex>
              </div>
            </div>
            {/* 已完成 */}
            <div className="wp100 hp100 oay sb">
              <div className={`${style.item} wp100 bsb plr10 bg-fff`}>
                <Link
                  to="/task-detail/demand-done"
                  className={`${style.title} fs14 db wp100 tes bb1 bsb pr`}
                >
                  【000011】系统维护与开发
                  <Icon type="right" size="md" className="part" />
                </Link>
                <Flex className={`${style.info} wp100`}>
                  <Flex.Item>
                    <div>
                      已对接人数:<span>20</span>
                    </div>
                    <div>
                      发布日期:<span>2019-01-01</span>
                    </div>
                  </Flex.Item>
                  <Flex.Item>
                    <div>
                      领域:<span>原件器件</span>
                    </div>
                    <div>
                      分类:<span>生产</span>
                    </div>
                  </Flex.Item>
                  <Flex.Item>
                    <Link className="win-bid-btn" to="/the-winner">
                      查看中标人
                    </Link>
                  </Flex.Item>
                </Flex>
              </div>
            </div>
          </Tabs>
        </div>
      </div>
    )
  }
}

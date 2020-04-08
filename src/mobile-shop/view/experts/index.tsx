import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Icon, Tabs, Button } from 'antd-mobile'

import { Header } from '../../component/header'
const style = require('./style')

interface IPropsExperts extends RouteComponentProps {}

interface IStateExperts {
  trades: any[] // 行业
  isShowScreen: boolean
}

export default class Experts extends React.PureComponent<
  IPropsExperts,
  IStateExperts
> {
  // 切换tab
  private onChangeTab(tab: any) {}

  constructor(props: IPropsExperts) {
    super(props)

    this.state = {
      isShowScreen: false,
      trades: [
        { title: '全部专家', value: '全部专家' },
        { title: '电子产品', value: '电子产品' },
        { title: '鉴定检测', value: '鉴定检测' },
        { title: '知识产权', value: '知识产权' },
        { title: '组件部件', value: '组件部件' }
      ]
    }

    this.onChangeTab = this.onChangeTab.bind(this)
  }

  render() {
    return (
      <div className="wp100 hp100 pr bsb pt50 fs0 bg-fff oh">
        <Header
          right={
            <Icon
              onClick={() => this.props.history.push('expert-search')}
              className="vat"
              type="search"
              color="#1a1a1a"
              size="sm"
            />
          }
        >
          专家中心
        </Header>
        <div className={`${style.experts} wp100 hp100 bsb pt40 pr`}>
          {/* 左右遮罩 */}
          <em className="model-l-r palt zi400 bg-fff" />
          <span className="tab-screen part zi400 bsb">
            <em className="model-l-r palt bg-fff" />
            <span
              onClick={() => this.setState({ isShowScreen: true })}
              className="wp100 hp100 fs12 db tac"
            >
              筛选
              <em
                style={{
                  backgroundImage: `url(${require('../../assets/images/sx-icon.png')})`
                }}
              />
            </span>
          </span>
          <Tabs
            tabs={this.state.trades}
            onChange={this.onChangeTab}
            renderTabBar={props => <Tabs.DefaultTabBar {...props} page={4} />}
          >
            <div className={`${style.expertContent} wp100 hp100 oay sb`}>
              <div
                className="expert-item wp100 p15 bsb bg-fff mt5"
                onClick={() => this.props.history.push('expert')}
              >
                <div className="item-header wp100">
                  <div className="fl hp100 pr">
                    <img
                      src={require('../../assets/images/test.png')}
                      className="palt"
                    />
                    <div className="wp100 hp100 fs15 tes">刘新建</div>
                  </div>
                  <div className="fr hp100 pr">
                    <span className="part bsb fs12 tes">电子产品</span>
                  </div>
                </div>
                <div className="item-content wp100">
                  <div className="mt5 wp100 tes">
                    中国国防工业企业协会执行副会长兼秘书长
                  </div>
                  <div className="wp100 tes3">
                    石金武，男，汉族，陕西咸阳人。中国共产党党员。国家安全战略与国防经济研究专业委员会主任。
                  </div>
                </div>
              </div>
              <div className="expert-item wp100 p15 bsb bg-fff mt5">
                <div className="item-header wp100">
                  <div className="fl hp100 pr">
                    <img
                      src={require('../../assets/images/test.png')}
                      className="palt"
                    />
                    <div className="wp100 hp100 fs15 tes">刘新建</div>
                  </div>
                  <div className="fr hp100 pr">
                    <span className="part bsb fs12 tes">电子产品</span>
                  </div>
                </div>
                <div className="item-content wp100">
                  <div className="mt5 wp100 tes">
                    中国国防工业企业协会执行副会长兼秘书长
                  </div>
                  <div className="wp100 tes3">
                    石金武，男，汉族，陕西咸阳人。中国共产党党员。国家安全战略与国防经济研究专业委员会主任。
                  </div>
                </div>
              </div>
              <div className="expert-item wp100 p15 bsb bg-fff mt5">
                <div className="item-header wp100">
                  <div className="fl hp100 pr">
                    <img
                      src={require('../../assets/images/test.png')}
                      className="palt"
                    />
                    <div className="wp100 hp100 fs15 tes">刘新建</div>
                  </div>
                  <div className="fr hp100 pr">
                    <span className="part bsb fs12 tes">电子产品</span>
                  </div>
                </div>
                <div className="item-content wp100">
                  <div className="mt5 wp100 tes">
                    中国国防工业企业协会执行副会长兼秘书长
                  </div>
                  <div className="wp100 tes3">
                    石金武，男，汉族，陕西咸阳人。中国共产党党员。国家安全战略与国防经济研究专业委员会主任。
                  </div>
                </div>
              </div>
              <div className="expert-item wp100 p15 bsb bg-fff mt5">
                <div className="item-header wp100">
                  <div className="fl hp100 pr">
                    <img
                      src={require('../../assets/images/test.png')}
                      className="palt"
                    />
                    <div className="wp100 hp100 fs15 tes">刘新建</div>
                  </div>
                  <div className="fr hp100 pr">
                    <span className="part bsb fs12 tes">电子产品</span>
                  </div>
                </div>
                <div className="item-content wp100">
                  <div className="mt5 wp100 tes">
                    中国国防工业企业协会执行副会长兼秘书长
                  </div>
                  <div className="wp100 tes3">
                    石金武，男，汉族，陕西咸阳人。中国共产党党员。国家安全战略与国防经济研究专业委员会主任。
                  </div>
                </div>
              </div>
              <div className="expert-item wp100 p15 bsb bg-fff mt5">
                <div className="item-header wp100">
                  <div className="fl hp100 pr">
                    <img
                      src={require('../../assets/images/test.png')}
                      className="palt"
                    />
                    <div className="wp100 hp100 fs15 tes">刘新建</div>
                  </div>
                  <div className="fr hp100 pr">
                    <span className="part bsb fs12 tes">电子产品</span>
                  </div>
                </div>
                <div className="item-content wp100">
                  <div className="mt5 wp100 tes">
                    中国国防工业企业协会执行副会长兼秘书长
                  </div>
                  <div className="wp100 tes3">
                    石金武，男，汉族，陕西咸阳人。中国共产党党员。国家安全战略与国防经济研究专业委员会主任。
                  </div>
                </div>
              </div>
            </div>
          </Tabs>
        </div>
        <div
          onClick={() => this.setState({ isShowScreen: false })}
          className={`${this.state.isShowScreen ? 'active' : ''} ${
            style.screen
          } wp100 hp100 pa bsb`}
        >
          <div
            onClick={event => event.stopPropagation()}
            className="content wp100 hp100 bg-fff pr bsb pb40"
          >
            <div className="ptb10 wp100 hp100 oay sb bsb">
              {/* Todo 通过state维护一个手风琴id,超过两行的就用手风琴 */}
              <div className="wp100">
                <h6>行业领域</h6>
                <div className="item-cb">
                  <span className="item active">
                    <div>查看全部</div>
                  </span>
                  <span className="item">
                    <div>知识产权</div>
                  </span>
                  <span className="item">
                    <div>鉴定检测</div>
                  </span>
                  <span className="item">
                    <div>整机设备</div>
                  </span>
                  <span className="item">
                    <div>组件部件</div>
                  </span>
                  <span className="item">
                    <div>材料原料</div>
                  </span>
                  <span className="item">
                    <div>电子系统</div>
                  </span>
                  <span className="item">
                    <div>其他行业</div>
                  </span>
                  <span className="item">
                    <div>科学研究</div>
                  </span>
                  <span className="item">
                    <div>信息化</div>
                  </span>
                  <span className="item">
                    <div>电子产品</div>
                  </span>
                </div>
              </div>
            </div>
            <div className="btn palb cb-btn wp100">
              <Button>重置</Button>
              <Button>确定</Button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

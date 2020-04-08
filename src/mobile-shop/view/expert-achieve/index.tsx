import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Tabs } from 'antd-mobile'

import { Header } from '../../component/header'
const style = require('./style')

enum E_OPE_TYPE {
  PAPER = 'paper', // 论文
  PRODUCE = 'produce', // 产品
  PROJECT = 'project', // 项目
  CASE = 'case', // 案例
  ACTIVITY = 'activity' // 活动
}

type TAchieveType = { title: string; value: E_OPE_TYPE }

interface IPropsExpertAchieve extends RouteComponentProps {}

interface IStateExpertAchieve {
  achieves: TAchieveType[]
  typeIdx: number
}

export default class ExpertAchieve extends React.PureComponent<
  IPropsExpertAchieve,
  IStateExpertAchieve
> {
  // 切换成就tab
  private onChangeTab(itm: any, idx: number) {
    this.setState({ typeIdx: idx })
  }

  // 初始化
  private initAchieve() {
    const params: any = this.props.match.params
    const { achieves } = this.state
    let idx = achieves.findIndex(itm => itm.value === params.type)
    idx = idx === -1 ? 0 : idx

    this.setState({ typeIdx: idx })
    // Todo 获取数据
  }

  constructor(props: IPropsExpertAchieve) {
    super(props)

    this.state = {
      typeIdx: 0,
      achieves: [
        { title: '论文作品', value: E_OPE_TYPE.PAPER },
        { title: '咨询产品', value: E_OPE_TYPE.PRODUCE },
        { title: '合作项目', value: E_OPE_TYPE.PROJECT },
        { title: '成功案例', value: E_OPE_TYPE.CASE },
        { title: '社会活动', value: E_OPE_TYPE.ACTIVITY }
        // { title: '通知信息', value: '通知信息' }
      ]
    }

    this.onChangeTab = this.onChangeTab.bind(this)
  }

  componentDidMount() {
    this.initAchieve()
  }

  render() {
    const { typeIdx } = this.state

    return (
      <div className="wp100 hp100 pr bsb pt50 fs0 bg-fff oh">
        <Header
          right={
            <span
              onClick={() => this.props.history.push('/expert-achieve-edit')}
            >
              添加
            </span>
          }
        >
          专家成就
        </Header>
        <div
          className={`${
            style.expertAchieve
          } wp100 hp100 pr pt40 pl10 pr10 pb10 bsb`}
        >
          {/* 左右遮罩 */}
          <em className="model-l-r palt zi400 bg-fff" />
          <em className="model-l-r part zi400 bg-fff" />
          <Tabs
            tabs={this.state.achieves}
            onChange={this.onChangeTab}
            page={typeIdx}
            renderTabBar={props => <Tabs.DefaultTabBar {...props} page={5} />}
          >
            <div className="wp100 hp100 oay sb bsb">
              <div
                onClick={() =>
                  this.props.history.push('/expert-detail/personal')
                }
                className="achieve-item bsb wp100 pt15 pb15 pr"
              >
                <img
                  src={require('../../assets/images/test.png')}
                  className="palt"
                />
                <div className="wp100 hp100">
                  <h6 className="wp100 tes">
                    多级联动的人像比对应用平台研究与设计
                  </h6>
                  <p className="wp100 tes2">
                    【摘要】
                    本文主要研究了多级联动人像比对应用平台研究与设计。涉及人像识别系
                  </p>
                  <span className="achieve-info dib bsb tes">SCI收录</span>
                </div>
              </div>
              <div className="achieve-item bsb wp100 pt15 pb15 pr">
                <img
                  src={require('../../assets/images/test.png')}
                  className="palt"
                />
                <div className="wp100 hp100">
                  <h6 className="wp100 tes">
                    多级联动的人像比对应用平台研究与设计
                  </h6>
                  <p className="wp100 tes2">
                    【摘要】
                    本文主要研究了多级联动人像比对应用平台研究与设计。涉及人像识别系
                  </p>
                  <span className="achieve-info dib bsb tes">SCI收录</span>
                </div>
              </div>
              <div className="achieve-item bsb wp100 pt15 pb15 pr">
                <img
                  src={require('../../assets/images/test.png')}
                  className="palt"
                />
                <div className="wp100 hp100">
                  <h6 className="wp100 tes">
                    多级联动的人像比对应用平台研究与设计
                  </h6>
                  <p className="wp100 tes2">
                    【摘要】
                    本文主要研究了多级联动人像比对应用平台研究与设计。涉及人像识别系
                  </p>
                  <span className="achieve-info dib bsb tes">SCI收录</span>
                </div>
              </div>
              <div className="achieve-item bsb wp100 pt15 pb15 pr">
                <img
                  src={require('../../assets/images/test.png')}
                  className="palt"
                />
                <div className="wp100 hp100">
                  <h6 className="wp100 tes">
                    多级联动的人像比对应用平台研究与设计
                  </h6>
                  <p className="wp100 tes2">
                    【摘要】
                    本文主要研究了多级联动人像比对应用平台研究与设计。涉及人像识别系
                  </p>
                  <span className="achieve-info dib bsb tes">SCI收录</span>
                </div>
              </div>
              <div className="achieve-item bsb wp100 pt15 pb15 pr">
                <img
                  src={require('../../assets/images/test.png')}
                  className="palt"
                />
                <div className="wp100 hp100">
                  <h6 className="wp100 tes">
                    多级联动的人像比对应用平台研究与设计
                  </h6>
                  <p className="wp100 tes2">
                    【摘要】
                    本文主要研究了多级联动人像比对应用平台研究与设计。涉及人像识别系
                  </p>
                  <span className="achieve-info dib bsb tes">SCI收录</span>
                </div>
              </div>
              <div className="achieve-item bsb wp100 pt15 pb15 pr">
                <img
                  src={require('../../assets/images/test.png')}
                  className="palt"
                />
                <div className="wp100 hp100">
                  <h6 className="wp100 tes">
                    多级联动的人像比对应用平台研究与设计
                  </h6>
                  <p className="wp100 tes2">
                    【摘要】
                    本文主要研究了多级联动人像比对应用平台研究与设计。涉及人像识别系
                  </p>
                  <span className="achieve-info dib bsb tes">SCI收录</span>
                </div>
              </div>
            </div>
            <div className="wp100 hp100 oay sb">
              <div
                onClick={() =>
                  this.props.history.push('/expert-detail/personal')
                }
                className="achieve-item bsb wp100 pt15 pb15 pr"
              >
                <img
                  src={require('../../assets/images/test.png')}
                  className="palt"
                />
                <div className="wp100 hp100">
                  <h6 className="wp100 tes">
                    多级联动的人像比对应用平台研究与设计
                  </h6>
                  <p className="wp100 tes3 h60">
                    【摘要】
                    本文主要研究了多级联动人像比对应用平台研究与设计。涉及人像识别系
                    本文主要研究了多级联动人像比对应用平台研究与设计。涉及人像识别系
                    本文主要研究了多级联动人像比对应用平台研究与设计。涉及人像识别系
                  </p>
                </div>
              </div>
              <div className="achieve-item bsb wp100 pt15 pb15 pr">
                <img
                  src={require('../../assets/images/test.png')}
                  className="palt"
                />
                <div className="wp100 hp100">
                  <h6 className="wp100 tes">
                    多级联动的人像比对应用平台研究与设计
                  </h6>
                  <p className="wp100 tes3 h60">
                    【摘要】
                    本文主要研究了多级联动人像比对应用平台研究与设计。涉及人像识别系
                  </p>
                </div>
              </div>
            </div>
            <div className="wp100 hp100 oay sb">
              <div
                onClick={() =>
                  this.props.history.push('/expert-detail/personal')
                }
                className="achieve-item bsb wp100 pt15 pb15 pr"
              >
                <img
                  src={require('../../assets/images/test.png')}
                  className="palt"
                />
                <div className="wp100 hp100">
                  <h6 className="wp100 tes">
                    多级联动的人像比对应用平台研究与设计
                  </h6>
                  <p className="wp100 tes3 h60">
                    【摘要】
                    本文主要研究了多级联动人像比对应用平台研究与设计。涉及人像识别系
                  </p>
                </div>
              </div>
              <div className="achieve-item bsb wp100 pt15 pb15 pr">
                <img
                  src={require('../../assets/images/test.png')}
                  className="palt"
                />
                <div className="wp100 hp100">
                  <h6 className="wp100 tes">
                    多级联动的人像比对应用平台研究与设计
                  </h6>
                  <p className="wp100 tes3 h60">
                    【摘要】
                    本文主要研究了多级联动人像比对应用平台研究与设计。涉及人像识别系
                  </p>
                </div>
              </div>
            </div>
            <div className="wp100 hp100 oay sb">
              <div
                onClick={() =>
                  this.props.history.push('/expert-detail/personal')
                }
                className="achieve-item bsb wp100 pt15 pb15 pr"
              >
                <img
                  src={require('../../assets/images/test.png')}
                  className="palt"
                />
                <div className="wp100 hp100">
                  <h6 className="wp100 tes">
                    多级联动的人像比对应用平台研究与设计
                  </h6>
                  <p className="wp100 tes3 h60">
                    【摘要】
                    本文主要研究了多级联动人像比对应用平台研究与设计。涉及人像识别系
                  </p>
                </div>
              </div>
              <div className="achieve-item bsb wp100 pt15 pb15 pr">
                <img
                  src={require('../../assets/images/test.png')}
                  className="palt"
                />
                <div className="wp100 hp100">
                  <h6 className="wp100 tes">
                    多级联动的人像比对应用平台研究与设计
                  </h6>
                  <p className="wp100 tes3 h60">
                    【摘要】
                    本文主要研究了多级联动人像比对应用平台研究与设计。涉及人像识别系
                  </p>
                </div>
              </div>
            </div>
            <div className="wp100 hp100 oay sb">
              <div
                onClick={() =>
                  this.props.history.push('/expert-detail/personal')
                }
                className="achieve-item bsb wp100 pt15 pb15 pr"
              >
                <img
                  src={require('../../assets/images/test.png')}
                  className="palt"
                />
                <div className="wp100 hp100">
                  <h6 className="wp100 tes">
                    多级联动的人像比对应用平台研究与设计
                  </h6>
                  <p className="wp100 tes3 h60">
                    【摘要】
                    本文主要研究了多级联动人像比对应用平台研究与设计。涉及人像识别系
                  </p>
                </div>
              </div>
              <div className="achieve-item bsb wp100 pt15 pb15 pr">
                <img
                  src={require('../../assets/images/test.png')}
                  className="palt"
                />
                <div className="wp100 hp100">
                  <h6 className="wp100 tes">
                    多级联动的人像比对应用平台研究与设计
                  </h6>
                  <p className="wp100 tes3 h60">
                    【摘要】
                    本文主要研究了多级联动人像比对应用平台研究与设计。涉及人像识别系
                  </p>
                </div>
              </div>
            </div>
            {/* <div className="wp100 hp100 oay sb">
              <div className="info-item bsb wp100 pt15 pb15 pr">
                <div className="palt tes">2019-05-29 17:50:56</div>
                <div className="wp100 hp100 tes">
                  下个月我有新的项目合作，大家可以联系我。
                </div>
              </div>
              <div className="info-item bsb wp100 pt15 pb15 pr">
                <div className="palt tes">2019-05-29 17:50:56</div>
                <div className="wp100 hp100 tes">
                  下个月我有新的项目合作，大家可以联系我。
                </div>
              </div>
            </div> */}
          </Tabs>
        </div>
      </div>
    )
  }
}

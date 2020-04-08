import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Tabs } from 'antd-mobile'

import { Header } from '../../component/header'
const style = require('./style')

interface IPropsExpert extends RouteComponentProps {}

interface IStateExpert {
  isReadAllBtn: boolean // 是否需要查看全部按钮
  openAllIntro: boolean // 展开介绍全部信息
  achieves: { title: string; value: string }[]
}

export default class Expert extends React.PureComponent<
  IPropsExpert,
  IStateExpert
> {
  private _introElem: HTMLDivElement = null
  private _moreIcon: string = require('../../assets/images/expert-intro-more.png')

  // 检查专家介绍是否需要查看全部
  private isReadAllOfIntro() {
    const elem = this._introElem
    if (!elem) {
      return
    }

    const ofstHt = elem.offsetHeight
    const sclHt = elem.scrollHeight
    this.setState({ isReadAllBtn: ofstHt && sclHt && sclHt > ofstHt })
  }

  // 切换成就tab
  private onChangeTab() {}

  constructor(props: IPropsExpert) {
    super(props)

    this.state = {
      openAllIntro: false,
      isReadAllBtn: false,
      achieves: [
        { title: '论文作品', value: '论文作品' },
        { title: '咨询产品', value: '咨询产品' },
        { title: '合作项目', value: '合作项目' },
        { title: '成功案例', value: '成功案例' },
        { title: '社会活动', value: '社会活动' },
        { title: '通知信息', value: '通知信息' }
      ]
    }

    this.isReadAllOfIntro = this.isReadAllOfIntro.bind(this)
    this.onChangeTab = this.onChangeTab.bind(this)
  }

  render() {
    const { isReadAllBtn, openAllIntro } = this.state

    return (
      <div className={`${style.expert} wp100 hp100 pr bsb fs0 bg-f0f0f0 oh`}>
        <div className="wp100 hp100 oay sb">
          <div className={`${style.expertBanner} wp100 pr zi100`}>
            <Header>专家主页</Header>
            <img src={require('../../assets/images/expert-bg.png')} />
          </div>
          {/* 专家介绍 */}
          <div className={`${style.expertDesc} pr zi200 wp100 bsb bg-fff`}>
            {/* 头像 */}
            <div className={`${style.expertHead} wp100 bsb`}>
              <div
                className="head oh pr"
                style={{
                  backgroundImage: `url(${require('../../assets/images/expert-head-def.png')})`
                }}
              >
                <img
                  src={require('../../assets/images/test.png')}
                  className="mc zi100"
                />
                <span
                  className="parb cp zi200"
                  style={{
                    backgroundImage: `url(${require('../../assets/images/expert-zx-icon.png')})`
                  }}
                />
              </div>
              <h6 className="wp100 bsb tes mt45 tac">刘新建</h6>
              <p className="wp100 bsb tes tac">
                中国国防工业企业协会执行副会长兼秘书长
              </p>
            </div>
            {/* 专家通知，Todo有才显示最后一条 */}
            <div className={`${style.expertInfo} wp100 bsb mt15`}>
              <h6>专家通知:</h6>
              <p className="wp100 tes">
                2019-5-29<span>|</span>下个月我有新的项目合作，大家可以联系我。
              </p>
            </div>
            {/* 专家简介 */}
            <div className={`${style.expertIntro} wp100 bsb mt15`}>
              <h6 className="mb5">专家介绍</h6>
              <div
                ref={el => (this._introElem = el)}
                onLoad={this.isReadAllOfIntro}
                className={`${
                  openAllIntro ? 'active' : ''
                } expert-intro-content wp100 bsb pr oh`}
              >
                {isReadAllBtn && (
                  <div className="expert-intro-more palb bsb wp100 tac">
                    <div
                      onClick={() =>
                        this.setState({ openAllIntro: !openAllIntro })
                      }
                      className="palt hp100 bsb"
                    >
                      <span
                        style={{
                          backgroundImage: `url(${this._moreIcon})`
                        }}
                      />
                      {openAllIntro ? '收起' : '查看全部'}
                    </div>
                  </div>
                )}
                1879年3月14日上午11时30分，爱因斯坦出生在德国乌尔姆市（Ulm，Kingdom
                of Württemberg，German Empire）
                班霍夫街135号。父母都是犹太人。1888年（9岁），阿尔伯特·爱因斯坦入路易波尔德高级中学学习。在学校受宗教教育，
                接受受戒仪式，弗里德曼是指导老师。1889年（10岁），在医科大学生塔尔梅引导下，读通俗科学读物和哲学著作。
                1891年（12岁），爱因斯坦自学欧几里德几何，对数学感到狂热的喜爱，同时开始自学高等数学。1892年（13岁），爱因斯坦开始读康德的著作。
                <img
                  src={require('../../assets/images/test.png')}
                  className="wp100"
                />
                1879年3月14日上午11时30分，爱因斯坦出生在德国乌尔姆市（Ulm，Kingdom
                of Württemberg，German Empire）
                班霍夫街135号。父母都是犹太人。1888年（9岁），阿尔伯特·爱因斯坦入路易波尔德高级中学学习。在学校受宗教教育，
                接受受戒仪式，弗里德曼是指导老师。1889年（10岁），在医科大学生塔尔梅引导下，读通俗科学读物和哲学著作。
                1891年（12岁），爱因斯坦自学欧几里德几何，对数学感到狂热的喜爱，同时开始自学高等数学。1892年（13岁），爱因斯坦开始读康德的著作。
              </div>
            </div>
          </div>
          {/* 专家成就 */}
          <div
            className={`${
              style.expertAchieve
            } pr wp100 bsb bg-fff mt5 pt40 pl10 pr10`}
          >
            {/* 左右遮罩 */}
            <em className="model-l-r palt zi400 bg-fff" />
            <em className="model-l-r part zi400 bg-fff" />
            <Tabs
              tabs={this.state.achieves}
              onChange={this.onChangeTab}
              renderTabBar={props => <Tabs.DefaultTabBar {...props} page={6} />}
            >
              <div className="achieve-content wp100 bsb">
                <div
                  className="achieve-item bsb wp100 pt15 pb15 pr"
                  onClick={() => this.props.history.push('expert-detail')}
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
              </div>
              <div className="achieve-content">
                <div
                  className="achieve-item bsb wp100 pt15 pb15 pr"
                  onClick={() => this.props.history.push('expert-detail')}
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
              <div className="achieve-content">
                <div
                  className="achieve-item bsb wp100 pt15 pb15 pr"
                  onClick={() => this.props.history.push('expert-detail')}
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
              <div className="achieve-content">
                <div
                  className="achieve-item bsb wp100 pt15 pb15 pr"
                  onClick={() => this.props.history.push('expert-detail')}
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
              <div className="achieve-content">
                <div
                  className="achieve-item bsb wp100 pt15 pb15 pr"
                  onClick={() => this.props.history.push('expert-detail')}
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
              <div className="achieve-content">
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
              </div>
            </Tabs>
          </div>
        </div>
      </div>
    )
  }
}

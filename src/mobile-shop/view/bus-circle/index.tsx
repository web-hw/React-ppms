import * as React from 'react'
import {} from 'react-router-dom'
import { Icon, Tabs } from 'antd-mobile'

import { Header } from '../../component/header'
import { BusFooter } from '../../component/bus-footer'
const style = require('./style')

enum E_CIRCLE_TYPE {
  PLATFORM_ALLIANCE = 'platformAlliance', // 平台联盟
  UNIT_WORK = 'unitWork', // 单位工作
  AUTO_PROJECT = 'autoProject', // 自发项目
  RELATIVE_FRIEND = 'relativeFriend', // 生活亲友
  PUBLIC_AMUSEMENT = 'publicAmusement' // 公共娱乐
}

type TCircleType = { title: string; value: E_CIRCLE_TYPE | 'all' }

const circleTypes: TCircleType[] = [
  { title: '全部', value: 'all' },
  { title: '平台联盟圈', value: E_CIRCLE_TYPE.PLATFORM_ALLIANCE },
  { title: '单位工作圈', value: E_CIRCLE_TYPE.UNIT_WORK },
  { title: '自发项目圈', value: E_CIRCLE_TYPE.AUTO_PROJECT },
  { title: '生活亲友圈', value: E_CIRCLE_TYPE.RELATIVE_FRIEND },
  { title: '公共娱乐圈', value: E_CIRCLE_TYPE.PUBLIC_AMUSEMENT }
]

interface IPropsBusCircle {}

interface IStateBusCircle {}

export default class BusCircle extends React.PureComponent<
  IPropsBusCircle,
  IStateBusCircle
> {
  private onChangeTab(item: TCircleType) {
    console.log(item)
  }

  constructor(props: IPropsBusCircle) {
    super(props)

    this.onChangeTab = this.onChangeTab.bind(this)
  }

  render() {
    return (
      <div className="wp100 hp100 pr bsb pt50 pb50 fs0 bg-f0f0f0 oh">
        <Header
          right={
            <Icon className="vat" type="search" color="#1a1a1a" size="sm" />
          }
        >
          人脉商圈
        </Header>
        <div className={`${style.circle} wp100 hp100 bsb pr`}>
          {/* 左右遮罩 */}
          <em className="model-l-r palt zi400 bg-fff" />
          <em className="model-l-r part zi400 bg-fff" />
          {/* 筛选条件 */}
          <div className={`${style.condition} wp100 bsb palt`}>
            <span className="active">综合排序</span>
            <span>成员最多</span>
            <span>话题最多</span>
          </div>
          {/* 滚回顶部 */}
          <div className={`${style.goTop} parb zi200 bg-fff`}>
            <img
              src={require('../../assets/images/go-top-icon.png')}
              className="mc"
            />
            {/* <div className="mc">
              <span>1000</span>
              <span>5000</span>
            </div> */}
          </div>
          <Tabs
            tabs={circleTypes}
            onChange={this.onChangeTab}
            renderTabBar={props => <Tabs.DefaultTabBar {...props} page={4} />}
          >
            <div className="wp100 hp100 oay sb bg-fff">
              <div className={`${style.item} wp100 bsb pr`}>
                <div className="img palt">
                  <img
                    src={require('../../assets/images/test.png')}
                    className="mc"
                  />
                </div>
                <div className="content wp100 bsb ptb5">
                  <div className="wp100 tes">生活习俗</div>
                  <div className="wp100 tes">
                    <span className="mr5">圈主:</span>四川赛狄信息技术股份公司
                  </div>
                  <div className="wp100 tes">
                    <span className="mr5">简介:</span>奇葩习俗合集
                  </div>
                </div>
                <div className="total part">
                  <span
                    style={{
                      backgroundImage: `url(${require('../../assets/images/circle-cy-icon.png')})`
                    }}
                  >
                    50
                  </span>
                  <span
                    style={{
                      backgroundImage: `url(${require('../../assets/images/circle-ht-icon.png')})`
                    }}
                  >
                    50000
                  </span>
                </div>
              </div>
              <div className={`${style.item} wp100 bsb pr`}>
                <div className="img palt">
                  <img
                    src={require('../../assets/images/test.png')}
                    className="mc"
                  />
                </div>
                <div className="content wp100 bsb ptb5">
                  <div className="wp100 tes">生活习俗</div>
                  <div className="wp100 tes">
                    <span className="mr5">圈主:</span>四川赛狄信息技术股份公司
                  </div>
                  <div className="wp100 tes">
                    <span className="mr5">简介:</span>奇葩习俗合集
                  </div>
                </div>
                <div className="total part">
                  <span
                    style={{
                      backgroundImage: `url(${require('../../assets/images/circle-cy-icon.png')})`
                    }}
                  >
                    50
                  </span>
                  <span
                    style={{
                      backgroundImage: `url(${require('../../assets/images/circle-ht-icon.png')})`
                    }}
                  >
                    50000
                  </span>
                </div>
              </div>
              <div className={`${style.item} wp100 bsb pr`}>
                <div className="img palt">
                  <img
                    src={require('../../assets/images/test.png')}
                    className="mc"
                  />
                </div>
                <div className="content wp100 bsb ptb5">
                  <div className="wp100 tes">生活习俗</div>
                  <div className="wp100 tes">
                    <span className="mr5">圈主:</span>四川赛狄信息技术股份公司
                  </div>
                  <div className="wp100 tes">
                    <span className="mr5">简介:</span>奇葩习俗合集
                  </div>
                </div>
                <div className="total part">
                  <span
                    style={{
                      backgroundImage: `url(${require('../../assets/images/circle-cy-icon.png')})`
                    }}
                  >
                    50
                  </span>
                  <span
                    style={{
                      backgroundImage: `url(${require('../../assets/images/circle-ht-icon.png')})`
                    }}
                  >
                    50000
                  </span>
                </div>
              </div>
              <div className={`${style.item} wp100 bsb pr`}>
                <div className="img palt">
                  <img
                    src={require('../../assets/images/test.png')}
                    className="mc"
                  />
                </div>
                <div className="content wp100 bsb ptb5">
                  <div className="wp100 tes">生活习俗</div>
                  <div className="wp100 tes">
                    <span className="mr5">圈主:</span>四川赛狄信息技术股份公司
                  </div>
                  <div className="wp100 tes">
                    <span className="mr5">简介:</span>奇葩习俗合集
                  </div>
                </div>
                <div className="total part">
                  <span
                    style={{
                      backgroundImage: `url(${require('../../assets/images/circle-cy-icon.png')})`
                    }}
                  >
                    50
                  </span>
                  <span
                    style={{
                      backgroundImage: `url(${require('../../assets/images/circle-ht-icon.png')})`
                    }}
                  >
                    50000
                  </span>
                </div>
              </div>
              <div className={`${style.item} wp100 bsb pr`}>
                <div className="img palt">
                  <img
                    src={require('../../assets/images/test.png')}
                    className="mc"
                  />
                </div>
                <div className="content wp100 bsb ptb5">
                  <div className="wp100 tes">
                    生活习俗生活习俗生活习俗生活习俗生活习俗生活习俗
                  </div>
                  <div className="wp100 tes">
                    <span className="mr5">圈主:</span>
                    四川赛狄信息技术股份公司四川赛狄信息技术股份公司
                  </div>
                  <div className="wp100 tes">
                    <span className="mr5">简介:</span>
                    奇葩习俗合集奇葩习俗合集奇葩习俗合集奇葩习俗合集
                  </div>
                </div>
                <div className="total part">
                  <span
                    style={{
                      backgroundImage: `url(${require('../../assets/images/circle-cy-icon.png')})`
                    }}
                  >
                    50
                  </span>
                  <span
                    style={{
                      backgroundImage: `url(${require('../../assets/images/circle-ht-icon.png')})`
                    }}
                  >
                    50000
                  </span>
                </div>
              </div>
              <div className={`${style.item} wp100 bsb pr`}>
                <div className="img palt">
                  <img
                    src={require('../../assets/images/test.png')}
                    className="mc"
                  />
                </div>
                <div className="content wp100 bsb ptb5">
                  <div className="wp100 tes">生活习俗</div>
                  <div className="wp100 tes">
                    <span className="mr5">圈主:</span>四川赛狄信息技术股份公司
                  </div>
                  <div className="wp100 tes">
                    <span className="mr5">简介:</span>奇葩习俗合集
                  </div>
                </div>
                <div className="total part">
                  <span
                    style={{
                      backgroundImage: `url(${require('../../assets/images/circle-cy-icon.png')})`
                    }}
                  >
                    50
                  </span>
                  <span
                    style={{
                      backgroundImage: `url(${require('../../assets/images/circle-ht-icon.png')})`
                    }}
                  >
                    50000
                  </span>
                </div>
              </div>
              <div className={`${style.item} wp100 bsb pr`}>
                <div className="img palt">
                  <img
                    src={require('../../assets/images/test.png')}
                    className="mc"
                  />
                </div>
                <div className="content wp100 bsb ptb5">
                  <div className="wp100 tes">生活习俗</div>
                  <div className="wp100 tes">
                    <span className="mr5">圈主:</span>四川赛狄信息技术股份公司
                  </div>
                  <div className="wp100 tes">
                    <span className="mr5">简介:</span>奇葩习俗合集
                  </div>
                </div>
                <div className="total part">
                  <span
                    style={{
                      backgroundImage: `url(${require('../../assets/images/circle-cy-icon.png')})`
                    }}
                  >
                    50
                  </span>
                  <span
                    style={{
                      backgroundImage: `url(${require('../../assets/images/circle-ht-icon.png')})`
                    }}
                  >
                    50000
                  </span>
                </div>
              </div>
            </div>
          </Tabs>
        </div>
        <BusFooter />
      </div>
    )
  }
}

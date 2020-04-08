import * as React from 'react'
import {} from 'react-router-dom'
import { Icon, Button, Flex, Modal, Stepper } from 'antd-mobile'

import { Header } from '../../component/header'
const style = require('./style')

enum E_SCREEN_TYPE {
  MULTIPLE = 'multiple', // 综合
  PRICE = 'price', // 价格
  SALES = 'Sales', // 销量
  SCREEN = 'screen' // 筛选
}

enum E_SORT_TYPE {
  UP = 'up',
  DOWN = 'down'
}

type TScreenType = { label: string; value: E_SCREEN_TYPE }

const screenTypes: TScreenType[] = [
  { label: '综合', value: E_SCREEN_TYPE.MULTIPLE },
  { label: '价格', value: E_SCREEN_TYPE.PRICE },
  { label: '销量', value: E_SCREEN_TYPE.SALES },
  { label: '筛选', value: E_SCREEN_TYPE.SCREEN }
]

interface IPropsProductList {}

interface IStateProductList {
  screenType: E_SCREEN_TYPE
  sort: E_SORT_TYPE
  isShowGwModal: boolean
  isShowScreen: boolean
}

export default class ProductList extends React.PureComponent<
  IPropsProductList,
  IStateProductList
> {
  private onSwitchScreenType(event: any, { value }: TScreenType) {
    const { screenType } = this.state
    let sort = this.state.sort

    // 筛选
    if (value === E_SCREEN_TYPE.SCREEN) {
      return this.setState({ isShowScreen: true })
    }

    if (value === screenType) {
      if (value === E_SCREEN_TYPE.MULTIPLE) {
        return
      }
    } else {
      if (value !== E_SCREEN_TYPE.MULTIPLE) {
        sort = E_SORT_TYPE.DOWN
      }
    }

    // 重置状态
    this.setState({
      screenType: value,
      sort: sort === E_SORT_TYPE.UP ? E_SORT_TYPE.DOWN : E_SORT_TYPE.UP
    })

    // Todo 请求接口
    setTimeout(() => console.log('结束', this.state))
  }

  private onCloseScreen() {
    this.setState({ isShowScreen: false })
  }

  constructor(props: IPropsProductList) {
    super(props)

    this.state = {
      screenType: E_SCREEN_TYPE.MULTIPLE,
      sort: E_SORT_TYPE.DOWN,
      isShowGwModal: false,
      isShowScreen: false
    }

    this.onCloseScreen = this.onCloseScreen.bind(this)
  }

  render() {
    return (
      <div className="wp100 hp100 fs0 pt50 pb45 bsb pr oh">
        <Header
          left={
            <span>
              <Icon type="left" className="cb-left-lg vat" size="lg" />
              电容
            </span>
          }
          right={
            <Icon className="vat" type="search" color="#1a1a1a" size="sm" />
          }
        />
        <div className={`${style.content} wp100 hp100 pr bsb`}>
          <div className={`${style.aside} hp100 bsb pb15 palt oay sb`}>
            <span className="fs12 db active">优选产品</span>
            <span className="fs12 db">贴片电解电容</span>
          </div>
          <div className="wp100 hp100 pr bsb pt50 bg-fff">
            <div className={`${style.header} palt wp100 bsb bb1`}>
              <Flex>
                {screenTypes.map(type => (
                  <Flex.Item
                    key={type.value}
                    onClick={(event: any) =>
                      this.onSwitchScreenType(event, type)
                    }
                    className={
                      this.state.screenType === type.value
                        ? `active act-${this.state.sort}`
                        : ''
                    }
                  >
                    {type.label}
                    {type.value === E_SCREEN_TYPE.SCREEN ? (
                      <em
                        style={{
                          backgroundImage: `url(${require('../../assets/images/sx-icon.png')})`
                        }}
                      />
                    ) : type.value !== E_SCREEN_TYPE.MULTIPLE ? (
                      <b />
                    ) : null}
                  </Flex.Item>
                ))}
              </Flex>
            </div>
            <div className="wp100 hp100 oay sb">
              <div className={`${style.item} wp100 bsb pr`}>
                <span
                  className="bsb img palt"
                  style={{
                    backgroundImage: `url(${require('../../assets/images/test.png')})`
                  }}
                />
                <div className="title wp100 tes fs12">
                  多通道模拟图像采集存储系统
                </div>
                <div className="desc wp100 tes fs12 pr pr50 bsb">
                  <span className="mr5">型号:</span>C515WF4
                  <a className="part fs8 bsb tac" href="javascript:void(0);">
                    检验报告
                  </a>
                </div>
                <div className="desc wp100 tes fs10 pr pr50 bsb price">
                  ￥<span className="fs14">370.44</span>
                  <span
                    onClick={() => this.setState({ isShowGwModal: true })}
                    className="gwc part"
                    style={{
                      backgroundImage: `url(${require('../../assets/images/gwc-icon.png')})`
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={`${style.footer} wp100 palb bg-fff bsb`}>
          <em
            data-value={'99'}
            className="palt"
            style={{
              backgroundImage: `url(${require('../../assets/images/pro-list-total.png')})`
            }}
          />
          <Button className="cb-btn fr">去结算</Button>
        </div>
        <Modal
          visible={this.state.isShowGwModal}
          onClose={() => this.setState({ isShowGwModal: false })}
          popup={true}
          maskClosable={true}
          className={style.gwModal}
          animationType="slide-up"
        >
          <div className="content wp100 pt5 pl15 pr15 bsb tal pr pb50">
            <h6 className="fs14 fw700 wp100 tes">多通道模拟图像采集存储系统</h6>
            <div className="msg wp100 pb10 bb1">
              <p className="fs12 tes">
                <span className="mr5">厂商:</span>Qhmtie
              </p>
              <p className="fs12 tes">
                <span className="mr5">型号:</span>Qhmtie
              </p>
              <p className="fs12 tes">
                <span className="mr5">编号:</span>Qhmtie
              </p>
              <p className="fs12 tes">
                <span className="mr5">规格:</span>Qhmtie
              </p>
              <p className="fs12 tes">
                <span className="mr5">库存:</span>5000个
              </p>
            </div>
            <div className="price wp100 pr bsb">
              <span className="pa fs12">销售单价</span>
              <p className="fs12">
                1~9个:<span>￥15.05</span>
              </p>
              <p className="fs12">
                10~29个:<span>￥15.05</span>
              </p>
              <p className="fs12">
                30~99个:<span>￥15.05</span>
              </p>
              <p className="fs12">
                100~499个:<span>￥15.05</span>
              </p>
              <p className="fs12">
                500个以上:<span>￥15.05</span>
              </p>
            </div>
            <div className="num mt30 mb30 wp100">
              <span className="fl fs15">购买数量</span>
              <Stepper
                className="cb-stepper fr"
                value={2}
                showNumber={true}
                max={99}
                min={1}
                // onChange={(val: any) => this.onChangeNum(val, good.id, itm.id)}
              />
            </div>
            <div className="btn wp100 bsb palb">
              <span className="fl fs12 tac">
                金额:
                <span className="ml5">
                  ￥<span className="fs15">602.53</span>
                </span>
              </span>
              <Button className="cb-btn fr">确定</Button>
            </div>
          </div>
        </Modal>
        <div
          onClick={this.onCloseScreen}
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
                <h6>爱米盛服务</h6>
                <div className="item-cb">
                  <span className="item active">
                    <div>货到付款</div>
                  </span>
                  <span className="item">
                    <div>特价促销</div>
                  </span>
                  <span className="item">
                    <div>仅看有货</div>
                  </span>
                  <span className="item">
                    <div>有检测报告</div>
                  </span>
                  <span className="item">
                    <div>会员专享</div>
                  </span>
                </div>
              </div>
              <div className="wp100">
                <h6>包装方式</h6>
                <div className="item-cb">
                  <span className="item active">
                    <div>拆包</div>
                  </span>
                  <span className="item">
                    <div>整包</div>
                  </span>
                </div>
              </div>
              <div className="wp100">
                <h6>货源</h6>
                <div className="item-cb">
                  <span className="item active">
                    <div>现货</div>
                  </span>
                  <span className="item">
                    <div>调货</div>
                  </span>
                </div>
              </div>
              <div className="wp100">
                <h6 className="active">
                  <span className="fl">标称容量(A)</span>
                  <span className="fr">
                    0.047,0.0220.047,0.0220.047,0.0220.047,0.0220.047,0.022
                    <Icon type="down" size="md" />
                  </span>
                </h6>
                <div className="item-cb">
                  <span className="item active">
                    <div>0.047</div>
                  </span>
                  <span className="item active">
                    <div>0.022</div>
                  </span>
                  <span className="item">
                    <div>0.1</div>
                  </span>
                  <span className="item">
                    <div>0.01</div>
                  </span>
                  <span className="item">
                    <div>1</div>
                  </span>
                  <span className="item">
                    <div>2</div>
                  </span>
                  <span className="item">
                    <div>0.01</div>
                  </span>
                  <span className="item">
                    <div>1</div>
                  </span>
                  <span className="item">
                    <div>2</div>
                  </span>
                </div>
              </div>
              <div className="wp100">
                <h6>
                  <span className="fl">品牌/产地</span>
                  <span className="fr">
                    <Icon type="down" size="md" />
                  </span>
                </h6>
                <div className="item-cb">
                  <span className="item active">
                    <div>AVX</div>
                  </span>
                  <span className="item">
                    <div>ADRFONADRFONADRFON</div>
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

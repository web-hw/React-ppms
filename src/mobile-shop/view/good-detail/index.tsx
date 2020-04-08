import * as React from 'react'
import {} from 'react-router-dom'
import { Carousel, Icon, Flex, Modal, Button, Stepper } from 'antd-mobile'

import { Header } from '../../component/header'
import { EllipsisPopover } from '../../component/popover'
const style = require('./style')

enum E_DETAIL_TYPE {
  GOOD_DETAIL = 'goodDetail',
  TECH_TARGET = 'techTarget',
  PRO_MANUAL = 'proManual'
}

type TDetailType = { label: string; value: E_DETAIL_TYPE }
const detailTypes: TDetailType[] = [
  { label: '商品详情', value: E_DETAIL_TYPE.GOOD_DETAIL },
  { label: '技术指标', value: E_DETAIL_TYPE.TECH_TARGET },
  { label: '产品手册', value: E_DETAIL_TYPE.PRO_MANUAL }
]

interface IPropsGoodDetail {}

interface IStateGoodDetail {
  detailType: E_DETAIL_TYPE
  isShowGwModal: boolean
  isShowStandardModal: boolean
}

export default class GoodDetail extends React.PureComponent<
  IPropsGoodDetail,
  IStateGoodDetail
> {
  private onSwitchDetailType(type: TDetailType) {
    const detailType = type.value
    if (this.state.detailType === detailType) {
      return
    }

    this.setState({ detailType })
  }

  constructor(props: IPropsGoodDetail) {
    super(props)

    this.state = {
      detailType: E_DETAIL_TYPE.GOOD_DETAIL,
      isShowGwModal: false,
      isShowStandardModal: false
    }
  }

  render() {
    const { detailType } = this.state

    return (
      <div className={`${style.goodDetail} wp100 hp100 fs0 ptb50 bsb pr oh`}>
        <Header
          right={
            <EllipsisPopover
              onSelect={() => {}}
              items={[
                { title: '产品' },
                { title: '发现' },
                { title: '购物车' },
                { title: '我的' }
              ]}
            />
          }
        >
          商品详情
        </Header>
        <div className="wp100 hp100 oay sb">
          <div className="wp100 bsb plr10 bg-fff">
            <Carousel
              autoplay={false}
              infinite={true}
              className={style.carousel}
            >
              <a className={style.carouselItem} href="javascript:void(0)">
                <img src={require('../../assets/images/test.png')} />
              </a>
              <a className={style.carouselItem} href="javascript:void(0)">
                <img src={require('../../assets/images/test.png')} />
              </a>
            </Carousel>
            <div className={`${style.goodMainMsg} wp100 bsb`}>
              <h6 className="fs14 fw700">
                智能排插用铝电解电容器16V插件电解电容智能排插用铝电解电容器16V插件电解电容
              </h6>
              <div>
                <span className="price">
                  <em>￥</em>0.04~<em>￥</em>0.12
                </span>
                <span className="ml10">100件起订</span>
              </div>
              <p className="fs12 wp100 tes">认证会员专享超低折扣！</p>
            </div>
          </div>
          <div className="wp100 mt5 bg-fff">
            <div className={style.labelItem}>
              产品型号:<span>MHSCSUDHJUMHSCSUDHJUMHSCSUDHJU</span>
            </div>
            <div className={style.labelItem}>
              产品编号:<span>35464655464654</span>
            </div>
            <div className={style.labelItem}>
              品牌/厂商:<span>京瓷</span>
            </div>
            <div className={style.labelItem}>
              执行标注:<span>GJB2010-102</span>
            </div>
            <div className={style.labelItem}>
              定制:<span>不支持</span>
            </div>
            <div className={style.labelItem}>
              交期:<span>10天</span>
            </div>
            <div className={style.labelItem}>
              包装:<span>拆包</span>
            </div>
            <div className={style.labelItem}>
              货源:<span>现货</span>
            </div>
          </div>
          <div
            className={`${style.standard} wp100 bg-fff bsb pr`}
            onClick={() => this.setState({ isShowStandardModal: true })}
          >
            <div className="palt">
              <em
                style={{
                  backgroundImage: `url(${require('../../assets/images/good-standard-icon.png')})`
                }}
              />
              <span>规格属性</span>
            </div>
            <div className="content wp100 hp100 tes fs12">
              标称容量(A): 0.01 允许偏差：K(±10%) 标称容量(A): 0.01
              允许偏差：K(±10%) 标称容量(A): 0.01 允许偏差：K(±10%)
            </div>
            <Icon className="part cb-right" type="right" size="md" />
          </div>
          <div className={`${style.msgItem} mt5 wp100 bg-fff pr bsb`}>
            <em
              className="palt"
              style={{
                backgroundImage: `url(${require('../../assets/images/good-report-icon.png')})`
              }}
            />
            <div className="wp100 hp100 tes fs14 fs-fc5643">
              此商品已获得质量检测报告
            </div>
            <Icon className="part cb-right" type="right" size="md" />
          </div>
          <div
            className={`${style.msgItem} comment mt5 fs12 wp100 bg-fff pr bsb`}
          >
            <span className="fl">评价(45条)</span>
            <span className="fr">
              查看全部
              <Icon type="right" size="md" />
            </span>
          </div>
          <div className={`${style.goodDetailMsg} wp100 bg-fff mt5 mb5`}>
            <Flex className="msg-title">
              {detailTypes.map(type => (
                <Flex.Item
                  key={type.value}
                  onClick={() => this.onSwitchDetailType(type)}
                >
                  <span className={type.value === detailType ? 'active' : ''}>
                    {type.label}
                  </span>
                </Flex.Item>
              ))}
            </Flex>
            <div className="msg-content">
              {detailType === E_DETAIL_TYPE.GOOD_DETAIL
                ? '商品详情'
                : detailType === E_DETAIL_TYPE.TECH_TARGET
                ? '技术指标'
                : detailType === E_DETAIL_TYPE.PRO_MANUAL
                ? '产品手册'
                : ''}
            </div>
          </div>
        </div>
        <Flex className={`${style.footer} palb wp100 bg-fff`}>
          <Flex.Item>
            <div className="item">
              <em
                style={{
                  backgroundImage: `url(${require('../../assets/images/good-detail-kf.png')})`
                }}
              />
              <span>客服</span>
            </div>
            <div className="item">
              <em
                style={{
                  backgroundImage: `url(${require('../../assets/images/good-detail-sc.png')})`
                }}
              />
              <span>收藏</span>
            </div>
          </Flex.Item>
          <Flex.Item className="dgd fs14 fs-fff">加入订购单</Flex.Item>
          <Flex.Item
            className="gm fs14 fs-fff"
            onClick={() => this.setState({ isShowGwModal: true })}
          >
            立即购买
          </Flex.Item>
        </Flex>
        {/* Todo 抽离 */}
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
        <Modal
          visible={this.state.isShowStandardModal}
          onClose={() => this.setState({ isShowStandardModal: false })}
          popup={true}
          maskClosable={true}
          className={style.standardModal}
          animationType="slide-up"
        >
          <div className="content wp100 bsb pr">
            <div className="title palt wp100 fs14 bsb fw700">规格属性</div>
            <div className="body wp100 hp100 oay sb bsb pt5 pb15 pl15 pr15">
              <div className="item">
                <span>标称容量(A):</span>0.01
              </div>
              <div className="item">
                <span>允许偏差:</span>K(±10%)
              </div>
              <div className="item">
                <span>端头类型:</span>锡铅
              </div>
              <div className="item">
                <span>温度范围:</span>-55℃～125℃
              </div>
              <div className="item">
                <span>长x宽:</span>1.60±0.20×0.80±0.20mm
              </div>
              <div className="item">
                <span>厚度(Max):</span>1.00mm
              </div>
              <div className="item">
                <span>外形尺寸:</span>0603
              </div>
              <div className="item">
                <span>精度:</span>
              </div>
              <div className="item">
                <span>额定电压:</span>50V
              </div>
              <div className="item">
                <span>温漂系数(介质材料):</span>X7R
              </div>
              <div className="item">
                <span>质量认证:</span>厂家认证
              </div>
              <div className="item">
                <span>质量等级:</span>普军
              </div>
              <div className="item">
                <span>封装/规格:</span>-
              </div>
              <div className="item">
                <span>容值:</span>-
              </div>
              <div className="item">
                <span>ESR串联电阻:</span>-
              </div>
            </div>
            <Button
              className="cb-btn palb wp100"
              onClick={() => this.setState({ isShowStandardModal: false })}
            >
              关闭
            </Button>
          </div>
        </Modal>
      </div>
    )
  }
}

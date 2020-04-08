import * as React from 'react'
import {} from 'react-router-dom'
import { Flex, Button, Icon, TextareaItem } from 'antd-mobile'

import { Header } from '../../component/header'
import { EllipsisPopover } from '../../component/popover'
const style = require('./style')

interface IPropsOrderDetail {}

interface IStateOrderDetail {
  orderStatus: E_ORDER_STATUS
}

enum E_ORDER_STATUS {
  ORDERED = 'ordered',
  PAID = 'paid',
  SENT = 'sent',
  FINISHED = ' finished'
}

const orderStatuss: { label: string; value: E_ORDER_STATUS }[] = [
  { label: '买家下单', value: E_ORDER_STATUS.ORDERED },
  { label: '买家付款', value: E_ORDER_STATUS.PAID },
  { label: '商家发货', value: E_ORDER_STATUS.SENT },
  { label: '交易完成', value: E_ORDER_STATUS.FINISHED }
]

export default class OrderDetail extends React.PureComponent<
  IPropsOrderDetail,
  IStateOrderDetail
> {
  constructor(props: IPropsOrderDetail) {
    super(props)

    this.state = {
      orderStatus: E_ORDER_STATUS.ORDERED
    }
  }

  render() {
    return (
      <div className={`${style.orderDetail} wp100 hp100 fs0 pt50 bsb pr oh`}>
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
          订单详情
        </Header>
        <div className="wp100 hp100 oay sb">
          <div className="wp100 bg-fff pt20 pb25">
            <Flex className={style.steps}>
              {orderStatuss.map((status, idx) => (
                <Flex.Item
                  key={status.value}
                  data-index={idx + 1}
                  className={`${
                    this.state.orderStatus === status.value ? 'active' : ''
                  } plr10 bsb`}
                >
                  <div className="wp100 tes">{status.label}</div>
                </Flex.Item>
              ))}
            </Flex>
          </div>
          <div className={`${style.orderMsg} wp100 bg-fff bsb mt5`}>
            <p className="fs12">
              <span className="fl">
                <span className="mr5">订单状态:</span>待支付
              </span>
              {/* 完成 */}
              {/* <span className="fr">支付剩余时间: 23时59分</span> */}
            </p>
            <p className="fs12">
              <span className="mr5">订单编号:</span>86597547485445
            </p>
            <p className="fs12">
              <span className="mr5">下单时间:</span>2018-12-07 15:22:28
            </p>
            <div className="btn tac">
              {/* <Button className="cb-btn">去支付</Button>
              <Button className="cb-btn ml10">取消订单</Button> */}
              {/* 完成 */}
              <Button className="cb-btn">再次购买</Button>
            </div>
          </div>
          <div
            className={`${style.address} wp100 bsb mt5 bg-fff`}
            style={{
              backgroundImage: `url(${require('../../assets/images/line-bg.png')})`
            }}
          >
            <div className="fs12 wp100">
              <span className="fl tes">
                <span className="mr5">收货人:</span>张三
              </span>
              <span className="fr tes">13500000000</span>
            </div>
            <p className="fs11 pr bsb">
              <em
                className="palt"
                style={{
                  backgroundImage: `url(${require('../../assets/images/address-icon.png')})`
                }}
              />
              <Icon className="part" type="right" size="md" />
              四川省 成都市 高新西区 西芯大道5号 汇都总部园5号楼 7楼
            </p>
          </div>
          <div
            className={`${
              style.otherMsg
            } wp100 bsb mt5 pl15 pr15 pt10 pb10 bsb bg-fff`}
          >
            <div className="item">
              <span>配送方式:</span>快递
            </div>
            <div className="item">
              <span>发票类型:</span>个人普通发票
            </div>
            <TextareaItem title="买家留言:" placeholder="请输入内容（选填）" />
          </div>
          <div className="wp100 bsb mt5 pl15 pr15 bsb bg-fff">
            <div className={`${style.item} wp100 bsb pb15 pt15 pr`}>
              <span
                className="bsb img palt"
                style={{
                  backgroundImage: `url(${require('../../assets/images/test.png')})`
                }}
              />
              <div className="title wp100 tes fs12">
                多通道模拟图像采集存储系统
              </div>
              <div className="desc wp100 tes fs12">
                <span className="mr5">购买数量:</span>300
              </div>
              <div className="desc wp100 tes fs12">
                <span className="fl price">￥370.44</span>
                <span className="fr">x1</span>
              </div>
            </div>
            <div className={`${style.item} wp100 bsb pb15 pt15 pr`}>
              <span
                className="bsb img palt"
                style={{
                  backgroundImage: `url(${require('../../assets/images/test.png')})`
                }}
              />
              <div className="title wp100 tes fs12">
                多通道模拟图像采集存储系统
              </div>
              <div className="desc wp100 tes fs12">
                <span className="mr5">购买数量:</span>300
              </div>
              <div className="desc wp100 tes fs12">
                <span className="fl price">￥370.44</span>
                <span className="fr">x1</span>
              </div>
              {/* 完成 */}
              <Button className="cb-btn">申请售后</Button>
            </div>
            <div className={`${style.cost} wp100 fs12 mt20`}>
              <span className="fl">商品金额</span>
              <span className="fr">￥370.00</span>
            </div>
            <div className={`${style.cost} wp100 fs12`}>
              <span className="fl">运费</span>
              <span className="fr">￥10</span>
            </div>
            <div className={`${style.cost} wp100 fs12 pb10 pt5`}>
              <span className="fr">
                总计: <span className="fs14 price fw700">￥380</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

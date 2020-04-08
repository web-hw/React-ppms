import * as React from 'react'
import {} from 'react-router-dom'
import { Button, Icon, TextareaItem } from 'antd-mobile'

import { Header } from '../../component/header'
import { EllipsisPopover } from '../../component/popover'
const style = require('./style')

interface IPropsOrderConfirm {}

interface IStateOrderConfirm {}

export default class OrderConfirm extends React.PureComponent<
  IPropsOrderConfirm,
  IStateOrderConfirm
> {
  render() {
    return (
      <div
        className={`${style.orderConfirm} wp100 hp100 fs0 pt50 pb50 bsb pr oh`}
      >
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
          订单确认
        </Header>
        <div className="wp100 hp100 oay sb">
          <div
            className={`${style.address} wp100 bsb pl15 pr15 pt5 pb10 bg-fff`}
          >
            <div className="fs12 wp100">
              <span className="fl tes">收货人: 张三</span>
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
            className={`${style.content} pl10 pr10 pt15 wp100 bsb`}
            style={{
              backgroundImage: `url(${require('../../assets/images/line-bg.png')})`
            }}
          >
            <div className="wp100">
              <h6 className="fs12 fw700 plr10 wp100 bsb">订购商品信息</h6>
              <div className="wp100 bsb plr10 bg-fff">
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
                  <div className="desc wp100 tes fs12">购买数量: 300</div>
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
                  <div className="desc wp100 tes fs12">购买数量: 300</div>
                  <div className="desc wp100 tes fs12">
                    <span className="fl price">￥370.44</span>
                    <span className="fr">x1</span>
                  </div>
                </div>
                <div className={`${style.ope} wp100 fs12 bsb`}>
                  <span className="fl">支付方式</span>
                  <span className="fr">
                    在线支付
                    <Icon type="right" size="md" />
                  </span>
                </div>
                <div className={`${style.ope} wp100 fs12 bsb`}>
                  <span className="fl">配送方式</span>
                  <span className="fr">
                    快递
                    <Icon type="right" size="md" />
                  </span>
                </div>
                <div className={`${style.input} wp100 bsb`}>
                  <TextareaItem
                    title="买家留言:"
                    placeholder="请输入内容（选填）"
                  />
                </div>
              </div>
            </div>
            <div className="wp100 bsb plr10 bg-fff mt5">
              <div className={`${style.ope} wp100 fs12 bsb`}>
                <span className="fl">发票信息</span>
                <span className="fr">
                  个人普通发票
                  <Icon type="right" size="md" />
                </span>
              </div>
              <div className={`${style.ope} wp100 fs12 bsb`}>
                <span className="fl">优惠信息</span>
                <span className="fr">
                  不可用优惠
                  <Icon type="right" size="md" />
                </span>
              </div>
            </div>
            <div className="wp100 bsb p10 bg-fff mt5">
              <div className={`${style.goodPrice} wp100 fs12`}>
                <span className="fl">商品金额</span>
                <span className="fr">￥740.88</span>
              </div>
              <div className={`${style.otherPrice} wp100 fs12`}>
                <span className="fl">运费</span>
                <span className="fr">+￥10</span>
              </div>
              <div className={`${style.otherPrice} wp100 fs12`}>
                <span className="fl">优惠</span>
                <span className="fr">-￥10</span>
              </div>
            </div>
          </div>
        </div>
        <div className={`${style.footer} wp100 palb bsb bg-fff fs12`}>
          合计: <span className="fs18 price fw700">￥740.88</span>
          <Button className="cb-btn part fs12">提交订单</Button>
        </div>
      </div>
    )
  }
}

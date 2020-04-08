import * as React from 'react'
import {} from 'react-router-dom'
import { Flex, InputItem, Button } from 'antd-mobile'

import { Header } from '../../component/header'
import { EllipsisPopover } from '../../component/popover'
const style = require('./style')

interface IPropsServiceTicketDetail {}

interface IStateServiceTicketDetail {
  ticketStatus: E_TICKET_STATUS
}

enum E_TICKET_STATUS {
  APPLIED = 'applied',
  EXAMINED = 'examined',
  RECEIVED = 'received',
  FINISHED = ' finished'
}

const ticketStatuss: { label: string; value: E_TICKET_STATUS }[] = [
  { label: '提交申请', value: E_TICKET_STATUS.APPLIED },
  { label: '审核通过', value: E_TICKET_STATUS.EXAMINED },
  { label: '卖家收货', value: E_TICKET_STATUS.RECEIVED },
  { label: '退款完成', value: E_TICKET_STATUS.FINISHED }
]

export default class ServiceTicketDetail extends React.PureComponent<
  IPropsServiceTicketDetail,
  IStateServiceTicketDetail
> {
  private _dpr: any = document.documentElement.getAttribute('data-dpr') || 1

  constructor(props: IPropsServiceTicketDetail) {
    super(props)

    this.state = {
      ticketStatus: E_TICKET_STATUS.EXAMINED
    }
  }

  render() {
    return (
      <div
        className={`${
          style.serviceTicketDetail
        } wp100 hp100 fs0 pt50 bsb pr oh`}
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
          服务单详情
        </Header>
        <div className="wp100 hp100 oay sb">
          <div className={`${style.header} wp100 bg-fff plr15 fs12 bsb`}>
            <span className="fl">
              本次售后服务由<span>爱米盛平台</span>提供
            </span>
            <span
              className="fr fs10 bsb tac"
              style={{
                backgroundImage: `url(${require('../../assets/images/msg-icon.png')})`
              }}
            >
              联系客服
            </span>
          </div>
          <div className="wp100">
            <div className={`${style.title} wp100 plr15 bsb fs11`}>
              <span className="fl">
                <span className="mr5">服务单号:</span>265602745
              </span>
              <span className="fr">
                <span className="mr5">申请时间:</span>2018-12-13 10:45:18
              </span>
            </div>
            <div className="wp100 bg-fff pt20 pb25">
              <Flex className={style.steps}>
                {ticketStatuss.map((status, idx) => (
                  <Flex.Item
                    key={status.value}
                    data-index={idx + 1}
                    className={`${
                      this.state.ticketStatus === status.value ? 'active' : ''
                    } plr10 bsb`}
                  >
                    <div className="wp100 tes">{status.label}</div>
                  </Flex.Item>
                ))}
              </Flex>
            </div>
          </div>
          <div className="wp100">
            <div className={`${style.title} wp100 plr15 bsb fs11`}>
              <span className="fl">服务单信息</span>
            </div>
            <div className={`${style.msg} wp100 bg-fff bsb fs13`}>
              <div className="item">
                <span className="mr5">服务类型:</span>退货退款
              </div>
              <div className="item">
                <span className="mr5">申请原因:</span>质量问题
              </div>
            </div>
          </div>
          <div className="wp100">
            <div className={`${style.title} wp100 plr15 bsb fs11`}>
              <span className="fl">退货详情</span>
            </div>
            {/* <div className={`${style.msg} wp100 bg-fff bsb fs13`}>
              <h6 className="fs13 mt10">请填写物流信息</h6>
              <InputItem
                className="mt15"
                placeholder="请选择"
                disabled={true}
                extra={
                  <em
                    style={{
                      backgroundImage:
                      `url(${require('../../assets/images/register-down-icon.png')})`
                    }}
                  />
                }
              >
                物流公司:
              </InputItem>
              <InputItem
                className="mt15"
                placeholder="请输入"
              >
                物流单号:
              </InputItem>
              <Button className="cb-btn">提交</Button>
            </div> */}
            {/* 完成 */}
            <div className={`${style.logisticMsg} wp100 bg-fff p15 bsb`}>
              <div className="item wp100 bsb pr">
                <div className="time palt bsb pr15">
                  <div className="date">
                    <span className="fs12 db">12-30</span>
                    <span className="fs12 db">12:30</span>
                  </div>
                  <em
                    className="active"
                    style={{
                      width: `${this._dpr * 6}px`,
                      height: `${this._dpr * 6}px`
                    }}
                  />
                </div>
                <div className="content wp100">
                  <h6 className="fs12 fw400 tes">运输中</h6>
                  <p className="fs11">
                    当时这条微博引起了不小轰动，后来,当时这条微博引起了不小轰动，后来,当时这条微博引起了不小轰动，后来
                  </p>
                </div>
              </div>
              <div className="item wp100 bsb pr">
                <div className="time palt bsb pr15">
                  <div className="date">
                    <span className="fs12 db">12-30</span>
                    <span className="fs12 db">12:30</span>
                  </div>
                  <em
                    style={{
                      width: `${this._dpr * 6}px`,
                      height: `${this._dpr * 6}px`
                    }}
                  />
                </div>
                <div className="content wp100">
                  <h6 className="fs12 fw400 tes">运输中</h6>
                  <p className="fs11">
                    当时这条微博引起了不小轰动，后来,当时这条微博引起了不小轰动
                  </p>
                </div>
              </div>
              <div className="item wp100 bsb pr">
                <div className="time palt bsb pr15">
                  <div className="date">
                    <span className="fs12 db">12-30</span>
                    <span className="fs12 db">12:30</span>
                  </div>
                  <em
                    style={{
                      width: `${this._dpr * 6}px`,
                      height: `${this._dpr * 6}px`
                    }}
                  />
                </div>
                <div className="content wp100">
                  <h6 className="fs12 fw400 tes">运输中</h6>
                  <p className="fs11">
                    当时这条微博引起了不小轰动，后来,当时这条微博引起了不小轰动,
                    当时这条微博引起了不小轰动，后来,当时这条微博引起了不小轰动,
                    当时这条微博引起了不小轰动，后来,当时这条微博引起了不小轰动,
                    当时这条微博引起了不小轰动，后来,当时这条微博引起了不小轰动
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="wp100">
            <div className={`${style.title} wp100 plr15 bsb fs11`}>
              <span className="fl">问题描述</span>
            </div>
            <div className={`${style.desc} wp100 bg-fff bsb fs12`}>
              当时这条微博引起了不小轰动，后来，我在后台收到一位朋友的微博私信，她说她叫俊柔，
              她自己的父母祖辈就是桂林龙胜山里的养蜂人，
              因为这两年市场被假蜜充斥，自己山里的蜜
              根本卖不出去，乡亲们都一筹莫展，
              希望我能帮乡亲们做个宣传，为山里的真蜂蜜发声。
              <Flex>
                <Flex.Item>
                  <img src={require('../../assets/images/test.png')} />
                </Flex.Item>
                <Flex.Item>
                  <img src={require('../../assets/images/test.png')} />
                </Flex.Item>
                <Flex.Item>
                  <img src={require('../../assets/images/test.png')} />
                </Flex.Item>
              </Flex>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

import * as React from 'react'
import {} from 'react-router-dom'
import { Button, Flex, InputItem, Radio } from 'antd-mobile'

import { Header } from '../../component/header'
import { EllipsisPopover } from '../../component/popover'
const style = require('./style')

interface IPropsInvoiceMsg {}

interface IStateInvoiceMsg {
  invoiceType: E_INVOICE_TYPE
  headType: E_HEAD_TYPE
}

enum E_INVOICE_TYPE {
  GENERAL = 'general',
  SPECIAL = 'special'
}

enum E_HEAD_TYPE {
  PERSONAL = 'personal',
  COMPANY = 'company'
}

const invoiceTypes: { label: string; value: E_INVOICE_TYPE }[] = [
  { label: '普通发票', value: E_INVOICE_TYPE.GENERAL },
  { label: '专用发票', value: E_INVOICE_TYPE.SPECIAL }
]

const headTypes: { label: string; value: E_HEAD_TYPE }[] = [
  { label: '个人', value: E_HEAD_TYPE.PERSONAL },
  { label: '企业/单位', value: E_HEAD_TYPE.COMPANY }
]

export default class InvoiceMsg extends React.PureComponent<
  IPropsInvoiceMsg,
  IStateInvoiceMsg
> {
  constructor(props: IPropsInvoiceMsg) {
    super(props)

    this.state = {
      invoiceType: E_INVOICE_TYPE.GENERAL,
      headType: E_HEAD_TYPE.PERSONAL
    }
  }

  render() {
    const { invoiceType, headType } = this.state

    return (
      <div className={`${style.invoiceMsg} wp100 hp100 fs0 pt50 bsb pr oh`}>
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
          发票信息
        </Header>
        <div className="wp100 hp100 oay sb pb5 bsb">
          <Flex className={`${style.title} bg-fff`}>
            {invoiceTypes.map(type => (
              <Flex.Item key={type.value}>
                <span
                  className={invoiceType === type.value ? 'active' : ''}
                  onClick={() => this.setState({ invoiceType: type.value })}
                >
                  {type.label}
                </span>
              </Flex.Item>
            ))}
          </Flex>
          {invoiceType === E_INVOICE_TYPE.GENERAL && [
            <div key="title" className={`${style.desc} wp100 bg-fff`}>
              <Flex>
                <Flex.Item>
                  <span className="active">电子发票</span>
                </Flex.Item>
                <Flex.Item>
                  <span>纸质发票</span>
                </Flex.Item>
              </Flex>
              <p className="fs11 tac">
                电子发票与纸质发票具有同等法律效力，可支持报销入账
              </p>
            </div>,
            <div key="content" className="wp100 bsb plr10">
              <div className="mt5 wp100 bg-fff pl10 pr10 pt5 pb5 bsb">
                <div className={style.item}>
                  <span className="fl">抬头类型</span>
                  <span className="fr">
                    {headTypes.map(type => (
                      <Radio
                        key={type.value}
                        className="raido"
                        checked={headType === type.value}
                        onChange={() => this.setState({ headType: type.value })}
                      >
                        {type.label}
                      </Radio>
                    ))}
                  </span>
                </div>
                {/* *****企业***** */}
                {headType === E_HEAD_TYPE.COMPANY && [
                  <InputItem
                    key="headName"
                    className={style.item}
                    placeholder="输入抬头名称"
                  >
                    发票抬头
                  </InputItem>,
                  <InputItem
                    key="dutyParagraph"
                    className={style.item}
                    placeholder="输入纳税人识别号"
                  >
                    税号
                  </InputItem>,
                  <InputItem
                    key="bank"
                    className={style.item}
                    placeholder="选填"
                  >
                    开户银行
                  </InputItem>,
                  <InputItem
                    key="bankNum"
                    className={style.item}
                    type="digit"
                    placeholder="选填"
                  >
                    银行账户
                  </InputItem>,
                  <InputItem
                    key="address"
                    className={style.item}
                    placeholder="选填"
                  >
                    企业地址
                  </InputItem>,
                  <InputItem
                    key="phone"
                    className={style.item}
                    type="digit"
                    placeholder="选填"
                  >
                    企业电话
                  </InputItem>
                ]}
                <InputItem
                  className={style.item}
                  type="digit"
                  placeholder="请输入收票人手机号"
                >
                  收票人手机号
                </InputItem>
                <InputItem
                  className={style.item}
                  placeholder="用来接收电子发票"
                >
                  收票人邮箱
                </InputItem>
              </div>
              <div className="mt5 wp100 bg-fff pl10 pr10 pt5 pb5 bsb">
                <div className={style.item}>
                  <span className="fl">发票内容</span>
                  <span className="fr">
                    <Radio className="raido">商品明细</Radio>
                    <Radio className="raido">商品类别</Radio>
                  </span>
                </div>
              </div>
            </div>
          ]}
          {invoiceType === E_INVOICE_TYPE.SPECIAL && [
            <div
              key="title"
              className={`${style.zyDesc} wp100 bg-fff bsb fs11`}
            >
              <p>
                增值税专用发票的开具需开通增票资质。请在“我的-个人资料-增票资质”内提交资料开通资质后，方可开具增值税专用发票
              </p>
              <p className="mt5">
                我的<a href="javascript:void(0);">增值税专用发票资料</a>
              </p>
            </div>,
            <div key="content" className="wp100 bsb plr10">
              <div className="mt5 wp100 bg-fff pl10 pr10 pt5 pb5 bsb">
                <InputItem
                  className={style.item}
                  placeholder="请输入收票人姓名"
                >
                  收票人
                </InputItem>
                <InputItem
                  className={style.item}
                  type="digit"
                  placeholder="请输入收票人手机号"
                >
                  收票人手机号
                </InputItem>
                <InputItem
                  className={style.item}
                  placeholder="请输入收票人地址"
                >
                  收票人地址
                </InputItem>
              </div>
            </div>
          ]}
        </div>
        <div className={`${style.btn} bsb pt10 pb10 pl15 pr15 palb wp100`}>
          <Button className="cb-btn">提交</Button>
        </div>
      </div>
    )
  }
}

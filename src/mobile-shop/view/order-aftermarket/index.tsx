import * as React from 'react'
import {} from 'react-router-dom'
import { Icon, Flex, Popover } from 'antd-mobile'

import { EllipsisPopover } from '../../component/popover'
import { Header } from '../../component/header'
const style = require('./style')

interface IPropsOrderAftermarket {}

interface IStateOrderAftermarket {
  conditions: any[]
}

const conditions = [
  {
    isShow: false,
    label: '全部状态',
    value: 'status',
    children: [
      { label: '处理中', value: 'doing' },
      { label: '已完成', value: 'done' }
    ]
  },
  {
    isShow: false,
    label: '全部分类',
    value: 'type',
    children: [
      { label: '退货', value: 'cancel' },
      { label: '换货', value: 'barter' }
    ]
  }
]

export default class OrderAftermarket extends React.PureComponent<
  IPropsOrderAftermarket,
  IStateOrderAftermarket
> {
  // change visible
  private onChangeVisible(visible: boolean, item: any) {
    const { conditions } = this.state
    const cdt = conditions.find(cdt => cdt.value === item.value)
    if (!cdt) {
      return
    }
    console.log(visible)
    cdt.isShow = visible
    this.setState({ conditions: [].concat(conditions) })
  }

  // select condition
  private onSelectCondition(node: any, index: number) {
    console.log(node, index)
  }

  constructor(props: IPropsOrderAftermarket) {
    super(props)

    this.state = {
      conditions
    }

    this.onChangeVisible = this.onChangeVisible.bind(this)
    this.onSelectCondition = this.onSelectCondition.bind(this)
  }

  render() {
    return (
      <div
        className={`${style.orderAftermarket} wp100 hp100 fs0 pt50 bsb pr oh`}
        // onClick={event => event.preventDefault()}
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
          售后订单
        </Header>
        <div className="wp100 hp100 pr pt50 bsb pb5">
          <div className={`${style.header} wp100 palt bsb bb1`}>
            <Flex>
              {this.state.conditions.map(cdt => (
                <Flex.Item key={cdt.value}>
                  {cdt.label}
                  <Popover
                    visible={cdt.isShow}
                    mask={true}
                    overlay={cdt.children.map((cd: any) => (
                      <Popover.Item key={cd.value}>{cd.label}</Popover.Item>
                    ))}
                    placement="bottom"
                    onVisibleChange={visible =>
                      this.onChangeVisible(visible, cdt)
                    }
                    onSelect={this.onSelectCondition}
                  >
                    <em
                      className={cdt.isShow ? 'active' : ''}
                      style={{
                        backgroundImage: `url(${require('../../assets/images/down-def.png')})`
                      }}
                    />
                  </Popover>
                </Flex.Item>
              ))}
            </Flex>
          </div>
          <div className="wp100 hp100 oay sb">
            <div className="wp100">
              <div className={`${style.title} wp100 plr15 bsb fs12 fw700`}>
                <span className="fl">服务单号: 26598751254</span>
                <span className="fr">退款</span>
              </div>
              <div
                className={`${style.content} wp100 pl15 pr15 pb5 bsb bg-fff`}
              >
                <div className="wp100 bsb pl5 pr5 pt10 pb10">
                  <div className="good-msg wp100 pr bsb">
                    <span
                      className=" hp100 bsb img palt"
                      style={{
                        backgroundImage: `url(${require('../../assets/images/test.png')})`
                      }}
                    />
                    <div className="title wp100 tes fs12">
                      多通道模拟图像采集存储系统
                    </div>
                    <div className="desc wp100 tes fs12">购买数量: 300</div>
                    <div className="desc wp100 tes fs12">
                      <span className="price fl">￥370.44</span>
                      <span className="fr">x1</span>
                    </div>
                  </div>
                </div>
                <div className="footer wp100 fs10 bsb pr">
                  已完成！您的服务单号已退款，请注意查收
                  <Icon className="part" type="right" size="md" />
                </div>
              </div>
            </div>
            <div className="wp100">
              <div className={`${style.title} wp100 plr15 bsb fs12 fw700`}>
                <span className="fl">服务单号: 26598751254</span>
                <span className="fr">换货</span>
              </div>
              <div
                className={`${style.content} wp100 pl15 pr15 pb5 bsb bg-fff`}
              >
                <div className="wp100 bsb pl5 pr5 pt10 pb10">
                  <div className="good-msg wp100 pr bsb">
                    <span
                      className=" hp100 bsb img palt"
                      style={{
                        backgroundImage: `url(${require('../../assets/images/test.png')})`
                      }}
                    />
                    <div className="title wp100 tes fs12">
                      多通道模拟图像采集存储系统
                    </div>
                    <div className="desc wp100 tes fs12">购买数量: 300</div>
                    <div className="desc wp100 tes fs12">
                      <span className="price fl">￥370.44</span>
                      <span className="fr">x1</span>
                    </div>
                  </div>
                </div>
                <div className="footer wp100 fs10 bsb pr">
                  已完成！您的服务单号已完成
                  <Icon className="part" type="right" size="md" />
                </div>
              </div>
            </div>
            <div className="wp100">
              <div className={`${style.title} wp100 plr15 bsb fs12 fw700`}>
                <span className="fl">服务单号: 26598751254</span>
                <span className="fr">换货</span>
              </div>
              <div
                className={`${style.content} wp100 pl15 pr15 pb5 bsb bg-fff`}
              >
                <div className="wp100 bsb pl5 pr5 pt10 pb10">
                  <div className="good-msg wp100 pr bsb">
                    <span
                      className=" hp100 bsb img palt"
                      style={{
                        backgroundImage: `url(${require('../../assets/images/test.png')})`
                      }}
                    />
                    <div className="title wp100 tes fs12">
                      多通道模拟图像采集存储系统
                    </div>
                    <div className="desc wp100 tes fs12">购买数量: 300</div>
                    <div className="desc wp100 tes fs12">
                      <span className="price fl">￥370.44</span>
                      <span className="fr">x1</span>
                    </div>
                  </div>
                </div>
                <div className="footer wp100 fs10 bsb pr">
                  已完成！您的服务单号已完成
                  <Icon className="part" type="right" size="md" />
                </div>
              </div>
            </div>
            <div className="wp100">
              <div className={`${style.title} wp100 plr15 bsb fs12 fw700`}>
                <span className="fl">服务单号: 26598751254</span>
                <span className="fr">换货</span>
              </div>
              <div
                className={`${style.content} wp100 pl15 pr15 pb5 bsb bg-fff`}
              >
                <div className="wp100 bsb pl5 pr5 pt10 pb10">
                  <div className="good-msg wp100 pr bsb">
                    <span
                      className=" hp100 bsb img palt"
                      style={{
                        backgroundImage: `url(${require('../../assets/images/test.png')})`
                      }}
                    />
                    <div className="title wp100 tes fs12">
                      多通道模拟图像采集存储系统
                    </div>
                    <div className="desc wp100 tes fs12">购买数量: 300</div>
                    <div className="desc wp100 tes fs12">
                      <span className="price fl">￥370.44</span>
                      <span className="fr">x1</span>
                    </div>
                  </div>
                </div>
                <div className="footer wp100 fs10 bsb pr">
                  已完成！您的服务单号已完成
                  <Icon className="part" type="right" size="md" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

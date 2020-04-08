import * as React from 'react'
import {} from 'react-router-dom'
import {
  Button,
  Flex,
  Icon,
  TextareaItem,
  Grid,
  Modal,
  Radio,
  InputItem
} from 'antd-mobile'

import { EllipsisPopover } from '../../component/popover'
import { Header } from '../../component/header'
const style = require('./style')

interface IPropsApplyAftermarket {}

interface IStateApplyAftermarket {
  imgs: any[]
  reason: string
  isShowReasonModal: boolean
  aftermarketType: E_AFTERMARKET_TYPE
}

enum E_AFTERMARKET_TYPE {
  CANCEL = 'cancel', // 退货
  BARTER = 'barter' // 换货
}

const aftermarkets = [
  {
    label: '退货',
    value: E_AFTERMARKET_TYPE.CANCEL
  },
  {
    label: '换货',
    value: E_AFTERMARKET_TYPE.BARTER
  }
]

export default class ApplyAftermarket extends React.PureComponent<
  IPropsApplyAftermarket,
  IStateApplyAftermarket
> {
  constructor(props: IStateApplyAftermarket) {
    super(props)

    this.state = {
      reason: '',
      isShowReasonModal: false,
      aftermarketType: E_AFTERMARKET_TYPE.CANCEL,
      imgs: [
        {
          icon: require('../../assets/images/test.png')
        },
        {}
      ]
    }
  }

  render() {
    const reasons = [
      {
        label: '质量问题',
        value: '质量问题'
      },
      {
        label: '材料与商品描述不符',
        value: '材料与商品描述不符'
      },
      {
        label: '大小尺寸与商品描述不符',
        value: '大小尺寸与商品描述不符'
      },
      {
        label: '卖家发错货',
        value: '卖家发错货'
      },
      {
        label: '假冒品牌',
        value: '假冒品牌'
      },
      {
        label: '受到商品少件或破损',
        value: '受到商品少件或破损'
      }
    ]
    return (
      <div
        className={`${style.applyAftermarket} wp100 hp100 fs0 pt50 bsb pr oh`}
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
          申请售后
        </Header>
        <div className="wp100 hp100 oay sb">
          <div className="wp100">
            <div className={`${style.title} wp100 plr15 bsb fs12 fw700`}>
              <span className="fl">服务类型</span>
            </div>
            <div className={`${style.msg} wp100 bg-fff plr15 bsb`}>
              <div className="wp100 ptb20">
                <Flex>
                  {aftermarkets.map(item => (
                    <Flex.Item
                      key={item.value}
                      className={
                        this.state.aftermarketType === item.value && 'active'
                      }
                      onClick={() =>
                        this.setState({ aftermarketType: item.value })
                      }
                    >
                      {item.label}
                    </Flex.Item>
                  ))}
                </Flex>
              </div>
              <div className="content wp100 pt20 pb20 pl5 pr5 bsb">
                <div className="item wp100 pr bsb">
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
                    <span className="price fl">￥370.44 </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="wp100">
            <div className={`${style.title} wp100 plr15 bsb fs12 fw700`}>
              <span className="fl">申请原因</span>
              <span
                className="fr"
                onClick={() => this.setState({ isShowReasonModal: true })}
              >
                请选择
                <Icon type="right" size="md" />
              </span>
            </div>
            {this.state.aftermarketType === E_AFTERMARKET_TYPE.CANCEL && (
              <div
                className={`${
                  style.content
                } wp100 pl15 pr15 bsb pt10 pb10 bg-fff`}
              >
                <div className="fs12">
                  退款金额: <span className="price">￥370</span>
                </div>
                <div className="fs11">最多退款370.44元，含邮费0元。</div>
              </div>
            )}
          </div>
          <div className="wp100">
            <div className={`${style.title} wp100 plr15 bsb fs12 fw700`}>
              <span className="fl">
                {this.state.aftermarketType === E_AFTERMARKET_TYPE.CANCEL
                  ? '退货'
                  : '换货'}
                数量
              </span>
            </div>
            <div
              className={`${style.content} ${
                style.contentInput
              } wp100 pl15 pr15 bsb pt10 pb10 bg-fff`}
            >
              <InputItem type="digit" placeholder="请输入" />
            </div>
          </div>
          <div className="wp100">
            <div className={`${style.title} wp100 plr15 bsb fs12 fw700`}>
              <span className="fl">问题描述</span>
            </div>
            <div
              className={`${
                style.content
              } wp100 pl15 pr15 bsb pt10 pb10 bg-fff`}
            >
              <TextareaItem placeholder="请您描述问题并上传照片（选填）" />
            </div>
          </div>
          <div className="wp100">
            <div className={`${style.title} wp100 plr15 bsb fs12 fw700`}>
              <span className="fl">上传照片</span>
            </div>
            <div
              className={`${style.imgs} wp100 pl5 pr15 bsb pt15 pb25 bg-fff`}
            >
              <Grid
                data={this.state.imgs}
                columnNum={3}
                square={true}
                hasLine={false}
                activeStyle={false}
                onClick={itm => console.log(itm)}
                renderItem={item => (
                  <div
                    className={`${!item.icon && 'is-sel'} item wp100 hp100 pr`}
                  >
                    {item.icon ? (
                      <img src={item.icon} />
                    ) : (
                      <div
                        className="wp100 mc"
                        style={{
                          backgroundImage: `url(${require('../../assets/images/camera-icon.png')})`
                        }}
                      >
                        <h6 className="fs11 fw400">上传照片</h6>
                        <p className="fs9">（最多3张）</p>
                      </div>
                    )}
                  </div>
                )}
              />
            </div>
          </div>
          {this.state.aftermarketType === E_AFTERMARKET_TYPE.BARTER && (
            <div className="wp100">
              <div className={`${style.title} wp100 plr15 bsb fs12 fw700`}>
                <span className="fl">
                  收货信息<span className="info">（企业回寄给您的地址）</span>
                </span>
              </div>
              <div
                className={`${
                  style.address
                } wp100 pl15 pr15 bsb pt10 pb15 bg-fff`}
              >
                <h6 className="fw400 fs12">
                  <span className="fl tes">收货人: 张三</span>
                  <span className="fr tes">13500000000</span>
                </h6>
                <p className="fs11 pr bsb">
                  <em
                    className="palt"
                    style={{
                      backgroundImage: `url(${require('../../assets/images/address-icon.png')})`
                    }}
                  />
                  <Icon className="part" type="right" size="md" />
                  四川省 成都市 高新西区 西芯大道5号 汇都总部园 5号楼 7楼四川省
                  成都市 高新西区 西芯大道5号
                </p>
              </div>
            </div>
          )}
        </div>
        <Button className="cb-btn palb wp100">提交申请</Button>
        <Modal
          title="退货原因"
          popup={true}
          visible={this.state.isShowReasonModal}
          onClose={() => this.setState({ isShowReasonModal: false })}
          animationType="slide-up"
          className={style.reasonModal}
        >
          <div className={`${style.reasonModalContent} wp100 sb oay cb-radio`}>
            {reasons.map((reason: any) => (
              <Radio.RadioItem
                key={reason.value}
                checked={this.state.reason === reason.value}
                onClick={() => this.setState({ reason: reason.value })}
              >
                {reason.label}
              </Radio.RadioItem>
            ))}
          </div>
          <Button
            className="cb-btn"
            onClick={() => this.setState({ isShowReasonModal: false })}
          >
            关闭
          </Button>
        </Modal>
      </div>
    )
  }
}

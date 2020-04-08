import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { InputItem, Icon, Modal, Radio } from 'antd-mobile'

import { Header } from '../../component/header'
const style = require('./style')

interface IPropsExpertPersonalMsg extends RouteComponentProps {}

interface IStateExpertPersonalMsg {
  trades: any[] // 行业
  trade: string // 行业
  isShowTradeModal: boolean
  isEditing: boolean // 是否是编辑中
}

export default class ExpertPersonalMsg extends React.PureComponent<
  IPropsExpertPersonalMsg,
  IStateExpertPersonalMsg
> {
  // 跳转
  private onJump(url: string) {
    this.props.history.push(
      `${url}/${encodeURIComponent(this.props.match.url)}`
    )
  }

  // 切换编辑状态
  private onSwitchEditStatus() {
    const { isEditing } = this.state

    if (!isEditing) {
      return this.setState({ isEditing: true })
    }

    // 当前是保存状态
    // Todo 检查是否有值更新，有更新则下发请求
    console.log('保存')
    // 切换状态
    this.setState({ isEditing: false })
  }

  constructor(props: IPropsExpertPersonalMsg) {
    super(props)

    this.state = {
      trade: '',
      isShowTradeModal: false,
      isEditing: false,
      trades: [
        { label: '电子产品', value: '电子产品' },
        { label: '鉴定检测', value: '鉴定检测' },
        { label: '知识产权', value: '知识产权' },
        { label: '组件部件', value: '组件部件' }
      ]
    }

    this.onJump = this.onJump.bind(this)
    this.onSwitchEditStatus = this.onSwitchEditStatus.bind(this)
  }

  render() {
    const { isEditing } = this.state

    return (
      <div className={`${style.expertMsg} wp100 hp100 pr bsb fs0 pt50 oh`}>
        <Header
          right={
            <span onClick={this.onSwitchEditStatus}>
              {isEditing ? '保存' : '编辑'}
            </span>}
        >
          个人信息
        </Header>
        <div className="wp100 hp100 bg-f0f0f0 pt5 bsb">
          <div className="wp100 hp100 oay sb bg-fff">
            <div
              className="cb-input"
              onClick={() => isEditing && this.onJump('/my-position-select')}
            >
              <InputItem
                placeholder="省市区县等"
                disabled={true}
                extra={<Icon type="right" size="md" />}
              >
                所在地
              </InputItem>
            </div>
            <div className="cb-input">
              <InputItem placeholder="街道、楼牌号等" disabled={!isEditing}>
                详细地址
              </InputItem>
            </div>
            <div
              className="cb-input"
              onClick={() =>
                isEditing && this.setState({ isShowTradeModal: true })
              }
            >
              <InputItem
                placeholder="所属行业"
                disabled={true}
                value={this.state.trade}
                extra={<Icon type="right" size="md" />}
              >
                行业领域
              </InputItem>
            </div>
            <div className="cb-input">
              <InputItem placeholder="请输入您的职称" disabled={!isEditing}>
                职称
              </InputItem>
            </div>
          </div>
        </div>
        <Modal
          title="请选择从事的行业领域"
          popup={true}
          visible={this.state.isShowTradeModal}
          onClose={() => this.setState({ isShowTradeModal: false })}
          animationType="slide-up"
          className={style.tradeModal}
        >
          <div className={`${style.tradeModalContent} wp100 sb oay cb-radio`}>
            {this.state.trades.map((trade: any) => (
              <Radio.RadioItem
                key={trade.value}
                checked={this.state.trade === trade.value}
                onClick={() => this.setState({ trade: trade.value })}
              >
                {trade.label}
              </Radio.RadioItem>
            ))}
          </div>
        </Modal>
      </div>
    )
  }
}

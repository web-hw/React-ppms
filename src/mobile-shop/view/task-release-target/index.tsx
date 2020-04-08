import * as React from 'react'
import {} from 'react-router-dom'
import { Icon, Flex } from 'antd-mobile'

import { Header } from '../../component/header'
const style = require('./style')

interface IPropsTaskReleaseTarget {}

interface IStateTaskReleaseTarget {
  targetRelated: E_RELATED
  targetRelatedType: string
  isOpenRelateTypeModal: boolean
  targetType: string
  selectedTarget: { [propName: string]: string }
}

enum E_RELATED {
  INNER = 'inner',
  OUTER = 'outer'
}

const related: { label: string; value: E_RELATED }[] = [
  { label: '内部关联方', value: E_RELATED.INNER },
  { label: '外部关联方', value: E_RELATED.OUTER }
]

const relatedType = {
  [E_RELATED.INNER]: [
    { label: '部门选择', value: 'department' },
    { label: '岗位选择', value: 'position' },
    { label: '组别选择', value: 'group' }
  ],
  [E_RELATED.OUTER]: [
    { label: '硬件', value: 'hardware' },
    { label: '专家领域', value: 'expert' },
    { label: '平台注册人领域', value: 'register' }
  ]
}

const targetType = [
  { label: '生产部', value: '生产部' },
  { label: '产品部', value: '产品部' }
]

export default class TaskReleaseTarget extends React.PureComponent<
  IPropsTaskReleaseTarget,
  IStateTaskReleaseTarget
> {
  private _targetTypeItemActIcon = require('../../assets/images/agree-act.png')

  // 切换关联类型
  private onSwitchRelatedType(relatedType: any) {
    const { targetRelatedType } = this.state

    if (relatedType === targetRelatedType) {
      this.onCloseRelatedModal()
    } else {
      this.setState({
        targetRelatedType: relatedType,
        isOpenRelateTypeModal: true
      })

      // Todo切换modal数据
    }
  }

  // 关闭关联类型
  private onCloseRelatedModal() {
    this.setState({
      targetRelatedType: '',
      isOpenRelateTypeModal: false
    })
  }

  // 切换
  private onSwitchRelated(type: E_RELATED) {
    const { targetRelated } = this.state
    if (targetRelated === type) {
      return
    }

    this.setState({
      targetRelated: type
    })

    this.onCloseRelatedModal()
  }

  // 选择目标类型
  private onSelectTargetType(event: any) {
    event.stopPropagation()
    const target = event.target
    if (!target) {
      return
    }

    const className = target.className || ''
    const value = target.getAttribute('data-value')
    const { targetType } = this.state
    if (
      target.nodeName !== 'SPAN' ||
      !className.includes('valid-value') ||
      !value ||
      value === targetType
    ) {
      return
    }

    this.setState({ targetType: value })
    this.onCloseRelatedModal()
    // Todo根据类型获取数据
  }

  // 删除
  private onDelSelTgt(key: string) {
    const { selectedTarget } = this.state

    delete selectedTarget[key]

    this.setState({ selectedTarget: { ...selectedTarget } })
  }

  // 选择人员
  private onSelectTarget(event: any) {
    const target = event.target
    if (!target) {
      return
    }
    const className = target.className || ''
    if (!className.includes('item')) {
      return
    }

    const { selectedTarget } = this.state
    const value = 'test'
    const label = '内部关联方-开发部-王依依(前端)'

    // 如果已经存在
    if (this.isSelTarget(value)) {
      return
    }

    console.log('新加入')
    selectedTarget[value] = label
    this.setState({ selectedTarget: { ...selectedTarget } })
  }

  // 检查是否已经选择
  private isSelTarget(key: string) {
    const { selectedTarget } = this.state

    return !!selectedTarget[key]
  }

  constructor(props: IPropsTaskReleaseTarget) {
    super(props)

    this.state = {
      targetRelated: E_RELATED.INNER,
      targetRelatedType: '',
      isOpenRelateTypeModal: false,
      targetType: '生产部',
      selectedTarget: {}
    }

    this.onCloseRelatedModal = this.onCloseRelatedModal.bind(this)
    this.onSelectTargetType = this.onSelectTargetType.bind(this)
    this.onSelectTarget = this.onSelectTarget.bind(this)
    this.isSelTarget = this.isSelTarget.bind(this)
  }

  render() {
    return (
      <div className="wp100 hp100 pr bsb pt50 fs0 bg-f0f0f0 oh">
        <Header
          right={
            <Icon className="vat" type="search" color="#1a1a1a" size="sm" />
          }
        >
          面向对象
        </Header>
        <div className={`${style.content} wp100 hp100 bsb pr`}>
          <div className={`${style.title} wp100 palt`}>
            <Flex className="target wp100">
              {related.map(itm => (
                <Flex.Item
                  key={itm.value}
                  className={
                    this.state.targetRelated === itm.value ? 'active' : ''
                  }
                  onClick={() => this.onSwitchRelated(itm.value)}
                >
                  {itm.label}
                </Flex.Item>
              ))}
            </Flex>
            <Flex className="target-type wp100">
              {relatedType[this.state.targetRelated].map(itm => (
                <Flex.Item
                  key={itm.value}
                  onClick={() => this.onSwitchRelatedType(itm.value)}
                  className={`${
                    itm.value === this.state.targetRelatedType ? 'active' : ''
                  }`}
                >
                  {itm.label}
                </Flex.Item>
              ))}
            </Flex>
          </div>
          <div className="wp100 hp100 pb50 bsb pr">
            <div className="wp100 hp100 oay sb">
              <div className={`${style.targetItem} wp100 bsb bg-fff mt5`}>
                <h6 className="wp100 fs14 tes fw400">已选</h6>
                <div className="wp100">
                  {Object.keys(this.state.selectedTarget).map(key => (
                    <div key={key} className="item wp100 tes fs12 pr bsb">
                      {this.state.selectedTarget[key]}
                      <Icon
                        onClick={() => this.onDelSelTgt(key)}
                        type="cross"
                        size="md"
                        className="part"
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className={`${style.targetItem} wp100 bsb bg-fff mt5`}>
                <h6 className="wp100 fs14 tes fw400">
                  【部门】<span>开发部</span>
                </h6>
                <div onClick={this.onSelectTarget} className="wp100">
                  <div
                    className={`${
                      this.isSelTarget('test') ? 'active' : ''
                    } item wp100 tes fs12 pr bsb`}
                  >
                    王依依(前端)
                    <Icon type="check" size="md" className="part" />
                  </div>
                </div>
              </div>
            </div>
            <div
              onClick={this.onCloseRelatedModal}
              className={`${this.state.isOpenRelateTypeModal ? 'active' : ''} ${
                style.targetTypeModal
              } palb wp100 hp100 zi400`}
            >
              <div
                onClick={this.onSelectTargetType}
                className="content wp100 bsb bg-fff oay sb"
              >
                {targetType.map(type => (
                  <span
                    key={type.value}
                    className={
                      type.value === this.state.targetType ? 'active' : ''
                    }
                  >
                    <span className="valid-value" data-value={type.value}>
                      {type.label}
                      <em
                        style={{
                          backgroundImage: `url(${this._targetTypeItemActIcon})`
                        }}
                      />
                    </span>
                  </span>
                ))}
              </div>
            </div>
            <Flex className={`${style.footer} wp100 palb`}>
              <Flex.Item>取消</Flex.Item>
              <Flex.Item>确定</Flex.Item>
            </Flex>
          </div>
        </div>
      </div>
    )
  }
}

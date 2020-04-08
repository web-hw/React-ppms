import * as React from 'react'
import { PullToRefresh, Icon } from 'antd-mobile'

const style = require('./style')

export enum EDirection {
  UP = 'up',
  DOWN = 'down'
}

interface IOptions {
  dpr: number
  refreshing: boolean // 是否显示刷新状态
}

interface IPropsCustomRefresh {
  hasData?: boolean
  children: React.ReactNode
  direction?: EDirection // 拉动方向
  distanceToRefresh?: number // 刷新距离
  damping?: number // 拉动距离 建议小于200
  onRefresh: (done: Function) => void // 回调
  indicator?: {
    // 指示器
    activate?: React.ReactNode
    deactivate?: React.ReactNode
    release?: React.ReactNode
    finish?: React.ReactNode
  }
}

export class CustomRefresh extends React.PureComponent<
  IPropsCustomRefresh,
  IOptions
> {
  constructor(props: IPropsCustomRefresh) {
    super(props)

    // state
    this.state = {
      dpr: 1,
      refreshing: false
    }

    this.onRefresh = this.onRefresh.bind(this)
  }

  onRefresh() {
    // 刷新
    const { onRefresh, hasData = true } = this.props
    if (!hasData) {
      return
    }

    this.setState({ refreshing: true })
    // 回调
    const done = () => this.setState({ refreshing: false })
    onRefresh && onRefresh(done)
  }

  componentDidMount() {
    // 获取当前环境dpr
    let { dpr } = this.state
    const html = document.getElementsByTagName('html')[0]
    if (html) {
      dpr = +html.getAttribute('data-dpr') || dpr
    }
    this.setState({ dpr })
  }

  render() {
    const {
      damping = 100,
      indicator = {},
      distanceToRefresh = 25,
      hasData = true,
      direction = EDirection.DOWN
    } = this.props
    const { refreshing, dpr } = this.state

    // 默认提示
    let activate = `释放${direction === EDirection.DOWN ? '刷新' : '加载'}...`
    // 无数据提示
    if (!hasData) {
      activate =
        direction === EDirection.UP ? '我也是有底线的！' : '我也是有上线的！'
    }
    const defIndicator = {
      activate, // 拉去
      finish: activate, // 完成后的显示
      deactivate: activate, // 默认
      release: hasData ? <ReleaseIndicator /> : activate // 释放显示 开始刷新
    }

    return (
      <PullToRefresh
        className={`${style.customRefresh} wp100 hp100 oay sb`}
        refreshing={refreshing}
        direction={direction}
        distanceToRefresh={distanceToRefresh * dpr}
        onRefresh={this.onRefresh}
        damping={damping * dpr}
        indicator={{ ...defIndicator, ...indicator }}
      >
        {this.props.children}
      </PullToRefresh>
    )
  }
}

const ReleaseIndicator = () => (
  <div className="loading">
    {/* <img src={require('../../assets/images/loading.gif')} className="vat mr5" /> */}
    <Icon type="loading" size="xs" className="vat mr5" />
    Loading...
  </div>
)

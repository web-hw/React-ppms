import * as React from 'react'
import { Link } from 'react-router-dom'
import {} from 'antd-mobile'

import { Header } from '../../component/header'
const style = require('./style')

interface IPropsMyTaskFollow {}

interface IStateMyTaskFollow {}

export default class MyTaskFollow extends React.PureComponent<
  IPropsMyTaskFollow,
  IStateMyTaskFollow
> {
  render() {
    return (
      <div className="wp100 hp100 pr bsb pt50 fs0 bg-f0f0f0 oh">
        <Header>我的关注</Header>
        <div className="wp100 hp100 oay sb plr10 bsb">
          <div className={`${style.item} wp100 bg-fff mt5`}>
            <div className="title wp100 bsb">
              <div className="wp100 bsb">
                <span className="fl tes">【000023】系统维护与开发</span>
                <span className="fr tes">6天2小时后对接截止</span>
              </div>
            </div>
            <div className="content wp100 plr10 bsb">
              <div className="content-item bsb wp100">
                <span className="fl tes">
                  状态:<span className="ml5">招标中</span>
                </span>
                <span className="fr tes">
                  领域:<span className="ml5">元件组件</span>
                </span>
              </div>
              <div className="content-item bsb wp100">
                <span className="fl tes">
                  发布日期:<span className="ml5">2018-1-1</span>
                </span>
                <span className="fr tes">
                  分类:<span className="ml5">全部</span>
                </span>
              </div>
            </div>
            <div className="item-footer wp100 bsb ptb10">
              <Link to="/task-detail/follow" className="db ma tac fs12">
                详情
              </Link>
            </div>
          </div>
          <div className={`${style.item} wp100 bg-fff mt5`}>
            <div className="title wp100 bsb">
              <div className="wp100 bsb">
                <span className="fl tes">【000023】系统维护与开发</span>
                <span className="fr tes">6天2小时后对接截止</span>
              </div>
            </div>
            <div className="content wp100 plr10 bsb">
              <div className="content-item bsb wp100">
                <span className="fl tes">
                  状态:<span className="ml5">待对接</span>
                </span>
                <span className="fr tes">
                  领域:<span className="ml5">元件组件</span>
                </span>
              </div>
              <div className="content-item bsb wp100">
                <span className="fl tes">
                  发布日期:<span className="ml5">2018-1-1</span>
                </span>
                <span className="fr tes">
                  分类:<span className="ml5">全部</span>
                </span>
              </div>
            </div>
            <div className="item-footer wp100 bsb ptb10">
              <a href="javascript:void(0)" className="db ma tac fs12">
                详情
              </a>
            </div>
          </div>
          <div className={`${style.item} wp100 bg-fff mt5`}>
            <div className="title wp100 bsb">
              <div className="wp100 bsb">
                <span className="fl tes">【000023】系统维护与开发</span>
              </div>
            </div>
            <div className="content wp100 plr10 bsb">
              <div className="content-item bsb wp100">
                <span className="fl tes">
                  状态:<span className="ml5">中标</span>
                </span>
                <span className="fr tes">
                  领域:<span className="ml5">元件组件</span>
                </span>
              </div>
              <div className="content-item bsb wp100">
                <span className="fl tes">
                  发布日期:<span className="ml5">2018-1-1</span>
                </span>
                <span className="fr tes">
                  分类:<span className="ml5">全部</span>
                </span>
              </div>
            </div>
            <div className="item-footer wp100 bsb ptb10">
              <a href="javascript:void(0)" className="db ma tac fs12">
                详情
              </a>
            </div>
          </div>
          <div className={`${style.item} wp100 bg-fff mt5`}>
            <div className="title wp100 bsb">
              <div className="wp100 bsb">
                <span className="fl tes">【000023】系统维护与开发</span>
              </div>
            </div>
            <div className="content wp100 plr10 bsb">
              <div className="content-item bsb wp100">
                <span className="fl tes">
                  状态:<span className="ml5">已完成</span>
                </span>
                <span className="fr tes">
                  领域:<span className="ml5">元件组件</span>
                </span>
              </div>
              <div className="content-item bsb wp100">
                <span className="fl tes">
                  发布日期:<span className="ml5">2018-1-1</span>
                </span>
                <span className="fr tes">
                  分类:<span className="ml5">全部</span>
                </span>
              </div>
            </div>
            <div className="item-footer wp100 bsb ptb10">
              <a href="javascript:void(0)" className="db ma tac fs12">
                详情
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

import * as React from 'react'
import {} from 'react-router-dom'
import { Input } from 'antd'

const style = require('./style')

interface IPropsHeader {}

interface IStateHeader {}

export default class Header extends React.PureComponent<
  IPropsHeader,
  IStateHeader
> {
  render() {
    return (
      <header
        className={`${style.header} cb-header wp100 palt bsb plr20 zi700`}
      >
        <div className="header-logo wp100">
          <a className="fl" href="javascript:void(0);">
            <img
              className="hp100 mr10"
              src={require('../../../assets/images/logo.png')}
            />
            项目管理与运营(PMO)系统
          </a>
          <div className="fr">
            <span>某某,下午好!</span>
            <a href="javascript:void(0);">个人设置</a>
            <a href="javascript:void(0);">系统设置</a>
            <a href="javascript:void(0);">在线反馈</a>
            <a href="javascript:void(0);">使用帮助</a>
            <a href="javascript:void(0);">
              消息<em className="msg tes">9</em>
            </a>
          </div>
        </div>
        <div className="header-menu wp100">
          <div className="fl">
            <a className="active" href="javascript:void(0);">
              工作台
            </a>
            <a href="javascript:void(0);">业务中心</a>
            <a href="javascript:void(0);">流程审批</a>
            <a href="javascript:void(0);">工作协同</a>
            <a href="javascript:void(0);">管理中心</a>
          </div>
          <div className="fr">
            <Input.Search
              placeholder="搜索菜单"
              onSearch={(val: any) => console.log(val)}
            />
          </div>
        </div>
      </header>
    )
  }
}

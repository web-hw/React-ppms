import * as React from 'react'
import {} from 'react-router-dom'
import {} from 'antd'

import { Routes, E_CREATE_ROUTE_PARENT } from '../../../router'
const style = require('./style')

interface IPropsSettingSystem {
  childrenRoute: { [propName: string]: any }
}

interface IStateSettingSystem {}

export default class SettingSystem extends React.PureComponent<
  IPropsSettingSystem,
  IStateSettingSystem
> {
  render() {
    return (
      <div className="wp100 hp100">
        <Routes parent={E_CREATE_ROUTE_PARENT.PARENT_SETTING_SYSTEM} />
      </div>
    )
  }
}

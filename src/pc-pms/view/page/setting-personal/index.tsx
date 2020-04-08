import * as React from 'react'
import {} from 'react-router-dom'
import {} from 'antd'

import { Routes, E_CREATE_ROUTE_PARENT } from '../../../router'
const style = require('./style')

interface IPropsSettingPersonal {}

interface IStateSettingPersonal {}

export default class SettingPersonal extends React.PureComponent<
  IPropsSettingPersonal,
  IStateSettingPersonal
> {
  render() {
    return (
      <div className="wp100 hp100">
        <Routes parent={E_CREATE_ROUTE_PARENT.PARENT_SETTING_PERSONAL} />
      </div>
    )
  }
}

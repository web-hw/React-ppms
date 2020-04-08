import * as React from 'react'
import {} from 'react-router-dom'
import {} from 'antd'

import { Routes, E_CREATE_ROUTE_PARENT } from '../../../../router'
const style = require('./style')

interface IPropsShortcutMenu {}

interface IStateShortcutMenu {}

export default class ShortcutMenu extends React.PureComponent<
  IPropsShortcutMenu,
  IStateShortcutMenu
> {
  render() {
    return (
      <div className="wp100 hp100">
        快捷菜单
        {/* <Routes parent={E_CREATE_ROUTE_PARENT.PARENT_WORK_SHORTCUT_MENU}/> */}
      </div>
    )
  }
}

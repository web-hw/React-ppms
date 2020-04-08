import * as React from 'react'
import {} from 'react-router-dom'
import {} from 'antd'

import { Routes, E_CREATE_ROUTE_PARENT } from '../../../../router'
const style = require('./style')

interface IPropsMember {
  childrenRoute: { [propName: string]: any }
}

interface IStateMember {}

export default class Member extends React.PureComponent<
  IPropsMember,
  IStateMember
> {
  render() {
    return (
      <div className="wp100 hp100">
        <Routes parent={E_CREATE_ROUTE_PARENT.PARENT_SETTING_SYSTEM_MEMBER} />
      </div>
    )
  }
}

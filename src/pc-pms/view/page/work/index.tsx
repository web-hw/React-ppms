import * as React from 'react'
import {} from 'react-router-dom'
import {} from 'antd'

import { Routes, E_CREATE_ROUTE_PARENT } from '../../../router'
const style = require('./style')

interface IPropsWork {}

interface IStateWork {}

export default class Work extends React.PureComponent<IPropsWork, IStateWork> {
  render() {
    return (
      <div className="wp100 hp100">
        <Routes parent={E_CREATE_ROUTE_PARENT.PARENT_WORK} />
      </div>
    )
  }
}

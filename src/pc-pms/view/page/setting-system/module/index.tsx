import * as React from 'react'
import {} from 'react-router-dom'
import {} from 'antd'

const style = require('./style')

interface IPropsModule {}

interface IStateModule {}

export default class Module extends React.PureComponent<
  IPropsModule,
  IStateModule
> {
  render() {
    return <div>module</div>
  }
}

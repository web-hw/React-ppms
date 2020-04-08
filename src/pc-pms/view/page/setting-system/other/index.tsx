import * as React from 'react'
import {} from 'react-router-dom'
import {} from 'antd'

const style = require('./style')

interface IPropsOther {}

interface IStateOther {}

export default class Other extends React.PureComponent<
  IPropsOther,
  IStateOther
> {
  render() {
    return <div>other</div>
  }
}

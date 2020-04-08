import * as React from 'react'
import {} from 'react-router-dom'
import {} from 'antd'

import Wrapper from '../wrapper'
const style = require('./style')

interface IPropsWrapperTable {
  title?: string
  titleIcon?: string
  moreLink?: string
  className?: string
  Header?: React.ReactNode
  Content?: React.ReactNode
  children?: React.ReactNode
}

interface IStateWrapperTable {}

export default class WrapperTable extends React.PureComponent<
  IPropsWrapperTable,
  IStateWrapperTable
> {
  render() {
    return <Wrapper className={style.tableWrapper} {...this.props} />
  }
}

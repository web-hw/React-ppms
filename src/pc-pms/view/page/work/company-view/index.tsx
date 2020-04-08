import * as React from 'react'
import {} from 'react-router-dom'
import {} from 'antd'

const style = require('./style')

interface IPropsCompanyView {}

interface IStateCompanyView {}

export default class CompanyView extends React.PureComponent<
  IPropsCompanyView,
  IStateCompanyView
> {
  render() {
    return <div className="wp100 hp100">公司视图</div>
  }
}

import * as React from 'react'
import {} from 'react-router-dom'
import {} from 'antd'

const style = require('./style')

interface IPropsDepartmentView {}

interface IStateDepartmentView {}

export default class DepartmentView extends React.PureComponent<
  IPropsDepartmentView,
  IStateDepartmentView
> {
  render() {
    return <div className="wp100 hp100">部门视图</div>
  }
}

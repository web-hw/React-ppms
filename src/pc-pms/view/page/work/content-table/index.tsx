import * as React from 'react'
import {} from 'react-router-dom'
import {} from 'antd'

import Table, { TColumn, TData } from '../../../../component/table'
const style = require('./style')

interface IPropsContentTable {
  columns: TColumn[]
  data: TData[]
  loading?: boolean
  leftLeft: React.ReactNode
  leftRight: React.ReactNodeArray
  rightLeft: React.ReactNode
  rightRight: React.ReactNodeArray
}

interface IStateContentTable {}

export default class ContentTable extends React.PureComponent<
  IPropsContentTable,
  IStateContentTable
> {
  render() {
    const {
      columns,
      data,
      loading = false,
      leftLeft = null,
      leftRight = null,
      rightLeft = null,
      rightRight = null
    } = this.props

    return (
      <div className={`${style.contentTable} wp100 hp100 pr bsb`}>
        <div className="total-header wp100 bsb palt">
          <div className="left wp100 hp100 pr">
            {leftLeft}
            <div className="total wp100 hp100 pr">
              <div className="wp100">{leftRight}</div>
            </div>
          </div>
          <div className="right part">
            {rightLeft}
            <div className="wp100 hp100">{rightRight}</div>
          </div>
        </div>
        <div className="wp100 hp100">
          <Table columns={columns} data={data} loading={loading} />
        </div>
      </div>
    )
  }
}

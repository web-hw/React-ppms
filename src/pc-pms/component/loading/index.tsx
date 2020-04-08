import * as React from 'react'
import {} from 'react-router-dom'
import { Spin, Icon } from 'antd'
import { SpinProps } from 'antd/es/spin'

const style = require('./style')

interface IPropsLoading extends SpinProps {}

interface IStateLoading {}

export default class Loading extends React.PureComponent<
  IPropsLoading,
  IStateLoading
> {
  render() {
    return (
      <div className={`${style.loading} wp100 hp100`}>
        <Spin
          indicator={
            <Icon type="loading" style={{ fontSize: 24 }} spin={true} />}
          {...this.props}
        />
      </div>
    )
  }
}

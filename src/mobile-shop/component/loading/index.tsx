import * as React from 'react'
import {} from 'react-router-dom'
import { Icon } from 'antd-mobile'

const style = require('./style')

interface IPropsLoading {
  spinning: boolean
  className?: string
  size?: 'xxs' | 'xs' | 'sm' | 'md' | 'lg'
  color?: string
  indicator?: React.ReactNode
}

interface IStateLoading {}

export default class Loading extends React.PureComponent<
  IPropsLoading,
  IStateLoading
> {
  render() {
    const {
      spinning,
      indicator,
      children,
      className = '',
      size = 'md',
      color = '#000'
    } = this.props

    return (
      <div className={`${style.cbLoading} wp100 hp100 pr ${className}`}>
        {children}
        {spinning ? (
          <div className={`${style.loading} zi1000 wp100 hp100 palt`}>
            <span className="mc">
              {indicator ? (
                indicator
              ) : (
                <Icon type="loading" size={size} color={color} />
              )}
            </span>
          </div>
        ) : null}
      </div>
    )
  }
}

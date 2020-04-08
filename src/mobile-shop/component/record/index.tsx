import * as React from 'react'
import {} from 'react-router-dom'
import {} from 'antd-mobile'

const style = require('./style')

interface IPropsRecord {
  status: 'record' | 'recording' | 'recordCancel'
  className?: string
  info: {
    info?: string
    warn?: string
    icon?: string
  }
}

interface IStateRecord {}

export default class Record extends React.PureComponent<
  IPropsRecord,
  IStateRecord
> {
  render() {
    const { status = 'record', className = '' } = this.props
    const info: any = this.props.info || {}

    return (
      <div
        className={`${style.record} ${
          status !== 'record' ? 'active' : ''
        } wp100 hp100 ${className}`}
      >
        <div className="wp100 hp100 pr">
          <div className="content mc p10 bsb">
            {status === 'recording' ? (
              <div className="icon">
                <img src={info.icon} />
                <em style={{ animationName: style.recordAni }} />
              </div>
            ) : status === 'recordCancel' ? (
              <div className="icon">
                <img src={info.icon} />
              </div>
            ) : null}
            <p className="fs16 tac fs-fff">{info.warn || ''}</p>
          </div>
        </div>
      </div>
    )
  }
}

import * as React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { InputItem } from 'antd-mobile'

import { PHONE_LOCATION } from 'global@constant'
const style = require('./style')

interface IPropsInputPhone extends RouteComponentProps {
  className?: string
  value: string
  onChange: (value: string) => void
}

interface IStateInputPhone {
  location: string // 手机号前缀
}

export default withRouter(
  class extends React.PureComponent<IPropsInputPhone, IStateInputPhone> {
    private _cbInput: any = null
    private _input: any = null

    // 去选择手机号前缀
    private onGoLocation() {
      // const from = this.props.location.pathname
      // this.props.history.replace(`/phone-location/${encodeURIComponent(from)}`)
    }

    constructor(props: IPropsInputPhone) {
      super(props)

      const state: any = this.props.location.state || {}
      this.state = {
        location: state.location || PHONE_LOCATION
      }

      this.onGoLocation = this.onGoLocation.bind(this)
    }

    render() {
      const { value, onChange, className = '' } = this.props
      return (
        <div
          ref={el => (this._cbInput = el)}
          className={`${className} cb-input`}
        >
          <InputItem
            // type="digit"
            placeholder="请输入绑定手机号码"
            onChange={onChange}
            value={value}
          >
            <span className="db hp100 pr15 pr" onClick={this.onGoLocation}>
              <span className="db oh">{this.state.location}</span>
              <em
                className="down-icon"
                style={{
                  backgroundImage: `url(${require('../../assets/images/register-down-icon.png')})`
                }}
              />
            </span>
          </InputItem>
        </div>
      )
    }
  }
)

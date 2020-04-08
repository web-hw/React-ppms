import * as React from 'react'
import { observer, inject } from 'mobx-react'
import { RouteComponentProps } from 'react-router-dom'
import { Icon } from 'antd-mobile'
import moment from 'moment'

import User from '../../store/user'
import { Header } from '../../component/header'
const style = require('./style')

interface IPropsAccountInfo extends RouteComponentProps {
  user: User
}

interface IStateAccountInfo {}

@inject('user')
@observer
export default class AccountInfo extends React.Component<
  IPropsAccountInfo,
  IStateAccountInfo
> {
  render() {
    const { info = {} } = this.props.user

    return (
      <div
        className={`${style.accountInfo} bg-f0f0f0 wp100 hp100 bsb pt50 fs0 oh`}
      >
        <Header>账号信息</Header>
        <div className="wp100 hp100 oay sb">
          <div className="item wp100 bsb pr">
            <span className="label palt hp100 tes">账号</span>
            <div className="content wp100 hp100 pr bsb tes">{info.name}</div>
          </div>
          <div
            onClick={() => this.props.history.replace('/update-phone')}
            className="item wp100 bsb pr"
          >
            <span className="label palt hp100 tes">手机号</span>
            <div className="content wp100 hp100 pr bsb tes">
              修改
              <Icon className="part" type="right" size="md" color="#333" />
            </div>
          </div>
          <div
            onClick={() => this.props.history.replace('/update-pwd')}
            className="item wp100 bsb pr"
          >
            <span className="label palt hp100 tes">密码</span>
            <div className="content wp100 hp100 pr bsb tes">
              修改
              <Icon className="part" type="right" size="md" color="#333" />
            </div>
          </div>
          {info.last_time && (
            <div className="login-time item wp100 bsb pr">
              <div className="content wp100 hp100 pr bsb tes">
                上次登录: {moment(info.last_time).format('YYYY-MM-DD HH:mm:ss')}
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
}

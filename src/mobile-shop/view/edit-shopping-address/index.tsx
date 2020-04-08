import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { InputItem, Icon, TextareaItem, Switch } from 'antd-mobile'

import { PHONE_LOCATION } from 'global@constant'
import { Header } from '../../component/header'
const style = require('./style')

interface IPropsEditShoppingAddress extends RouteComponentProps {}

interface IStateEditShoppingAddress {
  name: string
  phone: string
  phonePrefix: string
  position: string
  address: string
  isDef: boolean
}

export default class EditShoppingAddress extends React.PureComponent<
  IPropsEditShoppingAddress,
  IStateEditShoppingAddress
> {
  private _id: string = null
  private _contactIcon: string = require('../../assets/images/addr-contact-icon.png')

  // 跳转
  private onJump(url: string) {
    this.props.history.push(
      `${url}/${encodeURIComponent(this.props.match.url)}`
    )
  }

  constructor(props: IPropsEditShoppingAddress) {
    super(props)

    const {
      location = PHONE_LOCATION,
      province = {},
      city = {},
      area = {}
    }: any = this.props.location.state || {}
    this.state = {
      name: '',
      phone: '',
      phonePrefix: location,
      position: `${province.name || ''} ${city.name || ''} ${area.name ||
        ''}`.trim(),
      address: '',
      isDef: false
    }

    const params: any = this.props.match.params
    this._id = params.id || null
  }

  render() {
    return (
      <div
        className={`${
          style.editShoppingAddress
        } wp100 hp100 fs0 pt50 bsb pr oh`}
      >
        <Header right={<span>保存</span>}>
          {this._id ? '编辑' : '添加'}收货地址
        </Header>
        <div className="wp100 hp100 oay sb">
          <div className="item plr15 bsb wp100 cb-input bg-fff">
            <InputItem
              placeholder="请输入"
              value={this.state.name}
              onChange={name => this.setState({ name })}
              extra={
                <span
                  className={style.icon}
                  style={{ backgroundImage: `url(${this._contactIcon})` }}
                />
              }
            >
              收货人
            </InputItem>
          </div>
          <div className="item plr15 bsb wp100 cb-input bg-fff label2">
            <InputItem
              type="digit"
              placeholder="请输入"
              value={this.state.phone}
              onChange={phone => this.setState({ phone })}
              extra={<Icon type="right" size="md" />}
              onExtraClick={() => this.onJump('/phone-location')}
            >
              手机号码<span className="db tac">{this.state.phonePrefix}</span>
            </InputItem>
          </div>
          <div
            className="item plr15 bsb wp100 cb-input bg-fff"
            onClick={() => this.onJump('/my-position-select')}
          >
            <InputItem
              placeholder="请选择"
              disabled={true}
              value={this.state.position}
              extra={<Icon type="right" size="md" />}
            >
              所在地区
            </InputItem>
          </div>
          <div className="item pl15 pr15 pt10 pb10 bsb wp100 cb-input bg-fff">
            <TextareaItem
              value={this.state.address}
              onChange={address => this.setState({ address })}
              title="详细地址"
              placeholder="请输入（如：道路、门牌号、小区、楼栋号、单元室等）"
            />
          </div>
          <div className="item plr15 bsb wp100 cb-input bg-fff label120">
            <InputItem
              disabled={true}
              extra={
                <Switch
                  checked={this.state.isDef}
                  onChange={() => this.setState({ isDef: !this.state.isDef })}
                />
              }
            >
              设为默认地址
            </InputItem>
          </div>
        </div>
      </div>
    )
  }
}

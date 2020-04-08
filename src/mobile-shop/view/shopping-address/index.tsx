import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Button } from 'antd-mobile'

import { Header } from '../../component/header'
import { EllipsisPopover } from '../../component/popover'
const style = require('./style')

interface IPropsShoppingAddress extends RouteComponentProps {}

interface IStateShoppingAddress {
  address: any[]
}

export default class ShoppingAddress extends React.PureComponent<
  IPropsShoppingAddress,
  IStateShoppingAddress
> {
  private _editIcon = require('../../assets/images/sp-adrs-edit.png')
  private _deleteIcon = require('../../assets/images/sp-adrs-delete.png')
  private _actIcon = require('../../assets/images/sp-adrs-act.png')
  private _defIcon = require('../../assets/images/sp-adrs-def.png')

  private onDeleteAddress(id: string) {}

  private onJumpEditAddress(id?: string) {
    this.props.history.push(`/edit-shipping-address${id ? `/${id}` : ''}`)
  }

  private onSwitchDefAddress(address: any) {}

  constructor(props: IPropsShoppingAddress) {
    super(props)

    this.state = {
      address: [
        {
          name: '啦啦啦',
          phone: 13408226449,
          address: '四川省成都市高新西区西芯大道5号国腾科技园',
          isDef: true
        },
        {
          name: '啦啦啦',
          phone: 13408226449,
          address: '四川省成都市高新西区西芯大道5号国腾科技园',
          isDef: false
        },
        {
          name: '啦啦啦',
          phone: 13408226449,
          address: '四川省成都市高新西区西芯大道5号国腾科技园',
          isDef: false
        },
        {
          name: '啦啦啦',
          phone: 13408226449,
          address: '四川省成都市高新西区西芯大道5号国腾科技园',
          isDef: false
        },
        {
          name: '啦啦啦',
          phone: 13408226449,
          address: '四川省成都市高新西区西芯大道5号国腾科技园',
          isDef: false
        },
        {
          name: '啦啦啦',
          phone: 13408226449,
          address:
            '四川省成都市高新西区西芯大道5号国腾科技园四川省成都市高新西区西芯大道5号国腾科技园四川省成都市高新西区西芯大道5号国腾科技园',
          isDef: false
        }
      ]
    }
  }

  render() {
    return (
      <div
        className={`${style.shippingAddress} wp100 hp100 fs0 pt50 bsb pr oh`}
      >
        <Header
          right={
            <EllipsisPopover
              onSelect={() => {}}
              items={[
                { title: '产品' },
                { title: '发现' },
                { title: '购物车' },
                { title: '我的' }
              ]}
            />
          }
        >
          收货地址
        </Header>
        <div className="wp100 hp100 oay sb">
          {this.state.address.map((item, idx) => (
            <div
              key={idx}
              className={`${style.item} bg-fff pl15 pr15 pt5 pb10 bsb wp100`}
            >
              <h6 className="fw400 fs14">
                <span className="fl tes">{item.name}</span>
                <span className="fr tes">{item.phone}</span>
              </h6>
              <div className="address tes2 fs13">{item.address}</div>
              <div className="ope fs12">
                <span
                  onClick={() => this.onSwitchDefAddress(item)}
                  className={`fl ${item.isDef ? 'active' : ''}`}
                >
                  <em
                    className="mr5"
                    style={{
                      backgroundImage: `url(${
                        item.isDef ? this._actIcon : this._defIcon
                      })`
                    }}
                  />
                  默认地址
                </span>
                <span className="fr">
                  <span
                    onClick={() => this.onJumpEditAddress(item.id)}
                    style={{ backgroundImage: `url(${this._editIcon})` }}
                  >
                    编辑
                  </span>
                  <span
                    onClick={() => this.onDeleteAddress(item.id)}
                    style={{ backgroundImage: `url(${this._deleteIcon})` }}
                  >
                    删除
                  </span>
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className={`${style.footer} wp100 pt15 pb15 pl10 pr10 bsb palb`}>
          <Button onClick={() => this.onJumpEditAddress()} className="cb-btn">
            新增收货地址
          </Button>
        </div>
      </div>
    )
  }
}

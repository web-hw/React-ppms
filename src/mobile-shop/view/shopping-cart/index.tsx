import * as React from 'react'
import {} from 'react-router-dom'
import { Button, Stepper } from 'antd-mobile'

import { Header } from '../../component/header'
const style = require('./style')

interface IPropsShoppingCart {}

interface IStateShoppingCart {
  goods: any[]
  opeType: E_OPE_TYPE
}

enum E_OPE_TYPE {
  START = 'start',
  FINISH = 'finish'
}

export default class ShoppingCart extends React.PureComponent<
  IPropsShoppingCart,
  IStateShoppingCart
> {
  private _selDefIcon = require('../../assets/images/sp-adrs-def.png')
  private _selActIcon = require('../../assets/images/sp-adrs-act.png')

  private onChangeNum(val: any, platId: any, goodId: any) {
    // 是否為整數
    if (!Number.isInteger(val)) {
      return
    }

    // 更新值
    const { goods } = this.state
    const plat = goods.find(plat => plat.id === platId)
    if (!plat || !plat.data) {
      return
    }
    const good = plat.data.find((good: any) => good.id === goodId)
    if (!good) {
      return
    }
    good.num = val

    this.setState({ goods: [].concat(goods) })
  }

  private onClickOpe() {
    const { opeType } = this.state
    switch (opeType) {
      case E_OPE_TYPE.START:
        return this.setState({ opeType: E_OPE_TYPE.FINISH })
      case E_OPE_TYPE.FINISH:
        return this.setState({ opeType: E_OPE_TYPE.START })
    }
  }

  constructor(props: IPropsShoppingCart) {
    super(props)

    this.state = {
      opeType: E_OPE_TYPE.START,
      goods: [
        {
          label: '平台自营',
          id: 1,
          data: [
            {
              img: require('../../assets/images/test.png'),
              name: '多通道模拟图像采集存储系统',
              model: 'GDC123',
              price: '370.44',
              num: 1,
              id: 1
            },
            {
              img: require('../../assets/images/test.png'),
              name: '多通道模拟图像采集存储系统',
              model: 'GDC123',
              price: '370.44',
              num: 1,
              id: 2
            }
          ]
        },
        {
          label: '平台自营',
          id: 2,
          data: [
            {
              img: require('../../assets/images/test.png'),
              name: '多通道模拟图像采集存储系统',
              model: 'GDC123',
              price: '370.44',
              num: 1,
              id: 1
            }
          ]
        },
        {
          label: '平台自营',
          id: 3,
          data: [
            {
              img: require('../../assets/images/test.png'),
              name: '多通道模拟图像采集存储系统',
              model: 'GDC123',
              price: '370.44',
              num: 1,
              id: 1
            }
          ]
        },
        {
          label: '平台自营',
          id: 4,
          data: [
            {
              img: require('../../assets/images/test.png'),
              name: '多通道模拟图像采集存储系统',
              model: 'GDC123',
              price: '370.44',
              num: 1,
              id: 1
            }
          ]
        }
      ]
    }

    this.onClickOpe = this.onClickOpe.bind(this)
  }

  render() {
    return (
      <div
        className={`${style.shoppingCart} wp100 hp100 fs0 pt50 pb50 bsb pr oh`}
      >
        <Header
          right={
            <span onClick={this.onClickOpe}>
              {this.state.opeType === E_OPE_TYPE.FINISH ? '完成' : '管理'}
            </span>}
        >
          购物车
        </Header>
        <div className="wp100 hp100 oay sb pb10 bsb">
          <div className={`${style.total} wp100 plr15 bsb fs12 bg-fff`}>
            累计4件商品
          </div>
          {this.state.goods.map((good, index) => (
            <div key={index} className={`${style.item} wp100`}>
              <h6 className="fw400 wp100 bsb fw700">
                <span
                  className="cb-sel fs12"
                  style={{ backgroundImage: `url(${this._selDefIcon})` }}
                >
                  {good.label}
                </span>
              </h6>
              <div className="wp100 bsb bg-fff plr15">
                {good.data.map((itm: any, idx: number) => (
                  <div key={`${index}-${idx}`} className="item wp100 bsb pr">
                    <div className="palt">
                      <span
                        className="cb-sel"
                        style={{ backgroundImage: `url(${this._selActIcon})` }}
                      />
                      <span
                        className="bsb img part"
                        style={{
                          backgroundImage: `url(${itm.img})`
                        }}
                      />
                    </div>
                    <div className="title wp100 tes fs12">{itm.name}</div>
                    <div className="desc wp100 tes fs12">
                      <span className="mr5">型号:</span>
                      {itm.model}
                    </div>
                    <div className="desc wp100 tes fs12">
                      <span className="fl price">￥{itm.price}</span>
                      <Stepper
                        className="cb-stepper fr"
                        value={itm.num}
                        showNumber={true}
                        max={99}
                        min={1}
                        onChange={(val: any) =>
                          this.onChangeNum(val, good.id, itm.id)
                        }
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className={`${style.footer} wp100 palb bsb bg-fff`}>
          <div className="wp100 hp100 bsb plr15">
            <span
              className="cb-sel fl fs12 mt15"
              style={{ backgroundImage: `url(${this._selDefIcon})` }}
            >
              全选
            </span>
            {this.state.opeType === E_OPE_TYPE.START && (
              <span className="fr mt15">
                <span className="fs10 mr5">不含运费</span>
                <span className="fs12 fw700">
                  合计:<span className="ml5 price">￥740.88</span>
                </span>
              </span>
            )}
          </div>
          {this.state.opeType === E_OPE_TYPE.FINISH ? (
            <Button className="cb-btn part">删除(2)</Button>
          ) : (
            <Button className="cb-btn part">去结算(1000)</Button>
          )}
        </div>
      </div>
    )
  }
}

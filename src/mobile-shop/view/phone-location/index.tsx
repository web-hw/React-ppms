import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import {} from 'antd-mobile'

import LetterSort from '../../component/letter-sort'
import { Header } from '../../component/header'
const style = require('./style')

interface IPropsPhoneLocation extends RouteComponentProps {}

interface IStatePhoneLocation {}

export default class PhoneLocation extends React.PureComponent<
  IPropsPhoneLocation,
  IStatePhoneLocation
> {
  // 字母
  private _letters: string[] = null
  private _locations: any = null

  // 初始化联系人
  private initLocations() {
    const letters: string[] = [] // mnopqrstuvwxyz
    this._locations = 'abcdefghijklmnopqrstuvwxyz'
      .split('')
      .map((item: any, index: number) => {
        letters.push(item.toUpperCase())
        return {
          upper: item.toUpperCase(),
          lower: item.toLowerCase(),
          data: [
            {
              id: index,
              name: '中国',
              location: '+86'
            }
          ]
        }
      })
    this._letters = letters
  }

  // 选择
  private onSelectLocation(item?: any) {
    const location = (item || {}).location || ''
    const params: any = this.props.match.params
    const from = params.from

    this.props.history.replace(decodeURIComponent(from), { location })
  }

  constructor(props: IPropsPhoneLocation) {
    super(props)

    this.initLocations()
  }

  render() {
    return (
      <div
        className={`${
          style.phoneLocation
        } wp100 hp100 bg-f0f0f0 fs0 pt50 bsb pr oh`}
      >
        <Header onClickLeft={() => this.onSelectLocation()}>
          选择手机号归属地
        </Header>
        <LetterSort letters={this._letters} icon="">
          <div data-anchor="#" className="wp100">
            <h6 className="cb-contact-title">热门</h6>
            <div className="wp100 bg-fff pl10 pr40 bsb">
              <div className={`${style.item}`}>
                <span className="fl">中国</span>
                <span className="fr">+86</span>
              </div>
              <div className={`${style.item}`}>
                <span className="fl">中国</span>
                <span className="fr">+86</span>
              </div>
            </div>
          </div>
          {this._locations.map((lct: any, i: number) => (
            <div key={i} data-anchor={lct.lower} className="wp100">
              <h6 className="cb-contact-title">{lct.upper}</h6>
              <div className="wp100 bg-fff pl10 pr40 bsb">
                {lct.data.map((itm: any, idx: number) => (
                  <div
                    key={`${i}-${idx}`}
                    className={`${style.item}`}
                    onClick={() => this.onSelectLocation(itm)}
                  >
                    <span className="fl">{itm.name}</span>
                    <span className="fr">{itm.location}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </LetterSort>
      </div>
    )
  }
}

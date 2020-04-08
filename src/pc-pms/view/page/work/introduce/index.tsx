import * as React from 'react'
import {} from 'react-router-dom'
import { Icon } from 'antd'

import Image from 'global@component/image'
import { getAMap } from 'global@util/amap'
import Loading from '../../../../component/loading'
import Wrapper from '../wrapper'
const style = require('./style')

interface IPropsIntroduce {
  type: 'department' | 'company'
}

interface IStateIntroduce {
  loading: boolean
}

class AMap extends React.PureComponent<any, any> {
  private async initAMap() {
    try {
      const AMap: any = await getAMap()
      // 初始化地图
      const amap = new AMap.Map('amap', {
        resizeEnable: true,
        zoom: 16
      })

      const address = '四川省成都市高新西区新创路2号'

      AMap.plugin('AMap.Geocoder', () => {
        new AMap.Geocoder({ city: '全国' }).getLocation(
          address,
          (status: string, result: any) => {
            if (status === 'complete' && result.info === 'OK') {
              const target = result.geocodes || []
              const { lat, lng } = (target[0] || {}).location || {}

              if (lat && lng) {
                const pos = new AMap.LngLat(lng, lat)
                amap.setCenter(pos)

                const marker = new AMap.Marker({
                  position: pos
                })
                marker.on('mouseover', () =>
                  marker.setLabel({
                    direction: 'center',
                    content: `
                    <div class="amap-address-info">
                      <div>单位地址: 四川省成都市高新西区新创路2号</div>
                      <div>邮 编: 611731 </div>
                      <div>联系电话: 028-87830751</div>
                      <div>传 真: 028-87826039</div>
                    </div>
                    `
                  })
                )
                marker.on('mouseout', () => marker.setLabel(null))
                amap.add(marker)
              }
            }
          }
        )
      })
    } catch (err) {
      console.log(err)
    }
  }

  componentDidMount() {
    this.initAMap()
  }

  render() {
    return <div id="amap" className="wp100 hp100 pr" />
  }
}

export default class Introduce extends React.PureComponent<
  IPropsIntroduce,
  IStateIntroduce
> {
  constructor(props: IPropsIntroduce) {
    super(props)

    this.state = {
      loading: false
    }
  }

  render() {
    const { type } = this.props

    return (
      <Wrapper
        className={style.introduce}
        Header={
          <div className="wrapper-header">
            <div className="fl tes">
              <em className="icon" />
              研发部
            </div>
            <div className="fr more cp" onClick={null}>
              查看更多
              <Icon type="right" style={{ fontSize: 16 }} />
            </div>
          </div>
        }
        Content={
          <div className={`${style.content} wp100 hp100 bsb pt10`}>
            {type === 'department' ? (
              <div className="wp100 hp100 pr bsb">
                <Image
                  className="img"
                  url={require('../../../../assets/images/test1.png')}
                />
                <div className="wp100 hp100 pr">
                  <div className="content fs12 wp100 mc">
                    四川赛狄信息技术股份公司成立于2003年，注册资本1020万元。
                    公司以软件无线电为发展导向，长期专注于数字化、信息化领
                    域中基于高速嵌入
                    四川赛狄信息技术股份公司成立于2003年，注册资本1020万元。
                    公司以软件无线电为发展导向，长期专注于数字化、信息化领
                    域中基于高速嵌入
                    四川赛狄信息技术股份公司成立于2003年，注册资本1020万元。
                    公司以软件无线电为发展导向，长期专注于数字化、信息化领
                    域中基于高速嵌入
                    四川赛狄信息技术股份公司成立于2003年，注册资本1020万元。
                    公司以软件无线电为发展导向，长期专注于数字化、信息化领
                    域中基于高速嵌入
                    四川赛狄信息技术股份公司成立于2003年，注册资本1020万元。
                    公司以软件无线电为发展导向，长期专注于数字化、信息化领
                    域中基于高速嵌入
                  </div>
                </div>
              </div>
            ) : (
              [
                <div key="des" className="company wp100 pr bsb">
                  <Image
                    className="img"
                    url={require('../../../../assets/images/test1.png')}
                  />
                  <div className="wp100 hp100 pr">
                    <div className="content fs12 wp100 mc">
                      四川赛狄信息技术股份公司成立于2003年，注册资本1020万元。
                      公司以软件无线电为发展导向，长期专注于数字化、信息化领
                      域中基于高速嵌入
                    </div>
                  </div>
                </div>,
                <div key="map" className="amap wp100 bsb pt10">
                  <Loading spinning={true}>
                    <AMap />
                  </Loading>
                </div>
              ]
            )}
          </div>}
      />
    )
  }
}

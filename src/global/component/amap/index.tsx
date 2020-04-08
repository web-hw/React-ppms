import * as React from 'react'
import { Icon, Button } from 'antd-mobile'

import {
  getPlacesOfNearByAMap,
  getPlacesByKeywordByAMap
} from 'global@util/amap'

const style = require('./style')

export class AMapSend extends React.Component {
  // 高德地图对象
  private _AMap: any = null
  // 当前地图对象
  private _amap: any = null
  // 中心marker
  private _markerCenter: any = null

  // 初始化
  private init() {
    const win: any = window
    this._AMap = win.AMap
  }

  // 加载地图
  private loadAMap() {
    const AMap = this._AMap
    if (!AMap) {
      return
    }

    // 加载地图
    this._amap = new AMap.Map('amap', {
      zoom: 14
    })
    this.getPosition()
  }

  // 移动中心点的标记
  private moveMarker() {
    const amap = this._amap
    if (!amap) {
      return
    }

    // 添加拖动事件
    amap.on('dragging', () => {
      const pos = amap.getCenter()
      this._markerCenter.setPosition([pos.lng, pos.lat])
    })
    amap.on('dragend', (e: any) => {
      const pos = amap.getCenter()
      this._markerCenter.setPosition([pos.lng, pos.lat])
      // this.searchNear([pos.lng, pos.lat])
      getPlacesOfNearByAMap([pos.lng, pos.lat])
    })
  }

  // 附近搜索
  private searchNear(pos: any) {
    const AMap = this._AMap
    if (!AMap) {
      return
    }
    AMap.service(['AMap.PlaceSearch'], () => {
      // 构造地点查询类
      const placeSearch = new AMap.PlaceSearch({
        type: `汽车服务|汽车销售|汽车维修|摩托车服务|餐饮服务|购物服务
        |生活服务|体育休闲服务|医疗保健服务|住宿服务|风景名胜|商务住宅
        |政府机构及社会团体|科教文化服务|交通设施服务|金融保险服务
        |公司企业|道路附属设施|地名地址信息|公共设施`, // 兴趣点类别
        pageSize: 30, // 单页显示结果条数
        pageIndex: 1 // 页码
      })

      placeSearch.searchNearBy('', pos, 10000, (status: any, result: any) => {
        console.log(status, result)
      })
    })
  }

  // 自定义图片标记
  private getImgMarker(position: number[], icon: string, ofst?: any) {
    const AMap = this._AMap
    if (!AMap) {
      return
    }

    // offset
    const offset = ofst || new AMap.Pixel(0, 0)

    return new AMap.Marker({ position, offset, icon })
  }

  // 定位
  private getPosition() {
    const amap = this._amap
    const AMap = this._AMap
    if (!amap) {
      return
    }
    amap.plugin('AMap.Geolocation', () => {
      // 定位对象
      const geolocation = new AMap.Geolocation({
        timeout: 10000,
        showButton: false
      })

      // 获取当前位置
      geolocation.getCurrentPosition()

      // 结果事件监听
      AMap.event.addListener(geolocation, 'complete', (data: any = {}) => {
        console.log(data)
        const position = data.position || {}
        const lat = position.lat
        const lng = position.lng
        if (lat && lng) {
          // 重置中心
          amap.setCenter([lng, lat])
          // 添加标记
          const icon = require('../../../mobile-shop/assets/images/pos.jpg')
          this._markerCenter = this.getImgMarker([lng, lat], icon)
          amap.add(this._markerCenter)
          // this.searchNear([lng, lat])
          getPlacesByKeywordByAMap('北京大学').then((res: any) => {
            console.log(res)
          })
          // 添加拖拽事件
          this.moveMarker()
        }
      })
      AMap.event.addListener(geolocation, 'error', (err: Error) => {
        console.log(err)
      })
    })
  }

  constructor(props: any) {
    super(props)
    this.init()
  }

  componentDidMount() {
    this.loadAMap()
  }

  render() {
    return (
      <div className={`${style.amapSend} wp100 hp100 pr bsb`}>
        <header className={`${style.header} wp100 pflt pr10 bsb`}>
          <div className="fl">
            <span className="mr10">
              <Icon type="left" size="md" color="#aaa" className="prt-1 vam" />
            </span>
            位置
          </div>
          <div className="fr wp50 tar">
            <span className="mr10">
              <Icon
                type="search"
                size="md"
                color="#aaa"
                className="prt-1 vam"
              />
            </span>
            <Button
              type="primary"
              className={`${style.sendBtn} plr10 fs14 dib`}
            >
              发送
            </Button>
          </div>
        </header>
        <section className="wp100 hp100">
          <div id="amap" className="wp100 hp50" />
          <div className={`${style.searchList} wp100 hp50 plr10 bsb`}>test</div>
        </section>
      </div>
    )
  }
}

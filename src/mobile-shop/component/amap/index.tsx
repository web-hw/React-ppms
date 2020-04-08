import * as React from 'react'
import {} from 'react-router-dom'

import { getAMap, getPostion } from 'global@util/amap'
import { toast } from 'global@util/toast/mobile'
import { StateUnmount } from 'global@component/state-unmount'
import { serialize } from 'global@util/serialize'
import Loading from '../../component/loading'

const style = require('./style')

interface IPropsAMap {
  isLocation?: boolean // 是否定位当前位置
  isRealLocation?: boolean // 是否实时定位
  isTargetPosition?: boolean // 是否显示目标位置
  isDragTarget?: boolean // 目标位置是否可以拖拽
  onDragendOfTarget?: (location: any[], target: any[]) => void // 拖拽结束的回调
  onInitTarget?: (location: any[], target: any[]) => void
  targetPosition?: any[] // 目标位置
  dragEnable?: boolean
}

interface IStateAMap {
  location: any[]
  loading: boolean
}

@StateUnmount
export default class AMap extends React.PureComponent<IPropsAMap, IStateAMap> {
  private id = `cb-amap-${Date.now()}`
  private _AMap: any = null
  private _amap: any = null
  private _realTimer: any = null
  private _realDelay: number = 3 * 1000

  private async initAMap() {
    const {
      isLocation,
      isRealLocation,
      isTargetPosition,
      targetPosition,
      isDragTarget,
      onInitTarget,
      dragEnable = true
    } = this.props
    this.setState({ loading: true })

    try {
      const AMap: any = await getAMap()
      this._AMap = AMap

      // 初始化地图
      this._amap = new AMap.Map(this.id, {
        dragEnable,
        zoom: 16,
        resizeEnable: true
      })

      // 当前位置
      let pos: any[] = null
      if (isLocation || isRealLocation) {
        pos = await this.getCurrentPosition()
        this.setLocationMarker(pos)
      }

      // 目标位置
      if (!isTargetPosition) {
        pos && this._amap.setCenter(pos)
      } else {
        let tgtPos = targetPosition || (pos ? serialize.copy(pos) : null)
        if (!tgtPos) {
          tgtPos = await this.getCurrentPosition()
        }
        this.setTargetMarker(tgtPos)
        this._amap.setCenter(tgtPos)
        isDragTarget && this.onDragTargetMarker()
        onInitTarget && onInitTarget(pos, tgtPos)
      }

      this.setState({ loading: false, location: pos })
    } catch (err) {
      toast.info(err.message)
      this.setState({ loading: false })
    }
  }

  // 获取marker
  private getMarkerByType(type: string) {
    const amap = this._amap
    if (!amap) {
      return
    }

    return amap
      .getAllOverlays('marker')
      .find((m: any) => (m.getExtData() || {}).type === type)
  }

  setPosOfTargetMarker(pos: number[], ani = 'AMAP_ANIMATION_NONE') {
    const marker = this.getMarkerByType('target')
    if (marker) {
      marker.setPosition(pos)
      marker.setAnimation(ani)
      this._amap.setCenter(pos)
    }
  }

  // 拖拽target marker
  private onDragTargetMarker() {
    const amap = this._amap
    if (!amap) {
      return
    }

    // 添加拖动事件
    amap.on('dragging', () => {
      const pos = amap.getCenter()
      this.setPosOfTargetMarker([pos.lng, pos.lat])
    })
    amap.on('dragend', () => {
      const pos = amap.getCenter()
      this.setPosOfTargetMarker([pos.lng, pos.lat], 'AMAP_ANIMATION_DROP')
      const { onDragendOfTarget } = this.props
      onDragendOfTarget &&
        onDragendOfTarget(this.state.location, [pos.lng, pos.lat])
    })
  }

  // 获取当前位置
  private async getCurrentPosition() {
    clearTimeout(this._realTimer)

    const realPosition = async () => {
      try {
        const { isTargetPosition } = this.props
        const pos = await this.getCurrentPosition()
        const marker = this.getMarkerByType('location')
        this.setState({ location: pos })
        marker ? marker.setPosition(pos) : this.setLocationMarker(pos)
        this._amap && !isTargetPosition && this._amap.setCenter(pos)
      } catch (err) {
        toast.info(err.info)
      }
    }

    try {
      const location = await getPostion()
      const { position = {} } = location || {}

      const { isRealLocation } = this.props
      if (isRealLocation) {
        this._realTimer = setTimeout(realPosition, this._realDelay)
      }

      if (!position.lng || !position.lat) {
        throw new Error('位置获取失败')
      } else {
        return [position.lng, position.lat]
      }
    } catch (err) {
      throw err
    }
  }

  // 设置图片marker
  private setImgMarker(param: {
    position: any[]
    icon: string
    [propName: string]: any
  }) {
    const amap = this._amap
    if (!amap) {
      return
    }

    const { icon, imgSize = [36, 36] } = param
    if (typeof icon === 'string') {
      const size = new this._AMap.Size(...imgSize)
      param.icon = new this._AMap.Icon({ size, image: icon, imageSize: size })
      delete param.imgSize
    }

    amap.add(new this._AMap.Marker({ ...param }))
  }

  // 设置当前位置marker
  private setLocationMarker(position: any[]) {
    const icon = require('../../assets/images/map-pos-icon.png')
    this.setImgMarker({
      icon,
      position,
      zIndex: 101,
      anchor: 'center',
      extData: { type: 'location' },
      autoRotation: true
    })
  }

  // 设置目标位置marker
  private setTargetMarker(position: any[]) {
    const icon = require('../../assets/images/map-move-icon.png')
    this.setImgMarker({
      icon,
      position,
      zIndex: 102,
      animation: 'AMAP_ANIMATION_DROP',
      extData: { type: 'target' },
      anchor: 'center'
    })
  }

  // 唤起高德地图
  schemeAMap(param: { name: string; position: any[] }) {
    if (
      !this._AMap ||
      !param.name ||
      !param.position ||
      param.position.length !== 2
    ) {
      return
    }
    const marker = new this._AMap.Marker({ position: param.position })
    marker.markOnAMAP({
      position: param.position,
      name: param.name
    })
  }

  constructor(props: IPropsAMap) {
    super(props)

    this.state = {
      location: null,
      loading: false
    }
  }

  componentDidMount() {
    this.initAMap()
  }

  componentWillUnmount() {
    clearTimeout(this._realTimer)
  }

  render() {
    const { loading } = this.state

    return (
      <Loading spinning={loading}>
        <div id={this.id} className={`${style.cbAmap} wp100 hp100`} />
      </Loading>
    )
  }
}

import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { RouteComponentProps } from 'react-router-dom'
import { Radio } from 'antd-mobile'

import {
  getAMap,
  getPostion,
  getPlacesByKeywordByAMap,
  getPlacesOfNearByAMap,
  getAddressByPos
} from 'global@util/amap'
import { toast } from 'global@util/toast/mobile'
import Chat from '../../store/chat'
import { Header } from '../../component/header'
import Search from '../../component/search'
import Loading from '../../component/loading'
import Empty from '../../component/empty'
import { CustomRefresh, EDirection } from '../../component/custom-refresh'
const style = require('./style')

interface ITargetPosition {
  id?: string
  name?: string
  address?: string
  distance?: string
  location?: {
    lng: number
    lat: number
  }
}

interface IPropsPositionSend {
  chat: Chat
}

interface IStatePositionSend {
  isOpenSearch: boolean
  search: string
  loading: boolean
  hasData: boolean
  searchs: ITargetPosition[]
  page: number
  size: number
  currPos: number[]
  dragPos: ITargetPosition
  targetPos: ITargetPosition
}

@inject('chat')
@observer
export default class PositionSend extends React.Component<
  IPropsPositionSend,
  IStatePositionSend
> {
  private _amap: any = null

  private initAMap(callback: (AMap: any) => void) {
    getAMap()
      .then((AMap: any) => {
        callback(AMap)
      })
      .catch(err => toast.info(err.message))
  }

  private initCurrAMap() {
    this.initAMap((AMap: any) => {
      this._amap = new AMap.Map('amap', {
        zoom: 14,
        resizeEnable: true
      })

      // 获取当前位置
      this.getCurrentPosition()
    })
  }

  // 获取当前位置
  private getCurrentPosition() {
    getPostion()
      .then((posmsg: any = {}) => {
        const amap = this._amap
        if (!amap) {
          return
        }

        const { position = {} } = posmsg
        const { lng, lat } = position
        const currPos = lng && lat ? [lng, lat] : []
        if (currPos.length === 2) {
          // 设置当前位置marker
          this.setState({ currPos })
          this.setCurrPositionMarker(currPos)
        }

        // 移动点
        const centerPos = currPos
        amap.setCenter(centerPos)
        this.setMoveMarker(centerPos)
        this.getNearByCenterOrKeyword(centerPos, 1)
        // 设置拖拽事件
        this.onDragMoveMarker()
      })
      .catch(err => toast.info(err.message))
  }

  // 根据点获取位置信息
  // private getAddressByPos(
  //   pos: number[],
  //   callback?: (pos: number[]) => void
  // ) {
  //   getAddressByPos(pos)
  //   .then((res) => {
  //     const targetPos = this.handleSearchData((res.pois || [])[0] || {})
  //     const { lng, lat } = targetPos.location || {}
  //     this.setState({ targetPos })
  //     if (lng && lat) {
  //       this.getNearByCenterOrKeyword([lng, lat], 1)
  //       callback && callback([lng, lat])
  //     }
  //   })
  //   .catch(err => toast.info(err.message))
  // }

  // 处理搜索数据
  private handleSearchData(pos: any) {
    const { currPos } = this.state
    const { lng, lat, P, Q } = pos.location || {}
    const currLng = lng || Q || null
    const currLat = lat || P || null
    let distance: any = ''
    if (currLng && currLat && currPos.length === 2) {
      distance = parseInt(
        window.AMap.GeometryUtil.distance(currPos, [currLng, currLat]),
        10
      )
    }
    distance =
      distance < 1000 ? `${distance}m` : `${(distance / 1000).toFixed(2)}km`

    return {
      distance,
      id: pos.id,
      name: pos.name || '',
      address: pos.address || '',
      location: { lng: currLng, lat: currLat }
    }
  }

  // 设置中心marker
  private getCenterMarker() {
    const amap = this._amap
    if (!amap) {
      return
    }

    return amap.getAllOverlays('marker').find((m: any) => {
      const { type } = m.getExtData() || {}
      return type === 'moveMarker'
    })
  }

  private setCenterMarkerPos(pos: number[], ani = 'AMAP_ANIMATION_NONE') {
    const marker = this.getCenterMarker()
    if (marker) {
      marker.setPosition(pos)
      marker.setAnimation(ani)
      this._amap.setCenter(pos)
    }
  }

  // 根据中心点搜索附近
  private getNearByCenterOrKeyword(
    posOrKwd: number[] | string,
    pageIndex: number,
    callback?: Function
  ) {
    if (posOrKwd.length === 0) {
      return
    }
    const { searchs, size } = this.state
    let currSearchs = [...searchs]

    // 第一页
    if (pageIndex === 1) {
      this.setState({ loading: true })
      currSearchs = []
    }

    // 获取数据
    const param = { pageIndex, pageSize: size }
    const search =
      posOrKwd instanceof Array
        ? getPlacesOfNearByAMap(posOrKwd, param)
        : getPlacesByKeywordByAMap(posOrKwd, param)

    search
      .then((res: any) => {
        // 处理数据格式
        const { page, size } = this.state
        const { count = 0, pois = [] } = res
        const searchs = pois.map((poi: any) => {
          return this.handleSearchData(poi)
        })

        const state: any = {
          searchs: currSearchs.concat(searchs),
          loading: false,
          hasData: count > page * size,
          page: page + 1
        }
        if (pageIndex === 1 && posOrKwd instanceof Array) {
          state.targetPos = state.searchs[0]
          const { lng, lat } = state.targetPos.location
          this.setCenterMarkerPos([lng, lat])
        }

        setTimeout(() => {
          this.setState({ ...state })
          callback && callback()
        },         1000)
      })
      .catch(err => toast.info(err.message))
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

    this.initAMap((AMap: any) => {
      const { icon, imgSize = [36, 36] } = param
      if (typeof icon === 'string') {
        const size = new AMap.Size(...imgSize)
        param.icon = new AMap.Icon({ size, image: icon, imageSize: size })
        delete param.imgSize
      }

      amap.add(new AMap.Marker({ ...param }))
    })
  }

  // 设置当前位置marker
  private setCurrPositionMarker(position: any[]) {
    const icon = require('../../assets/images/map-pos-icon.png')
    this.setImgMarker({
      icon,
      position,
      zIndex: 101,
      anchor: 'center',
      autoRotation: true
    })
  }

  // 设置移动地图的中心点marker
  private setMoveMarker(position: any[]) {
    const icon = require('../../assets/images/map-move-icon.png')
    this.setImgMarker({
      icon,
      position,
      zIndex: 102,
      animation: 'AMAP_ANIMATION_DROP',
      extData: { type: 'moveMarker' },
      anchor: 'bottom-center'
    })
  }

  // 拖拽移动中心marker
  private onDragMoveMarker() {
    const amap = this._amap
    if (!amap) {
      return
    }

    // 添加拖动事件
    amap.on('dragging', () => {
      const { search } = this.state
      if (search) {
        return
      }
      const pos = amap.getCenter()
      this.setCenterMarkerPos([pos.lng, pos.lat])
    })
    amap.on('dragend', () => {
      const { search } = this.state
      if (search) {
        return
      }
      const pos = amap.getCenter()
      this.setCenterMarkerPos([pos.lng, pos.lat])
      this.getNearByCenterOrKeyword([pos.lng, pos.lat], 1)
    })
  }

  // 搜索地点
  private onSureSearch() {
    const { search } = this.state
    if (!search) {
      return
    }
    this.getNearByCenterOrKeyword(search, 1)
  }

  private onRefreshSearch(done: Function) {
    const { search, page, targetPos } = this.state
    const { lat, lng } = targetPos.location || {}
    this.getNearByCenterOrKeyword(search || [lng, lat], page, done)
  }

  private onChangeSearch(val: string) {
    const { search, targetPos } = this.state
    const newVal = val.trim()
    const { lat, lng } = targetPos.location || {}
    if (search === newVal) {
      return
    }
    this.setState({ search: newVal })

    // 如果为空
    if (!newVal) {
      this.getNearByCenterOrKeyword([lng, lat], 1)
    }
  }

  private onChangeSearchItem(targetPos: ITargetPosition) {
    this.setState({ targetPos })
    const { lat, lng } = targetPos.location
    this.setCenterMarkerPos([lng, lat])
  }

  constructor(props: IPropsPositionSend) {
    super(props)

    this.state = {
      isOpenSearch: false,
      loading: false,
      search: '',
      hasData: false,
      searchs: [],
      page: 1,
      size: 10,
      targetPos: {},
      dragPos: {},
      currPos: []
    }

    this.onChangeSearch = this.onChangeSearch.bind(this)
    this.onSureSearch = this.onSureSearch.bind(this)
    this.onRefreshSearch = this.onRefreshSearch.bind(this)
  }

  componentDidMount() {
    // this.props.chat.createWs()
    this.initCurrAMap()
  }

  render() {
    const {
      isOpenSearch,
      search,
      hasData,
      loading,
      searchs,
      targetPos
    } = this.state

    return (
      <div className={`${style.positionSend} wp100 hp100 pr bsb pt50 fs0 oh`}>
        <Header right={<span className="fs-fb3f3e">发送</span>} />
        <div className="wp100 hp100 bg-fff">
          <div
            id="amap"
            className={`wp100 ts300 ${isOpenSearch ? 'hp40' : 'hp60'}`}
          />
          <div
            className={`search-content pr wp100 bg-fff ts300 bsb ${
              isOpenSearch ? 'hp60' : 'hp40'
            }`}
            ref={el =>
              el &&
              (el.style.paddingTop = `${parseInt(
                window.getComputedStyle(el).paddingTop,
                10
              )}px`)
            }
          >
            <div className="palt wp100 bsb plr10">
              <div className="ope-up-down tac wp100 bsb ptb10">
                <em
                  onClick={() => this.setState({ isOpenSearch: !isOpenSearch })}
                  className={isOpenSearch ? 'active' : ''}
                  style={{
                    backgroundImage: `url(${require('../../assets/images/position-up-icon.png')})`
                  }}
                />
              </div>
              <div className="search wp100">
                <Search
                  placeholder="搜索地点"
                  value={search}
                  onChange={this.onChangeSearch}
                  onSure={this.onSureSearch}
                />
              </div>
            </div>
            <Loading className="cb-radio" spinning={loading}>
              <CustomRefresh
                direction={EDirection.UP}
                hasData={hasData}
                onRefresh={this.onRefreshSearch}
              >
                {searchs.length === 0 ? (
                  <Empty />
                ) : (
                  searchs.map((pos, idx) => (
                    <Radio.RadioItem
                      key={`${pos.id}-${idx}`}
                      checked={targetPos.id === pos.id}
                      onClick={() => this.onChangeSearchItem(pos)}
                    >
                      <div className="name wp100 fs14 tes">{pos.name}</div>
                      <div className="address wp100 fs12 tes">
                        {!pos.distance ? null : (
                          <span className="mr5">
                            {pos.distance}
                            <span className="ml5">|</span>
                          </span>
                        )}
                        <span>{pos.address}</span>
                      </div>
                    </Radio.RadioItem>
                  ))
                )}
              </CustomRefresh>
            </Loading>
          </div>
        </div>
      </div>
    )
  }
}

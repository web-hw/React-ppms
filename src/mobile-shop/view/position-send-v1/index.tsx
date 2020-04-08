import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import { Radio } from 'antd-mobile'

import {
  getPlacesOfNearByAMap,
  getPlacesByKeywordByAMap
} from 'global@util/amap'
import { toast } from 'global@util/toast/mobile'
import { serialize } from 'global@util/serialize'
import { StateUnmount } from 'global@component/state-unmount'
import AMap from '../../component/amap'
import Chat from '../../store/chat'
import { E_MESSAGE_TYPE } from '../../store/chat/constant'
import { Header } from '../../component/header'
import Loading from '../../component/loading'
import Empty from '../../component/empty'
import Search from '../../component/search'
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

interface IPropsPositionSendV1 extends RouteComponentProps {
  chat: Chat
}

interface IStatePositionSendV1 {
  dragTarget: any[]
  target: ITargetPosition
  location: any[]
  isOpenSearch: boolean
  searchs: ITargetPosition[]
  search: string
  loading: boolean
  pageIndex: number
  timer: any
}

@inject('chat')
@observer
@StateUnmount
export default class PositionSendV1 extends React.Component<
  IPropsPositionSendV1,
  IStatePositionSendV1
> {
  private amap: AMap = null

  // 处理搜索数据
  private handleSearchData(pos: any) {
    const { location } = this.state
    const { lng, lat, P, Q } = pos.location || {}
    const currLng = lng || Q || null
    const currLat = lat || P || null
    let distance: any = ''
    if (currLng && currLat && location.length === 2) {
      distance = parseInt(
        window.AMap.GeometryUtil.distance(location, [currLng, currLat]),
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

  // 根据中心点搜索附近
  private getNearByCenterOrKeyword(
    location: any[],
    posOrKwd: number[] | string,
    pageIndex: number
  ) {
    if (posOrKwd.length === 0) {
      return
    }
    const { searchs } = this.state
    const currSearchs = [...searchs]
    this.setState({ location, loading: true })
    // 获取数据
    const param = { pageIndex, pageSize: 50 }
    const search =
      posOrKwd instanceof Array
        ? getPlacesOfNearByAMap(posOrKwd, param)
        : getPlacesByKeywordByAMap(posOrKwd, param)

    search
      .then((res: any) => {
        setTimeout(() => {
          const { pois = [], pageIndex } = res
          const searchs = pois.map((poi: any) => {
            return this.handleSearchData(poi)
          })
          const state: any = {
            pageIndex,
            searchs: (pageIndex === 1 ? [] : currSearchs)
              .concat(searchs)
              .sort((a: any, b: any) => {
                let disA = parseFloat(a.distance)
                if (a.distance.endsWith('km')) {
                  disA *= 1000
                }
                let disB = parseFloat(b.distance)
                if (b.distance.endsWith('km')) {
                  disB *= 1000
                }
                return disA - disB
              }),
            loading: false,
            target: pageIndex === 1 ? {} : this.state.target,
            dragTarget:
              posOrKwd instanceof Array ? posOrKwd : this.state.dragTarget
          }
          // if (pageIndex === 1) {
          //   state.target
          //   // this.onChangeSearchItem(state.searchs[0])
          // }
          this.setState({ ...state })
        },         1000)
      })
      .catch((err: Error) => {
        this.setState({ loading: false })
        toast.info(err.message)
      })
  }

  private setTargetMarker(pos: any[]) {
    if (!this.amap) {
      return
    }

    this.amap.setPosOfTargetMarker(pos, 'AMAP_ANIMATION_DROP')
  }

  private onChangeSearchItem(targetPos: ITargetPosition) {
    if (!targetPos) {
      return
    }
    this.setState({ target: targetPos })
    const { lat, lng } = targetPos.location
    this.setTargetMarker([lng, lat])
  }

  private onChangeTarget(location: any[], target: any[]) {
    this.getNearByCenterOrKeyword(location, target, 1)
  }

  private onSureSearch(pageIndex: number) {
    const { search, location, dragTarget } = this.state
    if (search) {
      this.getNearByCenterOrKeyword(location, search, pageIndex)
    } else {
      this.getNearByCenterOrKeyword(location, dragTarget, pageIndex)
    }
  }

  private onScrollSearch(e: any) {
    e.persist()
    if (this.state.loading) {
      return
    }

    clearTimeout(this.state.timer)
    this.setState({
      timer: setTimeout(() => {
        const target = e.target
        if (!target) {
          return
        }
        const sh = target.scrollHeight
        const oh = target.offsetHeight
        const st = target.scrollTop
        if (sh - (oh + st) <= 5 && sh - (oh + st) >= 0) {
          this.onSureSearch(this.state.pageIndex + 1)
        }
      },                300)
    })
  }

  // 发送位置
  private onSendPosition() {
    const { target } = this.state
    if (
      !target.id ||
      !target.name ||
      !target.location ||
      !target.location.lng ||
      !target.location.lat
    ) {
      return toast.info('请选择合法的位置信息')
    }

    const params: any = this.props.match.params
    const { chatType, chatId } = params || {}
    this.props.chat.sendMsg({
      content: {
        chatType,
        messageType: E_MESSAGE_TYPE.MAP,
        toChatId: chatId,
        message: target
      }
    })
    Header.goBack()
  }

  constructor(props: IPropsPositionSendV1) {
    super(props)

    this.state = {
      loading: false,
      pageIndex: 1,
      searchs: [],
      location: [],
      dragTarget: [],
      target: {},
      search: '',
      isOpenSearch: false,
      timer: null
    }

    this.onScrollSearch = this.onScrollSearch.bind(this)
    this.onSureSearch = this.onSureSearch.bind(this)
    this.onSendPosition = this.onSendPosition.bind(this)
    this.onChangeTarget = this.onChangeTarget.bind(this)
  }

  componentDidMount() {
    // this.props.chat.createWs()
  }

  render() {
    const { isOpenSearch, search, searchs, loading, target } = this.state
    const params: any = this.props.match.params
    const { chatType, chatId } = params || {}

    return (
      <div className={`${style.positionSend} wp100 hp100 pr bsb pt50 fs0 oh`}>
        <Header
          // onClickLeft={() => this.props.chat.entryChat(chatType, chatId)}
          right={
            <span className="fs-fb3f3e" onClick={this.onSendPosition}>
              发送
            </span>}
        />
        <div className="wp100 hp100 bg-fff">
          <div className={`wp100 ts300 ${isOpenSearch ? 'hp40' : 'hp60'}`}>
            <AMap
              ref={el => (this.amap = el)}
              isLocation={true}
              isTargetPosition={true}
              isDragTarget={true}
              onInitTarget={this.onChangeTarget}
              onDragendOfTarget={this.onChangeTarget}
            />
          </div>
          <div
            className={`search-content pr wp100 bg-fff ts300 bsb ${
              isOpenSearch ? 'hp60' : 'hp40'
            }`}
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
                  onChange={val => this.setState({ search: val.trim() })}
                  onSure={() => this.onSureSearch(1)}
                />
              </div>
            </div>
            <Loading className="cb-radio" spinning={loading}>
              <div
                className="wp100 hp100 oay sb"
                onScroll={this.onScrollSearch}
              >
                {searchs.length === 0 ? (
                  <Empty />
                ) : (
                  searchs.map((pos, idx) => (
                    <Radio.RadioItem
                      key={`${pos.id}-${idx}`}
                      checked={target.id === pos.id}
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
              </div>
            </Loading>
          </div>
        </div>
      </div>
    )
  }
}

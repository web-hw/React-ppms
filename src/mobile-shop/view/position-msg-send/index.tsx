import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { RouteComponentProps } from 'react-router-dom'
import {} from 'antd-mobile'

import { serialize } from 'global@util/serialize'
import { Header } from '../../component/header'
import { StateUnmount } from 'global@component/state-unmount'
import AMap from '../../component/amap'
import Chat from '../../store/chat'
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

interface IPropsPositionMsgSend extends RouteComponentProps {
  chat: Chat
}

interface IStatePositionMsgSend {
  target: ITargetPosition
}

@inject('chat')
@observer
@StateUnmount
export default class PositionMsgSend extends React.Component<
  IPropsPositionMsgSend,
  IStatePositionMsgSend
> {
  private amap: AMap = null

  private schemeAMap() {
    let scheme = ''
    const u = navigator.userAgent
    const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1
    const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
    if (isAndroid) {
      scheme = 'androidamap://viewMap'
    }
    if (isiOS) {
      scheme = 'iosamap://viewMap'
    }

    const { target } = this.state
    const { name, location } = target || {}
    if (scheme && name && location && location.lng && location.lat) {
      scheme = `${scheme}?sourceApplication=web&poiname=${name}&lat=${location.lat}&lon=${location.lng}&dev=1`
      window.location.href = scheme
    }

    // if (!this.amap) { return }
    // this.amap.schemeAMap({
    //   name,
    //   position: location && location.lng && location.lat ? [location.lng, location.lat] : null
    // })
  }

  constructor(props: IPropsPositionMsgSend) {
    super(props)

    const params: any = this.props.match.params || {}

    this.state = {
      target: params.target ? serialize.parseOfDecode(params.target) || {} : {}
    }

    this.schemeAMap = this.schemeAMap.bind(this)
  }

  render() {
    const { target } = this.state
    const position: any = target.location || {}
    const params: any = this.props.match.params || {}

    return (
      <div
        className={`${style.positionMsgSend} wp100 hp100 pr bsb pt50 fs0 oh`}
      >
        <Header
        // onClickLeft={() => this.props.chat.entryChat(params.chatType, params.chatId)}
        >
          位置信息
        </Header>
        <div className="content wp100 hp100 bsb pr">
          <div className="wp100 hp100">
            <AMap
              ref={el => (this.amap = el)}
              isLocation={true}
              isTargetPosition={true}
              targetPosition={
                position.lng && position.lat
                  ? [position.lng, position.lat]
                  : null
              }
            />
          </div>
          <div className="target wp100 palb bg-fff bsb">
            <div className="name wp100 tes fs12">{target.name}</div>
            <div className="address wp100 tes fs10">{target.address}</div>
            <img
              className="parb"
              src={require('../../assets/images/map-icon.png')}
              onClick={this.schemeAMap}
            />
          </div>
        </div>
      </div>
    )
  }
}

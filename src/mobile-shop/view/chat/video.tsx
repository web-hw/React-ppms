import * as React from 'react'
import {} from 'react-router-dom'
import {} from 'antd-mobile'

import 'plyr/dist/plyr.css'
import { toast } from 'global@util/toast/mobile'
import { E_MESSAGE_TYPE } from '../..//store/chat/constant'
const Plyr = require('plyr')
const style = require('./style')

interface IPropsCbVideo {
  onClickVideoBox?: () => void
  className?: string
  controls?: ('play-large' | 'play' | 'progress' | 'current-time')[]
  isFixWH?: boolean
  data: {
    type?: E_MESSAGE_TYPE
    name?: string
    size?: string
    icon?: string
    url?: string
    poster?: string
  }
}

interface IStateCbVideo {}

export default class CbVideo extends React.PureComponent<
  IPropsCbVideo,
  IStateCbVideo
> {
  private defPoster = require('../../assets/images/video-poster-def.jpg')
  private video: HTMLVideoElement = null
  private plyr: any = null

  // 初始化宽高
  private initVideo() {
    const ve: any = this.video

    // 禁止自动全屏
    ve.setAttribute('x5-playsinline', 'true')
    ve.setAttribute('webkit-playsinline', 'true')
    ve.setAttribute('playsinline', 'true')

    // 横屏 | 竖屏
    ve.setAttribute('x5-video-player-type', 'h5')
    ve.setAttribute('x-webkit-airplay', 'allow')
    ve.setAttribute('x5-video-player-fullscreen', 'true')
    ve.setAttribute('x5-video-orientation', 'portrait') // landscape|portrait横屏|竖屏
  }

  private onPlayVideo() {
    const ve: any = this.video

    // 设置是否固定宽高
    const { isFixWH = false } = this.props
    if (isFixWH) {
      const pe: any = ve.parentElement
      const ph = pe.offsetHeight
      const vh = ve.offsetHeight
      if (vh > ph) {
        ve.setAttribute('style', 'width:100%;height:100%;object-fit:fill')
      }
    }
  }

  private initPlyr() {
    const { controls = ['play-large'] } = this.props

    this.plyr = new Plyr(this.video, {
      controls,
      loadSprite: false,
      clickToPlay: false,
      hideControls: false
    })
  }

  constructor(props: IPropsCbVideo) {
    super(props)

    this.onPlayVideo = this.onPlayVideo.bind(this)
  }

  componentDidMount() {
    this.initVideo()
    this.initPlyr()
  }

  componentWillUnmount() {
    if (this.plyr) {
      this.plyr.stop()
      this.plyr.destroy()
    }
  }

  render() {
    const { onClickVideoBox, className = '', data = {} } = this.props

    return (
      <div className={`${style.cbVideo} cb-video ${className}`}>
        <video
          className="mc"
          ref={el => (this.video = el)}
          controls={true}
          crossOrigin="anonymous"
          poster={data.poster || this.defPoster}
          onPlay={this.onPlayVideo}
          // onError={() => toast.info(`当前环境不支持${data.name}格式的视频`)}
        >
          <source src={data.url} />
          <p className="fs12" style={{ color: '#fff' }}>
            当前环境不支持${data.name}格式的视频
          </p>
        </video>
        {onClickVideoBox && (
          <div
            className="palt wp100 hp100 zi300"
            onClick={(event: any) => {
              event.preventDefault()
              event.stopPropagation()
              onClickVideoBox()
            }}
          />
        )}
      </div>
    )
  }
}

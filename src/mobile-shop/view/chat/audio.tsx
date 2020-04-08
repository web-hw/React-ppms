import * as React from 'react'
import {} from 'react-router-dom'
import { Slider } from 'antd-mobile'

import { AmrPlay } from 'global@util/audio/amr-record'
import { toast } from 'global@util/toast/mobile'
import { StateUnmount } from 'global@component/state-unmount'
import Loading from '../../component/loading'
import { E_MESSAGE_TYPE } from '../../store/chat/constant'

const style = require('./style')

interface IPropsCbAudio {
  data: {
    type?: E_MESSAGE_TYPE
    name?: string
    size?: string
    icon?: string
    url?: string
  }
}

interface IStateCbAudio {
  scale: number
  loading: boolean
  time: string
  timer: any
}

@StateUnmount
export default class CbAudio extends React.PureComponent<
  IPropsCbAudio,
  IStateCbAudio
> {
  private amrPlay: AmrPlay = null

  private createAmrPlay() {
    return new AmrPlay({
      onPlay: () => {
        this.setState({ loading: false })
        this.getPlayCurrentTime()
      },
      onError: (err: Error) => {
        clearInterval(this.state.timer)
        this.setState({ time: '00:00', scale: 0, loading: false })
        toast.info(err.message || '未知错误')
      }
    })
  }

  private onPlayOrPause() {
    let amrPlay = this.amrPlay

    if (amrPlay && amrPlay.isPlayingOrPausedOrStop() === 1) {
      amrPlay.stop()
      clearInterval(this.state.timer)
    } else {
      const data: any = this.props.data || {}

      if (!data.url) {
        toast.info('音频不存在')
      } else {
        this.setState({ loading: true })
        amrPlay = this.createAmrPlay()
        amrPlay.play(data.url, 0, (amr: any) => {
          const t = amr.getDuration()

          const { scale } = this.state
          let ct = (scale / 100) * t
          if (isNaN(ct)) {
            ct = 0
          }

          amr.play(ct)
        })
        this.amrPlay = amrPlay
      }
    }
  }

  private getPlayCurrentTime() {
    const time = () => {
      if (!this.amrPlay) {
        return 0
      }

      return this.amrPlay.getCurrentPosition()
    }

    clearInterval(this.state.timer)
    this.setState({
      timer: setInterval(() => {
        const total = this.amrPlay.getDuration()
        const ct = time()
        const t = total - ct
        const st = this.getTime(t)
        const p = ct / total

        if (t <= 0) {
          clearInterval(this.state.timer)
          this.setState({ time: '00:00', scale: 100 })
        } else {
          this.setState({
            scale: 100 * (isNaN(p) ? 0 : p),
            time: st === '00:00' ? '00:00' : `-${st}`
          })
        }
      },                 500)
    })
  }

  private getTime(time: number) {
    const tm = +time
    if (isNaN(tm)) {
      return '00:00'
    }

    let m: any = Math.floor(tm / 60)
    if (m < 10) {
      m = `0${m}`
    }

    let s: any = Math.round(tm % 60)
    if (s < 10) {
      s = `0${s}`
    }

    return `${m}:${s}`
  }

  private onTouchStartOfScale(scale: number) {
    let s = +scale
    if (isNaN(s)) {
      s = 0
    }

    this.setState({ scale: s })

    const amrPlay = this.amrPlay
    if (amrPlay && amrPlay.isPlayingOrPausedOrStop() === 1) {
      amrPlay.stop()
      clearInterval(this.state.timer)
    }
  }

  constructor(props: IPropsCbAudio) {
    super(props)

    this.state = {
      scale: 0,
      loading: false,
      time: '00:00',
      timer: null
    }

    this.onPlayOrPause = this.onPlayOrPause.bind(this)
  }

  componentWillUnmount() {
    clearInterval(this.state.timer)
    this.amrPlay && this.amrPlay.stop()
  }

  render() {
    const data: any = this.props.data || {}

    return (
      <Loading
        spinning={this.state.loading}
        className={`${style.audio} wp100 hp100 oh pr`}
      >
        <div className="content mc tac wp100">
          <img
            className="audio-icon"
            src={require('../../assets/images/chat-audio-icon.png')}
          />
          <div className="name wp100 tes fs12 bsb plr10 tac">{data.name}</div>
          <div className="cb-slider wp100 bsb pr">
            <Slider
              min={0}
              max={100}
              step={0.01}
              value={this.state.scale}
              onChange={(scale: number) => this.onTouchStartOfScale(scale)}
            />
            <div className="time part">{this.state.time}</div>
          </div>
          <div className="ope wp100 mt40 tac">
            <span onClick={this.onPlayOrPause} />
          </div>
        </div>
      </Loading>
    )
  }
}

// import 'plyr/dist/plyr.css'
// const Plyr = require('plyr/dist/plyr.min.js')
// import { toast } from 'global@util/toast/mobile'
// import { amr2mp3 } from 'global@util/amr2mp3'
// import { fileOrBlob2Base64 } from 'global@util/file'
// const style = require('./style')

// interface IPropsCbAudio {
//   url: string
// }

// interface IStateCbAudio {
//   hasError: boolean
// }

// export default class CbAudio extends React.PureComponent<IPropsCbAudio, IStateCbAudio>{
//   private audio: HTMLAudioElement = null
//   private plyr: any = null

//   private init() {
//     if (!this.audio) { return }

//     amr2mp3(
//       this.props.url,
//       (err: Error, file: File) => {
//         if (err) {
//           return console.log(err)
//         }
//         fileOrBlob2Base64(
//           file,
//           (err: Error, base64: string) => {
//             if (err) {
//               return console.log(err)
//             }

//             console.log(base64)
//           }
//         )
//       }
//     )

//     this.plyr = new Plyr(
//       this.audio,
//       {
//         controls: ['progress', 'current-time'],
//         loadSprite: false
//       }
//     )
//   }

//   private onPlayOrPause() {
//     const plyr = this.plyr
//     if (!plyr) { return }

//     const { hasError } = this.state
//     if (hasError) {
//       return toast.info('播放出错啦')
//     }

//     // 播放 or 暂停
//     if (plyr.paused) {
//       plyr.play()
//     } else {
//       plyr.pause()
//     }
//   }

//   constructor(props: IPropsCbAudio) {
//     super(props)

//     this.state = {
//       hasError: false
//     }

//     this.onPlayOrPause = this.onPlayOrPause.bind(this)
//   }

//   componentDidMount() {
//     this.init()

//     const plyr = this.plyr
//     if (!plyr) { return }

//     let parent = this.audio.parentElement
//     parent = parent ? parent.parentElement : parent
//     const icon: any = parent ? (parent.querySelector('.audio-icon') || null) : null
//     plyr.on('play', () => icon && (icon.style.animationName = style.audioAni))
//     plyr.on('pause', () => icon && (icon.style.animationName = ''))
//   }

//   componentWillUnmount() {
//     const plyr = this.plyr
//     if (!plyr) { return }

//     plyr.pause()
//     plyr.destroy()
//   }

//   render() {
//     return (
//       <div className={`${style.audio} wp100 hp100 oh pr`}>
//         <div className="content mc tac wp100">
//           <img
//             className="audio-icon"
//             src={require('../../assets/images/chat-audio-icon.png')}
//           />
//           <div className="name wp100 tes fs12 bsb plr10 tac">这是文件名文件名.mp3</div>
//           <audio
//             ref={el => this.audio = el}
//             controls={true}
//             onError={() => this.setState({ hasError: true })}
//           >
//             <source src={this.props.url} />
//           </audio>
//           <div className="ope wp100 mt40 tac">
//             <span onClick={this.onPlayOrPause} />
//           </div>
//         </div>
//       </div>
//     )
//   }
// }

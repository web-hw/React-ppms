import * as React from 'react'
import {} from 'react-router-dom'
import {} from 'antd-mobile'

import { StateUnmount } from 'global@component/state-unmount'
import { AmrPlay } from 'global@util/audio/amr-record'
const style = require('./style')

interface IPropsVoice {
  maxWidth?: number
  maxTime?: number
  duration?: number
  onPlayOrPause?: (event: any) => void
  className: 'self' | 'other'
}

interface IStateVoice {
  duration: number
  prevId: number
}

@StateUnmount
export default class Voice extends React.PureComponent<
  IPropsVoice,
  IStateVoice
> {
  private voice: any = null

  private init() {
    let { maxWidth, maxTime } = this.props

    // 获取录音长度
    const duration = Math.ceil(this.props.duration || 0)

    if (!maxTime) {
      maxTime = 60
    }
    if (!maxWidth) {
      const html = document.querySelector('html')
      if (html) {
        const fontSize = parseFloat(html.style.fontSize)
        !isNaN(fontSize) && (maxWidth = fontSize * 4)
      }
    }

    const voice = this.voice
    if (voice && maxWidth) {
      const w = Math.ceil(
        parseFloat(window.getComputedStyle(voice, null).minWidth)
      )
      if (!isNaN(w) && maxWidth > w) {
        const sw = (maxWidth - w) / maxTime
        const rw =
          maxTime <= duration ? maxWidth : Math.floor(sw * duration + w)
        voice.style.width = `${rw}px`
      }
    }

    this.setState({ duration })
  }

  constructor(props: IPropsVoice) {
    super(props)

    this.state = {
      duration: 0,
      prevId: null
    }
  }

  componentDidMount() {
    this.init()
  }

  render() {
    const { duration } = this.state
    const { className, onPlayOrPause } = this.props

    return (
      <div
        ref={el => (this.voice = el)}
        className={`${style.voice} ${className} pr`}
      >
        {className === 'other' ? (
          <div
            onClick={
              onPlayOrPause ? (event: any) => onPlayOrPause(event) : null
            }
            className="content wp100 hp100"
          >
            <em className="icon" />
            {duration}″
          </div>
        ) : (
          <div
            onClick={
              onPlayOrPause ? (event: any) => onPlayOrPause(event) : null
            }
            className="content wp100 hp100"
          >
            {duration}″<em className="icon" />
          </div>
        )}
      </div>
    )
  }
}

// interface IPropsVoice {
//   maxWidth?: number
//   maxTime?: number
//   duration?: number
//   url: string
//   className: 'self' | 'other'
// }

// interface IStateVoice {
//   loading: boolean
//   duration: number
// }
// @StateUnmount
// export default class Voice extends React.PureComponent<IPropsVoice, IStateVoice>{
//   private audio: HTMLAudioElement = null

//   private onLoadedMetaData(event: any) {
//     const audio = this.audio
//     if (!audio) { return }

//     let { maxWidth, maxTime } = this.props

//     // 获取录音长度
//     let duration = Math.ceil(audio.duration)
//     if (isNaN(duration) || !duration) {
//       duration = this.props.duration || 0
//     }

//     const parentElem = audio.parentElement
//     if (!maxTime) {
//       maxTime = 60
//     }
//     if (!maxWidth) {
//       const html = document.querySelector('html')
//       if (html) {
//         const fontSize = parseFloat(html.style.fontSize)
//         !isNaN(fontSize) && (maxWidth = fontSize * 4)
//       }
//     }

//     if (parentElem && maxWidth) {
//       const w = Math.ceil(parseFloat(window.getComputedStyle(parentElem, null).minWidth))
//       if (!isNaN(w) && maxWidth > w) {
//         const sw = (maxWidth - w) / maxTime
//         const rw = maxTime <= duration ? maxWidth : Math.floor(sw * duration + w)
//         parentElem.style.width = `${rw}px`
//       }
//     }

//     this.setState({ duration, loading: false })
//   }

//   private onStartPlay() {
//     const audio = this.audio
//     if (!audio) { return }

//     // 检查正在播放的
//     this.onPauseOfPlaying(audio)

//     // 播放
//     if (!audio.paused) {
//       audio.pause()
//     } else {
//       // audio.currentTime = 0 // 重置到开始位置播放
//       audio.load() // 解决只有第一次播放有声音的问题
//       audio.play()
//     }
//   }

//   // 取消正在播放的
//   private onPauseOfPlaying(currAudio?: HTMLAudioElement) {
//     const ads: HTMLAudioElement[] = Array.prototype.slice.call(
//       document.querySelectorAll(`.${style.voice} audio`) || [],
//       0
//     ).filter((a: any) => a !== currAudio && !a.paused)
//     ads.forEach(a => a.pause())
//   }

//   private getIcon() {
//     const result: any = { parent: null, icon: null }
//     const audio = this.audio
//     if (!audio) { return result }

//     const parentElem = audio.parentElement
//     if (parentElem) {
//       result.parent = parentElem
//       result.icon = parentElem.querySelector('.icon') || null
//     }

//     return result
//   }

//   private onPause() {
//     const { icon } = this.getIcon()
//     icon && (icon.style.animationName = '')
//   }

//   private onPlay() {
//     const { parent, icon } = this.getIcon()
//     const className = parent.className || ''
//     let aniName = ''
//     if (className.includes('self')) {
//       aniName = style.selfVoiceAni
//     }
//     if (className.includes('other')) {
//       aniName = style.otherVoiceAni
//     }
//     icon && aniName && (icon.style.animationName = aniName)
//   }

//   constructor(props: IPropsVoice) {
//     super(props)

//     this.state = {
//       loading: true,
//       duration: 0
//     }

//     this.onPlay = this.onPlay.bind(this)
//     this.onPause = this.onPause.bind(this)
//     this.onStartPlay = this.onStartPlay.bind(this)
//     this.onLoadedMetaData = this.onLoadedMetaData.bind(this)
//   }

//   componentDidMount() {
//     this.onPauseOfPlaying()
//   }

//   render() {
//     const { loading, duration } = this.state
//     const { className, url } = this.props

//     return (
//       <div className={`${style.voice} ${className} pr`}>
//         <audio
//           ref={el => this.audio = el}
//           preload="auto"
//           hidden={true}
//           onPause={this.onPause}
//           onPlay={this.onPlay}
//           onLoadedMetadata={this.onLoadedMetaData}
//         >
//           <source src={url} />
//         </audio>
//         {
//           loading
//           ? (
//             <div className="preloading wp100 hp100 palt" />
//           ) : className === 'other'
//           ? (
//             <div
//               onClick={this.onStartPlay}
//               className="content wp100 hp100"
//             >
//               <em className="icon" />{duration}″
//             </div>
//           ) : (
//             <div
//               onClick={this.onStartPlay}
//               className="content wp100 hp100"
//             >
//               {duration}″<em className="icon" />
//             </div>
//           )
//         }
//       </div>
//     )
//   }
// }

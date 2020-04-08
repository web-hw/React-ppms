import { getPlus } from '../plus'
import BenzAmr from 'benz-amr-recorder'

interface IAmrRecorderOptions {
  onError: (err: Error) => void
  onStart?: () => void
  onFinish: (blob: Blob | string, duration: number) => void
  onCancel?: () => void
}

export class AmrRecorder {
  private amr: BenzAmr = null
  private options: IAmrRecorderOptions = null

  private handleCallback(
    type: 'start' | 'finish' | 'cancel' | 'error',
    callback: Function,
    ...agrs: any
  ) {
    type === 'error' && this.cancel()
    // type !== 'start' && (this.amr = null)
    callback && callback(...agrs)
  }

  constructor(options: IAmrRecorderOptions) {
    this.options = options
  }

  start() {
    const { onStart, onFinish, onCancel, onError } = this.options || {}
    // 初始化录音
    const BA: any = BenzAmr
    if (!BA.isRecordSupported()) {
      this.handleCallback('error', onError, new Error('当前环境不支持录音'))
    } else {
      // if (this.amr) {
      //   this.cancel()
      //   this.amr = null
      // }
      const amr = new BenzAmr()

      // 开始录音
      amr.onStartRecord(() => this.handleCallback('start', onStart))

      // 取消录音
      amr.onCancelRecord(() => this.handleCallback('cancel', onCancel))

      // 结束录音
      amr.onFinishRecord(() => {
        const blob: Blob = amr.getBlob()
        this.handleCallback('finish', onFinish, blob || null, amr.getDuration())
      })

      amr
        .initWithRecord()
        .then(() => {
          amr.startRecord()
        })
        .catch((err: Error) => this.handleCallback('error', onError, err))

      this.amr = amr
    }
  }

  finish() {
    if (!this.amr) {
      return
    }
    this.amr.finishRecord()
  }

  cancel() {
    if (!this.amr) {
      return
    }

    this.amr.cancelRecord()
  }
}

export class AmrRecorderOfPlusAndJS {
  private recorder: any = null
  private status: 'finish' | 'cancel' = null
  private options: IAmrRecorderOptions = null

  private handleCallback(
    type: 'start' | 'finish' | 'cancel' | 'error',
    callback: Function,
    ...agrs: any
  ) {
    type === 'error' && this.cancel()
    callback && callback(...agrs)
  }

  constructor(options: IAmrRecorderOptions) {
    this.options = options
  }

  start() {
    const { onStart, onError, onCancel, onFinish } = this.options

    getPlus()
      .then((plus: any) => {
        this.recorder = plus.audio.getRecorder()

        // 开始录音
        this.recorder.record(
          { format: 'amr' },
          (path: string) => {
            if (this.status === 'cancel') {
              this.handleCallback('cancel', onCancel)
            }

            if (this.status === 'finish') {
              // 获取base64
              plus.io.resolveLocalFileSystemURL(
                path,
                (entry: any) =>
                  entry.file((file: any) => {
                    const fileReader = new plus.io.FileReader()
                    fileReader.readAsDataURL(file)
                    fileReader.onloadend = (e: any) => {
                      this.handleCallback(
                        'finish',
                        onFinish,
                        e.target.result || null,
                        null
                      )
                    }
                  }),
                (err: any) => this.handleCallback('error', onError, err)
              )
            }
          },
          (err: Error) => this.handleCallback('error', onError, err)
        )

        // 重置状态
        this.status = null
        this.handleCallback('start', onStart)
      })
      .catch((err: any) => {
        if (err.code === 404) {
          this.recorder = new AmrRecorder(this.options)
          this.recorder.start()
        } else {
          this.handleCallback('error', onError, err)
        }
      })
  }

  finish() {
    if (!this.recorder) {
      return
    }

    if (this.recorder instanceof AmrRecorder) {
      this.recorder.finish()
    } else {
      this.status = 'finish'
      this.recorder.stop()
    }
  }

  cancel() {
    if (!this.recorder) {
      return
    }

    if (this.recorder instanceof AmrRecorder) {
      this.recorder.cancel()
    } else {
      this.status = 'cancel'
      this.recorder.stop()
    }
  }
}

interface IAmrPlayOptions {
  onPlay?: () => void
  onStop?: () => void
  onPause?: () => void
  onResume?: () => void
  onEnd?: () => void
  onAutoEnd?: () => void
  onError?: (err: Error) => void
}

export class AmrPlay {
  private amr: BenzAmr = null
  private options: IAmrPlayOptions = null

  private handleCallback(
    type: 'play' | 'stop' | 'pause' | 'resume' | 'end' | 'autoEnd' | 'error',
    callback: Function,
    ...agrs: any
  ) {
    if (type === 'play') {
      this.amr = agrs[0]
    }

    if (
      type === 'stop' ||
      type === 'end' ||
      type === 'autoEnd' ||
      type === 'error'
    ) {
      this.amr = null
    }

    callback && callback(...agrs)
  }

  constructor(options: IAmrPlayOptions) {
    this.options = options
  }

  play(url: string, time: number = 0, callback?: (amr: BenzAmr) => void) {
    const playStatus = this.isPlayingOrPausedOrStop()
    // 正在播放
    if (playStatus === 1) {
      return this.pause()
    }

    // 是否是暂停
    if (playStatus === 0) {
      return this.resume()
    }

    const { onError, onPlay, onStop, onEnd, onAutoEnd, onPause, onResume } =
      this.options || {}
    const BA: any = BenzAmr
    if (!BA.isPlaySupported()) {
      this.handleCallback('error', onError, new Error('当前环境不支持音频播放'))
    } else {
      const amr: any = new BenzAmr()

      // play
      amr.onPlay(() => this.handleCallback('play', onPlay, amr))

      // stop | 播放结束
      amr.onStop(() => this.handleCallback('stop', onStop))

      // pause
      amr.onPause(() => this.handleCallback('pause', onPause))

      // resume
      amr.onResume(() => this.handleCallback('resume', onResume))

      // stop | 播放结束
      amr.onEnded(() => this.handleCallback('end', onEnd))

      // 播放结束
      amr.onAutoEnded(() => this.handleCallback('autoEnd', onAutoEnd))

      // 初始化
      amr
        .initWithUrl(url)
        .then(callback ? () => callback(amr) : () => amr.play(time))
        .catch((err: Error) => this.handleCallback('error', onError, err))
    }
  }

  // 从暂停中继续播放
  resume() {
    const amr: any = this.amr
    if (!amr) {
      return
    }

    this.isPlayingOrPausedOrStop() === 0 && amr.resume()
  }

  isPlayingOrPausedOrStop() {
    const amr: any = this.amr

    if (!amr) {
      return -1
    }

    if (amr.isPlaying()) {
      return 1 // 正在播放
    }

    if (amr.isPaused()) {
      return 0 // 暂停中
    }

    return -1 // 停止 | 初始值 | 播放结束
  }

  // 停止
  stop() {
    if (!this.amr) {
      return
    }

    this.isPlayingOrPausedOrStop() === 1 && this.amr.stop()
  }

  // 暂停
  pause() {
    const amr: any = this.amr
    if (!amr) {
      return
    }
    this.isPlayingOrPausedOrStop() === 1 && amr.pause()
  }

  // 设置位置
  setPosition(time: number) {
    const amr: any = this.amr
    if (!amr) {
      return
    }

    amr.setPosition(time)
  }

  // 获取当前位置
  getCurrentPosition() {
    const amr: any = this.amr
    if (!amr) {
      return 0
    }

    return amr.getCurrentPosition() || 0
  }

  // 获取音频长度
  getDuration() {
    if (!this.amr) {
      return 0
    }

    return this.amr.getDuration() || 0
  }
}

import { recordWorker } from './js-record-worker'

/**
 * 创建worker线程
 * @param {Function | string} script 脚本地址 | 脚本函数
 */
const getWorker = (param: Function | string) => {
  let worker: Worker = null

  try {
    // 脚本地址
    let url: string
    // 根据function生成url
    if (typeof param === 'string') {
      url = param
    } else {
      const blob = new Blob([`(${param.toString()})()`])
      url = URL.createObjectURL(blob)
    }
    worker = new Worker(url)
  } catch (err) {
    throw new Error('Worker线程创建失败')
  }

  return worker
}

const getUserMedia = (): any => {
  const nvgt: any = navigator

  // 针对未实现mediaDevices的浏览器
  const mediaDevices: any = nvgt.mediaDevices || {}

  // 有mediaDevices但没有getUserMedia | 没有mediaDevices
  const defGetUserMedia = (constraints: MediaStreamConstraints) => {
    const getUserMedia =
      nvgt.getUserMedia ||
      nvgt.webkitGetUserMedia ||
      nvgt.mozGetUserMedia ||
      nvgt.msGetUserMedia

    // 不支持getUserMedia 抛出错误
    if (!getUserMedia) {
      return Promise.reject(
        new Error('getUserMedia is not implemented in this browser')
      )
    }

    // 为getUserMedia 包裹Promise
    return new Promise((resolve, reject) => {
      getUserMedia.call(nvgt, constraints, resolve, reject)
    })
  }

  return mediaDevices.getUserMedia || defGetUserMedia
}

/**
 * 获取media流
 * @param {IUserMedia} param
 * @param {TUserMediaStream} callback
 */
const getUserMediaStream = (param: IUserMedia) =>
  new Promise((resolve, reject) => {
    const nvgt: any = navigator
    navigator.getUserMedia =
      nvgt.getUserMedia ||
      nvgt.webkitGetUserMedia ||
      nvgt.mozGetUserMedia ||
      nvgt.msGetUserMedia

    navigator.getUserMedia(
      param,
      (stream: any) => resolve(stream),
      (err: any) => {
        switch (err.code || err.name) {
          case 'PERMISSION_DENIED':
          case 'PermissionDeniedError':
            return reject(new Error('用户拒绝访问设备'))
          // case 'SecurityError' // https | localhost
          // case 'NOT_SUPPORTED_ERROR':
          // case 'NotSupportedError':
          //   当前浏览器不支持
          // case 'MANDATORY_UNSATISFIED_ERROR':
          // case 'MandatoryUnsatisfiedError':
          //   return 未找到设备
          default:
            return reject(new Error('当前环境不支持'))
        }
      }
    )
  })

/**
 * 获取 AudioContext
 */
const getAudioContext = () => {
  const win: any = window
  const AudioContext =
    win.AudioContext ||
    win.webkitAudioContext ||
    win.mozAudioContext ||
    win.msAudioContext

  if (!AudioContext) {
    throw new Error('当前环境不支持媒体设备')
  }

  return new AudioContext()
}

interface IUserMedia {
  // 音频
  audio?: boolean
  // 视频
  video?:
    | boolean
    | {
      [propName: string]: any
    }
}

// 单位Kbps
enum E_BIT_RATE {
  RATE_16 = 16, // 电话音质
  RATE_24 = 24, // 增加电话音质、短波广播、长波广播、欧洲制式中波广播
  RATE_40 = 40, // 美国制式中波广播
  RATE_56 = 56, // 话音
  RATE_64 = 64, // 增加话音（手机铃声最佳比特率设定值、手机单声道MP3播放器最佳设定值）
  RATE_112 = 112, // FM调频立体声广播
  RATE_128 = 128, // 磁带（手机立体声MP3播放器最佳设定值、低档MP3播放器最佳设定值）
  RATE_160 = 160, // HIFI高保真（中高档MP3播放器最佳设定值）
  RATE_192 = 160, // CD（高档MP3播放器最佳设定值）
  RATE_256 = 160 // Studio音乐工作室（音乐发烧友适用））
}

// 采样频率
enum E_SAMPLE_RATE {
  RATE_48000 = 48000,
  RATE_44100 = 44100,
  RATE_32000 = 32000,
  RATE_24000 = 24000,
  RATE_22050 = 22050,
  RATE_16000 = 16000,
  RATE_12050 = 12050,
  RATE_8000 = 8000
}

// buffer 大小
enum E_BUFFER_SIZE {
  SIZE_256 = 256,
  SIZE_512 = 512,
  SIZE_1024 = 1024,
  SIZE_2048 = 2048,
  SIZE_4096 = 4096,
  SIZE_8192 = 8192,
  SIZE_16384 = 16384
}

interface IRecorder {
  channel?: number // 通道数
  buffer?: E_BUFFER_SIZE // buffer大小
  bitRate?: E_BIT_RATE // 比特率 不要低于64,否则可能录制无声音（人声）
  sampleRate?: E_SAMPLE_RATE // 采样频率，一般由设备提供
}

export class CbAudio {
  // 录音参数
  private _options: IRecorder = {}
  // MediaStreamAudioSourceNode
  private _source: MediaStreamAudioSourceNode = null
  // ScriptProcessorNode
  private _processor: ScriptProcessorNode = null
  // Worker
  private _worker: Worker = null

  constructor(options: IRecorder = {}) {
    const {
      buffer = E_BUFFER_SIZE.SIZE_16384,
      channel = 1,
      bitRate = E_BIT_RATE.RATE_128,
      sampleRate = E_SAMPLE_RATE.RATE_8000
    } = options

    this._options = { buffer, channel, bitRate, sampleRate }
  }

  // 开始录音
  startRecord(callback: (err: Error, data: File | 1) => void) {
    const context = getAudioContext()
    getUserMediaStream({ audio: true })
      .then((stream: MediaStreamAudioSourceNode) => {
        const { buffer, channel, sampleRate, bitRate } = this._options
        const source = context.createMediaStreamSource(stream)
        const processor = (
          context.createScriptProcessor || context.createJavaScriptNode
        ).call(context, buffer, channel, channel)

        // 开启worker线程
        const worker = getWorker(recordWorker)
        worker.onmessage = function (msg: any) {
          const data = msg.data
          switch (data.cmd) {
            case 'complete':
              context && context.close()
              const file = new File(data.data, `record-${Date.now()}.mp3`, {
                type: 'audio/mp3'
              })
              return callback(null, file)
          }
        }
        worker.onerror = function (err: any) {
          context && context.close()
          callback(err, null)
        }

        const inputSampleRate = context.sampleRate

        let origin = `${location.origin}/`
        if (location.href.indexOf('index.html') !== -1) {
          origin = location.href.replace(/(index\.html.+)/, '')
        }

        worker.postMessage({
          cmd: 'init',
          data: {
            channel,
            bitRate,
            origin,
            inputSampleRate,
            outputSampleRate: sampleRate || inputSampleRate
          }
        })

        this._worker = worker
        // 录音监听
        processor.onaudioprocess = (e: any) => {
          const data = []
          for (let i = 0; i < channel; i++) {
            data.push(e.inputBuffer.getChannelData(i))
          }

          worker.postMessage({ data, cmd: 'encode' })
        }

        source.connect(processor)
        processor.connect(context.destination)

        this._source = source
        this._processor = processor

        // 开始录音
        callback(null, 1)
      })
      .catch((err: Error) => {
        context && context.close()
        callback(err, null)
      })
  }

  // 停止录音
  stopRecord() {
    this._source && this._source.disconnect()
    this._processor && this._processor.disconnect()
    this._worker && this._worker.postMessage({ cmd: 'stop' })
  }
}

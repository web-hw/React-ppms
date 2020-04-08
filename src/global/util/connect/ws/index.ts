export interface IWs {
  host: string // 主机名
  protocol?: 'ws' | 'wss' // 协议
  port?: number // 端口
  query?: string // query
  timeout?: number
  message?: string // 建立连接后的默认发送数据
  onopen?: (e: any) => void
  onmessage?: (e: any) => void
  onclose?: (e: any) => void
  onsiteslogin?: () => void
  onbeforeclose?: (options: IWs, ws: WebSocket) => void
  onerror?: (e: any) => void
}

export class Ws {
  // is connecting
  private isConnecting: boolean = false
  private manualCloseCode: number = 4111
  private isCreating: boolean = false
  private reConnectingTimer: any = null
  private heartCheckingTimer: any = null
  private cacheMsgs: any[] = []
  // 配置
  private options: IWs = null
  // ws
  private ws: WebSocket = null

  // onpen
  private onopen(e: any) {
    const { onopen, message } = this.options
    this.isConnecting = true
    this.isCreating = false

    onopen && onopen(e)

    // 发送历史数据
    if (message) {
      this.cacheMsgs.push(message)
    }
    while (this.cacheMsgs.length) {
      if (!this.ws) {
        break
      }
      this.ws.send(this.cacheMsgs.shift())
    }

    // 开启心跳检查
    this.heartChecking()
  }

  private onmessage(e: any) {
    const { onmessage, onsiteslogin } = this.options
    if (e.data === '4111') {
      return onsiteslogin ? onsiteslogin() : this.close()
    }
    // 判断是否是心跳检查
    if (e.data !== 'ping') {
      onmessage && onmessage(e)
    }
  }

  // onerror
  private onerror(e: any) {
    const { onerror } = this.options
    this.ws && this.ws.close()
    this.isCreating = false
    this.reConnecting(e)

    onerror && onerror(e)
  }

  // onclose
  private onclose(e: any) {
    const { onclose } = this.options
    this.isCreating = false
    this.reConnecting(e)

    onclose && onclose(e)
  }

  private reConnecting(e: any) {
    if (e.code === this.manualCloseCode || this.isCreating) {
      return
    }
    console.log('重新连接原因：', e)
    this.isConnecting = false
    this.ws = null
    clearTimeout(this.reConnectingTimer)
    this.reConnectingTimer = setTimeout(() => this.createWs(), 2000)
  }

  private createWs() {
    try {
      const { protocol, host, port, query } = this.options
      const url = `${protocol}://${host}${port ? `:${port}` : ''}${query || ''}`
      const ws = new WebSocket(url)
      ws.onopen = e => this.onopen(e)
      ws.onmessage = e => this.onmessage(e)
      ws.onclose = e => this.onclose(e)
      ws.onerror = e => this.onerror(e)
      this.ws = ws
      this.isCreating = true
    } catch (err) {
      console.log('create WS', err)
    }
  }

  private heartChecking() {
    // clearTimeout(this.heartCheckingTimer)
    // this.heartCheckingTimer = setTimeout(
    //   () => {
    //     this.isConnecting && this.ws && this.ws.send('ping')
    //   },
    //   1 * 60 * 1000
    // )
    clearTimeout(this.heartCheckingTimer)
    this.heartCheckingTimer = setTimeout(() => {
      if (this.isConnecting && this.ws) {
        this.ws.send('ping')
        this.heartChecking()
      } else {
        clearTimeout(this.heartCheckingTimer)
      }
    },                                   1 * 60 * 1000)
  }

  send(message: string) {
    if (!message) {
      return
    }

    if (this.isConnecting && this.ws) {
      this.ws.send(message)
    } else {
      this.cacheMsgs.push(message)
    }
  }

  close() {
    const { onbeforeclose } = this.options
    onbeforeclose && onbeforeclose(this.options, this.ws)
    if (this.ws) {
      this.isConnecting = false
      this.isCreating = false
      this.cacheMsgs = []
      clearTimeout(this.reConnectingTimer)
      clearTimeout(this.heartCheckingTimer)
      this.ws.close(this.manualCloseCode, 'manual close from client')
      onbeforeclose && onbeforeclose(this.options, this.ws)
    }
  }

  constructor(options: IWs) {
    this.options = {
      protocol: location.protocol === 'https:' ? 'wss' : 'ws',
      ...options
    }
    this.createWs()
  }
}

// export class Ws {
//   // 重连开始时间
//   private reConnectBeginTime: number
//   // 重连timer
//   private reConnectTimer: any
//   // 心跳检查
//   private heartInterval: any
//   // 重连计数
//   private reConnectNum = 1
//   // 重连次数限定
//   private limitReConnectNum = 5
//   // 是否心跳状态，为false不可操作，等待重连
//   private isHeartFlat = false
//   // 重连状态
//   private isReconnect = false
//   // 配置
//   private options: IWs = null
//   // ws
//   private ws: WebSocket = null

//   // onpen
//   private onopen(e: any) {
//     const { onopen, message } = this.options
//     // 连接成功
//     this.isHeartFlat = true
//     onopen && onopen(e)
//     message && this.send(message)
//   }

//   // onmessage
//   private onmessage(e: any) {
//     const { onmessage } = this.options
//     onmessage && onmessage(e)
//   }

//   // onerror
//   private onerror(e: any) {
//     const { onerror } = this.options
//     onerror && onerror(e)
//     // 心跳值为false
//     this.isHeartFlat = false
//     if (this.reConnectNum > this.limitReConnectNum) {
//       return console.error('重连失败')
//     }

//     clearTimeout(this.reConnectTimer)
//     this.reConnectTimer = setTimeout(() => {
//       if (this.reConnectNum === 1) {
//         this.reConnectBeginTime = Date.now()
//       }

//       console.log(`尝试第${this.reConnectNum}次重连`)
//       this.isReconnect = true
//       this.reConnect()

//       // 如果心跳值为true，则重连成功
//       this.isHeartFlat && clearTimeout(this.reConnectTimer)
//     },                               2000)
//   }

//   // onclose
//   private onclose(e: any) {
//     const { onclose } = this.options
//     this.isHeartFlat = false
//     onclose && onclose(e)
//   }

//   // init
//   private init() {
//     if (!WebSocket) {
//       return console.error('浏览器不支持WebSocket')
//     }
//     const { protocol, host, port, query } = this.options
//     const url = `${protocol}://${host}${port ? `:${port}` : ''}${query || ''}`
//     const ws = new WebSocket(url)
//     ws.onopen = (e: any) => {
//       this.onopen(e)
//     }
//     ws.onmessage = (e: any) => {
//       this.onmessage(e)
//     }
//     ws.onclose = (e: any) => {
//       this.onclose(e)
//       this.ws = null
//     }
//     ws.onerror = (e: any) => {
//       this.onerror(e)
//     }
//     this.ws = ws
//   }

//   // 重连操作
//   private reConnect() {
//     // 如果没有触发重连操作，则不执行
//     if (!this.isReconnect) {
//       return
//     }

//     // 判断重连超时，若超时，则不再重连
//     if (Date.now() - this.reConnectBeginTime < this.options.timeout) {
//       this.reConnectNum++
//       this.init()
//     } else {
//       console.error('websocket重连超时')
//       this.isReconnect = false
//       // 清除重连延时器
//       clearTimeout(this.reConnectTimer)
//     }
//   }

//   constructor(options: IWs) {
//     this.options = {
//       timeout: 5000,
//       protocol: location.protocol === 'https:' ? 'wss' : 'ws',
//       ...options
//     }
//     this.init()
//   }

//   send(message: string) {
//     if (!message) {
//       return
//     }
//     if (this.isHeartFlat) {
//       return this.ws && this.ws.send(message)
//     }

//     // 连接
//     clearInterval(this.heartInterval)
//     this.heartInterval = setInterval(() => {
//       if (this.ws && this.ws.readyState) {
//         clearInterval(this.heartInterval)
//         this.send(message)
//       }
//       console.log('心跳检查')
//     },                               100)
//   }

//   close() {
//     const { onbeforeclose } = this.options
//     onbeforeclose && onbeforeclose(this.options, this.ws)
//     this.ws && this.ws.close()
//   }
// }

// import Stomp from 'stompjs'

// import { serialize } from '../../serialize'
// import { ams } from '../../init'

// export interface IConnect {
//   url: string // 连接地址
//   outgoing?: number // 发送频率
//   incoming?: number // 接受频率
//   headers?: {
//     // headers
//     login?: string
//     passcode?: string
//     [propName: string]: any
//   }
// }

// export class Ws {
//   // stomp 客户端对象
//   private _client: Stomp.Client = null
//   // 连续连接错误次数，如果超过5次将停止连接
//   private _errCount: number = 0

//   // constructor(config?: IConnect) {
//   //   config && this.connect(config)
//   // }

//   /**
//    * 连接
//    * @param {IConnect} config 连接配置
//    */
//   connect(config: IConnect) {
//     const { url, outgoing = 10000, incoming = 10000, headers = {} } = config

//     if (!url) {
//       throw new Error('url is Expected')
//     }

//     // 检查当前连接是否存在
//     const clientId = `id_${url}`
//     const globalWs = ams.get().ws || {}
//     if (globalWs[clientId]) {
//       return (this._client = globalWs[clientId])
//     }

//     /**
//      * 通过Stomp.client(url, protocols) 以原生websocket对象创建client
//      * url string 连接地址 如: ws://localhost:61614/stomp
//      * protocols string | string[] 协议 用于覆盖默认协议 可选
//      */
//     const _client = Stomp.client(url)

//     // headers
//     const clientHeaders = Object.assign(
//       { clientId, login: '', passcode: '' },
//       headers
//     )
//     // 连接成功回调
//     const successCallback = (frame?: Stomp.Frame) => {
//       this._errCount = 0
//       this._client = _client
//       ams.set({ ws: { ...globalWs, [clientId]: _client } })
//       // 发送频率
//       _client.heartbeat.outgoing = outgoing
//       // 接受消息频率 0表示不接受消息
//       _client.heartbeat.incoming = incoming
//     }
//     // 连接失败回调
//     const errorCallback = (err: string | Stomp.Frame) => {
//       this._client = null
//       this._errCount += 1
//       ams.set({ ws: { ...globalWs, [clientId]: null } })
//       console.log('ws connect error:', err)
//       // 重新连接
//       this._errCount <= 5 && this.connect(config)
//     }

//     // 创建连接
//     _client.connect(clientHeaders, successCallback, errorCallback)
//   }

//   /**
//    * 断开连接
//    * @param callback 断开连接回调
//    */
//   disconnect(callback: () => void) {
//     const _client = this._client
//     if (!_client) {
//       return
//     }

//     // 断开连接
//     _client.disconnect(() => {
//       const globalWs = ams.get().ws || {}
//       const result = Object.keys(globalWs).find(
//         key => globalWs[key] === _client
//       )
//       result && (globalWs[globalWs] = null)
//       callback()
//     })
//   }

//   /**
//    * 发送消息
//    * @param {string} dest 目的地
//    * @param {string | JSON Object} msg 消息
//    * @param {object} headers headers
//    */
//   send(
//     dest: string, // /queue/test
//     msg: string | { [propName: string]: any } | any[],
//     headers: { [propName: string]: any }
//   ) {
//     const _client = this._client
//     if (!_client) {
//       return
//     }

//     const data = serialize.stringify(msg)

//     if (!data) {
//       return
//     }
//     // 发送消息
//     _client.send(dest, headers, data)
//   }

//   /**
//    * 订阅消息
//    * @param {string} dest 目标地址 /queue/test
//    * @param {function} callback 订阅回调
//    * @returns {Stomp.Subscription} 订阅id对象
//    */
//   subMsg(dest: string, callback: (data: any) => void): Stomp.Subscription {
//     const _client = this._client
//     if (!_client) {
//       return
//     }

//     const headers = {
//       id: `id_${dest}`, // 订阅id
//       ack: 'client' // 用于确认消息
//     }
//     const subCallback = (res: any = {}) => {
//       if (!res.body) {
//         return
//       }

//       // 解析消息
//       const data = serialize.parse(res.body)
//       if (data) {
//         // 向服务器确认收到消息
//         res.ack({ suc: `收到消息${res.body}` })
//         callback(data)
//       } else {
//         // 无法处理的消息，响应给服务端
//         res.nack({ err: `无法处理${res.body}` })
//       }
//     }

//     // 订阅消息
//     return _client.subscribe(dest, subCallback, headers)
//   }

//   /**
//    * 取消订阅
//    * @param {string} id 订阅id
//    */
//   unsubById(id: string) {
//     const _client = this._client
//     if (!_client) {
//       return
//     }

//     // 取消订阅
//     _client.unsubscribe(id)
//   }
// }

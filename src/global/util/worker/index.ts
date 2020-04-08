import CbError from '../error'

type TWorkerOptions = {
  type?: 'classic' | 'module'
  credentials?: 'omit' | 'same-origin' | 'include'
  name?: string
}

type TWorkerMsg = {
  cmd?: string
  data?: { [propName: string]: any }
}

type TReceiveMsg = (err: Error, data: TWorkerMsg) => void

export class CbWorker {
  private _worker: Worker = null

  // 创建worker线程
  private createWorker(subScript: Function, options: TWorkerOptions = {}) {
    // 组装参数
    const opts: TWorkerOptions = {
      type: 'classic',
      credentials: 'omit',
      ...options
    }

    // 脚本拼接
    let globalStr = ''
    const globalFunc: any = this.getGlobalFunc()
    Object.keys(globalFunc).forEach((key: string) => {
      const func = globalFunc[key]
      globalStr += `self.${key}=${func.toString()};`
    })
    const moduleStr = `(${subScript.toString()})(self);`
    const scriptStr = `(function(){${globalStr + moduleStr}})()`

    // 创建脚本地址
    const blob = new Blob([scriptStr])
    const url = URL.createObjectURL(blob)

    // 创建worker线程
    return new Worker(url, opts)
  }

  // 创建worker公共函数
  private getGlobalFunc() {
    // 关闭线程
    const closeWorker = function (_self: any) {
      if (!_self) {
        return
      }

      _self.terminate && _self.terminate()
      _self.close && _self.close()
    }

    // 发送信息
    const sendMsg = function (_self: any, msg: TWorkerMsg) {
      if (!_self) {
        return
      }

      msg.data = msg.data || {}

      // 设置origin，用于importScripts导入静态资源
      if (_self.terminate) {
        let origin = `${location.origin}/`
        if (location.href.indexOf('index.html') !== -1) {
          origin = location.href.replace(/(index\.html.+)/, '')
        }
        msg.data.origin = origin
      }

      // 发送消息
      _self.postMessage(msg)
    }

    // 接收消息
    const receiveMsg = function (_self: any, callback: TReceiveMsg) {
      if (!_self) {
        return
      }

      _self.onmessage = function (ev: MessageEvent) {
        callback(null, ev.data)
      }
    }

    // function.toString to function
    const str2Func = function (strFunc: string) {
      return eval(`(${strFunc})`)
    }

    return {
      closeWorker,
      sendMsg,
      receiveMsg,
      str2Func
    }
  }

  constructor(
    subScript: Function,
    receiveCb: TReceiveMsg,
    options: TWorkerOptions = {}
  ) {
    let worker: Worker = null
    const { closeWorker, receiveMsg } = this.getGlobalFunc()

    const callback: TReceiveMsg = (err, msg) => {
      if (err) {
        closeWorker(worker)
      }

      receiveCb(err, msg)
    }

    try {
      worker = this.createWorker(subScript, options)

      // 监听错误
      worker.onerror = (ev: ErrorEvent) => {
        callback(new Error(ev.message), null)
      }

      // 监听message
      receiveMsg(worker, callback)
    } catch (err) {
      callback(new CbError(err.message, 404), null)
    }

    this._worker = worker
  }

  sendMsg(msg: TWorkerMsg) {
    const worker = this._worker
    const { sendMsg } = this.getGlobalFunc()

    sendMsg(worker, msg)
  }
}

import { CbWorker } from '../worker'

export class Interval {
  private _timer: any = null
  private _duration: number
  private _task: () => void

  constructor(task: () => void, duration: number = 1000) {
    this._task = task
    this._duration = duration
  }

  // 开始
  start() {
    this.stop()
    this._timer = setInterval(() => this._task(), this._duration)
  }

  // 停止
  stop() {
    clearInterval(this._timer)
    this._timer = null
  }
}

export class CbInterval {
  private _timer: any = null
  private _duration: number = 1000
  private _task: () => void
  private _worker: CbWorker = null

  // 创建worker线程
  private createWorker() {
    this._worker = new CbWorker(this.workerTask, this.receiveMsg, {
      name: 'interval'
    })

    this.sendMsg({
      cmd: 'init',
      data: { duration: this._duration }
    })
  }

  // 接收消息
  private receiveMsg(err: any, dt: any) {
    console.log(dt)
    if (err) {
      this._worker = null
      return
    }

    const { cmd } = dt
    if (cmd === 'start') {
      this._task()
    }
  }

  // 发送消息
  private sendMsg(msg: { [propName: string]: any }) {
    if (!this._worker) {
      return
    }

    this._worker.sendMsg(msg)
  }

  // worker线程任务
  private workerTask(_self: any) {
    const { receiveMsg, closeWorker, sendMsg } = _self
    let duration: number = 1000
    let timer: any = null

    const restart = () => {
      clearInterval(timer)
      timer = null
    }

    const stop = () => {
      restart()
      closeWorker(_self)
    }

    const start = () => {
      restart()

      timer = setInterval(() => sendMsg(_self, { cmd: 'start' }), duration)
    }

    receiveMsg(_self, (err: Error, dt: any) => {
      if (err) {
        return stop()
      }

      // 任务
      const { cmd, data = {} } = dt
      switch (cmd) {
        case 'init':
          return (duration = data.duration || 1000)
        case 'start':
          return start()
        case 'stop':
          return stop()
      }
    })
  }

  constructor(task: () => void, duration: number = 1000) {
    this._task = task
    this._duration = duration
    this.receiveMsg = this.receiveMsg.bind(this)
  }

  // 开始
  start() {
    // 创建worker线程
    this.createWorker()

    const worker = this._worker
    // 表示worker线程创建成功
    if (worker) {
      worker.sendMsg({ cmd: 'start' })
    } else {
      this.stop()
      this._timer = setInterval(() => this._task(), this._duration)
    }
  }

  // 停止
  stop() {
    const worker = this._worker
    if (worker) {
      worker.sendMsg({ cmd: 'stop' })
    } else {
      clearInterval(this._timer)
      this._timer = null
    }
  }
}

// 倒计时
export class CountDown {
  private _interval: Interval = null
  private _duration: number = null
  private _start: number = null

  private task(currTime: number) {
    const hc = 1000 * 60 * 60
    const h = Math.floor(currTime / hc)
    const mc = 1000 * 60
    const m = Math.floor((currTime - h * hc) / mc)
    const s = Math.floor((currTime - h * hc - m * mc) / 1000)
    let time = ''
    if (h > 0) {
      time += `${h < 10 ? `0${h}` : h}:`
    }
    if (m > 0) {
      time += `${m < 10 ? `0${m}` : m}:`
    }

    time += `${s < 10 ? `0${s}` : s}`

    return time
  }

  constructor(duration: number, start: number = +new Date()) {
    this._start = start
    this._duration = duration
  }

  start(callback: (time: string) => void) {
    const startTime = Math.floor(+new Date(this._start) / 1000) * 1000
    let endTime =
      Math.floor(+new Date(this._start + this._duration) / 1000) * 1000
    callback(this.task(endTime - startTime))

    // 开始定时任务
    this._interval = new Interval(() => {
      endTime -= 1000
      if (endTime < startTime) {
        return this.stop()
      }

      callback(this.task(endTime - startTime))
    })

    this._interval.start()
  }

  stop() {
    this._interval && this._interval.stop()
  }
}

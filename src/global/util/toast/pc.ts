import { message } from 'antd'

export const toast = {
  // 显示时间
  _duration: 3,

  info(msg: string, duration: number = this._duration) {
    message.info(msg, duration)
  },
  loading(msg: string, duration: number = this._duration) {
    message.loading(msg, duration)
  },
  success(msg: string, duration: number = this._duration) {
    message.success(msg, duration)
  },
  error(msg: string, duration: number = this._duration) {
    message.error(msg, duration)
  },
  warning(msg: string, duration: number = this._duration) {
    message.warning(msg, duration)
  }
}

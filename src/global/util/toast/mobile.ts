import { Toast } from 'antd-mobile'

export const toast = {
  // 显示时间
  _duration: 2,

  info(
    msg: string,
    duration: number = this._duration,
    callback: () => void = null
  ) {
    Toast.info(msg, duration, callback, true)
  }
}

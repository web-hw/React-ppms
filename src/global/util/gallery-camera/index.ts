import { E_ACCEPT_TYPE, E_CAPTURE_TYPE, TFileChange } from './config'
import { getFileByJsCapture, getFilesByJsAccept } from './js-gallery-camera'
import {
  getFileByPlusCapture,
  getFilesbyPlusAccept
} from './plus-gallery-camera'

/**
 * 拍照 | 录像
 * @param capture 类型
 * @param callback 回调
 */
export const getFileByCapture = (
  capture: E_CAPTURE_TYPE,
  callback: TFileChange
) => {
  getFileByPlusCapture(capture)
    .then((files: File[]) => callback(null, files))
    .catch((err: any) => {
      // plus的用户取消
      if (err === 'null' || err.code === 11) {
        return
      }

      if (err.code === 404) {
        return getFileByJsCapture(capture, callback)
      }

      callback(err, null)
    })
}

/**
 * 获取系统文件
 * @param accept 类型
 * @param callback 回调
 * @param multiple 是否多选
 */
export const getFilesByAccept = (
  accept: E_ACCEPT_TYPE,
  callback: TFileChange,
  multiple: boolean = true
) => {
  getFilesbyPlusAccept(accept, multiple)
    .then((files: File[]) => callback(null, files))
    .catch((err: any) => {
      // plus 用户取消
      if (err.code === 12) {
        return
      }

      if (err.code === 404) {
        return getFilesByJsAccept(accept, callback, multiple)
      }

      callback(err, null)
    })
}

export { E_ACCEPT_TYPE, E_CAPTURE_TYPE }

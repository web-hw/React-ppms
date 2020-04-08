import { getPlus } from '../plus'
import { E_ACCEPT_TYPE, E_CAPTURE_TYPE } from './config'
import CbError from '../error'
import { base642FileOrBlob } from '../file'

/**
 * 获取摄像头对象
 */
const getCamera = () =>
  new Promise((resolve, reject) => {
    getPlus()
      .then((plus: any) => {
        resolve(plus.camera.getCamera()) // 1表示主摄像头，2表示辅摄像头。
      })
      .catch(reject)
  })

/**
 * 读取文件
 * @param {string} url 文件路径
 */
const readFilebyPlus = (url: string) =>
  new Promise((resolve, reject) => {
    getPlus()
      .then((plus: any) => {
        plus.io.resolveLocalFileSystemURL(
          url,
          (entry: any) =>
            entry.file((file: any) => {
              const fileReader = new plus.io.FileReader()
              fileReader.readAsDataURL(file)
              fileReader.onloadend = (e: any) => {
                base642FileOrBlob(e.target.result, 'file', (err, file) =>
                  err ? reject(err) : resolve(file)
                )
              }
              // resolve(file)
            }),
          reject
        )
      })
      .catch(reject)
  })

/**
 * 拍照|录像
 * @param {E_CAPTURE_TYPE} type 类型
 */
export const getFileByPlusCapture = (capture: E_CAPTURE_TYPE) =>
  new Promise((resolve, reject) => {
    getCamera()
      .then((camera: any) => {
        let plusCapture: any = null
        let format: string = null
        switch (capture) {
          case E_CAPTURE_TYPE.IMAGE:
            plusCapture = camera.captureImage
            format = 'png'
            break
          case E_CAPTURE_TYPE.VIDEO:
            plusCapture = camera.startVideoCapture
            format = 'mp4'
            break
        }

        if (!plusCapture) {
          return reject(new CbError(`类型${capture}不被支持`, 404))
        }

        // 获取文件
        plusCapture(
          (path: string) =>
            readFilebyPlus(path)
              .then((file: File) => resolve([file]))
              .catch(reject),
          reject,
          { format, filename: '_doc/camera/' }
        )
      })
      .catch(reject)
  })

const fileType = {
  [E_ACCEPT_TYPE.IMAGE]: 'image', // 图片
  [E_ACCEPT_TYPE.VIDEO]: 'video', // 视频
  [E_ACCEPT_TYPE.NONE]: 'none', // 所有文件
  [E_ACCEPT_TYPE.OTHER]: 404
}

/**
 * 根据accept获取图片
 * @param {E_ACCEPT_TYPE} type 类型
 * @param {boolean} multiple 是否多选
 */
export const getFilesbyPlusAccept = (
  type: E_ACCEPT_TYPE,
  multiple: boolean = true
) =>
  new Promise((resolve, reject) => {
    getPlus()
      .then((plus: any) => {
        const filter = fileType[type]
        if (filter === 404) {
          return reject(new CbError(`类型${type}不被支持`, 404))
        }

        plus.gallery.pick(
          (data: any) => {
            let paths: string[] = []

            // 单文件
            if (typeof data === 'string') {
              paths.push(data)
              // 多文件
            } else {
              paths = [...(data.files || [])]
            }

            // 读取文件
            const alls: any[] = []
            paths.forEach((path: string) => {
              alls.push(
                readFilebyPlus(path)
                  .then((file: File) => file)
                  .catch(reject)
              )
            })

            Promise.all(alls)
              .then(resolve)
              .catch(reject)
          },
          reject,
          {
            filter,
            multiple,
            filename: '_doc/gallery/',
            system: true
          }
        )
      })
      .catch(reject)
  })

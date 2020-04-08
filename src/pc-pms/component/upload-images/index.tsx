import * as React from 'react'
import {} from 'react-router-dom'
import { Icon } from 'antd'

import { getFilesByAccept, E_ACCEPT_TYPE } from 'global@util/gallery-camera'
import { toast } from 'global@util/toast/pc'
import { fileOrBlob2Base64 } from 'global@util/file'
import Modal from '../modal'
const style = require('./style')

export type TImg = {
  name?: string
  url: string
}

export type TChangeFile = {
  url: string
  name: string
  file: File
}

export type TValidFileResult = {
  error: Error
  file: File
}

interface IPropsUploadImages {
  imgs: TImg[]
  change: (files: TChangeFile[]) => void
  imgNum?: number // 图片数
  imgSize?: number // 图片大小单位M
  imgType?: string[] // 图片类型
  isPreview?: boolean
  isDelete?: boolean
  deleteImg?: (img: TImg, idx: number) => void
}

interface IStateUploadImages {
  previewVisible: boolean
  previewImg: TImg
}

export default class UploadImages extends React.PureComponent<
  IPropsUploadImages,
  IStateUploadImages
> {
  // 验证文件后缀
  static validFileSuffix(files: File[], suffixs: string[]): TValidFileResult {
    const errFile = files.find((file: File) => {
      const name = file.name.toLowerCase()

      const result = suffixs.find((format: string) => {
        return new RegExp(`^.+\.${format}$`).test(name)
      })

      return !result
    })

    return {
      file: errFile || null,
      error: errFile ? new Error(`图片格式为${suffixs.join('、')}!`) : null
    }
  }

  // 验证文件大小 单位M
  static validFileSize(files: File[], imgSize: number): TValidFileResult {
    const errFile = files.find(file => file.size > imgSize * 1024 * 1024)

    return {
      file: errFile || null,
      error: errFile ? new Error(`图片大小不能超过${imgSize}M!`) : null
    }
  }

  // file to base64
  static fileOrBlob2Base64(
    files: File[],
    callback: (files: TChangeFile[]) => void
  ) {
    const promises = files.map(
      file =>
        new Promise((resolve, reject) => {
          fileOrBlob2Base64(file, (err: Error, url: string) => {
            if (err) {
              return reject(err)
            }

            resolve({ file, url, name: file.name })
          })
        })
    )

    Promise.all(promises)
      .then(callback)
      .catch(err => console.error(err))
  }

  private _defImgType: string[] = ['png', 'jpg', 'jpeg']

  // 重置图片样式
  private onLoadImgSetStyle(event: any) {
    const target = event.target
    const w = target.width
    const h = target.height

    let style: any = { width: '100%', height: 'auto' }
    if (w > h) {
      style = { width: 'auto', height: '100%' }
    }

    Object.keys(style).forEach(key => (target.style[key] = style[key]))
  }

  // 预览
  private onPreview(img?: TImg) {
    this.setState({
      previewImg: img || null,
      previewVisible: !!img
    })
  }

  // 删除图片
  private onDeleteImg(img: TImg, idx: number) {
    const { deleteImg } = this.props

    deleteImg && deleteImg(img, idx)
  }

  // 选择图片
  private onSelectFile() {
    const { change, imgSize = 1, imgType = this._defImgType } = this.props

    getFilesByAccept(
      E_ACCEPT_TYPE.IMAGE,
      (err: Error, files: File[]) => {
        if (err) {
          return console.error(err)
        }

        // 验证图片
        let result = UploadImages.validFileSuffix(files, imgType)
        if (!result.error) {
          // 验证大小
          result = UploadImages.validFileSize(files, imgSize)
        }

        if (result.error) {
          return toast.error(result.error.message)
        }

        UploadImages.fileOrBlob2Base64(files, change)
      },
      false
    )
  }

  constructor(props: IPropsUploadImages) {
    super(props)

    this.state = {
      previewVisible: false,
      previewImg: null
    }

    this.onSelectFile = this.onSelectFile.bind(this)
  }

  render() {
    const { previewImg, previewVisible } = this.state
    const { imgs, imgNum = 1, isPreview = true, isDelete = true } = this.props

    return (
      <div className={`${style.uploadImages} wp100 bsb`}>
        {imgs.map((itm, idx) => (
          <div key={idx} className={`${style.imgItm}`}>
            <div className="wp100 hp100 pr oh">
              <img
                className="mc zi100"
                src={itm.url}
                title={itm.name || itm.url}
                onLoad={this.onLoadImgSetStyle}
              />
              {!(isPreview || isDelete) ? null : (
                <div className="img-ope palt zi200 wp100 hp100">
                  <span className="mc">
                    {!isPreview ? null : (
                      <Icon
                        type="eye"
                        style={{ fontSize: 18, color: '#fff' }}
                        title="预览"
                        onClick={() => this.onPreview(itm)}
                      />
                    )}
                    {!isDelete ? null : (
                      <Icon
                        type="delete"
                        style={{ fontSize: 18, color: '#fff' }}
                        title="删除"
                        onClick={() => this.onDeleteImg(itm, idx)}
                      />
                    )}
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
        {imgs.length >= imgNum ? null : (
          <div
            onClick={this.onSelectFile}
            className={`${style.imgUpload} ${style.imgItm}`}
          >
            <div className="wp100 hp100 pr oh">
              <span className="mc">
                <Icon type="plus" style={{ fontSize: 32 }} title="上传" />
              </span>
            </div>
          </div>
        )}
        {/* 预览 */}
        <Modal
          visible={previewVisible}
          footer={null}
          closable={false}
          centered={false}
          onCancel={() => this.onPreview()}
        >
          {!previewImg ? null : (
            <img
              title={previewImg.name || previewImg.url}
              className="wp100"
              src={previewImg.url}
            />
          )}
        </Modal>
      </div>
    )
  }
}

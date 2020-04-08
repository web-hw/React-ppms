import * as React from 'react'
import {} from 'react-router-dom'
import { Modal, Button } from 'antd-mobile'

import { toast } from 'global@util/toast/mobile'
import { downloadPlusOrJS, previewPlusOrJS } from 'global@util/download'
import Loading from '../loading'
import { Header } from '../header'
import { fetch } from '../../connect'
import { E_MESSAGE_TYPE } from '../../store/chat/constant'
import Video from '../../view/chat/video'
import Audio from '../../view/chat/audio'
const style = require('./style')

interface IFile {
  id?: string
  type?: E_MESSAGE_TYPE
  name?: string
  size?: string
  icon?: string
  url?: string
  sendTime?: string
  fromName?: string
  fromChatId?: string
  collect_type?: 1 | 2 // 1 好友同事陌生人 2 群聊讨论组
}

interface IPropsPreviewFile {
  visible: boolean
  file: IFile
  onClose: () => void
}

interface IStatePreviewFile {
  loading: boolean
  isClt: boolean
}

export default class PreviewFile extends React.PureComponent<
  IPropsPreviewFile,
  IStatePreviewFile
> {
  private _collect1Def = require('../../assets/images/collect1-def.png')
  private _collect1Act = require('../../assets/images/collect1-act.png')
  private _collect2Def = require('../../assets/images/collect2-def.png')
  private _collect2Act = require('../../assets/images/collect2-act.png')

  // 下载
  private onDownloadFile(file: IFile) {
    if (!file.url || !file.name) {
      return
    }

    downloadPlusOrJS(
      file.url,
      file.name,
      (
        type: 'error' | 'do' | 'done' | 'doing',
        data: Error | { loaded: number; total: number; localPath: string }
      ) => {
        switch (type) {
          case 'error':
            return toast.info(data instanceof Error ? data.message : '未知错误')
          case 'do':
            return toast.info('开始下载')
          case 'done':
            let msg = '下载完成'
            if (data && !(data instanceof Error) && data.localPath) {
              msg += `,本地地址${data.localPath}`
            }
            return toast.info(msg, 3)
          case 'doing':
          // return console.log(`下载进度${JSON.stringify(data)}`)
        }
      }
    )
  }

  private async onCollect(data: IFile) {
    const { isClt } = this.state
    if (isClt) {
      return toast.info('已经收藏过了')
    }

    this.setState({ loading: true })
    const result = await fetch('/message/collect', { data, method: 'POST' })
    const dt = result.data || {}
    const state: any = { loading: false }
    if (dt.code === 200) {
      toast.info('收藏成功')
      state.isClt = true
    }

    this.setState({ ...state })
  }

  private async isCollect(file: any) {
    this.setState({ loading: true })
    const result = await fetch('/message/is-collect', {
      method: 'POST',
      data: { url: file.url }
    })
    const data = result.data || {}
    this.setState({ loading: false, isClt: !!data.status })
  }

  private canPreview(file: any) {
    const result = {
      can: false,
      url: file.url,
      name: file.name,
      scheme: `${location.origin}/pdfjs/web/viewer.html?file=${file.url}`
    }

    if (file.type === E_MESSAGE_TYPE.FILE_WORD) {
      result.can = true
    }

    if (file.type === E_MESSAGE_TYPE.FILE_PPT) {
      result.can = true
    }

    if (file.type === E_MESSAGE_TYPE.FILE_TXT) {
      result.can = true
    }

    if (file.type === E_MESSAGE_TYPE.FILE_XLS) {
      result.can = true
    }

    if (file.type === E_MESSAGE_TYPE.FILE_OTHER) {
      const name = file.name.toLowerCase()
      if (new RegExp('^.+.pdf$').test(name)) {
        result.can = true
      }
    }

    return result
  }

  private onPreview(data: any) {
    previewPlusOrJS(data.name, data.url, (type: 'error', data: Error) => {
      if (type === 'error') {
        toast.info(data.message || '未知错误')
      }
    })
  }

  constructor(props: IPropsPreviewFile) {
    super(props)

    this.state = {
      loading: false,
      isClt: false
    }
  }

  componentWillReceiveProps(nextProps: IPropsPreviewFile) {
    if (nextProps.visible && !this.props.visible) {
      this.isCollect(nextProps.file)
    }
  }

  render() {
    const { visible = false, file = {}, onClose = () => {} } = this.props
    const { loading, isClt } = this.state

    const isCanPreview = this.canPreview(file)

    return (
      <Modal
        popup={true}
        visible={visible}
        animationType="slide-up"
        className={style.fileModal}
      >
        {!file.type ? null : file.type === E_MESSAGE_TYPE.FILE_IMG ||
          file.type === E_MESSAGE_TYPE.FILE_AUDIO ||
          file.type === E_MESSAGE_TYPE.FILE_VIDEO ? (
          <Loading spinning={loading} className="bg-000 wp100 hp100 bsb pt50">
            <Header
              onClickLeft={onClose}
              left={
                <span
                  className="ope"
                  style={{
                    backgroundImage: `url(${require('../../assets/images/file-modal-close.png')})`
                  }}
                />
              }
              right={[
                <span
                  key="collect"
                  className="ope mr10"
                  style={{
                    backgroundImage: `url(${
                      isClt ? this._collect2Act : this._collect2Def
                    })`
                  }}
                  onClick={() => this.onCollect(file)}
                />,
                <span
                  key="download"
                  onClick={() => this.onDownloadFile(file)}
                  className="ope"
                  style={{
                    backgroundImage: `url(${require('../../assets/images/file-modal-download.png')})`
                  }}
                />
              ]}
            />
            <div className="wp100 hp100 oay sb">
              {file.type === E_MESSAGE_TYPE.FILE_VIDEO && (
                <Video
                  data={file}
                  className="video"
                  isFixWH={true}
                  controls={['play-large', 'play', 'progress', 'current-time']}
                />
              )}
              {file.type === E_MESSAGE_TYPE.FILE_AUDIO && <Audio data={file} />}
              {file.type === E_MESSAGE_TYPE.FILE_IMG && (
                <div className="image wp100 hp100 pr oh">
                  <img className="mc" src={file.url} />
                </div>
              )}
            </div>
          </Loading>
        ) : (
          <Loading spinning={loading} className="bg-fff wp100 hp100 bsb pt50">
            <Header
              onClickLeft={onClose}
              right={
                <span
                  key="collect"
                  className="ope"
                  style={{
                    backgroundImage: `url(${
                      isClt ? this._collect1Act : this._collect1Def
                    })`
                  }}
                  onClick={() => this.onCollect(file)}
                />
              }
            />
            <div className="wp100 hp100 oay sb pr">
              <div className="file-other-download wp100 p10 bsb mc tac oh">
                <img src={file.icon} />
                <div className="name wp100 tes fs12">{file.name}</div>
                <div className="des wp100 tes fs12">文件大小:{file.size}</div>
                {isCanPreview.can && (
                  <Button
                    className="mb10"
                    onClick={() => this.onPreview(isCanPreview)}
                  >
                    本地预览
                  </Button>
                )}
                <Button onClick={() => this.onDownloadFile(file)}>下载</Button>
              </div>
            </div>
          </Loading>
        )}
      </Modal>
    )
  }
}

import { getPlus } from 'global@util/plus'
const dljs = require('downloadjs')

export const downloadJS = (
  url: string,
  name: string,
  callback: (
    type: 'error' | 'do' | 'done' | 'doing',
    data: Error | { loaded: number; total: number }
  ) => void
) => {
  const xhr = new XMLHttpRequest()
  xhr.open('GET', url, true)
  xhr.responseType = 'blob'

  xhr.onload = function () {
    const blob: Blob = this.response
    if (!blob) {
      callback('error', new Error(`文件${url}不存在`))
    } else {
      try {
        dljs(blob, name, blob.type)
        callback('done', null)
      } catch (err) {
        callback('error', err)
      }
    }
  }

  xhr.onprogress = function (e) {
    callback('doing', { loaded: e.loaded || 0, total: e.total || 0 })
  }

  xhr.onerror = function () {
    callback('error', new Error(`文件${url}下载失败`))
  }

  xhr.send()
  callback('do', null)
}

export const downloadPlusOrJS = (
  url: string,
  name: string,
  callback: (
    type: 'error' | 'do' | 'done' | 'doing',
    data: Error | { loaded?: number; total?: number; localPath?: string }
  ) => void
) => {
  getPlus()
    .then((plus: any) => {
      const dtask = plus.downloader.createDownload(
        url,
        { method: 'GET', filename: `_downloads/${name}` },
        (d: any, status: any) => {
          if (status === 200) {
            plus.io.resolveLocalFileSystemURL(
              `_downloads/${name}`,
              (entry: any) =>
                callback('done', { localPath: entry.fullPath || '' }),
              () => callback('done', { localPath: '' })
            )
            // callback('done', null)
          } else {
            callback('error', new Error(`文件${url}下载失败`))
          }
        }
      )
      dtask.addEventListener('statechanged', (task: any, status: any) => {
        switch (task.state) {
          case 1:
            return callback('do', null)
          // case 2: mui.toast('链接到服务器...');break;//链接到服务器
          case 3: // 进度
            return callback('doing', {
              loaded: task.downloadedSize || 0,
              total: task.totalSize || 0
            })
          // case 4: mui.toast('下载完成');break;
        }
      })
      dtask.start()
    })
    .catch((err: any) => {
      if (err.code === 404) {
        downloadJS(url, name, callback)
      } else {
        callback('error', err)
      }
    })
}

export const previewJs = (
  name: string,
  url: string,
  callback: (type: 'error', data: Error) => void
) => {
  const isPdfTxt = /\.(pdf|txt)?$/.test(name.toLowerCase())
  const isWps = /\.(doc|docx|ppt|pptx|xls|xlsx)?$/.test(name.toLowerCase())

  if (!(isPdfTxt || isWps)) {
    return callback('error', new Error('当前文件不支持在线预览'))
  }

  let src = url
  if (isWps) {
    src = `https://view.officeapps.live.com/op/view.aspx?src=${src}`
  }

  const body = document.body
  // 容器
  const wrap = document.createElement('div')
  wrap.className = 'wp100 hp100 palt oh'
  wrap.setAttribute('style', 'z-index:99999;background-color:#fff')

  // head
  const head = document.createElement('div')
  head.className = 'part fs14 p10'
  head.innerHTML = '关闭'
  head.onclick = () => body.removeChild(wrap)
  wrap.appendChild(head)

  // iframe
  const cbiframe = document.createElement('div')
  cbiframe.className = 'wp100 hp100 oay sb'
  const iframe = document.createElement('iframe')
  iframe.setAttribute('style', 'width:100%;min-height:100%')
  iframe.src = src
  cbiframe.appendChild(iframe)
  wrap.appendChild(cbiframe)

  body.appendChild(wrap)
}

export const previewPlusOrJS = (
  name: string,
  url: string,
  callback: (type: 'error', data: Error) => void
) => {
  getPlus()
    .then((plus: any) => {
      const path = `_downloads/${name}`

      // 初始化文件
      const initFile = () => {
        const dtask = plus.downloader.createDownload(
          url,
          { method: 'GET', filename: path },
          (d: any, status: any) => {
            if (status === 200) {
              plus.runtime.openFile(path)
            } else {
              callback('error', new Error('文件初始化失败'))
            }
          }
        )
        dtask.start()
      }

      // 检查文件是否存在
      plus.io.resolveLocalFileSystemURL(
        path,
        (entry: any) => {
          if (entry.isFile) {
            plus.runtime.openFile(path)
          } else {
            initFile()
          }
        },
        () => initFile()
      )
    })
    .catch((err: any) => {
      callback('error', err)
      // if (err.code === 404) {
      //   previewJs(name, url, callback)
      // } else {
      //   callback('error', err)
      // }
    })
}

import exif from 'exif-js'

type TCallback = (err: Error, data: string | File | Blob) => void

/**
 * file or blob to base64
 * @param {File | Blob} file 文件
 * @param {TCallback} callback 回调
 */
export const fileOrBlob2Base64 = (file: File | Blob, callback: TCallback) => {
  try {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = (e: any) => callback(null, e.target.result)
  } catch (err) {
    callback(err, null)
  }
}

/**
 * base64 2 file or blob
 * @param {string} base64
 * @param {'file' | 'blob'} type
 * @param {TCallback} callback
 */
export const base642FileOrBlob = (
  base64: string,
  type: 'file' | 'blob' = 'file',
  callback: TCallback,
  mm?: string
) => {
  try {
    const arr = base64.split(',')
    const mime = mm || arr[0].match(/:(.*?);/)[1]
    const byte = atob(arr[1])
    let n = byte.length
    const u8arr = new Uint8Array(n)
    while (n--) {
      u8arr[n] = byte.charCodeAt(n)
    }
    const file =
      type === 'blob'
        ? new Blob([u8arr], { type: mime })
        : new File([u8arr], mime.replace('/', '.'), { type: mime })
    callback(null, file)
  } catch (err) {
    callback(err, null)
  }
}

/**
 * blob 2 file
 * @param {Blob} blob
 * @param {TCallback} callback
 */
export const blob2File = (blob: Blob, callback: TCallback) => {
  try {
    const file = new File([blob], blob.type.replace('/', '.'), {
      type: blob.type
    })
    callback(null, file)
  } catch (err) {
    callback(err, null)
  }
}

/**
 * file 2 blob
 * @param {File} file
 * @param {TCallback} callback
 */
export const file2Blob = (file: File, callback: TCallback) => {
  fileOrBlob2Base64(file, (err, base64: string) => {
    if (err) {
      return callback(err, null)
    }

    base642FileOrBlob(base64, 'blob', callback)
  })
}

/**
 * img 2 base64 or blob
 * @param {string} url,需要允许跨域访问
 * @param {TCallback} callback
 */
export const img2Base64OrBlob = (
  url: string,
  type: 'base64' | 'blob' = 'base64',
  callback: TCallback
) => {
  try {
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    const img = new Image()
    // img.crossOrigin = 'Anonymous'
    img.src = `${url}?t=${+new Date()}`
    img.onload = () => {
      // 绘制图片
      canvas.height = img.height
      canvas.width = img.width
      context.drawImage(img, 0, 0)

      // 获取mime 类型
      const imgSuffix = ['bmp', 'png', 'gif', 'jpg', 'jpeg', 'webp']
      const validSuffix = imgSuffix.find(itm =>
        img.src.toLowerCase().includes(`.${itm}`)
      )
      const mime = `image/${validSuffix || 'png'}`

      // 转成blob | base64
      if (type === 'blob') {
        canvas.toBlob(blob => callback(null, blob), mime)
      } else {
        callback(null, canvas.toDataURL(mime))
      }
    }
  } catch (err) {
    callback(err, null)
  }
}

export const compressImage = (
  file: File,
  options: { wp?: number; quality?: number },
  callback: (err: Error, file: File) => void
) => {
  const getP = (p: number) => {
    if (!p || p < 0 || p > 1) {
      return 0.5
    }

    return p
  }

  fileOrBlob2Base64(file, (err: Error, base64: string) => {
    if (err) {
      return callback(err, null)
    }

    // 压缩图片
    const img = new Image()
    img.src = base64
    img.onload = () => {
      let w = img.width
      let h = img.height
      const scale = w / h

      // 宽的比例
      const wp = getP(options.wp)
      // 质量比
      const quality = getP(options.quality)

      // 宽高
      w = w * wp
      h = w / scale

      try {
        // 生成canvas
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        canvas.width = w
        canvas.height = h
        // // 创建属性节点
        // const anw: any = document.createAttribute('width')
        // anw.nodeValue = w
        // const anh: any = document.createAttribute('height')
        // anh.nodeValue = h
        // canvas.setAttributeNode(anw)
        // canvas.setAttributeNode(anh)

        // 绘制
        ctx.drawImage(img, 0, 0, w, h)

        canvas.toBlob(
          (file: Blob) => blob2File(file, callback),
          'image/jpeg',
          quality
        )
      } catch (err) {
        callback(err, null)
      }
    }
  })
}

export const captureImgOfVideo = (
  source: string | File | Blob,
  callback: (err: Error, blob: File) => void
) => {
  const wraper = document.createElement('div')
  const video = document.createElement('video')
  const canvas = document.createElement('canvas')
  const body = document.body
  const quality = 0.5

  let url: string
  if (typeof source === 'string') {
    url = source
    video.setAttribute('crossOrigin', 'anonymous')
  } else {
    url = window.URL.createObjectURL(source)
  }

  // 设置容器元素属性
  wraper.setAttribute('style', 'width:100%;height:0;overflow:hidden;')

  // 设置video属性
  video.setAttribute('src', url)
  video.setAttribute('muted', 'true')
  video.setAttribute('controls', 'true')
  video.setAttribute('x5-playsinline', 'true')
  video.setAttribute('webkit-playsinline', 'true')
  video.setAttribute('playsinline', 'true')
  video.setAttribute('x5-video-player-type', 'h5')
  video.setAttribute('x-webkit-airplay', 'allow')
  video.setAttribute('x5-video-player-fullscreen', 'true') // 全屏设置，设置为 true 是防止横屏
  video.setAttribute('x5-video-orientation', 'portrait')
  video.setAttribute('style', 'width:100%;height:auto;')

  // 播放
  wraper.appendChild(video)
  wraper.appendChild(canvas)
  body.appendChild(wraper)

  video.volume = 0
  video.play() // 需要播放 iOS才能触发oncanplay事件

  // 截屏
  video.oncanplaythrough = () => {
    setTimeout(() => {
      try {
        let w = video.videoWidth * quality
        let h = video.videoHeight * quality
        if (!w || !h) {
          const s = window.getComputedStyle(video, null)
          w = (parseInt(s.width, 10) || body.offsetWidth) * quality
          h = (parseInt(s.height, 10) || body.offsetHeight) * quality
        }
        canvas.width = w
        canvas.height = h
        canvas.getContext('2d').drawImage(video, 0, 0, w, h)
        canvas.toBlob(
          (blob: Blob) => blob2File(blob, callback),
          'image/jpeg',
          quality
        )
      } catch (err) {
        callback(err, null)
      } finally {
        // 销毁video
        video.pause()
        video.removeAttribute('src')
        video.load()

        // 移除
        body.removeChild(wraper)
      }
    },         500)
  }
}

// 处理图片旋转问题 部分系统如小米
export const orientationImg = (
  file: File,
  callback: (err: Error, file: File) => void
) => {
  const getFileByCanvas = (
    file: File,
    deg: 90 | -90 | 180,
    callback: (err: Error, file: File) => void
  ) => {
    const img = new Image()
    img.src = window.URL.createObjectURL(file)
    img.onload = () => {
      try {
        const w = img.width
        const h = img.height
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        // 旋转度数
        const degree = (deg * Math.PI) / 180

        // 旋转绘制
        if (deg === 90 || deg === -90) {
          canvas.width = h
          canvas.height = w
          ctx.rotate(degree)
          ctx.drawImage(img, 0, deg === 90 ? -h : h)
        }
        if (deg === 180) {
          canvas.width = w
          canvas.height = h
          ctx.rotate(degree)
          ctx.drawImage(img, -w, -h)
        }

        // 获取file
        canvas.toBlob(
          (blob: Blob) => blob2File(blob, callback),
          'image/jpeg',
          1
        )
      } catch (err) {
        callback(err, null)
      }
    }
  }

  const f: any = file
  exif.getData(f, () => {
    exif.getAllTags(f)
    const deg = exif.getTag(f, 'Orientation')
    switch (deg) {
      case 1: // 0度
        return callback(null, file)
      case 3: // 180度
        return getFileByCanvas(file, 180, callback)
      case 6: // 顺时针九十度
        return getFileByCanvas(file, 90, callback)
      case 8: // 逆时针九十度
        return getFileByCanvas(file, -90, callback)
      default:
        return callback(null, file)
    }
  })
}

// 压缩图片 && 转换角度
export const compressAndOrientationImage = (
  file: File,
  options: { wp?: number; quality?: number },
  callback: (err: Error, file: File) => void
) => {
  const getP = (p: number) => {
    if (!p || p < 0 || p > 1) {
      return 0.5
    }

    return p
  }

  const getFileByCanvas = (
    file: File,
    deg: number,
    callback: (err: Error, file: File) => void
  ) => {
    const img = new Image()
    img.src = window.URL.createObjectURL(file)
    img.onload = () => {
      try {
        // 宽高
        let w = img.width
        let h = img.height
        const wp = getP(options.wp) // 宽的比例
        const quality = getP(options.quality) // 质量比
        w = w * wp
        h = h * wp

        // 绘制
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')

        // 处理角度
        let dg = deg < 0 ? 360 + deg : deg
        dg = dg % 360

        // 设置宽高
        if ((dg > 45 && dg < 135) || (dg > 225 && dg < 315)) {
          canvas.width = h
          canvas.height = w
        } else {
          canvas.width = w
          canvas.height = h
        }
        const cw = canvas.width
        const ch = canvas.height

        // 绘制
        ctx.clearRect(0, 0, cw, ch)
        ctx.translate(cw / 2, ch / 2)
        ctx.rotate((dg * Math.PI) / 180)
        ctx.translate(-cw / 2, -ch / 2)
        ctx.drawImage(img, cw / 2 - w / 2, ch / 2 - h / 2, w, h)
        ctx.translate(cw / 2, ch / 2)
        ctx.rotate((-dg * Math.PI) / 180)
        ctx.translate(-cw / 2, -ch / 2)
        ctx.restore()

        // 获取file
        canvas.toBlob(
          (blob: Blob) => blob2File(blob, callback),
          'image/jpeg',
          quality
        )
      } catch (err) {
        callback(err, null)
      }
    }
  }

  const f: any = file
  exif.getData(f, () => {
    exif.getAllTags(f)
    const deg = exif.getTag(f, 'Orientation')
    switch (deg) {
      // case 1: // 0度
      //   return callback(null, file)
      case 3: // 180度
        return getFileByCanvas(file, 180, callback)
      case 6: // 顺时针九十度
        return getFileByCanvas(file, 90, callback)
      case 8: // 逆时针九十度
        return getFileByCanvas(file, -90, callback)
      default:
        return getFileByCanvas(file, 0, callback)
    }
  })
}

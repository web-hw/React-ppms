const SparkMD5 = require('spark-md5')

class ChunkUploadFile {
  private _csize: number // 2M 每片大小
  private _cs: number // 总共多少片
  private _file: File // 文件
  private _slice = File.prototype.slice
  private _processOfMd5: Function = null
  private _checkFileByMd5: Function = null
  private _uploadFile: Function = null
  private _processOfUpload: Function = null
  private _chunkEnd: Function = null
  private _uploadSuccess: Function = null

  constructor(param: {
    file: File
    chunkSize?: number
    uploadFile: (data: FormData) => any
    chunkEnd: (md5: string) => any
    checkFileByMd5: (md5: string) => { file: any; chucks: string[] }
    processOfMd5?: (process: number) => void
    processOfUpload?: (data: { [propName: string]: any }) => void
    uploadSuccess?: (data: { [propName: string]: any }) => void
  }) {
    const {
      file,
      uploadFile,
      chunkEnd,
      checkFileByMd5,
      processOfMd5 = null,
      processOfUpload = null,
      uploadSuccess = null,
      chunkSize = 2 * 1024 * 1024
    } = param

    this._file = file
    this._csize = chunkSize
    this._cs = Math.ceil(file.size / chunkSize)
    this._processOfMd5 = processOfMd5
    this._checkFileByMd5 = checkFileByMd5
    this._uploadFile = uploadFile
    this._processOfUpload = processOfUpload
    this._chunkEnd = chunkEnd
    this._uploadSuccess = uploadSuccess
  }

  // 获取文件的md5
  getMd5OfFile() {
    let cc = 0 // 当前第几片
    const f = this._file
    const csize = this._csize
    const cs = this._cs
    const spark = new SparkMD5.ArrayBuffer()

    return new Promise((resolve, reject) => {
      const fr = new FileReader()
      fr.onload = e => {
        spark.append(e.target.result)
        cc++

        if (cc < cs) {
          loadNext()
        } else {
          resolve(spark.end())
        }
      }
      fr.onerror = e => reject(e)

      const loadNext = () => {
        const s = cc * csize
        const e = s + csize >= f.size ? f.size : s + csize
        fr.readAsArrayBuffer(this._slice.call(f, s, e))
        this._processOfMd5 && this._processOfMd5(+((cc + 1) / cs).toFixed(4))
      }
    })
  }

  // 根据md5检查文件
  async checkFileByMd5(md5: string) {
    return await this._checkFileByMd5(md5)
  }

  // 分片上传
  async chunkUpload(md5: string, chunks: string[] = []) {
    const cs = this._cs
    const csize = this._csize
    const f = this._file
    let hadLen = chunks.length

    for (let i = 0; i < cs; i++) {
      // 根据生成的文件标记是否上传
      const isExit = chunks.includes(`${i}`)
      if (isExit) {
        continue
      }

      // 上传
      let e = (i + 1) * csize
      if (e >= f.size) {
        e = f.size
      }
      const result = await this.uploadFile({
        i,
        md5,
        chunks: cs,
        chunk: this._slice.call(f, i * csize, e)
      })

      if (this._processOfUpload) {
        hadLen++
        this._processOfUpload({
          ...result,
          preProcess: (hadLen / cs).toFixed(4)
        })
      }
    }
  }

  // 上传文件
  async uploadFile(data: { [propName: string]: any }) {
    const form = new FormData()

    for (const key in data) {
      form.append(key, data[key])
    }

    return await this._uploadFile(form)
  }

  // 通知服务器分片上传结束
  async chunkEnd(md5: string) {
    return await this._chunkEnd(md5)
  }

  // 组装分片上传为模板方法模式
  async init() {
    // 获取文件的md5
    const md5: any = await this.getMd5OfFile()

    // 根据md5验证分片的上传情况
    let data: any
    const { file, chucks } = await this.checkFileByMd5(md5)
    if (file) {
      data = file
    } else {
      // 上传没有上传的片段
      await this.chunkUpload(md5, chucks)

      // 通知服务器所有分片已经上传完毕
      data = await this.chunkEnd(md5)
    }

    // 成功回调
    this._uploadSuccess && this._uploadSuccess(data)
  }
}

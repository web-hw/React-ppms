import isfetch from 'isomorphic-fetch'

import { serialize } from '../../serialize'

// api 基路径
const { IS_PRO, API_URL, API_DEV } = process.env
const baseUrl = IS_PRO ? API_URL : API_DEV

// fetch interface
export interface IOptions {
  method?: string // 请求方法
  baseUrl?: string // 基路径
  headers?: {
    // headers
    [propName: string]: any
  }
  data?: {
    // 参数
    [propName: string]: any
  }
  errCb?: (err: any) => void // 错提示回调
}

// 默认options interface
export interface IDefOptions extends IOptions {
  [propName: string]: any
}

// 错误 interface
export interface IError extends Error {
  status?: number
}

// 响应结果 interface
export interface IFetchResult {
  err: IError | null // 错误对象
  data: any // 数据
}

export class Http {
  // 默认fetch options
  private _options: IDefOptions = {
    baseUrl,
    method: 'GET',
    body: null,
    headers: {
      'Content-Type': 'application/json'
    }
  }

  // 处理options
  private handleOptions(options: IDefOptions = {}): IDefOptions {
    // 默认项
    const _options = serialize.copy(this._options)

    // Todo 优化对象合入
    // 合入headers
    const headers = options.headers || {}
    delete options.headers
    Object.assign(_options.headers, headers)

    // 合入其他项
    _options.errCb = this._options.errCb
    Object.assign(_options, options)

    // 统一的参数处理
    const data = options.data || {}
    delete options.data

    if (_options.method.toUpperCase() === 'GET') {
      let query = ''
      Object.keys(data).forEach((key: string) => {
        query += `&${key}=${data[key]}`
      })
      query && (_options.query = query)
    } else {
      // 如果为formdata
      if (data instanceof FormData) {
        delete _options.headers['Content-Type']
        _options.body = data
      } else {
        _options.body = serialize.stringify(data)
      }
    }

    return _options
  }

  // 处理error
  private handleError(
    status: number,
    msg: string,
    callback?: (err: IError) => void
  ): Promise<IFetchResult> {
    const err: IError = new Error(msg || '未知错误')
    err.status = status

    // 统一的错误处理
    if (callback) {
      callback(err)
    }

    // 统一返回err，用于单独处理
    return Promise.resolve({ err, data: null })
  }

  constructor(options: IDefOptions = {}) {
    // 初始化参数
    this._options = this.handleOptions(options)
  }

  // fetch 请求
  async fetch(url: string, options: IOptions = {}): Promise<IFetchResult> {
    // 参数组装
    const _options = this.handleOptions(options)
    const query = `t=${new Date().getTime() + (_options.query || '')}`
    const apiURL = `${_options.baseUrl + url}?${query}`
    const errCb = _options.errCb
    delete _options.query
    delete _options.baseUrl
    delete _options.errCb

    // 请求数据
    const result = await isfetch(apiURL, _options)
    // 请求错误处理 并同意返回默认值，避免运行程序出错
    if (result.status !== 200) {
      return this.handleError(
        result.status,
        result.statusText || '服务器异常',
        errCb
      )
    }

    // 数据处理
    const data = (await result.json()) || {}
    if (data.code !== 200) {
      return this.handleError(
        data.code,
        data.message || data.msg || '未知错误',
        errCb
      )
    }
    const dt = data.data || null
    if (dt && dt.code !== undefined && dt.code !== 200) {
      return this.handleError(
        dt.code,
        dt.message || dt.msg || '未知错误',
        errCb
      )
    }

    // 响应数据
    return Promise.resolve({ err: null, data: dt })
  }
}

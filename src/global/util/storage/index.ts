import { serialize } from '../serialize'

const _session = sessionStorage
const _local = localStorage
const _errMsg = '当前浏览器不支持'

// 会话存储
export const session = {
  /**
   * 获取session
   * @param {string} key
   * @returns {null | object | array} result
   */
  get(key: string): any {
    // 不支持session
    if (!_session) {
      return null
    }

    const result = _session.getItem(key)

    return serialize.parseOfDecode(result)
  },

  /**
   * 设置会话存储
   * @param {string} key
   * @param {string | object | array} val
   * @returns {void}
   */
  set(key: string, val: any): void {
    if (!_session) {
      console.error(`${_errMsg}session storage`)
    } else {
      _session.setItem(key, serialize.stringifyOrEncode(val))
    }
  },

  /**
   * 移除session数据
   * @param {string} key 可选
   * @returns {void}
   */
  remove(key?: string): void {
    if (!_session) {
      console.error(`${_errMsg}session storage`)
    } else {
      key ? _session.removeItem(key) : _session.clear()
    }
  }
}

// 永久存储
export const local = {
  /**
   * 获取永久存储数据
   * @param {string} key
   * @returns {null | object | array} result
   */
  get(key: string): any {
    if (!_local) {
      return null
    }

    const result = _local.getItem(key)

    return serialize.parseOfDecode(result)
  },

  /**
   * 设置永久存储
   * @param {string} key
   * @param {string | object | array} val
   * @returns {void}
   */
  set(key: string, val: any): void {
    if (!_local) {
      console.error(`${_errMsg}local storage`)
    } else {
      _local.setItem(key, serialize.stringifyOrEncode(val))
    }
  },

  /**
   * 移除local数据
   * @param {string} key 可选
   * @returns {void}
   */
  remove(key?: string): void {
    if (!_local) {
      console.error(`${_errMsg}local storage`)
    } else {
      key ? _local.removeItem(key) : _local.clear()
    }
  }
}

// 设置缓存
export const cache = {
  /**
   * 获取缓存
   * @param {string} key
   * @returns {null | object | array} result
   */
  get(key: string): any {
    let result = null
    const val = local.get(key)
    if (!val) {
      return result
    }

    if (new Date().getTime() <= +val.expireTime) {
      result = val.data
    } else {
      this.remove(key)
    }

    return result
  },

  /**
   * 设置缓存
   * @param {string} key
   * @param {string | object | array} val
   * @param {number} expireTime 默认一天
   * @returns {void}
   */
  set(key: string, val: any, expireTime: number = 24 * 60 * 60 * 1000): void {
    local.set(key, {
      data: val,
      expireTime: new Date().getTime() + expireTime
    })
  },

  /**
   * 移除缓存
   * @param {string} key
   * @returns {void}
   */
  remove(key: string): void {
    local.remove(key)
  }
}

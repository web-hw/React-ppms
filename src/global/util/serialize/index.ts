const _json = JSON
const _encode = encodeURIComponent
const _decode = decodeURIComponent

export const serialize = {
  /**
   * 转json字符串
   * @param {array | object} param
   * @returns {string} result
   */
  stringify(param: any): string {
    let result: string = ''

    try {
      result = _json.stringify(param)
    } catch (err) {
      console.error(err)
    }

    return result
  },

  stringifyOrEncode(param: any): string {
    let result: string = ''

    try {
      result = _encode(_json.stringify(param))
    } catch (err) {
      console.error(err)
    }

    return result
  },

  parseOfDecode(param: string): any {
    let result: any = null

    try {
      result = _json.parse(_decode(param))
    } catch (err) {
      console.error(err)
    }

    return result
  },

  /**
   * 解析json
   * @param {string} param
   * @returns {array | object | null} result
   */
  parse(param: string): any {
    let result: any = null

    try {
      result = _json.parse(param)
    } catch (err) {
      console.error(err)
    }

    return result
  },

  /**
   * 深拷贝，会忽略对象属性函数
   * @param param 参数
   */
  copy(param: any): any {
    return this.parse(this.stringify(param))
  }
}

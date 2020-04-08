export default class CbError extends Error {
  code: number = null
  /**
   * @param message 错误信息
   * @param code 状态码
   */
  constructor(message: string, code?: number) {
    super(message)

    this.code = code
  }
}

export type TAms = { [propName: string]: any }
declare global {
  interface Window {
    __AMS__INIT__: TAms
  }
}

export const ams = {
  /**
   * 向全局属性__AMS__INIT__添加属性
   * @param {object} params 参数
   */
  set(params: TAms) {
    window.__AMS__INIT__ = { ...(window.__AMS__INIT__ || {}), ...params }
  },

  /**
   * 获取全局属性__AMS__INIT__
   * @returns {object} __AMS__INIT__
   */
  get(): TAms {
    return window.__AMS__INIT__ || {}
  }
}

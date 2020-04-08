/**
 * 加载script
 * @param url 加载地址
 * @param done 加载完成后的回调
 */
export const loadScript = (url: string, done: Function) => {
  // 检查是否在加载中
  let script: any = document.querySelector(`script[src="${url}"]`)

  if (!script) {
    script = document.createElement('script')
    script.src = url
    document.body.appendChild(script)
  }

  // 通过事件 维护在加载过程中的，重复加载回调
  script.addEventListener('load', () => {
    if (
      !script.readyState ||
      script.readyState === 'load' ||
      script.readyState === 'complete'
    ) {
      // 回调
      done && done()
    }
  })
}

/**
 * 节流函数
 * @param {Function} fun 需要节流的函数
 * @param {number} delay 节流时间
 * @param {number} duration 执行间隔
 */
export const throttle = function (
  fun: Function,
  delay: number = 300,
  duration: number = 500
) {
  let timer: any = null
  // let begin = new Date().getTime()

  return function () {
    const args = arguments
    const current = new Date().getTime()
    clearTimeout(timer)
    timer = setTimeout(() => fun.apply(this, args), delay)

    // 避免某事件一直触发  setTimeout不能被执行
    // if (current - begin >= duration) {
    //   fun.apply(this, args)
    //   begin = current
    // } else {
    //   timer = setTimeout(() => fun.apply(this, args), delay)
    // }
  }
}

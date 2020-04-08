// 解决组件销毁  setState执行报错问题
export const StateUnmount = (target: any) => {
  const unmount = target.prototype.componentWillUnmount
  target.prototype.componentWillUnmount = function () {
    if (unmount) {
      unmount.call(this)
    }
    this.isUnmount = true
  }

  // 对setState的改装，setState查看目前是否已经销毁
  const setState = target.prototype.setState
  target.prototype.setState = function () {
    if (!!this.isUnmount) {
      return
    }
    setState.apply(this, arguments)
  }
}

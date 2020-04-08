// const dom = document

// // 根据html片段创建DOM对象
// const createDomByHTML = (html: string) => {
//   const div = dom.createElement('div')
//   div.innerHTML = html

//   return div.children
// }

// // is dom list
// const isDOMList = (selector: any) => {
//   if (!selector) { return false }

//   return selector instanceof HTMLCollection || selector instanceof NodeList
// }

// // document.querySelectorAll
// const querySelectorAll = (selector: string) => {
//   const result = dom.querySelectorAll(selector)

//   return isDOMList(result) ? result : [result]
// }

// class DomElement {
//   constructor(selector: any) {
//     if (!selector) { return }

//     if (selector instanceof DomElement) {
//       return selector
//     }

//     this.selector = selector
//     const nodeType = selector.nodeType

//     let selectorResult: any = []
//     if (nodeType === 9) { // document节点
//       selectorResult = [selector]
//     } else if (nodeType === 1) { // 元素节点
//       selectorResult = [selector]
//     } else if (isDOMList(selector) || selector instanceof Array) {
//       selectorResult = selector
//     } else if (typeof selector === 'string') {
//       const selectorStr = selector.replace(/\n/mg, '').trim()
//       if (selectorStr.indexOf('<') === 0) {
//         // 如 <div>
//         selectorResult = createDomByHTML(selectorStr)
//       } else {
//         // 如 #id .class
//         selectorResult = querySelectorAll(selectorStr)
//       }
//     }

//     const length = selectorResult.length
//     if (length === 0) { return this }

//     // 加入 DOM 节点
//     for (let i = 0; i < length; i++) {
//       this[i] = selectorResult[i]
//     }
//     this.length = length
//   }

//   forEach(fn: Function) {
//     const _this: any = this

//     for (let i = 0; i < _this.length; i++) {
//       const elem = _this[i]
//       const result = fn.call(elem, elem, i)
//       // 回调返回false时，结束遍历
//       if (result === false) { break }
//     }

//     return _this
//   }
// }

// const $ = (selector: any) => new DomElement(selector)

// export default $

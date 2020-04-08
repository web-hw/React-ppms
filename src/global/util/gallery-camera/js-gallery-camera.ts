import { E_ACCEPT_TYPE, E_CAPTURE_TYPE, TFileChange } from './config'

interface ISelectFile {
  change: TFileChange
  capture?: E_CAPTURE_TYPE
  accept?: E_ACCEPT_TYPE
  multiple?: boolean
}

/**
 * 通过input file 选择文件
 * @param {ISelectFile} params 参数
 */
const selectFile = (params: ISelectFile) => {
  const { change, capture, accept, multiple = true } = params

  // 唯一id
  const id = 'DEVICE-SELECT-FILE-JS'

  // 检查当前元素是否存在
  let selInput = document.getElementById(id)

  // 添加select file元素
  if (!selInput) {
    // 创建select file 元素
    selInput = document.createElement('input')

    // 通过宽高隐藏当前元素，用于兼容ie
    selInput.style.width = '0'
    selInput.style.height = '0'

    // 设置文件属性
    selInput.setAttribute('type', 'file')
    selInput.setAttribute('id', id)

    // 添加元素
    document.body.appendChild(selInput)
  }

  // 添加change事件
  selInput.onchange = null
  selInput.onchange = (event: Event) => {
    if (!event || !event.target) {
      return
    }
    const target: any = event.target || {}
    const files = target.files
    if (files) {
      change(null, [].slice.call(files))
      target.value = '' // 清空当前值
    }
  }

  // 修改属性
  if (accept) {
    selInput.setAttribute('accept', accept)
  } else {
    selInput.removeAttribute('accept')
  }
  if (capture) {
    selInput.setAttribute('capture', capture)
  } else {
    selInput.removeAttribute('capture')
  }
  if (multiple) {
    selInput.setAttribute('multiple', 'true')
  } else {
    selInput.removeAttribute('multiple')
  }

  selInput.click()
}

/**
 * 拍照 | 录像
 * @param {E_CAPTURE_TYPE} capture 类型
 * @param {TFileChange} change change回调
 */
export const getFileByJsCapture = (
  capture: E_CAPTURE_TYPE,
  change: TFileChange
) => {
  let accept: E_ACCEPT_TYPE

  switch (capture) {
    case E_CAPTURE_TYPE.IMAGE:
      accept = E_ACCEPT_TYPE.IMAGE
      break
    case E_CAPTURE_TYPE.VIDEO:
      accept = E_ACCEPT_TYPE.VIDEO
      break
  }

  selectFile({
    change,
    capture,
    accept,
    multiple: false
  })
}

/**
 * 打开系统目录选取文件
 * @param accept 类型
 * @param change 回调
 * @param multiple 是否多选
 */
export const getFilesByJsAccept = (
  accept: E_ACCEPT_TYPE,
  change: TFileChange,
  multiple: boolean = true
) => {
  selectFile({
    change,
    accept,
    multiple
  })
}

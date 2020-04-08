import * as React from 'react'
import {} from 'react-router-dom'
import { TextareaItem } from 'antd-mobile'

const style = require('./style')

interface IPropsTextarea {
  placeholder?: string
  value: string
  onChange: (val: string) => void
  onBlur?: () => void
}

interface IStateTextarea {
  isCompEnd: boolean // 是否是中文输入结束
}

export default class Textarea extends React.PureComponent<
  IPropsTextarea,
  IStateTextarea
> {
  // textarea 元素
  private _textarea: any = null
  // 是否支持contentEditable
  private _isSupCttEdit: boolean = isSupportContentEditable()

  // textarea change
  private onChangeTextarea(val: string | React.KeyboardEvent<HTMLDivElement>) {
    const { onChange } = this.props

    // ant textarea handle
    if (typeof val === 'string') {
      return onChange(val)
    }

    // 自定义div textarea
    if (!this.state.isCompEnd) {
      return
    }
    const target: any = val.currentTarget
    if (!target) {
      return
    }
    // 当中文输入完成后改变state msg
    onChange(target.innerHTML)
  }

  constructor(props: IPropsTextarea) {
    super(props)
    this.state = {
      isCompEnd: true
    }

    this.onChangeTextarea = this.onChangeTextarea.bind(this)
  }

  componentDidUpdate(prevProps: IPropsTextarea, prevState: IStateTextarea) {
    const { value } = this.props

    // 当value 改变时 移动光标
    if (this._isSupCttEdit && value && value !== prevProps.value) {
      keepLastOfFocus(this._textarea)
    }
  }

  render() {
    const { value, onBlur = () => {}, placeholder = '' } = this.props

    return (
      <div className={`${style.cbTextarea} wp100 fs0 cb-textarea`}>
        {this._isSupCttEdit ? (
          <div
            ref={el => (this._textarea = el)}
            dangerouslySetInnerHTML={{ __html: value }}
            contentEditable={true}
            className="cb-div-textarea oay sb"
            onCompositionStart={() => this.setState({ isCompEnd: false })}
            onCompositionEnd={() => this.setState({ isCompEnd: true })}
            onKeyUp={this.onChangeTextarea}
            onBlur={onBlur}
            placeholder={placeholder}
          />
        ) : (
          <TextareaItem
            ref={(el: any) => (this._textarea = el)}
            value={value}
            onChange={this.onChangeTextarea}
            onBlur={onBlur}
            placeholder={placeholder}
          />
        )}
      </div>
    )
  }
}

// 检查是否支持contentEditable
export const isSupportContentEditable = (): boolean => {
  const win: any = window

  return !!win.FormData
}

// 处理enter换行后插入div引起的问题，用于插入表情处
export const handleNewLineEnter = (
  oldVal: string,
  insertVal: string
): string => {
  let val = '',
    isNewLine = false

  // 如果以<br></div>结尾
  val = oldVal.replace(
    /(<br><\/div>)|(<\/div>)$/gi,
    (
      match: string,
      $1: string,
      $2: string,
      index: number,
      msg: string
    ): string => {
      if ($1 || $2) {
        isNewLine = true
        return `${insertVal}</div>`
      }

      return match
    }
  )

  // 未换行
  if (!isNewLine) {
    val += insertVal
  }

  return val
}

// 保持光标在最后位置
export const keepLastOfFocus = (el: HTMLElement) => {
  const win: any = window
  const doc: any = document
  el.focus()

  // ie11 10 9 ff safari
  if (win.getSelection) {
    const range = win.getSelection() // 创建range
    range.selectAllChildren(el)
    range.collapseToEnd() // 光标移至最后
  } else if (doc.selection) {
    // ie10 9 8 7 6 5
    const range = doc.selection.createRange() // 创建选择对象
    range.moveToElementText(el) // range定位到obj
    range.collapse(false) // 光标移至最后
    range.select()
  }
}

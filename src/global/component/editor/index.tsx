import * as React from 'react'
import {} from 'react-router-dom'
const WEditor = require('./wangEditor.min')
// import './wangEditor.scss'

const style = require('./style')

interface IPropsEditor {
  defaultValue?: string
  disable?: boolean
  isFocus?: boolean
  isCanCopyStyle?: boolean // 是否能够拷贝样式
  isCanCopyText?: boolean // 能否拷贝文本
  isCanCopyImage?: boolean // 能否拷贝
  onchange?: (html: string) => void
  onfocus?: () => void
  onblur?: (html: string) => void
  oncopy?: (content: string) => string
  colors?: string[]
  fontNames?: string[]
  uploadImg?: string | true
  menus?: (
    | 'head'
    | 'bold'
    | 'fontSize'
    | 'fontName'
    | 'italic'
    | 'underline'
    | 'strikeThrough'
    | 'foreColor'
    | 'backColor'
    | 'link'
    | 'list'
    | 'justify'
    | 'quote'
    | 'emoticon'
    | 'image'
    | 'table'
    | 'video'
    | 'code'
    | 'undo'
    | 'redo')[]
}

interface IStateEditor {}

export default class Editor extends React.PureComponent<
  IPropsEditor,
  IStateEditor
> {
  // 清楚html中不需要的内容
  static simpleHTML(html: string) {
    return html.replace(/(\sstyle=\"(.*?)\")/gi, '')
  }

  private _editor: any = null

  private init() {
    const editor = this._editor
    if (!editor) {
      return
    }

    const {
      isCanCopyImage,
      isCanCopyText,
      isCanCopyStyle,
      oncopy,
      onfocus,
      onblur,
      onchange,
      colors,
      fontNames,
      menus,
      uploadImg,
      defaultValue = '',
      isFocus = false,
      disable = false
    } = this.props
    // 是否可以复制文本
    const parteHandle = !isCanCopyText
      ? () => ''
      : oncopy ||
        function (content) {
          return content
        }
    editor.customConfig.pasteTextHandle = parteHandle

    // 是否过滤掉复制过来的样式
    editor.customConfig.pasteFilterStyle = !isCanCopyStyle

    // 是否可以复制图片
    editor.customConfig.pasteIgnoreImg = !isCanCopyImage

    // 图片
    if (uploadImg === true) {
      editor.customConfig.uploadImgShowBase64 = uploadImg // 使用 base64 保存图片
    } else if (typeof uploadImg === 'string') {
      editor.customConfig.uploadImgServer = uploadImg // 上传图片到服务器
    }

    // 设置菜单
    menus && (editor.customConfig.menus = menus)

    // 颜色
    colors && (editor.customConfig.colors = colors)

    // 字体
    fontNames && (editor.customConfig.fontNames = fontNames)

    editor.customConfig.onfocus = () => onfocus && onfocus()
    editor.customConfig.onblur = (html: string) => onblur && onblur(html)

    // onchange触发时间
    editor.customConfig.onchangeTimeout = 200
    editor.customConfig.onchange = (html: string) => {
      // console.log(html)
      // onchange && onchange(html)
    }

    // 创建editor
    editor.create()

    // 初始化内容
    this.setContent('html', defaultValue)
    this.setDisable(disable)

    // 是否聚焦
    const elem: any = editor.$textElem[0]
    this.onChangeOfCb((html: string) => {
      if (onchange) {
        elem.focus()
        onchange(html)
      }
    })
    // if (elem) {
    //   // elem.setAttribute('unselectable', 'on')
    //   // elem.setAttribute('tabindex', 1)
    //   elem[isFocus ? 'focus' : 'blur']()
    // }
  }

  // 自定义change
  private onChangeOfCb(callback: (html: string) => void) {
    const elem: any = this._editor.$textElem[0]
    if (!elem) {
      return
    }

    let flag = false
    elem.addEventListener('compositionstart', () => {
      flag = true
    })
    elem.addEventListener('compositionend', () => {
      flag = false
      callback(this.getContent('html'))
    })
    elem.addEventListener('input', () => {
      !flag && callback(this.getContent('html'))
    })
  }

  // 设置是否可用
  private setDisable(disable: boolean) {
    if (!this._editor) {
      return
    }

    this._editor.$textElem.attr('contenteditable', !disable)
  }

  componentWillReceiveProps(nextProps: IPropsEditor) {
    if (nextProps.disable !== this.props.disable) {
      this.setDisable(nextProps.disable)
    }
  }

  getContent(type: 'html' | 'text') {
    if (!this._editor) {
      return ''
    }

    return this._editor.txt[type]()
  }

  setContent(
    type: 'html' | 'text' | 'append' | 'insert' | 'clear',
    content: string = ''
  ) {
    if (!this._editor) {
      return
    }

    // 相关设置
    if (type === 'clear') {
      this._editor.txt.clear()
    } else if (type === 'insert') {
      this._editor.cmd.do('insertHTML', content)
    } else {
      this._editor.txt[type](content)
    }
    this._editor.change()
  }

  componentDidMount() {
    this._editor = new WEditor('.toolbar', '.textarea')
    this.init()
  }

  render() {
    return (
      <div className={`${style.editor} cb-editor bsb wp100 hp100`}>
        <div className="toolbar wp100 bsb" />
        <div className="textarea wp100 hp100 bsb oay sb" />
      </div>
    )
  }
}

import * as React from 'react'
import {} from 'react-router-dom'
import { Icon } from 'antd-mobile'
const WEditor = require('./wangEditor.min')
import './wangEditor.scss'

// import { getFilesByAccept, E_ACCEPT_TYPE, toast } from 'global@util'
import { Header } from '../../component/header'
import CbModal from '../../component/modal'
const style = require('./style')

interface IPropsEditor {}

interface IStateEditor {
  value: any
}

export default class Editor extends React.PureComponent<
  IPropsEditor,
  IStateEditor
> {
  private _editor: any = null

  // private _imgConfig: ImageControlType[] = [
  //   'align-left',
  //   'align-center',
  //   'align-right',
  //   'remove'
  // ]

  // private _editorConfig: ControlType[] = [
  //   'bold', // 加粗
  //   'italic', // 斜体
  //   'headings', // 标题
  //   'blockquote', // 引用段落
  //   'list-ol', // 有序
  //   'list-ul', // 无序
  //   // {
  //   //   key: 'cb-img-upload',
  //   //   type: 'button',
  //   //   text: '测试',
  //   //   className: style.cbImgUpload,
  //   //   onClick: () => this.onSelAndInsertImg()
  //   // },
  //   'media',
  //   'undo', // 撤销操作
  //   'redo' // 重做操作
  // ]

  // private onSelAndInsertImg() {
  //   getFilesByAccept(
  //     E_ACCEPT_TYPE.IMAGE,
  //     (err, files) => {
  //       if (err) {
  //         return toast.info(err.message)
  //       }

  //       // 插入图片
  //       files.forEach((file: File) => {
  //         const reader = new FileReader()
  //         reader.readAsDataURL(file)
  //         reader.onload = (e: any) => {
  //           const value = ContentUtils.insertMedias(
  //             this.state.value,
  //             [{ type: 'IMAGE', url: e.target.result }]
  //           )
  //           this.setState({ value })
  //         }
  //       })
  //     },
  //     false
  //   )
  // }
  private initEditor() {
    const editor = new WEditor('.toolbar', '.textarea')
    editor.customConfig.menus = [
      'bold',
      'italic',
      'head',
      'quote',
      'list',
      'image',
      'undo',
      'redo'
    ]
    editor.customConfig.uploadImgShowBase64 = true
    editor.customConfig.uploadImgMaxSize = 10 * 1024 * 1024
    editor.customConfig.uploadImgMaxLength = 5
    editor.create()

    this._editor = editor
  }
  constructor(props: IPropsEditor) {
    super(props)

    this.state = {
      value: ''
    }

    // 返回按钮提示
    // CbModal.alert('提示', '当前页面内容还未提交，是否离开？', [
    //   { text: '取消' },
    //   {
    //     text: '离开',
    //     onPress() {
    //       console.log('啦啦')
    //     }
    //   }
    // ])
  }

  componentDidMount() {
    this.initEditor()
  }

  render() {
    return (
      <div className="wp100 hp100 pr bsb pt50 bg-fff oh">
        <Header
          left={<Icon type="cross" className="cb-left-md" size="md" />}
          right={<span>完成</span>}
        />
        <div className={`${style.editor} wp100 hp100 bsb pb50`}>
          <div className="textarea wp100 hp100 bsb p10" />
          <div className="toolbar palb bsb wp100" />
        </div>
      </div>
    )
  }
}

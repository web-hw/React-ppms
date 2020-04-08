import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {} from 'react-router-dom'
import { Modal } from 'antd-mobile'

const style = require('./style')

interface IPropsCbModal {
  isShow: boolean // 是否显示
  title?: string // title
  className?: string
  onClose: () => void // 关闭
  onSure: () => void // 确认
}

interface IStateCbModal {}

type TFOnPress = () => void
interface IFooter {
  text: string
  onPress?: TFOnPress
}

/**
 * @param {ReactNode} title 标题
 * @param {ReactNode} msg 内容
 * @param {TFOnPress | IFooter | IFooter[]} footer操作按钮
 */
const alert = (
  title: React.ReactNode,
  msg: React.ReactNode,
  footer?: TFOnPress | IFooter | IFooter[]
) => {
  // alert 容器
  const div = document.createElement('div')
  document.body.appendChild(div)

  // 关闭回调
  const onClose = function () {
    setTimeout(() => {
      // 销毁指定容器中的react 节点
      ReactDOM.unmountComponentAtNode(div)
      // 删除节点
      if (div && div.parentNode) {
        div.parentNode.removeChild(div)
      }
    })
  }

  // 按钮点击
  const onPress = (beforeCallback: TFOnPress) => {
    beforeCallback && beforeCallback()
    onClose()
  }

  // 重组footer
  let cbFooter: IFooter[]
  if (typeof footer === 'undefined') {
    cbFooter = []
  } else if (typeof footer === 'function') {
    cbFooter = [{ text: '确定', onPress: () => onPress(footer) }]
  } else if (footer instanceof Array) {
    cbFooter = footer.map((item: IFooter) => {
      return {
        text: item.text,
        onPress: () => onPress(item.onPress)
      }
    })
  } else {
    cbFooter = [{ text: footer.text, onPress: () => onPress(footer.onPress) }]
  }

  // 创建react 元素
  const alertElem = React.createElement(
    Modal,
    {
      title,
      onClose,
      visible: true,
      transparent: true,
      maskClosable: true,
      className: 'cb-modal-alert',
      footer: cbFooter
    },
    msg
  )

  // 渲染
  ReactDOM.render(alertElem, div)
}

export default class CbModal extends React.PureComponent<
  IPropsCbModal,
  IStateCbModal
> {
  static alert = alert

  // 确认
  private onSure() {
    this.props.onSure()
    this.onClose()
  }

  // 关闭
  private onClose() {
    this.props.onClose()
  }

  // 取消
  private onCancel() {
    this.onClose()
  }

  constructor(props: IPropsCbModal) {
    super(props)

    this.onSure = this.onSure.bind(this)
    this.onClose = this.onClose.bind(this)
    this.onCancel = this.onCancel.bind(this)
  }

  render() {
    const { isShow, title = '', className = '' } = this.props

    return (
      <Modal
        title={title}
        visible={isShow}
        transparent={true}
        className={`${style.modal} ${
          title ? style.hasHeader : ''
        } ${className}`}
        wrapClassName={style.wrap}
        onClose={this.onClose}
        maskClosable={true} // 点击遮罩层关闭
        footer={[
          { text: '确认', onPress: this.onSure },
          { text: '取消', onPress: this.onCancel }
        ]}
      >
        {this.props.children}
      </Modal>
    )
  }
}

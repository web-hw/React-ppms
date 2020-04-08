import * as React from 'react'
import {} from 'react-router-dom'
import { Modal } from 'antd'
import { ModalProps } from 'antd/es/modal'

const style = require('./style')

interface IPropsCbModal extends ModalProps {}

interface IStateCbModal {
  maxHeight: string | 'none'
}

export default class CbModal extends React.PureComponent<
  IPropsCbModal,
  IStateCbModal
> {
  private _wrapClassName = style.wrapModal

  // 获取最大高度
  private getMaxHeight() {
    const wrap: any = document.querySelector(`.${this._wrapClassName}`)
    if (!wrap) {
      return
    }
    const header: any = wrap.querySelector('.ant-modal-header')
    const footer: any = wrap.querySelector('.ant-modal-footer')
    const body: any = wrap.querySelector('.ant-modal-body')
    let ofstH = 0
    if (header) {
      ofstH += header.offsetHeight
    }
    if (footer) {
      ofstH += footer.offsetHeight
    }
    if (body) {
      const style = window.getComputedStyle(body, null)
      const t = parseInt(style.paddingTop, 10)
      const b = parseInt(style.paddingBottom, 10)
      ofstH += isNaN(t) ? 0 : t
      ofstH += isNaN(b) ? 0 : b
    }

    const max = wrap.offsetHeight - ofstH - 200
    this.setState({ maxHeight: isNaN(max) || max < 0 ? 'none' : `${max}px` })
  }

  constructor(props: IPropsCbModal) {
    super(props)

    this.state = {
      maxHeight: 'none'
    }

    this.getMaxHeight = this.getMaxHeight.bind(this)
  }

  componentWillReceiveProps(nextProps: IPropsCbModal) {
    const { visible } = this.props
    if (nextProps.visible && nextProps.visible !== visible) {
      setTimeout(this.getMaxHeight) // 更新最大高度
    }
  }

  render() {
    const { maxHeight } = this.state
    const props = this.props

    return (
      <Modal
        centered={true}
        destroyOnClose={true}
        {...props}
        wrapClassName={`${this._wrapClassName} ${props.wrapClassName}`}
      >
        <div className="wp100 oay sb" style={{ maxHeight: `${maxHeight}` }}>
          {props.children}
        </div>
      </Modal>
    )
  }
}

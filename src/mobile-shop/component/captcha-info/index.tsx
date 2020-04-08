import * as React from 'react'
import {} from 'react-router-dom'
import { Modal } from 'antd-mobile'

const style = require('./style')

interface IPropsCaptchaInfo {
  className?: string
}

interface IStateCaptchaInfo {
  isShow: boolean
}

export default class CaptchaInfo extends React.PureComponent<
  IPropsCaptchaInfo,
  IStateCaptchaInfo
> {
  private onClose() {
    this.setState({ isShow: false })
  }

  constructor(props: IPropsCaptchaInfo) {
    super(props)

    this.state = {
      isShow: false
    }

    this.onClose = this.onClose.bind(this)
  }

  render() {
    return (
      <a
        className={this.props.className || ''}
        onClick={() => this.setState({ isShow: true })}
        href="javascript:void(0);"
      >
        收不到验证码?
        <Modal
          title="收不到验证码"
          visible={this.state.isShow}
          transparent={true}
          className="cb-modal-alert"
          onClose={this.onClose}
          maskClosable={true} // 点击遮罩层关闭
          footer={[{ text: '确认', onPress: this.onClose }]}
        >
          请确认手机号是否输入正确，手机网络是否畅通，若遇网络延迟，请稍后再试。
        </Modal>
      </a>
    )
  }
}

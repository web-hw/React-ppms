import * as React from 'react'
import {} from 'react-router-dom'
import { Form, Button, Input } from 'antd'
import { FormComponentProps } from 'antd/es/form'

import { getFilesByAccept, E_ACCEPT_TYPE } from 'global@util/gallery-camera'
import { toast } from 'global@util/toast/pc'
import { PHONE_REG } from 'global@constant'
import { fileOrBlob2Base64, base642FileOrBlob } from 'global@util/file'
import DrawBoard from '../../../../component/draw-board'
import Modal from '../../../../component/modal'
const style = require('./style')

interface IPropsInformForm extends FormComponentProps {}

interface IStateInformForm {
  head: string // 头像
  sign: string // 签名
  drawSignVisible: boolean
}

const InformForm = Form.create<IPropsInformForm>({})(
  class InformForm extends React.PureComponent<
    IPropsInformForm,
    IStateInformForm
  > {
    private _drawBoard: DrawBoard = null
    private _defHead = require('../../../../assets/images/head-def.png')

    // 提交
    private onSubmit(event: any) {
      event.preventDefault()
      const { form } = this.props
      form.validateFields((err: Error, values: any) => {
        if (err) {
          return
        }

        // 重置表单
        form.resetFields()
      })
    }

    // 获取图片
    private getImgByAccept(callback: (param: any) => void) {
      getFilesByAccept(
        E_ACCEPT_TYPE.IMAGE,
        (err: Error, files: File[]) => {
          if (err) {
            return console.error(err)
          }
          console.log(files)
          // 支持的图片格式
          const formats: string[] = ['png', 'jpg', 'jpeg']
          // 验证图片
          const errFile = files.find((file: File) => {
            const name = file.name.toLowerCase()

            const result = formats.find((format: string) => {
              return new RegExp(`^.+\.${format}$`).test(name)
            })

            return !result
          })
          // error info
          if (errFile) {
            return toast.error(`图片格式为${formats.join('、')}!`)
          }

          callback(files)
        },
        false
      )
    }

    // 上传文件
    private uploadImg(data: File, callback: (imgUrl: string) => void) {
      console.log('上传图片', data, callback)
    }

    // 选择图片
    private onSelectImg(callback: (imgUrl: string) => void, base64?: string) {
      // base64存在，直接上传
      if (base64) {
        base642FileOrBlob(base64, 'file', (err: Error, data: File) => {
          if (err) {
            return console.error(err)
          }
          // 上传
          this.uploadImg(data, callback)
        })

        return callback(base64)
      }

      // 选择文件
      this.getImgByAccept((param: File[]) => {
        const file = param[0]
        // 上传图片
        this.uploadImg(file, callback)
        // 图片预览
        fileOrBlob2Base64(file, (err: Error, data: string) => {
          if (err) {
            return console.error(err)
          }
          callback(data)
        })
      })
    }

    private onSelectHead() {
      this.onSelectImg(head => this.setState({ head }))
    }

    // 获取签名
    private onSelectSign(base64?: string) {
      this.onSelectImg(sign => this.setState({ sign }), base64)
    }

    // 绘制签名确定
    private onConfirmDrawSign() {
      // 获取base64
      const { getBase64 } = this._drawBoard.api()
      const base64 = getBase64()

      this.onSelectSign(base64)
      this.onVisibleDrawSign(false)
    }

    // 绘制签名取消
    private onVisibleDrawSign(drawSignVisible: boolean) {
      // 关闭时重置绘制面板
      if (!drawSignVisible) {
        const { resetDraw } = this._drawBoard.api()
        resetDraw()
      }

      this.setState({ drawSignVisible })
    }

    constructor(props: IPropsInformForm) {
      super(props)

      this.state = {
        head: this._defHead,
        sign: null,
        drawSignVisible: false
      }

      this.onSubmit = this.onSubmit.bind(this)
      this.onSelectHead = this.onSelectHead.bind(this)
      this.onSelectSign = this.onSelectSign.bind(this)
      this.onConfirmDrawSign = this.onConfirmDrawSign.bind(this)
      this.onVisibleDrawSign = this.onVisibleDrawSign.bind(this)
    }

    render() {
      const { head, sign, drawSignVisible } = this.state
      const { getFieldDecorator } = this.props.form
      const options = {
        validateFirst: true,
        validateTrigger: 'onBlur'
      }

      return (
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          onSubmit={this.onSubmit}
        >
          <Form.Item wrapperCol={{ span: 24 }}>
            <div className="form-item-head" onClick={this.onSelectHead}>
              <img src={head} />
            </div>
          </Form.Item>
          <Form.Item label="姓名">
            {getFieldDecorator('username', {
              initialValue: 'tahr'
            })(<Input disabled={true} autoComplete="off" />)}
          </Form.Item>
          <Form.Item label="联系方式">
            {getFieldDecorator('mobile', {
              ...options,
              initialValue: '13408226448',
              rules: [{ pattern: PHONE_REG, message: '联系方式格式错误' }]
            })(<Input type="number" autoComplete="off" />)}
          </Form.Item>
          <Form.Item label="签名">
            <div className="form-item-sign-btn">
              <Button
                className="mr10"
                onClick={() => this.onVisibleDrawSign(true)}
              >
                手写
              </Button>
              <Button type="primary" onClick={() => this.onSelectSign()}>
                上传
              </Button>
            </div>
            <div className="form-item-sign">
              {sign ? <img src={sign} /> : null}
            </div>
          </Form.Item>
          <Form.Item className="form-item-btn" wrapperCol={{ span: 24 }}>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>
          {/* 绘制签名 */}
          <Modal
            title="绘制签名"
            visible={drawSignVisible}
            cancelText="取消"
            okText="确定"
            onOk={this.onConfirmDrawSign}
            onCancel={() => this.onVisibleDrawSign(false)}
          >
            <DrawBoard ref={el => (this._drawBoard = el)} />
          </Modal>
        </Form>
      )
    }
  }
)

interface IPropsInform {}

interface IStateInform {}

export default class Inform extends React.PureComponent<
  IPropsInform,
  IStateInform
> {
  constructor(props: IPropsInform) {
    super(props)
  }

  render() {
    return (
      <div className={`${style.inform} wp100 hp100 oay sb`}>
        <div className="content ptb40 ma">
          <InformForm />
        </div>
      </div>
    )
  }
}

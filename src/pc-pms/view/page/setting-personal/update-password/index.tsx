import * as React from 'react'
import {} from 'react-router-dom'
import { Form, Input, Button } from 'antd'
import { FormComponentProps } from 'antd/es/form'

const style = require('./style')

interface IPropsUpdatePasswordForm extends FormComponentProps {}

interface IStateUpdatePasswordForm {}

const UpdatePasswordForm = Form.create<IPropsUpdatePasswordForm>({})(
  class extends React.PureComponent<
    IPropsUpdatePasswordForm,
    IStateUpdatePasswordForm
  > {
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

    // 验证
    private validator(_this?: any) {
      return {
        password(rule: any, value: any, callback: any) {
          if (!/^\d{6}$/.test(value)) {
            return callback('密码为6位数字')
          }
          callback()
        },
        newPwd(rule: any, value: any, callback: any) {
          if (!/^\d{6}$/.test(value)) {
            return callback('密码为6位数字')
          }
          callback()
        },
        confirmPwd(rule: any, value: any, callback: any) {
          const { form } = _this.props
          console.log(form.getFieldValue('newPwd'))
          if (value !== form.getFieldValue('newPwd')) {
            return callback('两次密码不一致')
          }
          callback()
        }
      }
    }

    constructor(props: IPropsUpdatePasswordForm) {
      super(props)

      this.onSubmit = this.onSubmit.bind(this)
    }

    render() {
      const { getFieldDecorator } = this.props.form
      const options = {
        initialValue: '',
        validateFirst: true,
        validateTrigger: 'onBlur'
      }

      return (
        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onSubmit={this.onSubmit}
        >
          <Form.Item label="当前账户密码">
            {getFieldDecorator('password', {
              ...options,
              rules: [
                { required: true, message: '请输入当前账户密码' },
                { validator: this.validator().password }
              ]
            })(<Input type="password" autoComplete="off" />)}
          </Form.Item>
          <Form.Item label="新密码">
            {getFieldDecorator('newPwd', {
              ...options,
              rules: [
                { required: true, message: '请输入新密码' },
                { validator: this.validator().newPwd }
              ]
            })(<Input type="password" autoComplete="off" />)}
          </Form.Item>
          <Form.Item label="确认新密码">
            {getFieldDecorator('confirmPwd', {
              ...options,
              rules: [
                { required: true, message: '请输入确认密码' },
                { validator: this.validator(this).confirmPwd }
              ]
            })(<Input type="password" autoComplete="off" />)}
          </Form.Item>
          <Form.Item className="update-password-btn" wrapperCol={{ span: 24 }}>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>
        </Form>
      )
    }
  }
)

interface IPropsUpdatePassword {}

interface IStateUpdatePassword {}

export default class UpdatePassword extends React.PureComponent<
  IPropsUpdatePassword,
  IStateUpdatePassword
> {
  render() {
    return (
      <div className={`${style.updatePassword} wp100 hp100 oay sb`}>
        <div className="content ptb40">
          <UpdatePasswordForm />
        </div>
      </div>
    )
  }
}

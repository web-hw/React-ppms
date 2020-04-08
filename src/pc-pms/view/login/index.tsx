import * as React from 'react'
import {} from 'react-router-dom'
import { Form, Input, Button } from 'antd'
import { FormComponentProps } from 'antd/es/form'

const style = require('./style')

interface IPropsLoginForm extends FormComponentProps {}

interface IStateLoginForm {}

const LoginForm = Form.create<IPropsLoginForm>({})(
  class extends React.PureComponent<IPropsLoginForm, IStateLoginForm> {
    // 提交
    private onSubmit(event: any) {
      event.preventDefault()
      const { form } = this.props
      form.validateFields((err: Error, values: any) => {
        if (err) {
          return
        }

        console.log(values)
        // 重置表单
        // form.resetFields()
      })
    }

    // 验证
    private validator(_this?: any) {
      return {
        username(rule: any, value: any, callback: any) {
          if (!/^\d{6}$/.test(value)) {
            return callback('用户名格式错误')
          }
          callback()
        },
        password(rule: any, value: any, callback: any) {
          if (!/^\d{6}$/.test(value)) {
            return callback('密码为6位数字')
          }
          callback()
        }
      }
    }

    constructor(props: IPropsLoginForm) {
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
          wrapperCol={{ span: 24 }}
          onSubmit={this.onSubmit}
          className={style.loginForm}
        >
          <Form.Item>
            {getFieldDecorator('username', {
              ...options,
              rules: [
                { required: true, message: '请输入用户名' },
                { validator: this.validator().username }
              ]
            })(
              <Input
                type="text"
                autoComplete="off"
                placeholder="用户名"
                prefix={
                  <img
                    src={require('../../assets/images/login-username.png')}
                  />
                }
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              ...options,
              rules: [
                { required: true, message: '请输入密码' },
                { validator: this.validator().password }
              ]
            })(
              <Input
                type="password"
                autoComplete="off"
                placeholder="密码"
                prefix={
                  <img
                    src={require('../../assets/images/login-password.png')}
                  />
                }
              />
            )}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              登录
            </Button>
          </Form.Item>
        </Form>
      )
    }
  }
)

interface IPropsLogin {}

interface IStateLogin {}

export default class Login extends React.PureComponent<
  IPropsLogin,
  IStateLogin
> {
  render() {
    return (
      <div
        className={`${style.login} wp100 hp100 pr oh`}
        style={{
          backgroundImage: `url(${require('../../assets/images/login-bg.png')})`
        }}
      >
        <div className="content mc clearfix oh">
          <div className="fl wp50 hp100 pr">
            <img
              className="mc"
              src={require('../../assets/images/login-model.png')}
            />
          </div>
          <div className="fr wp50 hp100 pr">
            <div className="cb-from mc bsb">
              <div className="info palt ptb10">
                <img src={require('../../assets/images/login-info.png')} />
              </div>
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

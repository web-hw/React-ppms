import * as React from 'react'
import {} from 'react-router-dom'
import { Form, Select, Input, Button } from 'antd'
import { FormComponentProps } from 'antd/es/form'

import UploadImages, {
  TImg,
  TChangeFile
} from '../../../../component/upload-images'
const style = require('./style')

interface IPropsFeedbackForm extends FormComponentProps {}

interface IStateFeedbackForm {
  imgs: TImg[]
}

const FeedbackForm = Form.create<IPropsFeedbackForm>({})(
  class FeedbackForm extends React.PureComponent<
    IPropsFeedbackForm,
    IStateFeedbackForm
  > {
    private onSubmit(event: any) {
      event.preventDefault()
      const { form } = this.props
      form.validateFields((err: Error, values: any) => {
        if (err) {
          return
        }

        // 重置表单
        form.resetFields()
        this.setState({ imgs: [] })
      })
    }

    private onChangeFile(files: TChangeFile[]) {
      const { imgs } = this.state
      this.setState({
        imgs: [].concat(imgs, files)
      })
    }

    private onDeleteFile(img: TImg, idx: number) {
      const { imgs } = this.state
      imgs.splice(idx, 1)

      this.setState({ imgs: [].concat(imgs) })
    }

    constructor(props: IPropsFeedbackForm) {
      super(props)

      this.state = {
        imgs: []
      }

      this.onSubmit = this.onSubmit.bind(this)
      this.onChangeFile = this.onChangeFile.bind(this)
      this.onDeleteFile = this.onDeleteFile.bind(this)
    }

    render() {
      const { imgs } = this.state
      const { getFieldDecorator } = this.props.form

      return (
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          onSubmit={this.onSubmit}
        >
          <Form.Item label="反馈类型">
            {getFieldDecorator('type', {
              initialValue: '系统建议'
            })(
              <Select placeholder="请选择反馈类型">
                <Select.Option value="系统建议">系统建议</Select.Option>
                <Select.Option value="BUG反馈">BUG反馈</Select.Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item label="描述内容">
            {getFieldDecorator('content', {
              initialValue: '',
              validateFirst: true,
              validateTrigger: 'onBlur',
              normalize(val) {
                return val.trim()
              },
              rules: [
                { required: true, message: '请输入描述内容' },
                { min: 5, max: 200, message: '请输入5~200字符的描述内容' }
              ]
            })(
              <Input.TextArea maxLength={200} placeholder="请输入5~200字符" />
            )}
          </Form.Item>
          <Form.Item label="图片附件">
            <UploadImages
              imgs={imgs}
              change={this.onChangeFile}
              imgNum={3}
              deleteImg={this.onDeleteFile}
            />
          </Form.Item>
          <Form.Item className="pt30 tac" wrapperCol={{ span: 24 }}>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>
        </Form>
      )
    }
  }
)

interface IPropsFeedback {}

interface IStateFeedback {}

export default class Feedback extends React.PureComponent<
  IPropsFeedback,
  IStateFeedback
> {
  render() {
    return (
      <div className={`${style.feedback} wp100 hp100 oay sb`}>
        <div className="content ptb40">
          <FeedbackForm />
        </div>
      </div>
    )
  }
}

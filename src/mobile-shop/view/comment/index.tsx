import * as React from 'react'
import {} from 'react-router-dom'
import { Icon, TextareaItem, Button } from 'antd-mobile'

import { Header } from '../../component/header'
const style = require('./style')

interface IPropsComment {}

interface IStateComment {
  comment: string
}

export default class Comment extends React.PureComponent<
  IPropsComment,
  IStateComment
> {
  constructor(props: IPropsComment) {
    super(props)

    this.state = {
      comment: ''
    }

    this.onChangeInput = this.onChangeInput.bind(this)
    this.onSureComment = this.onSureComment.bind(this)
    this.onCancelComment = this.onCancelComment.bind(this)
  }

  // text area change
  onChangeInput(comment: string) {
    this.setState({ comment })
  }

  // sure btn
  onSureComment() {
    console.log('sure')
  }

  // cancel btn
  onCancelComment() {
    this.setState({ comment: '' })
  }

  render() {
    return (
      <div className="wp100 hp100 fs0 pt50 bsb pr">
        <Header>发表评论</Header>
        {/* comment content */}
        <div
          className={`${style.comment} wp100 hp100 bg-fff pl15 pr15 pt5 bsb`}
        >
          <TextareaItem
            value={this.state.comment}
            onChange={this.onChangeInput}
            className="br5 bsb p10"
            placeholder="写评论吧..."
          />
          <div className={`${style.cmtBtn} wp100 mt25 br5 oh`}>
            <Button onClick={this.onCancelComment} className="fl">
              取消
            </Button>
            <Button
              onClick={this.onSureComment}
              disabled={!this.state.comment}
              className="fr"
            >
              发布
            </Button>
          </div>
        </div>
      </div>
    )
  }
}

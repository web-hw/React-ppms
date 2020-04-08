import * as React from 'react'
import {} from 'react-router-dom'
import {} from 'antd-mobile'

import { Send } from '../../component/send'
import { Header } from '../../component/header'
const style = require('./style')

interface IPropsTaskComment {}

interface IStateTaskComment {
  isShowSendComment: boolean
  isOpenSendOpe: boolean
}

export default class TaskComment extends React.PureComponent<
  IPropsTaskComment,
  IStateTaskComment
> {
  private onSendComment(msg: string) {
    console.log(msg)
  }

  // 是否显示发送的操作框
  private onSwitchSendOpe(status: boolean) {
    this.setState({ isOpenSendOpe: status })
  }

  private onSwitchComment(event: any, status: boolean) {
    event.stopPropagation()
    this.setState({ isShowSendComment: status })
  }

  constructor(props: IPropsTaskComment) {
    super(props)

    this.state = {
      isShowSendComment: false,
      isOpenSendOpe: false
    }

    this.onSendComment = this.onSendComment.bind(this)
    this.onSwitchSendOpe = this.onSwitchSendOpe.bind(this)
  }

  render() {
    return (
      <div
        onClick={event => this.onSwitchComment(event, false)}
        className={`${
          this.state.isShowSendComment
            ? this.state.isOpenSendOpe
              ? 'pb210'
              : 'pb50'
            : ''
        } wp100 hp100 pr bsb pt50 fs0 bg-f0f0f0 oh ts300`}
      >
        <Header>评论列表</Header>
        <div className="wp100 hp100 oay sb">
          <h6 className={`${style.title} wp100 plr15 bsb fw400 fs13 fs-ff6600`}>
            全部评论
          </h6>
          <div className="wp100 pt10 pb10 pr15 pl15 bsb bg-fff">
            <div className={`${style.item} wp100 pr bsb`}>
              <em
                className="palt oh"
                style={{
                  backgroundImage: `url(${require('../../assets/images/test.png')})`
                }}
              />
              <div className="wp100">
                <div className="comment-title wp100 pr bsb">
                  <span className="tes">留言用户名</span>
                  <span className="tes">2019-05-22</span>
                  <em
                    onClick={event => this.onSwitchComment(event, true)}
                    className="part"
                  >
                    回复
                  </em>
                </div>
                <div className="comment-content wp100">
                  中石化催化剂大连基地由中国石油化工集团公司在大连市旅顺口区投资建立
                </div>
                <div className="comment-hf wp100">
                  <div className="comment-hf-itm wp100">
                    <div className="comment-title wp100 pr bsb">
                      <span className="tes">用户名</span>
                      <span className="tes">2019-05-22</span>
                      <em className="part">回复</em>
                    </div>
                    <div className="comment-content wp100">
                      中石化催化剂大连基地由中国石油化工集团公司在大连市旅顺口区投资建立
                    </div>
                  </div>
                  <div className="comment-hf-itm wp100">
                    <div className="comment-title wp100 pr bsb">
                      <span className="tes">用户名</span>
                      <span className="tes">2019-05-22</span>
                      <em className="part">回复</em>
                    </div>
                    <div className="comment-content wp100">
                      中石化催化剂大连基地由中国石油化工集团公司在大连市旅顺口区投资建立
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={`${style.item} wp100 pr bsb`}>
              <em
                className="palt oh"
                style={{
                  backgroundImage: `url(${require('../../assets/images/test.png')})`
                }}
              />
              <div className="wp100">
                <div className="comment-title wp100 pr bsb">
                  <span className="tes">留言用户名</span>
                  <span className="tes">2019-05-22</span>
                  <em className="part">回复</em>
                </div>
                <div className="comment-content wp100">
                  中石化催化剂大连基地由中国石油化工集团公司在大连市旅顺口区投资建立
                </div>
              </div>
            </div>
            <div className={`${style.item} wp100 pr bsb`}>
              <em
                className="palt oh"
                style={{
                  backgroundImage: `url(${require('../../assets/images/test.png')})`
                }}
              />
              <div className="wp100">
                <div className="comment-title wp100 pr bsb">
                  <span className="tes">留言用户名</span>
                  <span className="tes">2019-05-22</span>
                  <em className="part">回复</em>
                </div>
                <div className="comment-content wp100">
                  中石化催化剂大连基地由中国石油化工集团公司在大连市旅顺口区投资建立
                </div>
              </div>
            </div>
            <div className={`${style.item} wp100 pr bsb`}>
              <em
                className="palt oh"
                style={{
                  backgroundImage: `url(${require('../../assets/images/test.png')})`
                }}
              />
              <div className="wp100">
                <div className="comment-title wp100 pr bsb">
                  <span className="tes">留言用户名</span>
                  <span className="tes">2019-05-22</span>
                  <em className="part">回复</em>
                </div>
                <div className="comment-content wp100">
                  中石化催化剂大连基地由中国石油化工集团公司在大连市旅顺口区投资建立
                </div>
              </div>
            </div>
            <div className={`${style.item} wp100 pr bsb`}>
              <em
                className="palt oh"
                style={{
                  backgroundImage: `url(${require('../../assets/images/test.png')})`
                }}
              />
              <div className="wp100">
                <div className="comment-title wp100 pr bsb">
                  <span className="tes">留言用户名</span>
                  <span className="tes">2019-05-22</span>
                  <em className="part">回复</em>
                </div>
                <div className="comment-content wp100">
                  中石化催化剂大连基地由中国石油化工集团公司在大连市旅顺口区投资建立
                </div>
              </div>
            </div>
            <div className={`${style.item} wp100 pr bsb`}>
              <em
                className="palt oh"
                style={{
                  backgroundImage: `url(${require('../../assets/images/test.png')})`
                }}
              />
              <div className="wp100">
                <div className="comment-title wp100 pr bsb">
                  <span className="tes">留言用户名</span>
                  <span className="tes">2019-05-22</span>
                  <em className="part">回复</em>
                </div>
                <div className="comment-content wp100">
                  中石化催化剂大连基地由中国石油化工集团公司在大连市旅顺口区投资建立
                </div>
              </div>
            </div>
            <div className={`${style.item} wp100 pr bsb`}>
              <em
                className="palt oh"
                style={{
                  backgroundImage: `url(${require('../../assets/images/test.png')})`
                }}
              />
              <div className="wp100">
                <div className="comment-title wp100 pr bsb">
                  <span className="tes">留言用户名</span>
                  <span className="tes">2019-05-22</span>
                  <em className="part">回复</em>
                </div>
                <div className="comment-content wp100">
                  中石化催化剂大连基地由中国石油化工集团公司在大连市旅顺口区投资建立
                </div>
              </div>
            </div>
          </div>
        </div>
        <Send
          isShow={this.state.isShowSendComment}
          onSend={this.onSendComment}
          onOpenOpe={this.onSwitchSendOpe}
          placeholder="回复评论"
        />
      </div>
    )
  }
}

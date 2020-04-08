import * as React from 'react'
import {} from 'react-router-dom'
import { Icon, Button, TextareaItem } from 'antd-mobile'

import { Send } from '../../component/send'
import { Header } from '../../component/header'
const style = require('./style')

interface IPropsCommentDetail {}

interface IStateCommentDetail {
  reply: string // 回复内容
  isOpenReply: boolean // 是否打开回复输入框
  isOpenSendOpe: boolean // 是否选择表情
}

export default class CommentDetail extends React.PureComponent<
  IPropsCommentDetail,
  IStateCommentDetail
> {
  constructor(props: IPropsCommentDetail) {
    super(props)

    this.state = {
      reply: '',
      isOpenReply: false,
      isOpenSendOpe: false
    }

    this.onSendReply = this.onSendReply.bind(this)
    this.onSwitchSendOpe = this.onSwitchSendOpe.bind(this)
  }

  onSwitchReply(status: boolean, event: any) {
    event.stopPropagation()
    this.setState({ isOpenReply: status })
  }

  // 发送消息
  onSendReply(msg: string) {
    console.log(msg)
  }

  // 是否显示发送的操作框
  onSwitchSendOpe(status: boolean) {
    this.setState({ isOpenSendOpe: status })
  }

  render() {
    return (
      <div
        onClick={event => this.onSwitchReply(false, event)}
        className={`${
          this.state.isOpenReply
            ? this.state.isOpenSendOpe
              ? 'pb210'
              : 'pb50'
            : ''
        } wp100 hp100 fs0 pt50 bsb pr oh ts300`}
      >
        <Header>评论详情</Header>
        <div className={`${style.commentDetail} wp100 hp100 oay sb bg-f0f0f0`}>
          {/* 评论 */}
          <div className="wp100 bsb pl15 pr15 pt15 bg-fff pb10">
            {/* 评论 */}
            <div className={`${style.commentTitle} wp100 pr bsb pl25`}>
              <em className="palt oh">
                <img
                  src={require('../../assets/images/test6.png')}
                  className="wp100 hp100"
                />
              </em>
              <div className="wp100 fs12 tes">啦啦</div>
            </div>
            {/* content */}
            <div className={`${style.commentContent} bsb wp100 pl25 fs12`}>
              “民参军”企业在整个军工配套产业链中的关键作用，充分展示了四川航空航天配套产业的底蕴与后期的潜力
            </div>
            {/* 评论对象 */}
            <div className={`${style.commentObj} wp100 pr bsb fs13 tes2`}>
              啦啦啦啦啦啦啦啦啦
              <img
                src={require('../../assets/images/test12.png')}
                className="part"
              />
            </div>
          </div>
          {/* 全部评论 */}
          <div className="wp100 mt5 bg-fff pl15 pr15 pb15 bsb">
            <h6 className="fs15 pt15">全部回复(30条)</h6>
            {/* 评论项 */}
            <div className={`${style.commentItem} wp100`}>
              <div className={`${style.commentTitle} wp100 pr bsb pl25`}>
                <em className="palt oh">
                  <img
                    src={require('../../assets/images/test6.png')}
                    className="wp100 hp100"
                  />
                </em>
                <div className="wp100 fs12 clearfix">
                  <span className="fs12 tes fl">test</span>
                  <span className="tes fr fs10">
                    <b
                      className="dib vat mr5"
                      style={{
                        backgroundImage: `url(${require('../../assets/images/thumb-act-icon.png')})`
                      }}
                    />
                    208
                  </span>
                </div>
              </div>
              <div className={`${style.commentContent} bsb wp100 pl25 fs12`}>
                <span className="mr5">回复 test :</span>
                “民参军”企业在整个军工配套产业链中的关键作用，充分展示了四川航空航天配套产业的底蕴与后期的潜力
              </div>
              <div
                className={`${style.commentDate} bsb wp100 pl25 fs10 clearfix`}
              >
                <span className="fl">2019-03-14 02:30</span>
                <span className="fr">
                  <span onClick={event => this.onSwitchReply(true, event)}>
                    回复
                  </span>
                  <span className="ml15">举报</span>
                </span>
              </div>
            </div>
            <div className={`${style.commentItem} wp100`}>
              <div className={`${style.commentTitle} wp100 pr bsb pl25`}>
                <em className="palt oh">
                  <img
                    src={require('../../assets/images/test6.png')}
                    className="wp100 hp100"
                  />
                </em>
                <div className="wp100 fs12 clearfix">
                  <span className="fs12 tes fl">test</span>
                  <span className="tes fr fs10">
                    <b
                      className="dib vat mr5"
                      style={{
                        backgroundImage: `url(${require('../../assets/images/thumb-act-icon.png')})`
                      }}
                    />
                    208
                  </span>
                </div>
              </div>
              <div className={`${style.commentContent} bsb wp100 pl25 fs12`}>
                <span className="mr5">回复 test :</span>
                “民参军”企业在整个军工配套产业链中的关键作用，充分展示了四川航空航天配套产业的底蕴与后期的潜力
              </div>
              <div
                className={`${style.commentDate} bsb wp100 pl25 fs10 clearfix`}
              >
                <span className="fl">2019-03-14 02:30</span>
                <span className="fr">
                  <span>回复</span>
                  <span className="ml15">举报</span>
                </span>
              </div>
            </div>
            <div className={`${style.commentItem} wp100`}>
              <div className={`${style.commentTitle} wp100 pr bsb pl25`}>
                <em className="palt oh">
                  <img
                    src={require('../../assets/images/test6.png')}
                    className="wp100 hp100"
                  />
                </em>
                <div className="wp100 fs12 clearfix">
                  <span className="fs12 tes fl">test</span>
                  <span className="tes fr fs10">
                    <b
                      className="dib vat mr5"
                      style={{
                        backgroundImage: `url(${require('../../assets/images/thumb-act-icon.png')})`
                      }}
                    />
                    208
                  </span>
                </div>
              </div>
              <div className={`${style.commentContent} bsb wp100 pl25 fs12`}>
                <span className="mr5">回复 test :</span>
                “民参军”企业在整个军工配套产业链中的关键作用，充分展示了四川航空航天配套产业的底蕴与后期的潜力
              </div>
              <div
                className={`${style.commentDate} bsb wp100 pl25 fs10 clearfix`}
              >
                <span className="fl">2019-03-14 02:30</span>
                <span className="fr">
                  <span>回复</span>
                  <span className="ml15">举报</span>
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* 回复评论 */}
        <Send
          isShow={this.state.isOpenReply}
          onSend={this.onSendReply}
          onOpenOpe={this.onSwitchSendOpe}
          placeholder="回复评论"
        />
      </div>
    )
  }
}

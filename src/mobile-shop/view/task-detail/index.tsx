import * as React from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'
import { Flex, Icon } from 'antd-mobile'

import { SimpleSend } from '../../component/send'
import { Header } from '../../component/header'
const style = require('./style')

enum E_COMMENT_TYPE {
  RELEASE = 'release',
  REPLY = 'reply'
}

interface IPropsTaskDetail extends RouteComponentProps {}

interface IStateTaskDetail {
  isShowSendComment: boolean
  commentType: E_COMMENT_TYPE
  commentPlaceholder: {
    [E_COMMENT_TYPE.RELEASE]: string
    [E_COMMENT_TYPE.REPLY]: string
  }
}

export default class TaskDetail extends React.PureComponent<
  IPropsTaskDetail,
  IStateTaskDetail
> {
  private onSendComment(msg: string) {
    console.log(msg)
  }

  private onSwitchComment(
    event: any,
    status: boolean,
    type: E_COMMENT_TYPE = E_COMMENT_TYPE.REPLY
  ) {
    event.stopPropagation()
    this.setState({
      isShowSendComment: status,
      commentType: status ? type : null
    })
  }

  constructor(props: IPropsTaskDetail) {
    super(props)

    this.state = {
      isShowSendComment: false,
      commentType: null,
      commentPlaceholder: {
        [E_COMMENT_TYPE.RELEASE]: '写评论',
        [E_COMMENT_TYPE.REPLY]: '回复评论'
      }
    }

    this.onSendComment = this.onSendComment.bind(this)
  }

  render() {
    return (
      <div
        onClick={event => this.onSwitchComment(event, false)}
        className={`${
          this.state.isShowSendComment ? 'pb50' : ''
        } wp100 hp100 pr bsb pt50 fs0 bg-f0f0f0 oh ts300`}
      >
        <Header
          right={
            <span
              onClick={() => this.props.history.push('/partake-biding')}
              className={style.biding}
            >
              参与竞标
            </span>
          }
        >
          详情
        </Header>
        <div className="wp100 hp100 oay sb">
          <div
            className={`${style.taskMsg} wp100 bsb pl15 pr15 pt10 pb10 bg-fff`}
          >
            <div className="title wp100 pr bsb">
              <div className="wp100 tes fs15">
                【000019】系统维护与开发系统维护与开发系统维护与开发
              </div>
              {/* 未关注 +关注 */}
              <span className={`${style.followBtn} active part fs12 bsb tac`}>
                已关注
              </span>
            </div>
            <div className="content wp100 bsb fs12">
              <span className="fl tes">
                <span>6</span>天<span>12</span>小时后对接截止
              </span>
              <span className="fr tes">
                状态:<span className="ml5">竞标中</span>
              </span>
            </div>
            <Flex className={style.taskStatus}>
              <Flex.Item className="fs-ff0000">
                <em
                  style={{
                    backgroundImage: `url(${require('../../assets/images/task-jj-icon.png')})`
                  }}
                />
                紧急
              </Flex.Item>
              <Flex.Item>
                <em
                  style={{
                    backgroundImage: `url(${require('../../assets/images/task-eye-icon.png')})`
                  }}
                />
                104
              </Flex.Item>
              <Flex.Item>
                <em
                  style={{
                    backgroundImage: `url(${require('../../assets/images/task-bm-icon.png')})`
                  }}
                />
                104
              </Flex.Item>
            </Flex>
          </div>
          <div className={`${style.taskMsgItem} wp100 bsb bg-fff mt5`}>
            <div className="item pr fs13">
              <span className="palt oh hp100">发布人</span>
              <div className="wp100 tes fs-ff6600">WENCY</div>
            </div>
            <div className="item pr fs13">
              <span className="palt oh hp100">发布时间</span>
              <div className="wp100 tes">2019-05-13 10:10</div>
            </div>
            <div className="item pr fs13">
              <span className="palt oh hp100">定标时间</span>
              <div className="wp100 tes">2019-01-01</div>
            </div>
            <div className="item pr fs13">
              <span className="palt oh hp100">执行周期</span>
              <div className="wp100 tes">30天</div>
            </div>
          </div>
          <div className={`${style.taskMsgItem} wp100 bsb bg-fff mt5`}>
            <div className="item pr fs13">
              <span className="palt oh hp100">需求预算</span>
              <div className="wp100 tes fs-ff6600">￥6789</div>
            </div>
            <div className="item pr fs13">
              <span className="palt oh hp100">竞标保证金</span>
              <div className="wp100 tes fs-ff6600">￥66623</div>
            </div>
            <div className="item pr fs13">
              <span className="palt oh hp100">需求人数</span>
              <div className="wp100 tes">
                <span className="fs-ff6600">5</span>人
              </div>
            </div>
            <div className="item pr fs13">
              <span className="palt oh hp100">需求分类</span>
              <div className="wp100 tes">生产</div>
            </div>
            <div className="item pr fs13">
              <span className="palt oh hp100">需求领域</span>
              <div className="wp100 tes">元件器件</div>
            </div>
            <div className="item pr fs13">
              <span className="palt oh hp100">需求来源</span>
              <div className="wp100 tes">企业</div>
            </div>
          </div>
          <div className={`${style.taskDesc} wp100 bsb bg-fff mt5`}>
            <div className="title wp100 fs14 bsb">需求描述</div>
            <p className="fs12">
              四路高速光纤接口卡由4路光纤接收模块和pcie3.0传输模块组成。
              每路光纤数据传输速率可达10Gbp、传输协议为aurora。 pcie接口
              遵从PCIe Gen3.0标准规范，单lane传输速率8.0GT/s。四路高速
              光纤接口卡由4路光纤接收模块和pcie3.0传输模块组成。
              每路光纤数据传输速率可达10Gbp、传输协议为
            </p>
          </div>
          <div className={`${style.taskFile} wp100 bsb bg-fff mt5`}>
            <div className="title wp100 fs14 bsb">需求附件(2)</div>
            <div className="item wp100">
              <a href="javascript:void(0);" className="fl fs12">
                <em
                  style={{
                    backgroundImage: `url(${require('../../assets/images/task-xqsms.png')})`
                  }}
                />
                需求说明书
              </a>
              <a
                href="javascript:void(0);"
                download="需求说明书"
                className="fr fs12 tac bsb"
              >
                <em
                  style={{
                    backgroundImage: `url(${require('../../assets/images/download-icon.png')})`
                  }}
                />
                下载
              </a>
            </div>
            <div className="item wp100">
              <a href="javascript:void(0);" className="fl fs12">
                <em
                  style={{
                    backgroundImage: `url(${require('../../assets/images/task-cpsms.png')})`
                  }}
                />
                产品说明书
              </a>
              <a
                href="javascript:void(0);"
                download="产品说明书"
                className="fr fs12 tac bsb"
              >
                <em
                  style={{
                    backgroundImage: `url(${require('../../assets/images/download-icon.png')})`
                  }}
                />
                下载
              </a>
            </div>
          </div>
          <div className={`${style.bidder} wp100 bsb bg-fff mt5`}>
            <div className="title wp100 fs14 bsb">
              <span className="fl">投标人</span>
              <Link to="/task-bidder" className="fr">
                更多
                <Icon type="right" size="md" />
              </Link>
            </div>
            <div className="wp100">
              <div className="item wp100 bsb pr">
                <em
                  className="palt oh"
                  style={{
                    backgroundImage: `url(${require('../../assets/images/test.png')})`
                  }}
                />
                <div className="wp100 hp100">
                  <div className="desc wp100">
                    <span className="fl fs14 tes fs-ff6600">WUMF</span>
                    <span className="fr fs12 tes">2019-05-13 12:10</span>
                  </div>
                  <div className="desc wp100 fs12 tes">
                    累计参与59个竞标，中标30个
                  </div>
                </div>
              </div>
              <div className="item wp100 bsb pr">
                <em
                  className="palt oh"
                  style={{
                    backgroundImage: `url(${require('../../assets/images/test.png')})`
                  }}
                />
                <div className="wp100 hp100">
                  <div className="desc wp100">
                    <span className="fl fs14 tes fs-ff6600">WUMF</span>
                    <span className="fr fs12 tes">2019-05-13 12:10</span>
                  </div>
                  <div className="desc wp100 fs12 tes">
                    累计参与59个竞标，中标30个
                  </div>
                </div>
              </div>
              <div className="item wp100 bsb pr">
                <em
                  className="palt oh"
                  style={{
                    backgroundImage: `url(${require('../../assets/images/test.png')})`
                  }}
                />
                <div className="wp100 hp100">
                  <div className="desc wp100">
                    <span className="fl fs14 tes fs-ff6600">WUMF</span>
                    <span className="fr fs12 tes">2019-05-13 12:10</span>
                  </div>
                  <div className="desc wp100 fs12 tes">
                    累计参与59个竞标，中标30个
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={`${style.comment} wp100 bsb bg-fff mt5`}>
            <div className="title wp100 fs14 bsb">
              <span className="fl">评论</span>
              <a
                onClick={event =>
                  this.onSwitchComment(event, true, E_COMMENT_TYPE.RELEASE)
                }
                href="javascript:void(0);"
                className="fr"
              >
                写评论
                <Icon type="right" size="md" />
              </a>
            </div>
            <div className="wp100">
              <div className="item wp100 pr bsb">
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
              <div className="item wp100 pr bsb">
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
              <div className="item wp100 pr bsb">
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
            <Link to="/task-comment" className="more-comment fs12 db bsb">
              查看更多评论
            </Link>
          </div>
        </div>
        <SimpleSend
          isShow={this.state.isShowSendComment}
          onSend={this.onSendComment}
          placeholder={this.state.commentPlaceholder[this.state.commentType]}
        />
      </div>
    )
  }
}

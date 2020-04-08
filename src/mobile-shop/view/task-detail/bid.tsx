import * as React from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'
import { Flex, Icon } from 'antd-mobile'

import CbModal from '../../component/modal'
import { SimpleSend } from '../../component/send'
import { Header } from '../../component/header'
const style = require('./style')

enum E_COMMENT_TYPE {
  RELEASE = 'release',
  REPLY = 'reply'
}

enum E_BID_STATUS {
  TO_DOCK = 'toDock', // 待对接
  PASS_DOCK = 'passDock', // 对接通过
  NOT_PASS_DOCK = 'notPassDock', // 对接未通过
  SUC_BID = 'sucBid', // 中标
  FAIL_BID = 'failBid' // 落标
}

interface IPropsTaskDetailBid extends RouteComponentProps {}

interface IStateTaskDetailBid {
  bidStatus: E_BID_STATUS
  isShowSendComment: boolean
  commentType: E_COMMENT_TYPE
  commentPlaceholder: {
    [E_COMMENT_TYPE.RELEASE]: string
    [E_COMMENT_TYPE.REPLY]: string
  }
}

const bidStatus = {
  [E_BID_STATUS.TO_DOCK]: '待对接',
  [E_BID_STATUS.PASS_DOCK]: '对接已通过',
  [E_BID_STATUS.NOT_PASS_DOCK]: '对接未通过',
  [E_BID_STATUS.SUC_BID]: '中标',
  [E_BID_STATUS.FAIL_BID]: '落标'
}

export default class TaskDetailBid extends React.PureComponent<
  IPropsTaskDetailBid,
  IStateTaskDetailBid
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

  private hasComment() {
    const { bidStatus } = this.state

    return (
      bidStatus !== E_BID_STATUS.FAIL_BID &&
      bidStatus !== E_BID_STATUS.NOT_PASS_DOCK
    )
  }

  private bidStatusInfo() {
    const { bidStatus } = this.state
    let title = null
    let msg = null
    let btn = null

    if (bidStatus === E_BID_STATUS.NOT_PASS_DOCK) {
      title = '投标对接未通过，可重新投标'
      msg = '竞标保证金将在3个工作日内退回您的个人账户'
      btn = [
        { text: '稍后再说' },
        {
          text: '重新投标',
          onPress: () => {
            this.props.history.push('/partake-biding')
          }
        }
      ]
    } else if (bidStatus === E_BID_STATUS.PASS_DOCK) {
      title = '投标对接已通过'
      msg = '投标对接已通过，进入下一轮定标'
      btn = [{ text: '我知道了' }]
    } else if (bidStatus === E_BID_STATUS.FAIL_BID) {
      title = '抱歉！此需求您未中标'
      msg = '竞标保证金将在3个工作日内退回您的个人账户'
      btn = [
        { text: '稍后再说' },
        {
          text: '竞标其他需求',
          onPress: () => {
            console.log('竞标其他需求')
            this.props.history.push('/task')
          }
        }
      ]
    } else if (bidStatus === E_BID_STATUS.SUC_BID) {
      title = '恭喜，您已中标此需求！'
      msg = '竞标保证金将在3个工作日内退回您的个人账户'
      btn = [{ text: '我知道了' }]
    }

    if (title && msg) {
      CbModal.alert(title, msg, btn)
    }
  }

  constructor(props: IPropsTaskDetailBid) {
    super(props)

    this.state = {
      bidStatus: E_BID_STATUS.FAIL_BID,
      isShowSendComment: false,
      commentType: null,
      commentPlaceholder: {
        [E_COMMENT_TYPE.RELEASE]: '写评论',
        [E_COMMENT_TYPE.REPLY]: '回复评论'
      }
    }

    this.onSendComment = this.onSendComment.bind(this)

    this.bidStatusInfo()
  }

  render() {
    return (
      <div
        onClick={event => this.onSwitchComment(event, false)}
        className={`${
          this.state.isShowSendComment ? 'pb50' : ''
        } wp100 hp100 pr bsb pt50 fs0 bg-f0f0f0 oh ts300`}
      >
        <Header>详情</Header>
        <div className="wp100 hp100 oay sb">
          <div className={`${style.countDown} wp100 bg-fff bsb mt5`}>
            <div className="wp100 hp100 tac">
              <span className="prefix">距离对接截至还有:</span>
              <span className="time">0</span>
              <span className="time">6</span>
              <span>天</span>
              <span className="time">1</span>
              <span className="time">2</span>
              <span>小时</span>
            </div>
          </div>
          <div className={`${style.bidTitle} wp100 bsb bg-fff mt5`}>
            <div className="title wp100">
              <span className="fl tes fs14">【000019】系统维护与开发</span>
              <span className="fr tes fs12">
                状态:
                <span className="ml5">{bidStatus[this.state.bidStatus]}</span>
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
            <div className="bid-item pr fs13">
              <span className="palt oh hp100">发布人</span>
              <div className="wp100 tes fs-ff6600">WENCY</div>
            </div>
            <div className="bid-item pr fs13">
              <span className="palt oh hp100">发布时间</span>
              <div className="wp100 tes">2019-05-13 10:10</div>
            </div>
            <div className="bid-item pr fs13">
              <span className="palt oh hp100">定标时间</span>
              <div className="wp100 tes">2019-01-01</div>
            </div>
            <div className="bid-item pr fs13">
              <span className="palt oh hp100">执行周期</span>
              <div className="wp100 tes">30天</div>
            </div>
          </div>
          <div className={`${style.taskMsgItem} wp100 bsb bg-fff mt5`}>
            <div className="bid-item pr fs13">
              <span className="palt oh hp100">需求预算</span>
              <div className="wp100 fs15 fs-ff0000 tes">￥6789</div>
            </div>
            <div className="bid-item pr fs13">
              <span className="palt oh hp100">竞标保证金</span>
              <div className="wp100 tes fs15 fs-ff0000">￥66623</div>
            </div>
            <div className="bid-item pr fs13">
              <span className="palt oh hp100">需求人数</span>
              <div className="wp100 tes">
                <span>5</span>人
              </div>
            </div>
            <div className="bid-item pr fs13">
              <span className="palt oh hp100">需求分类</span>
              <div className="wp100 tes">生产</div>
            </div>
            <div className="bid-item pr fs13">
              <span className="palt oh hp100">需求领域</span>
              <div className="wp100 tes">元件器件</div>
            </div>
            <div className="bid-item pr fs13">
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
          <div
            className={`${style.taskDesc} ${
              this.hasComment() ? 'pb10' : 'pb25'
            } wp100 bsb bg-fff mt5`}
          >
            <div className="title wp100 fs14 bsb">需求补充</div>
            <p className="fs12">
              四路高速光纤接口卡由4路光纤接收模块和pcie3.0传输模块组成。
              每路光纤数据传输速率可达10Gbp、传输协议为aurora。 四路高速
              光纤接口卡由4路光纤接收模块和pcie3.0传输模块组成。
            </p>
          </div>
          {this.hasComment() && (
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
          )}
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

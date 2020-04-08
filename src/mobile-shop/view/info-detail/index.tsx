import * as React from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'
import { Icon, Popover } from 'antd-mobile'

import { Header } from '../../component/header'
import { Send } from '../../component/send'
import { EllipsisPopover } from '../../component/popover'
const style = require('./style')

interface IPropsInfoDetail extends RouteComponentProps {}

interface IStateInfoDetail {
  isOpenSendOpe: boolean // 是否打开发送信息操作框
}

export default class InfoDetail extends React.PureComponent<
  IPropsInfoDetail,
  IStateInfoDetail
> {
  constructor(props: IPropsInfoDetail) {
    super(props)

    this.state = {
      isOpenSendOpe: false
    }

    this.onSelHdRtItem = this.onSelHdRtItem.bind(this)
    this.onSendComment = this.onSendComment.bind(this)
    this.onSwitchSendOpe = this.onSwitchSendOpe.bind(this)
  }

  // header right item
  onSelHdRtItem(item: any) {
    const { key } = item
    switch (key) {
      case '举报':
        return this.props.history.push('/report-complaint')
    }
  }

  // 发表评论
  onSendComment(msg: string) {
    console.log(msg)
  }

  // change send ope state
  onSwitchSendOpe(status: boolean) {
    this.setState({ isOpenSendOpe: status })
  }

  render() {
    const rcmds = [
      {
        url: '/',
        title: '福建聚焦服务备战推进军民融合深度发展',
        company: '四川赛狄信息技术股份公司',
        count: 300,
        image: require('../../assets/images/test10.png')
      },
      {
        url: '/',
        title: '福建聚焦服务备战',
        company: '四川赛狄信息技术股份公司',
        count: 300,
        image: require('../../assets/images/test10.png')
      },
      {
        url: '/',
        title: '福建聚焦服务备战',
        company: '四川赛狄信息技术股份公司',
        count: 300,
        image: require('../../assets/images/test10.png')
      }
    ]
    return (
      <div
        className={`${
          this.state.isOpenSendOpe ? 'pb210' : 'pb50'
        } wp100 hp100 ts300 fs0 pt50 bsb pr oh`}
      >
        <Header right={<EllipsisPopover onSelect={this.onSelHdRtItem} />}>
          资讯详情
        </Header>
        <div className={`${style.infoDetail} wp100 hp100 oay sb bg-f0f0f0`}>
          {/* content */}
          <div
            className={`${style.infoContent} wp100 pt15 pr15 pl15 bsb bg-fff`}
          >
            <h6 className="fs19 fw700">
              珠海航展四川展区大放异彩 获得众多客户青睐
            </h6>
            <p className="fs13 ti2">
              11月6日，第十二届中国国际航空航天博览会在珠海国际航展中心开幕。
              由四川省国防科学技术工业办公室（以下简称“省国防科工办”）组织、
              四川赛狄信息技术股份公司（以下简称“四川赛狄”）
              承办的四川航空航天配套产业功能区（以下简称“四川展区”）首次亮相，
              集中展出了数传差分电台、飞机零部件、智慧数字塔台系统、毫米波产品、
              工业应用碱性蓄电池等50余种产品，并在航展专业观众日期间（6日-8日）
              获得众多客户青睐，与近300家企业进行了合作洽谈。
            </p>
            <img
              src={require('../../assets/images/test10.png')}
              className="wp100 mt10"
            />
            <div className="footer wp100 pb5 fs12">
              <span className="fl tes">
                <em
                  className="dib vat mt15 mr5"
                  style={{
                    backgroundImage: `url(${require('../../assets/images/thumb-def-icon.png')})`
                  }}
                />
                102
              </span>
              <span className="fr tes">
                发布日期:<span className="ml5">2019-03-14</span>
              </span>
            </div>
          </div>
          {/* company */}
          <div className={`${style.infoCompany} wp100 mt5`}>
            <div className="title bg-fff bsb pr">
              <em
                className="palt"
                style={{
                  backgroundImage: `url(${require('../../assets/images/test9.png')})`
                }}
              />
              <span className="part fs-fff fs13 tac">+关注</span>
              <div className="wp100 hp100 bsb">
                <h6 className="fs16 tes">四川赛狄信息技术股份</h6>
                <p className="fs12 mt10 tes">
                  <span className="mr15">36000创作</span>|
                  <span className="ml15">12000粉丝</span>
                </p>
              </div>
            </div>
            <div className="content bsb plr15 fs12 pt10 pb10">
              <h6 className="fw400">免责声明:</h6>
              <p>
                用户在本平台发表的内容仅代表其个人及企业观点，
                不代表本平台观点，本平台亦不承担任何法律及连带责任 ；
                本平台发布的信息仅为传递、参考之用，不构成任何投资、使用等行为建议。
                任何后果均由用户自行承担；转载文章的版权归原作者所有，如有侵权，
                我们将立即整改或删除相关内容。
              </p>
            </div>
          </div>
          {/* 推荐 */}
          <div
            className={`${
              style.infoRecommend
            } wp100 mt5 bg-fff bsb pl15 pr15 pt10`}
          >
            <h6 className="title fw700 fs16">
              相关推荐
              <Link to="" className="fw400 fs13 fr tac">
                更多
              </Link>
            </h6>
            {rcmds.map((rcmd, i) => (
              <Link key={i} to="" className="rcmd-item db wp100 bsb pr">
                <img src={rcmd.image} className="part" />
                <div className="wp100">
                  <h6 className="tes3 fs14 fw400">{rcmd.title}</h6>
                  <p className="wp100 fs11">
                    <span className="fl tes">{rcmd.company}</span>
                    <span className="fr tes">
                      <em
                        className="vat dib mr5"
                        style={{
                          backgroundImage: `url(${require('../../assets/images/eye-icon.png')})`
                        }}
                      />
                      {rcmd.count}人阅读
                    </span>
                  </p>
                </div>
              </Link>
            ))}
          </div>
          {/* 热门评论 */}
          <div className={`${style.infoComment} wp100 p15 bsb bg-fff mt5`}>
            <h6 className="fw700 fs16">热门评论</h6>
            <div className="comment-item wp100 pt15">
              <div className="comment-item-title wp100 pr bsb pl25">
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
              <div className="comment-item-content bsb wp100 pl25 fs12">
                “民参军”企业在整个军工配套产业链中的关键作用，充分展示了四川航空航天配套产业的底蕴与后期的潜力
              </div>
              <div className="comment-item-footer bsb wp100 pl25 fs10 clearfix">
                <span className="fl">
                  2019-03-14 02:30<span className="ml15">10条回复</span>
                </span>
                <span className="fr">
                  <span>举报</span>
                </span>
              </div>
            </div>
            <div className="comment-item wp100 pt15">
              <div className="comment-item-title wp100 pr bsb pl25">
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
              <div className="comment-item-content bsb wp100 pl25 fs12">
                “民参军”企业在整个军工配套产业链中的关键作用，充分展示了四川航空航天配套产业的底蕴与后期的潜力
              </div>
              <div className="comment-item-footer bsb wp100 pl25 fs10 clearfix">
                <span className="fl tes">
                  2019-03-14 02:30<span className="ml15">10条回复</span>
                </span>
                <span className="fr tes">
                  <span>举报</span>
                </span>
              </div>
            </div>
          </div>
        </div>
        <Send
          onSend={this.onSendComment}
          onOpenOpe={this.onSwitchSendOpe}
          placeholder="发布评论"
        />
      </div>
    )
  }
}

import * as React from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'
import { Icon, Flex, Grid } from 'antd-mobile'

import CbModal from '../../component/modal'
import { Footer } from '../../component/footer'
import { Header } from '../../component/header'
const style = require('./style')

interface IPropsMy extends RouteComponentProps {}

interface IStateMy {
  expertStatus: E_EXPERT_STATUS
}

// 专家认证状态
enum E_EXPERT_STATUS {
  UNAUTH = 'unauth', // 未认证
  AUTHING = 'authing', // 审核中
  FAIL_AUTH = 'failAuth', // 认证失败
  SUC_AUTH = 'sucAuch' // 已认证
}
const expertStatusConfig = {
  [E_EXPERT_STATUS.UNAUTH]: '未认证',
  [E_EXPERT_STATUS.AUTHING]: '审核中',
  [E_EXPERT_STATUS.FAIL_AUTH]: '认证失败',
  [E_EXPERT_STATUS.SUC_AUTH]: '已认证'
}

export default class My extends React.PureComponent<IPropsMy, IStateMy> {
  // 专家跳转
  private onJumpExpert() {
    const { expertStatus } = this.state
    const { history } = this.props

    let msg = null
    let btn = null

    switch (expertStatus) {
      case E_EXPERT_STATUS.SUC_AUTH:
        return history.push('/expert-personal')
      case E_EXPERT_STATUS.FAIL_AUTH:
        return history.push('/expert-auth')
      case E_EXPERT_STATUS.UNAUTH:
        msg = '您当前还不是平台认证专家哦,是否认证成为平台专家?'
        btn = [
          { text: '取消' },
          {
            text: '去认证',
            onPress() {
              history.push('/expert-auth')
            }
          }
        ]
        break
      case E_EXPERT_STATUS.AUTHING:
        msg = '您当前资料正在审核中!'
        btn = [{ text: '知道了' }]
        break
    }

    msg && CbModal.alert('提示', msg, btn)
  }

  constructor(props: IPropsMy) {
    super(props)

    this.state = {
      expertStatus: E_EXPERT_STATUS.SUC_AUTH
    }

    this.onJumpExpert = this.onJumpExpert.bind(this)
  }

  render() {
    const myOrders = [
      {
        url: '/',
        title: '待付款',
        icon: require('../../assets/images/my-dhk-icon.png')
      },
      {
        url: '/',
        title: '待发货',
        icon: require('../../assets/images/my-dfh-icon.png')
      },
      {
        url: '/',
        title: '待收货',
        icon: require('../../assets/images/my-dsh-icon.png')
      },
      {
        url: '/',
        title: '退换货',
        icon: require('../../assets/images/my-th-icon.png')
      }
    ]

    const myOthers = [
      {
        url: '/',
        title: '优惠券',
        icon: require('../../assets/images/my-yhq-icon.png')
      },
      {
        url: '/',
        title: '我的收藏',
        icon: require('../../assets/images/my-sc-icon.png')
      },
      {
        url: '/',
        title: '我的关注',
        icon: require('../../assets/images/my-gz-icon.png')
      },
      {
        url: '/',
        title: '我的供应商',
        icon: require('../../assets/images/my-gys-icon.png')
      },
      {
        url: '/',
        title: '我的使用',
        icon: require('../../assets/images/my-sy-icon.png')
      },
      {
        url: '/',
        title: 'BOM配单',
        icon: require('../../assets/images/my-dz-icon.png')
      },
      {
        url: '/',
        title: '代替查询',
        icon: require('../../assets/images/my-cx-icon.png')
      },
      {
        url: '/',
        title: '我的约购',
        icon: require('../../assets/images/my-yg-icon.png')
      },
      {
        url: '/',
        title: 'PMS系统',
        icon: require('../../assets/images/my-pms-icon.png')
      },
      {
        url: '/',
        title: '我的文库',
        icon: require('../../assets/images/my-wk-icon.png')
      },
      {
        url: '/',
        title: '我的参与',
        icon: require('../../assets/images/my-cy-icon.png')
      },
      {
        url: '/',
        title: '我的资讯',
        icon: require('../../assets/images/my-zx-icon.png')
      }
    ]
    const aboutUss = [
      {
        url: '/',
        title: '平台介绍',
        bgColor: '#f7dede',
        icon: require('../../assets/images/my-ptjs-icon.png')
      },
      {
        url: '/',
        title: '意见反馈',
        bgColor: '#f2e3ba',
        icon: require('../../assets/images/my-yjfk-icon.png')
      },
      {
        url: '/',
        title: '分享APP',
        bgColor: '#f2cbb4',
        icon: require('../../assets/images/my-fx-icon.png')
      }
    ]
    return (
      <div className="wp100 hp100 pr bsb pb50">
        {/* my content */}
        <div
          className={`${style.my} wp100 hp100 oay fs0 sb pb15 bsb bg-f0f0f0`}
        >
          {/* banner */}
          <div className={`${style.banner} wp100 pr`}>
            {/* header */}
            <Header
              left=""
              right={
                <img
                  src={require('../../assets/images/my-set-icon.png')}
                  className="fr hp100"
                />
              }
            >
              我的
            </Header>
            <img
              src={require('../../assets/images/my-banner-bg.png')}
              className="wp100"
            />
            <div
              className={`${
                style.myMsg
              } wp100 palt pr20 bsb fw700 fs22 tes fs-fff`}
            >
              <span className="dib vat oh palt bg-fff zi100">
                <img
                  src={require('../../assets/images/test6.png')}
                  className="wp100 mc"
                />
              </span>
              {'兰花草'}
            </div>
          </div>
          {/* vip */}
          <Link
            to="/"
            className={`${style.vip} db wp100 clearfix plr10 bsb bg-fff`}
          >
            <div
              className="fl fs12 tes bsb"
              style={{
                backgroundImage: `url(${require('../../assets/images/my-vip-icon.png')})`
              }}
            >
              升级VIP会员享受更多特权
            </div>
            <div className="fr fs11 tes pr pr20 bsb">
              了解VIP
              <Icon className="part" type="right" color="#808080" size="md" />
            </div>
          </Link>
          {/* 我的订单 */}
          <div className={`${style.myOrder} wp100 mt5 bg-fff`}>
            <Link to="" className="db bsb plr10 clearfix bb1">
              <div className="fl fs14 tes fw700">我的订单</div>
              <div className="fr fs11 tes pr pr20 bsb">
                全部订单
                <Icon className="part" type="right" color="#808080" size="md" />
              </div>
            </Link>
            <Grid
              data={myOrders}
              columnNum={4}
              square={false}
              hasLine={false}
              activeStyle={false}
              className="ma"
              renderItem={od => (
                <Link to={od.url} className="db ma mt15">
                  <em
                    className="db br3 ma"
                    style={{ backgroundImage: `url(${od.icon})` }}
                  />
                  <span className="tes fs11 mt10 db pb5">{od.title}</span>
                </Link>
              )}
            />
          </div>
          {/* 我的账户 */}
          <div className={`${style.myAccount} mt5 bg-fff wp100`}>
            <div className="clearfix plr10 bsb bb1">
              <div className="fl pb10">
                <span className="fs14 tes fw700 db">我的账户</span>
                <span className="fs11 tes db">权益/服务/佣金</span>
              </div>
              <Link to="" className="fr bsb fs11 fs-fff tac">
                立即认证
                <Icon className="vat" type="right" color="#fff" size="md" />
              </Link>
            </div>
            <div className="plr10 bsb">
              <Flex className="fs12">
                <Flex.Item>
                  <a href="javascript:void(0)" className="db vat tes tac">
                    <em
                      className="mr5 dib vat"
                      style={{
                        backgroundImage: `url(${require('../../assets/images/my-mny-icon.png')})`
                      }}
                    />
                    余额<span className="ml10 fs14">￥18000</span>
                  </a>
                </Flex.Item>
                <Flex.Item>
                  <a href="javascript:void(0)" className="db vat tes tac">
                    <em
                      className="mr5 dib vat"
                      style={{
                        backgroundImage: `url(${require('../../assets/images/my-jf-icon.png')})`
                      }}
                    />
                    积分<span className="ml10 fs14">2280</span>
                  </a>
                </Flex.Item>
                <Flex.Item>
                  <a href="javascript:void(0)" className="db vat tes tac">
                    <em
                      className="mr5 dib vat"
                      style={{
                        backgroundImage: `url(${require('../../assets/images/my-mny-icon.png')})`
                      }}
                    />
                    红包<span className="ml10 fs14">8</span>个
                  </a>
                </Flex.Item>
              </Flex>
            </div>
          </div>
          {/* 其他 */}
          <div className={`${style.myOther} mt5 bg-fff wp100`}>
            <Grid
              data={myOthers}
              columnNum={4}
              square={false}
              hasLine={false}
              activeStyle={false}
              className="ma"
              renderItem={oh => (
                <Link to={oh.url} className="db ma mt15">
                  <em
                    className="db br3 ma"
                    style={{ backgroundImage: `url(${oh.icon})` }}
                  />
                  <span className="tes fs11 mt10 db pb5">{oh.title}</span>
                </Link>
              )}
            />
          </div>
          {/* 专家中心 */}
          <div
            onClick={this.onJumpExpert}
            className={`${
              style.expertCentre
            } wp100 bg-fff mt5 bsb plr10 clearfix`}
          >
            <div className="fl fs14 tes fw700">专家中心</div>
            <div className="fr fs11 tes pr pr20 bsb">
              {expertStatusConfig[this.state.expertStatus]}
              <Icon className="part" type="right" color="#808080" size="md" />
            </div>
          </div>
          {/* 关于我们 */}
          <div className={`${style.aboutUs} bg-fff wp100 mt5`}>
            <Link to="" className="db bsb plr10 clearfix bb1">
              <div className="fl fs14 tes fw700">关于我们</div>
              <div className="fr fs11 pr pr20 bsb">
                <Icon className="part" type="right" color="#808080" size="md" />
              </div>
            </Link>
            <Grid
              data={aboutUss}
              columnNum={3}
              square={false}
              hasLine={false}
              activeStyle={false}
              renderItem={us => (
                <Link to={us.url} className="db ma mt15">
                  <em
                    className="db br3 ma"
                    style={{
                      backgroundImage: `url(${us.icon})`,
                      backgroundColor: us.bgColor
                    }}
                  />
                  <span className="tes fs11 mt10 db pb5">{us.title}</span>
                </Link>
              )}
            />
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

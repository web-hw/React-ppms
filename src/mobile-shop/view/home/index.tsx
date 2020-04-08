import * as React from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'
// import { observer, inject } from 'mobx-react'
import { Carousel, Grid, Flex, Tabs } from 'antd-mobile'

import { Footer } from '../../component/footer'
const style = require('./style')

interface IProps extends RouteComponentProps {}
interface IState {
  expertAct: number
  isFixOfLogo: boolean
}
export default class Home extends React.Component<IProps, IState> {
  // logo DOM
  logoEl: HTMLDivElement = null

  constructor(props: IProps) {
    super(props)

    this.state = {
      expertAct: 0,
      isFixOfLogo: false
    }
    this.onChangeProTab = this.onChangeProTab.bind(this)
    this.onScrollHome = this.onScrollHome.bind(this)
  }

  onChangeProTab(tab: any) {
    console.log(tab)
  }

  // home容器滚动事件
  onScrollHome(event: React.UIEvent<HTMLDivElement>) {
    // 检查当前元素是否存在
    const target: any = event.target
    if (!target) {
      return
    }

    // 检查logo元素是否存在
    const logoEl = this.logoEl
    if (!logoEl) {
      return
    }

    // 检查获取的值是否合法
    const scrollTop = target.scrollTop
    const logoTop = logoEl.offsetTop
    if (isNaN(logoTop) || isNaN(scrollTop)) {
      return
    }

    // 切换logo固定样式
    this.setState({ isFixOfLogo: scrollTop > logoTop })
  }

  render() {
    const banners = [
      require('../../assets/images/banner.jpg'),
      require('../../assets/images/banner.jpg'),
      require('../../assets/images/banner.jpg')
    ]
    const navs = [
      {
        title: '产品市场',
        url: '/',
        icon: require('../../assets/images/nav_cpsc.png')
      },
      {
        title: '项目需求',
        url: '/task',
        icon: require('../../assets/images/nav_xmxq.png')
      },
      {
        title: '配套服务',
        url: '/',
        icon: require('../../assets/images/nav_ptfw.png')
      },
      {
        title: '人脉商圈',
        url: '/',
        icon: require('../../assets/images/nav_rmsq.png')
      },
      {
        title: '专家智库',
        url: '/experts',
        icon: require('../../assets/images/nav_zjzk.png')
      },
      {
        title: '资讯信息',
        url: '/info-msg',
        icon: require('../../assets/images/nav_zxxx.png')
      },
      {
        title: '会议展会',
        url: '/',
        icon: require('../../assets/images/nav_hyzh.png')
      },
      {
        title: '技术文库',
        url: '/',
        icon: require('../../assets/images/nav_jswk.png')
      },
      {
        title: '人才中心',
        url: '/',
        icon: require('../../assets/images/nav_rczx.png')
      },
      {
        title: '更多',
        url: '/',
        icon: require('../../assets/images/nav_more.png')
      }
    ]

    const sgstInfos = [
      [
        {
          title: '经济发展动力足脱贫攻坚',
          icon: require('../../assets/images/test.png'),
          url: '/info-detail'
        }
      ]
    ]
    const statistics = [
      {
        icon: require('../../assets/images/statistics_cp.png'),
        name: '产品数量',
        count: '123,687',
        unit: '项'
      },
      {
        icon: require('../../assets/images/statistics_qy.png'),
        name: '对接企业',
        count: '123,687',
        unit: '家'
      },
      {
        icon: require('../../assets/images/statistics_zy.png'),
        name: '文库资源',
        count: '123,687',
        unit: '篇'
      },
      {
        icon: require('../../assets/images/statistics_zj.png'),
        name: '入驻专家',
        count: '123,687',
        unit: '位'
      }
    ]

    const exhibitions = [
      [
        {
          title: '2017第十九届北京国际特',
          icon: require('../../assets/images/test2.png'),
          url: '/',
          date: '2019.03.13',
          address: '四川成都'
        },
        {
          title: '2017第十九届北京国际特',
          icon: require('../../assets/images/test2.png'),
          url: '/',
          date: '2019.03.13',
          address: '四川成都'
        }
      ],
      [
        {
          title: '2017第十九届北京国际特',
          icon: require('../../assets/images/test2.png'),
          url: '/',
          date: '2019.03.13',
          address: '四川成都'
        },
        {
          title: '2017第十九届北京国际特',
          icon: require('../../assets/images/test2.png'),
          url: '/',
          date: '2019.03.13',
          address: '四川成都'
        }
      ],
      [
        {
          title: '2017第十九届北京国际特',
          icon: require('../../assets/images/test2.png'),
          url: '/',
          date: '2019.03.13',
          address: '四川成都'
        }
      ]
    ]

    const busCircles = [
      {
        title: '平台联盟圈',
        icons: [
          require('../../assets/images/test.png'),
          require('../../assets/images/test.png'),
          require('../../assets/images/test.png')
        ],
        url: '/',
        count: 28
      },
      {
        title: '单位工作圈',
        icons: [
          require('../../assets/images/test.png'),
          require('../../assets/images/test.png')
        ],
        url: '/',
        count: 28
      },
      {
        title: '自发项目圈',
        icons: [require('../../assets/images/test.png')],
        url: '/',
        count: 28
      },
      {
        title: '生活娱乐圈',
        icons: [require('../../assets/images/test.png')],
        url: '/',
        count: 28
      }
    ]

    const experts = [
      {
        url: '/expert',
        icon: require('../../assets/images/test3.png'),
        name: '黄大庆',
        trade: '科技工业'
      },
      {
        url: '/expert',
        icon: require('../../assets/images/test3.png'),
        name: '黄大庆',
        trade: '科技工业'
      },
      {
        url: '/expert',
        icon: require('../../assets/images/test3.png'),
        name: '黄大庆',
        trade: '科技工业'
      },
      {
        url: '/expert',
        icon: require('../../assets/images/test3.png'),
        name: '黄大庆',
        trade: '科技工业'
      }
    ]
    const techLibs = [
      {
        url: '/',
        title: 'TYMB2018016A 设备耐久性分析评估报',
        author: '中国航空综合技术研究院',
        img: require('../../assets/images/test4.png'),
        icon: require('../../assets/images/tech_lib_icon.png')
      },
      {
        url: '/',
        title: 'TYMB2018016A 设备耐久性分析评估报告模板',
        author: '中国航空综合技术研究院',
        img: require('../../assets/images/test4.png'),
        icon: require('../../assets/images/tech_lib_icon.png')
      },
      {
        url: '/',
        title: 'TYMB2018016A 设备耐久性分析评估报告模板',
        author: '中国航空综合技术研究院',
        img: require('../../assets/images/test4.png'),
        icon: require('../../assets/images/tech_lib_icon.png')
      }
    ]
    const products = [
      {
        img: require('../../assets/images/test5.png'),
        title: '[贴片电阻]陶瓷基板片式厚膜固定贴片电阻',
        model: '101010300039',
        price: '1.08'
      },
      {
        img: require('../../assets/images/test5.png'),
        title: '[贴片电阻]陶瓷基板片式厚膜',
        model: '101010300039',
        price: '1.08'
      },
      {
        img: require('../../assets/images/test5.png'),
        title: '[贴片电阻]陶瓷基板片式厚膜固定贴片电阻',
        model: '101010300039',
        price: '1.08'
      }
    ]
    const proTabs = [
      { title: '电子元器件' },
      { title: '组件部件' },
      { title: '整机设备' },
      { title: '电子系统' },
      { title: '材料' }
    ]
    return (
      <div className="wp100 hp100 pr oh pb50 bsb">
        {/* logo */}
        <div
          ref={el => (this.logoEl = el)}
          className={`${this.state.isFixOfLogo ? 'active' : ''} ${
            style.logo
          } wp100 palt zi1000 tac`}
        >
          <img
            src={require(`../../assets/images/${
              this.state.isFixOfLogo ? 'logo-colour' : 'logo-fff'
            }.png`)}
            className="mt10"
          />
        </div>
        {/* home content */}
        <div
          onScroll={this.onScrollHome}
          className={`${style.home} wp100 hp100 oay fs0 sb bg-f0f0f0`}
        >
          {/* banner */}
          <div className={`${style.banner} wp100 pr oh`}>
            {/* <img
              src={require('../../assets/images/logo-fff.png')}
              className={`${style.bannerLogo} palt zi100`}
            /> */}
            <Carousel
              dots={false}
              autoplay={true}
              infinite={true}
              autoplayInterval={5000}
            >
              {banners.map((bn, i) => (
                <a key={i} href="javascript:void(0)" className="db wp100 hp100">
                  <img src={bn} className="hp100 wp100" />
                </a>
              ))}
            </Carousel>
          </div>
          {/* nav */}
          <div className="wp100 plr10 bsb zi100 pr">
            <div className={`${style.nav} wp100 oh br5 bg-fff`}>
              <Grid
                data={navs}
                columnNum={5}
                square={false}
                hasLine={false}
                activeStyle={false}
                onClick={itm => this.props.history.push(itm.url)}
                renderItem={item => (
                  <div className={`${style.navItem} wp100 pt15`}>
                    <img src={item.icon} title={item.title} />
                    <span className="fs11 db tes plr5 mt10">{item.title}</span>
                  </div>
                )}
              />
              <div className="wp100 plr5 bsb">
                <div className={`${style.firstNew} wp100 ptb10 pr bsb`}>
                  <a href="javascript:void(0);" className="fs14 tac palt fw700">
                    头条播报
                  </a>
                  <Link to="/" className="fs12 db wp100 tes bsb">
                    啦啦啦啦
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {/* 统计 */}
          <div className={`${style.statistics} wp100 plr10 bsb mt5`}>
            <Flex>
              {statistics.map(item => (
                <Flex.Item
                  className="ct-am-fb-itm br5 plr10 bsb bg-fff"
                  key={item.name}
                  style={{ backgroundImage: `url(${item.icon})` }}
                >
                  <div className="fs13 tes">{item.name}</div>
                  <span className="fs11 db">
                    <em className="fsn pr mr5 tes dib vat">{item.count}</em>
                    <span>{item.unit}</span>
                  </span>
                </Flex.Item>
              ))}
            </Flex>
          </div>
          {/* 推荐资讯 */}
          <div className="wp100 plr10 bsb mt5">
            <div className="wp100 br5 bg-fff plr10 bsb">
              <h6 className={`${style.title} wp100 fw700 fs16`}>
                推荐资讯
                <Link to="/info-msg" className="fs13 fr tac fw400">
                  更多
                </Link>
              </h6>
              <div className={`${style.sgstInfo} wp100 pb5`}>
                <Carousel dots={false} autoplay={false} infinite={false}>
                  {sgstInfos.map((sgsts, idx) => (
                    <Flex key={idx}>
                      {sgsts.map((sgst, i) => (
                        <Flex.Item
                          key={`${idx}-${i}`}
                          className="ct-am-fb-itm tal"
                          style={{ maxWidth: `${100 / 2}%` }}
                        >
                          <Link to={sgst.url} className="db wp100 hp100">
                            <img src={sgst.icon} className="wp100" />
                            <h6 className="tes wp100 fs14">
                              {sgst.title}lalal
                            </h6>
                          </Link>
                        </Flex.Item>
                      ))}
                    </Flex>
                  ))}
                </Carousel>
              </div>
            </div>
          </div>
          {/* 会议展会 */}
          <div className="wp100 plr10 bsb mt5">
            <div className="wp100 br5 bg-fff plr10 bsb">
              <h6 className={`${style.title} wp100 fw700 fs16`}>
                会议展会
                <Link to="/" className="fs13 fr tac fw400">
                  更多
                </Link>
              </h6>
              <div className={`${style.exhibition} wp100 pb15`}>
                <Carousel dots={false} autoplay={false} infinite={false}>
                  {exhibitions.map((exhibs, idx) => (
                    <Flex key={idx}>
                      {exhibs.map((exhib, i) => (
                        <Flex.Item
                          key={`${idx}-${i}`}
                          className="ct-am-fb-itm tal"
                          style={{ maxWidth: `${100 / 2}%` }}
                        >
                          <Link to={exhib.url} className="db wp100 hp100">
                            <img src={exhib.icon} className="wp100" />
                            <h6 className="tes wp100 fs14">{exhib.title}</h6>
                            <div className="fs11 clearfix">
                              <span className="fl tes">{exhib.date}</span>
                              <span className="fr tes">{exhib.address}</span>
                            </div>
                          </Link>
                        </Flex.Item>
                      ))}
                    </Flex>
                  ))}
                </Carousel>
              </div>
            </div>
          </div>
          {/* 人脉商圈 */}
          <div className="wp100 plr10 bsb mt5">
            <div className="wp100 br5 bg-fff plr10 bsb">
              <h6 className={`${style.title} wp100 fw700 fs16`}>
                人脉商圈
                <Link to="/" className="fs13 fr tac fw400">
                  更多
                </Link>
              </h6>
              <div className={`${style.busCircle} wp100 pb10 clearfix`}>
                {busCircles.map((bus, idx) => (
                  <div className="wp50 fl bsb mb5" key={idx}>
                    <Link to={bus.url} className="db wp100 clearfix bsb tac">
                      <div className="fl wp50">
                        <h6 className="fs14 tes">{bus.title}</h6>
                        <span className="dib fs11 plr10 mt5 tes bsb">
                          {bus.count}个圈子
                        </span>
                      </div>
                      <div className="fr wp50 oh">
                        {bus.icons.map((icon, i) => (
                          <img
                            key={`${idx}-${i}`}
                            src={icon}
                            className={`zi${bus.icons.length - i}00 pr`}
                          />
                        ))}
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* 行业专家 */}
          <div className={`${style.expert} wp100 plr10 bsb mt5`}>
            <div className="wp100 plr10 bsb">
              <h6 className={`${style.title} wp100 fw700 fs16`}>
                行业专家
                <Link to="/experts" className="fs13 fr tac fw400">
                  更多
                </Link>
              </h6>
              <div className="wp100 pb15">
                <Carousel
                  selectedIndex={this.state.expertAct}
                  dots={false}
                  autoplay={false}
                  infinite={true}
                  cellSpacing={6}
                  slideWidth={0.5}
                  afterChange={idx => this.setState({ expertAct: idx })}
                  frameOverflow="visible"
                >
                  {experts.map((expert, idx) => (
                    <Link
                      to={expert.url}
                      key={idx}
                      className={`${
                        this.state.expertAct === idx ? 'active' : ''
                      } db br5 bg-fff bsb`}
                    >
                      <img src={expert.icon} className="br5 wp100" />
                      <div className="wp100 bsb plr10 bsb clearfix">
                        <span className="fl tes fs15">{expert.name}</span>
                        <span className="fr tes fs12">{expert.trade}</span>
                      </div>
                    </Link>
                  ))}
                </Carousel>
              </div>
            </div>
          </div>
          {/* 技术文库 */}
          <div className="wp100 plr10 bsb mt5">
            <div className="wp100 plr10 bsb bg-fff br5">
              <h6 className={`${style.title} wp100 fw700 fs16`}>
                技术文库
                <Link to="/" className="fs13 fr tac fw400">
                  更多
                </Link>
              </h6>
              <div className="wp100 pb10">
                {techLibs.map((lib, i) => (
                  <div
                    key={i}
                    className={`${style.techLibItem} wp100 pb15 pr bsb`}
                  >
                    <img src={lib.img} className="palt" />
                    <div className="wp100 bsb pl20 pr">
                      <em
                        style={{ backgroundImage: `url(${lib.icon})` }}
                        className="palt"
                      />
                      <h6 className="fs14 fw400 tes2 wp100">{lib.title}</h6>
                      <p className="fs11 mt10 tes">
                        作者:<span className="ml10">{lib.author}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* 产品超市 */}
          <div className={`${style.proMkt} wp100 mt5 pr`}>
            <h6 className="plr10 bsb fw700 fs16 bg-fff pr">
              <span className="palt zi400 bg-fff tar pr10">产品超市</span>
              <em className="part zi400 bg-fff" />
            </h6>
            <Tabs
              tabs={proTabs}
              onChange={this.onChangeProTab}
              renderTabBar={props => (
                <Tabs.DefaultTabBar {...props} page={4.6} />
              )}
            >
              <div className="plr10 wp100 bsb mb10">
                {products.map((pro, i) => (
                  <div key={i} className="pro-item wp50 dib mt10 bsb vat">
                    <Link to="/" className="wp100 db bg-fff">
                      <div className="img wp100 pr bsb p5">
                        <img src={pro.img} className="mc" />
                      </div>
                      <div className="content wp100 bsb p5">
                        <h6 className="fs12 tes2">{pro.title}</h6>
                        <p className="fs10 mt10 tes">
                          型号:<span className="ml10">{pro.model}</span>
                        </p>
                        <div className="wp100 clearfix">
                          <span className="fl fs14 tes">￥{pro.price}</span>
                          <span className="fr fs10 tes">找同类</span>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </Tabs>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

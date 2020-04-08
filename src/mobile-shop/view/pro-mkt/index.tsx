import * as React from 'react'
import { Link } from 'react-router-dom'
import { Icon, Tabs, Grid } from 'antd-mobile'

import { Footer } from '../../component/footer'
import { Header } from '../../component/header'
const style = require('./style')

interface IPropsProMkt {}

interface IStateProMkt {}

export default class ProMkt extends React.PureComponent<
  IPropsProMkt,
  IStateProMkt
> {
  constructor(props: IPropsProMkt) {
    super(props)
    this.onChangeProTab = this.onChangeProTab.bind(this)
  }

  // 切换产品tab
  onChangeProTab() {}

  render() {
    const proTabs = [
      { title: '电子元器件' },
      { title: '组件部件' },
      { title: '整机设备' },
      { title: '电子系统' },
      { title: '材料' }
    ]
    const asideNavs = [
      { title: '产品超市' },
      { title: '选购标准' },
      { title: '方案技术' },
      { title: '开发工具' },
      { title: '制造设备' },
      { title: '检测设备' },
      { title: '试验设备' }
    ]
    const goods = [
      {
        url: '',
        icon: require('../../assets/images/test8.png'),
        title: '测试测试测试测试测试'
      },
      {
        url: '',
        icon: require('../../assets/images/test8.png'),
        title: '测试测试测试测试测试'
      },
      {
        url: '',
        icon: require('../../assets/images/test8.png'),
        title: '测试测试测试测试测试'
      },
      {
        url: '',
        icon: require('../../assets/images/test8.png'),
        title: '测试测试测试测试测试'
      },
      {
        url: '',
        icon: require('../../assets/images/test8.png'),
        title: '测试测试测试测试测试'
      },
      {
        url: '',
        icon: require('../../assets/images/test8.png'),
        title: '测试测试测试测试测试'
      },
      {
        url: '',
        icon: require('../../assets/images/test8.png'),
        title: '测试测试测试测试测试'
      },
      {
        url: '',
        icon: require('../../assets/images/test8.png'),
        title: '测试测试测试测试测试'
      },
      {
        url: '',
        icon: require('../../assets/images/test8.png'),
        title: '测试测试测试测试测试'
      },
      {
        url: '',
        icon: require('../../assets/images/test8.png'),
        title: '测试测试测试测试测试'
      },
      {
        url: '',
        icon: require('../../assets/images/test8.png'),
        title: '测试测试测试测试测试'
      },
      {
        url: '',
        icon: require('../../assets/images/test8.png'),
        title: '测试测试测试测试测试'
      }
    ]
    return (
      <div className="wp100 hp100 fs0 ptb50 bsb pr">
        <Header
          left={
            <span>
              <Icon type="left" className="cb-left-lg vat" size="lg" />
              产品超市
            </span>
          }
          right={
            <Icon className="vat" type="search" color="#1a1a1a" size="sm" />
          }
        />
        {/* 产品超市 */}
        <div className={`${style.proMkt} wp100 hp100 bsb pr bg-f0f0f0`}>
          {/* 左右遮罩 */}
          <em className="model-l-r palt zi400 bg-fff" />
          <em className="model-l-r part zi400 bg-fff" />
          {/* 侧边栏 */}
          <div className="aside-nav palt pt45 pb5 bsb zi200 hp100">
            <ul className="fs12 wp100 oay sb">
              {asideNavs.map((nav, i) => (
                <li
                  key={i}
                  className={`${i === 0 ? 'active' : ''} wp100 bsb plr10 tes`}
                >
                  {nav.title}
                </li>
              ))}
            </ul>
          </div>
          <Tabs
            tabs={proTabs}
            onChange={this.onChangeProTab}
            renderTabBar={props => <Tabs.DefaultTabBar {...props} page={5} />}
          >
            <div className="wp100 hp100 bg-fff oay sb pb10">
              {/* banner */}
              <div className={`${style.proBanner} wp100 oh`}>
                <img
                  src={require('../../assets/images/test7.png')}
                  className="hp100"
                />
              </div>
              {/* title */}
              <h6 className="fs12 plr10 bsb wp100 tes mt15">产品超市</h6>
              {/* 商品 */}
              <div className={`${style.goodList} wp100 bsb plr10`}>
                <Grid
                  data={goods}
                  columnNum={3}
                  square={false}
                  hasLine={false}
                  activeStyle={false}
                  className="ma"
                  renderItem={good => (
                    <Link to={good.url} className="db mt20 ma">
                      <em className="db bsb p5">
                        <img src={good.icon} />
                      </em>
                      <span className="tes fs10 mt10 db">{good.title}</span>
                    </Link>
                  )}
                />
              </div>
            </div>
          </Tabs>
        </div>
        <Footer />
      </div>
    )
  }
}

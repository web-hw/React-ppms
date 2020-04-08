import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Icon, Flex, Grid } from 'antd-mobile'

import { Header } from '../../component/header'
const style = require('./style')

type TInfoType = { label: string; value: string; icon: string }

const infoTypes: TInfoType[] = [
  {
    label: '行业热点',
    value: '行业热点',
    icon: require('../../assets/images/inform-hyrd.png')
  },
  {
    label: '军民融合',
    value: '军民融合',
    icon: require('../../assets/images/inform-jmrh.png')
  },
  {
    label: '标准建设',
    value: '标准建设',
    icon: require('../../assets/images/inform-bzjs.png')
  },
  {
    label: '质量管理',
    value: '质量管理',
    icon: require('../../assets/images/inform-zlgl.png')
  },
  {
    label: '电子商务',
    value: '电子商务',
    icon: require('../../assets/images/inform-dzsw.png')
  },
  {
    label: '国际时事',
    value: '国际时事',
    icon: require('../../assets/images/inform-gjss.png')
  },
  {
    label: '项目招标',
    value: '项目招标',
    icon: require('../../assets/images/inform-xmzb.png')
  },
  {
    label: '生产制造',
    value: '生产制造',
    icon: require('../../assets/images/inform-sczz.png')
  },
  {
    label: '整机设备',
    value: '整机设备',
    icon: require('../../assets/images/inform-zjsb.png')
  },
  {
    label: '企业专题',
    value: '企业专题',
    icon: require('../../assets/images/inform-qyzt.png')
  },
  {
    label: '电子元器件',
    value: '电子元器件',
    icon: require('../../assets/images/inform-dzyqj.png')
  }
]

interface IPropsInfoMsg extends RouteComponentProps {}

interface IStateInfoMsg {
  infoType: string
  isShowTypeModal: boolean
}

export default class InfoMsg extends React.PureComponent<
  IPropsInfoMsg,
  IStateInfoMsg
> {
  private _navs: TInfoType[] = infoTypes.slice(0, 5)

  // 根据类型获取资讯
  private getInfoByType(type: any) {
    const { value } = type
    const { infoType } = this.state
    this.setState({ isShowTypeModal: false })
    if (value === infoType) {
      return
    }

    this.setState({ infoType: value })

    // Todo 获取数据
    console.log('获取数据')
  }

  constructor(props: IPropsInfoMsg) {
    super(props)

    this.state = {
      infoType: this._navs[0].value,
      isShowTypeModal: false
    }
  }

  render() {
    const { infoType, isShowTypeModal } = this.state

    return (
      <div className="wp100 hp100 pr bsb pt50 fs0 bg-f0f0f0 oh">
        <Header
          right={
            <Icon className="vat" type="search" color="#1a1a1a" size="sm" />
          }
        >
          资讯信息
        </Header>
        <div className="wp100 hp100 oh bsb pt40 pr">
          <div className={`${style.nav} palt wp100 bg-fff bsb`}>
            <Flex>
              {this._navs.map(itm => (
                <Flex.Item
                  key={itm.value}
                  className={itm.value === infoType ? 'active' : ''}
                  onClick={() => this.getInfoByType(itm)}
                >
                  {itm.label}
                </Flex.Item>
              ))}
            </Flex>
            <Icon
              onClick={() => this.setState({ isShowTypeModal: true })}
              className="part"
              type="down"
              size="md"
            />
          </div>
          <div className="wp100 hp100 oay sb bg-fff">
            <div className={`${style.banner} wp100`}>
              <img src={require('../../assets/images/test.png')} />
            </div>
            <div className={`${style.content} wp100`}>
              <div
                className="item wp100 bsb pr"
                onClick={() => this.props.history.push('/info-detail')}
              >
                <div className="wp100">
                  <h6 className="fw400 fs14 wp100 tes2">
                    全球首个无人机操作标准草案了解一下？
                  </h6>
                  <p className="tes wp100 fs12 mt5">2018-11-30 10:57:35</p>
                </div>
                <img
                  src={require('../../assets/images/test.png')}
                  className="part"
                />
              </div>
              <div className="item wp100 bsb pr">
                <div className="wp100">
                  <h6 className="fw400 fs14 wp100 tes2">
                    全球首个无人机操作标准草案了解一下全球首个无人机操作标准草案了解一下？
                  </h6>
                  <p className="tes wp100 fs12 mt5">
                    2018-11-30 10:57:352018-11-30 10:57:35
                  </p>
                </div>
                <img
                  src={require('../../assets/images/test.png')}
                  className="part"
                />
              </div>
              <div className="item wp100 bsb pr">
                <div className="wp100">
                  <h6 className="fw400 fs14 wp100 tes2">
                    全球首个无人机操作标准草案了解一下？
                  </h6>
                  <p className="tes wp100 fs12 mt5">2018-11-30 10:57:35</p>
                </div>
                <img
                  src={require('../../assets/images/test.png')}
                  className="part"
                />
              </div>
              <div className="item wp100 bsb pr">
                <div className="wp100">
                  <h6 className="fw400 fs14 wp100 tes2">
                    全球首个无人机操作标准草案了解一下？
                  </h6>
                  <p className="tes wp100 fs12 mt5">2018-11-30 10:57:35</p>
                </div>
                <img
                  src={require('../../assets/images/test.png')}
                  className="part"
                />
              </div>
              <div className="item wp100 bsb pr">
                <div className="wp100">
                  <h6 className="fw400 fs14 wp100 tes2">
                    全球首个无人机操作标准草案了解一下？
                  </h6>
                  <p className="tes wp100 fs12 mt5">2018-11-30 10:57:35</p>
                </div>
                <img
                  src={require('../../assets/images/test.png')}
                  className="part"
                />
              </div>
              <div className="item wp100 bsb pr">
                <div className="wp100">
                  <h6 className="fw400 fs14 wp100 tes2">
                    全球首个无人机操作标准草案了解一下？
                  </h6>
                  <p className="tes wp100 fs12 mt5">2018-11-30 10:57:35</p>
                </div>
                <img
                  src={require('../../assets/images/test.png')}
                  className="part"
                />
              </div>
            </div>
          </div>
          <div
            onClick={() => this.setState({ isShowTypeModal: false })}
            className={`${isShowTypeModal ? 'active' : ''} ${
              style.infoTypeModal
            } wp100 palt hp100`}
          >
            <div
              onClick={event => event.stopPropagation()}
              className="content wp100 bg-fff bsb pr"
            >
              <div className="info-types wp100 oay sb">
                <Grid
                  data={infoTypes}
                  columnNum={5}
                  square={false}
                  hasLine={false}
                  activeStyle={false}
                  onClick={itm => this.getInfoByType(itm)}
                  renderItem={itm => (
                    <div className="item wp100">
                      <img src={itm.icon} title={itm.label} />
                      <span className="db wp100 tes bsb mt10">{itm.label}</span>
                    </div>
                  )}
                />
              </div>
              <div className="retract palb wp100 bsb plr15 tar oh">
                <span onClick={() => this.setState({ isShowTypeModal: false })}>
                  收起
                  <Icon type="up" size="md" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

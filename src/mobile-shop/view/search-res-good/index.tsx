import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { SearchBar, Flex, Icon, Popover } from 'antd-mobile'

import { EllipsisPopover } from '../../component/popover'
import { Header } from '../../component/header'
const style = require('./style')

enum S_RES_GOOD {
  MULTIPLE = 'multiple', // 综合
  PRICE = 'price', // 价格
  SALES = 'Sales' // 销量
}
enum E_SORT_TYPE {
  UP = 'up',
  DOWN = 'down'
}

type TScreenType = { label: string; value: S_RES_GOOD }

const screenTypes: TScreenType[] = [
  { label: '综合', value: S_RES_GOOD.MULTIPLE },
  { label: '价格', value: S_RES_GOOD.PRICE },
  { label: '销量', value: S_RES_GOOD.SALES }
]
interface IPropsSearchResultGood extends RouteComponentProps {}

interface IStateSearchResultGood {
  screenType: S_RES_GOOD
  sort: E_SORT_TYPE
}
export default class SearchResultGood extends React.PureComponent<
  IPropsSearchResultGood,
  IStateSearchResultGood
> {
  private onSwitchScreenType(event: any, { value }: TScreenType) {
    const { screenType } = this.state
    let sort = this.state.sort

    // 筛选
    if (value === screenType) {
      if (value === S_RES_GOOD.MULTIPLE) {
        return
      }
    } else {
      if (value !== S_RES_GOOD.MULTIPLE) {
        sort = E_SORT_TYPE.DOWN
      }
    }

    // 重置状态
    this.setState({
      screenType: value,
      sort: sort === E_SORT_TYPE.UP ? E_SORT_TYPE.DOWN : E_SORT_TYPE.UP
    })

    // Todo 请求接口
    setTimeout(() => console.log('结束', this.state))
  }

  constructor(props: IPropsSearchResultGood) {
    super(props)

    this.state = {
      screenType: S_RES_GOOD.MULTIPLE,
      sort: E_SORT_TYPE.DOWN
    }
  }

  render() {
    return (
      <div className={`${style.searchResGood} wp100 hp100 pr pt50 bsb oh fs0`}>
        <Header
          right={
            <EllipsisPopover
              items={[
                {
                  title: '首页',
                  icon: require('../../assets/images/search-res-icon1.png')
                },
                {
                  title: '产品超市',
                  icon: require('../../assets/images/search-res-icon2.png')
                },
                {
                  title: '订购单',
                  icon: require('../../assets/images/search-res-icon3.png')
                },
                {
                  title: '我的',
                  icon: require('../../assets/images/search-res-icon4.png')
                }
              ]}
              onSelect={() => {}}
            />
          }
        >
          <SearchBar
            placeholder="搜索"
            // onSubmit={kwd => this.onSearchByKwds(kwd)}
            // value={this.state.kwd}
            // onChange={kwd => this.setState({ kwd })}
          />
        </Header>
        <div className={`${style.content} wp100 pt50 hp100 pr bsb`}>
          <div className={`${style.header} palt wp100 bsb bb1`}>
            <Flex>
              {screenTypes.map(type => (
                <Flex.Item
                  onClick={(event: any) => this.onSwitchScreenType(event, type)}
                  className={`${
                    this.state.screenType === type.value
                      ? `active act-${this.state.sort}`
                      : ''
                  } fs14`}
                  key={type.value}
                >
                  {type.label}
                  {type.value !== S_RES_GOOD.MULTIPLE ? <b /> : null}
                </Flex.Item>
              ))}
            </Flex>
          </div>
          <div className="wp100 hp100 oay sb plr15 bsb bg-fff">
            <div className="wp100 bb1 pb15 bg-fff">
              <div className={`${style.item} wp100 bsb pr`}>
                <span
                  className="bsb img palt"
                  style={{
                    backgroundImage: `url(${require('../../assets/images/test.png')})`
                  }}
                />
                <div className="title wp100 tes fs12">
                  多通道模拟图像采集存储系统
                </div>
                <div className="desc wp100 tes fs12 pr pr50 bsb">
                  <span className="mr5">型号:</span>C515WF4
                </div>
                <div className="desc wp100 tes fs10 pr pr50 bsb price">
                  <span className="fs12">库存：</span>500个
                  <img
                    className="part"
                    src={require('../../assets/images/gwc-icon.png')}
                  />
                </div>
              </div>
              <div className={`${style.itemFooter} wp100`}>
                <span className="fl">
                  销售单价:<span className="ml5 fs-ff6600">￥50.00</span>
                </span>
                <Popover
                  // visible={item.isUp}
                  mask={true}
                  overlay={
                    <Popover.Item className={style.popoverItem}>
                      1~999:<span className="ml5 fs-ff6600">￥5.05</span>
                    </Popover.Item>}
                  placement="bottom"
                  // onVisibleChange={status => item.isUp = status}
                >
                  <span className="fr">
                    1~999:<span className="ml5 fs-ff6600">￥5.05</span>
                    <Icon
                      // className={item.isUp ? 'up' : ''}
                      type="down"
                      size="md"
                    />
                  </span>
                </Popover>
              </div>
            </div>
            <div className="wp100 bb1 pb15 bg-fff">
              <div className={`${style.item} wp100 bsb pr`}>
                <span
                  className="bsb img palt"
                  style={{
                    backgroundImage: `url(${require('../../assets/images/test.png')})`
                  }}
                />
                <div className="title wp100 tes fs12">
                  多通道模拟图像采集存储系统
                </div>
                <div className="desc wp100 tes fs12 pr pr50 bsb">
                  <span className="mr5">型号:</span>C515WF4
                </div>
                <div className="desc wp100 tes fs10 pr pr50 bsb price">
                  <span className="fs12">库存：</span>500个
                  <img
                    className="part"
                    src={require('../../assets/images/gwc-icon.png')}
                  />
                </div>
              </div>
              <div className={`${style.itemFooter} wp100`}>
                <span className="fl">
                  销售单价:<span className="ml5 fs-ff6600">￥50.00</span>
                </span>
                <Popover
                  // visible={item.isUp}
                  mask={true}
                  overlay={
                    <Popover.Item>
                      1~999:<span className="ml5 fs-ff6600">￥5.05</span>
                    </Popover.Item>
                  }
                  placement="bottom"
                  // onVisibleChange={status => item.isUp = status}
                >
                  <span className="fr">
                    1~999:<span className="ml5 fs-ff6600">￥5.05</span>
                    <Icon
                      // className={item.isUp ? 'up' : ''}
                      type="down"
                      size="md"
                    />
                  </span>
                </Popover>
              </div>
            </div>
            <div className="wp100 bb1 pb15 bg-fff">
              <div className={`${style.item} wp100 bsb pr`}>
                <span
                  className="bsb img palt"
                  style={{
                    backgroundImage: `url(${require('../../assets/images/test.png')})`
                  }}
                />
                <div className="title wp100 tes fs12">
                  多通道模拟图像采集存储系统
                </div>
                <div className="desc wp100 tes fs12 pr pr50 bsb">
                  <span className="mr5">型号:</span>C515WF4
                </div>
                <div className="desc wp100 tes fs10 pr pr50 bsb price">
                  <span className="fs12">库存：</span>500个
                  <img
                    className="part"
                    src={require('../../assets/images/gwc-icon.png')}
                  />
                </div>
              </div>
              <div className={`${style.itemFooter} wp100`}>
                <span className="fl">
                  销售单价:<span className="ml5 fs-ff6600">￥50.00</span>
                </span>
                <Popover
                  // visible={item.isUp}
                  mask={true}
                  overlay={
                    <Popover.Item>
                      1~999:<span className="ml5 fs-ff6600">￥5.05</span>
                    </Popover.Item>
                  }
                  placement="bottom"
                  // onVisibleChange={status => item.isUp = status}
                >
                  <span className="fr">
                    1~999:<span className="ml5 fs-ff6600">￥5.05</span>
                    <Icon
                      // className={item.isUp ? 'up' : ''}
                      type="down"
                      size="md"
                    />
                  </span>
                </Popover>
              </div>
            </div>
            <div className="wp100 bb1 pb15 bg-fff">
              <div className={`${style.item} wp100 bsb pr`}>
                <span
                  className="bsb img palt"
                  style={{
                    backgroundImage: `url(${require('../../assets/images/test.png')})`
                  }}
                />
                <div className="title wp100 tes fs12">
                  多通道模拟图像采集存储系统
                </div>
                <div className="desc wp100 tes fs12 pr pr50 bsb">
                  <span className="mr5">型号:</span>C515WF4
                </div>
                <div className="desc wp100 tes fs10 pr pr50 bsb price">
                  <span className="fs12">库存：</span>500个
                  <img
                    className="part"
                    src={require('../../assets/images/gwc-icon.png')}
                  />
                </div>
              </div>
              <div className={`${style.itemFooter} wp100`}>
                <span className="fl">
                  销售单价:<span className="ml5 fs-ff6600">￥50.00</span>
                </span>
                <Popover
                  // visible={item.isUp}
                  mask={true}
                  overlay={
                    <Popover.Item>
                      1~999:<span className="ml5 fs-ff6600">￥5.05</span>
                    </Popover.Item>
                  }
                  placement="bottom"
                  // onVisibleChange={status => item.isUp = status}
                >
                  <span className="fr">
                    1~999:<span className="ml5 fs-ff6600">￥5.05</span>
                    <Icon
                      // className={item.isUp ? 'up' : ''}
                      type="down"
                      size="md"
                    />
                  </span>
                </Popover>
              </div>
            </div>
          </div>
          <div className="wp100 bb1 pb15 bg-fff">
            <div className={`${style.item} wp100 bsb pr`}>
              <span
                className="bsb img palt"
                style={{
                  backgroundImage: `url(${require('../../assets/images/test.png')})`
                }}
              />
              <div className="title wp100 tes fs12">
                多通道模拟图像采集存储系统
              </div>
              <div className="desc wp100 tes fs12 pr pr50 bsb">
                <span className="mr5">型号:</span>C515WF4
              </div>
              <div className="desc wp100 tes fs10 pr pr50 bsb price">
                <span className="fs12">库存：</span>500个
                <img
                  className="part"
                  src={require('../../assets/images/gwc-icon.png')}
                />
              </div>
            </div>
            <div className={`${style.itemFooter} wp100`}>
              <span className="fl">
                销售单价:<span className="ml5 fs-ff6600">￥50.00</span>
              </span>
              <Popover
                // visible={item.isUp}
                mask={true}
                overlay={
                  <Popover.Item>
                    1~999:<span className="ml5 fs-ff6600">￥5.05</span>
                  </Popover.Item>
                }
                placement="bottom"
                // onVisibleChange={status => item.isUp = status}
              >
                <span className="fr">
                  1~999:<span className="ml5 fs-ff6600">￥5.05</span>
                  <Icon
                    // className={item.isUp ? 'up' : ''}
                    type="down"
                    size="md"
                  />
                </span>
              </Popover>
            </div>
          </div>
        </div>
        <div className="wp100 bb1 pb15 bg-fff">
          <div className={`${style.item} wp100 bsb pr`}>
            <span
              className="bsb img palt"
              style={{
                backgroundImage: `url(${require('../../assets/images/test.png')})`
              }}
            />
            <div className="title wp100 tes fs12">
              多通道模拟图像采集存储系统
            </div>
            <div className="desc wp100 tes fs12 pr pr50 bsb">
              <span className="mr5">型号:</span>C515WF4
            </div>
            <div className="desc wp100 tes fs10 pr pr50 bsb price">
              <span className="fs12">库存：</span>500个
              <img
                className="part"
                src={require('../../assets/images/gwc-icon.png')}
              />
            </div>
          </div>
          <div className={`${style.itemFooter} wp100`}>
            <span className="fl">
              销售单价:<span className="ml5 fs-ff6600">￥50.00</span>
            </span>
            <Popover
              // visible={item.isUp}
              mask={true}
              overlay={
                <Popover.Item>
                  1~999:<span className="ml5 fs-ff6600">￥5.05</span>
                </Popover.Item>
              }
              placement="bottom"
              // onVisibleChange={status => item.isUp = status}
            >
              <span className="fr">
                1~999:<span className="ml5 fs-ff6600">￥5.05</span>
                <Icon
                  // className={item.isUp ? 'up' : ''}
                  type="down"
                  size="md"
                />
              </span>
            </Popover>
          </div>
        </div>
        <div className="wp100 bb1 bg-fff pb15">
          <div className={`${style.item} wp100 bsb pr`}>
            <span
              className="bsb img palt"
              style={{
                backgroundImage: `url(${require('../../assets/images/test.png')})`
              }}
            />
            <div className="title wp100 tes fs12">
              多通道模拟图像采集存储系统
            </div>
            <div className="desc wp100 tes fs12 pr pr50 bsb">
              <span className="mr5">型号:</span>C515WF4
            </div>
            <div className="desc wp100 tes fs10 pr pr50 bsb price">
              <span className="fs12">库存：</span>500个
              <img
                className="part"
                src={require('../../assets/images/gwc-icon.png')}
              />
            </div>
          </div>
          <div className={`${style.itemFooter} wp100`}>
            <span className="fl">
              销售单价:<span className="ml5 fs-ff6600">￥50.00</span>
            </span>
            <Popover
              // visible={item.isUp}
              mask={true}
              overlay={
                <Popover.Item>
                  1~999:<span className="ml5 fs-ff6600">￥5.05</span>
                </Popover.Item>
              }
              placement="bottom"
              // onVisibleChange={status => item.isUp = status}
            >
              <span className="fr">
                1~999:<span className="ml5 fs-ff6600">￥5.05</span>
                <Icon
                  // className={item.isUp ? 'up' : ''}
                  type="down"
                  size="md"
                />
              </span>
            </Popover>
          </div>
        </div>
      </div>
    )
  }
}

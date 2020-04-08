import * as React from 'react'
import {} from 'react-router-dom'
import { Tabs, Icon } from 'antd-mobile'

import { EllipsisPopover } from '../../component/popover'
import CbModal from '../../component/modal'
import { Header } from '../../component/header'
const style = require('./style')

interface IPropsMyOrder {}

interface IStateMyOrder {}

const configTabs = [
  { title: '全部' },
  { title: '待付款' },
  { title: '待发货' },
  { title: '待收货' }
]

export default class MyOrder extends React.PureComponent<
  IPropsMyOrder,
  IStateMyOrder
> {
  private onChangeTab(item: any) {
    console.log(item)
  }

  constructor(props: IPropsMyOrder) {
    super(props)

    this.onChangeTab = this.onChangeTab.bind(this)

    CbModal.alert('提示', '是否确认取消该订单', [
      { text: '取消' },
      {
        text: '确认',
        onPress() {
          console.log('确认')
        }
      }
    ])
  }

  render() {
    return (
      <div className={`${style.myOrder} wp100 hp100 fs0 pt50 bsb pr oh`}>
        <Header
          right={
            <EllipsisPopover
              onSelect={() => {}}
              items={[
                { title: '产品' },
                { title: '发现' },
                { title: '购物车' },
                { title: '我的' }
              ]}
            />
          }
        >
          我的订单
        </Header>
        <div className="wp100 hp100 bsb pt50 pb5 pr">
          {/* 左右遮罩 */}
          <em className="model-l-r palt zi400 bg-fff" />
          <em className="model-l-r part zi400 bg-fff" />
          <Tabs
            tabs={configTabs}
            onChange={this.onChangeTab}
            renderTabBar={props => <Tabs.DefaultTabBar {...props} page={4} />}
          >
            <div className="wp100 hp100 oay sb bsb plr10">
              <div className={`${style.item} wp100 mt5`}>
                <h6 className="fs12 fw400 wp100 bsb plr10">
                  <span className="fl">
                    订单号: 20190424121369
                    <Icon type="right" size="md" />
                  </span>
                  <span className="fr">待收货</span>
                </h6>
                <div className="bg-fff wp100 pl10 pr10 pt10 bsb">
                  <div className="item wp100 pr bsb">
                    <span
                      className=" hp100 bsb img palt"
                      style={{
                        backgroundImage: `url(${require('../../assets/images/test.png')})`
                      }}
                    />
                    <div className="title wp100 tes fs12">
                      多通道模拟图像采集存储系统
                    </div>
                    <div className="desc wp100 tes fs12">型号: C515WF4</div>
                    <div className="desc wp100 tes fs12">数量: 300</div>
                  </div>
                  <div className="item wp100 pr bsb">
                    <span
                      className=" hp100 bsb img palt"
                      style={{
                        backgroundImage: `url(${require('../../assets/images/test.png')})`
                      }}
                    />
                    <div className="title wp100 tes fs12">
                      多通道模拟图像采集存储系统
                    </div>
                    <div className="desc wp100 tes fs12">型号: C515WF4</div>
                    <div className="desc wp100 tes fs12">数量: 300</div>
                  </div>
                  <div className="total wp100 mt10 tar fs12">
                    共1件商品 合计: ￥<span className="fs15">370.44</span>
                  </div>
                  <div className="btn wp100 pt15 pb10 bsb tar">
                    <span>立即付款</span>
                    <span className="cancel">取消订单</span>
                  </div>
                </div>
              </div>
              <div className={`${style.item} wp100 mt5`}>
                <h6 className="fs12 fw400 wp100 bsb plr10">
                  <span className="fl">
                    订单号: 20190424121369
                    <Icon type="right" size="md" />
                  </span>
                  <span className="fr">待收货</span>
                </h6>
                <div className="bg-fff wp100 pl10 pr10 pt10 bsb">
                  <div className="item wp100 pr bsb">
                    <span
                      className=" hp100 bsb img palt"
                      style={{
                        backgroundImage: `url(${require('../../assets/images/test.png')})`
                      }}
                    />
                    <div className="title wp100 tes fs12">
                      多通道模拟图像采集存储系统
                    </div>
                    <div className="desc wp100 tes fs12">型号: C515WF4</div>
                    <div className="desc wp100 tes fs12">数量: 300</div>
                  </div>
                  <div className="total wp100 mt10 tar fs12">
                    共1件商品 合计: ￥<span className="fs15">370.44</span>
                  </div>
                  <div className="btn wp100 pt15 pb10 bsb tar">
                    <span>提醒发货</span>
                    <span className="cancel">取消订单</span>
                  </div>
                </div>
              </div>
              <div className={`${style.item} wp100 mt5`}>
                <h6 className="fs12 fw400 wp100 bsb plr10">
                  <span className="fl">
                    订单号: 20190424121369
                    <Icon type="right" size="md" />
                  </span>
                  <span className="fr">待收货</span>
                </h6>
                <div className="bg-fff wp100 pl10 pr10 pt10 bsb">
                  <div className="item wp100 pr bsb">
                    <span
                      className=" hp100 bsb img palt"
                      style={{
                        backgroundImage: `url(${require('../../assets/images/test.png')})`
                      }}
                    />
                    <div className="title wp100 tes fs12">
                      多通道模拟图像采集存储系统
                    </div>
                    <div className="desc wp100 tes fs12">型号: C515WF4</div>
                    <div className="desc wp100 tes fs12">数量: 300</div>
                  </div>
                  <div className="total wp100 mt10 tar fs12">
                    共1件商品 合计: ￥<span className="fs15">370.44</span>
                  </div>
                  <div className="btn wp100 pt15 pb10 bsb tar">
                    <span className="cancel">取消订单</span>
                  </div>
                </div>
              </div>
            </div>
          </Tabs>
        </div>
      </div>
    )
  }
}

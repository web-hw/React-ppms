import * as React from 'react'
import {} from 'react-router-dom'
import { Grid, Radio } from 'antd-mobile'

import { EllipsisPopover } from '../../component/popover'
import { Header } from '../../component/header'
const style = require('./style')

interface IPropsGoodComment {}

interface IStateGoodComment {
  condition: E_CONDITON_TYPE
}

enum E_CONDITON_TYPE {
  ALL = 'all',
  GOOD = 'good',
  MIDDLE = 'middle',
  BAD = 'bad'
}

type TCondition = { label: string; value: E_CONDITON_TYPE }

const configConditions: TCondition[] = [
  { label: '全部', value: E_CONDITON_TYPE.ALL },
  { label: '好评', value: E_CONDITON_TYPE.GOOD },
  { label: '中评', value: E_CONDITON_TYPE.MIDDLE },
  { label: '差评', value: E_CONDITON_TYPE.BAD }
]

export default class GoodComment extends React.PureComponent<
  IPropsGoodComment,
  IStateGoodComment
> {
  private onChangeCondition(event: any, item: TCondition) {
    if (!event.target.checked) {
      return
    }

    this.setState({ condition: item.value })

    // Todo获取数据
  }

  constructor(props: IPropsGoodComment) {
    super(props)

    this.state = {
      condition: E_CONDITON_TYPE.ALL
    }

    this.onChangeCondition = this.onChangeCondition.bind(this)
  }

  render() {
    return (
      <div className={`${style.goodComment} wp100 hp100 fs0 pt50 bsb pr oh`}>
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
          商品评价
        </Header>
        <div className="wp100 hp100 pr bsb pt35">
          <div className={`${style.condition} wp100 palt`}>
            <Grid
              data={configConditions}
              columnNum={4}
              square={false}
              hasLine={false}
              activeStyle={false}
              renderItem={(item: TCondition) => (
                <Radio
                  className={style.radio}
                  checked={this.state.condition === item.value}
                  onChange={event => this.onChangeCondition(event, item)}
                >
                  {item.label}
                </Radio>
              )}
            />
          </div>
          <div className="wp100 hp100 oay sb bsb plr15">
            <div className={`${style.item} wp100`}>
              <h6 className="pt15 pb15 bsb fw400 pr fs12 tes">
                <em
                  className="palt"
                  style={{
                    backgroundImage: `url(${require('../../assets/images/test.png')})`
                  }}
                />
                啦啦啦
              </h6>
              <div className="fs12">
                2018-08-28<span className="ml20">购买数量: 500</span>
              </div>
              <p className="fs12 ptb5">
                电子产品评测网是以视频形式来进行电子产品测评的网站，提供独立客观第三方资讯；独立客观的深度视频科技媒体之一了。
              </p>
            </div>
            <div className={`${style.item} wp100`}>
              <h6 className="pt15 pb15 bsb fw400 pr fs12 tes">
                <em
                  className="palt"
                  style={{
                    backgroundImage: `url(${require('../../assets/images/test.png')})`
                  }}
                />
                啦啦啦
              </h6>
              <div className="fs12">
                2018-08-28<span className="ml20">购买数量: 500</span>
              </div>
              <p className="fs12 ptb5">
                电子产品评测网是以视频形式来进行电子产品测评的网站，提供独立客观第三方资讯；独立客观的深度视频科技媒体之一了。
              </p>
            </div>
            <div className={`${style.item} wp100`}>
              <h6 className="pt15 pb15 bsb fw400 pr fs12 tes">
                <em
                  className="palt"
                  style={{
                    backgroundImage: `url(${require('../../assets/images/test.png')})`
                  }}
                />
                啦啦啦
              </h6>
              <div className="fs12">
                2018-08-28<span className="ml20">购买数量: 500</span>
              </div>
              <p className="fs12 ptb5">
                电子产品评测网是以视频形式来进行电子产品测评的网站，提供独立客观第三方资讯；独立客观的深度视频科技媒体之一了。
              </p>
            </div>
            <div className={`${style.item} wp100`}>
              <h6 className="pt15 pb15 bsb fw400 pr fs12 tes">
                <em
                  className="palt"
                  style={{
                    backgroundImage: `url(${require('../../assets/images/test.png')})`
                  }}
                />
                啦啦啦
              </h6>
              <div className="fs12">
                2018-08-28<span className="ml20">购买数量: 500</span>
              </div>
              <p className="fs12 ptb5">
                电子产品评测网是以视频形式来进行电子产品测评的网站，提供独立客观第三方资讯；独立客观的深度视频科技媒体之一了。
              </p>
            </div>
            <div className={`${style.item} wp100`}>
              <h6 className="pt15 pb15 bsb fw400 pr fs12 tes">
                <em
                  className="palt"
                  style={{
                    backgroundImage: `url(${require('../../assets/images/test.png')})`
                  }}
                />
                啦啦啦
              </h6>
              <div className="fs12">
                2018-08-28<span className="ml20">购买数量: 500</span>
              </div>
              <p className="fs12 ptb5">
                电子产品评测网是以视频形式来进行电子产品测评的网站，提供独立客观第三方资讯；独立客观的深度视频科技媒体之一了。
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

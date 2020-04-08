import * as React from 'react'
import { Link } from 'react-router-dom'
import { Flex } from 'antd-mobile'

import { Header } from '../../component/header'
const style = require('./style')

interface IPropsPartakeBidingSuc {}

interface IStatePartakeBidingSuc {}

export default class PartakeBidingSuc extends React.PureComponent<
  IPropsPartakeBidingSuc,
  IStatePartakeBidingSuc
> {
  constructor(props: IPropsPartakeBidingSuc) {
    super(props)
  }

  render() {
    return (
      <div className="wp100 hp100 pr bsb pt50 fs0 bg-f0f0f0 oh">
        <Header>参与竞标</Header>
        <div className="wp100 hp100 oay sb">
          <div className={`${style.bidingSuc} wp100 bsb bg-fff`}>
            <div className="suc-info bsb pr ma">
              <em
                className="palt"
                style={{
                  backgroundImage: `url(${require('../../assets/images/biding-suc-icon.png')})`
                }}
              />
              <div className="wp100">
                <h6 className="fs20 fw400">提交竞标成功！</h6>
                <p className="fs12">
                  请耐心等待发布人与您对接，竞标保证金将于您竞标结果出来后三个工作日内退回您的个人账户。
                </p>
              </div>
            </div>
            <div className="suc-ope mt20 tac ma">
              <Link to="/task">返回大厅</Link>
              <Link to="/task-detail/tender-bid">查看投标详情</Link>
            </div>
          </div>
          <div className={`${style.notice} wp100 mt5`}>
            <div className="title wp100 bsb bg-fff">
              <div className="wp100 bsb fs15">我关注的</div>
            </div>
            <div className="content wp100">
              <div className="item wp100 bsb bg-fff mt5">
                <div className="item-title wp100 fs15 pr tes bsb">
                  【000019】系统维护与开发
                  <span className="fs12 part tes">已结束</span>
                </div>
                <Flex className="wp100">
                  <Flex.Item>
                    <div>
                      分类:<span className="ml5">生产</span>
                    </div>
                  </Flex.Item>
                  <Flex.Item>
                    <div>
                      领域:<span className="ml5">元器件元器件元器件元器件</span>
                    </div>
                  </Flex.Item>
                  <Flex.Item>
                    <div>
                      发布人:<span className="ml5">EEFDFD</span>
                    </div>
                  </Flex.Item>
                </Flex>
                <div className="item-footer wp100 fs13 pr tes bsb">
                  发布时间:<span className="ml5">2019-05-22</span>
                  <Link to="/task-detail/follow" className="fs12 part tac">
                    查看
                  </Link>
                </div>
              </div>
              <div className="item wp100 bsb bg-fff mt5">
                <div className="item-title wp100 fs15 pr tes bsb">
                  【000019】系统维护与开发
                  <span className="fs12 part tes">已结束</span>
                </div>
                <Flex className="wp100">
                  <Flex.Item>
                    <div>
                      分类:<span className="ml5">生产</span>
                    </div>
                  </Flex.Item>
                  <Flex.Item>
                    <div>
                      领域:<span className="ml5">元器件元器件元器件元器件</span>
                    </div>
                  </Flex.Item>
                  <Flex.Item>
                    <div>
                      发布人:<span className="ml5">EEFDFD</span>
                    </div>
                  </Flex.Item>
                </Flex>
                <div className="item-footer wp100 fs13 pr tes bsb">
                  发布时间:<span className="ml5">2019-05-22</span>
                  <a className="fs12 part tac" href="javascript:void(0)">
                    查看
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

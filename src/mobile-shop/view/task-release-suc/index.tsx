import * as React from 'react'
import { Link } from 'react-router-dom'
import { Flex } from 'antd-mobile'

import { Header } from '../../component/header'
const style = require('./style')

interface IPropsTaskReleaseSuc {}

interface IStateTaskReleaseSuc {}

// Todo 提取partake-biding-suc
export default class TaskReleaseSuc extends React.PureComponent<
  IPropsTaskReleaseSuc,
  IStateTaskReleaseSuc
> {
  render() {
    return (
      <div className="wp100 hp100 pr bsb pt50 fs0 bg-f0f0f0 oh">
        <Header>发布需求</Header>
        <div className="wp100 hp100 oay sb">
          <div className={`${style.releaseSuc} wp100 bsb bg-fff pt10 pb20`}>
            <div className="suc-info ma">
              <div
                className="info wp100 bsb"
                style={{
                  backgroundImage: `url(${require('../../assets/images/task-release-suc.png')})`
                }}
              >
                <div className="wp100 hp100 oh">
                  <h6 className="fs20 fw400 mt20">恭喜，需求发布成功！</h6>
                </div>
              </div>
              <div className="ope wp100 tac mt10">
                <Link to="/task-release">继续发布</Link>
                <Link to="/task-detail/end-docking">查看需求</Link>
              </div>
            </div>
          </div>
          <div className={`${style.notice} wp100 mt5`}>
            <div className="title wp100 bsb bg-fff">
              <div className="wp100 bsb fs15">我关注的</div>
            </div>
            <div className="content wp100">
              <div className="item wp100 bsb bg-fff mt5">
                <div className="item-title wp100 fs15 pr tes bsb">
                  【000019】系统维护与开发系统维护与开发系统维护与开发
                  <span className="fs12 part tes">
                    <span>999</span>天<span>12</span>小时后对接截止
                  </span>
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

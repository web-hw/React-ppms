import * as React from 'react'
import {} from 'react-router-dom'
import {} from 'antd'

import Wrapper from '../wrapper'
const style = require('./style')

interface IPropsNewestData {}

interface IStateNewestData {}

export default class NewestData extends React.PureComponent<
  IPropsNewestData,
  IStateNewestData
> {
  render() {
    return (
      <Wrapper
        Header={
          <div className="wrapper-header">
            <div className="fl">
              <em className="icon" />
              最新数据
            </div>
            <div className={`${style.colorInfo} fr`}>
              <span>
                <em />
                计划完成
              </span>
              <span>
                <em className="bg-1262B7" />
                实际完成
              </span>
            </div>
          </div>
        }
        Content={<div className="wp100 hp100 fs12">暂无数据</div>}
      />
    )
  }
}

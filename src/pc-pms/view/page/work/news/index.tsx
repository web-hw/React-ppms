import * as React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import {} from 'antd'

import Image from 'global@component/image'
import Wrapper from '../wrapper'
const style = require('./style')

interface IPropsNews extends RouteComponentProps {}

interface IStateNews {}

const Content = () => {
  return (
    <div className="wp100 hp100">
      <div className={`${style.new} wp100 pr bsb cp`}>
        <div className="palt hp100">
          <div className="time tac">
            <div className="fs18 fw700">14</div>
            <div className="fs12">2019/08</div>
          </div>
          <Image
            className="img hp100"
            url={require('../../../../assets/images/test1.png')}
          />
        </div>
        <div className="content wp100 hp100">
          <div className="fs14 wp100 tes fw700">
            习近平：要保护好中华民族的象征要保护好中华民族的象征要保护好中华民族的象征
          </div>
          <div className="fs12 wp100 tes">
            正在甘肃考察的习近平总书记20日上午来到嘉峪正在甘肃考察的习近平总书记20日上午来到嘉峪
          </div>
        </div>
      </div>
      <div className={`${style.new} wp100 pr bsb cp`}>
        <div className="palt hp100">
          <div className="time tac">
            <div className="fs18 fw700">14</div>
            <div className="fs12">2019/08</div>
          </div>
          <Image
            className="img hp100"
            url={require('../../../../assets/images/test1.png')}
          />
        </div>
        <div className="content wp100 hp100">
          <div className="fs14 wp100 tes fw700">
            习近平：要保护好中华民族的象征要保护好中华民族的象征要保护好中华民族的象征
          </div>
          <div className="fs12 wp100 tes">
            正在甘肃考察的习近平总书记20日上午来到嘉峪正在甘肃考察的习近平总书记20日上午来到嘉峪
          </div>
        </div>
      </div>
      <div className={`${style.new} wp100 pr bsb cp`}>
        <div className="palt hp100">
          <div className="time tac">
            <div className="fs18 fw700">14</div>
            <div className="fs12">2019/08</div>
          </div>
          <Image
            className="img hp100"
            url={require('../../../../assets/images/test1.png')}
          />
        </div>
        <div className="content wp100 hp100">
          <div className="fs14 wp100 tes fw700">
            习近平：要保护好中华民族的象征要保护好中华民族的象征要保护好中华民族的象征
          </div>
          <div className="fs12 wp100 tes">
            正在甘肃考察的习近平总书记20日上午来到嘉峪正在甘肃考察的习近平总书记20日上午来到嘉峪
          </div>
        </div>
      </div>
      <div className={`${style.new} wp100 pr bsb cp`}>
        <div className="palt hp100">
          <div className="time tac">
            <div className="fs18 fw700">14</div>
            <div className="fs12">2019/08</div>
          </div>
          <Image
            className="img hp100"
            url={require('../../../../assets/images/test1.png')}
          />
        </div>
        <div className="content wp100 hp100">
          <div className="fs14 wp100 tes fw700">
            习近平：要保护好中华民族的象征要保护好中华民族的象征要保护好中华民族的象征
          </div>
          <div className="fs12 wp100 tes">
            正在甘肃考察的习近平总书记20日上午来到嘉峪正在甘肃考察的习近平总书记20日上午来到嘉峪
          </div>
        </div>
      </div>
    </div>
  )
}

export default withRouter(
  class extends React.PureComponent<IPropsNews, IStateNews> {
    render() {
      return (
        <Wrapper
          title="最新新闻"
          // moreLink={moreLink}
          Content={<Content />}
        />
      )
    }
  }
)

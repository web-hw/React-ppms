import * as React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import {} from 'antd'

import Wrapper from '../wrapper'
const style = require('./style')

interface IPropsNoticeInfo extends RouteComponentProps {
  title?: string
  titleIcon?: string
  moreLink?: string
  Content?: React.ReactNode
}

interface IStateNoticeInfo {}

const Content = () => {
  return (
    <div className={`${style.noticeInfoItem} pr cp`}>
      <div className="notice-info-icon palt">
        <em />
      </div>
      <div className="wp100 hp100">
        <div className="info-name tes pr">
          系统消息系统消息系统消息系统消息系统消息
          <span className="time part">2019-05-09 12:55:03</span>
        </div>
        <div className="info-content tes">
          test的成品检验/检验结果反馈/检验结果反馈检验结果反馈检验结果反馈
        </div>
      </div>
    </div>
  )
}

export default withRouter(
  class extends React.PureComponent<IPropsNoticeInfo, IStateNoticeInfo> {
    render() {
      const { title, titleIcon, moreLink } = this.props

      return (
        <Wrapper
          title={title}
          titleIcon={titleIcon}
          moreLink={moreLink}
          Content={<Content />}
        />
      )
    }
  }
)

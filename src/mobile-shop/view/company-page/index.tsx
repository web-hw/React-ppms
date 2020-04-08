import * as React from 'react'
import { observer, inject } from 'mobx-react'
import { RouteComponentProps } from 'react-router-dom'
import {} from 'antd-mobile'

import User from '../../store/user'
import { Header } from '../../component/header'
import Image from '../../component/image'
import Loading from '../../component/loading'
import Video from '../../view/chat/video'
const style = require('./style')

interface IPropsCompanyPage extends RouteComponentProps {
  user: User
}

interface IStateCompanyPage {
  loading: boolean
  detail: {
    video_url?: string
    logo?: string
    company_name?: string
    linkman?: string
    linkphone?: string
    link_tel?: string
    link_email?: string
    web_site?: string
    address?: string
    description?: string
  }
}

@inject('user')
@observer
export default class CompanyPage extends React.Component<
  IPropsCompanyPage,
  IStateCompanyPage
> {
  private async getDetail() {
    this.setState({ loading: true })
    const param: any = this.props.match.params
    const result = await this.props.user.getCompanyDetail({ id: param.id })
    const data = result.data || {}
    const company = data.company || {}

    // 处理详情
    let description = company.description || ''
    const html = document.getElementsByTagName('html')[0]
    let dpr = +html.getAttribute('data-dpr')
    isNaN(dpr) && (dpr = 1)
    description = description.replace(
      /\d+px/gi,
      (match: string, index: number, msg: string) => {
        const px = parseFloat(match)
        if (!isNaN(px)) {
          return `${px * dpr}px`
        }

        return match
      }
    )
    company.description = description
    this.setState({ loading: false, detail: company })
  }

  constructor(props: IPropsCompanyPage) {
    super(props)

    this.state = {
      loading: false,
      detail: {}
    }
  }

  componentDidMount() {
    this.getDetail()
  }

  render() {
    const { loading, detail } = this.state

    return (
      <Loading
        spinning={loading}
        className={`${style.companyPage} bg-fff wp100 hp100 bsb pt50 fs0 oh`}
      >
        <Header>企业主页</Header>
        <div className="wp100 hp100 oay sb">
          {detail.video_url && (
            <Video
              className="video"
              data={{ url: detail.video_url }}
              controls={['play-large', 'play', 'progress', 'current-time']}
            />
          )}
          <div className="company-msg wp100 bsb">
            <Image
              className="img"
              fit="auto"
              url={detail.logo ? `http://${detail.logo}` : ''}
            />
            <div className="wp100 hp100 ptb10 bsb">
              <div className="name wp100 tes fs14 fw700">
                {detail.company_name}
              </div>
              <div className="other wp100 tes fs12">
                <span>联系人:</span>
                {`${detail.linkman || ''} ${detail.linkphone || ''}`}
              </div>
              <div className="other wp100 tes fs12">
                {/* <span>固定电话:</span> */}
                <span>公司电话:</span>
                {detail.link_tel}
              </div>
              {/* <div className="other wp100 tes fs12">
                <span>email:</span>
                {detail.link_email}
              </div>
              <div className="other wp100 tes fs12">
                <span>官网:</span>
                {detail.web_site}
              </div> */}
              <div className="address wp100 tes2 fs12">
                <span>公司地址:</span>
                {detail.address}
              </div>
            </div>
          </div>
          <div
            className="company-detail wp100 bsb"
            dangerouslySetInnerHTML={{ __html: detail.description || '' }}
          />
        </div>
      </Loading>
    )
  }
}

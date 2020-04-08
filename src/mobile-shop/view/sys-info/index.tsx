import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { Link, RouteComponentProps } from 'react-router-dom'
import { Icon } from 'antd-mobile'
import moment from 'moment'

import { toast } from 'global@util/toast/mobile'
import { StateUnmount } from 'global@component/state-unmount'
import { defHead, defGroupHead } from '../../constant'
import Loading from '../../component/loading'
import Contact from '../../store/contact'
import { Header } from '../../component/header'
import Image from '../../component/image'
const style = require('./style')

interface IPropsSysInfo extends RouteComponentProps {
  contact: Contact
}

interface IStateSysInfo {
  loading: boolean
}

@inject('contact')
@observer
@StateUnmount
export default class SysInfo extends React.Component<
  IPropsSysInfo,
  IStateSysInfo
> {
  private async init() {
    const param: any = this.props.match.params
    if (!param.id) {
      return
    }

    this.setState({ loading: true })
    await this.props.contact.getVerifyById(param.id)
    this.setState({ loading: false })
  }

  private async onAgreeOrReject(msg: any, type: 0 | 1) {
    this.setState({ loading: true })
    const result: any =
      (await this.props.contact.agreeOrRejectVerify(
        msg.remind_type,
        msg.id,
        type
      )) || {}
    const data = result.data || {}
    if (data.code === 200) {
      await this.props.contact.getVerifyById(msg.id)

      if (type === 1) {
        const msg = this.props.contact.getVerify(this.props.contact.verify)
        this.props.history.replace(
          msg.remind_type === 1
            ? `/group-set/${msg.toId}/${msg.chatId}`
            : `/msg-info-detail/${msg.toId}`
        )
      } else {
        Header.goBack()
      }
    }
    this.setState({ loading: false })
  }

  constructor(props: IPropsSysInfo) {
    super(props)

    this.state = {
      loading: false
    }
  }

  componentDidMount() {
    this.init()
  }

  render() {
    const msg = this.props.contact.getVerify(this.props.contact.verify)
    const defHd = msg.remind_type === 1 ? defGroupHead : defHead

    return (
      <Loading
        spinning={this.state.loading}
        className="bsb pt50 fs0 bg-f0f0f0 oh"
      >
        <Header>系统通知</Header>
        <div className="wp100 hp100 bsb pt10">
          <div className="wp100 hp100 oay sb bg-fff">
            <Link
              className={`${style.infoTitle} wp100 bsb db pr bb1`}
              replace={true}
              to={
                msg.remind_type === 1
                  ? `/group-set/${msg.toId}/${msg.chatId}`
                  : `/msg-info-detail/${msg.toId}`
              }
            >
              <Image className="img palt" url={msg.head_img} defImg={defHd} />
              <div
                className={`${msg.position ? 'has-info' : ''} wp100 hp100 bsb`}
              >
                <h6 className="fs14 fw500 tes">{msg.name}</h6>
                {msg.position && (
                  <p className="fs12">
                    <span className="tes dib vat">{msg.position}</span>
                    {/* <span className="tes dib vat">总经理</span> */}
                  </p>
                )}
              </div>
              <Icon
                className="cb-icon part"
                type="right"
                size="lg"
                color="#999"
              />
            </Link>
            <div className={`${style.infoItem} wp100 bsb bb1 pr`}>
              <span className="fl tes">{msg.info}</span>
              <span className="tes part">
                {msg.created_at
                  ? moment(msg.created_at).format('MM月DD日 HH:mm')
                  : ''}
              </span>
            </div>
            {msg.remind_type === 2 && msg.message && (
              <div className={`${style.infoItem} wp100 pr bsb bb1`}>
                <span className="fl tes">附加信息:{msg.message}！</span>
              </div>
            )}
            {
              // msg.remind_type === 3 && (
              //   <div className={`${style.infoItem} wp100 pr bsb bb1`}>
              //     <span className="fl tes">来自群成员莫安娜的邀请</span>
              //   </div>
              // )
            }
            {/* 操作 ！退群 */}
            {msg.status === '0' && (
              <div
                className={`${style.infoAgreeOrRefuse} mt25 wp100 plr30 bsb`}
              >
                <span
                  className="refuse fl"
                  onClick={() => this.onAgreeOrReject(msg, 0)}
                >
                  拒绝
                </span>
                <span
                  className="agree fr"
                  onClick={() => this.onAgreeOrReject(msg, 1)}
                >
                  同意
                </span>
              </div>
            )}
          </div>
        </div>
      </Loading>
    )
  }
}

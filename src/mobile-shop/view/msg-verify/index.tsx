import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { Link } from 'react-router-dom'
import { SwipeAction } from 'antd-mobile'

import { toast } from 'global@util/toast/mobile'
import { defHead, defGroupHead } from '../../constant'
import Contact from '../../store/contact'
import Loading from '../../component/loading'
import Empty from '../../component/empty'
import { Header } from '../../component/header'
import Image from '../../component/image'
const style = require('./style')

interface IPropsMsgVerify {
  contact: Contact
}

interface IStateMsgVerify {
  loading: boolean
}

@inject('contact')
@observer
export default class MsgVerify extends React.Component<
  IPropsMsgVerify,
  IStateMsgVerify
> {
  private async onAgreeFriend(event: any, msg: any) {
    event.preventDefault()
    this.setState({ loading: true })
    const result: any =
      (await this.props.contact.agreeOrRejectVerify(
        msg.remind_type,
        msg.id,
        1
      )) || {}
    const data = result.data || {}
    if (data.code === 200) {
      await this.props.contact.getMsgVerifies()
    }
    this.setState({ loading: false })
  }

  private async init() {
    this.setState({ loading: true })
    await this.props.contact.getMsgVerifies()
    this.setState({ loading: false })
  }

  // 删除消息
  private async onDeleteMsg(id: string) {
    this.setState({ loading: true })
    await this.props.contact.deleteMsgVerify(id)
    this.setState({ loading: false })
  }

  constructor(props: IPropsMsgVerify) {
    super(props)

    this.state = {
      loading: false
    }

    this.onAgreeFriend = this.onAgreeFriend.bind(this)
  }

  componentDidMount() {
    this.init()
  }

  render() {
    const { loading } = this.state
    const { verifies = [] } = this.props.contact

    return (
      <Loading spinning={loading} className=" bsb pt50 fs0 bg-f0f0f0 oh">
        <Header>验证提醒</Header>
        <div className="wp100 hp100 bsb pt10">
          <div className={`${style.msgVerify} wp100 bg-fff hp100 oay sb`}>
            {verifies.length === 0 ? (
              <Empty />
            ) : (
              verifies.map((v: any) => {
                const msg = this.props.contact.getVerify(v)
                if (!msg.id) {
                  return null
                }
                const defHd = msg.remind_type === 1 ? defGroupHead : defHead

                return (
                  <SwipeAction
                    key={msg.id}
                    autoClose={true}
                    right={[
                      {
                        text: '删除',
                        className: 'del-btn',
                        onPress: () => this.onDeleteMsg(msg.id)
                      }
                    ]}
                  >
                    <Link
                      className={`${style.msgItem} db wp100 bsb pr bg-fff bb1`}
                      replace={true}
                      to={`/sys-info/${msg.id}`}
                    >
                      <Image
                        className="img br3 palt"
                        url={msg.head_img}
                        defImg={defHd}
                      />
                      <div className="wp100 hp100">
                        <h6 className="fs14 tes fw500">{msg.name}</h6>
                        <p className="fs12 tes">{msg.info}</p>
                      </div>
                      {msg.status === '0' ||
                      msg.status === '1' ||
                      msg.status === '2' ? (
                        <span
                          className={`${
                            msg.status === '0' ? 'active' : ''
                          } fs12 part`}
                          onClick={
                            msg.status !== '0'
                              ? null
                              : event => this.onAgreeFriend(event, msg)
                          }
                        >
                          {msg.status === '0'
                            ? '同意'
                            : msg.status === '1'
                            ? '已同意'
                            : msg.status === '2'
                            ? '已拒绝'
                            : ''}
                        </span>
                      ) : null}
                    </Link>
                  </SwipeAction>
                )
              })
            )}
          </div>
        </div>
      </Loading>
    )
  }
}

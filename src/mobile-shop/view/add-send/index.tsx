import * as React from 'react'
import { observer, inject } from 'mobx-react'
import { RouteComponentProps } from 'react-router-dom'
import { TextareaItem, Button } from 'antd-mobile'

import { toast } from 'global@util/toast/mobile'
import { defHead } from '../../constant'
import Loading from '../../component/loading'
import Image from '../../component/image'
import Contact from '../../store/contact'
import { Header } from '../../component/header'
const style = require('./style')

interface IPropsAddSend extends RouteComponentProps {
  contact: Contact
}

interface IStateAddSend {
  msg: string // 验证信息
  loading: boolean
  sending: boolean
}

@inject('contact')
@observer
export default class AddSend extends React.Component<
  IPropsAddSend,
  IStateAddSend
> {
  private async init() {
    const param: any = this.props.match.params
    if (!param.id) {
      return
    }
    this.setState({ loading: true })
    await this.props.contact.getUserById(param.id)
    this.setState({ loading: false })
  }

  private async onSendMsg() {
    const param: any = this.props.match.params
    if (!param.id) {
      return
    }

    this.setState({ sending: true })
    const result = await this.props.contact.applyOfFriend({
      join_account_id: param.id,
      message: this.state.msg || ''
    })
    if ((result.data || {}).code === 200) {
      toast.info('验证发送成功', 2, () =>
        this.props.history.replace('/add-friend')
      )
    }
    this.setState({ sending: false })
  }

  constructor(props: IPropsAddSend) {
    super(props)

    this.state = {
      msg: '',
      loading: false,
      sending: false
    }

    this.onSendMsg = this.onSendMsg.bind(this)
  }

  componentDidMount() {
    this.init()
  }

  render() {
    const { msg, loading, sending } = this.state
    const { realname, profession, head_img } = this.props.contact.user

    return (
      <Loading spinning={loading} className="bg-f0f0f0 bsb pt50 pr fs0">
        <Header>发送添加请求</Header>
        <div className="wp100 hp100 bsb pt5">
          <div className="wp100 hp100 sb oay bg-fff">
            {/* msg */}
            <div
              className={`${style.addSendMsg} wp100 bsb pt15 pb15 pr10 pr bb1`}
            >
              <Image url={head_img} defImg={defHead} className="img palt" />
              <div className="wp100 hp100 bsb ptb5">
                <h6 className={`fs14 fw400 tes ${!profession ? 'mt10' : ''}`}>
                  {realname}
                </h6>
                {profession && (
                  <p className="fs12">
                    <span className="dib vat tes">{profession}</span>
                    {/* <span className="dib vat tes">总经理</span> */}
                  </p>
                )}
              </div>
            </div>
            {/* content */}
            <div className={`${style.addSendContent} wp100 pl20 pr20 mt20 bsb`}>
              <h6 className="fw400 fs13">填写验证信息</h6>
              <TextareaItem
                value={msg}
                onChange={val => this.setState({ msg: val.trim() })}
                placeholder="请输入"
              />
              <Button
                loading={sending}
                disabled={sending}
                onClick={this.onSendMsg}
                className="mt20 fs12 db ma"
              >
                发送
              </Button>
            </div>
          </div>
        </div>
      </Loading>
    )
  }
}

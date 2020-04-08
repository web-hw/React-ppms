import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { RouteComponentProps } from 'react-router-dom'
import { Icon, Radio } from 'antd-mobile'

import { toast } from 'global@util/toast/mobile'
import User from '../../store/user'
import { defHead } from '../../constant'
import { Header } from '../../component/header'
import Image from '../../component/image'
import CbModal from '../../component/modal'
const style = require('./style')

interface IPropsChatPersonMsg extends RouteComponentProps {
  user: User
}

interface IStateChatPersonMsg {
  sex: '1' | '2'
  visibleSexModal: boolean
}

@inject('user')
@observer
export default class ChatPersonMsg extends React.Component<
  IPropsChatPersonMsg,
  IStateChatPersonMsg
> {
  // 群消息状态
  private sexs: any = {
    1: '男',
    2: '女'
  }

  private onJump(url: string) {
    url && this.props.history.replace(url)
  }

  private async onSureSex() {
    const { sex } = this.state
    if (!sex || sex === this.props.user.info.sex) {
      return
    }

    const result = await this.props.user.updateSex({ sex })
    const data = result.data || {}
    if (data.code === 200) {
      await this.props.user.isResetLogin()

      toast.info('性别修改成功')
    }
  }

  constructor(props: IPropsChatPersonMsg) {
    super(props)

    this.state = {
      visibleSexModal: false,
      sex: null
    }

    this.onSureSex = this.onSureSex.bind(this)
  }

  render() {
    const { visibleSexModal, sex } = this.state
    const {
      head_img,
      cb_nickname,
      company_name,
      department_name
    } = this.props.user.info
    const oldSex: any = this.props.user.info.sex

    return (
      <div className="wp100 hp100 fs0 pt50 bsb pr bg-fff oh">
        <Header>个人资料</Header>
        <div className={`${style.chatPersonMsg} wp100 hp100 oay sb`}>
          <div
            className="item wp100 bsb pr"
            onClick={() =>
              this.onJump(`/avatar/single/${this.props.user.info.id}`)
            }
          >
            <div className="label palt hp100 tes">头像</div>
            <div className="content wp100 hp100 tes">
              <Image className="img" url={head_img} defImg={defHead} />
            </div>
            <Icon className="part icon" type="right" size="md" />
          </div>
          <div
            className="item wp100 bsb pr"
            onClick={() => this.onJump('/update-nickname')}
          >
            <div className="label palt hp100 tes">昵称</div>
            <div className="content wp100 hp100 tes">{cb_nickname}</div>
            <Icon className="part icon" type="right" size="md" />
          </div>
          <div
            onClick={() =>
              this.setState({ sex: oldSex, visibleSexModal: true })
            }
            className="item wp100 bsb pr"
          >
            <div className="label palt hp100 tes">性别</div>
            <div className="content wp100 hp100 tes">
              {this.sexs[oldSex] || '未设置'}
            </div>
            <Icon className="part icon" type="right" size="md" />
          </div>
          <div className="item wp100 bsb pr">
            <div className="label palt hp100 tes">部门</div>
            <div className="content wp100 hp100 tes">
              {department_name || ''}
            </div>
          </div>
          <div className="item wp100 bsb pr">
            <div className="label palt hp100 tes">所属公司</div>
            <div className="content wp100 hp100 tes">{company_name || ''}</div>
          </div>
        </div>
        <CbModal
          title="性别"
          className={style.cbRadio}
          isShow={visibleSexModal}
          onClose={() => this.setState({ visibleSexModal: false })}
          onSure={this.onSureSex}
        >
          <div className="wp100 cb-radio">
            {Object.keys(this.sexs).map((k: any) => {
              const itm = this.sexs[k]

              return (
                <Radio.RadioItem
                  key={k}
                  checked={k === sex}
                  onClick={() => this.setState({ sex: k })}
                >
                  {itm}
                </Radio.RadioItem>
              )
            })}
          </div>
        </CbModal>
      </div>
    )
  }
}

import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { RouteComponentProps } from 'react-router-dom'
import { Icon, Modal } from 'antd-mobile'

import {
  getFilesByAccept,
  getFileByCapture,
  E_CAPTURE_TYPE,
  E_ACCEPT_TYPE
} from 'global@util/gallery-camera'
import { compressAndOrientationImage } from 'global@util/file'
import { toast } from 'global@util/toast/mobile'
import Contact from '../../store/contact'
import User from '../../store/user'
import { defGroupHead, defHead } from '../../constant'
import { Header } from '../../component/header'
import Image from '../../component/image'
import Loading from '../../component/loading'
const style = require('./style')

interface IPropsAvatar extends RouteComponentProps {
  contact: Contact
  user: User
}

interface IStateAvatar {
  isShowHeadModal: boolean
  loading: boolean
  id: string
  chatId: string
  type: 'group' | 'single'
}

@inject('contact', 'user')
@observer
export default class Avatar extends React.Component<
  IPropsAvatar,
  IStateAvatar
> {
  // 从相册中选取
  private onSelectAvatar() {
    getFilesByAccept(E_ACCEPT_TYPE.IMAGE, this.onChangeFile, false)
  }

  // 拍照
  private onPhotograph() {
    getFileByCapture(E_CAPTURE_TYPE.IMAGE, this.onChangeFile)
  }

  private async onChangeFile(err: Error, files: File[]) {
    if (err) {
      return toast.info(err.message)
    }

    const file = files[0]
    const formats: string[] = ['png', 'jpg', 'jpeg']
    const name = file.name.toLowerCase()
    const valid = formats.find((format: string) => {
      return new RegExp(`^.+\.${format}$`).test(name)
    })
    if (!valid) {
      return toast.info(`图片格式为${formats.join('、')}`)
    }

    // 上传图片
    const send = async (file: File) => {
      const { id, type, chatId } = this.state

      if (type !== 'group') {
        await this.props.user.editUser({ head_img: file })
      } else {
        // const result = await this.props.contact.editGroup({ id, head_img: file })
        const result = await this.props.contact.editGroup({
          chat_id: chatId,
          head_img: file
        })
        if ((result.data || {}).code === 200) {
          toast.info('头像设置成功')
          await this.props.contact.getGroupById(id, chatId)
        }
      }

      this.setState({ loading: false })
    }

    // 开始上传
    this.setState({ isShowHeadModal: false, loading: true })

    // 旋转 & 压缩图片
    compressAndOrientationImage(file, {}, (err: Error, f: File) =>
      send(err || !f ? file : f)
    )
  }

  private async init() {
    const { type, chatId } = this.state
    if (type === 'group') {
      this.setState({ loading: true })
      await this.props.contact.getGroupById(this.state.id, chatId)
      this.setState({ loading: false })
    }
  }

  constructor(props: IPropsAvatar) {
    super(props)

    const params: any = this.props.match.params

    this.state = {
      isShowHeadModal: false,
      loading: false,
      id: params.id,
      type: params.type,
      chatId: params.chatId || ''
    }

    this.onSelectAvatar = this.onSelectAvatar.bind(this)
    this.onPhotograph = this.onPhotograph.bind(this)
    this.onChangeFile = this.onChangeFile.bind(this)
  }

  componentDidMount() {
    this.init()
  }

  render() {
    const { isShowHeadModal, loading, type } = this.state

    return (
      <Loading spinning={loading} className={`${style.avatar} bsb pt50 fs0 oh`}>
        <Header
          right={
            <Icon
              size="md"
              type="ellipsis"
              onClick={() => this.setState({ isShowHeadModal: true })}
            />
          }
        >
          头像
        </Header>
        <div className="wp100 hp100 pr">
          {
            <Image
              className="avatar-img mc"
              url={
                type === 'group'
                  ? this.props.contact.groupDetail.head_img
                  : this.props.user.info.head_img
              }
              defImg={type === 'group' ? defGroupHead : defHead}
              fit="fixed"
            />
          }
        </div>
        <Modal
          popup={true}
          visible={isShowHeadModal}
          onClose={() => this.setState({ isShowHeadModal: false })}
          animationType="slide-up"
          className={style.selectAvatarModal}
        >
          <div className="select-head wp100 bsb pr15 pl15 pt5 pb5">
            <div
              onClick={this.onPhotograph}
              className="select-item tac bsb wp100 tes"
            >
              拍照上传
            </div>
            <div
              onClick={this.onSelectAvatar}
              className="select-item tac bsb wp100 tes"
            >
              从相册中选取
            </div>
          </div>
          <div
            onClick={() => this.setState({ isShowHeadModal: false })}
            className="select-cancel select-item mt5 tac bsb wp100"
          >
            取消
          </div>
        </Modal>
      </Loading>
    )
  }
}

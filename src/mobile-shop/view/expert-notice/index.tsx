import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Button, Switch } from 'antd-mobile'

import CbModal from '../../component/modal'
import { Header } from '../../component/header'
const style = require('./style')

interface IPropsExpertNotice extends RouteComponentProps {}

interface IStateExpertNotice {
  isShowModal: boolean // 设置展示modal
  isShow: boolean // 是否展示通知
}

export default class ExpertNotice extends React.PureComponent<
  IPropsExpertNotice,
  IStateExpertNotice
> {
  // 修改是否展示
  private onConfirmShow() {
    const { isShow } = this.state
    // Todo检查值是否改变，改变则下发接口
    console.log('请求', isShow)
  }

  // 设置默认项
  private onSetDefault() {
    // Todo 检查当前是否是默认项
    // 不是默认项则设置成默认项，Todo下发接口
    console.log('设置默认项')
  }

  constructor(props: IPropsExpertNotice) {
    super(props)

    this.state = {
      isShowModal: false,
      isShow: false
    }

    this.onConfirmShow = this.onConfirmShow.bind(this)
    this.onSetDefault = this.onSetDefault.bind(this)
  }

  render() {
    const { isShow, isShowModal } = this.state

    return (
      <div className={`${style.expertNotice} wp100 hp100 pr bsb fs0 bg-fff oh`}>
        <Header
          right={
            <span onClick={() => this.setState({ isShowModal: true })}>
              设置
            </span>}
        >
          通讯信息
        </Header>
        <div className="wp100 hp100 oay sb">
          {/* 最新 */}
          <div className="wp100 pt5 bsb bg-f0f0f0">
            <div className={`${style.noticeItems} wp100 bsb bg-fff pl10 pr10`}>
              <h6 className="wp100 bsb pb5">最新</h6>
              <div className="wp100 bsb pb15">
                <div
                  onClick={() => this.props.history.push('/expert-notice-edit')}
                  className={`${style.item} wp100 bsb`}
                >
                  <div className="title wp100 bsb">
                    <span onClick={this.onSetDefault}>设为默认</span>
                    2019-5-29 17:50:56
                  </div>
                  <div className="desc wp100 bsb tes">
                    下个月我有新的项目合作，大家可以联系下个月我有新的项目合作，大家可以联系
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* 历史 */}
          <div className="wp100 pt5 bsb bg-f0f0f0">
            <div className={`${style.noticeItems} wp100 bsb bg-fff pl10 pr10`}>
              <h6 className="wp100 bsb pb5">历史通知</h6>
              <div className="wp100 bsb pb15">
                <div className={`${style.item} wp100 bsb`}>
                  <div className="title wp100 bsb">
                    <span>设为默认</span>
                    2019-5-29 17:50:56
                  </div>
                  <div className="desc wp100 bsb tes">
                    下个月我有新的项目合作，大家可以联系
                  </div>
                </div>
                <div className={`${style.item} wp100 bsb`}>
                  <div className="title wp100 bsb">
                    <span>设为默认</span>
                    2019-5-29 17:50:56
                  </div>
                  <div className="desc wp100 bsb tes">
                    下个月我有新的项目合作，大家可以联系
                  </div>
                </div>
                <div className={`${style.item} wp100 bsb`}>
                  <div className="title wp100 bsb">
                    <span>设为默认</span>
                    2019-5-29 17:50:56
                  </div>
                  <div className="desc wp100 bsb tes">
                    下个月我有新的项目合作，大家可以联系
                  </div>
                </div>
                <div className={`${style.item} wp100 bsb`}>
                  <div className="title wp100 bsb">
                    <span>设为默认</span>
                    2019-5-29 17:50:56
                  </div>
                  <div className="desc wp100 bsb tes">
                    下个月我有新的项目合作，大家可以联系
                  </div>
                </div>
                <div className={`${style.item} wp100 bsb`}>
                  <div className="title wp100 bsb">
                    <span>设为默认</span>
                    2019-5-29 17:50:56
                  </div>
                  <div className="desc wp100 bsb tes">
                    下个月我有新的项目合作，大家可以联系
                  </div>
                </div>
                <div className={`${style.item} wp100 bsb`}>
                  <div className="title wp100 bsb">
                    <span>设为默认</span>
                    2019-5-29 17:50:56
                  </div>
                  <div className="desc wp100 bsb tes">
                    下个月我有新的项目合作，大家可以联系
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="cb-btn p10 bsb wp100">
          <Button
            onClick={() => this.props.history.push('/expert-notice-edit')}
          >
            +添加通知
          </Button>
        </div>
        <CbModal
          isShow={isShowModal}
          onClose={() => this.setState({ isShowModal: false })}
          onSure={this.onConfirmShow}
          className={style.showModal}
        >
          <div className="content wp100 tac mt20 mb10">
            展示我的通知
            <Switch
              checked={isShow}
              onChange={() => this.setState({ isShow: !isShow })}
            />
          </div>
        </CbModal>
      </div>
    )
  }
}

import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { InputItem, Grid, Button, Icon, Modal, Radio } from 'antd-mobile'

import { Header } from '../../component/header'
import CbModal from '../../component/modal'
const style = require('./style')

interface IPropsAuthExpert extends RouteComponentProps {}

interface IStateAuthExpert {
  trades: any[] // 行业
  trade: string // 行业
  isShowTradeModal: boolean
}

export default class AuthExpert extends React.PureComponent<
  IPropsAuthExpert,
  IStateAuthExpert
> {
  // 跳转
  private onJump(url: string) {
    this.props.history.push(
      `${url}/${encodeURIComponent(this.props.match.url)}`
    )
  }

  constructor(props: IPropsAuthExpert) {
    super(props)

    this.state = {
      trade: '',
      isShowTradeModal: false,
      trades: [
        { label: '电子产品', value: '电子产品' },
        { label: '鉴定检测', value: '鉴定检测' },
        { label: '知识产权', value: '知识产权' },
        { label: '组件部件', value: '组件部件' }
      ]
    }

    // 返回按钮提示
    CbModal.alert('提示', '当前页面内容还未提交，是否离开？', [
      { text: '取消' },
      {
        text: '离开',
        onPress() {
          console.log('啦啦')
        }
      }
    ])

    // Todo表单元素所有的都是必填项

    this.onJump = this.onJump.bind(this)
  }

  render() {
    return (
      <div className="wp100 hp100 pr bsb pt50 fs0 bg-fff oh">
        <Header>专家认证</Header>
        <div className={`${style.authExpert} wp100 hp100 oay sb`}>
          <div className="auth-info-expert wp100 bsb plr20 tac tes">
            您的专家认证未通过，原因:
            <span className="ml5">身份证照片过于模糊</span>
          </div>
          <div className="wp100 bsb ptb10">
            <div className="cb-input">
              <InputItem type="digit" placeholder="请输入您的手机号">
                联系电话
              </InputItem>
            </div>
            <div
              className="cb-input"
              onClick={() => this.onJump('/my-position-select')}
            >
              <InputItem
                placeholder="省市区县等"
                disabled={true}
                extra={<Icon type="right" size="md" />}
              >
                所在地
              </InputItem>
            </div>
            <div className="cb-input">
              <InputItem placeholder="街道、楼牌号等">详细地址</InputItem>
            </div>
            <div
              className="cb-input"
              onClick={() => this.setState({ isShowTradeModal: true })}
            >
              <InputItem
                placeholder="所属行业"
                disabled={true}
                value={this.state.trade}
                extra={<Icon type="right" size="md" />}
              >
                行业领域
              </InputItem>
            </div>
            <div className="cb-input">
              <InputItem placeholder="请输入您的职称">职称</InputItem>
            </div>
            <div className="cb-no-border-input cb-input">
              <InputItem placeholder="照片清晰更加容易通过哦~" disabled={true}>
                身份证照片
              </InputItem>
              <div className="select-file wp100 clearfix">
                <div
                  className="fl pr cp"
                  style={{
                    backgroundImage: `url(${require('../../assets/images/test.png')})`
                  }}
                >
                  <div className="mc wp100">
                    <img
                      src={require('../../assets/images/select-file-icon.png')}
                    />
                    请上传头像正面
                  </div>
                </div>
                <div className="fr cp pr">
                  <div className="mc wp100">
                    <img
                      src={require('../../assets/images/select-file-icon.png')}
                    />
                    请上传国徽面
                  </div>
                </div>
              </div>
            </div>
            <div className="auth-cb-input cb-no-border-input cb-input">
              <InputItem
                placeholder="请上传有行业资质认证的证书"
                disabled={true}
              >
                资质证书
              </InputItem>
              <Grid
                className="select-certificate"
                data={[
                  { url: require('../../assets/images/test.png') },
                  { url: null }
                ]}
                columnNum={3}
                square={true}
                hasLine={false}
                activeStyle={false}
                onClick={itm => console.log(itm)}
                renderItem={itm => (
                  <div
                    className="select-cert-itm wp100 hp100 pr cp"
                    style={{
                      backgroundImage: itm.url ? `url(${itm.url})` : 'none'
                    }}
                  >
                    {!itm.url && (
                      <div className="mc wp100">
                        <img
                          src={require('../../assets/images/select-file-icon.png')}
                        />
                      </div>
                    )}
                  </div>
                )}
              />
            </div>
            <div className="auth-btn cb-btn plr10 mt20">
              <Button>提交</Button>
            </div>
          </div>
        </div>
        <Modal
          title="请选择从事的行业领域"
          popup={true}
          visible={this.state.isShowTradeModal}
          onClose={() => this.setState({ isShowTradeModal: false })}
          animationType="slide-up"
          className={style.tradeModal}
        >
          <div className={`${style.tradeModalContent} wp100 sb oay cb-radio`}>
            {this.state.trades.map((trade: any) => (
              <Radio.RadioItem
                key={trade.value}
                checked={this.state.trade === trade.value}
                onClick={() => this.setState({ trade: trade.value })}
              >
                {trade.label}
              </Radio.RadioItem>
            ))}
          </div>
        </Modal>
      </div>
    )
  }
}

import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Flex, Icon } from 'antd-mobile'

import { Header } from '../../component/header'
import ValidPhone from './valid-phone'
import ResetPwd from './reset-pwd'
import ValidUsername from './valid-username'
import ValidPhoneManual from './valid-phone-manual'
const style = require('./style')

enum E_STEPS_TYPE {
  USERNAME = 'username',
  PHONE = 'phone'
}

enum E_STEPS_CONFIG {
  USERNAME = 'username',
  PHONE = 'phone',
  RESET_PWD = 'resetPwd'
}

const steps: any = {
  [E_STEPS_TYPE.PHONE]: [E_STEPS_CONFIG.PHONE, E_STEPS_CONFIG.RESET_PWD],
  [E_STEPS_TYPE.USERNAME]: [
    E_STEPS_CONFIG.USERNAME,
    E_STEPS_CONFIG.PHONE,
    E_STEPS_CONFIG.RESET_PWD
  ]
}

interface IPropsForgetPassword extends RouteComponentProps {}

interface IStateForgetPassword {
  step: E_STEPS_CONFIG
  type: E_STEPS_TYPE
}

export default class ForgetPassword extends React.PureComponent<
  IPropsForgetPassword,
  IStateForgetPassword
> {
  // 切换步骤
  private onNextStep() {
    const currSteps = steps[this.state.type]
    const idx = currSteps.findIndex(
      (step: E_STEPS_CONFIG) => step === this.state.step
    )
    this.setState({ step: currSteps[idx + 1] })
  }

  // init
  private init(params: any) {
    const type = steps[params.type] ? params.type : E_STEPS_TYPE.USERNAME
    console.log(type)
    this.setState({
      type,
      step: steps[type][0]
    })
  }

  constructor(props: IPropsForgetPassword) {
    super(props)

    this.state = {
      type: E_STEPS_TYPE.USERNAME,
      step: steps[E_STEPS_TYPE.USERNAME][0]
    }

    this.onNextStep = this.onNextStep.bind(this)
  }

  componentWillMount() {
    this.init(this.props.match.params)
  }

  componentWillReceiveProps(nextProps: IPropsForgetPassword) {
    const params: any = nextProps.match.params
    if (params.type !== this.state.type) {
      this.init(params)
    }
  }

  render() {
    const { step, type } = this.state

    return (
      <div className={`${style.forgetPassword} wp100 hp100 fs0 pt50 bsb pr oh`}>
        <Header>找回密码</Header>
        <div className="wp100 hp100 oay sb">
          {/* 通过用户名重置密码 */}
          {type === E_STEPS_TYPE.USERNAME && (
            <div className={`${style.resetByUsername} wp100`}>
              <Flex className="header fs14 tac bg-fff">
                <Flex.Item
                  className={step === E_STEPS_CONFIG.USERNAME && 'active'}
                >
                  确认账号
                </Flex.Item>
                <Icon type="right" size="md" color="#666" />
                <Flex.Item
                  className={`${step === E_STEPS_CONFIG.PHONE &&
                    'active'} flex-15`}
                >
                  验证绑定手机号码
                </Flex.Item>
                <Icon type="right" size="md" color="#666" />
                <Flex.Item
                  className={step === E_STEPS_CONFIG.RESET_PWD && 'active'}
                >
                  设置新密码
                </Flex.Item>
              </Flex>
              {step === E_STEPS_CONFIG.USERNAME && (
                <ValidUsername onNextStep={this.onNextStep} />
              )}
              {step === E_STEPS_CONFIG.PHONE && (
                <ValidPhone onNextStep={this.onNextStep} />
              )}
            </div>
          )}
          {/* 通过手机号重置密码 */}
          {type === E_STEPS_TYPE.PHONE && step === E_STEPS_CONFIG.PHONE && (
            <ValidPhoneManual onNextStep={this.onNextStep} />
          )}
          {step === E_STEPS_CONFIG.RESET_PWD && <ResetPwd />}
        </div>
      </div>
    )
  }
}

import * as React from 'react'
import { observer, inject } from 'mobx-react'
import { RouteComponentProps } from 'react-router-dom'
import { InputItem, Button, Modal, Radio } from 'antd-mobile'

import { toast } from 'global@util/toast/mobile'
import User from '../../store/user'
import CaptchaInfo from '../../component/captcha-info'
import InputPhone from '../../component/input-phone'
import InputCaptcha from '../../component/input-captcha'
import { Header } from '../../component/header'
import {
  validPhone,
  validCaptcha,
  validUsername,
  validLoginPwd
} from '../../validate'
const style = require('./style')

interface IPropsRegister extends RouteComponentProps {
  user: User
}

interface IStateRegister {
  username: string // 账号
  phone: string // 手机号
  captcha: string // 验证码
  password: string // 密码
  trade: string // 行业
  inviteCode: string // 邀请码
  isSelectAgree: boolean // 是否同意协议
  isSelectYsAgree: boolean
  trades: any[] // 行业
  isShowTradeModal: boolean // 是否显示行业 modal
  isShowAgreeModal: boolean // 是否显示协议
  isShowYsAgreeModal: boolean
  isShowInfo: boolean
  loading: boolean
}

@inject('user')
@observer
export default class Register extends React.Component<
  IPropsRegister,
  IStateRegister
> {
  // 修改state 值
  private onChange(name: string, value: any) {
    const state: any = { [name]: value }
    this.setState(state)
  }

  // info 跳转
  private onSureInfo() {
    this.onChange('isShowInfo', false)
    // 跳转登录
    Header.goBack()
  }

  // 获取验证码
  private async getCaptcha(done: (captcha?: string) => void) {
    const { phone } = this.state

    // 验证手机号
    if (!validPhone(phone)) {
      return
    }

    // 获取验证码
    const result = await this.props.user.getCaptcha({
      name: phone,
      status: 2
    })
    const data = result.data || {}
    if (data.code === 200) {
      done()
    }
  }

  // 注册
  private async onRegister() {
    const { username, phone, captcha, password } = this.state
    // 验证账号
    if (!validUsername(username)) {
      return
    }

    // 验证手机号
    if (!validPhone(phone)) {
      return
    }

    // 验证验证码
    if (!validCaptcha.captcha(captcha)) {
      return
    }

    // 验证密码
    if (!validLoginPwd(password)) {
      return
    }

    this.setState({ loading: true })
    const result = await this.props.user.onRegister({
      password,
      name: username,
      bind_phone: phone,
      code: captcha,
      status: 1
    })

    const data = result.data || {}
    if (data.code === 200) {
      this.onChange('isShowInfo', true)
    }
    this.setState({ loading: false })
  }

  constructor(props: IPropsRegister) {
    super(props)

    this.state = {
      username: '',
      phone: '',
      captcha: '',
      password: '',
      trade: '',
      inviteCode: '',
      isSelectAgree: false,
      isSelectYsAgree: false,
      isShowTradeModal: false,
      isShowAgreeModal: false,
      isShowYsAgreeModal: false,
      isShowInfo: false,
      loading: false,
      trades: [
        { label: '电子产品', value: '电子产品' },
        { label: '鉴定检测', value: '鉴定检测' },
        { label: '知识产权', value: '知识产权' },
        { label: '组件部件', value: '组件部件' }
      ]
    }

    this.onSureInfo = this.onSureInfo.bind(this)
    this.getCaptcha = this.getCaptcha.bind(this)
    this.onRegister = this.onRegister.bind(this)
  }

  render() {
    return (
      <div className={`${style.register} wp100 hp100 fs0 pt50 bsb pr oh`}>
        <Header>注册</Header>
        <div className="wp100 hp100 sb oay bsb plr15">
          <div className="cb-input mt10">
            <InputItem
              placeholder="请设置登录账号"
              onChange={value => this.onChange('username', value)}
              value={this.state.username}
            >
              账号
            </InputItem>
          </div>
          <InputPhone
            value={this.state.phone}
            onChange={value => this.onChange('phone', value)}
          />
          <InputCaptcha
            value={this.state.captcha}
            getCaptcha={this.getCaptcha}
            onChange={value => this.onChange('captcha', value)}
          />
          <div className="cb-input">
            <InputItem
              type="password"
              placeholder="请设置登录密码"
              onChange={value => this.onChange('password', value)}
              value={this.state.password}
            >
              密码
            </InputItem>
          </div>
          {/* <div
            className="cb-input"
            onClick={() => this.onChange('isShowTradeModal', true)}
          >
            <InputItem
              className="trade"
              placeholder="请选择从事的行业领域"
              disabled={true}
              value={this.state.trade}
              extra={
                <em
                  className="down-icon"
                  style={{
                    backgroundImage: `url(${require('../../assets/images/register-down-icon.png')})`
                  }}
                />
              }
            >
              行业
            </InputItem>
          </div>
          <div className="cb-input">
            <InputItem
              placeholder="选填"
              onChange={value => this.onChange('inviteCode', value)}
              value={this.state.inviteCode}
            >
              邀请码
            </InputItem>
          </div> */}
          <div className="cb-input-other wp100">
            <CaptchaInfo className="fr" />
          </div>
          <div className="cb-btn">
            <Button
              loading={this.state.loading}
              disabled={
                !this.state.isSelectYsAgree ||
                !this.state.isSelectAgree ||
                this.state.loading
              }
              onClick={this.onRegister}
            >
              同意用户协议，完成注册
            </Button>
          </div>
          <div className="wp100 tac">
            <div
              className={`${style.agree} tal oh`}
              onClick={() =>
                this.onChange('isSelectYsAgree', !this.state.isSelectYsAgree)
              }
            >
              <em
                className="mr10"
                style={{
                  backgroundImage: this.state.isSelectYsAgree
                    ? `url(${require('../../assets/images/agree-act.png')})`
                    : 'none'
                }}
              />
              阅读并接受
              <span
                onClick={(event: any) => {
                  event.preventDefault()
                  event.stopPropagation()
                  this.onChange('isShowYsAgreeModal', true)
                }}
              >
                《隐私政策协议》
              </span>
            </div>
            <div
              className={`${style.agree} tal oh`}
              onClick={() =>
                this.onChange('isSelectAgree', !this.state.isSelectAgree)
              }
            >
              <em
                className="mr10"
                style={{
                  backgroundImage: this.state.isSelectAgree
                    ? `url(${require('../../assets/images/agree-act.png')})`
                    : 'none'
                }}
              />
              阅读并接受
              <span
                onClick={(event: any) => {
                  event.preventDefault()
                  event.stopPropagation()
                  this.onChange('isShowAgreeModal', true)
                }}
              >
                《软件许可及服务协议》
              </span>
            </div>
          </div>
        </div>
        <Modal
          title="请选择从事的行业领域"
          popup={true}
          visible={this.state.isShowTradeModal}
          onClose={() => this.onChange('isShowTradeModal', false)}
          animationType="slide-up"
          className={style.tradeModal}
        >
          <div className={`${style.tradeModalContent} wp100 sb oay cb-radio`}>
            {this.state.trades.map((trade: any) => (
              <Radio.RadioItem
                key={trade.value}
                checked={this.state.trade === trade.value}
                onClick={() => this.onChange('trade', trade.value)}
              >
                {trade.label}
              </Radio.RadioItem>
            ))}
          </div>
        </Modal>
        <Modal
          title="软件许可及服务协议"
          popup={true}
          visible={this.state.isShowAgreeModal}
          onClose={() => this.onChange('isShowAgreeModal', false)}
          animationType="slide-up"
          className={style.agreeModal}
        >
          <div className={`${style.agreeModalContent} wp100 hp100 bsb`}>
            <div className="content wp100 hp100 sb oay tal fs12 plr10 bsb">
              <p>本版更新日期：2019年12月25日</p>
              <p>重要须知</p>
              <p className="ti2">
                成都铭信达信息技术有限公司（以下简称铭信达公司）在此特别提醒用户认真阅读、
                充分理解本《软件许可及服务协议》（下称“协议”）。用户应当具备中华人民共和国法
                律规定的与用户行为相适应的民事行为能力，确保有能力对使用本软件提供服务的一切行为
                独立承担责任。若用户不具备前述主体资格，请在法定监护人的陪同下阅读本协议，并在取
                得他们对使用本软件的同意，以及对本协议全部条款的同意之后，方可使用本软件；铭信达公司
                在依据法律规定或本协议约定要求用户承担责任时，有权向监护人追偿。除非用户接受本协
                议所有条款，否则用户无权下载、安装或使用本软件及其相关服务。用户的下载、安装、使用、
                帐号获取和登录行为将视为对本协议的接受，并同意接受本协议各项条款的约束。
              </p>
              <p className="ti2">
                本协议是用户与铭信达公司之间关于用户下载、安装、使用、复制软件
                （含“爱米哒哒”及“爱米盛”，下统称“本软件”）；使用、管理帐号；以及使用铭信达公司相关
                服务所订立的协议。本协议描述铭信达公司与用户之间关于软件许可使用及服务相关方面的权利义务。
                本协议内容同时包括铭信达公司通过页面公告方式已经发布的或将来可能发布的各类规则、铭信达公司发布的
                且不断更新的《爱米哒哒电子商务服务协议》、《爱米哒哒支付服务协议》等，前述所有内容为本协议不可分
                割的组成部分，与本协议具有同等法律效力。
              </p>
              <p className="ti2">
                本协议可由铭信达公司在必要时通过在软件内或网页上发出公告随时更新，更新后的协议条款一旦
                公布即代替原来的协议条款。用户可重新下载安装本软件或通过网页查阅最新版协议条款。在铭信达
                公司修改协议条款后，如果用户不接受修改后的条款，有权停止使用铭信达公司提供的软件和服务。
                当发生有关争议时，以最新的服务条款为准。
              </p>
              <p className="ti2">
                用户使用本软件相关服务，应受相关服务条款的约束，并自觉遵守该相关服务条款的全部约定。
              </p>
              <p>1 知识产权声明</p>
              <p>
                1.1 本软件的一切著作权、商标权、专利权、商业秘密等知识产权，
                以及与本软件相关的所有信息内容，包括但不限于：文字表述及其组合、图标、
                图饰、图表、色彩、界面设计、版面框架、有关数据、印刷材料、或电子文档等均受中华人民共和
                国著作权法、商标法、专利法、反不正当竞争法和相应的国际条约以及其他知识产权法律法规的保护，
                除涉及第三方授权的软件或技术外，铭信达公司享有上述知识产权。
              </p>
              <p>
                1.2
                未经铭信达公司书面同意，用户不得为任何营利性或非营利性的目的自行许可任何三方、转让上述知识产权，铭信达公司保留追究上述未经许可行为的权利。
              </p>
              <p>2 软件授权范围</p>
              <p>
                2.1 用户可以在单一台终端设备上安装、使用、显示、运行本软件。
                用户不得对本软件或者本软件运行过程中释放到任何终端内存中的数据及本软件运行过程中客户
                端与服务器端的交互数据进行复制、更改、修改、挂接运行或创作任何衍生作品，形式包括但不限于使用非
                铭信达公司提供的插件、外挂或非经授权的第三方工具/服务接入本软件和相关系统。
              </p>
              <p>2.2 保留权利：未明示授权的其他一切权利仍归铭信达公司所有。</p>
              <p>3 用户使用须知</p>
              <p>
                3.1
                用户需实名注册软件帐号后方能使用本软件。帐号的所有权归铭信达公
                司所有，用户注册后，仅获得帐号的使用权，用户不得赠与、借用、租用、转让或售卖帐
                号或者以其他方式许可他人使用帐号。账号注册资料包括但不限于用户的账号名称、头像、密码、
                注册或更新账号时输入的所有信息。
              </p>
              <p className="ti2">
                用户在注册账号时承诺遵守法律法规、社会主义制度、国家利益、公民合法权益、公共
                秩序、社会道德风尚和信息真实性等七条底线，不得在账号注册资料中出现违法和不良信息，
                且用户保证其在注册和使用账号时，不得有以下情形：
              </p>
              <p>（1）违反宪法或法律法规规定的；</p>
              <p>
                （2）危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家统一的；
              </p>
              <p>（3）损害国家荣誉和利益的，损害公共利益的；</p>
              <p>（4）煽动民族仇恨、民族歧视，破坏民族团结的；</p>
              <p>（5）破坏国家宗教政策，宣扬邪教和封建迷信的；</p>
              <p>（6）散布谣言，扰乱社会秩序，破坏社会稳定的</p>
              <p>（7）散布淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪的；</p>
              <p>（8）侮辱或者诽谤他人，侵害他人合法权益的；</p>
              <p>（9）含有法律、行政法规禁止的其他内容的。</p>
              <p className="ti2">
                若用户提供给铭信达公司的账号注册资料不准确，不真实，含有违法或不良信息的，
                铭信达公司有权不予注册，并保留终止用户使用铭信达公司各项服务的权利。若用户以虚假信息
                骗取账号注册或账号头像、个人简介等注册资料存在违法和不良信息的，铭信达公司有权采取通知限
                期改正、暂停使用、注销登记等措施。对于冒用关联机构或社会名人注册账号名称的，铭信达公司有权注销
                该账号，并向政府主管部门进行报告。
              </p>
              <p className="ti2">
                根据相关法律、法规规定以及考虑到铭信达公司服务的重要性，用户同意：
              </p>
              <p>
                （1）在注册账号时提交个人有效身份信息/公司资质文件进行实名认证；
              </p>
              <p>（2）提供及时、详尽及准确的账户注册资料；</p>
              <p>
                （3）不断更新注册资料，符合及时、详尽准确的要求，对注册账号时填写的身份证件信息不能更新。
              </p>
              <p>
                3.2
                用户有义务妥善保管其登录账户信息和密码，并就其账户及密码项下的一切活动
                负全部责任。如因用户自身原因导致被他人获悉自己的账号资料（包括但不限于账户名称、
                密码、个人信息），从而导致的损失由用户本人承担。
              </p>
              <p>
                3.3
                用户在遵守法律及本协议的前提下可依本协议使用本软件。用户无权实施包括但不限于下列行为：
              </p>
              <p>
                3.3.1
                通过非铭信达公司开发、授权或认可的第三方兼容软件、系统登录或使
                用铭信达公司软件及服务，针对铭信达公司的软件和服务使用非铭信达公司开发、授权或认证的插件；
              </p>
              <p>3.3.2 删除本软件及其他副本上所有关于版权的信息、内容；</p>
              <p>3.3.3 对本软件进行反向工程、反向汇编、反向编译等；</p>
              <p>
                3.3.4 对于本软件相关信息等，未经铭信达公司书面同意，擅自实施包
                括但不限于下列行为：出租、出借、复制、修改、链接、转载、汇编、发表、出版，建立镜像站点
                、擅自借助本软件发展与之有关的衍生产品、作品、服务、插件、外挂、兼容、互联；
              </p>
              <p>
                3.3.5 利用本软件发表、传送、传播、储存违反国家法律法规和政策、
                危害国家安全、祖国统一、社会稳定、公序良俗的内容，或任何不当的、侮辱诽谤的、淫秽的、暴力的内容。
              </p>
              <p>
                3.3.6
                利用本软件发表、传送、传播、储存侵害他人知识产权、商业秘密权等合法权利的内容；
              </p>
              <p>3.3.7 制造虚假身份以误导、欺骗他人；</p>
              <p>3.3.8 利用本软件批量发表、传送、传播广告信息及垃圾信息；</p>
              <p>
                3.3.9
                进行任何危害本软件或利用本软件危害计算机网络安全的行为，包括但不限于：
                使用未经许可的本软件相关数据或进入未经许可的本软件服务器/帐号；未经允许进入公众计算机
                网络或者他人计算机系统删除、修改、增加本软件的存储信息；未经许可，企图探查、扫描、测试
                本软件系统或利用本软件探查、扫描、测试网络的弱点或其它实施破坏网络安全的行为；企图干涉、
                破坏本软件系统或网站的正常运行，利用本软件故意传播恶意程序或病毒以及其他破坏干扰正常网络
                信息服务的行为。
              </p>
              <p>
                3.3.10
                其他以任何不合法的方式、为任何不合法的目的、或以任何与本协议不一致的
                方式使用本软件和铭信达公司提供的其他服务；
              </p>
              <p>
                3.3.11
                用户若违反上述规定，铭信达公司有权采取终止、完全或部分中止、限制用户帐号的使用功能。
              </p>
              <p>
                3.4
                对于用户违法或违反本协议的使用而引起的一切责任，由用户负全部责任，
                一概与铭信达公司及合作单位无关；导致铭信达公司及合作单位损失的，铭信达公司及
                合作单位有权要求用户赔偿，并有权保留相关记录。同时铭信达公司有权视用户的行为性质，
                在不事先通知用户的情况下，采取相关措施，措施包括但不限于中断使用许可、停止提供服务、限
                制使用、冻结或注销用户帐号、法律追究。
              </p>
              <p>
                3.5
                本软件同大多数互联网软件一样，受包括但不限于用户原因、网络服务质量、
                社会环境等因素的差异影响，可能受到各种安全问题的侵扰，如他人利用用户的资料，
                造成现实生活中的骚扰；用户下载安装的其它软件或访问的其他网站中含有“特洛伊木马”等病毒，
                威胁到用户的计算机信息和数据的安全，继而影响本软件的正常使用等。用户应加强信息安全及使
                用者资料的保护意识，要注意加强密码保护，以免遭致损失和骚扰。
              </p>
              <p>
                3.6
                用户知悉，本软件中的部分服务可能受第三方如运营商的通讯线路故障、
                技术问题、网络、电脑故障、系统不稳定及其他因不可抗力造成的情形的影响。如因此
                类情形导致本软件中的部分服务不能满足用户要求或用户因此遭受损失的，用户同意铭信达公
                司不承担任何责任。
              </p>
              <p>
                3.7
                非经铭信达公司或铭信达公司授权开发并正式发布的其它任何由本软件衍生
                的软件均属非法，下载、安装、使用此类软件，将可能导致不可预知的风险，由此产生的一切法律
                责任与纠纷一概与铭信达公司无关。
              </p>
              <p>
                3.8
                尊重用户隐私是铭信达公司的一项基本政策。铭信达公司将按照网站上公布的
                隐私政策（https://www.amisheng.com/policy.html）收集、存储、使用、披露和保护您
                的个人信息。请您完整阅读上述隐私权政策，以帮助您更好地保护您的个人信息。
              </p>
              <p>
                3.9
                用户参与铭信达公司基于本软件的相关活动，应遵守铭信达公司发布的活动规则。
                活动规则可由铭信达公司在活动期间必要时通过在活动主页上发出公告随时更新，更新后的活动
                规则一旦公布即代替原来的规则，恕不再另行通知。在铭信达公司修改活动规则后，如果用户
                不接受修改后的规则，有权停止参与该活动，用户继续参与该活动将被视为已接受了修改后的活
                动规则，当发生有关争议时，以最新的活动规则为准。铭信达公司有权自行决定活动终止的时间，
                并会提前通过在软件内或网页上发出公告告知用户。
              </p>
              <p>
                3.10 为使用户及时、全面了解铭信达公司提供的各项服务，用户同意，
                铭信达公司可以多次、长期向用户发送各类商业性短信息而无需另行获得用户的同意。
              </p>
              <p>
                3.11
                本软件包含“爱米哒哒”和“爱米盛”，铭信达公司有权基于自己的判断决定是否向用户提供相关服务。
              </p>
              <p>
                3.12
                用户如代表一家法人或其他组织（以下简称“组织”）进行注册及/或实际使用本服务，则须声
                明和保证，用户有权保证该组织接受本协议条款的约束；铭信达公司有权要求用户提供用户及/或组
                织的相关主体证明材料。
              </p>
              <p className="ti2">
                用户可以申请“爱米盛”后台管理账号，经过铭信达公司审核后，用户可代表组织通过该管
                理账号上传和管理成员通信录，邀请成员加入，并使用“爱米盛”及相关服务。
              </p>
              <p className="ti2">
                用户申请“爱米盛”后台管理账号，应自行通过账号添加和管理成员，并对成员的行为承担
                责任，铭信达公司根据用户后台管理账号的行为对成员服务的调整亦由用户及组织承担后果，
                因此给铭信达公司或他人造成损失的，由用户及组织承担全部责任。
              </p>
              <p>
                3.13
                如用户在使用本服务时接受邀请成为某个组织的成员并维持该身份时，用户可以享
                受铭信达公司为该组织及其成员提供的服务内容（以铭信达公司实际提供功能及企业或群体
                开通情况为准），同时用户授权所属组织对用户的成员身份及基于该身份的相关权益进行管理，
                包括但不限于加入、删除以及调整权限和限制服务内容，用户保证在遵守铭信达公司服务规范的同
                时，按照组织的授权范围和规范使用本服务，如用户丧失组织成员身份，铭信达公司有权将基于该
                身份的服务内容一并删除。
              </p>
              <p>
                3.14
                铭信达公司尊重知识产权并注重保护用户享有的各项权利。在本软件
                所含服务中，用户可能需要通过发表评论、发表观点等各种方式向铭信达公司提供内容。在此情况下，
                用户仍然享有此等内容的完整知识产权。用户在提供内容时将授予铭信达公司一项全球性的免费许可
                ，允许铭信达公司使用、传播、复制、修改、汇编、改编、再许可、翻译、创建衍生作品、出版、表演及
                展示此等内容。
              </p>
              <p>
                4
                铭信达公司和/或合作单位将根据市场与技术的发展，向用户提供与本软件相关的各种互联网以及增值电
                信业务服务，包括免费和收费的业务服务。铭信达公司和/或合作单位保留对相关服务收取费用及改变收费
                标准、方式的权利；如相关服务由免费变更为收费服务，铭信达公司和/或合作单位将以适当的形式通知，
                用户可自主选择接受或拒绝收费服务，并保证在使用收费服务时，将按照铭信达公司和/或合作单位相关收
                费规定支付费用，如拒付或拖欠费用，铭信达公司和/或合作单位有权停止服务，并依法追偿损失及赔偿。
              </p>
              <p>
                5
                铭信达公司有权在服务中或经过服务投放各种广告和宣传信息，基于上述广告或宣传信息所提供的服
                务或产品，可能由第三方提供。您与任何第三方之间可能发生的包括但不限于商品或服务质量、数量、
                交易金额、交货时间等纠纷及损失应由第三方向您承担责任。铭信达公司根据法律规定承担补充责任。
              </p>
              <p>
                6
                若用户对本软件有任何意见或改进的建议，均可向铭信达公司提出。请注意，如果您这样做，还会
                授予铭信达公司和第三方在本软件（铭信达公司其他软件或第三方软件）中无偿使用和加入您的意见或建议的权利。
              </p>
              <p>7 软件的安装使用、升级及终止</p>
              <p>
                7.1
                用户接受本协议条款并完成相应的安装程序后，便成为本软件的使用者。用户同意并了解，
                只有在用户遵守与铭信达公司之间签署的协议且该协议有效的情况下，用户方可使用本软件及铭信达
                公司提供的与本软件有关的服务。
              </p>
              <p>
                7.2
                铭信达公司保留在任何时候为用户提供本软件的修改、升级版本的权利，以及为修改或升级
                服务收取费用的权利。软件新版本发布后，铭信达公司不保证旧版本软件的继续可用。
              </p>
              <p>
                7.3
                用户拥有未经事先通知铭信达公司的情况下，自行中断或终止本软件使用，自行卸载本软件
                的权利。用户知悉本软件卸载后无法再使用本软件功能及相关服务。
              </p>
              <p>
                7.4
                铭信达公司拥有未经事先通知用户而修改软件功能、中断软件使用的权利。铭信达公司行使修
                改、中断软件使用的权利而造成任何损失的，用户同意铭信达公司不需对用户或任何第三方负责。
              </p>
              <p>
                7.5
                铭信达公司有权根据自身商业决策原因单方暂停及/或终止产品/业务的运营。
              </p>
              <p>8 法律责任与不可抗力条款</p>
              <p>
                8.1
                用户违反本协议或相关的服务条款的规定，导致或产生的任何第三方主张的任何索
                赔、要求或损失，包括合理的律师费，用户同意赔偿铭信达公司与合作公司、关联公司，并使之免受损害。
              </p>
              <p>
                8.2
                铭信达公司对不可抗力导致的损失不承担责任。本服务条款所指不可抗力包括：天灾、
                法律法规或政府指令的变更，因网络服务特性而特有的原因，例如基础电信运营商的故障、计算
                机或互联网相关技术缺陷、互联网覆盖范围限制等因素，及其他合法范围内的不能预见、不能避免
                并不能克服的客观情况。
              </p>
              <p>9 内容所有权</p>
              <p>
                本软件内容的定义包括本软件：文字、软件、声音、相片、视频、图表；在广告中的全部内容。
                所有这些内容均属于铭信达公司及相关权利人，并受版权、商标、专利和其它财产所有权法律的保护。
                所以，用户只能在铭信达公司和相关权利人授权下才能使用这些内容，而不能擅自复制、
                再造这些内容、或创造与内容有关的派生产品。
              </p>
              <p>10 法律适用</p>
              <p>
                10.1
                如用户在使用铭信达公司服务过程中出现纠纷，应进行友好协商，若协商不成，
                均应依照中华人民共和国法律予以处理，并由被告住所地人民法院管辖。
              </p>
              <p>
                10.2
                如本协议中的任何条款因任何原因被判定为完全或部分无效或不具有执行力的，
                该无效或不具有执行力的条款将被最接近原条款意图的一项有效并可执行的条款所替代，并且
                本协议的其余条款仍应有效并且有执行力。
              </p>
              <p>11 权利声明</p>
              <p>
                11.1
                铭信达公司不行使、未能及时行使或者未充分行使本条款或者按照法律规定
                所享有的权利，不应被视为放弃该权利，也不影响铭信达公司在将来行使该权利。
              </p>
              <p>
                11.2
                如用户对本条款内容有任何疑问，可拨打客服服务电话028-87865939或发邮件至amisheng@sina.com咨询。
              </p>
            </div>
            <div className="cb-btn palb wp100">
              <Button
                className="fl"
                onClick={() => this.onChange('isShowAgreeModal', false)}
              >
                取消
              </Button>
              <Button
                className="fr"
                onClick={() => {
                  this.onChange('isShowAgreeModal', false)
                  this.onChange('isSelectAgree', true)
                }}
              >
                确定并同意
              </Button>
            </div>
          </div>
        </Modal>
        <Modal
          title="隐私政策协议"
          popup={true}
          visible={this.state.isShowYsAgreeModal}
          onClose={() => this.onChange('isShowYsAgreeModal', false)}
          animationType="slide-up"
          className={style.agreeModal}
        >
          <div className={`${style.agreeModalContent} wp100 hp100 bsb`}>
            <div className="content wp100 hp100 sb oay tal fs12 plr10 bsb">
              <p className="ti2">
                在此特别提醒您（用户）在注册成为用户之前，请认真阅读本《隐私政策协议》（以下简称“协议”），
                确保您充分理解本协议中各条款。请您审慎阅读并选择接受或不接受本协议。您的注册、登录、使用
                等行为将视为对本协议的接受，并同意接受本协议各项条款的约束。本协议约定四川赛狄信息技术股
                份公司（以下简称“赛狄”）与用户之间关于“爱米哒哒”软件服务（以下简称“服务“）的权利义务。
                “用户”是指注册、登录、使用本服务的个人。本协议可由赛狄随时更新，更新后的协议条款一旦公布即
                代替原来的协议条款，恕不再另行通知，用户可在本APP中查阅最新版协议条款。在修改协议条款后，如
                果用户不接受修改后的条款，请立即停止使用赛狄提供的服务，用户继续使用服务将被视为接受修改后的协议。
              </p>
              <p>一、账号注册</p>
              <p>
                1、用户在使用本服务前需要注册一个“爱米哒哒”账号。“爱米哒哒”账号应当使用手机号码绑定注册，
                请用户使用尚未与“爱米哒哒”账号绑定的手机号码，以及未被服务根据本协议封禁的手机号码注册“爱米
                哒哒”账号。服务可以根据用户需求或产品需要对账号注册和绑定的方式进行变更，而无须事先通知用户。{' '}
              </p>
              <p>
                2、用户注册时应当授权赛狄及使用其个人信息方可成功注册“爱米哒哒”账号。故用户完成注册即表明用户
                同意服务提取、公开及使用用户的信息。{' '}
              </p>
              <p>
                3、鉴于“爱米哒哒”账号的绑定注册方式，您同意服务在注册时将允许您的手机号码及手机设备识别码等信息用于注册。{' '}
              </p>
              <p>
                4、在用户注册及使用本服务时，赛狄需要搜集能识别用户身份的个人信息以便服务可以在必要时联系用户，
                或为用户提供更好的使用体验。赛狄搜集的信息包括但不限于用户的姓名、地址；赛狄同意对这些信息的使
                用将受限于第三条用户个人隐私信息保护的约束。{' '}
              </p>
              <p>二、用户个人隐私信息保护</p>
              <p>
                1、如果赛狄发现或收到他人举报或投诉用户违反本协议约定的，赛狄有权不经通知随时对相关内容，
                包括但不限于用户资料、发贴记录进行审查、删除，并视情节轻重对违规账号处以包括但不限于警告、
                账号封禁 、设备封禁 、功能封禁 的处罚，且通知用户处理结果。{' '}
              </p>
              <p>
                2、因违反用户协议被封禁的用户，可以自行与赛狄联系。其中，被实施功能封禁的用户会在封禁期届
                满后自动恢复被封禁功能。被封禁用户可提交申诉，赛狄将对申诉进行审查，并自行合理判断决定是否变更处罚措施。{' '}
              </p>
              <p>
                3、用户理解并同意，赛狄有权依合理判断对违反有关法律法规或本协议规定的行为进行处罚，对违法违规的任何用户采取
                适当的法律行动，并依据法律法规保存有关信息向有关部门报告等，用户应承担由此而产生的一切法律责任。{' '}
              </p>
              <p>
                4、用户理解并同意，因用户违反本协议约定，导致或产生的任何第三方主张的任何索赔、要求或损失，包括合理的律师费，
                用户应当赔偿赛狄与合作公司、关联公司，并使之免受损害。{' '}
              </p>
              <p>三、用户发布内容规范</p>
              <p>
                1、本条所述内容是指用户使用服务的过程中所制作、上载、复制、发布、传播的任何内容，包括但不限于账号头像、
                名称、用户说明等注册信息及认证资料，或文字、语音、图片、视频、图文等发送、回复或自动回复消息和相关链接
                页面，以及其他使用账号或本服务所产生的内容。{' '}
              </p>
              <p>
                2、用户不得利用“爱米哒哒”账号或本服务制作、上载、复制、发布、传播如下法律、法规和政策禁止的内容：{' '}
              </p>
              <p>(1) 反对宪法所确定的基本原则的； </p>
              <p>
                (2) 危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家统一的；{' '}
              </p>
              <p>(3) 损害国家荣誉和利益的； </p>
              <p>(4) 煽动民族仇恨、民族歧视，破坏民族团结的； </p>
              <p>(5) 破坏国家宗教政策，宣扬邪教和封建迷信的； </p>
              <p>(6) 散布谣言，扰乱社会秩序，破坏社会稳定的； </p>
              <p>(7) 散布淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪的； </p>
              <p>(8) 侮辱或者诽谤他人，侵害他人合法权益的； </p>
              <p>(9) 含有法律、行政法规禁止的其他内容的信息。 </p>
              <p>
                3、用户不得利用“爱米哒哒”账号或本服务制作、上载、复制、发布、
                传播如下干扰“服务”正常运营，以及侵犯其他用户或第三方合法权益的内容：{' '}
              </p>
              <p>(1) 含有任何性或性暗示的； </p>
              <p>(2) 含有辱骂、恐吓、威胁内容的； </p>
              <p>(3) 含有骚扰、垃圾广告、恶意信息、诱骗信息的； </p>
              <p>(4) 涉及他人隐私、个人信息或资料的； </p>
              <p>
                (5) 侵害他人名誉权、肖像权、知识产权、商业秘密等合法权利的；{' '}
              </p>
              <p>
                (6)
                含有其他干扰本服务正常运营和侵犯其他用户或第三方合法权益内容的信息。{' '}
              </p>
              <p>四、使用规则</p>
              <p>
                1、用户在本服务中或通过本服务所传送、发布的任何内容并不反映或代表，也不得被视为反映或代表赛狄的观点、立场或政策，赛狄对此不承担任何责任。{' '}
              </p>
              <p>2、用户不得利用“爱米哒哒”账号或本服务进行如下行为： </p>
              <p>
                (1)
                提交、发布虚假信息，或盗用他人头像或资料，冒充、利用他人名义的；{' '}
              </p>
              <p>(2) 强制、诱导其他用户关注、点击链接页面或分享信息的； </p>
              <p>(3) 虚构事实、隐瞒真相以误导、欺骗他人的； </p>
              <p>(4) 利用技术手段批量建立虚假账号的； </p>
              <p>(5) 利用“爱米哒哒”账号或本服务从事任何违法犯罪活动的； </p>
              <p>
                (6)
                制作、发布与以上行为相关的方法、工具，或对此类方法、工具进行运营或传播，无论这些行为是否为商业目的；{' '}
              </p>
              <p>
                (7)
                其他违反法律法规规定、侵犯其他用户合法权益、干扰“爱米哒哒”正常运营或服务未明示授权的行为。{' '}
              </p>
              <p>
                3、用户须对利用“爱米哒哒”账号或本服务传送信息的真实性、合法性、无害性、准确性、有效性等全权负责，
                与用户所传播的信息相关的任何法律责任由用户自行承担，与赛狄无关。
                如因此给赛狄或第三方造成损害的，用户应当依法予以赔偿。{' '}
              </p>
              <p>
                4、赛狄提供的服务中可能包括广告，用户同意在使用过程中显示爱米哒哒和第三方供应商、合作伙伴提供的
                广告。除法律法规明确规定外，用户应自行对依该广告信息进行的交易负责，
                对用户因依该广告信息进行的
                交易或前述广告商提供的内容而遭受的损失或损害，赛狄不承担任何责任。{' '}
              </p>
              <p>五、其他</p>
              <p>
                1、赛狄郑重提醒用户注意本协议中免除赛狄责任和限制用户权利的条款，请用户仔细阅读，
                自主考虑风险。未成年人应在法定监护人的陪同下阅读本协议。{' '}
              </p>
              <p>
                2、本协议的效力、解释及纠纷的解决，适用于中华人民共和国法律。若用户和爱米哒哒之间发生任何纠纷或争议，
                首先应友好协商解决，协商不成的，用户同意将纠纷或争议提交赛狄住所地有管辖权的人民法院管辖。{' '}
              </p>
              <p>
                3、本协议的任何条款无论因何种原因无效或不具可执行性，其余条款仍有效，对双方具有约束力。
              </p>
              <p>
                本《协议》版权由赛狄所有，赛狄保留一切对本《协议》解释的权利。
              </p>
            </div>
            <div className="cb-btn palb wp100">
              <Button
                className="fl"
                onClick={() => this.onChange('isShowYsAgreeModal', false)}
              >
                取消
              </Button>
              <Button
                className="fr"
                onClick={() => {
                  this.onChange('isShowYsAgreeModal', false)
                  this.onChange('isSelectYsAgree', true)
                }}
              >
                确定并同意
              </Button>
            </div>
          </div>
        </Modal>
        <Modal
          title="注册成功"
          visible={this.state.isShowInfo}
          transparent={true}
          className="cb-modal-alert"
          onClose={() => this.onChange('isShowInfo', false)}
          maskClosable={true} // 点击遮罩层关闭
          footer={[{ text: '确认', onPress: this.onSureInfo }]}
        >
          欢迎入驻爱米盛平台，返回登录
        </Modal>
      </div>
    )
  }
}

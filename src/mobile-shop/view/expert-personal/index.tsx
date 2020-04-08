import * as React from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'
import { Grid, Modal, TextareaItem } from 'antd-mobile'

import { Header } from '../../component/header'
const style = require('./style')

enum E_OPE_TYPE {
  INTRODUCE = 'introduce', // 介绍
  PAPER = 'paper', // 论文
  PRODUCE = 'produce', // 产品
  PROJECT = 'project', // 项目
  CASE = 'case', // 案例
  ACTIVITY = 'activity', // 活动
  NOTICE = 'notice' // 通知
}

type TOpe = { type: E_OPE_TYPE; icon: string; label: string; url: string }

const opeConfigs: TOpe[] = [
  {
    type: E_OPE_TYPE.INTRODUCE,
    label: '专家介绍',
    url: '/editor',
    icon: require('../../assets/images/expert-zjjs.png')
  },
  {
    type: E_OPE_TYPE.PAPER,
    label: '论文作品',
    url: `/expert-achieve/${E_OPE_TYPE.PAPER}`,
    icon: require('../../assets/images/expert-lwzp.png')
  },
  {
    type: E_OPE_TYPE.PRODUCE,
    label: '咨询产品',
    url: `/expert-achieve/${E_OPE_TYPE.PRODUCE}`,
    icon: require('../../assets/images/expert-zxcp.png')
  },
  {
    type: E_OPE_TYPE.PROJECT,
    label: '合作项目',
    url: `/expert-achieve/${E_OPE_TYPE.PROJECT}`,
    icon: require('../../assets/images/expert-hzxm.png')
  },
  {
    type: E_OPE_TYPE.CASE,
    label: '成功案例',
    url: `/expert-achieve/${E_OPE_TYPE.CASE}`,
    icon: require('../../assets/images/expert-cgal.png')
  },
  {
    type: E_OPE_TYPE.ACTIVITY,
    label: '社会活动',
    url: `/expert-achieve/${E_OPE_TYPE.ACTIVITY}`,
    icon: require('../../assets/images/expert-shhd.png')
  },
  {
    type: E_OPE_TYPE.NOTICE,
    label: '通知信息',
    url: '/expert-notice',
    icon: require('../../assets/images/expert-tzxx.png')
  }
]

interface IPropsExpertPersonal extends RouteComponentProps {}

interface IStateExpertPersonal {
  isShowHeadModal: boolean // 选择专家头像modal
  isShowExpertDesc: boolean // 专家简介modal
}

export default class ExpertPersonal extends React.PureComponent<
  IPropsExpertPersonal,
  IStateExpertPersonal
> {
  // 专家基本信息编辑
  private onEditExpertMsg(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const target: any = event.target
    if (!target) {
      return
    }

    const className = target.className || ''
    if (className.includes('edit-expert-head')) {
      this.setState({ isShowHeadModal: true })
    } else if (className.includes('edit-expert-desc')) {
      this.setState({ isShowExpertDesc: true })
    } else {
      this.props.history.push('/expert-personal-msg')
    }
  }

  constructor(props: IPropsExpertPersonal) {
    super(props)

    this.state = {
      isShowExpertDesc: false,
      isShowHeadModal: false
    }

    this.onEditExpertMsg = this.onEditExpertMsg.bind(this)
  }

  render() {
    return (
      <div className={`${style.expertPerson} wp100 hp100 pr bsb fs0 bg-fff oh`}>
        <div className="wp100 hp100 oay sb">
          <div className={`${style.expertPersonBanner} wp100 pr zi100`}>
            <Header>专家个人中心</Header>
            <img src={require('../../assets/images/expert-bg.png')} />
          </div>
          <div
            onClick={this.onEditExpertMsg}
            className={`${
              style.expertPersonHead
            } wp100 bsb zi200 bg-fff pr tac pl20 pr20 pb10`}
          >
            <div
              className="head oh pr"
              style={{
                backgroundImage: `url(${require('../../assets/images/expert-head-def.png')})`
              }}
            >
              <img
                src={require('../../assets/images/test.png')}
                className="edit-expert-head mc zi100"
              />
            </div>
            <h6 className="wp100 bsb tes mt45">刘新建</h6>
            <p className="wp100 bsb tes">
              中国国防工业企业协会执行副会长兼秘书长|尚未添加专家职称
            </p>
            <p className="expert-desc bsb tes pr dib">
              尚未添加专家简介
              <em
                className="edit-expert-desc part hp100"
                style={{
                  backgroundImage: `url(${require('../../assets/images/expert-desc-edit.png')})`
                }}
              />
            </p>
          </div>
          <div className={`${style.expertPla} wp100 bg-f0f0f0`} />
          <div className={`${style.expertPersonOpe} wp100 bsb bg-fff`}>
            <Grid
              data={opeConfigs}
              columnNum={4}
              square={true}
              hasLine={false}
              activeStyle={false}
              renderItem={itm => (
                <Link to={itm.url} className="ope-item db wp100 mc bsb plr10">
                  <img src={itm.icon} title={itm.label} />
                  <span className="db tes wp100">{itm.label}</span>
                </Link>
              )}
            />
          </div>
        </div>
        <Modal
          popup={true}
          visible={this.state.isShowHeadModal}
          onClose={() => this.setState({ isShowHeadModal: false })}
          animationType="slide-up"
          className={style.expertModal}
        >
          <div className="expert-select-head wp100 bsb pr15 pl15 pt5 pb5">
            <div className="expert-select-item tac bsb wp100 tes">拍照上传</div>
            <div className="expert-select-item tac bsb wp100 tes">
              从相册中选取
            </div>
            <div className="expert-select-info expert-select-item tac bsb wp100 tes">
              提示：专家照片和您的普通头像区分，只会展示在专家页面
            </div>
          </div>
          <div
            onClick={() => this.setState({ isShowHeadModal: false })}
            className="expert-select-cancel expert-select-item mt5 tac bsb wp100"
          >
            取消
          </div>
        </Modal>
        <Modal
          popup={true}
          visible={this.state.isShowExpertDesc}
          onClose={() => this.setState({ isShowExpertDesc: false })}
          animationType="slide-up"
          className={style.expertModal}
        >
          <div className="expert-desc-modal wp100 bsb p15">
            <TextareaItem
              placeholder="写点儿简介,让大家更加了解您"
              rows={3}
              count={40}
            />
            <div className="expert-desc-ope wp100 bsb mt15">
              <span onClick={() => this.setState({ isShowExpertDesc: false })}>
                取消
              </span>
              <span>保存</span>
            </div>
          </div>
        </Modal>
      </div>
    )
  }
}

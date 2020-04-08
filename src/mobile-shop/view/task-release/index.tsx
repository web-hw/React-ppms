import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import {
  InputItem,
  Radio,
  Icon,
  DatePicker,
  TextareaItem,
  Button,
  Modal
} from 'antd-mobile'

import { toast } from 'global@util/toast/mobile'
import { Header } from '../../component/header'
const style = require('./style')

interface IPropsTaskRelease extends RouteComponentProps {}

interface IStateTaskRelease {
  endTime: Date
  bidTime: Date
  taskType: string
  isShowTaskTypeModal: boolean
}

const DateItem = (props: any) => (
  <div onClick={props.onClick} className={style.dateItem}>
    <span className="label">{props.children}</span>
    <span className={props.value ? 'value' : 'extra'}>{props.extra}</span>
    <Icon type="right" size="md" />
  </div>
)

const taskTypes = [
  {
    label: '全部',
    value: '全部'
  },
  {
    label: '元件器件',
    value: '元件器件'
  },
  {
    label: '装备材料',
    value: '装备材料'
  },
  {
    label: '整机产品',
    value: '整机产品'
  },
  {
    label: '平台系统',
    value: '平台系统'
  },
  {
    label: '鉴定检测',
    value: '鉴定检测'
  },
  {
    label: '知识产权',
    value: '知识产权'
  },
  {
    label: '科学研究',
    value: '科学研究'
  },
  {
    label: '信息化',
    value: '信息化'
  },
  {
    label: '其它',
    value: '其它'
  }
]

export default class TaskRelease extends React.PureComponent<
  IPropsTaskRelease,
  IStateTaskRelease
> {
  constructor(props: IPropsTaskRelease) {
    super(props)

    this.state = {
      endTime: null,
      bidTime: null,
      taskType: '',
      isShowTaskTypeModal: false
    }

    // Todo发布失败
    // toast.info('发布失败,请检查网络后再试一次!')
  }

  render() {
    return (
      <div className="wp100 hp100 pr bsb pt50 fs0 bg-f0f0f0 oh">
        <Header>发布需求</Header>
        <div className="wp100 hp100 oay sb">
          <div className={`${style.item} cb-input mb5`}>
            <InputItem placeholder="请输入名称" maxLength={30}>
              需求名称
            </InputItem>
          </div>
          <div className={`${style.item} cb-input radio-item wp100 pb0 mb5`}>
            <InputItem
              extra={
                <div className="wp100">
                  <Radio>科研</Radio>
                  <Radio>生产</Radio>
                  <Radio>设计</Radio>
                  <Radio>服务</Radio>
                  <Radio>其它</Radio>
                </div>
              }
            >
              需求分类
            </InputItem>
          </div>
          <div
            onClick={() => this.setState({ isShowTaskTypeModal: true })}
            className={`${style.item} cb-input mb5`}
          >
            <InputItem
              value={this.state.taskType}
              placeholder="请选择"
              disabled={true}
              extra={<Icon type="right" size="md" />}
            >
              需求领域
            </InputItem>
          </div>
          <div className={`${style.item} cb-input radio-item wp100 pb0 mb5`}>
            <InputItem
              extra={
                <div className="wp100">
                  <Radio>个人</Radio>
                  <Radio>公司</Radio>
                  <Radio>军政</Radio>
                </div>
              }
            >
              需求来源
            </InputItem>
          </div>
          <div className={`${style.item} cb-input radio-item wp100 pb0 mb5`}>
            <InputItem
              extra={
                <div className="wp100">
                  <Radio>普通</Radio>
                  <Radio>紧急</Radio>
                  <Radio>重要</Radio>
                  <Radio>非常紧急</Radio>
                </div>
              }
            >
              需求紧急度
            </InputItem>
          </div>
          <div className="wp100 bg-fff mb5">
            <div className={`${style.item} cb-input`}>
              <InputItem type="digit" placeholder="请输入人数">
                需求人数
              </InputItem>
            </div>
            <div className={`${style.item} cb-input`}>
              <InputItem type="digit" placeholder="请输入周期">
                执行周期(天)
              </InputItem>
            </div>
            <div className={`${style.item} cb-input`}>
              <InputItem type="digit" placeholder="请输入预算">
                需求预算(天)
              </InputItem>
            </div>
            <div className={`${style.item} cb-input`}>
              <InputItem type="digit" placeholder="请输入保证金">
                竞标保证金(元)
              </InputItem>
            </div>
          </div>
          <div className="wp100 bg-fff mb5">
            <div className={style.item}>
              <DatePicker
                mode="date"
                extra="请选择"
                className="cb-date-wrap"
                value={this.state.endTime}
                onChange={endTime => this.setState({ endTime })}
              >
                <DateItem value={this.state.endTime}>对接结束时</DateItem>
              </DatePicker>
            </div>
            <div className={style.item}>
              <DatePicker
                mode="date"
                extra="请选择"
                className="cb-date-wrap"
                value={this.state.bidTime}
                onChange={bidTime => this.setState({ bidTime })}
              >
                <DateItem value={this.state.bidTime}>定标时间</DateItem>
              </DatePicker>
            </div>
          </div>
          <div className={`${style.item} cb-input mb5`}>
            <TextareaItem title="需求描述" placeholder="请输入需求相关描述" />
          </div>
          <div className={`${style.item} mb5`}>
            <div className="file-input-select cb-input">
              <InputItem extra={<Button className="cb-btn">选择文件</Button>}>
                上传附件
              </InputItem>
            </div>
            <div className="file-input-name cb-input">
              <InputItem
                placeholder="附件名称"
                extra={<Icon type="cross-circle" size="md" />}
                onExtraClick={() => console.log('啦啦')}
              />
            </div>
            <div className="file-input-name cb-input">
              <InputItem
                placeholder="附件名称"
                extra={<Icon type="cross-circle" size="md" />}
                onExtraClick={() => console.log('啦啦')}
              />
            </div>
          </div>
          <div className={`${style.item} mb5`}>
            <div className={style.targetObj}>
              <span className="label">面向对象</span>
              <span className="content">
                <a href="javascript:void(0);">全平台公开</a>
                <a
                  onClick={() =>
                    this.props.history.push('/task-release-target')
                  }
                  className="active"
                  href="javascript:void(0);"
                >
                  指定资源方
                </a>
              </span>
            </div>
            <div className={`${style.targetContent} wp100 bsb pt5`}>
              <div className="item wp100 tes tac fs12 bsb mt5 plr10">
                内部关联方-研发部-管理者管理者管理者管理者管理者
              </div>
            </div>
          </div>
          <div className={`${style.item} cb-input radio-item wp100 pb0 mb5`}>
            <InputItem
              extra={
                <div className="wp100">
                  <Radio>是</Radio>
                  <Radio>否</Radio>
                </div>
              }
            >
              短信通知
            </InputItem>
          </div>
          <div className="wp100 bg-fff">
            <div className={`${style.item} cb-input`}>
              <InputItem value="名字" placeholder="请输入联系人">
                竞标联系人
              </InputItem>
            </div>
            <div className={`${style.item} cb-input`}>
              <InputItem value="15664558751" placeholder="请输入联系电话">
                联系电话
              </InputItem>
            </div>
          </div>
          <div className={`${style.cbBtn} cb-btn pl15 pr15 pt40 pb40`}>
            <Button
              onClick={() => this.props.history.push('/task-release-suc')}
            >
              发布
            </Button>
          </div>
        </div>
        <Modal
          title="需求领域"
          popup={true}
          visible={this.state.isShowTaskTypeModal}
          onClose={() => this.setState({ isShowTaskTypeModal: false })}
          animationType="slide-up"
          className={style.taskTypeModal}
        >
          <div
            className={`${style.taskTypeModalContent} wp100 sb oay cb-radio`}
          >
            {taskTypes.map((type: any) => (
              <Radio.RadioItem
                key={type.value}
                checked={this.state.taskType === type.value}
                onClick={() => this.setState({ taskType: type.value })}
              >
                {type.label}
              </Radio.RadioItem>
            ))}
          </div>
          <Button
            className="cb-btn"
            onClick={() => this.setState({ isShowTaskTypeModal: false })}
          >
            关闭
          </Button>
        </Modal>
      </div>
    )
  }
}

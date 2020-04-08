import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import {
  Button,
  InputItem,
  Icon,
  TextareaItem,
  Modal,
  Radio
} from 'antd-mobile'

import CbModal from '../../component/modal'
import { Header } from '../../component/header'
const style = require('./style')

enum E_OPE_TYPE {
  PAPER = 'paper', // 论文
  PRODUCE = 'produce', // 产品
  PROJECT = 'project', // 项目
  CASE = 'case', // 案例
  ACTIVITY = 'activity' // 活动
}

type TAchieveType = { label: string; value: E_OPE_TYPE }

interface IPropsExpertAchieveEdit extends RouteComponentProps {}

interface IStateExpertAchieveEdit {
  achieveTypes: TAchieveType[]
  achieveType: TAchieveType // 成就类型
  isShowTypeModal: boolean // 成就类型是否显示
  isEdit: boolean // 是否是编辑
  isHasDetail: boolean // 是否有详情
}

export default class ExpertAchieveEdit extends React.PureComponent<
  IPropsExpertAchieveEdit,
  IStateExpertAchieveEdit
> {
  private onDelImg() {
    CbModal.alert('提示', '是否删除当前图片？', [
      { text: '取消' },
      {
        text: '确定',
        onPress() {
          console.log('啦啦')
        }
      }
    ])
  }

  constructor(props: IPropsExpertAchieveEdit) {
    super(props)

    this.state = {
      achieveType: { label: '', value: null },
      isShowTypeModal: false,
      isEdit: false,
      isHasDetail: false,
      achieveTypes: [
        { label: '论文作品', value: E_OPE_TYPE.PAPER },
        { label: '咨询产品', value: E_OPE_TYPE.PRODUCE },
        { label: '合作项目', value: E_OPE_TYPE.PROJECT },
        { label: '成功案例', value: E_OPE_TYPE.CASE },
        { label: '社会活动', value: E_OPE_TYPE.ACTIVITY }
      ]
    }

    this.onDelImg = this.onDelImg.bind(this)

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
  }

  render() {
    const { achieveType, isEdit, isHasDetail } = this.state

    return (
      <div className="wp100 hp100 pr bsb pt50 fs0 bg-f0f0f0 oh">
        <Header>{isEdit ? '编辑' : '添加'}成就</Header>
        <div className={`${style.editAchieve} wp100 hp100 pt5 bsb pr`}>
          <div className="wp100 hp100 oay sb bg-fff">
            <div
              className="cb-input tar-input"
              onClick={() => this.setState({ isShowTypeModal: true })}
            >
              <InputItem
                placeholder="请选择"
                disabled={true}
                value={achieveType.label}
                extra={<Icon type="right" size="md" />}
              >
                成就类型
              </InputItem>
            </div>
            <div className="cb-input">
              <TextareaItem
                title="标题"
                placeholder="请输入"
                rows={2}
                count={30}
              />
            </div>
            {achieveType.value === E_OPE_TYPE.PAPER && (
              <div className="cb-input">
                <InputItem placeholder="例如SCI、STP(选填)">收录</InputItem>
              </div>
            )}
            <div
              className="cb-input tar-input"
              onClick={() => this.props.history.push('/editor')}
            >
              <InputItem
                placeholder={isHasDetail ? '查看' : '添加'}
                disabled={true}
                // value={this.state.trade}
                extra={<Icon type="right" size="md" />}
              >
                论文/成就详情
              </InputItem>
            </div>
            <div className="cb-no-border-input cb-input">
              <InputItem disabled={true}>封面图</InputItem>
              <div className="select-file">
                <div
                  className="fl pr cp"
                  // style={{
                  //   backgroundImage: `url(${require('../../assets/images/test.png')})`
                  // }}
                >
                  <div className="mc wp100">
                    <img
                      src={require('../../assets/images/select-file-icon.png')}
                    />
                    请选择
                  </div>
                  <div
                    onClick={this.onDelImg}
                    className="del-file part"
                    style={{
                      backgroundImage: `url(${require('../../assets/images/add-icon.png')})`
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="cb-btn palb wp100 bsb bg-fff">
            <Button>提交</Button>
          </div>
        </div>
        <Modal
          title="请选择成就类型"
          popup={true}
          visible={this.state.isShowTypeModal}
          onClose={() => this.setState({ isShowTypeModal: false })}
          animationType="slide-up"
          className={style.achieveType}
        >
          <div className={`${style.achieveTypeContent} wp100 sb oay cb-radio`}>
            {this.state.achieveTypes.map((type: any) => (
              <Radio.RadioItem
                key={type.value}
                checked={this.state.achieveType.value === type.value}
                onClick={() => this.setState({ achieveType: type })}
              >
                {type.label}
              </Radio.RadioItem>
            ))}
          </div>
        </Modal>
      </div>
    )
  }
}

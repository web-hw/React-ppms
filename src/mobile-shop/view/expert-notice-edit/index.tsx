import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Button, TextareaItem, Switch } from 'antd-mobile'

import { Header } from '../../component/header'
const style = require('./style')

interface IPropsExpertNoticeEdit extends RouteComponentProps {}

interface IStateExpertNoticeEdit {
  id: string // 通知id
  isDef: boolean // 是否是默认
}

export default class ExpertNoticeEdit extends React.PureComponent<
  IPropsExpertNoticeEdit,
  IStateExpertNoticeEdit
> {
  constructor(props: IPropsExpertNoticeEdit) {
    super(props)
    const params: any = props.match.params

    this.state = {
      isDef: true,
      id: params.id
    }
  }

  render() {
    const { isDef, id } = this.state
    console.log(id)

    return (
      <div className={`${style.editNotice} wp100 hp100 pr bsb fs0 bg-fff oh`}>
        <Header right={id ? <span>删除</span> : null}>
          {id ? '查看' : '添加'}通知
        </Header>
        <div className="wp100 hp100 oay sb bsb pt15 pb15 pr10 pl10">
          <div className="cb-input">
            <TextareaItem placeholder="请输入通知内容" />
          </div>
          <div className="set-def wp100 mt20">
            设为默认
            <Switch
              checked={isDef}
              onChange={() => this.setState({ isDef: !isDef })}
            />
          </div>
        </div>
        <div className="cb-btn palb wp100 bsb">
          <Button>提交</Button>
        </div>
      </div>
    )
  }
}

import * as React from 'react'
import {} from 'react-router-dom'
import { Input, Button, Form } from 'antd'

import Table, { TColumn, TClickCol, TData } from '../../../../component/table'
import Drawer from '../../../../component/drawer'
const style = require('./style')

interface IPropsMsgDetailForm {
  detail: TData
  setLoading?: (loading: boolean) => void
}

interface IStateMsgDetailForm {}

class MsgDetailForm extends React.PureComponent<
  IPropsMsgDetailForm,
  IStateMsgDetailForm
> {
  render() {
    const { detail } = this.props

    return (
      <Form
        className={style.msgDetailForm}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        labelAlign="left"
      >
        <Form.Item label="发送时间">{detail.sendDate}</Form.Item>
        <Form.Item label="消息类型">{detail.type}</Form.Item>
        <Form.Item label="发送人">{detail.sender}</Form.Item>
        <Form.Item label="消息内容">{detail.content}</Form.Item>
      </Form>
    )
  }
}

interface IPropsMsg {}

interface IStateMsg {
  loading: boolean
  keyword: string
  msgs: TData[]
  total: number
  msgDetail: TData
  msgDetailVisible: boolean
}

export default class Msg extends React.PureComponent<IPropsMsg, IStateMsg> {
  private _table: Table = null
  private _columns: TColumn[] = [
    {
      label: '内容',
      field: 'content',
      width: 37.5,
      clickTbodyCol: param => this.onJumpMsgDetail(param)
    },
    {
      label: '消息类型',
      field: 'type',
      width: 12.5
    },
    {
      label: '状态',
      field: 'status'
    },
    {
      label: '发送人',
      field: 'sender'
    },
    {
      label: '发送时间',
      field: 'sendDate',
      width: 25
    }
  ]

  // 跳转详情
  private onJumpMsgDetail(param: TClickCol) {
    this.setState({ msgDetail: param.row })
    this.onVisibleMsgDetail(true)
  }

  // 获取数据
  private getMsgs(page: number, size: number, keyword: string = '') {
    const msgs: TData[] = []
    for (let i = 0; i < size; i++) {
      msgs.push({
        content: `contentcontentcontentcontentcontentcontentcontentcontentcontent${i}`,
        type: `type${i}`,
        status: `status${i}`,
        sender: `sender${i}`,
        sendDate: '2019-09-25 12:50:59'
      })
    }
    this.setState({ loading: true })
    setTimeout(() => {
      this.setState({ msgs, total: 1000, loading: false })
    },         2000)
  }

  private onSearchMsgs() {
    let { keyword } = this.state
    keyword = keyword.trim()
    if (!keyword) {
      return
    }

    this.initMsgs(keyword)
  }

  private initMsgs(keyword = this.state.keyword) {
    const currentPage = 1
    const { pageSize } = this._table.state

    this._table.setState({ currentPage })
    this.getMsgs(currentPage, pageSize, keyword)
  }

  private onChangePageOrSize(page: number, size: number) {
    this.getMsgs(page, size, this.state.keyword)
  }

  private onVisibleMsgDetail(msgDetailVisible: boolean) {
    this.setState({ msgDetailVisible })
  }

  constructor(props: IPropsMsg) {
    super(props)

    this.state = {
      msgDetailVisible: false,
      loading: false,
      keyword: '',
      msgs: [],
      total: 0,
      msgDetail: {}
    }

    this.onSearchMsgs = this.onSearchMsgs.bind(this)
    this.onChangePageOrSize = this.onChangePageOrSize.bind(this)
  }

  componentDidMount() {
    this.initMsgs()
  }

  render() {
    const {
      keyword,
      msgs,
      total,
      loading,
      msgDetailVisible,
      msgDetail
    } = this.state

    return (
      <div className={`${style.msg} wp100 hp100 bsb pr`}>
        <div className="cb-search">
          <div className="cb-search-condition">
            <Input
              placeholder="关键字搜索"
              value={keyword}
              onChange={e => this.setState({ keyword: e.target.value })}
            />
          </div>
          <div className="cb-search-btn">
            <Button type="primary" onClick={this.onSearchMsgs}>
              搜索
            </Button>
          </div>
        </div>
        <div className="wp100 hp100">
          <Table
            ref={el => (this._table = el)}
            wrapperTbody={style.wrapperTbody}
            columns={this._columns}
            data={msgs}
            loading={loading}
            total={total}
            changePage={this.onChangePageOrSize}
            changeSize={this.onChangePageOrSize}
          />
        </div>
        <Drawer
          title="消息详情"
          width={550}
          visible={msgDetailVisible}
          onClose={() => this.onVisibleMsgDetail(false)}
        >
          <MsgDetailForm detail={msgDetail} />
        </Drawer>
      </div>
    )
  }
}

import * as React from 'react'
import {} from 'react-router-dom'
import { Button, Popconfirm, Form, Input } from 'antd'
import { FormComponentProps } from 'antd/es/form'

import Table, { TColumn, TData } from '../../../../../component/table'
import Modal from '../../../../../component/modal'
const style = require('./style')

interface IPropsEditCompanyForm extends FormComponentProps {
  name: string
}

interface IStateEditCompanyForm {}

const EditCompanyForm = Form.create<IPropsEditCompanyForm>({})(
  class extends React.PureComponent<
    IPropsEditCompanyForm,
    IStateEditCompanyForm
  > {
    render() {
      const { getFieldDecorator } = this.props.form
      const options = {
        initialValue: this.props.name || '',
        validateFirst: true,
        validateTrigger: 'onBlur'
      }

      return (
        <Form labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
          <Form.Item label="公司名称">
            {getFieldDecorator('name', {
              ...options,
              rules: [{ required: true, message: '请输入公司名称' }]
            })(<Input autoComplete="off" />)}
          </Form.Item>
        </Form>
      )
    }
  }
)

interface IPropsCompany {}

interface IStateCompany {
  companys: TData[]
  loading: boolean
  total: number
  visibleEditCompany: boolean
  editCompany: {
    id?: string
    name: string
  }
}

export default class Company extends React.PureComponent<
  IPropsCompany,
  IStateCompany
> {
  private _table: Table = null
  private _editCompanyForm: any = null
  private _columns: TColumn[] = [
    {
      label: '编号',
      field: 'index',
      width: 10
    },
    {
      label: '公司名称',
      field: 'name',
      width: 70
    },
    {
      label: '操作',
      field: 'ope',
      width: 20
    }
  ]
  private onDeleteCompany(id: any) {
    console.log('删除公司', id)
  }

  private opes(props: TData) {
    const { companyId } = props

    return (
      <div>
        <span onClick={() => this.onVisibleEditCompany(true, props)}>编辑</span>
        <Popconfirm
          overlayClassName="cb-pop-confirm"
          placement="bottom"
          title="是否删除当前公司信息"
          onConfirm={() => this.onDeleteCompany(companyId)}
        >
          <span>删除</span>
        </Popconfirm>
      </div>
    )
  }

  private getCompanys(page: number, size: number) {
    const companys: TData[] = []
    for (let i = 0; i < size; i++) {
      companys.push({
        name: `四川赛狄信息技术股份公司${i}`,
        ope: props => this.opes(props)
      })
    }
    this.setState({ loading: true })
    setTimeout(() => {
      this.setState({ companys, total: 0, loading: false })
    },         2000)
  }

  private initCompanys() {
    const currentPage = 1
    const { pageSize } = this._table.state

    this._table.setState({ currentPage })
    this.getCompanys(currentPage, pageSize)
  }

  private onChangePageOrSize(page: number, size: number) {
    this.getCompanys(page, size)
  }

  private onConfirmEditCompany() {
    const form = this._editCompanyForm.getForm()

    form.validateFields((err: any, values: any) => {
      if (err) {
        return
      }

      // Todo保存
      const { id } = this.state.editCompany
      console.log('编辑数据', id, values)
      // form.resetFields()
      this.onVisibleEditCompany(false)
    })
  }

  private onVisibleEditCompany(visibleEditCompany: boolean, init?: any) {
    let editCompany: any = { name: '' }

    if (init) {
      editCompany = { id: init.id, name: init.name }
    }

    this.setState({ visibleEditCompany, editCompany })
  }

  constructor(props: IPropsCompany) {
    super(props)

    this.state = {
      companys: [],
      loading: false,
      visibleEditCompany: false,
      total: 0,
      editCompany: { name: '' }
    }

    this.onChangePageOrSize = this.onChangePageOrSize.bind(this)
    this.onConfirmEditCompany = this.onConfirmEditCompany.bind(this)
  }

  componentDidMount() {
    this.initCompanys()
  }

  render() {
    const {
      companys,
      total,
      loading,
      visibleEditCompany,
      editCompany
    } = this.state
    const { id = '', name } = editCompany

    return (
      <div className={`${style.company} wp100 hp100 bsb pr`}>
        <div className="cb-ope">
          <Button
            type="primary"
            onClick={() => this.onVisibleEditCompany(true)}
          >
            新增
          </Button>
        </div>
        <div className="wp100 hp100">
          <Table
            ref={el => (this._table = el)}
            wrapperTbody={style.wrapperTbody}
            columns={this._columns}
            data={companys}
            loading={loading}
            total={total}
            changePage={this.onChangePageOrSize}
            changeSize={this.onChangePageOrSize}
          />
        </div>
        {/* 编辑 */}
        <Modal
          className={style.editCompanyModal}
          title={`${id ? '编辑' : '新增'}公司`}
          width={420}
          visible={visibleEditCompany}
          cancelText="取消"
          okText="确定"
          onOk={this.onConfirmEditCompany}
          onCancel={() => this.onVisibleEditCompany(false)}
        >
          <EditCompanyForm
            ref={el => (this._editCompanyForm = el)}
            name={name}
          />
        </Modal>
      </div>
    )
  }
}

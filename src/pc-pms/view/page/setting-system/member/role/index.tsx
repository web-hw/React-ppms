import * as React from 'react'
import {} from 'react-router-dom'
import { Button, Popconfirm, Form, Input } from 'antd'
import { FormComponentProps } from 'antd/es/form'

import Table, { TColumn, TData } from '../../../../../component/table'
import Modal from '../../../../../component/modal'
const style = require('./style')

interface IPropsEditRoleForm extends FormComponentProps {
  name: string
}

interface IStateEditRoleForm {}

const EditRoleForm = Form.create<IPropsEditRoleForm>({})(
  class extends React.PureComponent<IPropsEditRoleForm, IStateEditRoleForm> {
    render() {
      const { getFieldDecorator } = this.props.form
      const options = {
        initialValue: this.props.name || '',
        validateFirst: true,
        validateTrigger: 'onBlur'
      }

      return (
        <Form labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
          <Form.Item label="角色名称">
            {getFieldDecorator('name', {
              ...options,
              rules: [{ required: true, message: '请输入角色名称' }]
            })(<Input autoComplete="off" placeholder="请输入" />)}
          </Form.Item>
        </Form>
      )
    }
  }
)

interface IPropsRole {}

interface IStateRole {
  roles: TData[]
  loading: boolean
  total: number
  visibleEditRole: boolean
  editRole: {
    id?: string
    name: string
  }
}

export default class Role extends React.PureComponent<IPropsRole, IStateRole> {
  private _table: Table = null
  private _editRoleForm: any = null
  private _columns: TColumn[] = [
    {
      label: '序号',
      field: 'index',
      width: 20
    },
    {
      label: '角色名称',
      field: 'name',
      width: 50
    },
    {
      label: '操作',
      field: 'ope',
      width: 30
    }
  ]

  private opes(props: TData) {
    const { roleId } = props

    return (
      <div>
        <span onClick={() => this.onVisibleEditRole(true, props)}>编辑</span>
        <Popconfirm
          overlayClassName="cb-pop-confirm"
          placement="bottom"
          title="是否删除当前角色"
          onConfirm={() => this.onDeleteRole(roleId)}
        >
          <span>删除</span>
        </Popconfirm>
      </div>
    )
  }

  private getRoles(page: number, size: number) {
    const roles: TData[] = []
    for (let i = 0; i < size; i++) {
      roles.push({
        name: `负责人${i}`,
        ope: props => this.opes(props)
      })
    }
    this.setState({ loading: true })
    setTimeout(() => {
      this.setState({ roles, total: 0, loading: false })
    },         2000)
  }

  private initRoles() {
    const currentPage = 1
    const { pageSize } = this._table.state

    this._table.setState({ currentPage })
    this.getRoles(currentPage, pageSize)
  }

  private onChangePageOrSize(page: number, size: number) {
    this.getRoles(page, size)
  }

  private onConfirmEditRole() {
    const form = this._editRoleForm.getForm()

    form.validateFields((err: any, values: any) => {
      if (err) {
        return
      }

      // Todo保存
      const { id } = this.state.editRole
      console.log('编辑数据', id, values)
      // form.resetFields()
      this.onVisibleEditRole(false)
    })
  }

  private onVisibleEditRole(visibleEditRole: boolean, init?: any) {
    let editRole: any = { name: '' }

    if (init) {
      editRole = { id: init.id, name: init.name }
    }

    this.setState({ visibleEditRole, editRole })
  }

  private onDeleteRole(id: any) {
    console.log('删除', id)
  }

  constructor(props: IPropsRole) {
    super(props)

    this.state = {
      roles: [],
      total: 0,
      loading: false,
      visibleEditRole: false,
      editRole: { name: '' }
    }

    this.onChangePageOrSize = this.onChangePageOrSize.bind(this)
    this.onConfirmEditRole = this.onConfirmEditRole.bind(this)
  }

  componentDidMount() {
    this.initRoles()
  }

  render() {
    const { roles, total, loading, visibleEditRole, editRole } = this.state
    const { id, name } = editRole

    return (
      <div className={`${style.role} wp100 hp100 bsb pr`}>
        <div className="cb-ope">
          <Button type="primary" onClick={() => this.onVisibleEditRole(true)}>
            新增
          </Button>
        </div>
        <div className="wp100 hp100">
          <Table
            ref={el => (this._table = el)}
            wrapperTbody={style.wrapperTbody}
            columns={this._columns}
            data={roles}
            loading={loading}
            total={total}
            changePage={this.onChangePageOrSize}
            changeSize={this.onChangePageOrSize}
          />
        </div>
        {/* 编辑 */}
        <Modal
          className={style.editRoleModal}
          title={`${id ? '编辑' : '新增'}角色`}
          width={420}
          visible={visibleEditRole}
          cancelText="取消"
          okText="确定"
          onOk={this.onConfirmEditRole}
          onCancel={() => this.onVisibleEditRole(false)}
        >
          <EditRoleForm ref={el => (this._editRoleForm = el)} name={name} />
        </Modal>
      </div>
    )
  }
}

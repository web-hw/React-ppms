import * as React from 'react'
import {} from 'react-router-dom'
import {
  Button,
  Select,
  Input,
  Tree,
  Popconfirm,
  Form,
  Row,
  Col,
  Radio,
  DatePicker
} from 'antd'
import { AntTreeNodeSelectedEvent } from 'antd/es/tree'
import { FormComponentProps } from 'antd/es/form'
import moment from 'moment'

import Empty from 'global@component/empty'
import { PHONE_REG, ID_BANK_REG, ID_CARD_REG } from 'global@constant'
import Table, { TColumn, TData } from '../../../../../component/table'
import { FORMAT_DATE } from '../../../../../constant'
import Loading from '../../../../../component/loading'
import Modal from '../../../../../component/modal'
const style = require('./style')

interface IEditUserForm {
  id?: string
  name: string
  username: string
  department: string
  status: string
  workAddress: string
  entryDate: string
  regularDate: string
  superior: string
  approvalSuperior: string
  role: string
  empno: string
  email: string
  idCard: string
  phone: string
  idBank: string
}

interface IPropsEditUserForm extends FormComponentProps {
  data: IEditUserForm
}

interface IStateEditUserForm {}

const EditUserForm = Form.create<IPropsEditUserForm>({})(
  class extends React.PureComponent<IPropsEditUserForm, IStateEditUserForm> {
    render() {
      const { getFieldDecorator } = this.props.form
      const options = {
        validateFirst: true,
        validateTrigger: 'onBlur'
      }
      const {
        name,
        username,
        department,
        status,
        workAddress,
        entryDate,
        regularDate,
        superior,
        approvalSuperior,
        role,
        empno,
        email,
        idCard,
        phone,
        idBank
      } = this.props.data

      return (
        <Form labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
          <Row gutter={10}>
            <Col span={12}>
              <Form.Item label="姓名">
                {getFieldDecorator('name', {
                  ...options,
                  initialValue: name,
                  rules: [{ required: true, message: '请输入姓名' }]
                })(<Input placeholder="请输入" autoComplete="off" />)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="登录名">
                {getFieldDecorator('username', {
                  ...options,
                  initialValue: username,
                  rules: [{ required: true, message: '请输入登录名' }]
                })(<Input placeholder="请输入" autoComplete="off" />)}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={10}>
            <Col span={12}>
              <Form.Item label="密码">
                {getFieldDecorator('password', {
                  ...options,
                  rules: [{ required: true, message: '请输入密码' }]
                })(
                  <Input
                    placeholder="请输入"
                    type="password"
                    autoComplete="off"
                  />
                )}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="确认密码">
                {getFieldDecorator('surepwd', {
                  ...options,
                  rules: [{ required: true, message: '请输入确认密码' }]
                })(
                  <Input
                    placeholder="请输入"
                    type="password"
                    autoComplete="off"
                  />
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={10}>
            <Col span={12}>
              <Form.Item label="所属部门">
                {getFieldDecorator('department', {
                  ...options,
                  initialValue: department,
                  rules: [{ required: true, message: '请选择所属部门' }]
                })(
                  <Input
                    readOnly={true}
                    placeholder="请选择"
                    autoComplete="off"
                  />
                )}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="状态">
                {getFieldDecorator('status', {
                  ...options,
                  initialValue: status
                })(
                  <Radio.Group>
                    <Radio value="在职">在职</Radio>
                    <Radio value="离职">离职</Radio>
                  </Radio.Group>
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={10}>
            <Col span={12}>
              <Form.Item label="工作地点">
                {getFieldDecorator('workAddress', {
                  ...options,
                  initialValue: workAddress
                })(<Input autoComplete="off" />)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="入职时间">
                {getFieldDecorator('entryDate', {
                  ...options,
                  initialValue: entryDate
                    ? moment(entryDate, FORMAT_DATE)
                    : null
                })(
                  <DatePicker
                    popupStyle={{ width: '252px' }}
                    placeholder="请选择"
                    showToday={false}
                  />
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={10}>
            <Col span={12}>
              <Form.Item label="转正时间">
                {getFieldDecorator('regularDate', {
                  ...options,
                  initialValue: regularDate
                    ? moment(regularDate, FORMAT_DATE)
                    : null
                })(
                  <DatePicker
                    popupStyle={{ width: '252px' }}
                    placeholder="请选择"
                    showToday={false}
                  />
                )}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="直接上级">
                {getFieldDecorator('superior', {
                  ...options,
                  initialValue: superior
                })(
                  <Input
                    readOnly={true}
                    placeholder="请选择"
                    autoComplete="off"
                  />
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={10}>
            <Col span={12}>
              <Form.Item label="角色">
                {getFieldDecorator('role', {
                  ...options,
                  initialValue: role
                })(
                  <Select
                    showSearch={true}
                    placeholder="请选择"
                    filterOption={(input, option: any) =>
                      option.props.children
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                  >
                    <Select.Option value="角色1">角色1</Select.Option>
                    <Select.Option value="角色2">角色2</Select.Option>
                    <Select.Option value="角色3">角色3</Select.Option>
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="审批上级">
                {getFieldDecorator('approvalSuperior', {
                  ...options,
                  initialValue: approvalSuperior
                })(
                  <Input
                    readOnly={true}
                    placeholder="请选择"
                    autoComplete="off"
                  />
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={10}>
            <Col span={12}>
              <Form.Item label="员工号">
                {getFieldDecorator('empno', {
                  ...options,
                  initialValue: empno
                })(<Input autoComplete="off" />)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="身份证号">
                {getFieldDecorator('idCard', {
                  ...options,
                  initialValue: idCard,
                  rules: [{ pattern: ID_CARD_REG, message: '身份证号格式错误' }]
                })(<Input autoComplete="off" />)}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={10}>
            <Col span={12}>
              <Form.Item label="Email">
                {getFieldDecorator('email', {
                  ...options,
                  initialValue: email,
                  rules: [{ type: 'email', message: 'Email格式错误' }]
                })(<Input autoComplete="off" />)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="手机">
                {getFieldDecorator('phone', {
                  ...options,
                  initialValue: phone,
                  rules: [{ pattern: PHONE_REG, message: '手机号格式错误' }]
                })(<Input type="number" autoComplete="off" />)}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={10}>
            <Col span={12}>
              <Form.Item label="银行卡号">
                {getFieldDecorator('idBank', {
                  ...options,
                  initialValue: idBank,
                  rules: [{ pattern: ID_BANK_REG, message: '银行卡号格式错误' }]
                })(<Input autoComplete="off" />)}
              </Form.Item>
            </Col>
          </Row>
        </Form>
      )
    }
  }
)

type TTree = {
  title?: React.ReactNode
  key: string
  isLeaf?: boolean
  disabled?: boolean
  disableCheckbox?: boolean
  selectable?: boolean
  children?: TTree[]
}

interface IPropsUser {}

interface IStateUser {
  users: TData[]
  loading: boolean
  total: number
  companys: { id: string; name: string }[]
  departments: TTree[]
  loadingDepartment: boolean
  search: {
    name?: string
    status?: string
    companyId: string
    departmentIds: string[]
  }
  visibleEditUser: boolean
  editUser: IEditUserForm
}

export default class User extends React.PureComponent<IPropsUser, IStateUser> {
  private _table: Table = null
  private _editUserForm: any = null
  private _columns: TColumn[] = [
    {
      field: 'index',
      label: '序号',
      width: 10
    },
    {
      field: 'username',
      label: '登录名'
    },
    {
      field: 'name',
      label: '姓名'
    },
    {
      field: 'empno',
      label: '员工号'
    },
    {
      field: 'department',
      label: '部门'
    },
    {
      field: 'role',
      label: '角色'
    },
    {
      field: 'superior',
      label: '直接上级'
    },
    {
      field: 'approvalSuperior',
      label: '审批上级'
    },
    {
      field: 'phone',
      label: '手机'
    },
    {
      field: 'email',
      label: 'Email'
    },
    {
      field: 'workAddress',
      label: '工作地点'
    },
    {
      field: 'entryDate',
      label: '入职时间'
    },
    {
      field: 'status',
      label: '状态'
    },
    {
      field: 'ope',
      label: '操作'
    }
  ]

  private onSelectDepartment(
    departmentIds: string[],
    e?: AntTreeNodeSelectedEvent
  ) {
    const { search } = this.state
    const param = {
      ...search,
      departmentIds,
      name: '',
      status: '在职人员'
    }
    this.setState({ search: param })

    // 获取人员
    const currentPage = 1
    const { pageSize } = this._table.state

    this._table.setState({ currentPage })
    this.getUsers(param, currentPage, pageSize)
  }

  private onDeleteUser(userId: any) {
    console.log('删除', userId)
  }

  private opes(props: TData) {
    const { userId } = props

    return (
      <div>
        <span onClick={() => this.onVisibleEditUser(true, props)}>编辑</span>
        <Popconfirm
          overlayClassName="cb-pop-confirm"
          placement="bottom"
          title="是否删除当前用户"
          onConfirm={() => this.onDeleteUser(userId)}
        >
          <span>删除</span>
        </Popconfirm>
      </div>
    )
  }

  private getUsers(search: any, page: number, size: number) {
    console.log(search, '************')
    const users: TData[] = []
    for (let i = 0; i < size; i++) {
      users.push({
        username: `test${i}`,
        name: `四川赛狄信息技术股份公司${i}`,
        empno: `00${i}`,
        department: `部门${i}`,
        role: `角色${i}`,
        superior: `上级${i}`,
        approvalSuperior: `审批上级${i}`,
        phone: 13408226449,
        email: 'yshaow@162.com',
        workAddress: '成都',
        entryDate: '2019-10-12',
        status: i % 2 === 0 ? '在职' : '离职',
        ope: props => this.opes(props)
      })
    }
    this.setState({ loading: true })
    setTimeout(() => {
      this.setState({ users, total: 1000, loading: false })
    },         2000)
  }

  private onChangePageOrSize(page: number, size: number) {
    this.getUsers(this.state.search, page, size)
  }

  private getCompanys() {
    setTimeout(() => {
      const companys = [
        { id: '四川赛狄信息技术股份公司', name: '四川赛狄信息技术股份公司' },
        { id: '成都铭信达信息技术有限公司', name: '成都铭信达信息技术有限公司' }
      ]
      const companyId = companys[0].id

      this.setState({ companys })

      this.onChangeCompany(companyId)
    },         2000)
  }

  private onChangeCompany(companyId: string) {
    const { search } = this.state
    this.setState({
      search: { ...search, companyId }
    })

    this.getDepartments(companyId)
  }

  private getDepartments(companyId: string) {
    this.setState({ loadingDepartment: true })
    setTimeout(() => {
      const departments = [
        {
          key: '研发部',
          title: '研发部',
          children: [
            { key: '研发部1', title: '研发部1' },
            { key: '研发部2', title: '研发部2' }
          ]
        },
        {
          key: '产品部',
          title: '产品部',
          children: [
            { key: '产品部1', title: '产品部1' },
            {
              key: '产品部2',
              title: '产品部2',
              children: [
                { key: '产品部2-1', title: '产品部2-1111111111111111111' }
              ]
            }
          ]
        },
        {
          key: '质量部',
          title: '质量部',
          children: [
            { key: '质量部1', title: '质量部1' },
            { key: '质量部2', title: '质量部2' }
          ]
        },
        {
          key: '供应部',
          title: '供应部',
          children: [
            { key: '供应部1', title: '供应部1' },
            { key: '供应部2', title: '供应部2' }
          ]
        },
        {
          key: '品质部',
          title: '品质部',
          children: [
            { key: '品质部1', title: '品质部1' },
            { key: '品质部2', title: '品质部2' }
          ]
        },
        {
          key: '财务部',
          title: '财务部',
          children: [
            { key: '财务部1', title: '财务部1' },
            { key: '财务部2', title: '财务部2' }
          ]
        },
        {
          key: '市场部',
          title: '市场部',
          children: [
            { key: '市场部1', title: '市场部1' },
            { key: '市场部2', title: '市场部2' }
          ]
        }
      ]

      this.setState({
        departments,
        loadingDepartment: false
      })

      this.onSelectDepartment(
        departments.length > 0 ? [departments[0].key] : []
      )
    },         2000)
  }

  private onConfirmEditUser() {
    const form = this._editUserForm.getForm()

    form.validateFields((err: any, values: any) => {
      if (err) {
        return
      }

      // Todo保存
      const { id } = this.state.editUser
      console.log('编辑数据', id, values)
      // form.resetFields()
      this.onVisibleEditUser(false)
    })
  }

  private onVisibleEditUser(visibleEditUser: boolean, init: any = {}) {
    const editUser: IEditUserForm = {
      id: init.id || '',
      name: init.name || '',
      username: init.username || '',
      department: init.department || '',
      status: init.status || '在职',
      workAddress: init.workAddress || '',
      entryDate: init.entryDate || null,
      regularDate: init.regularDate || null,
      superior: init.superior || '',
      approvalSuperior: init.approvalSuperior || '',
      role: init.role || '',
      empno: init.empno || '',
      email: init.email || '',
      idCard: init.idCard || '',
      phone: init.phone || '',
      idBank: init.idBank || ''
    }

    this.setState({ visibleEditUser, editUser })
  }

  constructor(props: IPropsUser) {
    super(props)

    this.state = {
      users: [],
      companys: [],
      departments: [],
      loading: false,
      loadingDepartment: false,
      total: 0,
      search: {
        companyId: undefined,
        departmentIds: [],
        name: '',
        status: '在职人员'
      },
      visibleEditUser: false,
      editUser: null
    }

    this.onConfirmEditUser = this.onConfirmEditUser.bind(this)
    this.onChangePageOrSize = this.onChangePageOrSize.bind(this)
    this.onChangeCompany = this.onChangeCompany.bind(this)
    this.onSelectDepartment = this.onSelectDepartment.bind(this)
  }

  componentDidMount() {
    this.getCompanys()
  }

  render() {
    const {
      search,
      companys,
      departments,
      loadingDepartment,
      users,
      loading,
      total,
      visibleEditUser,
      editUser
    } = this.state

    return (
      <div className={`${style.users} wp100 hp100 bsb pr`}>
        <div className={`${style.department} hp100 bsb palt`}>
          <div className="company palt wp100">
            <Select
              placeholder="请选择公司"
              value={search.companyId}
              onChange={this.onChangeCompany}
            >
              {companys.map(c => (
                <Select.Option value={c.id} key={c.id}>
                  {c.name}
                </Select.Option>
              ))}
            </Select>
          </div>
          <div className="content wp100 hp100 p5 bsb">
            <div className="wp100 hp100 oay sb fs12">
              <Loading spinning={loadingDepartment}>
                {departments.length === 0 ? (
                  <Empty />
                ) : (
                  <Tree
                    showLine={true}
                    blockNode={true}
                    treeData={departments}
                    selectedKeys={search.departmentIds}
                    onSelect={this.onSelectDepartment}
                  />
                )}
              </Loading>
            </div>
          </div>
        </div>
        <div className={`${style.user} wp100 hp100 oax sb`}>
          <div className="content wp100 hp100 pr bsb">
            <div className="cb-ope">
              <Button
                type="primary"
                onClick={() => this.onVisibleEditUser(true)}
              >
                新增
              </Button>
            </div>
            <div className="cb-search">
              <div className="cb-search-condition">
                <Input
                  placeholder="请输入姓名"
                  value={search.name}
                  onChange={e =>
                    this.setState({
                      search: { ...search, name: e.target.value }
                    })
                  }
                />
                <Select
                  placeholder="请选择人员状态"
                  value={search.status}
                  onChange={status =>
                    this.setState({ search: { ...search, status } })
                  }
                >
                  <Select.Option value="全部人员">全部人员</Select.Option>
                  <Select.Option value="在职人员">在职人员</Select.Option>
                  <Select.Option value="离职人员">离职人员</Select.Option>
                </Select>
              </div>
              <div className="cb-search-btn">
                <Button type="primary">搜索</Button>
              </div>
            </div>
            <div className="wp100 hp100">
              <Table
                ref={el => (this._table = el)}
                wrapperTbody={style.wrapperTbody}
                columns={this._columns}
                data={users}
                loading={loading}
                total={total}
                changePage={this.onChangePageOrSize}
                changeSize={this.onChangePageOrSize}
              />
            </div>
          </div>
        </div>
        {/* 编辑 */}
        <Modal
          className={style.editUserModal}
          title={`${editUser && editUser.id ? '编辑' : '新增'}用户`}
          width={720}
          visible={visibleEditUser}
          cancelText="取消"
          okText="确定"
          onOk={this.onConfirmEditUser}
          onCancel={() => this.onVisibleEditUser(false)}
        >
          <EditUserForm ref={el => (this._editUserForm = el)} data={editUser} />
        </Modal>
      </div>
    )
  }
}

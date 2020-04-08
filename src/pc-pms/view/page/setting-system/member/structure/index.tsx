import * as React from 'react'
import {} from 'react-router-dom'
import {
  Button,
  Select,
  Popconfirm,
  Dropdown,
  Icon,
  Menu,
  Form,
  Input,
  DatePicker
} from 'antd'
import { FormComponentProps } from 'antd/es/form'
import moment from 'moment'

import Table, { TColumn, TData } from '../../../../../component/table'
import Modal from '../../../../../component/modal'
import { FORMAT_DATE } from '../../../../../constant'
const style = require('./style')

interface IPropsEditStructureForm extends FormComponentProps {
  name: string
  expire: string
}

interface IStateEditStructureForm {}

const EditStructureForm = Form.create<IPropsEditStructureForm>({})(
  class extends React.PureComponent<
    IPropsEditStructureForm,
    IStateEditStructureForm
  > {
    render() {
      const { getFieldDecorator } = this.props.form
      const { name = '', expire = null } = this.props
      const options = {
        validateFirst: true,
        validateTrigger: 'onBlur'
      }

      return (
        <Form labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
          <Form.Item label="部门名称">
            {getFieldDecorator('name', {
              ...options,
              initialValue: name,
              rules: [{ required: true, message: '请输入部门名称' }]
            })(<Input placeholder="请输入" autoComplete="off" />)}
          </Form.Item>
          <Form.Item label="失效时间">
            {getFieldDecorator('expire', {
              initialValue: expire ? moment(expire, FORMAT_DATE) : null
            })(
              <DatePicker
                placeholder="请选择"
                showToday={false}
                popupStyle={{ width: '285px' }}
              />
            )}
          </Form.Item>
        </Form>
      )
    }
  }
)

interface IPropsStructure {}

interface IStateStructure {
  departments: TData[]
  loading: boolean
  total: number
  visibleEditStructure: boolean
  editStructure: {
    id?: string
    name: string
    expire: string
  }
  search: {
    company: string
    departmentStatus: string
  }
}

enum E_OPE_TYPE {
  EDIT = 'edit',
  DELETE = 'delete',
  ADD = 'add',
  INSERT = 'insert',
  LEFT = 'left',
  RIGHT = 'right',
  UP = 'up',
  DOWN = 'down'
}

export default class Structure extends React.PureComponent<
  IPropsStructure,
  IStateStructure
> {
  private _table: Table = null
  private _editStructureForm: any = null
  private _columns: TColumn[] = [
    // {
    //   label: '编号',
    //   field: 'index',
    //   width: 10
    // },
    {
      label: '部门名称',
      field: 'name',
      width: 60
    },
    {
      label: '失效时间',
      field: 'expire',
      width: 20
    },
    {
      label: '操作',
      field: 'ope',
      width: 20
    }
  ]

  private onSelectOpe(param: { type: E_OPE_TYPE | string; item: TData }) {
    const { type, item } = param
    switch (type) {
      case E_OPE_TYPE.EDIT:
        return this.onVisibleEditStructure(true, item)
      case E_OPE_TYPE.DELETE:
        return console.log('删除')
      case E_OPE_TYPE.ADD:
        return console.log('最后添加子节点')
      case E_OPE_TYPE.INSERT:
        return console.log('当前项后面插入')
      case E_OPE_TYPE.LEFT:
        return console.log('当前项升级')
      case E_OPE_TYPE.RIGHT:
        return console.log('当前项降级到上一个元素下')
      case E_OPE_TYPE.UP:
        return console.log('上移')
      case E_OPE_TYPE.DOWN:
        return console.log('下移')
    }
  }

  private opes(props: TData) {
    const { companyId } = props
    const getIcon = (name: string) =>
      require(`../../../../../assets/images/${name}`)

    return (
      <div>
        <span
          onClick={() =>
            this.onSelectOpe({ type: E_OPE_TYPE.EDIT, item: props })
          }
        >
          编辑
        </span>
        <Popconfirm
          overlayClassName="cb-pop-confirm"
          placement="bottom"
          title="是否删除当前项"
          onConfirm={() =>
            this.onSelectOpe({ type: E_OPE_TYPE.DELETE, item: props })
          }
        >
          <span>删除</span>
        </Popconfirm>
        <Dropdown
          placement="bottomCenter"
          overlay={
            <Menu
              className={style.structureOpe}
              onClick={({ key }) =>
                this.onSelectOpe({ type: key, item: props })}
            >
              <Menu.Item key={E_OPE_TYPE.ADD}>
                <em
                  style={{
                    backgroundImage: `url(${getIcon(
                      'setting-system-structure-add.png'
                    )})`
                  }}
                />
                添加
              </Menu.Item>
              <Menu.Item key={E_OPE_TYPE.INSERT}>
                <em
                  style={{
                    backgroundImage: `url(${getIcon(
                      'setting-system-structure-insert.png'
                    )})`
                  }}
                />
                插入
              </Menu.Item>
              <Menu.Item key={E_OPE_TYPE.LEFT}>
                <em
                  style={{
                    backgroundImage: `url(${getIcon(
                      'setting-system-structure-left.png'
                    )})`
                  }}
                />
                升级
              </Menu.Item>
              <Menu.Item key={E_OPE_TYPE.RIGHT}>
                <em
                  style={{
                    backgroundImage: `url(${getIcon(
                      'setting-system-structure-right.png'
                    )})`
                  }}
                />
                降级
              </Menu.Item>
              <Menu.Item key={E_OPE_TYPE.UP}>
                <em
                  style={{
                    backgroundImage: `url(${getIcon(
                      'setting-system-structure-up.png'
                    )})`
                  }}
                />
                上移
              </Menu.Item>
              <Menu.Item key={E_OPE_TYPE.DOWN}>
                <em
                  style={{
                    backgroundImage: `url(${getIcon(
                      'setting-system-structure-down.png'
                    )})`
                  }}
                />
                下移
              </Menu.Item>
            </Menu>
          }
        >
          <span>
            更多
            <Icon type="down" />
          </span>
        </Dropdown>
      </div>
    )
  }

  private getDepartments(page: number, size: number) {
    const departments: TData[] = []
    for (let i = 0; i < size; i++) {
      departments.push({
        name: `四川赛狄信息技术股份公司${i}`,
        expire: '2019-10-08',
        ope: props => this.opes(props)
      })
    }
    this.setState({ loading: true })
    departments[2].children = [
      {
        name: 'child1',
        expire: '2019-10-08',
        ope: props => this.opes(props)
      },
      {
        name: 'child2',
        expire: '2019-10-08',
        ope: props => this.opes(props)
      }
    ]
    setTimeout(() => {
      this.setState({ departments, total: 0, loading: false })
    },         2000)
  }

  private onSearchDepartment() {
    const currentPage = 1
    const { pageSize } = this._table.state

    this._table.setState({ currentPage })
    this.getDepartments(currentPage, pageSize)
  }

  private onChangePageOrSize(page: number, size: number) {
    this.getDepartments(page, size)
  }

  private onVisibleEditStructure(visibleEditStructure: boolean, init?: any) {
    let editStructure: any = { name: '', expire: null }

    if (init) {
      editStructure = { id: init.id, name: init.name, expire: init.expire }
    }

    this.setState({ visibleEditStructure, editStructure })
  }

  private onConfirmStructure() {
    const form = this._editStructureForm.getForm()

    form.validateFields((err: any, values: any) => {
      if (err) {
        return
      }

      // Todo保存
      const { id } = this.state.editStructure
      const { name, expire } = values
      console.log(id, name, moment(expire).format(FORMAT_DATE))
      // form.resetFields()
      this.onVisibleEditStructure(false)
    })
  }

  constructor(props: IPropsStructure) {
    super(props)

    this.state = {
      departments: [],
      loading: false,
      total: 0,
      visibleEditStructure: false,
      editStructure: {
        name: '',
        expire: null
      },
      search: {
        company: '四川赛狄信息技术股份公司',
        departmentStatus: '有效部门'
      }
    }

    this.onConfirmStructure = this.onConfirmStructure.bind(this)
    this.onVisibleEditStructure = this.onVisibleEditStructure.bind(this)
    this.onChangePageOrSize = this.onChangePageOrSize.bind(this)
    this.onSearchDepartment = this.onSearchDepartment.bind(this)
    this.onSelectOpe = this.onSelectOpe.bind(this)
  }

  componentDidMount() {
    this.onSearchDepartment()
  }

  render() {
    const {
      loading,
      total,
      departments,
      search,
      visibleEditStructure,
      editStructure
    } = this.state

    return (
      <div className={`${style.structure} wp100 hp100 bsb pr`}>
        <div className="cb-ope">
          <Button
            type="primary"
            onClick={() => this.onVisibleEditStructure(true)}
          >
            新增
          </Button>
          <Button>导出</Button>
        </div>
        <div className="cb-search">
          <div className="cb-search-condition">
            <Select
              placeholder="请选择公司"
              value={search.company}
              onChange={company =>
                this.setState({ search: { ...search, company } })
              }
            >
              <Select.Option value="四川赛狄信息技术股份公司">
                四川赛狄信息技术股份公司
              </Select.Option>
              <Select.Option value="成都铭信达信息技术有限公司">
                成都铭信达信息技术有限公司
              </Select.Option>
            </Select>
            <Select
              placeholder="请选择部门类型"
              value={search.departmentStatus}
              onChange={departmentStatus =>
                this.setState({ search: { ...search, departmentStatus } })
              }
            >
              <Select.Option value="全部部门">全部部门</Select.Option>
              <Select.Option value="有效部门">有效部门</Select.Option>
              <Select.Option value="失效部门">失效部门</Select.Option>
            </Select>
          </div>
          <div className="cb-search-btn">
            <Button type="primary" onClick={this.onSearchDepartment}>
              搜索
            </Button>
          </div>
        </div>
        <div className="wp100 hp100">
          <Table
            ref={el => (this._table = el)}
            wrapperTbody={style.wrapperTbody}
            columns={this._columns}
            data={departments}
            loading={loading}
            total={total}
            changePage={this.onChangePageOrSize}
            changeSize={this.onChangePageOrSize}
          />
        </div>
        {/* 编辑 */}
        <Modal
          className={style.editStructureModal}
          title={`${editStructure.id ? '编辑' : '新增'}部门`}
          width={420}
          visible={visibleEditStructure}
          cancelText="取消"
          okText="确定"
          onOk={this.onConfirmStructure}
          onCancel={() => this.onVisibleEditStructure(false)}
        >
          <EditStructureForm
            ref={el => (this._editStructureForm = el)}
            {...editStructure}
          />
        </Modal>
      </div>
    )
  }
}

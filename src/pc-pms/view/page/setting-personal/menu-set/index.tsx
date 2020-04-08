import * as React from 'react'
import {} from 'react-router-dom'
import { Button, Popconfirm, Tree, Icon } from 'antd'
import { AntTreeNodeExpandedEvent } from 'antd/es/tree'

import Table, { TColumn, TData } from '../../../../component/table'
import Modal from '../../../../component/modal'
const style = require('./style')

interface IPropsMenuSet {}

interface IStateMenuSet {
  menus: TData[]
  loading: boolean
  total: number
  editMenuVisible: boolean
  expandeds: string[]
  checkedKeys: string[]
}

export default class MenuSet extends React.PureComponent<
  IPropsMenuSet,
  IStateMenuSet
> {
  private _table: Table = null
  private _columns: TColumn[] = [
    {
      label: '序号',
      field: 'index',
      width: 10
    },
    {
      label: '菜单名称',
      field: 'menu',
      width: 60
    },
    {
      label: '操作',
      field: 'ope',
      width: 30
    }
  ]

  private onUpMenu(menuId: any) {
    console.log('上移菜单', menuId)
  }

  private onDownMenu(menuId: any) {
    console.log('下移菜单', menuId)
  }

  private onDeleteMenu(menuId: any) {
    console.log('删除菜单', menuId)
  }

  // 操作
  private opes(props: TData) {
    const { menus } = this.state
    const { rowIdx, menuId } = props

    return (
      <div>
        <Popconfirm
          overlayClassName="cb-pop-confirm"
          placement="bottom"
          title="是否删除当前快捷菜单"
          onConfirm={() => this.onDeleteMenu(menuId)}
        >
          <span>删除</span>
        </Popconfirm>
        {rowIdx === 0 ? null : (
          <span onClick={() => this.onUpMenu(menuId)}>上移</span>
        )}
        {rowIdx === menus.length - 1 ? null : (
          <span onClick={() => this.onDownMenu(menuId)}>下移</span>
        )}
      </div>
    )
  }

  // 获取数据
  private getMenus(page: number, size: number) {
    const menus: TData[] = []
    for (let i = 0; i < size; i++) {
      menus.push({
        menu: `风险管理${i}`,
        ope: props => this.opes(props)
      })
    }
    this.setState({ loading: true })
    setTimeout(() => {
      this.setState({ menus, total: 1000, loading: false })
    },         2000)
  }

  private initMenus() {
    const currentPage = 1
    const { pageSize } = this._table.state

    this._table.setState({ currentPage })
    this.getMenus(currentPage, pageSize)
  }

  private onChangePageOrSize(page: number, size: number) {
    this.getMenus(page, size)
  }

  private onVisibleEditMenu(editMenuVisible: boolean) {
    this.setState({ editMenuVisible })
  }

  private onConfirmEditMenu() {
    console.log('hhh')
  }

  private onExpandMenuTree(keys: string[], data: AntTreeNodeExpandedEvent) {
    const { eventKey } = data.node.props
    const currKeys = eventKey.split('-')
    const expandeds: string[] = []
    data.expanded &&
      currKeys.forEach((key, idx) => {
        expandeds.push(currKeys.slice(0, idx + 1).join('-'))
      })

    this.setState({ expandeds })
  }

  private onCheckMenuTree(checkedKeys: string[]) {
    this.setState({ checkedKeys })
  }

  constructor(props: IPropsMenuSet) {
    super(props)

    this.state = {
      menus: [],
      loading: false,
      editMenuVisible: false,
      total: 0,
      expandeds: [],
      checkedKeys: []
    }

    this.onChangePageOrSize = this.onChangePageOrSize.bind(this)
    this.onConfirmEditMenu = this.onConfirmEditMenu.bind(this)
    this.onExpandMenuTree = this.onExpandMenuTree.bind(this)
    this.onCheckMenuTree = this.onCheckMenuTree.bind(this)
  }

  componentDidMount() {
    this.initMenus()
  }

  render() {
    const {
      menus,
      loading,
      total,
      editMenuVisible,
      expandeds,
      checkedKeys
    } = this.state
    const treeData = [
      { key: '业务中心', title: '业务中心' },
      { key: '流程审批', title: '流程审批' },
      { key: '工作协同', title: '工作协同' },
      {
        key: '个人设置',
        title: '个人设置',
        children: [
          { key: '修改密码', title: '修改密码' },
          { key: '个人信息', title: '个人信息' },
          { key: '消息列表', title: '消息列表' },
          { key: '在线反馈', title: '在线反馈' },
          { key: '使用帮助', title: '使用帮助' },
          { key: '快捷菜单设置', title: '快捷菜单设置' }
        ]
      },
      { key: '系统设置', title: '系统设置' }
    ]

    return (
      <div className={`${style.menus} wp100 hp100 bsb pr`}>
        <div className="cb-ope">
          <Button type="primary" onClick={() => this.onVisibleEditMenu(true)}>
            添加
          </Button>
        </div>
        <div className="wp100 hp100">
          <Table
            ref={el => (this._table = el)}
            wrapperTbody={style.wrapperTbody}
            columns={this._columns}
            data={menus}
            loading={loading}
            total={total}
            changePage={this.onChangePageOrSize}
            changeSize={this.onChangePageOrSize}
          />
        </div>
        {/* 添加快捷菜单 */}
        <Modal
          className={style.editMenuModal}
          title="添加快捷菜单"
          visible={editMenuVisible}
          cancelText="取消"
          okText="确定"
          onOk={this.onConfirmEditMenu}
          onCancel={() => this.onVisibleEditMenu(false)}
        >
          <Tree
            blockNode={true}
            checkable={true}
            checkStrictly={true}
            selectable={false}
            onCheck={this.onCheckMenuTree}
            checkedKeys={checkedKeys}
            treeData={treeData}
            // expandedKeys={expandeds}
            // onExpand={this.onExpandMenuTree}
          />
        </Modal>
      </div>
    )
  }
}

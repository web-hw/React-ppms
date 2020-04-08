import * as React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { Menu } from 'antd'

const style = require('./style')

interface IPropsAside extends RouteComponentProps {
  menus: { [propName: string]: any }
}

interface IStateAside {
  openMenus: string[]
  selectMenus: string[]
}

interface IPropsMenuItem {
  location: any
  menu: { [propName: string]: any }
}
// 菜单项
const MenuItem = (props: IPropsMenuItem) => {
  const { location, menu } = props
  const isMainMenu = menu.path === menu.root
  let icon = null

  // 是否是主菜单
  if (isMainMenu) {
    icon = menu.icon || require('../../../assets/images/page-aside-more.png')
  } else {
    icon = location.pathname.startsWith(menu.path)
      ? menu.actIcon
      : menu.defIcon || null
  }

  return (
    <div className="content">
      {!icon ? null : (
        <em
          className={isMainMenu ? 'part' : 'palt'}
          style={{
            backgroundImage: `url(${icon})`
          }}
        />
      )}
      {menu.title}
    </div>
  )
}

interface IPropsMenuItems {
  location: any
  menus: { [propName: string]: any }[]
}
// 递归菜单项
const getMenuItems = (props: IPropsMenuItems) => {
  const { menus, location } = props
  if (!menus || menus.length === 0) {
    return
  }

  return menus.map((menu: { [propName: string]: any }) => {
    const key = menu.path || menu.title

    // 无子菜单
    if (!menu.children || menu.children.length === 0) {
      return (
        <Menu.Item key={key}>
          <MenuItem location={location} menu={menu} />
        </Menu.Item>
      )
    }

    // 子菜单递归
    return (
      <Menu.SubMenu
        key={key}
        title={<MenuItem location={location} menu={menu} />}
      >
        {getMenuItems({ location, menus: menu.children })}
      </Menu.SubMenu>
    )
  })
}

export default withRouter(
  class Aside extends React.PureComponent<IPropsAside, IStateAside> {
    private onOpenChange(openMenus: string[]) {
      this.setState({ openMenus })
    }

    private onClickMenu(key: string) {
      this.setState({ selectMenus: [key] })
      this.props.history.push(key)
    }

    private getOpenKeys(menus: any[], path: string): any[] {
      for (let i = 0; i < menus.length; i++) {
        if (menus[i].path === path) {
          return [...menus[i].parents]
        }

        if (menus[i].children && menus[i].children.length) {
          return this.getOpenKeys(menus[i].children, path)
        }
      }

      return []
    }

    private initSelectMenu(
      menus: any,
      actMenu: string = this.props.location.pathname
    ) {
      const state: any = { selectMenus: [actMenu], openMenus: [] }
      if (actMenu && menus) {
        state.openMenus = this.getOpenKeys([menus], actMenu)
      }

      this.setState(state)
    }

    constructor(props: IPropsAside) {
      super(props)

      this.state = {
        openMenus: [],
        selectMenus: []
      }
    }

    componentDidMount() {
      this.initSelectMenu(this.props.menus)
    }

    componentWillReceiveProps(nextProps: IPropsAside) {
      if (
        nextProps.menus !== this.props.menus ||
        nextProps.location.pathname !== this.props.location.pathname
      ) {
        this.initSelectMenu(nextProps.menus, nextProps.location.pathname)
      }
    }

    render() {
      const { openMenus, selectMenus } = this.state
      const { menus, location } = this.props

      if (!menus) {
        return null
      }

      return (
        <aside className={`${style.aside} hp100 palt bsb zi600`}>
          <div className="wp100 hp100 pr bsb">
            <div className="aside-item palt">
              <MenuItem menu={menus} location={location} />
            </div>
            <div className="wp100 hp100 oay sb">
              <Menu
                mode="inline"
                selectedKeys={selectMenus}
                openKeys={openMenus}
                onOpenChange={openMenus => this.onOpenChange(openMenus)}
                onClick={({ key }) => this.onClickMenu(key)}
              >
                {getMenuItems({ location, menus: menus.children })}
              </Menu>
            </div>
          </div>
        </aside>
      )
    }
  }
)

import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import {} from 'antd'

import { StateUnmount } from 'global@component/state-unmount'
import { session } from 'global@util/storage'
import Header from '../component/header'
import Aside from '../component/aside'
import HisMenu from '../component/his-menu'
import { Routes, E_CREATE_ROUTE_PARENT, getMenusByPath } from '../../router'
import {
  PARENT_MENUS,
  CREATE_ROUTE_REDIRECT,
  routeMapping
} from '../../router/mapping'
const style = require('./style')

interface IPropsPage extends RouteComponentProps {}

interface IStatePage {
  menus: { [propName: string]: any } // 当前菜单项
  hisMenus: { title: string; path: string }[]
}

@StateUnmount
export default class Page extends React.Component<IPropsPage, IStatePage> {
  private HIS_MENUS = 'HIS_MENUS'
  private menuTimer: any = null

  // 获取当前菜单项
  private getMenus(path: string = this.props.location.pathname) {
    clearTimeout(this.menuTimer)
    this.menuTimer = setTimeout(() => {
      this.setState({ menus: getMenusByPath(path) })
      this.setHisMenus(path)
    },                          100)
  }

  private setHisMenus(path: string) {
    if (
      CREATE_ROUTE_REDIRECT[path] || // is redirect
      !PARENT_MENUS.find(m => path.startsWith(m)) // is not menu
    ) {
      return
    }

    const { hisMenus } = this.state
    const menu = hisMenus.find(m => m.path === path)
    if (!menu) {
      const menus = [{ path, title: routeMapping[path].title }, ...hisMenus]
      this.setState({ hisMenus: menus })
      session.set(this.HIS_MENUS, menus)
    }
  }

  private removeHistMenus(path: string) {
    const { hisMenus } = this.state
    const menuIdx = hisMenus.findIndex(m => m.path === path)
    if (menuIdx !== -1) {
      hisMenus.splice(menuIdx, 1)
      this.setState({ hisMenus: [...hisMenus] })
      session.set(this.HIS_MENUS, hisMenus)
    }
  }

  constructor(props: IPropsPage) {
    super(props)

    this.state = {
      menus: null,
      hisMenus: session.get(this.HIS_MENUS) || []
    }

    this.removeHistMenus = this.removeHistMenus.bind(this)
  }

  componentWillReceiveProps(nextProps: IPropsPage) {
    if (this.props.location.pathname !== nextProps.location.pathname) {
      this.getMenus(nextProps.location.pathname)
    }
  }

  componentDidMount() {
    this.getMenus()
  }

  render() {
    const { menus, hisMenus } = this.state

    return (
      <div className={`${style.page} wp100 hp100 bg-f0f0f0 oh fs0 pr bsb`}>
        <Header />
        <Aside menus={menus} />
        <section className={`${style.section} wp100 hp100 pr`}>
          <HisMenu menus={hisMenus} onDelMenu={this.removeHistMenus} />
          <div className={`${style.pageView} wp100 hp100 bsb p10`}>
            <Routes parent={E_CREATE_ROUTE_PARENT.PARENT_PAGE} />
          </div>
        </section>
      </div>
    )
  }
}

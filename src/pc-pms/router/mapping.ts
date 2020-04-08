import {
  ERROR_ROUTE_PATH,
  NOT_FOUND_PATH,
  LOGIN_ROUTE_PATH
} from 'global@constant'
import { ErrorPage, NotFound } from 'global@component/pc-routes-config'

export interface IMenuRouteMapping {
  strict?: boolean
  exact?: boolean
  icon?: string // icon || (defIcon & actIcon)
  defIcon?: string
  actIcon?: string
  parent?: string
  path?: React.ReactNode | string // 组件 | 懒加载路径
  isAuth?: boolean // 默认true
  isMenu?: boolean // 默认true
  title: string
}

export enum E_CREATE_ROUTE_PARENT {
  PARENT_NULL = 'null',
  PARENT_PAGE = '/page',
  PARENT_SETTING_PERSONAL = '/page/setting-personal',
  PARENT_SETTING_SYSTEM = '/page/setting-system',
  PARENT_SETTING_SYSTEM_MEMBER = '/page/setting-system/member',
  PARENT_WORK = '/page/work',
  PARENT_WORK_SHORTCUT_MENU = '/page/work/shortcut-menu'
}

// 由远到近设置
export const PARENT_MENUS = [
  E_CREATE_ROUTE_PARENT.PARENT_SETTING_SYSTEM,
  E_CREATE_ROUTE_PARENT.PARENT_SETTING_PERSONAL,
  E_CREATE_ROUTE_PARENT.PARENT_WORK
]

export const CREATE_ROUTE_REDIRECT: { [propName: string]: any[] } = {
  [E_CREATE_ROUTE_PARENT.PARENT_NULL]: [{ from: '/', to: '/page' }],
  [E_CREATE_ROUTE_PARENT.PARENT_PAGE]: [{ from: '/page', to: '/page/work' }],
  [E_CREATE_ROUTE_PARENT.PARENT_SETTING_PERSONAL]: [
    {
      from: '/page/setting-personal',
      to: '/page/setting-personal/update-password'
    }
  ],
  [E_CREATE_ROUTE_PARENT.PARENT_SETTING_SYSTEM]: [
    { from: '/page/setting-system', to: '/page/setting-system/member' }
  ],
  [E_CREATE_ROUTE_PARENT.PARENT_SETTING_SYSTEM_MEMBER]: [
    {
      from: '/page/setting-system/member',
      to: '/page/setting-system/member/company'
    }
  ],
  [E_CREATE_ROUTE_PARENT.PARENT_WORK]: [
    { from: '/page/work', to: '/page/work/personal-view' }
  ],
  [E_CREATE_ROUTE_PARENT.PARENT_WORK_SHORTCUT_MENU]: [] // Todo快捷菜单重定向
}

export const routeMapping: { [path: string]: IMenuRouteMapping } = {
  /***************** root 视图 *****************/
  '/page': {
    title: '首页',
    parent: null
  },
  [LOGIN_ROUTE_PATH]: {
    title: '登录',
    parent: null,
    isAuth: false
  },
  [ERROR_ROUTE_PATH]: {
    title: '错误',
    path: ErrorPage,
    parent: null,
    isAuth: false
  },
  [NOT_FOUND_PATH]: {
    title: '404',
    path: NotFound,
    parent: null,
    isAuth: false
  },

  /***************** 个人设置 视图 *****************/
  '/page/setting-personal': {
    title: '个人设置',
    parent: '/page'
  },
  '/page/setting-personal/update-password': {
    title: '修改密码',
    parent: '/page/setting-personal',
    defIcon: require('../assets/images/setting-personal-update-pwd-def.png'),
    actIcon: require('../assets/images/setting-personal-update-pwd-act.png')
  },
  '/page/setting-personal/inform': {
    title: '个人信息',
    parent: '/page/setting-personal',
    defIcon: require('../assets/images/setting-personal-inform-def.png'),
    actIcon: require('../assets/images/setting-personal-inform-act.png')
  },
  '/page/setting-personal/msg': {
    title: '消息列表',
    parent: '/page/setting-personal',
    defIcon: require('../assets/images/setting-personal-msg-def.png'),
    actIcon: require('../assets/images/setting-personal-msg-act.png')
  },
  '/page/setting-personal/feedback': {
    title: '在线反馈',
    parent: '/page/setting-personal',
    defIcon: require('../assets/images/setting-personal-feedback-def.png'),
    actIcon: require('../assets/images/setting-personal-feedback-act.png')
  },
  '/page/setting-personal/help-use': {
    title: '使用帮助',
    parent: '/page/setting-personal',
    defIcon: require('../assets/images/setting-personal-help-use-def.png'),
    actIcon: require('../assets/images/setting-personal-help-use-act.png')
  },
  '/page/setting-personal/menu-set': {
    title: '快捷菜单',
    parent: '/page/setting-personal',
    defIcon: require('../assets/images/setting-personal-menu-set-def.png'),
    actIcon: require('../assets/images/setting-personal-menu-set-act.png')
  },

  /***************** 系统设置 视图 *****************/
  '/page/setting-system': {
    title: '系统设置',
    parent: '/page'
  },
  '/page/setting-system/member': {
    title: '成员管理',
    parent: '/page/setting-system',
    defIcon: require('../assets/images/setting-system-module-def.png'),
    actIcon: require('../assets/images/setting-system-member-act.png')
  },
  '/page/setting-system/member/company': {
    title: '公司管理',
    parent: '/page/setting-system/member'
  },
  '/page/setting-system/member/structure': {
    title: '组织架构',
    parent: '/page/setting-system/member'
  },
  '/page/setting-system/member/role': {
    title: '角色管理',
    parent: '/page/setting-system/member'
  },
  '/page/setting-system/member/user': {
    title: '用户管理',
    parent: '/page/setting-system/member'
  },
  '/page/setting-system/module': {
    title: '模块配置',
    parent: '/page/setting-system',
    defIcon: require('../assets/images/setting-system-module-def.png'),
    actIcon: require('../assets/images/setting-system-module-def.png')
  },
  '/page/setting-system/other': {
    title: '其他',
    parent: '/page/setting-system',
    defIcon: require('../assets/images/setting-system-other-def.png'),
    actIcon: require('../assets/images/setting-system-other-def.png')
  },
  '/page/setting-system/perm': {
    title: '权限管理',
    parent: '/page/setting-system',
    defIcon: require('../assets/images/setting-system-perm-def.png'),
    actIcon: require('../assets/images/setting-system-perm-def.png')
  },

  /***************** 工作台 视图 *****************/
  '/page/work': {
    title: '工作台',
    parent: '/page'
  },
  '/page/work/personal-view': {
    title: '个人视图',
    parent: '/page/work',
    defIcon: require('../assets/images/work-personal-def.png'),
    actIcon: require('../assets/images/work-personal-act.png')
  },
  '/page/work/department-view': {
    title: '部门视图',
    parent: '/page/work',
    defIcon: require('../assets/images/work-department-def.png'),
    actIcon: require('../assets/images/work-department-act.png')
  },
  '/page/work/company-view': {
    title: '公司视图',
    parent: '/page/work',
    defIcon: require('../assets/images/work-company-def.png'),
    actIcon: require('../assets/images/work-company-act.png')
  },
  '/page/work/shortcut-menu': {
    title: '快捷菜单',
    parent: '/page/work',
    defIcon: require('../assets/images/work-menu-def.png'),
    actIcon: require('../assets/images/work-menu-act.png')
  } // Todo处理快捷菜单
}

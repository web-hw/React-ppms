import { RouterMapping } from 'global@component/router'
import {
  routesConfig,
  LoadingPage
} from 'global@component/mobile-routes-config'
import { ICRoutesMapping } from 'global@component/route'
import { LOGIN_ROUTE_PATH } from 'global@constant'
import App from '../view'

/**
 * lazy false -- { path: 'home', comp: Home }
 * lazy true -- 'home' | { path: 'home', comp: 'Home' }
 */
const routes: any = [
  'msg',
  'address-book',
  'group',
  'add-friend',
  'msg-verify',
  'phone-contact',
  'test',
  'about-us',
  'chat-person-msg',
  'update-nickname',
  'account-info',
  'update-pwd',
  'update-phone',
  'msg-set',
  'stranger',
  'chat-search',
  'iframe-other',
  'my-collect',
  { path: '/group-meeting/:groupId/:groupChatId', comp: 'group-meeting' },
  {
    path: '/group-meeting-detail/:groupId/:groupChatId/:id?',
    comp: 'group-meeting-detail'
  },
  { path: '/chat-person-file/:toName/:toChatId', comp: 'chat-person-file' },
  { path: '/report-complaint/:toId', comp: 'report-complaint' },
  { path: '/chat-search-more/:data', comp: 'chat-search-more' },
  { path: '/company-page/:id', comp: 'company-page' },
  { path: '/position-send/:chatType/:chatId', comp: 'position-send-v1' },
  {
    path: '/group-chat-msgs/:name/:id/:chatId/:type/:keyword?',
    comp: 'group-chat-msgs'
  },
  {
    path: '/single-chat-msgs/:name/:id/:chatId/:type/:keyword?',
    comp: 'single-chat-msgs'
  },
  {
    path: '/position-msg-send/:chatType/:chatId/:target',
    comp: 'position-msg-send'
  },
  {
    path: '/iframe-other/:data',
    comp: 'iframe-other'
  },
  {
    path: '/group-notice/:mng/:id/:chatId',
    comp: 'group-notice'
  },
  { path: '/bus-card-share/:chatType/:toChatId', comp: 'bus-card-share' },
  { path: '/assign-group/:id/:chatId?', comp: 'assign-group' },
  { path: '/remove-group-member/:id/:chatId?', comp: 'remove-group-member' },
  { path: '/group-member/:id/:chatId?', comp: 'group-member' },
  { path: '/select-contact/:id/:chatId?', comp: 'select-contact' },
  { path: '/sys-info/:id', comp: 'sys-info' },
  { path: '/add-send/:id', comp: 'add-send' },
  { path: '/group-set/:id/:chatId?', comp: 'group-set' },
  { path: '/msg-info-detail/:id', comp: 'msg-info-detail' },
  { path: '/avatar/:type/:id/:chatId?', comp: 'avatar' },
  { path: '/edit-name-group/:id?/:chatId?', comp: 'group-name-edit' },
  { path: '/chat/:chatType/:data', comp: 'chat' },
  { path: LOGIN_ROUTE_PATH, comp: 'login', meta: { auth: false } },
  { path: '/register', comp: 'register', meta: { auth: false } },
  { path: '/app-share', comp: 'app-share', meta: { auth: false } },
  // { path: '/my-position-select/:from/:type?', comp: 'my-position-select' },
  { from: '/', to: '/msg' },
  ...routesConfig
  // 'my',
  // 'pro-mkt',
  // 'comment',
  // 'comment-detail',
  // 'info-detail',
  // 'find',
  // 'add-send',
  // 'msg',
  // 'add-friend',
  // 'phone-contact',
  // 'msg-verify',
  // 'sys-info',
  // 'group',
  // 'stranger',
  // 'address-book',
  // 'group-member',
  // 'remove-group-member',
  // 'select-contact',
  // 'group-set',
  // 'shopping-address',
  // 'pay',
  // 'my-order',
  // 'apply-aftermarket',
  // 'order-aftermarket',
  // 'good-comment',
  // 'order-confirm',
  // 'invoice-msg',
  // 'order-detail',
  // 'service-ticket-detail',
  // 'shopping-cart',
  // 'product-list',
  // 'good-detail',
  // 'search-good',
  // 'search-res-good',
  // 'bid-demand',
  // 'demand-done', // 将被移除
  // { path: '/task-detail/demand-done', comp: 'task-detail/demand-done' },
  // 'bid-winner-details', // 将被移除
  // {
  //   path: '/task-detail/bid-winner-details',
  //   comp: 'task-detail/bid-winner-details'
  // },
  // 'task-detail',
  // 'task-comment',
  // 'partake-biding',
  // 'partake-biding-suc',
  // 'my-task',
  // 'my-task-follow',
  // 'my-task-release',
  // 'task-release',
  // 'demand-docking', // 将被移除
  // 'the-winner', // 将被移除
  // 'demand-calibration', // 将被移除
  // 'end-calibration', // 将被移除
  // { path: '/task-detail/end-calibration', comp: 'task-detail/end-calibration' },
  // 'end-docking', // 将被移除
  // { path: '/task-detail/end-docking', comp: 'task-detail/end-docking' },
  // 'win-hint', // 将被移除
  // { path: '/task-detail/win-hint', comp: 'task-detail/win-hint' },
  // 'win-through', // 将被移除
  // { path: '/task-detail/win-through', comp: 'task-detail/win-through' },
  // 'task-release-suc',
  // 'task-release-target',
  // 'task-bidder',
  // { path: '/task-detail/tender-bid', comp: 'task-detail/tender-bid' },
  // 'expert-auth',
  // 'experts',
  // 'expert',
  // { path: '/expert-detail/:type?', comp: 'expert-detail' },
  // { path: '/expert-notice-edit/:id?', comp: 'expert-notice-edit' },
  // { path: '/expert-achieve/:type', comp: 'expert-achieve' },
  // 'expert-achieve-edit',
  // 'expert-notice',
  // 'expert-personal',
  // 'expert-search',
  // 'expert-personal-msg',
  // 'editor',
  // 'report-complaint',
  // 'info-msg',
  // { path: '/task-detail/bid', comp: 'task-detail/bid' },
  // { path: '/task-detail/follow', comp: 'task-detail/follow' },
  // { path: '/task/:type?', comp: 'task' },
  // { path: '/my-position-select/:from/:type?', comp: 'my-position-select' },
  // { path: '/edit-shopping-address/:id?', comp: 'edit-shopping-address' },
  // { path: '/msg-info-detail/:type?', comp: 'msg-info-detail' },
  // { path: '/chat/:type?', comp: 'chat' },
  // 'position-send',
  // { path: '/home', comp: 'home', meta: { auth: false } },
  // { path: '/test', comp: 'test', meta: { auth: false } },
  // { path: LOGIN_ROUTE_PATH, comp: 'login', meta: { auth: false } },
  // { path: '/register', comp: 'register', meta: { auth: false } },
  // { path: '/login-phone', comp: 'login-phone', meta: { auth: false } },
  // {
  //   path: '/phone-location/:from',
  //   comp: 'phone-location',
  //   meta: { auth: false }
  // },
  // {
  //   path: '/forget-password/:type?',
  //   comp: 'forget-password',
  //   meta: { auth: false }
  // },
  // { from: '/', to: '/home' },

  // // 人脉商圈
  // 'bus-circle',

  // ...routesConfig
]

export default RouterMapping({
  App,
  routes,
  base: 'view',
  lazy: true,
  Loading: LoadingPage
})

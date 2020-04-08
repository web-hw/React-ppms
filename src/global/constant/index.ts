export const LOGIN_MSG = 'LOGIN_MSG' // 登录信息存储key

/************** 全局 route path *****************/
export const ERROR_ROUTE_PATH = '/error' // 错误页
export const LOGIN_ROUTE_PATH = '/login' // 登录页
export const NOT_FOUND_PATH = '/404' // 404

/******************全局key********************/
export const HISTORY_STATE = 'HISTORY_STATE'

export const PHONE_LOCATION = '+86'

/*******************正则**********************/
// 手机号
export const PHONE_REG = /^1[3456789]\d{9}$/
// 银行卡
export const ID_BANK_REG = /^(998801|998802|622525|622526|435744|435745|483536|528020|526855|622156|622155|356869|531659|622157|627066|627067|627068|627069)\d{10}$/
// 身份证
export const ID_CARD_REG = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/

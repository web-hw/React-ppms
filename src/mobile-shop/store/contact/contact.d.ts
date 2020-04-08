export interface IFriend {
  id: string // 用户id
  name: string // 登录账号
  head_img: string // 头像
  chat_id: string // 聊天id
  realname: string // 真实姓名
  nickname: string // 昵称
}

export interface ICompanyGroup {
  pid: string
  id: string
  chat_id: string
  name: string
  head_img: string
  children: ICompanyGroup[]
}

export interface IBooks {
  // 公司群
  company_group: ICompanyGroup[]
  // 好友
  friend: {
    lower: string
    upper: string
    data: IFriend[]
  }[]
}

export interface IGroup {
  id: string
  name: string
  chat_id: string
  head_img: string
  is_member: 1 | 0
}

export interface IUser {
  bname: string // 企业店铺
  head_img: string
  id: string
  chat_id: string
  is_blacklist: 1 | 0
  is_member: 2 | 1 | 0 // 0自己 1好友 2陌生人
  name: string // 账号
  product_brand: string // 主营信息
  profession: string // 职称
  realname: string
  nickname: string
  trade: string // 所属行业
  type: '1' | '2' | '3' | '4' | '5' // 1个人账号，2公司/单位，3专家，4从业者，5供应商
  user_type: string // 认证信息
  sex?: '1' | '2'
  bind_phone?: string
  address_detail: string
}

export interface IVerify {
  id?: string
  status?: '0' | '1' | '2' // 被添加好友或者被邀请进群的状态（0:申请/1:通过/2:拒绝）
  join_group_state?: '0' | '1' | '2' | '3' // 加群状态由管理员修改(0:申请/1:通过/2拒绝/3退群)
  remind_type?: 1 | 2 | 3 | 4 // 验证消息类型(1:加群邀请验证2:申请好友验证3：管理员验证群消息，4：退出群聊)
  username?: string
  group_name?: string
  message?: string
  head_img?: string
  created_at?: string
  position?: string
  chat_id?: string
  apply_account_id?: string // 申请人id | 邀请人id
  chat_group_id?: string // 群id
  join_account_id?: string // 加入群的人 | 退群id
}

export interface IPhone {
  lower: string
  upper: string
  data: {
    id: string
    head_img: string
    name: string
    mobiles: string
  }[]
}

export interface IGroupDetail {
  id?: string
  chat_id?: string
  name?: string
  group_no?: string
  head_img?: string
  join_type?: '0' | '1' | '2' // 0:允许任何人加群/1:需要群主验证/2:不允许任何人主动加群
  is_admin?: 1 | 0 // 1群主 | 0成员
  admin_id?: string
  status?: 0 | 1 // 群消息状态
  group_type?: 'chat_group' | 'deparment' | 'group' // group 讨论组 chat_group 自建群 deparment 部门
  members?: {
    id?: string
    head_img?: string
  }[]
  notice?: {
    id?: string
    notice?: string
  }
  meet?: {
    title?: string
    start_time?: string
  }
}

export interface INotice {
  id?: string
  username?: string
  notice?: string
  group_id?: string
  head_img?: string
  created_at?: string
}

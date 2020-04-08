export interface ILogin {
  name: string
  password: string
}

export interface IRegister {
  name: string
  bind_phone: string
  code: string
  password: string
  status: 1 // 是否同意注册协议
}

export interface ICaptcha {
  name: string // 手机号
  status: 1 | 2 // 1找回密码 2注册
}

export interface IInfo {
  id?: string
  name?: string
  access_token?: string
  realname?: string
  head_img?: string
  bind_phone?: string
  chat_id?: string
  company_name?: string
  pet_name?: string
  last_time?: string
  cb_nickname?: string
  sex?: string
  department_name?: string
  receive_status?: '1' | '0'
}

export interface ICollect {
  id?: string
  name?: string
  poster?: string
  size?: string
  type?: string
  url?: string
  icon?: string
  from_name?: string
  form_chat_id?: string
  collect_time?: string
}

import { observable, action, runInAction } from 'mobx'

import { getPlus } from 'global@util/plus'
import { ams } from 'global@util/init'
import { LOGIN_MSG } from 'global@constant'
import { cache, session } from 'global@util/storage'
import { REPEAT_SEND } from '../../constant'
import { http, fetch } from '../../connect'
import { chat } from '../chat'
import { ILogin, IInfo, IRegister, ICaptcha, ICollect } from './user'

export default class User {
  @observable collects: ICollect[] = []
  @observable info: IInfo = {
    id: '',
    name: '',
    access_token: '',
    realname: '',
    head_img: '',
    bind_phone: '',
    chat_id: '',
    company_name: '',
    pet_name: '',
    cb_nickname: '',
    last_time: '',
    sex: '',
    department_name: '',
    receive_status: '1'
  }

  @action async onLogin(data: ILogin) {
    const getClientId = () =>
      new Promise((resolve, reject) => {
        let clientId = ''
        let num = 0

        const getInfo = () => {
          const INFO_KEY = 'CACHE_CLIENT_INFO'
          const INFO_TIME = 15 * 24 * 60 * 60 * 1000

          getPlus()
            .then((plus: any) => {
              // 获取缓存
              const cacheInfo = (cache.get(INFO_KEY) || {})[data.name] || {}
              if (cacheInfo.clientid) {
                resolve(cacheInfo.clientid)
              } else {
                const info = plus.push.getClientInfo()
                clientId = info.clientid
                num += 1
                if (clientId && clientId !== 'null') {
                  cache.set(INFO_KEY, { [data.name]: info }, INFO_TIME)
                  resolve(clientId)
                } else {
                  if (num > 4) {
                    cache.set(INFO_KEY, { [data.name]: {} }, INFO_TIME)
                    resolve('')
                  } else {
                    setTimeout(getInfo, 500)
                  }
                }
              }
            })
            .catch(reject)
        }

        getInfo()
      })

    let clientId: any = ''
    let device = ''

    try {
      clientId = await getClientId()
    } catch (err) {
      console.log(err.message)
    } finally {
      if (clientId) {
        const u = navigator.userAgent
        const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1
        const isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
        device = isIOS ? 'ios' : isAndroid ? 'android' : ''
      }
    }

    const result: any = await http.fetch('/my/login', {
      method: 'POST',
      data: {
        ...data,
        clientId,
        device
      }
    })

    const { user } = result.data || {}
    await this.getInfo({ ...user })
    chat.createWs()
  }

  @action async getInfo(data?: IInfo) {
    if (data) {
      const {
        id = '',
        name = '',
        access_token = '',
        realname = '',
        head_img = '',
        bind_phone = '',
        chat_id = '',
        company_name = '',
        pet_name = '',
        last_time = '',
        sex = '',
        department_name = '',
        receive_status = '1'
      } = data

      runInAction(() => {
        this.info = {
          id,
          name,
          chat_id,
          access_token,
          realname,
          head_img,
          bind_phone,
          company_name,
          pet_name,
          last_time,
          sex,
          department_name,
          receive_status,
          cb_nickname: pet_name || realname || name || ''
        }
        cache.set(LOGIN_MSG, this.info, 7 * 24 * 60 * 60 * 1000)
      })
    } else {
      // Todo 获取用户信息
    }
  }

  @action async onRegister(data: IRegister) {
    return await http.fetch('/my/register', {
      data,
      method: 'POST'
    })
  }

  @action async getCaptcha(data: ICaptcha) {
    return await http.fetch('/my/checkverify', {
      data,
      method: 'POST'
    })
  }

  @action async getCaptchaOfPwd(data: { bind_phone: string }) {
    return await fetch('/account/modifysms', {
      data,
      method: 'POST'
    })
  }

  @action async updatePwd(data: { code: string; password: string }) {
    return await fetch('/account/modifypwd', {
      data,
      method: 'POST'
    })
  }

  @action async getCaptchaOfPhone(data: { bind_phone: string }) {
    return await fetch('/account/modify-mobile-sms', {
      data,
      method: 'POST'
    })
  }

  @action async checkCaptchaOfPhone(data: { code: string }) {
    return await fetch('/account/check-code', {
      data,
      method: 'POST'
    })
  }

  @action async getCaptchaOfNewPhone(data: { bind_phone: string }) {
    return await fetch('/account/new-mobile-sms', {
      data,
      method: 'POST'
    })
  }

  @action async updatePhone(data: { bind_phone: string; code: string }) {
    return await fetch('/account/modify-new-mobile', {
      data,
      method: 'POST'
    })
  }

  @action async updateSex(data: { sex: '1' | '2' }) {
    return await fetch('/account/set-sex', {
      data,
      method: 'POST'
    })
  }

  @action async getCompanyDetail(data: { id: string }) {
    return await fetch('/chat/company-index', { data, method: 'POST' })
  }

  @action async updateStatus(data: { status: '1' | '0' }) {
    return await fetch('/account/set-receive', { data, method: 'POST' })
  }

  @action async isResetLogin(type?: 'init') {
    const result = await fetch('/chat/user')
    const data = result.data || {}
    if (data.code === 200 && data.user) {
      await this.getInfo(data.user)

      // 设置登录时间
      if (type === 'init') {
        this.updateLoginTime()
        chat.createWs()
      }
    }
  }

  @action async editUser(data: { head_img?: File; pet_name?: string }) {
    const formData = new FormData()
    Object.keys(data).forEach((k: 'head_img' | 'pet_name') =>
      formData.append(k, data[k])
    )
    const result = await fetch('/message/edit-user', {
      data: formData,
      method: 'POST'
    })
    const dt = result.data || {}
    if (dt.code === 200) {
      await this.isResetLogin()
    }
  }

  @action async updateLoginTime() {
    await fetch('/chat/set-time')
  }

  @action async getCollects(type: any, toChatId: string) {
    const result = await fetch('/message/user-collect', {
      method: 'POST',
      data: { type, toChatId }
    })
    const data = result.data || {}
    const collect = data.collect || []
    runInAction(() => (this.collects = [...collect]))
  }

  @action async deleteCollects(ids: string[]) {
    return await fetch('/message/delete-collect', {
      method: 'POST',
      data: { ids }
    })
  }

  @action logout() {
    chat.closeWs() // 关闭连接
    session.remove(REPEAT_SEND) // 清空转发内容
    cache.remove(LOGIN_MSG) // 清空缓存
    this.getInfo(cache.get(LOGIN_MSG) || {}) // 清空信息
    ams.get().history.replace('/login')
  }

  @action async myCollect(type: string, keyword: string = '') {
    return await fetch('/message/my-collect', {
      method: 'POST',
      data: { type, keyword }
    })
  }

  constructor() {
    this.getInfo(cache.get(LOGIN_MSG) || {})
  }
}

export const user = new User()

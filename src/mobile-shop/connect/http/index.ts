import { Http, IDefOptions, IOptions } from 'global@util/connect/http'
import { toast } from 'global@util/toast/mobile'
import { user } from '../../store'

const config: IDefOptions = {
  // baseUrl: 'http://mobile.amisheng.com',
  headers: {
    token: ''
  },
  errCb(err) {
    if (err.status === 401) {
      user.logout()
    } else {
      toast.info(err.message)
    }
  }
}

// 不需要token
export const http = new Http(config)

// 需要token
export const fetch = async (url: string, options: IOptions = {}) => {
  const headers = {
    'access-token': user.info.access_token || '',
    ...(options.headers || {})
  }
  return await http.fetch(url, { ...options, headers })
}

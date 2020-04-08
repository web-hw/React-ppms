import { ams } from 'global@util/init'
import { toast } from 'global@util/toast/pc'
import { Http, IDefOptions } from 'global@util/connect/http'

const config: IDefOptions = {
  headers: {
    token: 'test'
  },
  errCb(err) {
    if (err.status === 401) {
      ams.get().history.push('/login')
    } else {
      toast.error(err.message)
    }
  }
}

export const http = new Http(config)

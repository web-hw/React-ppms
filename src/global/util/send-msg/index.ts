import { getPlus } from '../plus'

interface ISendMsg {
  phones: string[]
  body: string
}

const sendMsgByJS = (param: ISendMsg) => {
  const { phones = [], body = '' } = param
  const phonestr = phones.join(',')
  if (!phonestr || !body) {
    return
  }

  // 发送消息
  const a = document.createElement('a')
  a.href = `sms:${phonestr}?&body=${body}`

  a.click()
}

export const sendMsgByPlurOrJS = (
  param: ISendMsg,
  callback: (type: 'success' | 'error', data?: Error) => void
) => {
  getPlus()
    .then((plus: any) => {
      const { phones = [], body = '' } = param
      if (phones.length === 0 || !body) {
        return
      }

      const msg = plus.messaging.createMessage(plus.messaging.TYPE_SMS)
      msg.to = phones
      msg.body = body
      // msg.silent = true
      plus.messaging.sendMessage(
        msg,
        () => callback('success'),
        (err: any) => callback('error', err)
      )
    })
    .catch((err: any) => {
      if (err.code === 404) {
        sendMsgByJS(param)
      } else {
        callback('error', err)
      }
    })
}

export const telByPlusOrJS = (mobile: string) => {
  // <a href="tel:0147-88469258"></a>
  getPlus()
    .then((plus: any) => {
      plus.device.dial(mobile, true)
    })
    .catch((err: any) => {
      if (err.code === 404) {
        const a = document.createElement('a')
        a.href = `tel:${mobile}`
        a.click()
      } else {
        console.log(err)
      }
    })
}

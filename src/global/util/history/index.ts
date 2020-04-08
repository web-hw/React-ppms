import { getPlus } from '../plus'
import { toast } from '../toast/mobile'
import { session } from 'global@util/storage'
import { HISTORY_STATE } from 'global@constant'

// 监听回退事件
export const onChangeURL = () => {
  // // 添加自定义事件
  // const oncbrefresh = new CustomEvent('oncbrefresh')

  // // 触发刷新事件
  // window.onload = null
  // window.onload = function (e: any) {
  //   window.dispatchEvent(oncbrefresh)
  // }

  // hash 监听
  window.onhashchange = null
  window.onhashchange = function (e: any) {
    const { newURL = '', oldURL = '' } = e || {}
    const toIdx = newURL.indexOf('#/')
    const fromIdx = oldURL.indexOf('#/')
    if (toIdx === -1 || fromIdx === -1) {
      return
    }
    const to = newURL.slice(toIdx + 1)
    const from = oldURL.slice(fromIdx + 1)
    const his = session.get(HISTORY_STATE) || []
    // 后退
    const backIdx = his.findIndex((h: string) =>
      h.startsWith(`${to}_$_${from}`)
    )
    // if (backIdx !== -1) {
    //   window.dispatchEvent(
    //     new CustomEvent('oncbback', { detail: his[backIdx] })
    //   )
    // } else {
    //   const val = `${from}_$_${to}`
    //   const oldIdx = his.findIndex((h: string) => h.startsWith(val))
    //   if (oldIdx !== -1) {
    //     // 前进
    //     window.dispatchEvent(
    //       new CustomEvent('oncbforward', { detail: his[oldIdx] })
    //     )
    //   } else {
    //     his.push(`${val}_$_${Date.now()}`)
    //   }
    // }
    if (backIdx === -1) {
      const val = `${from}_$_${to}`
      const oldIdx = his.findIndex((h: string) => h.startsWith(val))
      if (oldIdx === -1) {
        his.push(`${val}_$_${Date.now()}`)
      }
    }
    session.set(HISTORY_STATE, his)
  }

  // // 监听自定义事件
  // window.addEventListener('oncbrefresh', (e) => {
  //   console.log('刷新', e)
  // })
  // window.addEventListener('oncbforward', (e: any) => {
  //   const url = e.detail || ''
  //   const to = url.split('_')[1]
  //   to && ams.get().history.replace(to)
  // })
  // window.addEventListener('oncbback', (e: any) => {
  //   const url = e.detail || ''
  //   const to = url.split('_')[0]
  //   to && ams.get().history.replace(to)
  // })
}

// 监听物理返回事件
export const onBackButton = (
  config: { [from: string]: string },
  callback: (url: 0 | -1 | string, rootCallback: () => void) => void
) => {
  getPlus()
    .then((plus: any) => {
      let first: any = null

      plus.key.addEventListener('backbutton', () =>
        goBack(config, (url: 0 | -1 | string) => {
          callback(url, () => {
            if (first && Date.now() - first < 1000) {
              plus.runtime.quit() // 退出引用
            } else {
              first = Date.now()
              toast.info('再按一次退出应用', 1)
            }
          })
        })
      )
    })
    .catch(err => console.log(err.message))
}

export const goBack = (
  config: { [from: string]: string },
  callback: (url: string | -1 | 0) => void
) => {
  let url = ''
  const hashIdx = location.href.indexOf('#/')
  if (hashIdx !== -1) {
    url = location.href.slice(hashIdx + 1)
  }
  let toURL: string | -1 | 0 = null

  try {
    // 默认返回上一级
    if (!url) {
      toURL = -1
    } else {
      if (config[url] !== undefined) {
        // 指定路由 | null(根)
        toURL = config[url]
      } else {
        // 返回跳转连接
        const his = session.get(HISTORY_STATE) || []
        let result: any = []
        his.forEach((h: string) => {
          const arr = h.split('_$_')
          if (arr.length === 3 && arr[1] === url) {
            result.push({
              from: arr[0],
              to: arr[1],
              key: arr[2]
            })
          }
        })

        result = result.sort((a: any, b: any) => b.key - a.key)
        const target = result[0] || {}
        toURL = target.from ? target.from : -1
      }
    }
  } catch (err) {
    toURL = Object.keys(config).find(k => config[k] === null) || '/'
  } finally {
    callback(toURL)
  }
}

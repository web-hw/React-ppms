import { toast } from 'global@util/toast/mobile'

// 验证是否为空
export const isEmpty = (val: string) => val.trim() === ''

// 验证登录密码是否满足对于规则
export const isLegalLoginPwd = (val: string) => {
  // 密码长度为6-32位，须包含数字、字母、符号至少2中或以上元素
  const reg = {
    l: 'a-zA-Z',
    n: '0-9',
    s: 'W~!@#$%^&*?'
  }

  return new RegExp(
    `^(?![${reg.l}]+$)(?![${reg.n}]+$)(?![${reg.s}]+$)[${reg.l}${reg.n}${reg.s}]{6,32}$`
  ).test(val)
}

// 是否相等
export const isEqual = (oldVal: string, newVal: string) => oldVal === newVal

// 检查重置密码
export const validResetPwd = {
  password(val: string) {
    let msg = ''
    if (isEmpty(val)) {
      msg = '新密码不能为空'
    } else if (!isLegalLoginPwd(val)) {
      msg = '新密码格式错误'
    }

    if (msg) {
      toast.info(msg)
    }

    return !msg
  },

  surePwd(oldVal: string, newVal: string) {
    let msg = ''

    if (isEmpty(newVal)) {
      msg = '确认密码不能为空'
    } else if (!isEqual(oldVal, newVal)) {
      msg = '两次密码不一致'
    }

    if (msg) {
      toast.info(msg)
    }

    return !msg
  }
}

// 检查验证码
export enum E_CAPTCHA_Type {
  NUM = '[0-9]{6}',
  IMG = '[a-zA-Z0-9]{4}'
}
export const validCaptcha = {
  // 提交检查
  captcha(val: string, type: E_CAPTCHA_Type = E_CAPTCHA_Type.NUM) {
    const reg = `^${type}$`
    let msg = ''

    if (isEmpty(val)) {
      msg = '验证码不能为空'
    } else if (!new RegExp(reg).test(val)) {
      msg = '验证码格式错误'
    }

    if (msg) {
      toast.info(msg)
    }

    return !msg
  },

  // 输入的检查
  change(val: string) {
    return /^[0-9]{0,6}$/.test(val)
  }
}

export const validInput = {
  // 限制输入框输入纯数字
  number(event: any) {
    return /[\d]/.test(String.fromCharCode(event.keyCode))
  }
}

export const validPhone = (val: string, isShowInfo: boolean = true) => {
  let msg = ''

  if (isEmpty(val)) {
    msg = '手机号不能为空'
  } else if (!/^1[34578]\d{9}$/.test(val)) {
    msg = '手机号格式错误'
  }

  if (msg && isShowInfo) {
    toast.info(msg)
  }

  return !msg
}

export const validUsername = (val: string) => {
  let msg = ''
  const reg = {
    l: 'a-zA-Z',
    n: '0-9',
    s: 'W~!@#$%^&*?'
  }
  if (isEmpty(val)) {
    msg = '账号不能为空'
  }
  // } else if (
  //   !new RegExp(
  //     `^(?![${reg.l}]+$)(?![${reg.n}]+$)[${reg.l}${reg.n}${reg.s}]{6,18}$`
  //   ).test(val)
  // ) {
  //   msg = '账号为6~18位，数字、字母、特殊字符至少2种的组合'
  // }

  if (msg) {
    toast.info(msg)
  }

  return !msg
}

export const validLoginPwd = (val: string) => {
  let msg = ''
  if (isEmpty(val)) {
    msg = '密码不能为空'
  } else if (val.length < 6 || val.length > 32) {
    msg = '密码为6~32位'
  }
  // } else if (!isLegalLoginPwd(val)) {
  //   msg = '密码为6~32位，数字、字母、特殊字符至少2种的组合'
  // }

  if (msg) {
    toast.info(msg)
  }

  return !msg
}

/**************** 策略模式 ********************/
const strategies: { [propName: string]: Function } = {
  isNonEmpty(val: string, errorMsg: string) {
    if (val === '') {
      return errorMsg
    }
  }
}

type TRule = { strategy: string; errorMsg?: string }
class Validator {
  private _cache: Function[] = []

  static createValidator() {
    const validator = new Validator()

    // 添加规则
    // validator.add(dom, [])

    return validator.start()
  }

  add(dom: HTMLInputElement, rules: TRule[]) {
    rules.forEach((rule: TRule) => {
      const { strategy, errorMsg } = rule
      const strategyArgs = strategy.split(':')

      this._cache.push(() => {
        const strategy = strategyArgs.shift()

        strategyArgs.unshift(dom.value)
        strategyArgs.push(errorMsg || dom.getAttribute('placeholder') || '')

        return strategies[strategy].apply(dom, strategyArgs)
      })
    })
  }

  start() {
    for (let i = 0, validatorFn; (validatorFn = this._cache[i++]); ) {
      const errorMsg = validatorFn()
      if (errorMsg !== undefined) {
        return errorMsg
      }
    }
  }
}

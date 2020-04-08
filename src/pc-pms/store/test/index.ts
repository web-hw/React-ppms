import { observable } from 'mobx'

class Test {
  @observable test = '这是mobx'
}

export const test = new Test()

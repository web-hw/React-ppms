import { observable, runInAction, action } from 'mobx'
import { getContacts, E_CONTACT_TYPE } from 'global@util/address-book'
import { zhSort } from 'global@util/zh-sort'
import { toast } from 'global@util/toast/mobile'
import { session } from 'global@util/storage'
import { fetch } from '../../connect'
import {
  IBooks,
  IGroup,
  IUser,
  IVerify,
  IPhone,
  IGroupDetail,
  INotice
} from './contact'

export default class Contact {
  // notices
  @observable notices: INotice[] = []

  // 我的群组
  @observable groups: IGroup[] = []

  // 用户详情
  @observable user: IUser = {
    id: '',
    bname: '',
    head_img: '',
    chat_id: '',
    is_member: 0,
    name: '',
    product_brand: '',
    profession: '',
    realname: '',
    nickname: '',
    trade: '',
    type: '1',
    user_type: '',
    sex: null,
    is_blacklist: 0,
    bind_phone: '',
    address_detail: ''
  }

  // 验证列表
  @observable verifies: IVerify[] = []

  // 验证消息
  @observable verify: IVerify = {}

  // 手机通讯录
  @observable phones: IPhone[] = []

  // 群详情
  @observable groupDetail: IGroupDetail = {}

  // 通讯录
  @observable books: IBooks = { company_group: [], friend: [] }

  // 获取通讯录
  @action async getBooks() {
    // 获取数据
    const { data } = await fetch('/chat/list')
    const { company_group = [], friend = [] } = data || {}
    runInAction(
      () =>
        (this.books = {
          company_group,
          friend: zhSort({ key: 'realname', data: friend })
        })
    )
  }
  // 获取我的群组
  @action async getGroups(keyword: string = '') {
    const url = keyword ? '/chat/searchgroup' : '/chat/mygroup'

    const { data } = await fetch(url, { method: 'POST', data: { keyword } })
    runInAction(() => (this.groups = (data || {}).groups || []))
  }

  // 邀请群成员
  @action async addGroupMembers(groupId: string, accountId: string[]) {
    return await fetch('/chat/invite-join-group', {
      method: 'POST',
      data: { group_id: groupId, account_id: accountId }
    })
  }

  // 编辑群
  @action async editGroup(data: {
    // id?: string
    chat_id?: string
    name?: string // 名称
    head_img?: File // 头像
    admin_id?: string // 转让群主
  }) {
    const url = data.chat_id ? '/chat/edit-group' : '/chat/addgroup'
    const formData = new FormData()
    Object.keys(data).forEach(
      (d: 'name' | 'head_img' | 'admin_id' | 'chat_id') =>
        formData.append(d, data[d])
    )
    return await fetch(url, { data: formData, method: 'POST' })
  }

  // 搜索关键字好友
  @action async searchFriendByKeyword(keyword: string) {
    return await fetch('/chat/search-friend', {
      method: 'POST',
      data: { keyword }
    })
  }

  // 根据id搜索用户
  @action async getUserById(userId: string) {
    const result = await fetch('/chat/user-detail', {
      method: 'POST',
      data: { id: userId }
    })
    const {
      account_id = '',
      bname = '',
      head_img = '',
      chat_id = '',
      is_member = 0,
      name = '',
      product_brand = '',
      profession = '',
      realname = '',
      nickname = '',
      trade = '',
      type = '1',
      user_type = '',
      sex = null,
      address_detail = '',
      bind_phone = '',
      is_blacklist = 0
    } = (result.data || {}).user || {}

    runInAction(
      () =>
        (this.user = {
          bname,
          head_img,
          chat_id,
          bind_phone,
          is_member,
          name,
          product_brand,
          profession,
          realname,
          nickname,
          trade,
          type,
          user_type,
          sex,
          address_detail,
          is_blacklist,
          id: account_id
        })
    )
  }

  // 添加好友申请
  @action async applyOfFriend(data: {
    join_account_id: string
    message: string
  }) {
    return await fetch('/chat/add-friend-apply', { data, method: 'POST' })
  }

  // 删除好友
  @action async deleteFriend(accountId: string) {
    return await fetch('/chat/delete-friend', {
      method: 'POST',
      data: { account_id: accountId }
    })
  }

  // 编辑昵称
  @action async editNickname(data: { account_id: string; nickname: string }) {
    return await fetch('/chat/edit-nickname', { data, method: 'POST' })
  }

  // 验证消息列表
  @action async getMsgVerifies() {
    const result = await fetch('/chat/remind', { method: 'POST' })
    const { data = [] } = result.data || {}
    runInAction(() => (this.verifies = data))
  }

  // 删除验证消息
  @action async deleteMsgVerify(id: string) {
    const result = await fetch('/chat/delete-apply', {
      method: 'POST',
      data: { id }
    })
    if (result.data) {
      await this.getMsgVerifies()
    }
  }

  // 同意 | 拒绝验证
  @action async agreeOrRejectVerify(
    remindType: 1 | 2 | 3,
    id: string,
    type: 0 | 1 // 0 拒绝 1 同意
  ) {
    const url =
      remindType === 1
        ? '/chat/agree-add-group'
        : remindType === 2
        ? '/chat/agree-join'
        : remindType === 3
        ? '/chat/agree-join-group'
        : ''
    if (!url) {
      return
    }
    return await fetch(url, { method: 'POST', data: { id, type } })
  }

  // 验证详情
  @action async getVerifyById(id: string) {
    const result = await fetch('/chat/remind-detail', {
      method: 'POST',
      data: { id }
    })
    const { data = [] } = result.data || {}
    runInAction(() => (this.verify = data[0] || {}))
  }

  @action getVerify(msg: IVerify) {
    const result = {
      head_img: msg.head_img || '',
      remind_type: msg.remind_type || '',
      message: msg.message || '',
      created_at: msg.created_at || '',
      position: msg.position || '',
      toId: '',
      name: '',
      info: '',
      id: msg.id || '',
      status: '',
      chatId: msg.chat_id || ''
    }

    switch (msg.remind_type) {
      case 1:
        return {
          ...result,
          info: `你的好友${msg.username}邀请你加入群聊`,
          status: msg.status,
          name: msg.group_name,
          toId: msg.chat_group_id
        }
      case 2:
        return {
          ...result,
          info: '申请添加你为好友',
          status: msg.status,
          name: msg.username,
          toId: msg.apply_account_id
        }
      case 3:
        return {
          ...result,
          info: `申请加入:${msg.group_name}群`,
          status: msg.join_group_state,
          name: msg.username,
          toId: msg.join_account_id
        }
      case 4:
        return {
          ...result,
          info: `已退出:${msg.group_name}群`,
          status: '3',
          name: msg.username,
          toId: msg.join_account_id
        }
      default:
        return {
          ...result,
          id: ''
        }
    }
  }

  // 获取手机通讯录
  @action async getContacts() {
    let phones: any[] = []
    const contactKey = 'CONTACTS_SORT' // 缓存key
    let result: any[] = session.get(contactKey) // 使用缓存数据
    try {
      if (!result) {
        // 获取手机通讯录
        const res1: any = await getContacts(E_CONTACT_TYPE.PHONE)
        if (res1.length !== 0) {
          result = [...res1]
        } else {
          const res2: any = await getContacts(E_CONTACT_TYPE.SIM)
          result = [...res2]
        }
      }

      if (!result || result.length === 0) {
        return
      }

      const data = await fetch('/chat/mobile-linkman', {
        method: 'POST',
        data: { data: result }
      })
      const mbs = (data.data || {}).data || []

      phones = mbs
      // const users: any[] = []
      // const others: any[] = []

      // mbs.forEach((m: any) => {
      //   if (!m.name || !m.mobiles) {
      //     return
      //   }
      //   m.id ? users.push(m) : others.push(m)
      // })

      // // 排序
      // if (others.length > 0) {
      //   phones = zhSort({ key: 'name', data: others })
      // }

      // // 追加
      // if (users.length > 0) {
      //   phones.unshift({ lower: '#', upper: '#', data: users })
      // }
    } catch (err) {
      phones = []
      toast.info(err.message)
    } finally {
      phones.length > 0 && session.set(contactKey, result) // 设置缓存
      runInAction(() => (this.phones = phones))
    }
  }

  // 根据chat id查询相关信息
  @action async getGroupOrUserMsg(chatId: string) {
    const result = await fetch('/chat/get-user', {
      method: 'POST',
      data: { chat_id: chatId }
    })
    const { user } = result.data || {}
    return user || {}
  }

  // 根据id获取群详情
  @action async getGroupById(id: string, chatId: string = '') {
    const result = await fetch('/chat/group-message', {
      method: 'POST',
      data: { chat_id: chatId }
    })
    const group = (result.data || {}).group || {}
    runInAction(() => (this.groupDetail = group))
  }

  // 删除群成员
  @action async deleteGroupMembers(groupId: string, accountId: string[]) {
    return await fetch('/chat/delete-group-member', {
      method: 'POST',
      data: { group_id: groupId, account_id: accountId }
    })
  }

  // 解散群聊
  @action async dissolveGroup(groupId: string) {
    return await fetch('/chat/dissolve-group', {
      method: 'POST',
      data: { group_id: groupId }
    })
  }

  // 设置加群状态
  @action async updateJoinGroupStatus(groupId: string, type: string) {
    return await fetch('/chat/edit-join-type', {
      method: 'POST',
      data: { type, group_id: groupId }
    })
  }

  // 获取群公告
  @action async getNotices(id: string) {
    // const result = await fetch('/chat/group-notice-list', { method: 'POST', data: { id } })
    const result = await fetch('/chat/group-notice-list', {
      method: 'POST',
      data: { chat_id: id }
    })
    const data = result.data || {}
    const notices = data.notices || []
    runInAction(() => (this.notices = notices))
  }

  // 编辑群公告
  @action async editNotice(type: 'add' | 'edit', id: string, notice: string) {
    // const data: any = { notice, [type === 'edit' ? 'id' : 'group_id']: id }
    const data: any = { notice, [type === 'edit' ? 'id' : 'chat_id']: id }
    return await fetch('/chat/add-group-notice', { data, method: 'POST' })
  }

  // 修改群消息状态
  @action async updateGroupStatus(data: {
    group_id: string
    chat_id: string
    status: 0 | 1
  }) {
    return await fetch('/chat/set-group-message', { data, method: 'POST' })
  }

  // 获取群消息历史记录
  @action async getGroupHisMsgs(data: {
    type: string
    toChatId: string
    start_time: string
    keyword: string
    page: number
    date?: string
    fromChatId?: string
    chatType?: 'group' | 'single'
  }) {
    data.chatType = data.chatType || 'group'

    return await fetch('/message/search-msg', { data, method: 'POST' })
  }

  // 全部搜索聊天
  @action async getChatSearchAll(keyword: string) {
    return await fetch('/message/search-all', {
      method: 'POST',
      data: { keyword, page: 1, pageSize: 3 }
    })
  }

  // 搜索聊天 - 好友 同事 群 讨论组 聊天记录
  @action async getChatSearchByType(
    type: 'friend' | 'colleague' | 'group-chat' | 'group' | 'chat-record',
    data: { keyword: string; page: number; pageSize: number }
  ) {
    return await fetch(`/message/search-${type}`, {
      data,
      method: 'POST'
    })
  }

  // 举报
  @action async report(data: FormData) {
    return await fetch('/message/complain', {
      data,
      method: 'POST'
    })
  }

  // 加入黑名单
  @action async addOrCancelBlacklist(id: string, isAdded: boolean) {
    const url = isAdded ? '/message/delete-blacklist' : '/message/add-blacklist'
    return await fetch(url, { method: 'POST', data: { to_account_id: id } })
  }

  // 添加会议
  @action async editMeet(data: {
    id?: string
    title: string
    start_time: string
    end_time: string
    content: string
    room: string
    chat_id: string
  }) {
    return await fetch('/meet/add-meet', { data, method: 'POST' })
  }

  // 删除会议
  @action async deleteMeet(id: string) {
    return await fetch('/meet/del-meet', { data: { id }, method: 'POST' })
  }

  // 会议详情
  @action async getMeet(id: string) {
    return await fetch('/meet/meet-detail', { data: { id }, method: 'POST' })
  }

  // 会议列表
  @action async getMeets(chatId: string) {
    return await fetch('/meet/group-meet', {
      data: { chat_id: chatId },
      method: 'POST'
    })
  }
}

export const contact = new Contact()

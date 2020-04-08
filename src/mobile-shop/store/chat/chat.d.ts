import { E_MESSAGE_TYPE, E_CHAT_TYPE, E_CHAT_ACTION } from './constant'

export interface IAcceptMsg {
  fromChatId: string
  messageType: E_MESSAGE_TYPE
  chatType: E_CHAT_TYPE
  toChatId: string
  message: any
  sendTime: string | number
  fromUserInfo: {
    avatar: string
    name: string
  }
  groupInfo: {
    avatar: string
    name: string
  }
  mid: string
  unread?: boolean
  clientId?: number
  hasData?: boolean
  loading?: 0 | 1 | -1
}

export interface IMsgs {
  [toChatId: string]: IAcceptMsg[]
}

export type TChat = {
  toChatId: string
  isTop?: boolean
  toChatName?: string
  toChatAvatar?: string
  unread?: boolean
  chatType?: E_CHAT_TYPE
  sendTime?: string
  message?: string
}

export type IChats = {
  [fromChatId: string]: TChat[]
}

export interface ISendMsgContent {
  fromChatId?: string
  messageType: E_MESSAGE_TYPE
  chatType: E_CHAT_TYPE
  toChatId: string
  message: any
  msgTypeStr?: string
  clientId?: number
  loading?: 0 | 1 | -1
}

export interface ISendMsg {
  class?: 'chat'
  action?: E_CHAT_ACTION
  content: ISendMsgContent
}

// 聊天类型
export enum E_CHAT_TYPE {
  SINGLE = 'single',
  GROUP = 'group'
}

// 聊天 ope
export enum E_CHAT_ACTION {
  NEW_MESSAGE = 'newMessage', // 接收到新消息
  SEND_MESSAGE = 'sendMessage', // 发送消息
  MISSED_MESSAGE = 'missedMessage', // 离线消息
  SEND_FEED_BACK = 'sendFeedback', // 发送反馈
  GET_HISTORY_MESSAGE = 'getHistoryMessage', // 获取历史记录
  HISTORY_MESSAGE = 'historyMessage' // 历史聊天记录
}

// 发送消息类型
export enum E_MESSAGE_TYPE {
  TEXT = 'text', // 文本消息
  GROUP_NOTICE = 'groupNotice', // 群公告
  GROUP_MEETING = 'groupMeeting', // 群会议
  MAP = 'map', // 位置
  NAMECARD = 'namecard', // 名片
  RECORD = 'record', // 语音
  FILE_IMG = 'fileimg', // 图片
  FILE_AUDIO = 'fileaudio', // 音频
  FILE_VIDEO = 'filevideo', // 视频
  FILE_WORD = 'fileword', // word
  FILE_ZIP = 'filezip', // 压缩包
  FILE_PPT = 'fileppt', // ppt
  FILE_TXT = 'filetxt', // txt
  FILE_XLS = 'filexls', // excel
  FILE_OTHER = 'fileother' // 未知文件
}

export enum E_ACCEPT_TYPE {
  IMAGE = 'image/*', // 图片
  VIDEO = 'video/*', // 摄像机目录
  NONE = 'image/*,video/*,audio/*', // 所有文件 /*
  OTHER = '/*' // 所有文件
  // MICROPHONE = 'audio/*' // 录音目录
}

export enum E_CAPTURE_TYPE {
  IMAGE = 'camera', // 照相机
  VIDEO = 'camcorder' // 摄像机目录
  // MICROPHONE = 'microphone' // 录音
}

// 文件change回调
export type TFileChange = (err: Error, files: File[]) => void

export const recordWorker = () => {
  let dataBuffer: any[] = [] // 数据缓冲区
  let mp3Encoder: any // mp3编码器
  let channel: number // 通道数
  let bitRate: number // 比特率
  let inputSampleRate: number // 输入采样率
  let outputSampleRate: number // 输出采样率

  // 发送消息
  const postMessage = (cmd: string, data: any) => {
    const sf: any = self
    sf.postMessage({ cmd, data })
  }

  // 添加缓冲数据
  const appendBuffer = (buffer: Buffer) => {
    dataBuffer.push(new Int8Array(buffer))
  }

  // 清空缓冲数据
  const clearBuffer = () => {
    dataBuffer = []
  }

  // 数据压缩与转换
  const convertBuffer = (buffer: Buffer) => {
    let input: Float32Array = new Float32Array(buffer)

    // 修改采样率
    if (inputSampleRate !== outputSampleRate) {
      const compression = inputSampleRate / outputSampleRate
      const length = Math.ceil(buffer.length / compression)
      let index = 0

      input = new Float32Array(length)
      for (let i = 0; index < length; i += compression) {
        input[index++] = buffer[~~i]
      }
    }

    // floatTo16BitPCM
    const length = input.length
    const output = new Int16Array(length)
    for (let i = 0; i < length; i++) {
      const s = Math.max(-1, Math.min(1, input[i]))
      output[i] = s < 0 ? s * 0x8000 : s * 0x7fff
    }

    return output
  }

  // 编码音频数据
  const encode = (data: any) => {
    const samplesLeft = convertBuffer(data[0])
    const samplesRight = channel > 1 ? convertBuffer(data[1]) : undefined
    const maxSamples = 1152
    const length = samplesLeft.length
    let remaining = length

    for (let i = 0; remaining >= maxSamples; i += maxSamples) {
      const left = samplesLeft.subarray(i, i + maxSamples)
      const right = samplesRight
        ? samplesRight.subarray(i, i + maxSamples)
        : undefined

      appendBuffer(mp3Encoder.encodeBuffer(left, right))
      remaining -= maxSamples
    }
  }

  const stop = () => {
    appendBuffer(mp3Encoder.flush())
    postMessage('complete', dataBuffer)
    clearBuffer()
    self.close() // 关闭连接
  }

  // 初始化
  const init = (data: any) => {
    channel = data.channel
    bitRate = data.bitRate
    inputSampleRate = data.inputSampleRate
    outputSampleRate = Math.min(data.outputSampleRate, inputSampleRate)

    clearBuffer()
    importScripts(`${data.origin}js/lame.min.js`)

    const sf: any = self
    const lame = new sf.lamejs()
    mp3Encoder = new lame.Mp3Encoder(channel, outputSampleRate, bitRate)
  }

  self.onmessage = function (e: any) {
    const data = e.data

    switch (data.cmd) {
      case 'init':
        init(data.data)
        break
      case 'encode':
        encode(data.data)
        break
      case 'stop':
        stop()
        break
    }
  }
}

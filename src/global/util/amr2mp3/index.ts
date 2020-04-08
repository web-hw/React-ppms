import '../../../mobile-shop/static/js/lame.min.js'
const BenzAMRRecorder = require('benz-amr-recorder')

export const amr2mp3 = (
  url: string,
  callback: (err: Error, file: File) => void
) => {
  const amr = new BenzAMRRecorder()

  console.log(BenzAMRRecorder)

  amr
    .initWithUrl(url)
    .then(() => {
      // console.log(BenzAMRRecorder.AMR)
      amr.play()
      console.log(amr.getBlob())
      const samples = amr._samples
      if (!samples || samples.length === 0) {
        return callback(new Error('samples获取失败'), null)
      }

      console.log(amr)
      // 2 mp3
      const win: any = window
      const channels = 2
      const sampleRate = 8000
      const kbps = 128
      const sampleBlockSize = 1152
      const mp3Data = []
      const lame = new win.lamejs()
      const mp3encoder = new lame.Mp3Encoder(channels, sampleRate, kbps)

      const left = new Int16Array(sampleRate)
      const right = new Int16Array(sampleRate)
      for (let i = 0; i < samples.length; i += sampleBlockSize) {
        const leftChunk = left.subarray(i, i + sampleBlockSize)
        const rightChunk = right.subarray(i, i + sampleBlockSize)
        const mp3buf = mp3encoder.encodeBuffer(leftChunk, rightChunk)
        if (mp3buf.length > 0) {
          mp3Data.push(mp3buf)
        }
      }
      const mp3buf = mp3encoder.flush()

      if (mp3buf.length > 0) {
        mp3Data.push(new Int8Array(mp3buf))
      }

      const file = new File(mp3Data, `amr2mp3-${Date.now()}.mp3`, {
        type: 'audio/mp3'
      })
      callback(null, file)
    })
    .catch((err: Error) => callback(err, null))
}

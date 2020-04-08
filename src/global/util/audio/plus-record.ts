import { getPlus } from '../plus'
import { CbAudio } from './index'
import { fileOrBlob2Base64, base642FileOrBlob } from '../file'

export class Recorder {
  private recorder: any = null

  // 1表示开始录音
  startRecord(callback: (err: Error, data: File | 1) => void) {
    getPlus()
      .then((plus: any) => {
        this.recorder = plus.audio.getRecorder()
        const u = navigator.userAgent.toLowerCase()
        const isAndroid = u.indexOf('android') > -1 || u.indexOf('adr') > -1
        // 开始录音
        this.recorder.record(
          { format: isAndroid ? 'amr' : 'mp3' },
          (path: string) => {
            plus.io.resolveLocalFileSystemURL(
              path,
              (entry: any) =>
                entry.file((file: any) => {
                  const fileReader = new plus.io.FileReader()
                  fileReader.readAsDataURL(file)
                  fileReader.onloadend = (e: any) => {
                    callback(null, e.target.result)
                  }
                }),
              (err: any) => callback(err, null)
            )
          },
          (err: Error) => callback(err, null)
        )

        callback(null, 1)
      })
      .catch((err: any) => {
        if (err.code === 404) {
          this.recorder = new CbAudio()
          this.recorder.startRecord((err: Error, data: File | 1) => {
            if (err) {
              callback(err, null)
            } else {
              data === 1
                ? callback(null, 1)
                : fileOrBlob2Base64(data, (err: Error, data: any) =>
                    callback(err, data)
                  )
            }
          })
        } else {
          callback(err, null)
        }
      })
  }

  stopRecord() {
    if (!this.recorder) {
      return
    }

    if (this.recorder instanceof CbAudio) {
      this.recorder.stopRecord()
    } else {
      this.recorder.stop()
    }
  }
}

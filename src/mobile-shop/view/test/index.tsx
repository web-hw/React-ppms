import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {} from 'antd-mobile'
import Image from '../../component/image'
import VideoCapture from 'video-capture'
const style = require('./style')

export default class Test extends React.Component<any, any> {
  private video: HTMLVideoElement = null
  private canvas: HTMLCanvasElement = null
  constructor(props: any) {
    super(props)

    this.state = {
      imgs: [],
      canvas: null
    }
  }

  componentDidMount() {
    // new VideoCapture(
    //   'http://static.amisheng.com/upload/video/20191114/fdc1eb8dad8a878e188f40d87320e97d.mp4'
    // )
    //   .capture('50%')
    //   .then((res: any) => {
    //     this.setState({ imgs: [res.dataURL] })
    //   })
    //   .catch(err => alert(err.message))
    // const v = this.video
    // v.onplay = () => {
    //   // try {
    //   //   const w = v.videoWidth
    //   //   const h = v.videoHeight
    //   //   const c: HTMLCanvasElement = this.canvas
    //   //   c.width = w
    //   //   c.height = h
    //   //   const ctx = c.getContext('2d')
    //   //   ctx.drawImage(v, 0, 0, w, h)
    //   //   c.toBlob(
    //   //     (blob: Blob) => {
    //   //       const url = window.URL.createObjectURL(blob)
    //   //       this.setState({ imgs: [url]  })
    //   //       console.log('hahah')
    //   //     },
    //   //     'image/jpeg',
    //   //     0.5
    //   //   )
    //   // } catch (err) {
    //   //   alert(err.message)
    //   // }
    //   html2canvas(
    //     document.body,
    //     {
    //       useCORS: true,
    //       scale: .5,
    //       backgroundColor: null
    //     }
    //   ).then((canvas: HTMLCanvasElement) => {
    //     const url = canvas.toDataURL('image/png')
    //     this.setState({ imgs: [url]  })
    //     // canvas.toBlob(
    //     //   (blob: Blob) => {
    //     //     const url = window.URL.createObjectURL(blob)
    //     //     this.setState({ imgs: [url]  })
    //     //     console.log('hahah')
    //     //   },
    //     //   'image/jpeg',
    //     //   0.5
    //     // )
    //   }).catch(err => console.log(err.message))
    // }
    // setTimeout(
    //   () => {
    //     v.currentTime = v.duration / 2
    //     v.play()
    //   },
    //   3000
    // )
  }

  render() {
    return <div className="wp100 hp100 oay sb fs12">{/* <Image /> */}</div>
  }
}

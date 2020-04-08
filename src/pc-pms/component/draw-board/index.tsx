import * as React from 'react'
import {} from 'react-router-dom'
import { Slider, Button, Row, Col } from 'antd'

import { loadScript } from 'global@util/load-script'
const style = require('./style')

enum E_DRAW_OPE {
  PEN = 'open', // 笔
  RUBBER = 'rubber', // 橡皮
  BG = 'bg' // 背景
}

type TDrawOpe = { label: string; value: E_DRAW_OPE }
const drawOpes: TDrawOpe[] = [
  { label: '绘制', value: E_DRAW_OPE.PEN },
  { label: '擦除', value: E_DRAW_OPE.RUBBER },
  { label: '背景', value: E_DRAW_OPE.BG }
]

enum E_SLIDER_TYPE {
  RED = 'red',
  GREEN = 'green',
  BLUE = 'blue',
  SIZE = 'size'
}

type TSliderType = { label: string; value: E_SLIDER_TYPE }
const sliderTypes: TSliderType[] = [
  { label: '红', value: E_SLIDER_TYPE.RED },
  { label: '绿', value: E_SLIDER_TYPE.GREEN },
  { label: '蓝', value: E_SLIDER_TYPE.BLUE },
  { label: 'Size', value: E_SLIDER_TYPE.SIZE }
]

interface IPropsDrawBoard {}

interface IStateDrawBoard {
  [E_SLIDER_TYPE.RED]: number // 红颜色取值
  [E_SLIDER_TYPE.GREEN]: number // 绿颜色取值
  [E_SLIDER_TYPE.BLUE]: number // 蓝颜色取值
  [E_SLIDER_TYPE.SIZE]: number // 大小取值
  doing: boolean // 是否开始操作
  ope: E_DRAW_OPE // 当前操作
  openSize: number // 字体大小
  openColor: string // 字体颜色
  bgColor: string // 背景颜色
  rubberSize: number // 橡皮大小
}

export default class DrawBoard extends React.PureComponent<
  IPropsDrawBoard,
  IStateDrawBoard
> {
  private _canvasContent: HTMLDivElement = null
  private _canvas: HTMLCanvasElement = null
  private _context: CanvasRenderingContext2D = null
  private _canvasLeft: number = 0
  private _canvasTop: number = 0

  // 初始化canvas 上下文
  private initCanvasContext() {
    // 获取canvas
    const getCanvas = () => {
      // 获取canvas 宽高
      const cbCanvas = this._canvasContent
      const width = cbCanvas.offsetWidth
      const height = cbCanvas.offsetHeight

      // 设置宽高
      const canvas = this._canvas
      canvas.setAttribute('width', `${width}px`)
      canvas.setAttribute('height', `${height}px`)

      return canvas
    }

    let canvas: HTMLCanvasElement = null
    let context: CanvasRenderingContext2D = null
    try {
      canvas = getCanvas()
      context = canvas.getContext('2d')
    } catch (err) {
      console.error('当前环境不支持canvas')
      // loadScript(
      //   `${location.origin}/js/excanvas.js`,
      //   () => {
      //     const win: any = window
      //     if (!win.G_vmlCanvasManager) {
      //       return console.error(err)
      //     }

      //     canvas = win.G_vmlCanvasManager.initElement(canvas)
      //     context = canvas.getContext('2d')
      //   }
      // )
    }

    if (canvas && context) {
      this._canvas = canvas
      this._context = context
    }
  }

  // 获取canvas top left偏移量
  private getCanvasOffset() {
    let elem: any = this._canvasContent
    let ofstTop = 0
    let ofstLeft = 0
    if (elem.getBoundingClientRect) {
      const rect = elem.getBoundingClientRect()
      ofstTop = rect.top
      ofstLeft = rect.left
    } else {
      while (true) {
        if (elem.nodeName === 'BODY') {
          break
        }
        ofstTop += elem.offsetTop
        ofstLeft += elem.offsetLeft
        elem = elem.parentElement
      }
    }

    this._canvasLeft = ofstLeft
    this._canvasTop = ofstTop
  }

  private onSwitchDrawOpe(itm: TDrawOpe) {
    const { ope, openSize, openColor, bgColor, rubberSize } = this.state
    if (ope === itm.value) {
      return
    }

    let obj: any = {}
    let color: any = null
    switch (itm.value) {
      case E_DRAW_OPE.PEN:
        color = this.parseColor(openColor)
        obj = { ...color, size: openSize }
        break
      case E_DRAW_OPE.RUBBER:
        obj = { size: rubberSize }
        break
      case E_DRAW_OPE.BG:
        color = this.parseColor(bgColor)
        obj = { ...color }
        break
    }

    this.setState({ ope: itm.value, ...obj })
  }

  // 绘制线
  private drawLine(x: number, y: number) {
    const context = this._context
    context.lineTo(x, y)
    context.stroke()
  }

  // 清楚
  private drawClear(x: number, y: number, w?: number, h?: number) {
    const context = this._context
    if (!context) {
      return
    }

    // 重绘
    if (w || h) {
      return context.clearRect(x, y, w, h)
    }

    // 搽除
    const { rubberSize } = this.state
    context.clearRect(
      x - rubberSize / 2,
      y - rubberSize / 2,
      rubberSize,
      rubberSize
    )
  }

  // 绘制
  private draw(event: React.MouseEvent) {
    const { x, y } = this.getMousePoint(event)
    if (!x || !y) {
      return
    }

    const { ope } = this.state

    switch (ope) {
      case E_DRAW_OPE.PEN:
        return this.drawLine(x, y)
      case E_DRAW_OPE.RUBBER:
        return this.drawClear(x, y)
    }
  }

  // 获取鼠标位置
  private getMousePoint(event: React.MouseEvent) {
    // 获取鼠标位置
    let x = +(event.clientX - this._canvasLeft)
    let y = +(event.clientY - this._canvasTop)

    if (isNaN(x) || isNaN(y)) {
      x = y = null
    }

    return { x, y }
  }

  // 初始化当前绘制上下文
  private initContext(event: React.MouseEvent) {
    // 保证偏移量，在开始绘制时获取偏移量
    this.getCanvasOffset()

    const { size, red, green, blue, ope } = this.state
    const context = this._context

    if (ope === E_DRAW_OPE.PEN) {
      context.closePath()
      context.beginPath()
      // 设置线颜色
      context.strokeStyle = `rgba(${red}, ${green}, ${blue}, 1)`
      // 设置线宽
      context.lineWidth = size
      // 移动上下文位置
      const { x, y } = this.getMousePoint(event)
      x && y && context.moveTo(x, y)
    }
  }

  // 验证slider type是否可用
  private isValidSliderType(type: TSliderType) {
    const { ope } = this.state

    switch (type.value) {
      case E_SLIDER_TYPE.SIZE:
        return ope === E_DRAW_OPE.PEN || ope === E_DRAW_OPE.RUBBER
      case E_SLIDER_TYPE.RED:
      case E_SLIDER_TYPE.GREEN:
      case E_SLIDER_TYPE.BLUE:
        return ope === E_DRAW_OPE.PEN || ope === E_DRAW_OPE.BG
      default:
        return false
    }
  }

  // 结束绘制
  private endDraw() {
    const { doing } = this.state
    if (!doing) {
      return
    }

    this.setState({ doing: false })
    this._context.closePath()
  }

  // 解析颜色
  private parseColor(...args: [string] | [number, number, number]) {
    if (args.length === 3) {
      return `rgba(${args[0]}, ${args[1]}, ${args[2]}, 1)`
    }

    if (args.length === 1) {
      const arr = args[0].replace(/rgba\(|\)/gi, '').split(',')
      return {
        red: +arr[0] || 0,
        green: +arr[1] || 0,
        blue: +arr[2] || 0,
        opacity: +arr[3] || 1
      }
    }

    return null
  }

  // slider change
  private onChangeSliderType(type: TSliderType, val: any) {
    const { ope, red, green, blue } = this.state
    let obj: any = { [type.value]: val }
    let color: any = null
    switch (type.value) {
      case E_SLIDER_TYPE.RED:
        color = this.parseColor(val, green, blue)
      case E_SLIDER_TYPE.GREEN:
        color = this.parseColor(red, val, blue)
      case E_SLIDER_TYPE.BLUE:
        color = this.parseColor(red, green, val)
        if (ope === E_DRAW_OPE.PEN && color) {
          obj = { ...obj, openColor: color }
        }
        if (ope === E_DRAW_OPE.BG && color) {
          obj = { ...obj, bgColor: color }
        }
        break
      case E_SLIDER_TYPE.SIZE:
        if (ope === E_DRAW_OPE.PEN && val) {
          obj = { ...obj, openSize: val }
        }
        if (ope === E_DRAW_OPE.RUBBER && val) {
          obj = { ...obj, rubberSize: val }
        }
        break
    }

    this.setState({ ...obj })
  }

  private onMouseDownCanvas(event: React.MouseEvent) {
    if (!this._context) {
      return
    }

    // 开始绘制状态
    this.setState({ doing: true })

    this.initContext(event)
  }

  private onMouseMoveCanvas(event: React.MouseEvent) {
    const { doing } = this.state
    if (!doing) {
      return
    }
    this.draw(event)
  }

  private onMouseUpCanvas(event: React.MouseEvent) {
    this.endDraw()
  }

  private onMouseLeaveCanvas(event: React.MouseEvent) {
    this.endDraw()
  }

  // 重绘
  private onReDraw() {
    const canvas = this._canvas
    const w = canvas.offsetWidth
    const h = canvas.offsetHeight

    this.drawClear(0, 0, w, h)
  }

  // 生成img
  private onSavaDraw() {
    const canvas = this._canvas
    const context = this._context
    if (!context) {
      return
    }
    const { bgColor } = this.state
    const w = canvas.offsetWidth
    const h = canvas.offsetHeight

    // 绘制背景
    const imageData = context.getImageData(0, 0, w, h)
    const compositeOperation = context.globalCompositeOperation
    context.globalCompositeOperation = 'destination-over'
    context.fillStyle = bgColor
    context.fillRect(0, 0, w, h)
    // 获取图片
    const base64 = canvas.toDataURL('image/png')
    // 重置到绘制背景之前状态
    context.clearRect(0, 0, w, h)
    context.putImageData(imageData, 0, 0)
    context.globalCompositeOperation = compositeOperation

    return base64
  }

  // 暴露接口
  public api() {
    return {
      resetDraw: this.onReDraw, // 重置
      getBase64: this.onSavaDraw // 确认
    }
  }

  constructor(props: IPropsDrawBoard) {
    super(props)

    this.state = {
      [E_SLIDER_TYPE.RED]: 0,
      [E_SLIDER_TYPE.GREEN]: 0,
      [E_SLIDER_TYPE.BLUE]: 0,
      [E_SLIDER_TYPE.SIZE]: 1,
      openSize: 1,
      rubberSize: 2,
      openColor: 'rgba(0, 0, 0, 1)',
      bgColor: 'rgba(255, 255, 255, 1)',
      doing: false,
      ope: E_DRAW_OPE.PEN
    }

    this.onMouseDownCanvas = this.onMouseDownCanvas.bind(this)
    this.onMouseLeaveCanvas = this.onMouseLeaveCanvas.bind(this)
    this.onMouseMoveCanvas = this.onMouseMoveCanvas.bind(this)
    this.onMouseUpCanvas = this.onMouseUpCanvas.bind(this)
    this.onReDraw = this.onReDraw.bind(this)
    this.onSavaDraw = this.onSavaDraw.bind(this)
  }

  componentDidMount() {
    this.initCanvasContext()
  }

  render() {
    const { ope, bgColor } = this.state

    return (
      <div
        className={`${style.drawBoard} cb-draw-board wp100 bg-fff fs0 bsb pr oh`}
      >
        <div className="draw-board-ope palt hp100 bsb bg-fff">
          <div className="mc wp100 bsb p10">
            {sliderTypes.map(type => (
              <div key={type.value} className="draw-board-ope-itm wp100 bsb pr">
                <span className="itm-label palt tes">{type.label}</span>
                <Slider
                  className={type.value}
                  tipFormatter={null}
                  value={this.state[type.value]}
                  min={type.value === E_SLIDER_TYPE.SIZE ? 1 : 0}
                  max={type.value === E_SLIDER_TYPE.SIZE ? 10 : 255}
                  disabled={!this.isValidSliderType(type)}
                  onChange={(val: any) => this.onChangeSliderType(type, +val)}
                />
              </div>
            ))}
            <div className="draw-board-sel wp100 mt10">
              <Row gutter={8}>
                {drawOpes.map(itm => (
                  <Col span={8} key={itm.value}>
                    <Button
                      className={`tes ${ope === itm.value ? 'active' : ''}`}
                      onClick={() => this.onSwitchDrawOpe(itm)}
                    >
                      {itm.label}
                    </Button>
                  </Col>
                ))}
                <Col span={24} className="mt10">
                  <Button type="primary" onClick={this.onReDraw}>
                    重绘
                  </Button>
                </Col>
              </Row>
            </div>
          </div>
        </div>
        <div
          ref={el => (this._canvasContent = el)}
          className="draw-board-content bg-fff wp100 hp100"
        >
          <canvas
            ref={el => (this._canvas = el)}
            style={{ backgroundColor: bgColor }}
            onMouseDown={this.onMouseDownCanvas}
            onMouseMove={this.onMouseMoveCanvas}
            onMouseUp={this.onMouseUpCanvas}
            onMouseLeave={this.onMouseLeaveCanvas}
          />
        </div>
      </div>
    )
  }
}

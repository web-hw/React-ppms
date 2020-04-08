import * as React from 'react'
import {} from 'react-router-dom'
import { Button } from 'antd-mobile'

import Emoji, { encodeMsg } from '../emoji'
import Editor from 'global@component/editor'
import SendOpe, { EOpeType as EOtherOpeType } from '../send-ope'
import Textarea, {
  handleNewLineEnter,
  isSupportContentEditable
} from '../textarea'
const style = require('./style')

enum EOpeType {
  VOICE = 'voice',
  EMOJI = 'emoji',
  OTHER = 'other'
}

interface IPropsSendWrap {
  isShow?: boolean // 是否显示发送信息弹框
  placeholder?: string // 占位符
  isFocusSent?: boolean // 发送消息后是否聚焦
  onSend: (msg: string) => void // 发送回调
  onOpenOpe?: (status: boolean) => void // 操作框 显示隐藏的回调
  onSelectOpe?: (type: string) => void // 点击操作
}

interface IStateSendWrap {
  msg: string
  opeType: EOpeType
}

class SendWrap<
  IProps extends IPropsSendWrap,
  IState extends IStateSendWrap
> extends React.PureComponent<IProps, IState> {
  emojiIcon = require('../../assets/images/send-emoji.png')
  otherIcon = require('../../assets/images/send-other.png')
  voiceIcon = require('../../assets/images/send-voice.png')
  simpleIcon = require('../../assets/images/comment-icon.png')

  // change msg send
  onChangeMsg(msg: string) {
    this.setState({ msg })
  }

  // send msg
  onSendMsg(event: any) {
    const { isFocusSent = false, onSend } = this.props
    const { msg } = this.state
    // 失去焦点
    isFocusSent && event.preventDefault()
    this.setState({ msg: '' })
    // 发送消息
    onSend(encodeMsg(msg))
  }

  // ope select
  onSelectOpe(item: any) {
    const { opeType, msg } = this.state
    const { onSelectOpe } = this.props
    // 表情
    if (opeType === EOpeType.EMOJI) {
      this.setState({
        msg: handleNewLineEnter(
          msg,
          isSupportContentEditable() ? item.html : item.id
        )
      })
    }

    // 其他
    if (opeType === EOpeType.OTHER) {
      onSelectOpe && onSelectOpe(item)
    }
  }

  // 控制表情的显示隐藏
  onSwitchOpe(event: any, type: EOpeType) {
    const isVoice = type === EOpeType.VOICE
    !isVoice && event.preventDefault()

    let currOpe = type
    if (this.state.opeType === type) {
      currOpe = null
    }

    this.setState({ opeType: currOpe })
    !isVoice && this.props.onOpenOpe(!!currOpe)
  }

  // 失去焦点
  onBlurMsg() {
    this.setState({ opeType: null })
    this.props.onOpenOpe(false)
  }

  // 获取容器样式
  getWrapClass() {
    const { isShow = true } = this.props
    const { opeType } = this.state

    return isShow
      ? !!opeType && opeType !== EOpeType.VOICE
        ? 'send-ope-show'
        : 'send-input-show'
      : 'send-hide'
  }

  constructor(props: IProps) {
    super(props)

    this.onChangeMsg = this.onChangeMsg.bind(this)
    this.onSendMsg = this.onSendMsg.bind(this)
    this.onSelectOpe = this.onSelectOpe.bind(this)
    this.onSwitchOpe = this.onSwitchOpe.bind(this)
    this.onBlurMsg = this.onBlurMsg.bind(this)
    this.getWrapClass = this.getWrapClass.bind(this)
  }
}

interface IPropsSend extends IPropsSendWrap {}

interface IStateSend extends IStateSendWrap {}

export class Send extends SendWrap<IPropsSend, IStateSend> {
  constructor(props: IPropsSend) {
    super(props)

    this.state = {
      msg: '',
      opeType: null
    }
  }

  render() {
    const { opeType, msg } = this.state
    const { placeholder = '' } = this.props

    return (
      <div
        className={`${this.getWrapClass()} fs0 cb-send`}
        onClick={event => event.stopPropagation()}
      >
        <div className="cb-send-input cb-send-send-input">
          <em
            onClick={event => this.onSwitchOpe(event, EOpeType.EMOJI)}
            className="palt emoji-icon"
            style={{
              backgroundImage: `url(${this.emojiIcon})`
            }}
          />
          <Textarea
            value={msg}
            onChange={this.onChangeMsg}
            onBlur={this.onBlurMsg}
            placeholder={placeholder}
          />
          <div className="cb-send-right">
            <Button
              onClick={this.onSendMsg}
              disabled={!msg}
              className="send-btn vat mt10"
            >
              发送
            </Button>
          </div>
        </div>
        <div className="cb-send-ope">
          <Emoji
            className={opeType === EOpeType.EMOJI ? 'active' : ''}
            onSelect={this.onSelectOpe}
          />
        </div>
      </div>
    )
  }
}

interface IPropsChatSend extends IPropsSendWrap {
  opes?: EOtherOpeType[]
}
interface IStateChatSend extends IStateSendWrap {}

export class ChatSend extends SendWrap<IPropsChatSend, IStateChatSend> {
  constructor(props: IPropsChatSend) {
    super(props)

    this.state = {
      msg: '',
      opeType: null
    }
  }

  render() {
    const { opeType, msg } = this.state
    const { placeholder = '', opes } = this.props

    return (
      <div
        className={`${this.getWrapClass()} fs0 cb-send`}
        onClick={event => event.stopPropagation()}
      >
        <div className="cb-send-input cb-chat-send-input">
          <em
            onClick={event => this.onSwitchOpe(event, EOpeType.VOICE)}
            className="palt voice-icon"
            style={{
              backgroundImage: `url(${this.voiceIcon})`
            }}
          />
          {opeType === EOpeType.VOICE ? (
            <span className="press-voice">按住说话</span>
          ) : (
            <Textarea
              value={msg}
              onChange={this.onChangeMsg}
              onBlur={this.onBlurMsg}
              placeholder={placeholder}
            />
          )}
          <div className="cb-send-right">
            <em
              onClick={event => this.onSwitchOpe(event, EOpeType.EMOJI)}
              className="emoji-icon vat dib"
              style={{
                backgroundImage: `url(${this.emojiIcon})`
              }}
            />
            {msg ? (
              <Button onClick={this.onSendMsg} className="send-btn ml10 mt10">
                发送
              </Button>
            ) : (
              <em
                onClick={event => this.onSwitchOpe(event, EOpeType.OTHER)}
                className="other-icon ml10 vat dib"
                style={{
                  backgroundImage: `url(${this.otherIcon})`
                }}
              />
            )}
          </div>
        </div>
        <div className="cb-send-ope">
          <Emoji
            className={opeType === EOpeType.EMOJI ? 'active' : ''}
            onSelect={this.onSelectOpe}
          />
          <SendOpe
            opes={opes}
            className={opeType === EOpeType.OTHER ? 'active' : ''}
            onSelect={type => console.log(type)}
          />
        </div>
      </div>
    )
  }
}

interface IPropsChatSendV1 {
  onSend: (msg: string) => void // 发送回调
  onOpenOpe?: (status: boolean) => void // 操作框 显示隐藏的回调
  onSelectOpe?: (type: string) => void // 点击操作
  onTouchStartOfVoice?: (event: any) => void
  onTouchMoveOfVoice?: (event: any) => void
  onTouchEndOfVoice?: (event: any) => void
  opes?: EOtherOpeType[]
}

interface IStateChatSendV1 {
  hasMsg: boolean
  opeType: EOpeType
}

export class ChatSendV1 extends React.PureComponent<
  IPropsChatSendV1,
  IStateChatSendV1
> {
  private editor: Editor = null
  private emojiIcon = require('../../assets/images/send-emoji.png')
  private otherIcon = require('../../assets/images/send-other.png')
  private voiceIcon = require('../../assets/images/send-voice.png')

  // 获取容器样式
  private getWrapClass() {
    const { opeType } = this.state

    return !!opeType && opeType !== EOpeType.VOICE
      ? 'send-ope-show'
      : 'send-input-show'
  }

  // 控制表情的显示隐藏
  private onSwitchOpe(event: any, type: EOpeType) {
    const isVoice = type === EOpeType.VOICE
    if (type === EOpeType.EMOJI) {
      event.preventDefault()
    }

    let currOpe = type
    if (this.state.opeType === type) {
      currOpe = null
    }

    this.setState({
      opeType: currOpe,
      hasMsg: isVoice ? false : this.state.hasMsg
    })
    // !isVoice && this.props.onOpenOpe(!!currOpe)
    this.props.onOpenOpe(isVoice ? false : !!currOpe)
  }

  // send msg
  private onSendMsg(event: any) {
    event.preventDefault()
    const { onSend } = this.props
    const html = Editor.simpleHTML(this.editor.getContent('html'))
    // 发送消息
    html && onSend(encodeMsg(html))
    this.editor.setContent('clear')
  }

  // ope select
  private onSelectOpe(item: any) {
    const { opeType } = this.state
    const { onSelectOpe } = this.props
    // 表情
    if (opeType === EOpeType.EMOJI) {
      item.html && this.editor.setContent('insert', item.html)
    }

    // 其他
    if (opeType === EOpeType.OTHER) {
      onSelectOpe && onSelectOpe(item)
    }
  }

  constructor(props: IPropsChatSend) {
    super(props)

    this.state = {
      hasMsg: false,
      opeType: null
    }

    this.onSelectOpe = this.onSelectOpe.bind(this)
    this.onSendMsg = this.onSendMsg.bind(this)
  }

  render() {
    const { opeType, hasMsg } = this.state
    const {
      opes,
      onTouchStartOfVoice,
      onTouchMoveOfVoice,
      onTouchEndOfVoice
    } = this.props

    return (
      <div className={`${this.getWrapClass()} fs0 cb-send`}>
        <div className="cb-send-input cb-chat-send-input">
          <em
            onClick={event => this.onSwitchOpe(event, EOpeType.VOICE)}
            className="palt voice-icon"
            style={{
              backgroundImage: `url(${this.voiceIcon})`
            }}
          />
          {opeType === EOpeType.VOICE ? (
            <span
              className="press-voice bsb"
              data-status="0"
              onTouchStart={onTouchStartOfVoice ? onTouchStartOfVoice : null}
              onTouchMove={onTouchMoveOfVoice ? onTouchMoveOfVoice : null}
              onTouchEnd={onTouchEndOfVoice ? onTouchEndOfVoice : null}
            >
              按住说话
            </span>
          ) : (
            <Editor
              ref={el => (this.editor = el)}
              isCanCopyText={true}
              onchange={html =>
                this.setState({ hasMsg: html !== '<p><br></p>' })
              }
            />
          )}
          <div className="cb-send-right">
            <em
              onClick={event => this.onSwitchOpe(event, EOpeType.EMOJI)}
              className="emoji-icon vat dib"
              style={{
                backgroundImage: `url(${this.emojiIcon})`
              }}
            />
            {hasMsg ? (
              <Button onClick={this.onSendMsg} className="send-btn ml10 mt10">
                发送
              </Button>
            ) : (
              <em
                onClick={event => this.onSwitchOpe(event, EOpeType.OTHER)}
                className="other-icon ml10 vat dib"
                style={{
                  backgroundImage: `url(${this.otherIcon})`
                }}
              />
            )}
          </div>
        </div>
        <div className="cb-send-ope">
          <Emoji
            className={opeType === EOpeType.EMOJI ? 'active' : ''}
            onSelect={this.onSelectOpe}
          />
          <SendOpe
            opes={opes}
            className={opeType === EOpeType.OTHER ? 'active' : ''}
            onSelect={this.onSelectOpe}
          />
        </div>
      </div>
    )
  }
}

interface IPropsSimpleSend extends IPropsSendWrap {}

interface IStateSimpleSend extends IStateSendWrap {}

export class SimpleSend extends SendWrap<IPropsSimpleSend, IStateSimpleSend> {
  constructor(props: IPropsSimpleSend) {
    super(props)

    this.state = {
      msg: '',
      opeType: EOpeType.OTHER
    }
  }

  render() {
    const { msg } = this.state
    const { placeholder = '' } = this.props

    return (
      <div
        className={`${this.getWrapClass()} fs0 cb-send`}
        onClick={event => event.stopPropagation()}
      >
        <div className="cb-send-input cb-send-send-input">
          <em
            className="palt emoji-icon"
            style={{ backgroundImage: `url(${this.simpleIcon})` }}
          />
          <Textarea
            value={msg}
            onChange={this.onChangeMsg}
            placeholder={placeholder}
          />
          <div className="cb-send-right">
            <Button
              onClick={this.onSendMsg}
              disabled={!msg}
              className="send-btn vat mt10"
            >
              发送
            </Button>
          </div>
        </div>
      </div>
    )
  }
}

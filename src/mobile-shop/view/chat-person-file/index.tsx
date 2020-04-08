import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { RouteComponentProps } from 'react-router-dom'
import { Tabs, Grid } from 'antd-mobile'

import { serialize } from 'global@util/serialize'
import { session } from 'global@util/storage'
import { toast } from 'global@util/toast/mobile'
import User from '../../store/user'
import { ICollect } from '../../store/user/user'
import { Header } from '../../component/header'
import Search from '../../component/search'
import CbModal from '../../component/modal'
import Loading from '../../component/loading'
import Empty from '../../component/empty'
import PreviewFile from '../../component/preview-file'
import { REPEAT_SEND } from '../../constant'
import Image from '../../component/image'
import Video from '../chat/video'
import { E_MESSAGE_TYPE } from '../../store/chat/constant'
const style = require('./style')

interface IPropsChatPersonFile extends RouteComponentProps {
  user: User
}

interface IStateChatPersonFile {
  selecting: boolean
  files: ICollect[]
  initFiles: ICollect[]
  selectItems: ICollect[]
  isShowDelInfo: boolean
  isShowPreviewFile: boolean
  toName: string
  toChatId: string
  file: any
  loading: boolean
  param: {
    type: E_MSG_TYPE
    keyword: string
  }
}

enum E_MSG_TYPE {
  FILES = 'files', // 除开图片 视图的文件
  IMAGES_VIDEO = 'image_video' // 图片视频
}

@inject('user')
@observer
export default class ChatPersonFile extends React.Component<
  IPropsChatPersonFile,
  IStateChatPersonFile
> {
  private _selIcon = require('../../assets/images/select-icon.png')
  private _otherFile = require('../../assets/images/chat-fileother.png')
  private _tabs = [
    { title: '文件', key: E_MSG_TYPE.FILES },
    { title: '图片/视频', key: E_MSG_TYPE.IMAGES_VIDEO }
  ]

  private onSwitchSelecting() {
    const { selecting } = this.state

    const state: any = { selecting: !selecting }
    if (!selecting) {
      state.selectItems = []
    }

    this.setState({ ...state })
  }

  private onClickOpe(type: 'send' | 'delete') {
    const { selectItems } = this.state
    if (selectItems.length === 0) {
      return toast.info('请选择文件')
    }

    if (type === 'delete') {
      this.setState({ isShowDelInfo: true })
    }

    if (type === 'send') {
      const sendMsgs = selectItems.map(f => ({
        type: f.type,
        name: f.name,
        size: f.size,
        icon: f.icon,
        url: f.url,
        poster: f.poster
      }))
      session.set(REPEAT_SEND, sendMsgs)
      this.props.history.replace('/address-book')
    }
  }

  private async onDeleteFiles() {
    const { selectItems } = this.state
    const ids = selectItems.map(f => f.id)

    this.setState({ loading: true, isShowDelInfo: false })
    const result = await this.props.user.deleteCollects(ids)
    const data = result.data || {}
    if (data.code === 200) {
      await this.getCollects(this.state.param)
    } else {
      this.setState({ loading: false })
    }
  }

  private onSwitchSelectStatus(item: any) {
    const selectItems = serialize.copy(this.state.selectItems)
    const index = selectItems.findIndex((itm: any) => itm.id === item.id)

    // 已经存在则取消
    if (index !== -1) {
      selectItems.splice(index, 1)
    } else {
      selectItems.push(item)
    }

    this.setState({ selectItems })
  }

  private isSelect(item: any) {
    const { selectItems } = this.state

    return selectItems.findIndex((itm: any) => itm.id === item.id) !== -1
  }

  private onClickItem(item: any) {
    const { selecting } = this.state

    if (selecting) {
      // 进行选择
      this.onSwitchSelectStatus(item)
    } else {
      // 点击进入下载
      this.onVisiblePreviewFile(true, item)
    }
  }

  private onVisiblePreviewFile(isShowPreviewFile: boolean, file: any = {}) {
    const state: any = { isShowPreviewFile }
    if (isShowPreviewFile) {
      state.file = file
    }

    this.setState({ ...state })
  }

  private async getCollects(param: { type: E_MSG_TYPE; keyword: string }) {
    this.setState({ loading: true })
    await this.props.user.getCollects(param.type, this.state.toChatId)
    const { collects } = this.props.user
    this.setState({
      param,
      selecting: false,
      initFiles: serialize.copy(collects),
      files: serialize.copy(collects),
      selectItems: [],
      isShowDelInfo: false,
      isShowPreviewFile: false,
      file: {},
      loading: false
    })
  }

  private onChangeTab(tab: any) {
    const { loading } = this.state
    if (loading) {
      return
    }

    this.setState({
      selecting: false,
      initFiles: [],
      files: [],
      selectItems: [],
      isShowDelInfo: false,
      isShowPreviewFile: false,
      file: {},
      param: { type: tab.key, keyword: '' }
    })

    this.getCollects({ type: tab.key, keyword: '' })
  }

  private onSureSearch() {
    const { param, initFiles, selectItems } = this.state
    let files: any = serialize.copy(initFiles)

    // 筛选
    if (param.keyword) {
      files = files.filter(
        (f: any) =>
          (f.name || '').includes(param.keyword) ||
          (f.from_name || '').includes(param.keyword)
      )
    }

    // 保留有效的选择项
    const selItems = selectItems.filter((si: any) =>
      files.find((f: any) => f.id === si.id)
    )

    this.setState({ files, selectItems: selItems })
  }

  constructor(props: IPropsChatPersonFile) {
    super(props)

    const params: any = this.props.match.params

    this.state = {
      selecting: false,
      initFiles: [],
      files: [],
      selectItems: [],
      isShowDelInfo: false,
      isShowPreviewFile: false,
      file: {},
      toName: params.toName || '',
      toChatId: params.toChatId || '',
      loading: false,
      param: {
        type: E_MSG_TYPE.FILES,
        keyword: ''
      }
    }

    this.onSwitchSelecting = this.onSwitchSelecting.bind(this)
    this.onSureSearch = this.onSureSearch.bind(this)
    this.onDeleteFiles = this.onDeleteFiles.bind(this)
    this.onChangeTab = this.onChangeTab.bind(this)
  }

  componentDidMount() {
    this.onChangeTab({ key: this.state.param.type })
  }

  render() {
    const {
      selecting,
      param,
      isShowDelInfo,
      isShowPreviewFile,
      file,
      loading,
      files,
      toName
    } = this.state

    return (
      <Loading
        spinning={loading}
        className={`${style.chatPersonFile} ${
          selecting ? 'pb50' : ''
        } wp100 hp100 fs0 pt50 bsb pr bg-f0f0f0 oh`}
      >
        <Header
          right={
            <span onClick={this.onSwitchSelecting}>
              {selecting ? '完成' : '选择'}
            </span>}
        >
          {toName ? `与${toName}的` : ''}相关收藏
        </Header>
        <div className="wp100 hp100 pt40 bsb pr oh">
          <em className="model-l-r palt zi400 bg-fff" />
          <em className="model-l-r part zi400 bg-fff" />
          <Tabs
            page={param.type}
            tabs={this._tabs}
            onChange={this.onChangeTab}
            swipeable={false}
            renderTabBar={props => <Tabs.DefaultTabBar {...props} page={2} />}
          >
            <div key={E_MSG_TYPE.IMAGES_VIDEO} className="wp100 hp100 pr bsb">
              {files.length === 0 ? (
                <Empty />
              ) : (
                <div className="img-or-video wp100 bsb pr10">
                  <Grid
                    data={files}
                    columnNum={4}
                    square={true}
                    hasLine={false}
                    activeStyle={false}
                    renderItem={(itm: any) => {
                      const isSel = this.isSelect(itm)

                      return (
                        <div className="img-video-itm wp100 hp100 pr">
                          {itm.type === E_MESSAGE_TYPE.FILE_VIDEO ? (
                            <Video
                              data={itm}
                              onClickVideoBox={() => this.onClickItem(itm)}
                            />
                          ) : (
                            <Image
                              className="img"
                              url={itm.url}
                              onClick={() => this.onClickItem(itm)}
                            />
                          )}
                          {isSel && (
                            <div
                              className="itm-md wp100 hp100 palt"
                              onClick={() => this.onClickItem(itm)}
                            >
                              <em
                                className={'sel-icon active mc'}
                                style={{
                                  backgroundImage: `url(${this._selIcon})`
                                }}
                              />
                            </div>
                          )}
                        </div>
                      )
                    }}
                  />
                </div>
              )}
            </div>
            <div key={E_MSG_TYPE.FILES} className="content wp100 hp100 pr bsb">
              <div className="search wp100 p10 bsb tac palt bsb bg-fff">
                <Search
                  value={param.keyword}
                  onChange={search =>
                    this.setState({
                      param: { ...param, keyword: search.trim() }
                    })
                  }
                  onSure={this.onSureSearch}
                  placeholder="输入关键字搜索"
                />
              </div>
              <div className="wp100 hp100 oay sb">
                {files.length === 0 ? (
                  <Empty />
                ) : (
                  files.map((f: ICollect) => {
                    const isSel = this.isSelect(f)

                    return (
                      <div
                        key={f.id}
                        className={`content-item pr wp100 bsb bg-fff ${
                          selecting ? 'pl50' : ''
                        }`}
                        onClick={() => this.onClickItem(f)}
                      >
                        {selecting && (
                          <em
                            className={`sel-icon ${isSel ? 'active' : ''}`}
                            style={{
                              backgroundImage: isSel
                                ? `url(${this._selIcon})`
                                : 'none'
                            }}
                          />
                        )}
                        <div className="file-msg wp100 bsb pr">
                          <img
                            className="palt"
                            src={f.icon || f.poster || f.url}
                          />
                          <div className="wp100 hp100 tal">
                            <p className="wp100 tes">{f.name}</p>
                            <p className="wp100 tes">{f.from_name}</p>
                          </div>
                          <div className="part tar">
                            <p className="wp100 tes">{f.collect_time}</p>
                            <p className="wp100 tes">{f.size}</p>
                          </div>
                        </div>
                      </div>
                    )
                  })
                )}
              </div>
            </div>
          </Tabs>
        </div>
        {selecting && (
          <div className="footer wp100 palb bg-fff">
            <div className="fl wp50 bsb">
              <span onClick={() => this.onClickOpe('send')} className="tes">
                转发
              </span>
            </div>
            <div className="fl wp50 bsb">
              <span onClick={() => this.onClickOpe('delete')} className="tes">
                删除
              </span>
            </div>
          </div>
        )}
        {/* 删除文件 */}
        <CbModal
          isShow={isShowDelInfo}
          onClose={() => this.setState({ isShowDelInfo: false })}
          onSure={this.onDeleteFiles}
        >
          <div className={`${style.deleteFile} wp100`}>
            <em
              className="db"
              style={{
                backgroundImage: `url(${require('../../assets/images/delete-info-icon.png')})`
              }}
            />
            <p className="fs12">是否确定删除选中文件？</p>
          </div>
        </CbModal>
        <PreviewFile
          visible={isShowPreviewFile}
          file={file}
          onClose={() => this.onVisiblePreviewFile(false)}
        />
      </Loading>
    )
  }
}

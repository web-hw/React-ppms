import * as React from 'react'
import {} from 'react-router-dom'
import { SearchBar } from 'antd-mobile'

import { cache } from 'global@util/storage'
import { serialize } from 'global@util/serialize'
import { Header } from '../header'
const style = require('./style')

interface IPropsSearch {
  value: string
  placeholder?: string
  onSure: () => void
  onChange: (val: string) => void
}

interface IStateSearch {}

export default class Search extends React.PureComponent<
  IPropsSearch,
  IStateSearch
> {
  render() {
    const { value, onSure, onChange, placeholder = '搜索' } = this.props
    return (
      <SearchBar
        className={style.cbSearch}
        value={value}
        placeholder={placeholder}
        onCancel={onSure}
        onSubmit={onSure}
        onChange={onChange}
        cancelText="确定"
      />
    )
  }
}

enum E_SEARCH_STATUS {
  INIT = -1, // 未获取 | 输入框为空的状态
  HAS_DATA = 1, // 获取后有数据
  EMPTY_DATA = 0 // 空数据
}

interface IPropsSearchWrap {
  placeholder?: string // 搜索输入框占位符
  hotItems?: string[] // 热门搜索数据
  onDelHot?: () => void // 热门搜索删除按钮
  hisKey?: string // 历史记录缓存key
  hisNum?: number // 历史记录缓存条数
  emptyClassName?: string // 自定义空数据样式
  onSearch: (keywords: string, done: (length: number) => void) => void // 搜索按钮
  children: React.ReactNode // 搜索列表React Node
}

interface IStateSearchWrap {
  searchStatus: E_SEARCH_STATUS
  keywords: string // 关键字
  hisItems: string[] // 历史缓存记录
}

export class SearchWrap extends React.PureComponent<
  IPropsSearchWrap,
  IStateSearchWrap
> {
  // 删除按钮
  private _delIcon = require('../../assets/images/delete-icon.png')

  // 搜索按钮
  private onSearch(keywords: string = this.state.keywords) {
    const { onSearch } = this.props
    if (!keywords) {
      return
    }

    // 搜索成功后的回调
    const done = (length: number) => {
      length > 0 && this.setHisItems(keywords)
      this.setState({
        searchStatus:
          length > 0 ? E_SEARCH_STATUS.HAS_DATA : E_SEARCH_STATUS.EMPTY_DATA
      })
    }

    onSearch(keywords, done)
  }

  // 热门搜索删除
  private onDelHot() {
    const { onDelHot } = this.props

    onDelHot && onDelHot()
  }

  // 获取历史记录
  private getHisItems() {
    const { hisKey } = this.props
    if (!hisKey) {
      return
    }

    this.setState({ hisItems: cache.get(hisKey) || [] })
  }

  // 设置历史记录
  private setHisItems(itm: string) {
    const { hisKey, hisNum = 10 } = this.props
    const hisItems = serialize.copy(this.state.hisItems)
    if (!hisKey) {
      return
    }

    // 检查是否存在
    const idx = hisItems.findIndex((his: string) => his === itm)
    idx !== -1 && hisItems.splice(idx, 1)

    // 更新缓存
    hisItems.unshift(itm)
    // 限定缓存数量
    if (hisItems.length > hisNum) {
      hisItems.length = hisNum
    }

    // 设置缓存
    cache.set(hisKey, hisItems, 30 * 24 * 60 * 60 * 1000)

    // 重置
    this.getHisItems()
  }

  // 清除历史缓存
  private onDelHis() {
    const { hisKey } = this.props
    if (!hisKey) {
      return
    }

    cache.remove(hisKey)

    // 重置
    this.getHisItems()
  }

  // 搜索输入框change
  private onChangeSearchInput(kwd: string) {
    const keywords = kwd.trim()

    this.setState({
      keywords,
      searchStatus: keywords ? this.state.searchStatus : E_SEARCH_STATUS.INIT
    })
  }

  constructor(props: IPropsSearchWrap) {
    super(props)

    this.state = {
      searchStatus: E_SEARCH_STATUS.INIT,
      keywords: '',
      hisItems: []
    }

    this.onSearch = this.onSearch.bind(this)
    this.onDelHot = this.onDelHot.bind(this)
    this.setHisItems = this.setHisItems.bind(this)
    this.getHisItems = this.getHisItems.bind(this)
    this.onDelHis = this.onDelHis.bind(this)
    this.onChangeSearchInput = this.onChangeSearchInput.bind(this)
  }

  componentDidMount() {
    this.getHisItems() // 初始化历史记录
  }

  render() {
    const {
      children,
      placeholder = '',
      hotItems = [],
      emptyClassName = ''
    } = this.props
    const { keywords, hisItems = [], searchStatus } = this.state
    const Empty = () => (
      <div className={`${emptyClassName} search-empty wp100 hp100`}>空</div>
    )

    return (
      <div
        className={`${
          style.cbSearchWrap
        } cb-search-wrap wp100 hp100 pr bsb pt50 fs0 oh`}
      >
        <Header right={<span onClick={() => this.onSearch()}>搜索</span>}>
          <SearchBar
            className={style.cbSearch}
            value={keywords}
            placeholder={placeholder}
            onSubmit={() => this.onSearch()}
            onChange={this.onChangeSearchInput}
          />
        </Header>
        <div
          className={`${
            style.cbSearchWrapContent
          } cb-search-wrap-content wp100 hp100`}
        >
          {/* 有数据 */
          searchStatus === E_SEARCH_STATUS.HAS_DATA ? (
            <div className="cb-search-content wp100 hp100 oay sb">
              {children}
            </div>
          ) : /* 初始状态 */
          searchStatus === E_SEARCH_STATUS.INIT &&
            (hotItems.length !== 0 || hisItems.length !== 0) ? (
            <div className="wp100 hp100 oay sb">
              {hotItems.length > 0 && (
                <div className="cb-hot-search wp100 bsb plr5 bg-fff">
                  <h6 className="tes">
                    热门搜索
                    <em
                      onClick={this.onDelHot}
                      style={{ backgroundImage: `url(${this._delIcon})` }}
                    />
                  </h6>
                  <div className="search-content pr10 bsb wp100">
                    {hotItems.map(itm => (
                      <span key={itm} onClick={() => this.onSearch(itm)}>
                        {itm}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {hisItems.length > 0 && (
                <div className="cb-his-search wp100 bsb plr5 bg-fff">
                  <h6 className="tes">
                    历史搜索
                    <em
                      onClick={this.onDelHis}
                      style={{ backgroundImage: `url(${this._delIcon})` }}
                    />
                  </h6>
                  <div className="search-content pr10 bsb wp100">
                    {hisItems.map(itm => (
                      <span key={itm} onClick={() => this.onSearch(itm)}>
                        {itm}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* 空数据 | 初始化没有热门与历史记录 | 错误状态 */
            <Empty />
          )}
        </div>
      </div>
    )
  }
}

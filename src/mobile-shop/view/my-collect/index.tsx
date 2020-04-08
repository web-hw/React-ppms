import * as React from 'react'
import { observer, inject } from 'mobx-react'
import { RouteComponentProps } from 'react-router-dom'
import { Tabs } from 'antd-mobile'

import { zhSort } from 'global@util/zh-sort'
import { defHead, defGroupHead } from '../../constant'
import Loading from '../../component/loading'
import Empty from '../../component/empty'
import Image from '../../component/image'
import Search from '../../component/search'
import { Header } from '../../component/header'
import LetterSort from '../../component/letter-sort'
import User from '../../store/user'
const style = require('./style')

interface IPropsMyCollect extends RouteComponentProps {
  user: User
}

interface IStateMyCollect {
  loading: boolean
  search: string
  type: E_COLLECT_TYPE
  data: any[]
}

enum E_COLLECT_TYPE {
  FRIEND = '3', // 好友
  COLLEAGUE = '4', // 同事
  GROUP = '1', // 群聊
  DIS_GROUP = '2', // 讨论组
  STRANGER = '5' // 陌生人
}

@inject('user')
@observer
export default class MyCollect extends React.Component<
  IPropsMyCollect,
  IStateMyCollect
> {
  private _tabs = [
    { title: '好友', key: E_COLLECT_TYPE.FRIEND },
    { title: '同事', key: E_COLLECT_TYPE.COLLEAGUE },
    { title: '群聊', key: E_COLLECT_TYPE.GROUP },
    { title: '讨论组', key: E_COLLECT_TYPE.DIS_GROUP },
    { title: '陌生人', key: E_COLLECT_TYPE.STRANGER }
  ]

  private onSureSearch() {
    const { loading, search, type } = this.state
    if (loading) {
      return
    }

    this.getData(type, search)
  }

  private onChangeTab(tab: any) {
    const { loading } = this.state
    if (loading) {
      return
    }

    this.getData(tab.key)
  }

  private async getData(type: E_COLLECT_TYPE, search: string = '') {
    this.setState({ loading: true })

    const res = await this.props.user.myCollect(type, search)
    const data = res.data || {}

    // 排序
    this.setState({
      type,
      search,
      loading: false,
      data: zhSort({ key: 'name', data: data.collect || [] })
    })
  }

  private getLetters(letters: any[], hasTop = true) {
    const lts = letters.map(f => f.upper)
    if (hasTop && !lts.includes('#')) {
      lts.push('#')
    }

    return lts
  }

  constructor(props: IPropsMyCollect) {
    super(props)

    this.state = {
      type: E_COLLECT_TYPE.FRIEND,
      search: '',
      loading: false,
      data: []
    }

    this.onSureSearch = this.onSureSearch.bind(this)
  }

  componentDidMount() {
    this.onChangeTab({ key: this.state.type })
  }

  render() {
    const { loading, search, type, data } = this.state

    return (
      <div className="wp100 hp100 pr bsb pt50 fs0 bg-f0f0f0 oh">
        <Header>我的收藏</Header>
        <div className="wp100 pt40 hp100 bsb pr oh">
          <em className="model-l-r palt zi400 bg-fff" />
          <em className="model-l-r part zi400 bg-fff" />
          <Tabs
            page={type}
            tabs={this._tabs}
            onChange={tab => this.onChangeTab(tab)}
            swipeable={false}
            renderTabBar={props => <Tabs.DefaultTabBar {...props} page={5} />}
          >
            <div className={`${style.myCollect} wp100 hp100 oh pr bsb`}>
              <div className="search bg-fff">
                <Search
                  value={search}
                  onChange={search => this.setState({ search: search.trim() })}
                  onSure={this.onSureSearch}
                  placeholder="输入关键字搜索"
                />
              </div>
              <Loading spinning={loading} className="oay sb">
                <LetterSort
                  letters={this.getLetters(
                    data.filter(m => m.upper !== '#'),
                    false
                  )}
                >
                  {data.length === 0 ? (
                    <Empty />
                  ) : (
                    data.map(m => (
                      <div
                        key={m.lower}
                        data-anchor={m.lower}
                        className="wp100"
                      >
                        <h6 className="cb-contact-title">{m.upper}</h6>
                        <div className="wp100 bg-fff">
                          {m.data.map((d: any) => (
                            <div
                              key={`${m.upper}-${d.id}`}
                              className="cb-contact-content"
                              onClick={() =>
                                this.props.history.replace(
                                  `/chat-person-file/${d.name}/${d.to_chat_id}`
                                )
                              }
                            >
                              <Image
                                className="icon"
                                url={d.head_img}
                                defImg={
                                  type === E_COLLECT_TYPE.GROUP ||
                                  type === E_COLLECT_TYPE.DIS_GROUP
                                    ? defGroupHead
                                    : defHead
                                }
                              />
                              <div className="content">
                                <h6 className="content-title">{d.name}</h6>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))
                  )}
                </LetterSort>
              </Loading>
            </div>
          </Tabs>
        </div>
      </div>
    )
  }
}

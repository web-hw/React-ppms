import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Flex, Icon, Button, Radio } from 'antd-mobile'

import { Header } from '../../component/header'
const style = require('./style')

enum E_TASK_TYPE {
  MAIN = 'main', // 主页
  SORT = 'sort', // 排序
  SCREEN = 'screen' // 筛选
}

enum E_SORT_TYPE {
  PUBDATE_ASC = 'pubdateAsc', // 发布时间
  BIDDER_DESC = 'bidderDesc', // 竞标人
  MOOD_DESC = 'moodDesc', // 人气
  BUDGET_ASC = 'budgetAsc', // 预算
  END_ASC = 'endAsc', // 截止时间
  END_DESC = 'endDesc'
}

type TSortType = { label: string; value: E_SORT_TYPE; icon: string }

const sortTypes: TSortType[] = [
  {
    label: '发布时间最近',
    value: E_SORT_TYPE.PUBDATE_ASC,
    icon: require('../../assets/images/task-sort-fb.png')
  },
  {
    label: '竞标人数最多',
    value: E_SORT_TYPE.BIDDER_DESC,
    icon: require('../../assets/images/task-sort-rs.png')
  },
  {
    label: '人气最高',
    value: E_SORT_TYPE.MOOD_DESC,
    icon: require('../../assets/images/task-sort-rq.png')
  },
  {
    label: '预算升序',
    value: E_SORT_TYPE.BUDGET_ASC,
    icon: require('../../assets/images/task-sort-ys.png')
  },
  {
    label: '截止时间升序',
    value: E_SORT_TYPE.END_ASC,
    icon: require('../../assets/images/task-sort-sj.png')
  },
  {
    label: '截止时间降序',
    value: E_SORT_TYPE.END_DESC,
    icon: require('../../assets/images/task-sort-sj.png')
  }
]

type TScreenItem = { label: string; value: string }
type TScreen = {
  label: string
  value: string
  item: TScreenItem[]
}
const screens: TScreen[] = [
  {
    label: '需求分类',
    value: '需求分类',
    item: [
      { label: '全部', value: '全部' },
      { label: '科研', value: '科研' },
      { label: '生产', value: '生产' },
      { label: '设计', value: '设计' },
      { label: '服务', value: '服务' },
      { label: '其他', value: '其他' }
    ]
  },
  {
    label: '需求领域',
    value: '需求领域',
    item: [
      { label: '全部', value: '全部' },
      { label: '元件器件', value: '元件器件' },
      { label: '装备材料', value: '装备材料' },
      { label: '部件组件', value: '部件组件' },
      { label: '整机产品', value: '整机产品' },
      { label: '平台系统', value: '平台系统' },
      { label: '鉴定检测', value: '鉴定检测' },
      { label: '知识产权', value: '知识产权' },
      { label: '科学研究', value: '科学研究' },
      { label: '信息化', value: '信息化' },
      { label: '其它', value: '其它' }
    ]
  },
  {
    label: '需求来源',
    value: '需求来源',
    item: [
      { label: '全部', value: '全部' },
      { label: '公司', value: '公司' },
      { label: '个人', value: '个人' },
      { label: '军政', value: '军政' }
    ]
  },
  {
    label: '需求状态',
    value: '需求状态',
    item: [
      { label: '全部', value: '全部' },
      { label: '招标中', value: '招标中' },
      { label: '带对接', value: '带对接' },
      { label: '已结束', value: '已结束' }
    ]
  },
  {
    label: '截止时间',
    value: '截止时间',
    item: [
      { label: '全部', value: '全部' },
      { label: '今日公开', value: '今日公开' },
      { label: '3天内到期', value: '3天内到期' },
      { label: '7天内到期', value: '7天内到期' },
      { label: '15天内到期', value: '15天内到期' },
      { label: '15天以上', value: '15天以上' }
    ]
  },
  {
    label: '面向对象',
    value: '面向对象',
    item: [
      { label: '全部', value: '全部' },
      { label: '全平台', value: '全平台' },
      { label: '公司内部', value: '公司内部' }
    ]
  }
]

interface IPropsTask extends RouteComponentProps {}

interface IStateTask {
  screen: { [propName: string]: { [propName: string]: string } }
}

export default class Task extends React.PureComponent<IPropsTask, IStateTask> {
  private _eyeIcon = require('../../assets/images/task-eye-icon.png')
  private _bmIcon = require('../../assets/images/task-bm-icon.png')

  // 跳转
  private onJump(type: E_TASK_TYPE, sort: string, screen: string[]) {
    let pathname = '/task'
    const state = { sort, screen }

    if (type === E_TASK_TYPE.SCREEN || type === E_TASK_TYPE.SORT) {
      pathname = `${pathname}/${type}`
    }

    this.props.history.replace({ pathname, state })
  }

  // 处理返回
  private onGoBack() {
    const { type, sort, screen } = this.getRouteInfo()

    if (type === E_TASK_TYPE.SCREEN || type === E_TASK_TYPE.SORT) {
      this.onJump(E_TASK_TYPE.MAIN, sort, screen)
    } else {
      this.props.history.goBack()
    }
  }

  // 获取数据
  private getRouteInfo() {
    const { state } = this.props.location
    const params: any = this.props.match.params
    const { sort = '', screen = {} } = state || {}

    return { sort, screen, type: params.type || E_TASK_TYPE.MAIN }
  }

  // 切换筛选条件
  private onSelectScreen(event: any) {
    const target = event.target
    if (!target) {
      return
    }

    const className = target.className || ''
    if (target.nodeName !== 'DIV' || !className.includes('screen-content')) {
      return
    }

    const item = target.getAttribute('data-item')
    const value = target.getAttribute('data-value')
    if (!item || !value) {
      return
    }

    const { screen } = this.state
    const currItem = screen[item]
    if (!currItem) {
      screen[item] = { [value]: value }
    } else {
      currItem[value] === undefined
        ? (currItem[value] = value)
        : delete currItem[value]
    }

    this.setState({
      screen: { ...screen }
    })
  }

  // 检查是否选中
  private onValidScreenIsSel(item: string, value: string) {
    const { screen } = this.state
    const currItem = screen[item]

    return currItem && currItem[value]
  }

  constructor(props: IPropsTask) {
    super(props)

    this.state = {
      screen: this.getRouteInfo().screen
    }

    this.onGoBack = this.onGoBack.bind(this)
    this.onSelectScreen = this.onSelectScreen.bind(this)
    this.onValidScreenIsSel = this.onValidScreenIsSel.bind(this)
  }

  render() {
    const { type, sort, screen } = this.getRouteInfo()

    return (
      <div className="wp100 hp100 pr bsb pt50 fs0 bg-f0f0f0 oh">
        <Header
          onClickLeft={this.onGoBack}
          right={<Icon type="search" size="sm" />}
        >
          需求中心
        </Header>
        <div className="wp100 hp100 pr pt50 bsb">
          <Flex className={`${style.condition} wp100 palt`}>
            <Flex.Item
              className={type === E_TASK_TYPE.SORT ? 'active' : ''}
              onClick={() => this.onJump(E_TASK_TYPE.SORT, sort, screen)}
            >
              排序
              <em className="sort-icon" />
            </Flex.Item>
            <Flex.Item
              className={type === E_TASK_TYPE.SCREEN ? 'active' : ''}
              onClick={() => this.onJump(E_TASK_TYPE.SCREEN, sort, screen)}
            >
              筛选
              <em
                className="sx-icon"
                style={{
                  backgroundImage: `url(${require('../../assets/images/sx-icon.png')})`
                }}
              />
            </Flex.Item>
          </Flex>
          {// 主页
          type === E_TASK_TYPE.MAIN ? (
            <div className="wp100 hp100 pb50 bsb pr">
              <div className="wp100 hp100 oay sb">
                <div className={`${style.item} wp100 mt5 bsb bg-fff`}>
                  <div className="title wp100">
                    <span
                      className="fl tes fs15"
                      onClick={() => this.props.history.push('/task-detail')}
                    >
                      【000019】系统维护与开发系统维护与开发
                    </span>
                    <span className="fr tes fs12">
                      <em>9</em>天<em>12</em>小时后对接截止
                    </span>
                  </div>
                  <Flex className="content wp100">
                    <Flex.Item>
                      紧急程度:<span className="jj">急</span>
                    </Flex.Item>
                    <Flex.Item>
                      周期:<span>60天</span>
                    </Flex.Item>
                    <Flex.Item>
                      预算:<span>￥6789</span>
                    </Flex.Item>
                  </Flex>
                  <div className="footer wp100">
                    <div className="other-msg fl">
                      <span>
                        <em
                          style={{
                            backgroundImage: `url(${this._eyeIcon})`
                          }}
                        />
                        235
                      </span>
                      <span>
                        <em
                          style={{
                            backgroundImage: `url(${this._bmIcon})`
                          }}
                        />
                        235
                      </span>
                    </div>
                    <Button
                      className="cb-btn fr"
                      onClick={() => this.props.history.push('/partake-biding')}
                    >
                      参与竞标
                    </Button>
                  </div>
                </div>
                <div className={`${style.item} wp100 mt5 bsb bg-fff`}>
                  <div className="title wp100">
                    <span className="fl tes fs15">
                      【000019】系统维护与开发系统维护与开发
                    </span>
                    <span className="fr tes fs12">
                      <em>9</em>天<em>12</em>小时后对接截止
                    </span>
                  </div>
                  <Flex className="content wp100">
                    <Flex.Item>
                      紧急程度:<span className="jj">急</span>
                    </Flex.Item>
                    <Flex.Item>
                      周期:<span>60天</span>
                    </Flex.Item>
                    <Flex.Item>
                      预算:<span>￥6789</span>
                    </Flex.Item>
                  </Flex>
                  <div className="footer wp100">
                    <div className="other-msg fl">
                      <span>
                        <em
                          style={{
                            backgroundImage: `url(${this._eyeIcon})`
                          }}
                        />
                        235
                      </span>
                      <span>
                        <em
                          style={{
                            backgroundImage: `url(${this._bmIcon})`
                          }}
                        />
                        235
                      </span>
                    </div>
                    <Button className="cb-btn fr">参与竞标</Button>
                  </div>
                </div>
                <div className={`${style.item} wp100 mt5 bsb bg-fff`}>
                  <div className="title wp100">
                    <span className="fl tes fs15">
                      【000019】系统维护与开发系统维护与开发
                    </span>
                    <span className="fr tes fs12">
                      <em>9</em>天<em>12</em>小时后对接截止
                    </span>
                  </div>
                  <Flex className="content wp100">
                    <Flex.Item>
                      紧急程度:<span className="jj">急</span>
                    </Flex.Item>
                    <Flex.Item>
                      周期:<span>60天</span>
                    </Flex.Item>
                    <Flex.Item>
                      预算:<span>￥6789</span>
                    </Flex.Item>
                  </Flex>
                  <div className="footer wp100">
                    <div className="other-msg fl">
                      <span>
                        <em
                          style={{
                            backgroundImage: `url(${this._eyeIcon})`
                          }}
                        />
                        235
                      </span>
                      <span>
                        <em
                          style={{
                            backgroundImage: `url(${this._bmIcon})`
                          }}
                        />
                        235
                      </span>
                    </div>
                    <Button className="cb-btn fr">参与竞标</Button>
                  </div>
                </div>
                <div className={`${style.item} wp100 mt5 bsb bg-fff`}>
                  <div className="title wp100">
                    <span className="fl tes fs15">
                      【000019】系统维护与开发系统维护与开发
                    </span>
                    <span className="fr tes fs12">
                      <em>9</em>天<em>12</em>小时后对接截止
                    </span>
                  </div>
                  <Flex className="content wp100">
                    <Flex.Item>
                      紧急程度:<span className="jj">急</span>
                    </Flex.Item>
                    <Flex.Item>
                      周期:<span>60天</span>
                    </Flex.Item>
                    <Flex.Item>
                      预算:<span>￥6789</span>
                    </Flex.Item>
                  </Flex>
                  <div className="footer wp100">
                    <div className="other-msg fl">
                      <span>
                        <em
                          style={{
                            backgroundImage: `url(${this._eyeIcon})`
                          }}
                        />
                        235
                      </span>
                      <span>
                        <em
                          style={{
                            backgroundImage: `url(${this._bmIcon})`
                          }}
                        />
                        235
                      </span>
                    </div>
                    <Button className="cb-btn fr">参与竞标</Button>
                  </div>
                </div>
                <div className={`${style.item} wp100 mt5 bsb bg-fff`}>
                  <div className="title wp100">
                    <span className="fl tes fs15">
                      【000019】系统维护与开发系统维护与开发
                    </span>
                    <span className="fr tes fs12">
                      <em>9</em>天<em>12</em>小时后对接截止
                    </span>
                  </div>
                  <Flex className="content wp100">
                    <Flex.Item>
                      紧急程度:<span className="jj">急</span>
                    </Flex.Item>
                    <Flex.Item>
                      周期:<span>60天</span>
                    </Flex.Item>
                    <Flex.Item>
                      预算:<span>￥6789</span>
                    </Flex.Item>
                  </Flex>
                  <div className="footer wp100">
                    <div className="other-msg fl">
                      <span>
                        <em
                          style={{
                            backgroundImage: `url(${this._eyeIcon})`
                          }}
                        />
                        235
                      </span>
                      <span>
                        <em
                          style={{
                            backgroundImage: `url(${this._bmIcon})`
                          }}
                        />
                        235
                      </span>
                    </div>
                    <Button className="cb-btn fr">参与竞标</Button>
                  </div>
                </div>
              </div>
              <footer className={`${style.footer} wp100 bg-fff palb zi1000`}>
                <Flex>
                  <Flex.Item
                    onClick={() => this.props.history.push('/task')}
                    className="tac bsb"
                  >
                    <img
                      src={require('../../assets/images/task-home-act.png')}
                    />
                    <span className="active db tes mt5 fs12">首页</span>
                  </Flex.Item>
                  <Flex.Item
                    onClick={() => this.props.history.push('/task-release')}
                    className="partake tac bsb"
                  >
                    <img
                      src={require('../../assets/images/task-partake-def.png')}
                    />
                    <span className="db tes mt5 fs12">参与</span>
                  </Flex.Item>
                  <Flex.Item
                    onClick={() => this.props.history.push('/my-task')}
                    className="tac bsb"
                  >
                    <img src={require('../../assets/images/task-my-def.png')} />
                    <span className="msg db tes mt5 fs12">我的</span>
                  </Flex.Item>
                </Flex>
              </footer>
            </div>
          ) : // 排序
          type === E_TASK_TYPE.SORT ? (
            <div className="wp100 hp100 oay sb bg-fff bsb plr20 cb-radio">
              {sortTypes.map(type => (
                <Radio.RadioItem
                  key={type.value}
                  checked={sort === type.value}
                  onClick={() =>
                    this.onJump(
                      E_TASK_TYPE.MAIN,
                      sort === type.value ? '' : type.value,
                      screen
                    )
                  }
                  className={style.sortRadio}
                >
                  <em
                    style={{
                      backgroundImage: `url(${type.icon})`
                    }}
                  />
                  {type.label}
                </Radio.RadioItem>
              ))}
            </div>
          ) : // 筛选
          type === E_TASK_TYPE.SCREEN ? (
            <div className="wp100 hp100 pb50 bsb pr">
              <div
                className="wp100 hp100 oay sb bg-fff"
                onClick={this.onSelectScreen}
              >
                {screens.map(screen => (
                  <div
                    key={screen.value}
                    className={`${style.screenItem} wp100`}
                  >
                    <h6 className="fs13 fw700 wp100 bsb tes pl20 pr20">
                      {screen.label}
                    </h6>
                    <div className="wp100 bsb pl10 pr20">
                      {screen.item.map(itm => (
                        <span
                          key={`${screen.value}-${itm.value}`}
                          className={`${
                            this.onValidScreenIsSel(screen.value, itm.value)
                              ? 'active'
                              : ''
                          } item pt10 pl10 bsb`}
                        >
                          <div
                            data-item={screen.value}
                            data-value={itm.value}
                            className="screen-content wp100 tes fs12 tac bsb plr5"
                          >
                            {itm.label}
                          </div>
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <footer
                className={`${
                  style.footer
                } screen-footer wp100 bg-fff palb zi1000`}
              >
                <Flex>
                  <Flex.Item>重置</Flex.Item>
                  <Flex.Item>完成</Flex.Item>
                </Flex>
              </footer>
            </div>
          ) : null}
        </div>
      </div>
    )
  }
}

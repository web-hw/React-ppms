import * as React from 'react'
import { Flex, Badge } from 'antd-mobile'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { toast } from 'global@util/toast/mobile'

const style = require('./style')

interface INav {
  title: string
  url: string
  icon: string
  actIcon: string
  isAct?: boolean
}

const config: INav[] = [
  {
    title: '首页',
    url: '/home',
    icon: require('./images/home-def.png'),
    actIcon: require('./images/home-act.png')
  },
  {
    title: '发现',
    url: '/find',
    icon: require('./images/find-def.png'),
    actIcon: require('./images/find-act.png')
  },
  {
    title: '消息',
    url: '/msg',
    icon: require('./images/msg-def.png'),
    actIcon: require('./images/msg-act.png')
  },
  {
    title: '采购单',
    url: '/order',
    icon: require('./images/order-def.png'),
    actIcon: require('./images/order-def.png')
  },
  {
    title: '我的',
    url: '/my',
    icon: require('./images/my-def.png'),
    actIcon: require('./images/my-act.png')
  }
]

export interface IPropsFooter extends RouteComponentProps {
  hasMsg?: boolean
  orders?: number
}

export interface IStateFooter {}

export const Footer: any = withRouter(
  class extends React.PureComponent<IPropsFooter, IStateFooter> {
    // 导航项
    private _navs: INav[]

    // 验证激活项
    private validActLink(nav: INav): INav {
      const { pathname } = this.props.location

      nav.isAct = pathname === nav.url

      return nav
    }

    // 跳转
    private onJump(url: string) {
      this.props.history.push(url)
    }

    constructor(props: IPropsFooter) {
      super(props)

      this._navs = config.map(nav => this.validActLink(nav))

      this.validActLink = this.validActLink.bind(this)
      this.onJump = this.onJump.bind(this)
    }

    render() {
      const { hasMsg = false, orders = 0 } = this.props

      return (
        <footer className={`${style.footer} wp100 bg-fff palb zi900`}>
          <Flex>
            {this._navs.map(nav => (
              <Flex.Item
                key={nav.title}
                className="tac plr5 bsb"
                onClick={() => this.onJump(nav.url)}
              >
                {nav.url === '/msg' ? (
                  <Badge dot={hasMsg}>
                    <img src={nav.isAct ? nav.actIcon : nav.icon} />
                  </Badge>
                ) : nav.url === '/order' ? (
                  <Badge text={orders}>
                    <img src={nav.isAct ? nav.actIcon : nav.icon} />
                  </Badge>
                ) : (
                  <img
                    src={nav.isAct ? nav.actIcon : nav.icon}
                    className="mt5"
                  />
                )}
                <span
                  className={`${nav.isAct ? 'active' : ''} db tes mt5 fs12`}
                >
                  {nav.title}
                </span>
              </Flex.Item>
            ))}
          </Flex>
        </footer>
      )
    }
  }
)

interface INavV1 {
  title: string
  url: string
  defIcon: string
  actIcon: string
}

export interface IPropsFooterV1 extends RouteComponentProps {
  navs?: INavV1[]
}

export interface IStateFooterV1 {}

export const FooterV1: any = withRouter(
  class extends React.PureComponent<IPropsFooterV1, IPropsFooterV1> {
    private defNavs: INavV1[] = [
      {
        title: '消息',
        url: '/msg',
        defIcon: require('./images/chat-msg-def.png'),
        actIcon: require('./images/chat-msg-act.png')
      },
      {
        title: '通讯录',
        url: '/address-book',
        defIcon: require('./images/chat-address-book-def.png'),
        actIcon: require('./images/chat-address-book-act.png')
      }
      // {
      //   title: '商圈',
      //   url: null,
      //   defIcon: require('./images/chat-bus-circle-def.png'),
      //   actIcon: require('./images/chat-bus-circle-act.png')
      // }
    ]

    private onJump(url: string) {
      if (!url) {
        toast.info('暂未开放，敬请期待！')
      } else {
        this.props.history.replace(url)
      }
    }

    render() {
      const { navs = this.defNavs } = this.props

      return (
        <footer className={`${style.footer} wp100 bg-fff palb zi900`}>
          <Flex>
            {navs.map((nav: INavV1) => {
              const { pathname } = this.props.location
              const isAct = pathname === nav.url

              return (
                <Flex.Item
                  key={nav.title}
                  className="tac plr5 bsb"
                  onClick={() => this.onJump(nav.url)}
                >
                  <img
                    src={isAct ? nav.actIcon : nav.defIcon}
                    className="mt5"
                  />
                  <span className={`${isAct ? 'active' : ''} db tes fs12`}>
                    {nav.title}
                  </span>
                </Flex.Item>
              )
            })}
          </Flex>
        </footer>
      )
    }
  }
)

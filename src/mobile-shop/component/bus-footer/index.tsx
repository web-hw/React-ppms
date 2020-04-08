import * as React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { Flex } from 'antd-mobile'

const style = require('./style')

interface IPropsBusFooter extends RouteComponentProps {}

interface IStateBusFooter {}

interface INav {
  title?: string
  url?: string
  icon: string
  isFixed?: boolean
  actIcon?: string
  badge?: number
}

const navs: INav[] = [
  {
    title: '话题',
    url: '/',
    icon: require('./images/topic-icon-def.png'),
    actIcon: require('./images/topic-icon-def.png')
  },
  {
    title: '圈子',
    url: '/bus-circle',
    icon: require('./images/circle-icon-act.png'),
    actIcon: require('./images/circle-icon-act.png')
  },
  {
    isFixed: true,
    icon: require('./images/bus-create-icon.png')
  },
  {
    title: '专家',
    url: '/',
    icon: require('./images/expert-icon-def.png'),
    actIcon: require('./images/expert-icon-def.png')
  },
  {
    title: '我的',
    url: '/',
    badge: 15,
    icon: require('./images/my-icon-def.png'),
    actIcon: require('./images/my-icon-def.png')
  }
]

export const BusFooter: any = withRouter(
  class extends React.PureComponent<IPropsBusFooter, IStateBusFooter> {
    constructor(props: IPropsBusFooter) {
      super(props)
    }

    render() {
      const { pathname } = this.props.location

      return (
        <footer className={`${style.footer} wp100 bg-fff palb zi900 bsb`}>
          <Flex>
            {navs.map((nav, idx) =>
              nav.isFixed ? (
                <div key={idx} className="fixed-width">
                  <div className="fixed-width-content">
                    <img src={nav.icon} />
                  </div>
                </div>
              ) : (
                <Flex.Item key={idx} className="tac bsb">
                  <img src={nav.url === pathname ? nav.actIcon : nav.icon} />
                  <span
                    className={`${
                      nav.url === pathname ? 'active' : ''
                    } db tes fs12`}
                  >
                    {nav.title}
                  </span>
                  {nav.badge ? <em className="cb-badge">{nav.badge}</em> : null}
                </Flex.Item>
              )
            )}
          </Flex>
        </footer>
      )
    }
  }
)

// export const BusFooter = withRouter(
//   class extends React.PureComponent<IPropsBusFooter, IStateBusFooter> {
//     constructor(props: IPropsBusFooter) {
//       super(props)
//     }

//     render() {
//       const { pathname } = this.props.location

//       return (
//         <footer className={`${style.footer} wp100 bg-fff palb zi900 bsb`}>
//           <Flex>
//             {navs.map((nav, idx) =>
//               nav.isFixed ? (
//                 <div key={idx} className="fixed-width">
//                   <div className="fixed-width-content">
//                     <img src={nav.icon} />
//                   </div>
//                 </div>
//               ) : (
//                 <Flex.Item key={idx} className="tac bsb">
//                   <img src={nav.url === pathname ? nav.actIcon : nav.icon} />
//                   <span
//                     className={`${
//                       nav.url === pathname ? 'active' : ''
//                     } db tes fs12`}
//                   >
//                     {nav.title}
//                   </span>
//                   {nav.badge ? <em className="cb-badge">{nav.badge}</em> : null}
//                 </Flex.Item>
//               )
//             )}
//           </Flex>
//         </footer>
//       )
//     }
//   }
// )

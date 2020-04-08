import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Icon } from 'antd-mobile'
import QueueAnim from 'rc-queue-anim'

import { Header } from '../../component/header'
const style = require('./style')

interface IPropsMyPositionSelect extends RouteComponentProps {}

type TItem = { name: string; id: string }
interface IStateMyPositionSelect {
  positions: TItem[]
}

enum E_POS_TYPE {
  PROVINCE = 'province',
  CITY = 'city',
  AREA = 'area'
}

const Position = (props: {
  positions: TItem[]
  onClick: (pos: TItem) => void
}) => (
  <div className="palt wp100">
    {props.positions.map(pos => (
      <div
        key={pos.id}
        className={`${style.item} wp100 pl15 bsb`}
        onClick={() => props.onClick(pos)}
      >
        <div className="wp100 bsb">
          <span className="fl">{pos.name}</span>
          <Icon className="fr" type="right" size="md" />
        </div>
      </div>
    ))}
  </div>
)

const data = [
  {
    label: '北京',
    value: 'beijing',
    children: [
      {
        label: '北京市',
        value: 'beijingshi',
        children: [
          {
            label: '朝阳区',
            value: 'chaoyangqu'
          },
          {
            label: '崇文区',
            value: 'chongwenqu'
          },
          {
            label: '大兴区',
            value: 'daxingqu'
          }
        ]
      }
    ]
  },
  {
    label: '四川',
    value: 'sichuan',
    children: [
      {
        label: '绵阳',
        value: 'mianyang',
        children: [
          {
            label: '三台',
            value: 'santai'
          },
          {
            label: '北川',
            value: 'beichuan'
          },
          {
            label: '经开区',
            value: 'jingkaiqu'
          }
        ]
      },
      {
        label: '德阳',
        value: 'deyang',
        children: [
          {
            label: '广汉',
            value: 'guanghan'
          }
        ]
      },
      {
        label: '乐山',
        value: 'leshan',
        children: [
          {
            label: '马边',
            value: 'mabian'
          }
        ]
      }
    ]
  },
  {
    label: '贵州',
    value: 'guizhou',
    children: [
      {
        label: '贵阳',
        value: 'guiyang',
        children: [
          {
            label: '南明区',
            value: 'nanmingqu'
          }
        ]
      }
    ]
  },
  {
    label: '甘肃',
    value: 'gansu'
  },
  {
    label: '云南',
    value: 'yunnan',
    children: [
      {
        label: '丽江',
        value: 'lijiang'
      }
    ]
  }
]

export default class MyPositionSelect extends React.PureComponent<
  IPropsMyPositionSelect,
  IStateMyPositionSelect
> {
  // 选择位置
  private onSelectPosition(pos: any) {
    // 获取下一级位置
    const params: any = this.props.match.params
    const type = this.getPositionType(params.type)
    const state: any = this.props.location.state || {}
    const from = this.getFromRoute()
    let url = `/my-position-select/${encodeURIComponent(from)}`
    if (type === E_POS_TYPE.PROVINCE) {
      url += `/${E_POS_TYPE.CITY}`
      state[E_POS_TYPE.PROVINCE] = pos
    } else if (type === E_POS_TYPE.CITY) {
      url += `/${E_POS_TYPE.AREA}`
      state[E_POS_TYPE.CITY] = pos
    } else {
      url = from
      state[E_POS_TYPE.AREA] = pos
    }

    // 跳转
    this.props.history.push(url, state)
  }

  // 获取来自路由
  private getFromRoute() {
    const params: any = this.props.match.params
    return decodeURIComponent(params.from)
  }

  // 获取当前位置类型
  private getPositionType(type: any) {
    let currType = type
    if (
      currType !== E_POS_TYPE.PROVINCE &&
      currType !== E_POS_TYPE.CITY &&
      currType !== E_POS_TYPE.AREA
    ) {
      currType = E_POS_TYPE.PROVINCE
    }

    return currType
  }

  // 获取位置
  private getPosition(
    type: E_POS_TYPE,
    state = this.props.location.state || {}
  ) {
    // 获取省份
    const pros = data || []
    if (type === E_POS_TYPE.PROVINCE) {
      return pros.map((pros: any) => ({ name: pros.label, id: pros.value }))
    }

    // 获取市区
    const hasCity: any =
      data.find((pros: any) => pros.value === state[E_POS_TYPE.PROVINCE].id) ||
      {}
    const citys: any = hasCity.children || []
    if (type === E_POS_TYPE.CITY) {
      return citys.map((pros: any) => ({ name: pros.label, id: pros.value }))
    }

    // 获取区域
    const hasArea: any =
      citys.find((pros: any) => pros.value === state[E_POS_TYPE.CITY].id) || {}
    const areas: any = hasArea.children || []

    if (type === E_POS_TYPE.AREA) {
      return areas.map((pros: any) => ({ name: pros.label, id: pros.value }))
    }

    return []
  }

  constructor(props: IPropsMyPositionSelect) {
    super(props)

    const params: any = this.props.match.params
    this.state = {
      positions: this.getPosition(this.getPositionType(params.type))
    }

    this.onSelectPosition = this.onSelectPosition.bind(this)
  }

  componentWillReceiveProps(nextProps: IPropsMyPositionSelect) {
    const nextParams: any = nextProps.match.params
    const params: any = this.props.match.params
    const state = nextProps.location.state || {}

    if (nextParams.type !== params.type) {
      const positions = this.getPosition(
        this.getPositionType(nextParams.type),
        state
      )
      if (positions && positions.length > 0) {
        this.setState({ positions })
      } else {
        this.props.history.push(this.getFromRoute(), state)
      }
    }
  }

  render() {
    const params: any = this.props.match.params
    const type = this.getPositionType(params.type)

    return (
      <div
        className={`${style.myPositionSelect} wp100 hp100 fs0 pt50 bsb pr oh`}
      >
        <Header>我的地址</Header>
        <div className="wp100 hp100 pr oay sb">
          <QueueAnim type={['bottom', 'top']} duration={1000} delay={1000}>
            {type === E_POS_TYPE.PROVINCE ? (
              <Position
                key={E_POS_TYPE.PROVINCE}
                positions={this.state.positions}
                onClick={this.onSelectPosition}
              />
            ) : type === E_POS_TYPE.CITY ? (
              <Position
                key={E_POS_TYPE.CITY}
                positions={this.state.positions}
                onClick={this.onSelectPosition}
              />
            ) : type === E_POS_TYPE.AREA ? (
              <Position
                key={E_POS_TYPE.AREA}
                positions={this.state.positions}
                onClick={this.onSelectPosition}
              />
            ) : null}
          </QueueAnim>
        </div>
      </div>
    )
  }
}

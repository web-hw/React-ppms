import * as React from 'react'
import {} from 'react-router-dom'
import { Popover, Icon } from 'antd-mobile'

const style = require('./style')

export interface IPopoverItem {
  title: string // 显示title
  key?: string
  icon?: string // 显示图标
  disabled?: boolean // 是否可用
}

interface IPropsCbPopover {
  isShow: boolean // 是否显示
  items: IPopoverItem[] // 操作项
  onSelect: (item: any) => void // 选中回调
  onChange: (isShow: boolean) => void // visible change
}

interface IStateCbPropover {}

export default class CbPopover extends React.PureComponent<
  IPropsCbPopover,
  IStateCbPropover
> {
  // 获取Popover项
  private getPopoverItems() {
    const { items } = this.props

    return items.map(item => (
      <Popover.Item
        key={item.key || item.title}
        icon={
          item.icon ? (
            <em
              className="icon"
              style={{ backgroundImage: `url(${item.icon})` }}
            />
          ) : (
            ''
          )
        }
        disabled={!!item.disabled}
      >
        {item.title}
      </Popover.Item>
    ))
  }

  render() {
    const { isShow, onSelect, onChange } = this.props
    return (
      <Popover
        mask={true}
        onSelect={onSelect}
        visible={isShow}
        overlay={this.getPopoverItems()}
        onVisibleChange={onChange}
      >
        {this.props.children}
      </Popover>
    )
  }
}

interface IPropsOpePopover {
  onSelect: (item: any) => void
  items?: IPopoverItem[]
}

interface IStateOpePopover {
  isShow: boolean
}

class CbOpePopover<
  Props extends IPropsOpePopover,
  State extends IStateOpePopover
> extends React.PureComponent<Props, State> {
  // 默认items
  _items: IPopoverItem[]
  // 操作icon
  _opeIcon: React.ReactNode

  // visible change
  onChange(isShow: boolean) {
    this.setState({ isShow })
  }

  // select item
  onSelect(item: any) {
    this.props.onSelect(item)
    this.setState({ isShow: false })
  }

  constructor(props: Props) {
    super(props)

    this.onSelect = this.onSelect.bind(this)
  }

  render() {
    const { items = this._items } = this.props
    return (
      <CbPopover
        items={items}
        isShow={this.state.isShow}
        onSelect={this.onSelect}
        onChange={isShow => this.onChange(isShow)}
      >
        {this._opeIcon}
      </CbPopover>
    )
  }
}

interface IPropsEllipsisPopover extends IPropsOpePopover {}

interface IStateEllipsisPopover extends IStateOpePopover {}

export class EllipsisPopover extends CbOpePopover<
  IPropsEllipsisPopover,
  IStateEllipsisPopover
> {
  constructor(props: IPropsEllipsisPopover) {
    super(props)

    this.state = {
      isShow: false
    }

    this._items = [
      { title: '分享', icon: require('../../assets/images/share-icon.png') },
      { title: '举报', icon: require('../../assets/images/report-icon.png') }
    ]

    this._opeIcon = <Icon size="md" type="ellipsis" />
  }

  render() {
    return super.render()
  }
}

interface IPropsAddPopover extends IPropsOpePopover {}

interface IStateAddPopover extends IStateOpePopover {}

export class AddPopover extends CbOpePopover<
  IPropsAddPopover,
  IStateAddPopover
> {
  constructor(props: IPropsAddPopover) {
    super(props)

    this.state = {
      isShow: false
    }

    this._items = [
      {
        key: '/add-friend',
        title: '添加好友',
        icon: require('../../assets/images/add-fd-icon.png')
      },
      {
        key: '/edit-name-group',
        title: '发起群聊',
        icon: require('../../assets/images/ql-icon.png')
      }
    ]

    this._opeIcon = (
      <b
        className={style.addIcon}
        style={{
          backgroundImage: `url(${require('../../assets/images/msg-more.png')})`
        }}
      />
    )
  }

  render() {
    return super.render()
  }
}

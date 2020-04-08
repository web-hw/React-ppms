import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {} from 'react-router-dom'
import { Drawer, Spin, Icon } from 'antd'
import { DrawerProps } from 'antd/es/drawer'

const style = require('./style')

interface IPropsCbDrawer extends DrawerProps {
  children: React.FunctionComponentElement<{
    setLoading: (loading: boolean) => void
  }>
}

interface IStateCbDrawer {
  loading: boolean
}

export default class CbDrawer extends React.PureComponent<
  IPropsCbDrawer,
  IStateCbDrawer
> {
  static drawer(options: IPropsCbDrawer) {
    // drawer 容器 Todo 当前挂载到body下面
    const container = document.body
    const div = document.createElement('div')
    container.appendChild(div)

    // 通过useState控制显示隐藏
    const JsDrawer = (props: IPropsCbDrawer) => {
      const [visible, setVisible] = React.useState(true)
      const options: IPropsCbDrawer = {
        ...props,
        visible,
        getContainer: false,
        onClose() {
          setVisible(false)
        },
        afterVisibleChange(visible) {
          !visible && container.removeChild(div)
        }
      }

      return <CbDrawer {...options} />
    }

    // 渲染
    ReactDOM.render(<JsDrawer {...options} />, div)
  }

  // 更改loading
  private setLoading(loading: boolean) {
    this.setState({ loading })
  }

  constructor(props: IPropsCbDrawer) {
    super(props)

    this.state = {
      loading: false
    }

    this.setLoading = this.setLoading.bind(this)
  }

  render() {
    const { loading } = this.state
    const options = {
      destroyOnClose: false,
      ...this.props
    }

    return (
      <Drawer {...options} className={`${style.cbDrawer} ${options.className}`}>
        <Spin
          spinning={loading}
          indicator={
            <Icon type="loading" style={{ fontSize: 24 }} spin={true} />}
        >
          <div className="wp100 hp100 oay sb">
            {!options.children
              ? null
              : React.cloneElement(options.children, {
                setLoading: this.setLoading
              })}
          </div>
        </Spin>
      </Drawer>
    )
  }
}

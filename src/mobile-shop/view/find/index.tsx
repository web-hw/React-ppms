import * as React from 'react'
import {} from 'react-router-dom'
import { Tabs } from 'antd-mobile'

import { Footer } from '../../component/footer'
import Recommend from './recommend'
import BusCircle from './bus-circle'
const style = require('./style')

interface IPropsFind {}

interface IStateFind {}

export default class Find extends React.PureComponent<IPropsFind, IStateFind> {
  constructor(props: IPropsFind) {
    super(props)

    this.onChangeFindTab = this.onChangeFindTab.bind(this)
  }

  // tab change
  onChangeFindTab() {}

  render() {
    const findTabs = [{ title: '推荐' }, { title: '商圈' }]

    return (
      <div className="wp100 hp100 fs0 bsb pb50">
        {/* find content */}
        <div
          className={`${
            style.find
          } wp100 hp100 pl10 pr10 pb20 bsb pt40 pr bg-f0f0f0`}
        >
          <Tabs
            tabs={findTabs}
            onChange={this.onChangeFindTab}
            renderTabBar={props => <Tabs.DefaultTabBar {...props} page={5} />}
          >
            <Recommend />
            <BusCircle />
          </Tabs>
        </div>
        <Footer />
      </div>
    )
  }
}

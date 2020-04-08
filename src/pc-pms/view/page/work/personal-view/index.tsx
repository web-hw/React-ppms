import * as React from 'react'
import {} from 'react-router-dom'
import {} from 'antd'

import Calendar from '../calendar'
import NoticeInfo from '../notice-info'
import News from '../news'
import Carousel from '../carousel'
import Danger from '../danger'
import Question from '../question'
import FinishTerm from '../finish-term'
import CreateTerm from '../create-term'
import Demand from '../demand'
import Project from '../project'
import NewestData from '../newest-data'
import Introduce from '../introduce'
const style = require('./style')

interface IPropsPersonalView {}

interface IStatePersonalView {}

export default class PersonalView extends React.PureComponent<
  IPropsPersonalView,
  IStatePersonalView
> {
  render() {
    return (
      <div className="wp100 hp100 oay sb">
        {/* banner */}
        <Carousel
          imgs={[
            { img: require('../../../../assets/images/test1.png') },
            { img: require('../../../../assets/images/test2.png') }
          ]}
        />
        <div style={{ marginLeft: '-10px', marginRight: '-10px' }}>
          {/* <Introduce type="company" /> */}
          <News />
          <Calendar />
          <NewestData />
          <Project />
          <Demand />
          <CreateTerm />
          <FinishTerm />
          <Question />
          <Danger />
          <NoticeInfo
            title="最新公告"
            titleIcon={require('../../../../assets/images/newest-notice.png')}
          />
          <NoticeInfo
            title="最新通知"
            titleIcon={require('../../../../assets/images/newest-info.png')}
          />
        </div>
      </div>
    )
  }
}

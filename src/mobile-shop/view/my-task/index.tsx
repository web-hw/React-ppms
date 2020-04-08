import * as React from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'
import { Grid, Flex } from 'antd-mobile'

import { Header } from '../../component/header'
const style = require('./style')

interface IPropsMyTask extends RouteComponentProps {}

interface IStateMyTask {}

const taskConfig: { label: string; url: string; icon: string }[] = [
  {
    label: '已发布',
    url: '/my-task-release',
    icon: require('../../assets/images/my-task-fb.png')
  },
  {
    label: '参与',
    url: '/bid-demand',
    icon: require('../../assets/images/my-task-cy.png')
  },
  {
    label: '关注',
    url: '/my-task-follow',
    icon: require('../../assets/images/my-task-gz.png')
  }
]

export default class MyTask extends React.PureComponent<
  IPropsMyTask,
  IStateMyTask
> {
  render() {
    return (
      <div className="wp100 hp100 pr bsb ptb50 fs0 bg-f0f0f0 oh">
        <Header>我的</Header>
        <div className={`${style.myTask} wp100 hp100 bsb bg-fff`}>
          <div className="wp100 hp100 oay sb">
            <Grid
              data={taskConfig}
              columnNum={3}
              square={false}
              hasLine={false}
              activeStyle={false}
              renderItem={item => (
                <Link to={item.url} className={`${style.item} db ma`}>
                  <img src={item.icon} title={item.label} />
                  <span className="db wp100 fs14 tes">{item.label}</span>
                </Link>
              )}
            />
          </div>
        </div>
        <footer className={`${style.footer} wp100 bg-fff palb zi1000`}>
          <Flex>
            <Flex.Item
              onClick={() => this.props.history.push('/task')}
              className="tac bsb"
            >
              <img src={require('../../assets/images/task-home-def.png')} />
              <span className="db tes mt5 fs12">首页</span>
            </Flex.Item>
            <Flex.Item
              onClick={() => this.props.history.push('/task-release')}
              className="partake tac bsb"
            >
              <img src={require('../../assets/images/task-partake-def.png')} />
              <span className="db tes mt5 fs12">参与</span>
            </Flex.Item>
            <Flex.Item
              onClick={() => this.props.history.push('/my-task')}
              className="tac bsb"
            >
              <img src={require('../../assets/images/task-my-act.png')} />
              <span className="active msg db tes mt5 fs12">我的</span>
            </Flex.Item>
          </Flex>
        </footer>
      </div>
    )
  }
}

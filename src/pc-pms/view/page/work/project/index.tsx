import * as React from 'react'
import {} from 'react-router-dom'
import {} from 'antd'

import Image from 'global@component/image'
import ContentTable from '../content-table'
import { TColumn, TData } from '../../../../component/table'
import Wrapper from '../wrapper-table'
const style = require('./style')

interface IPropsProject {}

interface IStateProject {}

export default class Project extends React.PureComponent<
  IPropsProject,
  IStateProject
> {
  private columns: TColumn[] = [
    {
      label: '项目名称',
      field: 'name'
    },
    {
      label: '项目类型',
      field: 'type'
    },
    {
      label: '项目负责人',
      field: 'apply'
    },
    {
      label: '计划开始时间',
      field: 'date'
    },
    {
      label: '实际开始时间',
      field: 'sjdate'
    },
    {
      label: '当前状态',
      field: 'status'
    }
  ]

  render() {
    return (
      <Wrapper
        title="最新项目"
        titleIcon={require('../../../../assets/images/work-project.png')}
        // moreLink={moreLink}
        Content={
          <ContentTable
            columns={this.columns}
            data={[]}
            loading={false}
            leftLeft={
              <div className="right-left palt hp100">
                <Image
                  className="ml5 img"
                  url={require('../../../../assets/images/work-project-total.png')}
                />
                <div className="info tac mt10">
                  <div className="fs12 tes">项目总数</div>
                  <div className="fs12 tes">8</div>
                </div>
              </div>
            }
            leftRight={[
              <div key="1" className={`${style.totalItem} total-item tac`}>
                <div>
                  正常
                  <br />8
                </div>
                <div>
                  预警
                  <br />8
                </div>
                <div>
                  延迟
                  <br />8
                </div>
                <div>
                  暂停
                  <br />8
                </div>
                <div>
                  终止
                  <br />8
                </div>
              </div>
            ]}
            rightLeft={
              <div className="right-left palt hp100">
                <Image
                  className="ml5 img"
                  url={require('../../../../assets/images/work-project-top.png')}
                />
                <div className="info tac mt10">
                  <div className="fs12 tes">项目负责</div>
                  <div className="fs12 tes">TOP3</div>
                </div>
              </div>
            }
            rightRight={[
              <div key="1" className="total-top fs12 pr wp100">
                <div className="palt tes tal">1</div>
                <div className="tes tal wp100">张三啊</div>
                <div className="part tes tar">99</div>
              </div>
            ]}
          />
        }
      />
    )
  }
}

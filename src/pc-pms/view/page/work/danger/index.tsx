import * as React from 'react'
import {} from 'react-router-dom'
import {} from 'antd'

import Image from 'global@component/image'
import ContentTable from '../content-table'
import { TColumn, TData } from '../../../../component/table'
import Wrapper from '../wrapper-table'
const style = require('./style')

interface IPropsDanger {}

interface IStateDanger {}

export default class Danger extends React.PureComponent<
  IPropsDanger,
  IStateDanger
> {
  private columns: TColumn[] = [
    {
      label: '风险名称',
      field: 'name'
    },
    {
      label: '责任人',
      field: 'charge'
    },
    {
      label: '风险类型',
      field: 'type'
    },
    {
      label: '提出日期',
      field: 'date'
    },
    {
      label: '来源',
      field: 'from'
    },
    {
      label: '所属项目',
      field: 'prject'
    },
    {
      label: '当前状态',
      field: 'status'
    }
  ]

  render() {
    return (
      <Wrapper
        title="最新风险"
        titleIcon={require('../../../../assets/images/work-danger.png')}
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
                  url={require('../../../../assets/images/work-danger-total.png')}
                />
                <div className="info tac mt10">
                  <div className="fs12 tes">项目总数</div>
                  <div className="fs12 tes">8</div>
                </div>
              </div>
            }
            leftRight={[
              <div key="1" className="total-item tac">
                <div>
                  处理中
                  <br />8
                </div>
                <div>
                  暂停
                  <br />8
                </div>
                <div>
                  已处理
                  <br />8
                </div>
              </div>
            ]}
            rightLeft={
              <div className="right-left palt hp100">
                <Image
                  className="ml5 img"
                  url={require('../../../../assets/images/work-danger-top.png')}
                />
                <div className="info tac mt10">
                  <div className="fs12 tes">负责风险</div>
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

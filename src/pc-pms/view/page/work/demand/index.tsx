import * as React from 'react'
import {} from 'react-router-dom'
import {} from 'antd'

import Image from 'global@component/image'
import ContentTable from '../content-table'
import { TColumn, TData } from '../../../../component/table'
import Wrapper from '../wrapper-table'
const style = require('./style')

interface IPropsDemand {}

interface IStateDemand {}

export default class Demand extends React.PureComponent<
  IPropsDemand,
  IStateDemand
> {
  private columns: TColumn[] = [
    {
      label: '需求名称',
      field: 'name'
    },
    {
      label: '需求类型',
      field: 'type'
    },
    {
      label: '申请人',
      field: 'apply'
    },
    {
      label: '需求创建时间',
      field: 'date'
    },
    {
      label: '当前状态',
      field: 'status'
    }
  ]

  render() {
    return (
      <Wrapper
        title="最新需求"
        titleIcon={require('../../../../assets/images/work-demand.png')}
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
                  url={require('../../../../assets/images/work-demand-total.png')}
                />
                <div className="info tac mt10">
                  <div className="fs12 tes">需求总数</div>
                  <div className="fs12 tes">8</div>
                </div>
              </div>
            }
            leftRight={[
              <div key="1" className={`${style.totalItem} total-item tac`}>
                <div>
                  申请中
                  <br />8
                </div>
                <div>
                  策划中
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
                <div>
                  收尾
                  <br />8
                </div>
              </div>
            ]}
            rightLeft={
              <div className="right-left palt hp100">
                <Image
                  className="ml5 img"
                  url={require('../../../../assets/images/work-demand-top.png')}
                />
                <div className="info tac mt10">
                  <div className="fs12 tes">申请需求</div>
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

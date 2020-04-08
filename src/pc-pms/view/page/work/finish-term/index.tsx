import * as React from 'react'
import {} from 'react-router-dom'
import {} from 'antd'

import Image from 'global@component/image'
import ContentTable from '../content-table'
import { TColumn, TData } from '../../../../component/table'
import Wrapper from '../wrapper-table'
const style = require('./style')

interface IPropsFinishTerm {}

interface IStateFinishTerm {}

export default class FinishTerm extends React.PureComponent<
  IPropsFinishTerm,
  IStateFinishTerm
> {
  private columns: TColumn[] = [
    {
      label: '结项名称',
      field: 'name'
    },
    {
      label: '项目类型',
      field: 'type'
    },
    {
      label: '结项申请人',
      field: 'apply'
    },
    {
      label: '立项创建时间',
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
        title="最新结项"
        titleIcon={require('../../../../assets/images/work-finish-term.png')}
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
                  url={require('../../../../assets/images/work-finish-term-total.png')}
                />
                <div className="info tac mt10">
                  <div className="fs12 tes">结项总数</div>
                  <div className="fs12 tes">8</div>
                </div>
              </div>
            }
            leftRight={[
              <div key="1" className="total-item tac">
                <div>
                  进行中
                  <br />8
                </div>
                <div>
                  暂停
                  <br />8
                </div>
                <div>
                  已结项
                  <br />8
                </div>
              </div>
            ]}
            rightLeft={
              <div className="right-left palt hp100">
                <Image
                  className="ml5 img"
                  url={require('../../../../assets/images/work-finish-term-top.png')}
                />
                <div className="info tac mt10">
                  <div className="fs12 tes">结项申请</div>
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

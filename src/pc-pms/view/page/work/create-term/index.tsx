import * as React from 'react'
import {} from 'react-router-dom'
import {} from 'antd'

import Image from 'global@component/image'
import ContentTable from '../content-table'
import { TColumn, TData } from '../../../../component/table'
import Wrapper from '../wrapper-table'
const style = require('./style')

interface IPropsCreateTerm {}

interface IStateCreateTerm {}

export default class CreateTerm extends React.PureComponent<
  IPropsCreateTerm,
  IStateCreateTerm
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
        title="最新立项"
        titleIcon={require('../../../../assets/images/work-create-term.png')}
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
                  url={require('../../../../assets/images/work-create-term-total.png')}
                />
                <div className="info tac mt10">
                  <div className="fs12 tes">项目总数</div>
                  <div className="fs12 tes">8</div>
                </div>
              </div>
            }
            leftRight={[
              <div key="1" className="total-item tal">
                <div>申请中: 8</div>
                <div>策划中: 8</div>
                <div>执行中: 8</div>
              </div>,
              <div key="2" className="total-item tal">
                <div>暂停: 8</div>
                <div>终止: 8</div>
                <div>收尾: 8</div>
              </div>
            ]}
            rightLeft={
              <div className="right-left palt hp100">
                <Image
                  className="ml5 img"
                  url={require('../../../../assets/images/work-create-term-top.png')}
                />
                <div className="info tac mt10">
                  <div className="fs12 tes">立项申请</div>
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

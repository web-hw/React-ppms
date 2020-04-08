import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { InputItem, TextareaItem, Button, Icon } from 'antd-mobile'

import { toast } from 'global@util/toast/mobile'
import { Header } from '../../component/header'
const style = require('./style')

interface IPropsPartakeBiding extends RouteComponentProps {}

interface IStatePartakeBiding {}

export default class PartakeBiding extends React.PureComponent<
  IPropsPartakeBiding,
  IStatePartakeBiding
> {
  constructor(props: IPropsPartakeBiding) {
    super(props)

    // 支付失败提示 -- 支付保证金失败
    toast.info('您已成功支付竞标保证金，正在为您提交竞标', 5)
  }

  render() {
    return (
      <div className="wp100 hp100 pr bsb pt50 fs0 bg-f0f0f0 oh">
        <Header>参与竞标</Header>
        <div className={`${style.bidingMsg} wp100 hp100 oay sb`}>
          <div className="wp100 bg-fff bsb pl15 pr15 pt10 pb10">
            <div className="ts-input cb-input">
              <InputItem value="wumf" disabled={true}>
                竞标人
              </InputItem>
            </div>
          </div>
          <div className="wp100 bg-fff mt5 bsb pl15 pr15 pt10 pb10">
            <div className="cb-input">
              <TextareaItem
                title="简要策划"
                placeholder="根据需求描述及附件内容简要说明实施需求方案等"
              />
            </div>
            <div className="cb-input">
              <InputItem type="digit" placeholder="请输入报价金额(人民币)">
                报价
              </InputItem>
            </div>
            <div className="cb-input">
              <InputItem type="digit" placeholder="请输入需要执行周期天数">
                执行周期
              </InputItem>
            </div>
          </div>
          <div className="wp100 bg-fff mt5 bsb pl15 pr15 pt10 pb10">
            <div className="file-input-select cb-input">
              <InputItem extra={<Button className="cb-btn">选择文件</Button>}>
                相关附件
              </InputItem>
            </div>
            <div className="file-input-name cb-input">
              <InputItem
                placeholder="附件名称"
                extra={<Icon type="cross-circle" size="md" />}
                onExtraClick={() => console.log('啦啦')}
              />
            </div>
            <div className="file-input-name cb-input">
              <InputItem
                placeholder="附件名称"
                extra={<Icon type="cross-circle" size="md" />}
                onExtraClick={() => console.log('啦啦')}
              />
            </div>
          </div>
          <div className="wp100 bg-fff mt5 bsb pl15 pr15 pt10 pb10">
            <div className="ts-input cb-input">
              <InputItem value="￥50000" disabled={true}>
                竞标保证金
              </InputItem>
            </div>
          </div>
          <div className="cb-btn pl15 pr15 pt40 pb40">
            <Button
              onClick={() => this.props.history.push('/partake-biding-suc')}
            >
              提交竞标并支付保证金
            </Button>
          </div>
        </div>
      </div>
    )
  }
}

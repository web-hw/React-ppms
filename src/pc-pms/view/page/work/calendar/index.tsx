import * as React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { Calendar, Select, Radio, Tooltip } from 'antd'

import Wrapper from '../wrapper'
const style = require('./style')

interface IPropsCalendar extends RouteComponentProps {}

interface IStateCalendar {}

export default withRouter(
  class extends React.PureComponent<IPropsCalendar, IStateCalendar> {
    render() {
      return (
        <Wrapper>
          <Calendar
            className={style.calendar}
            fullscreen={false}
            dateFullCellRender={(date: any) => {
              // Todo date.format('YYYY-MM-DD') 配备待办项

              return (
                <div className="ant-fullcalendar-date">
                  <div className="ant-fullcalendar-value">
                    {date.format('DD')}
                    {date.format('DD') === '03' ? (
                      <Tooltip
                        placement="bottom"
                        title={() => (
                          <div className={`${style.calendarInfo} oay sb`}>
                            <p>1.哈哈哈哈</p>
                            <p>2.嘻嘻嘻嘻</p>
                          </div>
                        )}
                      >
                        <span className="info-num" title="">
                          (6)
                        </span>
                      </Tooltip>
                    ) : null}
                  </div>
                </div>
              )
            }}
            headerRender={({ value, type, onChange, onTypeChange }) => {
              const current = value.clone()
              const localeData = value.localeData()
              const months = []
              for (let i = 0; i < 12; i++) {
                current.month(i)
                months.push(
                  <Select.Option key={`${i}`}>
                    {localeData.monthsShort(current)}
                  </Select.Option>
                )
              }

              const year = value.year()
              const years = []
              for (let i = year - 5; i < year + 5; i += 1) {
                years.push(
                  <Select.Option key={i} value={i}>
                    {i}年
                  </Select.Option>
                )
              }

              return (
                <div className="wrapper-header">
                  <div className="fl">
                    <em className="icon" />
                    单位日历
                  </div>
                  <div className="fr">
                    <Select
                      dropdownMatchSelectWidth={false}
                      onChange={(newYear: any) =>
                        onChange(value.clone().year(newYear))
                      }
                      value={`${year}年`}
                      style={{ marginRight: '8px' }}
                    >
                      {years}
                    </Select>
                    <Select
                      dropdownMatchSelectWidth={false}
                      value={String(value.month())}
                      style={{ marginRight: '8px' }}
                      onChange={(month: any) => {
                        const newValue = value.clone()
                        newValue.month(parseInt(month, 10))
                        onChange(newValue)
                      }}
                    >
                      {months}
                    </Select>
                    <Radio.Group
                      value={type}
                      onChange={e => onTypeChange(e.target.value)}
                    >
                      <Radio.Button value="month">月</Radio.Button>
                      <Radio.Button value="year">年</Radio.Button>
                    </Radio.Group>
                  </div>
                </div>
              )
            }}
          />
        </Wrapper>
      )
    }
  }
)

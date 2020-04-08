import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { SearchBar } from 'antd-mobile'

import { Header } from '../../component/header'
const style = require('./style')

interface IPropsSearchGood extends RouteComponentProps {}

interface IStateSearchGood {
  kwd: string
}

export default class SearchGood extends React.PureComponent<
  IPropsSearchGood,
  IStateSearchGood
> {
  private onSearchByKwds(kwd: string) {
    if (!kwd) {
      return
    }

    // Todo查询结果
    console.log(kwd)
  }

  constructor(props: IPropsSearchGood) {
    super(props)

    this.state = {
      kwd: ''
    }
  }

  render() {
    const data = ['电容', '电阻', '线上办公系统', '电阻']

    return (
      <div className={`${style.searchGood} wp100 hp100 pr pt50 bsb oh fs0`}>
        <Header
          right={<span onClick={() => this.setState({ kwd: '' })}>取消</span>}
        >
          <SearchBar
            placeholder="搜索"
            onSubmit={kwd => this.onSearchByKwds(kwd)}
            value={this.state.kwd}
            onChange={kwd => this.setState({ kwd })}
          />
        </Header>
        <div className={`${style.searchGoodContent} wp100 hp100 oay sb`}>
          <div className="wp100 bsb bg-fff">
            <div className={`${style.deleteIcon} wp100`}>
              <h3 className="fs15 fw400 wp100 bsb plr15 pt10">热门搜索</h3>
              <img
                className="pr15 pt10"
                src={require('../../assets/images/delete-icon.png')}
              />
            </div>
            <div className="pl5 pr15 wp100 bsb pb10">
              {data.map((itm, idx) => (
                <span
                  key={idx}
                  className={style.recommodItem}
                  onClick={() => this.onSearchByKwds(itm)}
                >
                  {itm}
                </span>
              ))}
            </div>
          </div>
          <div className="wp100 bsb bg-fff mt5">
            <div className={`${style.deleteIcon} wp100`}>
              <h3 className="fs15 fw400 wp100 bsb plr15 pt10">历史搜索</h3>
              <img
                className="pr15 pt10"
                src={require('../../assets/images/delete-icon.png')}
              />
            </div>
            <div className="pl5 pr15 wp100 bsb pb10">
              {data.map((itm, idx) => (
                <span
                  key={idx}
                  className={style.recommodItem}
                  onClick={() => this.onSearchByKwds(itm)}
                >
                  {itm}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

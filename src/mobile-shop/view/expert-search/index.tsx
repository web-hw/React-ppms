import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import {} from 'antd-mobile'

import { SearchWrap } from '../../component/search'
const style = require('./style')

interface IPropsSearchExpert extends RouteComponentProps {}

interface IStateSearchExpert {}

export default class SearchExpert extends React.PureComponent<
  IPropsSearchExpert,
  IStateSearchExpert
> {
  // 专家搜索缓存key
  private _cacheExpertKey = 'SEARCH_EXPERT'

  // 搜索
  private onSearch(keywords: string, done: (length: number) => void) {
    console.log(keywords)

    setTimeout(() => {
      done(1)
    },         2000)
  }

  constructor(props: IPropsSearchExpert) {
    super(props)

    this.onSearch = this.onSearch.bind(this)
  }

  render() {
    return (
      <SearchWrap
        placeholder="请输入专家姓名"
        // hotItems={['a', 'b']}
        // onDelHot={() => console.log('del hot')}
        hisKey={this._cacheExpertKey}
        emptyClassName={style.expertEmpty}
        onSearch={this.onSearch}
      >
        <div
          className={`${style.expertItem} wp100 p15 bsb bg-fff mt5`}
          onClick={() => this.props.history.push('expert')}
        >
          <div className="item-header wp100">
            <div className="fl hp100 pr">
              <img
                src={require('../../assets/images/test.png')}
                className="palt"
              />
              <div className="wp100 hp100 fs15 tes">刘新建</div>
            </div>
            <div className="fr hp100 pr">
              <span className="part bsb fs12 tes">电子产品</span>
            </div>
          </div>
          <div className="item-content wp100">
            <div className="mt5 wp100 tes">
              中国国防工业企业协会执行副会长兼秘书长
            </div>
            <div className="wp100 tes3">
              石金武，男，汉族，陕西咸阳人。中国共产党党员。国家安全战略与国防经济研究专业委员会主任。
            </div>
          </div>
        </div>
        <div className={`${style.expertItem} wp100 p15 bsb bg-fff mt5`}>
          <div className="item-header wp100">
            <div className="fl hp100 pr">
              <img
                src={require('../../assets/images/test.png')}
                className="palt"
              />
              <div className="wp100 hp100 fs15 tes">刘新建</div>
            </div>
            <div className="fr hp100 pr">
              <span className="part bsb fs12 tes">电子产品</span>
            </div>
          </div>
          <div className="item-content wp100">
            <div className="mt5 wp100 tes">
              中国国防工业企业协会执行副会长兼秘书长
            </div>
            <div className="wp100 tes3">
              石金武，男，汉族，陕西咸阳人。中国共产党党员。国家安全战略与国防经济研究专业委员会主任。
            </div>
          </div>
        </div>
        <div className={`${style.expertItem} wp100 p15 bsb bg-fff mt5`}>
          <div className="item-header wp100">
            <div className="fl hp100 pr">
              <img
                src={require('../../assets/images/test.png')}
                className="palt"
              />
              <div className="wp100 hp100 fs15 tes">刘新建</div>
            </div>
            <div className="fr hp100 pr">
              <span className="part bsb fs12 tes">电子产品</span>
            </div>
          </div>
          <div className="item-content wp100">
            <div className="mt5 wp100 tes">
              中国国防工业企业协会执行副会长兼秘书长
            </div>
            <div className="wp100 tes3">
              石金武，男，汉族，陕西咸阳人。中国共产党党员。国家安全战略与国防经济研究专业委员会主任。
            </div>
          </div>
        </div>
        <div className={`${style.expertItem} wp100 p15 bsb bg-fff mt5`}>
          <div className="item-header wp100">
            <div className="fl hp100 pr">
              <img
                src={require('../../assets/images/test.png')}
                className="palt"
              />
              <div className="wp100 hp100 fs15 tes">刘新建</div>
            </div>
            <div className="fr hp100 pr">
              <span className="part bsb fs12 tes">电子产品</span>
            </div>
          </div>
          <div className="item-content wp100">
            <div className="mt5 wp100 tes">
              中国国防工业企业协会执行副会长兼秘书长
            </div>
            <div className="wp100 tes3">
              石金武，男，汉族，陕西咸阳人。中国共产党党员。国家安全战略与国防经济研究专业委员会主任。
            </div>
          </div>
        </div>
        <div className={`${style.expertItem} wp100 p15 bsb bg-fff mt5`}>
          <div className="item-header wp100">
            <div className="fl hp100 pr">
              <img
                src={require('../../assets/images/test.png')}
                className="palt"
              />
              <div className="wp100 hp100 fs15 tes">刘新建</div>
            </div>
            <div className="fr hp100 pr">
              <span className="part bsb fs12 tes">电子产品</span>
            </div>
          </div>
          <div className="item-content wp100">
            <div className="mt5 wp100 tes">
              中国国防工业企业协会执行副会长兼秘书长
            </div>
            <div className="wp100 tes3">
              石金武，男，汉族，陕西咸阳人。中国共产党党员。国家安全战略与国防经济研究专业委员会主任。
            </div>
          </div>
        </div>
      </SearchWrap>
    )
  }
}

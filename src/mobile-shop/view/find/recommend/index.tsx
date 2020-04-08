import * as React from 'react'
import {} from 'react-router-dom'
import {} from 'antd-mobile'

const style = require('./style')

interface IPropsRecommend {}

interface IStateRecommend {}

export default class Recommend extends React.PureComponent<
  IPropsRecommend,
  IStateRecommend
> {
  render() {
    const recommends = [
      {
        url: '/',
        author: '四川赛狄信息技术股份公司四川赛狄信息技术股份公司',
        icon: require('../../../assets/images/test9.png'),
        date: '2019/03/14',
        desc: `11月6日，第十二届中国国际航空航天博览会在珠海国际航展中心开幕。
        由四川省国防科学技术工业办公室（以下简称“省国防科工办”）组织、四川赛狄
        信息技术股份公司（以下简称“四川赛狄”）承办的四四川赛狄信息技术股份公司`,
        image: require('../../../assets/images/test10.png'),
        count: 300
      },
      {
        url: '/',
        author: '四川赛狄信息技术股份公司',
        icon: require('../../../assets/images/test9.png'),
        date: '2019/03/14',
        desc: `11月6日，第十二届中国国际航空航天博览会在珠海国际航展中心开幕。
        由四川省国防科学技术工业办公室（以下简称“省国防科工办”）组织、四川赛狄
        信息技术股份公司（以下简称“四川赛狄”）承办的四`,
        image: require('../../../assets/images/test10.png'),
        count: 300
      }
    ]
    return (
      <div className={`${style.recommend} wp100 hp100 sb oay fs0`}>
        {recommends.map((rcmd, i) => (
          <div
            key={i}
            className={`${style.rcmdItem} wp100 bg-fff br5 pl5 pr5 pb5 mt5 bsb`}
          >
            {/* title */}
            <div className="bus-circle-item-title wp100 pr bsb pt10 pb10">
              <em
                className="palt"
                style={{ backgroundImage: `url(${rcmd.icon})` }}
              />
              <div className="wp100">
                <h6 className="fs16 tes fw400">{rcmd.author}</h6>
                <p className="fs12">
                  <span className="mr10">{rcmd.date}</span>发布
                </p>
              </div>
            </div>
            {/* content */}
            <div className="wp100">
              <div className="desc fs14 ti2 plr5">{rcmd.desc}</div>
              <img src={rcmd.image} className="wp100" />
            </div>
            {/* footer */}
            <div className="footer wp100 fs12">
              <span className="fl">
                <em
                  className="mr5 dib vat"
                  style={{
                    backgroundImage: `url(${require('../../../assets/images/eye-icon.png')})`
                  }}
                />
                {rcmd.count}人阅读
              </span>
              <em
                className="fr dib vat"
                style={{
                  backgroundImage: `url(${require('../../../assets/images/msg-icon.png')})`
                }}
              />
            </div>
          </div>
        ))}
      </div>
    )
  }
}

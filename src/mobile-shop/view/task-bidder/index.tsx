import * as React from 'react'
import {} from 'react-router-dom'
import {} from 'antd-mobile'

import { Header } from '../../component/header'
const style = require('./style')

interface IPropsTaskBidder {}

interface IStateTaskBidder {}

export default class TaskBidder extends React.PureComponent<
  IPropsTaskBidder,
  IStateTaskBidder
> {
  render() {
    return (
      <div className="wp100 hp100 pr bsb pt50 fs0 bg-f0f0f0 oh">
        <Header>投标人列表</Header>
        <div className="wp100 hp100 oay sb">
          <h6 className={`${style.title} wp100 plr15 bsb fw400 fs13 fs-ff6600`}>
            全部投标人
          </h6>
          <div
            className={`${style.bidder} wp100 pt10 pb10 pr15 pl15 bsb bg-fff`}
          >
            <div className="item wp100 bsb pr">
              <em
                className="palt oh"
                style={{
                  backgroundImage: `url(${require('../../assets/images/test.png')})`
                }}
              />
              <div className="wp100 hp100">
                <div className="desc wp100">
                  <span className="fl fs14 tes fs-ff6600">WUMF</span>
                  <span className="fr fs12 tes">2019-05-13 12:10</span>
                </div>
                <div className="desc wp100 fs12 tes">
                  累计参与59个竞标，中标30个
                </div>
              </div>
            </div>
            <div className="item wp100 bsb pr">
              <em
                className="palt oh"
                style={{
                  backgroundImage: `url(${require('../../assets/images/test.png')})`
                }}
              />
              <div className="wp100 hp100">
                <div className="desc wp100">
                  <span className="fl fs14 tes fs-ff6600">WUMF</span>
                  <span className="fr fs12 tes">2019-05-13 12:10</span>
                </div>
                <div className="desc wp100 fs12 tes">
                  累计参与59个竞标，中标30个
                </div>
              </div>
            </div>
            <div className="item wp100 bsb pr">
              <em
                className="palt oh"
                style={{
                  backgroundImage: `url(${require('../../assets/images/test.png')})`
                }}
              />
              <div className="wp100 hp100">
                <div className="desc wp100">
                  <span className="fl fs14 tes fs-ff6600">WUMF</span>
                  <span className="fr fs12 tes">2019-05-13 12:10</span>
                </div>
                <div className="desc wp100 fs12 tes">
                  累计参与59个竞标，中标30个
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

import * as React from 'react'
import { Link } from 'react-router-dom'
import { Flex, Icon } from 'antd-mobile'

const style = require('./style')

interface IPropsBusCircle {}

interface IStateBusCircle {}

export default class Name extends React.PureComponent<
  IPropsBusCircle,
  IStateBusCircle
> {
  render() {
    const circles = [
      {
        icon: require('../../../assets/images/test9.png'),
        author: 'WENCY',
        circle: '电子元器件圈',
        company: '四川赛狄信息技术股份公司',
        position: '总师',
        title: '成都加快促进民营经济发展',
        desc:
          '2018年，成都市民营经济总体上保持了良好的发展态势。实现增加值7464.8亿元，同比增长8.1%，比全市GDP',
        image: require('../../../assets/images/test11.png'),
        thumb: 1366,
        count: 1366,
        comment: [
          {
            author: 'chenyiliang',
            content: '测试测试测试'
          },
          {
            author: 'chenyiliang',
            content: '测试测试测试'
          }
        ]
      },
      {
        icon: require('../../../assets/images/test9.png'),
        author: 'WENCY',
        circle: '电子元器件圈',
        company: '四川赛狄信息技术股份公司',
        position: '总师',
        title: '成都加快促进民营经济发展',
        desc:
          '2018年，成都市民营经济总体上保持了良好的发展态势。实现增加值7464.8亿元，同比增长8.1%，比全市GDP',
        image: require('../../../assets/images/test11.png'),
        thumb: 1366,
        count: 1366,
        comment: [
          {
            author: 'chenyiliang',
            content: '测试测试测试'
          },
          {
            author: 'chenyiliang',
            content: '测试测试测试'
          }
        ]
      }
    ]
    return (
      <div className={`${style.busCircle} wp100 hp100 sb oay fs0`}>
        {/* banner */}
        <div className="wp100 pt5">
          <img
            src={require('../../../assets/images/bus-circle-banner.png')}
            className="wp100"
          />
        </div>
        {/* 商圈 */}
        {circles.map(cl => (
          <div
            className={`${
              style.busCircleItem
            } wp100 bg-fff br5 pl5 pr5 mt5 bsb`}
          >
            {/* title */}
            <div className="bus-circle-item-title wp100 pr bsb pt10 pb10">
              <em
                className="palt"
                style={{ backgroundImage: `url(${cl.icon})` }}
              />
              <div className="wp100">
                <h6 className="fw400">
                  <span className="fs16 tes fl">{cl.author}</span>
                  <span className="fs14 tes fr">{cl.circle}</span>
                </h6>
                <p className="fs12">
                  <span className="dib vat tes">{cl.company}</span>
                  <span className="dib vat pl15 tes bsb">{cl.position}</span>
                </p>
              </div>
            </div>
            {/* content */}
            <div className="wp100 pl5 pr5 pt5 bsb">
              <h6 className="content-title fs16 fw400 tes">{cl.title}</h6>
              <p className="desc fs13">{cl.desc}</p>
              <Flex className="mt10">
                <Flex.Item>
                  <img src={cl.image} className="wp100" />
                </Flex.Item>
                <Flex.Item>
                  <img src={cl.image} className="wp100" />
                </Flex.Item>
              </Flex>
            </div>
            {/* 点赞 */}
            <div className="thumb-msg wp100 tar plr5 bsb">
              <span className="fs12 mr25">
                <em
                  className="thumb dib vat mr5"
                  style={{
                    backgroundImage: `url(
                        ${require('../../../assets/images/thumb-def-icon.png')}
                      )`
                  }}
                />
                {cl.thumb}
              </span>
              <span className="fs12">
                <em
                  className="msg dib vat mr5"
                  style={{
                    backgroundImage: `url(
                        ${require('../../../assets/images/msg-icon.png')}
                      )`
                  }}
                />
                {cl.count}
              </span>
            </div>
            {/* 评论 */}
            <div className="wp100 pl5 pr5 bsb pb10">
              {cl.comment.map(cmt => (
                <div className="comment-item wp100 tes fs12">
                  <span className="mr5">{cmt.author}:</span>
                  {cmt.content}
                  啦啦啦啦啦啦阿里啦啦啦啦啦啦啦啦啦啦啦
                </div>
              ))}
              <Link to="" className="all-comment mt5 db fs13 wp100">
                查看全部1236条评论
                <Icon className="vat" type="right" size="md" color="#fb3f3e" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    )
  }
}

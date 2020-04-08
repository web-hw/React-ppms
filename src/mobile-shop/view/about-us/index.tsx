import * as React from 'react'
import {} from 'react-router-dom'
import {} from 'antd-mobile'

import { Header } from '../../component/header'
const style = require('./style')

interface IPropsAboutUs {}

interface IStateAboutUs {}

export default class AboutUs extends React.PureComponent<
  IPropsAboutUs,
  IStateAboutUs
> {
  render() {
    return (
      <div className="wp100 hp100 fs0 pt50 bsb pr bg-fff oh">
        <Header>关于我们</Header>
        <div className="wp100 hp100 p10 bsb">
          <div className={`${style.aboutUs} wp100 hp100 oay sb`}>
            <div className="logo wp100 mt15 mb30 tac">
              <img src={require('../../assets/images/about-us-logo.png')} />
            </div>
            <div className="content wp100">
              <p>
                四川赛狄信息技术股份公司成立于2003年，注册资本1020万元。
                公司以软件无线电为发展导向，长期专注于数字化、信息化领域中基于高速嵌入式处理器、高速数据采集、数字中频、智能航电技术的开发与研究。
              </p>
              <p>
                公司面对需求多样的客户，已成功研发了200多种新产品，形成的产品系列有：高速DSP并行处理系列、
                高速Power
                PC运算平台系列、高速/高精度/大容量数据采集系列、数字图像处理与跟踪模块、智能航电通讯产品系列、
                软件无线电/数字中频处理平台系列已成功应用于电子（信息）系统、数字通信、自动控制、图像处理与跟踪系统、虚拟仪器、测试测控设备等领域。
              </p>
              <p>
                公司是国家级高新技术企业，成都市高新区第一批重点培育企业之一，四川省软件企业。
                公司通过了GB/T19001-2008质量管理体系认证证书。公司目前拥有了8项实用新型专利，
                27项软件产品登记证书和26项软件著作权证书。
              </p>
              <p>
                经过常年的努力，公司借助自己的先进管理经验和强大的技术开发优势，
                为客户的信息化系统建设提供专业的、全面的、有效的优质服务，为员工的发展提供广阔的发展空间和发挥平台。
                我们立志于在电子信息技术领域追求卓越，在产品设计领域精益求精，在销售领域恪守信誉、提高声望，通过技术与
                市场的完美结合，最大限度的满足顾客需求。在未来的发展中，将继续立足于电子信息产业，凭借自身雄厚的科技实力和
                卓越的服务，通过需求满足，将产品塑造成为国内知名品牌，迅速发展成为最具新产品研发实力和市场竞争力的电子信息
                领域企业之一，为中国经济的腾飞贡献力量。
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import {} from 'antd-mobile'

import { Header } from '../../component/header'
const style = require('./style')

enum E_TYPE {
  NORMAL = 'normal', // 普通进入
  PERSONAL = 'personal' // 个人进入
}

interface IPropsExpertDetail extends RouteComponentProps {}

interface IStateExpertDetail {
  type: E_TYPE
}

export default class ExpertDetail extends React.PureComponent<
  IPropsExpertDetail,
  IStateExpertDetail
> {
  constructor(props: IPropsExpertDetail) {
    super(props)

    const params: any = props.match.params

    this.state = {
      type: params.type || E_TYPE.NORMAL
    }
  }

  render() {
    const { type } = this.state

    return (
      <div className="wp100 hp100 pr bsb pt50 fs0 bg-fff oh">
        <Header
          // 专家中心进入的会有编辑
          right={
            type !== E_TYPE.PERSONAL ? null : (
              <span
                onClick={() => this.props.history.push('/expert-achieve-edit')}
              >
                编辑
              </span>
            )
          }
        >
          《狭义相对论的创立》
        </Header>
        <div className={`${style.expertDetail} wp100 hp100 oay sb bsb`}>
          早在16岁时，爱因斯坦就从书本上了解到光是以很快速度前进的电磁波，与此相联系，
          他非常想探讨与光波有关的所谓以太的问题。以太这个名词源于希腊，用以代表组成天
          上物体的基本元素。17世纪的笛卡尔和其后的克里斯蒂安·惠更斯首创并发展了以太学说，
          认为以太就是光波传播的媒介，它充满了包括真空在内的全部空间，并能渗透到物质中。
          与以太说不同，牛顿提出了光的微粒说。牛顿认为，发光体发射出的是以直线运动的微粒粒子流，
          粒子流冲击视网膜就引起视觉。18世纪牛顿的微粒说占了上风，19世纪，却是波动说占了绝对优势。
          以太的学说也大大发展：波的传播需要媒质，光在真空中传播的媒质就是以太，也叫光以太。
          与此同时，电磁学得到了蓬勃发展，经过麦克斯韦、赫兹等人的努力，形成了成熟的电磁现象
          的动力学理论——电动力学，并从理论与实践上证明光就是一定频率范围内的电磁波，从而统一了
          光的波动理论与电磁理论。以太不仅是光波的载体，也成了电磁场的载体。直到19世纪末人们企图
          寻找以太，然而从未在实验中发现以太，相反，迈克耳逊莫雷实验却发现以太不太可能存在。
          <img
            src={require('../../assets/images/test.png')}
            className="wp100"
          />
          早在16岁时，爱因斯坦就从书本上了解到光是以很快速度前进的电磁波，与此相联系，
          他非常想探讨与光波有关的所谓以太的问题。以太这个名词源于希腊，用以代表组成天
          上物体的基本元素。17世纪的笛卡尔和其后的克里斯蒂安·惠更斯首创并发展了以太学说，
          认为以太就是光波传播的媒介，它充满了包括真空在内的全部空间，并能渗透到物质中。
          与以太说不同，牛顿提出了光的微粒说。牛顿认为，发光体发射出的是以直线运动的微粒粒子流，
          粒子流冲击视网膜就引起视觉。18世纪牛顿的微粒说占了上风，19世纪，却是波动说占了绝对优势。
          以太的学说也大大发展：波的传播需要媒质，光在真空中传播的媒质就是以太，也叫光以太。
          与此同时，电磁学得到了蓬勃发展，经过麦克斯韦、赫兹等人的努力，形成了成熟的电磁现象
          的动力学理论——电动力学，并从理论与实践上证明光就是一定频率范围内的电磁波，从而统一了
          光的波动理论与电磁理论。以太不仅是光波的载体，也成了电磁场的载体。直到19世纪末人们企图
          寻找以太，然而从未在实验中发现以太，相反，迈克耳逊莫雷实验却发现以太不太可能存在。
        </div>
      </div>
    )
  }
}

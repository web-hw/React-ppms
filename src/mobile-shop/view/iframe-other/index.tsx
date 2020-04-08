import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import {} from 'antd-mobile'

import { serialize } from 'global@util/serialize'
import { Header } from '../../component/header'
const style = require('./style')

interface IPropsIframeOther extends RouteComponentProps {}

interface IStateIframeOther {
  name: string
  url: string
}

export default class IframeOther extends React.PureComponent<
  IPropsIframeOther,
  IStateIframeOther
> {
  constructor(props: IPropsIframeOther) {
    super(props)

    let param: any = props.match.params
    param = serialize.parseOfDecode(param.data)

    this.state = {
      name: param.name,
      url: param.url
    }
  }

  render() {
    const { name, url } = this.state

    return (
      <div className={`${style.iframeOther} wp100 hp100 pr bsb pt50 fs0 oh`}>
        <Header>爱米哒哒</Header>
        <iframe
          className="iframe-other-content"
          name={name}
          src={url}
          frameBorder="0"
          scrolling="auto"
        />
      </div>
    )
  }
}

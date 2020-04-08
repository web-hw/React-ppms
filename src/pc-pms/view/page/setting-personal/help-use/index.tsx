import * as React from 'react'
import {} from 'react-router-dom'

const style = require('./style')

interface IPropsHelpUse {}

interface IStateHelpUse {}

export default class HelpUse extends React.PureComponent<
  IPropsHelpUse,
  IStateHelpUse
> {
  render() {
    return (
      <div className={`${style.helpUse} wp100 hp100 bsb ptb20`}>
        <div className="wp100 hp100 oay sb fs12">使用帮助</div>
      </div>
    )
  }
}

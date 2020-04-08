import * as React from 'react'
import {} from 'react-router-dom'

const style = require('./style')

interface IPropsEmpty {
  className?: string
  image?: string
  description?: React.ReactNode
}

interface IStateEmpty {}

export default class Empty extends React.PureComponent<
  IPropsEmpty,
  IStateEmpty
> {
  static IMAGE_SIMPLE = require('./images/simple.png')

  render() {
    const {
      className = '',
      image = Empty.IMAGE_SIMPLE,
      description = '暂无数据'
    } = this.props
    return (
      <div className={`${style.empty} wp100 hp100 p10 bsb ${className}`}>
        <div className="wp100 hp100 oh pr">
          <div className="empty fs0 mc tac">
            <div className="empty-image mb10">
              <img src={image} />
            </div>
            <p className="empty-description tes">{description}</p>
          </div>
        </div>
      </div>
    )
  }
}

import * as React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { Carousel } from 'antd'

import Image from 'global@component/image'
const style = require('./style')

interface IPropsCarousel extends RouteComponentProps {
  imgs: {
    img: string
    link?: string
  }[]
  width?: string
  height?: string
}

interface IStateCarousel {}

export default withRouter(
  class extends React.PureComponent<IPropsCarousel, IStateCarousel> {
    render() {
      const { imgs, width = '100%', height = '340px' } = this.props

      if (!imgs || !imgs.length) {
        return null
      }

      return (
        <div className={`${style.carousel} oh`} style={{ width, height }}>
          <Carousel autoplay={false}>
            {imgs.map(i => (
              <div key={i.img}>
                <Image
                  url={i.img}
                  fit={'fixed'}
                  style={{ width, height }}
                  onClick={
                    i.link ? () => this.props.history.push(i.link) : null
                  }
                />
              </div>
            ))}
          </Carousel>
        </div>
      )
    }
  }
)

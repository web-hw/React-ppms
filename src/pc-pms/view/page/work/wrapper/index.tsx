import * as React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { Icon } from 'antd'

const style = require('./style')

interface IPropsWrapper extends RouteComponentProps {
  title?: string
  titleIcon?: string
  moreLink?: string
  className?: string
  Header?: React.ReactNode
  Content?: React.ReactNode
  children?: React.ReactNode
}

interface IStateWrapper {}

export default withRouter(
  class extends React.PureComponent<IPropsWrapper, IStateWrapper> {
    render() {
      const {
        title,
        titleIcon,
        moreLink,
        history,
        Content,
        Header,
        children,
        className = ''
      } = this.props

      return (
        <div className={style.wrapperItem}>
          {children ? (
            <div className={`${style.wrapper} ${className}`}>{children}</div>
          ) : (
            <div className={`${style.wrapper} ${className}`}>
              {Header ? (
                Header
              ) : (
                <div className="wrapper-header">
                  <div className="fl">
                    {!titleIcon ? (
                      <em className="icon" />
                    ) : (
                      <span
                        className="icon"
                        style={{
                          backgroundImage: `url(${titleIcon})`
                        }}
                      />
                    )}
                    {title}
                  </div>
                  <div
                    className="fr more cp"
                    onClick={() => history.push(moreLink)}
                  >
                    查看更多
                    <Icon type="right" style={{ fontSize: 16 }} />
                  </div>
                </div>
              )}
              <div className="wrapper-content">{Content}</div>
            </div>
          )}
        </div>
      )
    }
  }
)

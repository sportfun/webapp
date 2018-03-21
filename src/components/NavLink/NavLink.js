import { Link, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

class NavLink extends Component {
  static propTypes = {
    to: PropTypes.string.isRequired,
    exact: PropTypes.bool,
    wrapper: PropTypes.func,
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
    activeChild: PropTypes.func,
  }

  render() {
    const {
      to,
      exact,
      wrapper: Wrapper,
      className,
      children,
      activeChild: Child,
    } = this.props

    return (
      <Route path={to} exact={exact}>
        {props => {
          return (
            <Wrapper {...props}>
              <Link className={className} to={to}>
                {children}
                {props.match && <Child />}
              </Link>
            </Wrapper>
          )
        }}
      </Route>
    )
  }
}

export default NavLink

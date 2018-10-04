import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import cn from 'classnames'

import { Link } from 'src/router'
import { constantSelector, setCookiesBarVisible, initCookiesBar } from 'src/store'

import styles from './TheCookies.sass'

@connect(mapStateToProps, mapDispatchToProps)
export default class TheCookies extends React.Component {

  static propTypes = {
    isCookiesBarVisible: PropTypes.bool,
    closeCookiesBar: PropTypes.func,
    initCookiesBar: PropTypes.func,
    constants: PropTypes.func,
  }

  componentDidMount () {
    this.props.initCookiesBar()
  }

  handleCloseBar = (e) => {
    e.stopPropagation()
    this.props.closeCookiesBar()
  }

  render () {
    const { constants, isCookiesBarVisible } = this.props
    return (
      <section className='root'>
        <style jsx>{styles}</style>
        <div className={cn('clickable-bg', isCookiesBarVisible ? 'clickable-bg-visible' : 'clickable-bg-hidden')} onClick={this.handleCloseBar} />
        <div className={cn('the-cookies', isCookiesBarVisible ? 'the-cookies-visible' : 'the-cookies-hidden')} onClick={this.handleCloseBar}>
          <span>{constants('cookies-we-use')}&nbsp;</span>
          <Link route='cookies-policies'><span className='link'>{constants('cookies-policies')}</span></Link>
          <span>&nbsp;{constants('cookies-learn-more')}</span>
        </div>
        <div className={cn('placeholder', isCookiesBarVisible ? 'placeholder-visible' : 'placeholder-hidden')} />
      </section>

    )
  }
}

function mapStateToProps (state) {
  return {
    isCookiesBarVisible: state.pages.isCookiesBarVisible,
    constants: constantSelector(state),
  }
}

function mapDispatchToProps (dispatch) {
  return {
    closeCookiesBar: () => {
      dispatch(setCookiesBarVisible(false))
    },
    initCookiesBar: () => {
      dispatch(initCookiesBar())
    },
  }
}

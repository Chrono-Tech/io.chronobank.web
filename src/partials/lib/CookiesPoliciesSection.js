import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { constantSelector } from 'src/store'

import styles from './CookiesPoliciesSection.sass'

@connect(mapStateToProps)
export default class CookiesPoliciesSection extends React.Component {

  static propTypes = {
    constants: PropTypes.func,
  }

  render () {
    const { constants } = this.props
    return (
      <div className='root cookies-policies-section'>
        <style jsx>{styles}</style>
        <div className='wrap'>
          <div className='policies'>
            <h1>{constants('cookies-introduction')}</h1>
            <p>{constants('cookies-introduction-text')}</p>
            <h1>{constants('cookies-headline')}</h1>
            <p>{constants('cookies-headline-text')}</p>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    constants: constantSelector(state),
  }
}

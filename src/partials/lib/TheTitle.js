import React from 'react'
import PropTypes from 'prop-types'

import styles from './TheTitle.sass'

export default class TheTitle extends React.Component {

  static propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string
  }

  render () {
    const { title, subtitle } = this.props

    return (
      <div className='root the-title'>
        <style jsx>{styles}</style>
        <div className='wrap'>
          {title == null ? null : (<h2>{title}</h2>)}
          {subtitle == null ? null : (<p>{subtitle}</p>)}
        </div>
      </div>
    )
  }
}

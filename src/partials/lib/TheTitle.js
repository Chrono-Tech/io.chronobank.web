import React from 'react'
import PropTypes from 'prop-types'

import styles from './TheTitle.sass'

export default class TheTitle extends React.Component {

  static propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
  }

  render () {
    const { title, subtitle } = this.props

    return (
      <div className='root the-title'>
        <style jsx>{styles}</style>
        <div className='wrap'>
          {title == null ? null : (<div className='title' dangerouslySetInnerHTML={{ __html: title }} />)}
          {subtitle == null ? null : (<div className='subtitle' dangerouslySetInnerHTML={{ __html: subtitle }} />)}
        </div>
      </div>
    )
  }
}

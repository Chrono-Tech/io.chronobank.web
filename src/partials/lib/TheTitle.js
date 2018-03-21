import React from 'react'
import PropTypes from 'prop-types'

import { TitleModel } from 'src/models'
import styles from './TheTitle.sass'

export default class TheTitle extends React.Component {

  static propTypes = {
    title: PropTypes.instanceOf(TitleModel),
  }

  static defaultProps = {
    title: new TitleModel({}),
  }

  getTitle (){
    const { title } = this.props
    const TagName = title.stereotype || 'h1'
    return title.title && <TagName id={title.slug}>{title.title}</TagName> || null
  }

  getSubtitle (){
    const { title } = this.props

    return title.subtitle && <p>{title.subtitle}</p> || null
  }

  render () {
    return (
      <div className='root the-title'>
        <style jsx>{styles}</style>
        <div className='wrap'>
          { this.getTitle() }
          { this.getSubtitle() }
        </div>
      </div>
    )
  }
}

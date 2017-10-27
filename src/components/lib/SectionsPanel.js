import React from 'react'
import PropTypes from 'prop-types'

import styles from './SectionsPanel.sass'

export default class SectionsPanel extends React.Component {

  static propTypes = {
    items: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        title: PropTypes.string,
        content: PropTypes.node,
      })
    )
  }

  render () {
    const { items } = this.props
    return (
      <div className='root sections-panel'>
        <style jsx>{styles}</style>
        <div className='wrap'>
          {items.map(item => (
            <div key={item.id} className='item'>
              <h4>{item.title}</h4>
              <div className='content'>
                {item.content}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

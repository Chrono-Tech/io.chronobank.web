import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import styles from './AccordeonPanel.sass'

export default class AccordeonPanel extends React.Component {

  static propTypes = {
    items: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        isOpen: PropTypes.bool,
        title: PropTypes.string,
        content: PropTypes.node,
      })
    ),
  }

  render () {
    const { items } = this.props
    return (
      <div className='root accordeon-panel'>
        <style jsx>{styles}</style>
        <div className='wrap'>
          {items.map((item) => (
            <div
              key={item.id}
              className={cn('item', {
                'item-open': item.isOpen,
              })}
            >
              <h5 onClick={(e) => { e.currentTarget.parentNode.classList.toggle('item-open') }}>{item.title}</h5>
              <div className='content'>
                <div className='inner'>
                  {item.content}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

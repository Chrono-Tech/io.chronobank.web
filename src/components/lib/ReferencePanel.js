import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import styles from './ReferencePanel.sass'

export default class ReferencePanel extends React.Component {

  static propTypes = {
    onChange: PropTypes.func,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        title: PropTypes.string,
        isActive: PropTypes.bool,
        isNotRelevant: PropTypes.bool,
        route: PropTypes.string,
      })
    ),
  }

  handleClick (id) {
    if (this.props.onChange) {
      this.props.onChange(id)
    }
  }

  render () {
    const { items } = this.props
    return (
      <div className='root reference-panel'>
        <style jsx>{styles}</style>
        <ul>
          {items.map((item) => (
            <li
              key={item.id}
              className={cn('item', {
                'item-active': item.isActive,
                'item-not-relevant': item.isNotRelevant,
              })}
            >
              <a onClick={() => this.handleClick(item.isActive ? null : item.id)}>
                <img src='/static/images/symbols/help.svg' />
                <span>{item.title}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

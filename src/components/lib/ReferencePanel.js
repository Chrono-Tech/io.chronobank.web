import React from 'react'
import PropTypes from 'prop-types'

import { Link } from 'src/router'

import styles from './ReferencePanel.sass'

export default class ReferencePanel extends React.Component {

  static propTypes = {
    items: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        title: PropTypes.string,
        route: PropTypes.string,
      })
    )
  }

  render () {
    const { items } = this.props
    return (
      <div className='root reference-panel'>
        <style jsx>{styles}</style>
        <ul>
          {items.map(item => (
            <li key={item.id}>
              <Link route={item.route}>
                <a>
                  <img src='/static/images/symbols/help.svg' />
                  <span>{item.title}</span>
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

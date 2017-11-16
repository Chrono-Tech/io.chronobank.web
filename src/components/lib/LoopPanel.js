import React from 'react'
import PropTypes from 'prop-types'

import styles from './LoopPanel.sass'

export class LoopPanel extends React.Component {

  static propTypes = {
    children: PropTypes.node
  }

  componentDidMount () {
    setImmediate(() => {
      // if (this.prevElement) {
      //   this.prevElement.classList.add('item-slided')
      // }
      // if (this.currElement) {
      //   this.currElement.classList.add('item-slided')
      // }
    })
  }

  render () {
    const { children } = this.props
    return (
      <div className='root loop-panel'>
        <style jsx>{styles}</style>
        <div className='content'>
          {children}
        </div>
      </div>
    )
  }
}

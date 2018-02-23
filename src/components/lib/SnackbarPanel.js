import React from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import cn from 'classnames'

import styles from './SnackbarPanel.sass'

export class SnackbarPanel extends React.Component {

  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    side: PropTypes.string,
    onClose: PropTypes.func,
  }

  componentDidMount () {
    // eslint-disable-next-line
    const root = ReactDOM.findDOMNode(this)
    setTimeout(() => {
      root.classList.add('snackbar-panel-open')
    }, 100)
  }

  handleBackdropClick (e) {
    if (this.props.onClose) {
      this.props.onClose(e)
    }
  }

  render () {
    const { side } = this.props
    return (
      <div
        className={cn('root', 'snackbar-panel', this.props.className, {
          'snackbar-panel-top': side === 'top',
          'snackbar-panel-right': side === 'right',
          'snackbar-panel-bottom': side === 'bottom',
          'snackbar-panel-left': side === 'left',
        })}
        onClick={(e) => {
          e.stopPropagation()
          this.handleBackdropClick(e)
        }}
      >
        <style jsx>{styles}</style>
        <div
          className='panel'
          onClick={(e) => {
            e.stopPropagation()
          }}
        >
          <div className='content'>
            {this.props.children}
          </div>
          <a
            className='close'
            onClick={(e) => {
              e.stopPropagation()
              this.handleBackdropClick(e)
            }}
          >
            <img src='/static/images/symbols/close-dark.svg' />
          </a>
        </div>
      </div>
    )
  }
}

export default SnackbarPanel

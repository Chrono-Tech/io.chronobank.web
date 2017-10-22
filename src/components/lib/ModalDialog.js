import React from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import cn from 'classnames'

import styles from './ModalDialog.sass'


export class ModalDialog extends React.Component {

  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    onClose: PropTypes.func
  }

  handleBackdropClick (e) {
    if (this.props.onClose) {
      this.props.onClose(e)
    }
  }

  componentDidMount () {
    // eslint-disable-next-line
    const root = ReactDOM.findDOMNode(this)
    setTimeout(() => {
      root.classList.add('modal-dialog-open')
    }, 100)
  }

  render () {
    return (
      <div className={cn('root', 'modal-dialog', this.props.className)}
        onClick={(e) => {
          e.stopPropagation()
          this.handleBackdropClick(e)
        }}
      >
        <style jsx>{styles}</style>
        <div className='dialog'
          onClick={(e) => {
            e.stopPropagation()
          }}
        >
          <div className='content'>
            {this.props.children}
          </div>
          <a className='close' onClick={(e) => {
            e.stopPropagation()
            this.handleBackdropClick(e)
          }}></a>
        </div>
      </div>
    )
  }
}

export default ModalDialog

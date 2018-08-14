import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import styles from './DropdownMenu.sass'

class DropdownMenu extends React.Component {

  static propTypes = {
    title: PropTypes.node,
    onButtonClick: PropTypes.func,
    className: PropTypes.string,
    buttonClassName: PropTypes.string,
  }

  static defaultProps = {
    className: '',
    buttonClassName: '',
  }

  constructor (props) {
    super(props)
    this.state = {
      isOpen: false,
    }
  }

  componentDidMount () {
    if (typeof window !== 'undefined') {
      this.clickOutsideHandler = () => {
        if (this.state.isOpen) {
          this.setState({
            isOpen: false,
          })
        }
      }
      window.document.addEventListener('click', this.clickOutsideHandler)
    }
  }

  componentWillUnmount () {
    if (typeof window !== 'undefined') {
      window.document.removeEventListener('click', this.clickOutsideHandler)
    }
  }

  handleClickOutside () {
    this.setState({
      isOpen: false,
    })
  }

  handleOpen () {
    // eslint-disable-next-line
    this.setState({
      isOpen: !this.state.isOpen,
    })
  }

  render () {
    const { isOpen } = this.state
    const { onButtonClick, buttonText, menu, className, buttonClassName } = this.props

    return (
      <div className={cn('root dropdown-menu', className, { 'dropdown-menu-open': isOpen })}>
        <style jsx>{styles}</style>
        <div className='content'>
          <div
            className={cn(buttonClassName, { 'dropdown-title': !buttonClassName })}
            onClick={(e) => {
              e.stopPropagation()
              e.nativeEvent.stopImmediatePropagation()
              this.handleOpen()
              onButtonClick && onButtonClick(e)
              return false
            }}
          >{ buttonText }
          </div>
          <div className='dropdown-options'>
            { menu }
          </div>
        </div>
      </div>
    )
  }
}

export default DropdownMenu

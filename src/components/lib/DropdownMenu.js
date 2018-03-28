import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import styles from './DropdownMenu.sass'

export class DropdownMenu extends React.Component {

  static propTypes = {
    options: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.any.isRequired,
        title: PropTypes.string.isRequired,
      })
    ).isRequired,
    className: PropTypes.string,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    getSelectedTitle: PropTypes.oneOf([null, PropTypes.func]),
  }

  constructor (props) {
    super(props)
    this.state = {
      isOpen: false,
      active: props.options.find((option) => option.value === props.value),
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

  componentWillReceiveProps (nextProps) {
    this.setState({
      active: nextProps.options.find((option) => option.value === nextProps.value),
    })
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

  handleSelect (option) {
    this.setState({
      isOpen: false,
    })
    if (this.props.onChange) {
      this.props.onChange(option.value)
    }
  }

  getSelectedTitle () {
    const { getSelectedTitle } = this.props
    const { active } = this.state

    return getSelectedTitle && getSelectedTitle(active) || active.value || ''
  }

  render () {
    const { options } = this.props
    const { active, isOpen } = this.state
    return (
      <div className={cn('root', 'dropdown-menu', this.props.className, { 'dropdown-menu-open': isOpen })}>
        <style jsx>{styles}</style>
        <div className='content'>
          <div
            className='dropdown-title'
            onClick={(e) => {
              e.stopPropagation()
              e.nativeEvent.stopImmediatePropagation()
              this.handleOpen()
              return false
            }}
          >{this.getSelectedTitle()}
          </div>
          <div className='dropdown-options'>
            {options.map((option) => (
              <div
                key={option.value}
                className={cn('dropdown-option', { 'dropdown-option-active': option.value === active.value })}
                onClick={(e) => {
                  e.stopPropagation()
                  e.nativeEvent.stopImmediatePropagation()
                  this.handleSelect(option)
                }}
              >{option.title}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
}

export default DropdownMenu

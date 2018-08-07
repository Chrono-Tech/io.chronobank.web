import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import DropdownMenu from './DropdownMenu'

import styles from './DropdownMenuWithOptions.sass'

export class DropdownMenuWithOptions extends React.Component {

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
    title: PropTypes.node,
  }

  constructor (props) {
    super(props)
    this.state = {
      active: props.options && props.options.find((option) => option.value === props.value),
    }
  }

  handleSelect (option) {
    if (this.props.onChange) {
      this.props.onChange(option.value)
    }
  }

  getSelectedTitle () {
    const { getSelectedTitle } = this.props
    const { active } = this.state

    return getSelectedTitle && getSelectedTitle(active) || active && active.value || ''
  }

  render () {
    const { options } = this.props
    const { active } = this.state

    return (
      <div className='root'>
        <style jsx>{styles}</style>
        <DropdownMenu
          buttonText={this.getSelectedTitle()}
          menu={options.map((option, i) => (
            <div
              key={i}
              className={cn('dropdown-option', { 'dropdown-option-active': option.value === active.value })}
              onClick={(e) => {
                e.stopPropagation()
                e.nativeEvent.stopImmediatePropagation()
                this.handleSelect(option)
              }}
            >{option.title}
            </div>
          ))}
        />
      </div>
    )
  }
}

export default DropdownMenuWithOptions

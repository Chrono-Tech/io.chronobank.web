import React from 'react'
import PropTypes from 'prop-types'

import styles from './SearchPanel.sass'

export default class SearchPanel extends React.Component {

  static propTypes = {
    onChange: PropTypes.func,
  }

  handleChange (value) {
    if (this.props.onChange) {
      this.props.onChange(value)
    }
  }

  render () {
    return (
      <div className='root search-panel'>
        <style jsx>{styles}</style>
        <input type='text' placeholder='Search' onChange={(e) => this.handleChange(e.currentTarget.value)} />
      </div>
    )
  }
}

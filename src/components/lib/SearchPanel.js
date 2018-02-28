import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {constantSelector} from 'src/store'

import styles from './SearchPanel.sass'

@connect(mapStateToProps)
export default class SearchPanel extends React.Component {

  static propTypes = {
    onChange: PropTypes.func,
    constants: PropTypes.func,
  }

  handleChange (value) {
    if (this.props.onChange) {
      this.props.onChange(value)
    }
  }

  render () {
    const { constants } = this.props

    return (
      <div className='root search-panel'>
        <style jsx>{styles}</style>
        <input type='text' placeholder={ constants('search') } onChange={(e) => this.handleChange(e.currentTarget.value)} />
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    constants: constantSelector(state)
  }
}
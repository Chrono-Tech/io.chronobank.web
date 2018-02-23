import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import styles from './SnackbarStack.sass'

export class SnackbarStack extends React.Component {

  render () {

    return (
      <div className='root snackbar-stack'>
        <style jsx>{styles}</style>
        { this.props.stack.map((snackbar) => (
          <snackbar.component key={snackbar.key} {...snackbar.props} />
        )) }
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    stack: state.snackbars.stack,
  }
}

SnackbarStack.propTypes = {
  stack: PropTypes.array,
}

export default connect(mapStateToProps)(SnackbarStack)

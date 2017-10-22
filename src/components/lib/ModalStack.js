import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import styles from './ModalStack.sass'

export class ModalStack extends React.Component {

  render () {

    return (
      <div className='root modal-stack'>
        <style jsx>{styles}</style>
        { this.props.stack.map((modal) => (
          <modal.component key={modal.key} { ...modal.props } />
        )) }
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    stack: state.modals.stack
  }
}

ModalStack.propTypes = {
  stack: PropTypes.array,
}

export default connect(mapStateToProps)(ModalStack)

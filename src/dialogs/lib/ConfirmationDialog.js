import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { ModalDialog } from 'src/components'
import { modalsClose } from 'src/store'

import styles from './ConfirmationDialog.sass'

export class ConfirmationDialog extends React.Component {

  static propTypes = {
    job: PropTypes.object,
    onClose: PropTypes.func,
  }

  render () {
    const { job } = this.props
    return (
      <ModalDialog onClose={() => this.props.onClose()}>
        <style jsx>{styles}</style>
        <div className='root confirmation-dialog'>
          <div className='separator'></div>
          <div className='icon' />
          <div className='content'>
            <h2>Your application has been submitted</h2>
            <p>
              Thank you for interest in <strong>Front-end developer</strong> at <strong>LaborX</strong>
              We have received your application and we look forward to reviewing the applications soon.
              We will call successful applicants for an interview at that time.
            </p>
            <a className='button' onClick={() => this.props.onClose()}>OK</a>
          </div>

        </div>
      </ModalDialog>
    )
  }
}

function mapDispatchToProps (dispatch) {
  return {
    onClose: () => dispatch(modalsClose()),
  }
}

export default connect(null, mapDispatchToProps)(ConfirmationDialog)

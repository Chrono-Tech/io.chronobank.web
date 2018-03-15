import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { ModalDialog } from 'src/components'
import { modalsClose, titleSelector, constantSelector } from 'src/store'
import * as partials from 'src/partials'

import styles from './ConfirmationDialog.sass'

export class ConfirmationDialog extends React.Component {

  static propTypes = {
    job: PropTypes.object,
    onClose: PropTypes.func,
    titles: PropTypes.func,
    constants: PropTypes.func,
  }

  render () {
    const { job, titles, constants } = this.props
    return (
      <ModalDialog onClose={() => this.props.onClose()}>
        <style jsx>{styles}</style>
        <div className='root confirmation-dialog'>
          <div className='wrap'>
            <div className='separator' />
            <div className='icon-wrapper'>
              <div className='icon' />
            </div>
            <div className='content'>
              <div className='title'>
                <partials.TheTitle title={titles('your-application-has-been-submitted')} />
              </div>
              <p>
                { constants('thank-you-for-interest-in')} <strong>{ job.title }.</strong>
                <br />
                { constants('confirm-vacancy-message') }
              </p>
              <div className='button-wrapper'>
                <button onClick={() => this.props.onClose()}>OK</button>
              </div>
            </div>
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

function mapStateToProps (state) {
  return {
    titles: titleSelector(state),
    constants: constantSelector(state),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmationDialog)

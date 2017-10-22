import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { ModalDialog } from 'src/components'
import { modalsClose } from 'src/store'

import styles from './JobDialog.sass'

export class JobDialog extends React.Component {

  static propTypes = {
    job: PropTypes.object,
    onClose: PropTypes.func
  }

  render () {
    const { job } = this.props
    return (
      <ModalDialog onClose={() => this.props.onClose()}>
        <style jsx>{styles}</style>
        <div className='root job-dialog'>
          <div className='text' dangerouslySetInnerHTML={{ __html: job.details}}></div>
          <form>
            <div className='field'>
              <label htmlFor='apply-name'>Your name*</label>
              <input type='text' id='apply-name' required />
            </div>
            <div className='field'>
              <label htmlFor='apply-email'>Email*</label>
              <input type='email' id='apply-email' required />
            </div>
            <div className='field'>
              <label htmlFor='apply-message'>Additional information, links: portfolio url, linkedin, github, telegram, skype etc.</label>
              <textarea id='apply-message' required></textarea>
            </div>
            <div className='buttons'>
              <input className='button' type='submit' value='Send' />
            </div>
          </form>
        </div>
      </ModalDialog>
    )
  }
}

function mapDispatchToProps (dispatch) {
  return {
    onClose: () => dispatch(modalsClose())
  }
}

export default connect(null, mapDispatchToProps)(JobDialog)

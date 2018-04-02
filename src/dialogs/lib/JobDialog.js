import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { BACKEND } from 'src/endpoints'
import { ModalDialog } from 'src/components'
import { ConfirmationDialog } from 'src/dialogs'
import * as partials from 'src/partials'
import { modalsClose, modalsOpen, constantSelector, titleSelector } from 'src/store'

import styles from './JobDialog.sass'

export class JobDialog extends React.Component {

  static propTypes = {
    job: PropTypes.object,
    onClose: PropTypes.func,
    handleSave: PropTypes.func,
    titles: PropTypes.func,
    constants: PropTypes.func,
  }

  handleInput (el) {
    el.classList.toggle('not-empty', el.value !== '')
  }

  async handleSubmit (e) {
    const { constants, titles, job, handleSave } = this.props
    e.preventDefault()

    // TODO: Move to redux
    await BACKEND.post('applications', {
      // eslint-disable-next-line no-underscore-dangle
      job: this.props.job._id,
      name: this.nameElement.value,
      email: this.emailElement.value,
      phone: this.phoneElement.value,
      message: this.messageElement.value,
    })
    for (const el of [this.nameElement, this.emailElement, this.messageElement]) {
      el.value = ''
      this.handleInput(el)
    }

    const title = <partials.TheTitle title={titles('your-application-has-been-submitted')} />

    const content = (
      <p>
        { constants('thank-you-for-interest-in')} <strong>{ job.title }.</strong>
        <br />
        { constants('confirm-vacancy-message') }
      </p>
    )

    handleSave(title, content)
  }

  render () {
    const { job, constants } = this.props
    return (
      <ModalDialog onClose={() => this.props.onClose()}>
        <style jsx>{styles}</style>
        <div className='root job-dialog'>
          <div className='text' dangerouslySetInnerHTML={{ __html: job.details }} />
          <form ref={(el) => this.formElement = el} onSubmit={(e) => this.handleSubmit(e)}>
            <div className='field'>
              <input
                type='text'
                id='apply-name'
                required
                ref={(el) => this.nameElement = el}
                onChange={(e) => this.handleInput(e.currentTarget)}
              />
              <label htmlFor='apply-name'>{constants('your-name')}*</label>
            </div>
            <div className='field'>
              <input
                type='email'
                id='apply-email'
                required
                ref={(el) => this.emailElement = el}
                onChange={(e) => this.handleInput(e.currentTarget)}
              />
              <label htmlFor='apply-email'>{constants('email')}*</label>
            </div>
            <div className='field'>
              <input
                type='text'
                id='apply-phone'
                required
                ref={(el) => this.phoneElement = el}
                onChange={(e) => this.handleInput(e.currentTarget)}
              />
              <label htmlFor='apply-phone'>{constants('phone')}*</label>
            </div>
            <div className='field'>
              <textarea
                id='apply-message'
                required
                ref={(el) => this.messageElement = el}
                onChange={(e) => this.handleInput(e.currentTarget)}
              />
              <label htmlFor='apply-message'>{constants('additional-information-links')}</label>
            </div>
            <div className='buttons'>
              <input className='button' type='submit' value={constants('send')} />
            </div>
          </form>
        </div>
      </ModalDialog>
    )
  }
}

function mapDispatchToProps (dispatch) {
  return {
    onClose: () => dispatch(modalsClose()),
    handleSave: (title, content) => {
      dispatch(modalsClose())
      dispatch(modalsOpen({
        component: ConfirmationDialog,
        props: {
          dialogTitle: title,
          dialogContent: content,
        },
      }))
    },
  }
}

function mapStateToProps (state) {
  return {
    titles: titleSelector(state),
    constants: constantSelector(state),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(JobDialog)

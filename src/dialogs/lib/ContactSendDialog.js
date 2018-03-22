import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { ModalDialog } from 'src/components'
import { ConfirmationDialog } from 'src/dialogs'
import { BACKEND } from 'src/endpoints'
import { modalsClose, modalsOpen, titleSelector, constantSelector } from 'src/store'

import styles from './ContactSendDialog.sass'

export class ContactSendDialog extends React.Component {

  static propTypes = {
    onClose: PropTypes.func,
    titles: PropTypes.func,
    constants: PropTypes.func,
    handleSave: PropTypes.func,
  }

  handleInput (el) {
    el.classList.toggle('not-empty', el.value !== '')
  }

  async handleSubmit (e) {
    const { constants, titles, handleSave } = this.props

    e.preventDefault()

    // TODO: Move to redux
    await BACKEND.post('reports', {
      // eslint-disable-next-line no-underscore-dangle
      // job: this.props.job._id,
      name: this.nameElement.value,
      email: this.emailElement.value,
      phone: this.phoneElement.value,
      message: this.messageElement.value,
    })
    for (const el of [this.nameElement, this.emailElement, this.phoneElement, this.messageElement]) {
      el.value = ''
      this.handleInput(el)
    }
    const title = titles('your-message-has-been-sent')

    const content = constants('thank-you-shortly')

    handleSave(title, content)
  }

  render () {
    const { titles, constants, onClose } = this.props
    return (
      <ModalDialog onClose={() => onClose()}>
        <style jsx>{styles}</style>
        <div className='root contact-send-dialog'>
          <div className='title'>{ titles('contact-us') }</div>
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
              <label htmlFor='apply-message'>{constants('message')}*</label>
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
    onClose: () => dispatch(modalsClose()),
  }
}

function mapStateToProps (state) {
  return {
    titles: titleSelector(state),
    constants: constantSelector(state),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactSendDialog)

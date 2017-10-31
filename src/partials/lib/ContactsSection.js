import React from 'react'
// import PropTypes from 'prop-types'
import { BACKEND } from 'src/endpoints'

import styles from './ContactsSection.sass'

export default class ContactsSection extends React.Component {

  // static propTypes = {
  //   articles: PropTypes.object,
  // }

  render () {
    return (
      <div className='root contacts-section'>
        <style jsx>{styles}</style>
        <div className='background'>
          <div className='background-left'></div>
          <div className='background-right'></div>
        </div>
        <div className='wrap'>
          <h3>Contact us</h3>
          <div className='content'>
            <div className='left'>
              <div className='inner-wrap'>
                <h3>Contact us</h3>
                <ul>
                  <li>
                    <div className='symbol'>
                      <img src='/static/images/contacts/light.svg' />
                    </div>
                    <div className='info'>
                      <h5>General inquiries</h5>
                      <div><a href='mailto:info@chronobank.io' target='_blank' rel='noopener noreferrer'>info@chronobank.io</a></div>
                    </div>
                  </li>
                  <li>
                    <div className='symbol'>
                      <img src='/static/images/contacts/support.svg' />
                    </div>
                    <div className='info'>
                      <h5>Technical support</h5>
                      <div><a href='mailto:support@chronobank.io' target='_blank' rel='noopener noreferrer'>support@chronobank.io</a></div>
                    </div>
                  </li>
                  <li>
                    <div className='symbol'>
                      <img src='/static/images/contacts/telegram.svg' />
                    </div>
                    <div className='info'>
                      <h5>Telegram</h5>
                      <div><a href='#' target='_blank' rel='noopener noreferrer'>chronobank</a></div>
                    </div>
                  </li>
                  <li>
                    <div className='symbol'>
                      <img src='/static/images/contacts/slack.svg' />
                    </div>
                    <div className='info'>
                      <h5>Slack</h5>
                      <div><a href='#' target='_blank' rel='noopener noreferrer'>chronobank</a></div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className='right'>
              <div className='inner-wrap'>
                <form ref={el => this.formElement = el} onSubmit={e => this.handleSubmit(e)}>
                  <div className='inner'>
                    <h4>Get in touch with our team</h4>
                    <div className='field'>
                      <input type='text' id='contacts-name' required
                        ref={el => this.nameElement = el}
                        onChange={e => this.handleInput(e.currentTarget)}
                      />
                      <label htmlFor='contacts-name'>Your name</label>
                    </div>
                    <div className='field'>
                      <input type='email' id='contacts-email' required
                        ref={el => this.emailElement = el}
                        onChange={e => this.handleInput(e.currentTarget)}
                      />
                      <label htmlFor='contacts-email'>Email</label>
                    </div>
                    <div className='field'>
                      <textarea id='contacts-message' required
                        ref={el => this.messageElement = el}
                        onChange={e => this.handleInput(e.currentTarget)}
                      ></textarea>
                      <label htmlFor='contacts-message'>Message</label>
                    </div>
                    <div className='buttons'>
                      <input className='button' type='submit' value='Send message' />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  handleInput (el) {
    el.classList.toggle('not-empty', el.value !== '')
  }

  async handleSubmit (e) {
    e.preventDefault()

    await BACKEND.post('enquiries', {
      name: this.nameElement.value,
      email: this.emailElement.value,
      message: this.messageElement.value
    })
    for (const el of [this.nameElement, this.emailElement, this.messageElement]) {
      el.value = ''
      this.handleInput(el)
    }
  }
}

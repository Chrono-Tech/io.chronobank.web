import React from 'react'
// import PropTypes from 'prop-types'

import styles from './ContactsSection.sass'

export default class ContactsSection extends React.Component {

  // static propTypes = {
  //   articles: PropTypes.object,
  // }

  render () {
    return (
      <div className='root contacts-section'>
        <style jsx>{styles}</style>
        <h3>Contact us</h3>
        <div className='content'>
          <div className='left'>
            <div className='wrap'>
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
            <div className='wrap'>
              <form>
                <div className='inner'>
                  <h4>Get in touch with our team</h4>
                  <div className='field'>
                    <label htmlFor='contacts-name'>Your name</label>
                    <input type='text' id='contacts-name' required />
                  </div>
                  <div className='field'>
                    <label htmlFor='contacts-email'>Email</label>
                    <input type='email' id='contacts-email' required />
                  </div>
                  <div className='field'>
                    <label htmlFor='contacts-message'>Message</label>
                    <textarea id='contacts-message' required></textarea>
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
    )
  }
}

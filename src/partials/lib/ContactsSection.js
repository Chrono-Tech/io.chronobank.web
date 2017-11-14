import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { BACKEND } from 'src/endpoints'
import { ContactModel } from 'src/models'
import styles from './ContactsSection.sass'

@connect(mapStateToProps)
export default class ContactsSection extends React.Component {

  static propTypes = {
    contacts: PropTypes.arrayOf(ContactModel),
  }

  render () {
    const { contacts } = this.props
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
                  {contacts.map(c => (
                    <li key={c.id}>
                      <div className='symbol'>
                        <img src={c.icon32x32.url} />
                      </div>
                      <div className='info'>
                        <h5>{c.title}</h5>
                        <div><a href={c.url} target='_blank' rel='noopener noreferrer'>{c.label}</a></div>
                      </div>
                    </li>
                  ))}
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

    // TODO: Move to redux
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

function mapStateToProps (state) {
  return {
    contacts: state.pages.contacts.filter(c => c.isVisibleInContacts),
  }
}

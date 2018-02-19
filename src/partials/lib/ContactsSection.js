import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import cn from 'classnames'

import { BACKEND } from 'src/endpoints'
import { ContactModel } from 'src/models'
import styles from './ContactsSection.sass'

const ENQUIRY_STATUS_COMPLETED = {
  className: 'message-success',
  label: 'Success',
  title: 'Your message has been sent',
  details: 'We’ll be in touch soon.'
}

const ENQUIRY_STATUS_FAILED = {
  className: 'message-failure',
  label: 'Failure',
  title: 'Service temporarily unavailable',
  details: 'Please try again later.'
}

@connect(mapStateToProps)
export default class ContactsSection extends React.Component {

  static propTypes = {
    contacts: PropTypes.arrayOf(
      PropTypes.instanceOf(ContactModel)
    ),
  }

  constructor (props) {
    super(props)
    this.state = {
      enquiryStatus: null
    }
  }

  render () {
    const { contacts } = this.props
    const { enquiryStatus } = this.state
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
                        <div>
                          {c.url && c.url.indexOf('mailto:') === 0
                            ? <a href={c.url}>{c.label}</a>
                            : <a href={c.url} target='_blank' rel='noopener noreferrer'>{c.label}</a>
                          }
                        </div>
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
                      {enquiryStatus == null
                        ? <input className='button' type='submit' value='Send message' />
                        : (
                          <div className={cn('message', enquiryStatus.className)}>
                            <div className='heading'>
                              <div className='heading-title'>{enquiryStatus.title}</div>
                              <div className='heading-label label-success'>{enquiryStatus.label}</div>
                            </div>
                            <div className='details'>{enquiryStatus.details}</div>
                          </div>
                        )
                      }
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

    try {
      // TODO: Move to redux
      await BACKEND.post('enquiries', {
        name: this.nameElement.value,
        email: this.emailElement.value,
        message: this.messageElement.value
      })
      this.setState({
        enquiryStatus: ENQUIRY_STATUS_COMPLETED
      })
      for (const el of [this.nameElement, this.emailElement, this.messageElement]) {
        el.value = ''
        this.handleInput(el)
      }
    } catch (e) {
      this.setState({
        enquiryStatus: ENQUIRY_STATUS_FAILED
      })
    }
  }
}

function mapStateToProps (state) {
  return {
    contacts: state.pages.contacts.array.filter(c => c.isVisibleInContacts),
  }
}

import React from 'react'
import styles from './TheFooter.sass'

import { BACKEND } from 'src/endpoints'

export default class TheFooter extends React.Component {

  componentDidMount () {
    if (typeof window !== 'undefined') {
      require('smoothscroll-polyfill').polyfill()
    }
  }

  scrollTo ({ top = 0, left = 0 }) {
    if (typeof window !== 'undefined') {
      window.scroll({
        top,
        left,
        behavior: 'smooth'
      })
    }
  }

  render () {
    return (
      <footer className='root footer-section'>
        <style jsx>{styles}</style>
        <div className='wrap'>
          <a className='scrolltop' onClick={() => this.scrollTo({ top: 0 })}></a>
          <div className='columns'>
            <div className='col-1'>
              <div className='logo'>
                <img className='logo-mobile' src='/static/images/logo/logo-mobile-footer.svg' />
                <img className='logo-desktop' src='/static/images/logo/logo-desktop-footer.svg' />
              </div>
              <div className='publications'>
                <ul>
                  <li><a href='#'>Download</a> Business outline</li>
                  <li><a href='#'>Download</a> Development plan</li>
                  <li><a href='#'>Download</a> White paper</li>
                </ul>
              </div>
            </div>
            <div className='col-2'>
              <div className='menu'>
                <h4>MENU</h4>
                <ul>
                  <li>
                    <a href='/' target='_blank' rel='noopener noreferrer'>ChronoMint</a>
                  </li>
                  <li>
                    <a href='#'>LaborX</a>
                  </li>
                  <li>
                    <a href='/team.html' target='_blank' rel='noopener noreferrer'>Team</a>
                  </li>
                  <li>
                    <a href='/faq' target='_blank' rel='noopener noreferrer'>FAQ</a>
                  </li>
                  <li>
                    <a href='https://blog.chronobank.io' target='_blank' rel='noopener noreferrer'>Blog</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className='col-3'>
              <div className='contacts'>
                <h4>Contacts us</h4>
                <dl>
                  <dt>Technical support:</dt>
                  <dd><a href='mailto:support@chronobank.io'>support@chronobank.io</a></dd>
                  <dt>General inquiries:</dt>
                  <dd><a href='mailto:info@chronobank.io'>info@chronobank.io</a></dd>
                </dl>
              </div>
              <div className='socials'>
                <h4>social network</h4>
                <nav>
                  <a href='https://www.facebook.com/ChronoBank.io' target='_blank' rel='noopener noreferrer'>
                    <img src='/static/images/socials/facebook.svg' />
                  </a>
                  <a href='https://twitter.com/ChronobankNews' target='_blank' rel='noopener noreferrer'>
                    <img src='/static/images/socials/twitter.svg' />
                  </a>
                  <a href='https://www.instagram.com/chronobank.io/' target='_blank' rel='noopener noreferrer'>
                    <img src='/static/images/socials/instagram.svg' />
                  </a>
                  <a href='https://www.reddit.com/r/ChronoBank/' target='_blank' rel='noopener noreferrer'>
                    <img src='/static/images/socials/reddit.svg' />
                  </a>
                  <a href='https://chronobank.herokuapp.com/' target='_blank' rel='noopener noreferrer'>
                    <img src='/static/images/socials/slack.svg' />
                  </a>
                  <a href='https://telegram.me/chronobank' target='_blank' rel='noopener noreferrer'>
                    <img src='/static/images/socials/telegram.svg' />
                  </a>
                  <a href='https://github.com/ChronoBank' target='_blank' rel='noopener noreferrer'>
                    <img src='/static/images/socials/github.svg' />
                  </a>
                </nav>
              </div>
            </div>
            <div className='col-4'>
              <div className='downloads'>
                <h4>Downloads</h4>
                <ul>
                  <li>
                    <a href='#' target='_blank' rel='noopener noreferrer'>
                      <img src='/static/images/symbols/download.svg' />
                      <span>Desktop App for macOS</span>
                    </a>
                  </li>
                  <li>
                    <a href='#' target='_blank' rel='noopener noreferrer'>
                      <img src='/static/images/symbols/download.svg' />
                      <span>Desktop App for Windows</span>
                    </a>
                  </li>
                </ul>
              </div>
              <form className='subscribe' onSubmit={e => this.handleSubmit(e)}>
                <h4>Newsletter</h4>
                <div className='block'>
                  <input className='field' ref={el => this.emailElement = el} type='email' placeholder='Enter email for news' required />
                </div>
                <div className='block'>
                  <input className='button' type='submit' value='Subscribe' />
                </div>
              </form>
            </div>
          </div>
          <address>Copyright ©2017 Edway Group Pty. Ltd. All Rights Reserved.</address>
        </div>
      </footer>
    )
  }

  async handleSubmit (e) {
    e.preventDefault()

    await BACKEND.post('subscriptions', {
      email: this.emailElement.value
    })
    for (const el of [this.emailElement]) {
      el.value = ''
    }
  }
}

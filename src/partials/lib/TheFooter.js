import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { Link } from 'src/router'
import { BACKEND } from 'src/endpoints'
import { MenuModel, PaperModel, SocialModel, ContactModel } from 'src/models'
import styles from './TheFooter.sass'

@connect(mapStateToProps)
export default class TheFooter extends React.Component {

  static propTypes = {
    menus: PropTypes.arrayOf(MenuModel),
    papers: PropTypes.arrayOf(PaperModel),
    socials: PropTypes.arrayOf(SocialModel),
    contacts: PropTypes.arrayOf(ContactModel),
  }

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
    const { menus, papers, contacts, socials } = this.props
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
                  {papers.map(p => (
                    <li key={p.id}><a href={p.url} target='_blank' rel='noopener noreferrer'>Download</a> {p.title}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className='col-2'>
              <div className='menu'>
                <h4>MENU</h4>
                <ul>
                  {menus.map(m => (
                    <li key={m.id}>
                      {m.isRoute()
                        ? <Link route={m.url}><a>{m.title}</a></Link>
                        : <a href={m.url} target='_blank' rel='noopener noreferrer'>ChronoMint</a>
                      }
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className='col-3'>
              <div className='contacts'>
                <h4>Contacts us</h4>
                {contacts.map(c => (
                  <dl key={c.id}>
                    <dt>{c.title}:</dt>
                    <dd><a href={c.url}>{c.label}</a></dd>
                  </dl>
                ))}
              </div>
              <div className='socials'>
                <h4>social network</h4>
                <nav>
                  {socials.map(s => (
                    <a key={s.id} href={s.url} target='_blank' rel='noopener noreferrer'>
                      <img src={s.icon32x32.url} />
                    </a>
                  ))}
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

function mapStateToProps (state) {
  return {
    menus: state.pages.menus.filter(m => m.isVisibleInFooter),
    papers: state.pages.papers,
    contacts: state.pages.contacts.filter(c => c.isVisibleInFooter),
    socials: state.pages.socials
  }
}

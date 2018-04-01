import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import cn from 'classnames'

import { Link } from 'src/router'
import { productSelector, constantSelector } from 'src/store'
import { BACKEND } from 'src/endpoints'
import { MenuModel, PaperModel, SocialModel, ContactModel, ProductDistroModel } from 'src/models'
import styles from './TheFooter.sass'

const SUBSCRIPTION_STATUS_COMPLETED = {
  className: 'message-success',
  message: 'Thank you for subscribing!',
}

const SUBSCRIPTION_STATUS_FAILED = {
  className: 'message-failure',
  message: 'Service temporarily unavailable',
}

@connect(mapStateToProps)
export default class TheFooter extends React.Component {

  static propTypes = {
    productSlug: PropTypes.string,
    menus: PropTypes.arrayOf(
      PropTypes.instanceOf(MenuModel)
    ),
    papers: PropTypes.arrayOf(
      PropTypes.instanceOf(PaperModel)
    ),
    socials: PropTypes.arrayOf(
      PropTypes.instanceOf(SocialModel)
    ),
    contacts: PropTypes.arrayOf(
      PropTypes.instanceOf(ContactModel)
    ),
    constants: PropTypes.func,
    distros: PropTypes.arrayOf(
      PropTypes.instanceOf(ProductDistroModel)
    ),
    telegramPin: PropTypes.bool,
  }

  constructor (props) {
    super(props)
    this.state = {
      subscriptionStatus: null,
    }
  }

  componentDidMount () {
    if (typeof window !== 'undefined') {
      // eslint-disable-next-line global-require
      require('smoothscroll-polyfill').polyfill()
    }
  }

  async handleSubmit (e) {
    e.preventDefault()
    try {
      await BACKEND.post('subscriptions', {
        email: this.emailElement.value,
      })
      this.setState({
        subscriptionStatus: SUBSCRIPTION_STATUS_COMPLETED,
      })
      for (const el of [this.emailElement]) {
        el.value = ''
      }
    } catch (e) {
      this.setState({
        subscriptionStatus: SUBSCRIPTION_STATUS_FAILED,
      })
    }
  }

  scrollTo ({ top = 0, left = 0 }) {
    if (typeof window !== 'undefined') {
      window.scroll({
        top,
        left,
        behavior: 'smooth',
      })
    }
  }

  render () {
    const { menus, papers, contacts, socials, distros, constants, telegramPin } = this.props
    const { subscriptionStatus } = this.state
    return (
      <footer className={cn('root', 'footer-section', {
        'telegram-section-enabled': telegramPin,
      })}>
        <style jsx>{styles}</style>
        <div className='wrap'>
          <a className='scrolltop' onClick={() => this.scrollTo({ top: 0 })}>Scroll to top</a>
          <div className='columns'>
            <div className='col-1'>
              <div className='logo'>
                <img className='logo-mobile' src='/static/images/logo/logo-mobile-footer.svg' />
                <img className='logo-desktop' src='/static/images/logo/logo-desktop-footer.svg' />
              </div>
              <div className='publications'>
                <ul>
                  {papers.map((p) => (
                    <li key={p.id}><a href={p.url} target='_blank' rel='noopener noreferrer'>{ constants('download') }</a> {p.title}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className='col-2'>
              <div className='menu'>
                <h4>{ constants('menu') }</h4>
                <ul>
                  {menus.map((m) => (
                    <li key={m.id}>
                      {m.isRoute()
                        ? <Link route={m.url}><a>{m.title}</a></Link>
                        : <a href={m.url} target='_blank' rel='noopener noreferrer'>{m.title}</a>
                      }
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className='col-3'>
              <div className='contacts'>
                <h4>{ constants('contact-us-footer') }</h4>
                {contacts.map((c) => (
                  <dl key={c.id}>
                    <dt>{c.title}:</dt>
                    <dd><a href={c.url}>{c.label}</a></dd>
                  </dl>
                ))}
              </div>
              <div className='socials'>
                <h4>{ constants('social-network') }</h4>
                <nav>
                  {socials.map((s) => (
                    <a key={s.id} href={s.url} target='_blank' rel='noopener noreferrer'>
                      <img src={s.icon32x32.url} />
                    </a>
                  ))}
                </nav>
              </div>
            </div>
            <div className='col-4'>
              <div className='downloads'>
                <h4>{ constants('downloads') }</h4>
                <ul>
                  {distros.filter((distro) => distro.type === 'desktop').map((distro) => (
                    <li key={distro.id}>
                      <a href={distro.url} target='_blank' rel='noopener noreferrer'>
                        <img src='/static/images/symbols/download.svg' />
                        <span>{distro.title}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <form className='subscribe' onSubmit={(e) => this.handleSubmit(e)}>
                <h4>{ constants('newsletter') }</h4>
                <div className='block'>
                  <input className='field' ref={(el) => this.emailElement = el} type='email' placeholder={constants('enter-email-for-news')} required />
                </div>
                <div className='block'>
                  {subscriptionStatus == null
                    ? <input className='button' type='submit' value={constants('subscribe')} />
                    : (
                      <div className={cn('message', subscriptionStatus.className)}>
                        {subscriptionStatus.message}
                      </div>
                    )
                  }
                </div>
              </form>
            </div>
          </div>
          <address>{ constants('copyright') }</address>
        </div>
      </footer>
    )
  }
}

function mapStateToProps (state, op) {
  const product = productSelector(op.productSlug)(state)
  return {
    distros: product.distros,
    menus: state.pages.menus.array.filter((m) => m.isVisibleInFooter),
    papers: state.pages.papers.array,
    contacts: state.pages.contacts.array.filter((c) => c.isVisibleInFooter),
    socials: state.pages.socials.array,
    telegramPin: state.pages.telegramPin,
    constants: constantSelector(state),
  }
}

import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import cn from 'classnames'

import { setVisibleTelegramBar, initTelegramPin, constantSelector, telegramUrlSelector } from 'src/store'
import styles from './TelegramSection.sass'

@connect(mapStateToProps, mapDispatchToProps)
export default class TelegramSection extends React.Component {

  static propTypes = {
    telegramPin: PropTypes.bool,
    closeTelegramBar: PropTypes.func,
    initTelegramPin: PropTypes.func,
    constants: PropTypes.func,
    telegramUrl: PropTypes.string,
  }

  componentDidMount () {
    this.props.initTelegramPin()
  }

  render () {
    const { closeTelegramBar, telegramPin, telegramUrl, constants } = this.props

    return (
      <section className={cn('root', 'telegram-section', { 'telegram-section-visible': telegramPin })}>
        <style jsx>{styles}</style>
        <a href={telegramUrl} className='link' rel='noopener noreferrer' target='_blank'>
          <span className='icon'>
            <img src='/static/images/svg/telegram.svg' alt='' />
          </span>
          <p className='text'>{constants('join-our-telegram')}</p>
        </a>
        <button type='button' className='close' onClick={closeTelegramBar}>
          <svg xmlns='http://www.w3.org/2000/svg' className='close-icon' width='24' height='24' viewBox='0 0 24 24'>
            <path d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59
            19 19 17.59 13.41 12z'
            />
          </svg>
        </button>
      </section>

    )
  }
}

function mapStateToProps (state) {
  return {
    telegramPin: state.pages.telegramPin,
    constants: constantSelector(state),
    telegramUrl: telegramUrlSelector(state),
  }
}

function mapDispatchToProps (dispatch) {
  return {
    closeTelegramBar: () => {
      dispatch(setVisibleTelegramBar(false))
    },
    initTelegramPin: () => {
      dispatch(initTelegramPin())
    },
  }
}

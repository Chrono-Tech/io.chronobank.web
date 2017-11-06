import React from 'react'
import styles from './JoinSection.sass'

export default class JoinSection extends React.Component {

  render () {
    return (
      <div className='root join-section'>
        <style jsx>{styles}</style>
        <div className='wrap'>
          <div className='content'>
            <img className='bg-left' src='/static/images/svg/slack-big.svg' />
            <img className='bg-right' src='/static/images/svg/telegram-big.svg' />
            <a className='btn-white' href='https://chronobank.herokuapp.com/' target='_blank' rel='noopener noreferrer'>
              <img src='/static/images/svg/slack-blue.svg' />
              <span>Join our Slack</span>
            </a>
            <p>Get in touch with our team!</p>
            <a className='btn-blue' href='https://telegram.me/chronobank' target='_blank' rel='noopener noreferrer'>
              <img src='/static/images/svg/telegram-white.svg' />
              <span>Join our Telegram</span>
            </a>
          </div>
        </div>
      </div>
    )
  }
}

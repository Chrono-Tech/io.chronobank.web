import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import cn from 'classnames'

import { Link } from 'src/router'
import styles from './TelegramSection.sass'

@connect(mapStateToProps, mapDispatchToProps)
export default class TelegramSection extends React.Component {

  static propTypes = {

  }

  componentDidMount () {

  }

  render () {
    const {  } = this.props

    return (
      <section className='root telegram-section'>
        <style jsx>{styles}</style>
        <a href='https://t.me/sonm_eng' className='link' rel='noopener noreferrer' target='_blank'>
          <p className='text'>Join our community on Telegram</p>
          <span className='icon'>
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 300'>
              <path d='M5.299 144.645l69.126 25.8 26.756 86.047c1.712 5.511 8.451 7.548 12.924
              3.891l38.532-31.412a11.496 11.496 0 0 1 14.013-.391l69.498 50.457c4.785
               3.478 11.564.856 12.764-4.926L299.823
               29.22c1.31-6.316-4.896-11.585-10.91-9.259L5.218 129.402c-7.001 2.7-6.94 12.612.081 15.243zm91.57
                12.066l135.098-83.207c2.428-1.491 4.926 1.792 2.841 3.726L123.313 180.87a23.112 23.112 0 0
                0-7.163 13.829l-3.798 28.146c-.503 3.758-5.782
                4.131-6.819.494l-14.607-51.325c-1.673-5.854.765-12.107 5.943-15.303z'
              />
            </svg>
          </span>
        </a>
        <button type='button' className='close'>
          <svg className='close-icon' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>
            <path d='M505.943 6.058c-8.077-8.077-21.172-8.077-29.249 0L6.058 476.693c-8.077
                8.077-8.077 21.172 0 29.249A20.612 20.612 0 0 0 20.683 512a20.614 20.614 0 0 0 14.625-6.059L505.943
                35.306c8.076-8.076 8.076-21.171 0-29.248z'
            />
            <path d='M505.942 476.694L35.306 6.059c-8.076-8.077-21.172-8.077-29.248 0-8.077 8.076-8.077 21.171
                0 29.248l470.636 470.636a20.616 20.616 0 0 0 14.625 6.058 20.615 20.615 0 0 0 14.624-6.057c8.075-8.078
                 8.075-21.173-.001-29.25z'
            />
          </svg>
        </button>
      </section>

    )
  }
}

function mapStateToProps (state) {
  return {
  }
}

function mapDispatchToProps (dispatch) {
  return {
    changeLanguage: (value) => {
      // dispatch(changeUserLanguage(value))
    },

  }
}
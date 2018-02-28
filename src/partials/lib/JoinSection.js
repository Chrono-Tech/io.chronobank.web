import React from 'react'
import styles from './JoinSection.sass'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {constantSelector} from 'src/store'

@connect(mapStateToProps)
export default class JoinSection extends React.Component {

  static propTypes = {
    constants: PropTypes.func
  }
  render () {
    const { constants } = this.props
    return (
      <div className='root join-section'>
        <style jsx>{styles}</style>
        <div className='wrap'>
          <div className='content'>
            <img className='bg-left' src='/static/images/svg/slack-big.svg' />
            <img className='bg-right' src='/static/images/svg/telegram-big.svg' />
            <a className='btn-white' href='https://chronobank.herokuapp.com/' target='_blank' rel='noopener noreferrer'>
              <img src='/static/images/svg/slack-blue.svg' />
              <span>{ constants('join-our-slack') }</span>
            </a>
            <p>{ constants('get-in-touch-with-our-team') }!</p>
            <a className='btn-blue' href='https://telegram.me/chronobank' target='_blank' rel='noopener noreferrer'>
              <img src='/static/images/svg/telegram-white.svg' />
              <span>{ constants('join-our-telegram') }</span>
            </a>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    constants: constantSelector(state)
  }
}
import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import cn from 'classnames'
import { debounce } from 'lodash'
import { ExchangeModel } from 'src/models'
import { CoinMarketCap } from 'dropins/market/src/components'

import styles from './ExchangesPanel.sass'

@connect(mapStateToProps)
export default class ExchangesPanel extends React.Component {

  static propTypes = {
    exchanges: PropTypes.arrayOf(ExchangeModel),
  }

  componentDidMount () {
    this.handleResizeDebounced = debounce(this.handleResize, 500)
    window.addEventListener('resize', this.handleResizeDebounced)
    this.handleResizeDebounced()
  }

  componentDidUpdate () {
    this.handleResizeDebounced()
  }

  componentWillUnmount () {
    window.addEventListener('resize', this.handleResizeDebounced)
    this.handleResizeDebounced = null
  }

  handleResize () {
    if (this.contentElement && this.rootElement) { // Nee to check because of the debounced usage
      const animate = this.contentElement.offsetWidth > this.rootElement.offsetWidth
      this.contentElement.classList.toggle('content-animate', animate)
    }
  }

  render () {
    const { exchanges } = this.props
    return (
      <div className='root exchanges-panel' ref={(el) => this.rootElement = el}>
        <style jsx>{styles}</style>
        <div
          ref={(el) => this.contentElement = el}
          className={cn('content', {
            'content-animate': this.animate,
          })}
        >
          <div className='item'>
            <CoinMarketCap />
          </div>
          {exchanges.map((exchange) => (
            <a className='item' key={exchange.id} target='_blank' rel='noopener noreferrer' href={exchange.url}>
              <div className='exchange'>
                <div className='logo'>
                  <img
                    alt={exchange.title}
                    {...{
                      src: exchange.icon ? `${exchange.icon.url}` : undefined,
                      srcSet: exchange.icon2x ? `${exchange.icon2x.url} 2x` : undefined,
                    }}
                  />
                </div>
                <div className='title'>
                  {exchange.title}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    exchanges: state.pages.exchanges.array,
  }
}

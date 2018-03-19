import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import cn from 'classnames'
import { debounce } from 'lodash'

import styles from './RatesPanel.sass'

@connect(mapStateToProps)
export default class RatesPanel extends React.Component {

  static propTypes = {
    market: PropTypes.object,
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
    const { market } = this.props
    return (
      <div className='root rates-panel' ref={(el) => this.rootElement = el}>
        <style jsx>{styles}</style>
        <div
          ref={(el) => this.contentElement = el}
          className={cn('content', {
            'content-animate': this.animate,
          })}
        >
          {Object.entries(market.prices || {}).filter(([, m]) => m !== null).map(([name, m]) => (
            <div className='item' key={name}>
              <div className='exchange'>
                <div className='logo'>
                  <img src={`/static/dropins/market/images/exchanges/${(m.market || '').toLowerCase()}.png`} />
                </div>
                <div className='data'>
                  <div className='title'>
                    {m.market}
                  </div>
                  <div className='price'>
                    <span className='value'>{m.price}</span>
                    <span className='symbol'>USD</span>
                  </div>
                  <div className={cn('direction', {
                    'direction-up': m.price >= m.open24,
                    'direction-down': m.price < m.open24,
                  })}
                  >
                    <span className='value'>{(m.price / m.open24).toFixed(4)}%</span>
                    {(m.price >= m.open24)
                      ? <img src='/static/dropins/market/images/arrow-up.svg' />
                      : <img src='/static/dropins/market/images/arrow-down.svg' />
                    }
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    market: state.marketDropin.pairs['TIME/USD'],
  }
}

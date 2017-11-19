import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import styles from './RatesPanel.sass'

@connect(mapStateToProps)
export default class RatesPanel extends React.Component {

  static propTypes = {
    market: PropTypes.object
  }

  render () {
    const { market } = this.props
    return (
      <div className='root rates-panel'>
        <style jsx>{styles}</style>
        <div className='content'>
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
                  <div className='direction'>
                    <span className='value'>8.827721</span>
                    <img src='/static/dropins/market/images/arrow-up.svg' />
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
    market: state.marketDropin['ETH/USD']
  }
}

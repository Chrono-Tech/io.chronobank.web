import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import cn from 'classnames'

import styles from './CoinMarketCap.sass'

@connect(mapStateToProps)
export default class CoinMarketCap extends React.Component {

  static propTypes = {
    stats: PropTypes.object,
  }

  renderPercentChange(){
    const { stats } = this.props
    let numberDigit = stats.percent_change_24h > 0 ? '+' : ''

    let num = new Number(stats.percent_change_24h || 0)

    if (num < 1 && num > -1) {
      num = num.toFixed(1)
    } else {
      num = num.toFixed(0)
    }

    return `${numberDigit}${num}%`
  }

  render () {
    const { stats } = this.props
    return stats ? (
      <div className='root coinmarketcap'>
        <style jsx>{styles}</style>
        <div className='content'>
          <div className='head'>
            <div className='info'>
              <div className='price'>
                <span>${new Number(stats.price_usd).toFixed(2)}</span>
                <div className='percent-change'>{this.renderPercentChange()}</div>
              </div>
            </div>
          </div>
          <div className='body'>
            <div className='stats'>
              <div className='stats-item'>
                <label>Rank</label>
                <div>{stats.rank}</div>
              </div>
              <div className='stats-item'>
                <label>CAP</label>
                <div>${new Number((stats.market_cap_usd / 1000000)  || 0).toFixed(2)}M</div>
              </div>
              <div className='stats-item'>
                <label>V24H</label>
                <div>${new Number((stats['24h_volume_usd'] / 1000000) || 0).toFixed(2)}M</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ) : null
  }
}

function mapStateToProps (state) {
  return {
    stats: state.marketDropin.stats,

  }
}

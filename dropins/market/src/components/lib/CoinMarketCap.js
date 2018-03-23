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

  render () {
    const { stats } = this.props
    return stats === null ? null : (
      <div className='root coinmarketcap'>
        <style jsx>{styles}</style>
        <div className='title'>Exchange name</div>
        <div className='content'>
          <div className='head'>
            <div className='logo'>
              <img src='/static/images/svg/chrono-bank-icon.svg' />
            </div>
            <div className='info'>
              <div className='title'>
                <a
                  href='https://coinmarketcap.com/currencies/chronobank/'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  ChronoBank (TIME)
                </a>
              </div>
              <div className='price'>
                <span>${new Number(stats.data.price_usd).toFixed(2)}</span>&nbsp;
                <span
                  className={cn('change', {
                    'change-green': stats.data.percent_change_24h > 0,
                    'change-red': stats.data.percent_change_24h < 0,
                  })}
                >
                  ({new Number(stats.data.percent_change_24h || 0).toFixed(2)}%)
                </span>
              </div>
            </div>
          </div>
          <div className='body'>
            <div className='stats'>
              <div className='stats-item'>
                <label>RANK</label>
                <div>{stats.data.rank}</div>
              </div>
              <div className='stats-item'>
                <label>CAP</label>
                <div>${new Number((stats.data.market_cap_usd / 1000000)  || 0).toFixed(2)}&nbsp;M</div>
              </div>
              <div className='stats-item'>
                <label>V24H</label>
                <div>${new Number((stats.data.volume_24h_usd / 1000000) || 0).toFixed(2)}&nbsp;M</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    stats: state.marketDropin.stats,

  }
}

import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { ExchangeModel } from 'src/models'
import { CoinMarketCap } from 'dropins/market/src/components'

import styles from './ExchangesPanel.sass'

@connect(mapStateToProps)
export default class ExchangesPanel extends React.Component {

  static propTypes = {
    exchanges: PropTypes.arrayOf(ExchangeModel),
  }

  render () {
    const { exchanges } = this.props
    return (
      <div className='root exchanges-panel' ref={(el) => this.rootElement = el}>
        <style jsx>{styles}</style>
        <div className='content'>
          <CoinMarketCap />
          <div className='exchanges-list'>
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
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    exchanges: state.pages.exchanges.array,
  }
}

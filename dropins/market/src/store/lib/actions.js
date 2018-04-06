import { MarketSocket } from 'dropins/market/src/network'
import axios from 'axios'

export const MARKET_RATES_UPDATE = 'market/RATES_UPDATE'
export const MARKET_STATS = 'market/COINMARKETCAP_STATS'

export const initCoinMarketCap = () => async (dispatch) => {
  const { data } = await axios.get('https://api.coinmarketcap.com/v1/ticker/chronobank/?convert=USD')
  if (Array.isArray(data)) {
    dispatch({ type: MARKET_STATS, data: data.pop() })
  }
}

export const watchInitMarket = () => (dispatch) => {
  module.market = new MarketSocket()
    .init()
    .on('update', (data) => dispatch({ type: MARKET_RATES_UPDATE, data }))
    .start()
}

// eslint-disable-next-line
export const unwatchInitMarket = () => (dispatch) => {
  if (module.market) {
    module.market.stop()
    module.market = null
  }
}

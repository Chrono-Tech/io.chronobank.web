import { MarketSocket } from 'dropins/market/src/network'
import axios from 'axios'

export const MARKET_RATES_UPDATE = 'market/RATES_UPDATE'
export const MARKET_STATS = 'market/COINMARKETCAP_STATS'

export const initCoinMarketCap = () => async (dispatch) => {
  const { data } = await axios.get('https://widgets.coinmarketcap.com/v2/ticker/1556/?ref=widget&convert=USD')
  dispatch({ type: MARKET_STATS, data })
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

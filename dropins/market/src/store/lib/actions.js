import { MarketSocket } from 'dropins/market/src/network'

export const MARKET_RATES_UPDATE = 'market/RATES_UPDATE'

export const watchInitMarket = () => (dispatch) => {
  module.market = new MarketSocket()
    .init()
    .on('update', data => dispatch({ type: MARKET_RATES_UPDATE, data }))
    .start()
}

export const unwatchInitMarket = () => () => {
  if (module.market) {
    module.market.stop()
    module.market = null
  }
}

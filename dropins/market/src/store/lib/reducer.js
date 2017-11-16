import {
  MARKET_RATES_UPDATE
} from './actions'

const initialState = Object.freeze({
  'BTC/USD': null,
  'ETH/USD': null,
  'TIME/USD': null,
})

export default (state = initialState, { type, data }) => {
  switch (type) {
    case MARKET_RATES_UPDATE: {
      const name = [data.FROMSYMBOL, data.TOSYMBOL].join('/')
      // console.log(name, data)
      if (name in state) {
        if ('PRICE' in data) {
          return {
            ...state,
            [name]: Object.freeze({
              price: data.PRICE,
              market: data.MARKET,
              date: new Date()
            })
          }
        }
      }
      return state
    }
    default:
      return state
  }
}

import {
  MARKET_RATES_UPDATE
} from './actions'

const initialState = Object.freeze({
  'BTC/USD': Object.freeze({
    last: null,
    exchanges: Object.freeze({})
  }),
  'ETH/USD': Object.freeze({
    last: null,
    exchanges: Object.freeze({})
  }),
  'TIME/USD': Object.freeze({
    last: null,
    exchanges: Object.freeze({})
  })
})

export default (state = initialState, { type, data }) => {
  switch (type) {
    case MARKET_RATES_UPDATE: {
      const pair = [data.FROMSYMBOL, data.TOSYMBOL].join('/')
      if (pair in state) {
        const p = state[pair]
        const last = Object.freeze({
          date: new Date(),
          price: data.PRICE || (p.last ? p.last.price : null),
          open24: data.OPEN24HOUR || (p.last ? p.last.open24 : null),
          market: data.LASTMARKET || (p.last ? p.last.market : null)
        })
        return Object.freeze({
          ...state,
          [pair]: Object.freeze({
            last,
            prices: Object.freeze({
              ...p.prices,
              [last.market]: last
            })
          })
        })
      }
      return state
    }
    default:
      return state
  }
}

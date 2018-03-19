import {
  MARKET_RATES_UPDATE,
} from './actions'

const initialState = Object.freeze({
  pairs: Object.freeze({
    // 'BTC/USD': Object.freeze({
    //   last: null,
    //   exchanges: Object.freeze({}),
    // }),
    // 'ETH/USD': Object.freeze({
    //   last: null,
    //   exchanges: Object.freeze({}),
    // }),
    'TIME/USD': Object.freeze({
      last: null,
      exchanges: Object.freeze({}),
    }),
    'TIME/ETH': Object.freeze({
      last: null,
      exchanges: Object.freeze({}),
    }),
    'TIME/BTC': Object.freeze({
      last: null,
      exchanges: Object.freeze({}),
    }),
    'TIME/CHF': Object.freeze({
      last: null,
      exchanges: Object.freeze({}),
    }),
    'TIME/EUR': Object.freeze({
      last: null,
      exchanges: Object.freeze({}),
    }),
    'TIME/GBP': Object.freeze({
      last: null,
      exchanges: Object.freeze({}),
    }),
    'TIME/JPY': Object.freeze({
      last: null,
      exchanges: Object.freeze({}),
    }),
  }),
})

export default (state = initialState, { type, data }) => {
  switch (type) {
    case MARKET_RATES_UPDATE: {
      const pair = [data.FROMSYMBOL, data.TOSYMBOL].join('/')
      if (pair in state.pairs) {
        const p = state.pairs[pair]
        const last = Object.freeze({
          date: new Date(),
          price: data.PRICE || (p.last ? p.last.price : null),
          open24: data.OPEN24HOUR || (p.last ? p.last.open24 : null),
          market: data.LASTMARKET || (p.last ? p.last.market : null),
        })
        return {
          ...state,
          pairs: Object.freeze({
            ...state.pairs,
            [pair]: Object.freeze({
              last,
              prices: Object.freeze({
                ...p.prices,
                [last.market]: last,
              }),
            }),
          }),
        }
      }
      return state
    }
    default:
      return state
  }
}

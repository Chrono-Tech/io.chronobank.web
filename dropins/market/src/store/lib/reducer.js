import {
  MARKET_RATES_UPDATE
} from './actions'

const initialState = {
  rates: Object.freeze([]),
}

export default (state = initialState, action) => {
  switch (action.type) {
    case MARKET_RATES_UPDATE:
      // return { ...state, menus: Object.freeze([...action.menus]) }
      // eslint-disable-next-line
      console.log(action)
      return {
        ...state
      }
    default:
      return state
  }
}

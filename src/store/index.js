import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import { omitBy, isNil } from 'lodash'

import * as marketDropin from 'dropins/market/src/store'
import * as eventsDropin from 'dropins/events/src/store'

import modals from './lib/modals/reducer'
import snackbars from './lib/snackbars/reducer'
import pages, { fromJS as pagesFromJS } from './lib/pages/reducer'

export * from './lib/modals/actions'
export * from './lib/snackbars/actions'
export * from './lib/pages/actions'

export * from './lib/pages/selectors'

export default (initialState = {}) => {
  const reducer = combineReducers({
    modals,
    snackbars,
    pages,
    eventsDropin: eventsDropin.reducer,
    marketDropin: marketDropin.reducer,
  })
  const p = initialState.pages
  const extra = omitBy({
    pages: !p ? null : omitBy({
      ...p,
      ...pagesFromJS(p),
    }, isNil),
    eventsDropin: initialState.eventsDropin && eventsDropin.fromJS(initialState.eventsDropin),
    marketDropin: initialState.marketDropin && marketDropin.fromJS(initialState.marketDropin),

  }, isNil)
  return createStore(reducer, extra, composeWithDevTools(applyMiddleware(thunkMiddleware)))
}

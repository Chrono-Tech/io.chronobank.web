import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'

import modals from './lib/modals/reducer'
import snackbars from './lib/snackbars/reducer'

export * from './lib/modals/actions'
export * from './lib/snackbars/actions'

export default () => {
  const reducer = combineReducers({
    modals,
    snackbars
  })
  return createStore(reducer, composeWithDevTools(applyMiddleware(thunkMiddleware)))
}

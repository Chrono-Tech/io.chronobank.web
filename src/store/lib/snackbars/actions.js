export const SNACKBARS_PUSH = 'snackbars/PUSH'
export const SNACKBARS_REPLACE = 'snackbars/REPLACE'
export const SNACKBARS_POP = 'snackbars/POP'
export const SNACKBARS_CLEAR = 'snackbars/CLEAR'

export const snackbarsPush = ({ component, props }) => (dispatch) => {
  return dispatch({ type: SNACKBARS_PUSH, component, props })
}

export const snackbarsReplace = ({ component, props }) => (dispatch) => {
  return dispatch({ type: SNACKBARS_REPLACE, component, props })
}

export const snackbarsPop = () => (dispatch) => {
  return dispatch({ type: SNACKBARS_POP })
}

export const snackbarsClear = () => (dispatch) => {
  return dispatch({ type: SNACKBARS_CLEAR })
}

export const snackbarsClose = snackbarsPop
export const snackbarsOpen = snackbarsPush
export const snackbarsShow = snackbarsPush

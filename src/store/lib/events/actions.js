export const EVENTS_ENQUEUE = 'events/ENQUEUE'
export const EVENTS_DEQUEUE = 'events/DEQUEUE'
export const EVENTS_CLEAR = 'events/CLEAR'

export const eventsEnqueue = ({component, props}) => (dispatch) => {
  return dispatch({type: EVENTS_ENQUEUE, component, props})
}

export const eventsDequeue = ({component, props}) => (dispatch) => {
  return dispatch({type: EVENTS_DEQUEUE, component, props})
}

export const eventsClear = () => (dispatch) => {
  return dispatch({type: EVENTS_CLEAR})
}

export const eventsOpen = eventsEnqueue
export const eventsShow = eventsEnqueue

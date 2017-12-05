import type { EventModel } from 'dropins/events/src/models'

export const EVENTS_ENQUEUE = 'events/ENQUEUE'
export const EVENTS_DEQUEUE = 'events/DEQUEUE'
export const EVENTS_CLEAR = 'events/CLEAR'

export const eventsEnqueue = (event: EventModel, size: Number = 1) => (dispatch) => {
  return dispatch({type: EVENTS_ENQUEUE, event, size})
}

export const eventsDequeue = () => (dispatch) => {
  return dispatch({type: EVENTS_DEQUEUE})
}

export const eventsClear = () => (dispatch) => {
  return dispatch({type: EVENTS_CLEAR})
}

export const eventsOpen = eventsEnqueue
export const eventsShow = eventsEnqueue

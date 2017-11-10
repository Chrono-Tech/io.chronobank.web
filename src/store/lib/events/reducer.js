import * as actions from './actions'

const initialState = {
  queue: [],
  counter: 0
}

export default (state = initialState, { type, event }) => {
  switch (type) {
    case actions.EVENTS_ENQUEUE:
      return {
        ...state,
        counter: state.counter + 1,
        queue: [...state.queue, {
          key: state.counter,
          event
        }]
      }
    case actions.EVENTS_DEQUEUE:
      return {
        ...state,
        queue: state.queue.slice(1)
      }
    case actions.EVENTS_CLEAR:
      return {
        ...state,
        queue: []
      }
    default:
      return state
  }
}

import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { connect } from 'react-redux'
import cn from 'classnames'

import { EventModel } from 'dropins/events/src/models'
import styles from './EventsRotator.sass'

export class EventsRotator extends React.Component {

  static propTypes = {
    peek: PropTypes.shape({
      key: PropTypes.number,
      event: PropTypes.instanceOf(EventModel)
    })
  }

  constructor (props) {
    super(props)
    this.state = {
      curr: props.peek,
      prev: null
    }
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      curr: nextProps.peek,
      prev: this.state.curr
    })
  }

  componentDidMount () {
    setImmediate(() => {
      if (this.prevElement) {
        this.prevElement.classList.add('item-slided')
      }
      if (this.currElement) {
        this.currElement.classList.add('item-slided')
      }
    })
  }

  componentDidUpdate () {
    setTimeout(() => {
      if (this.prevElement) {
        this.prevElement.classList.add('item-slided')
      }
      if (this.currElement) {
        this.currElement.classList.add('item-slided')
      }
    }, 1000)
  }

  render () {
    const { prev, curr } = this.state
    const items = [
      { model: prev, type: 'prev' },
      { model: curr, type: 'curr' }
    ]
    return (
      <div className='root events-rotator'>
        <style jsx>{styles}</style>
        <div className='content'>
          {items.filter(({ model }) => model !== null).map(({ model, type }) => (
            <a key={model.key} href={model.event.url} ref={el => this[type + 'Element'] = el} className={cn('item', {
              'item-prev': type === 'prev',
              'item-curr': type === 'curr'
            })}>
              <span className='label'>{model.event.status}</span>
              <span className='info'>
                <b>{moment(model.event.date).format('MMM DD')}&nbsp;|&nbsp;</b>
                <span className='title'>{model.event.title}</span>
              </span>
            </a>
          ))}
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  const queue = state.eventsDropin.queue
  return {
    peek: queue.length
      ? queue[0]
      : null
  }
}

export default connect(mapStateToProps)(EventsRotator)

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import cn from 'classnames'

import { EventModel } from 'src/models'
import styles from './EventsRotator.sass'

export class EventsRotator extends React.Component {

  static propTypes = {
    peek: PropTypes.instanceOf(EventModel)
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

  render () {
    const { prev, curr } = this.state
    const items = [
      { model: prev, type: 'prev' },
      { model: curr, type: 'curr' }
    ]
    this.setImmediate(() => {
      this.contentElement.classList.add('content-slided')
    })
    return (
      <div className='root events-rotator'>
        <style jsx>{styles}</style>
        <div className='content' ref={el => this.contentElement = el}>
          {items.map(({ model, type }) => (
            <a key={type} href={model.url} className={cn('item', {
              'item-prev': type === 'prev',
              'item-curr': type === 'curr'
            })}>
              <span className='label'>{model.status}</span>
              <span className='info'>
                <b>Jun 4 |&nbsp;</b>
                <span className='title'>{model.title}</span>
              </span>
            </a>
          ))}
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  const queue = state.events.queue
  return {
    peek: queue.length
      ? queue[0].event
      : null
  }
}

export default connect(mapStateToProps)(EventsRotator)

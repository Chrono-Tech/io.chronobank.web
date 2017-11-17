import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import styles from './RatesPanel.sass'

@connect(mapStateToProps)
export default class RatesPanel extends React.Component {

  static propTypes = {
    market: PropTypes.object
  }

  // componentDidMount () {
  //   setImmediate(() => {
  //     if (this.prevElement) {
  //       this.prevElement.classList.add('item-slided')
  //     }
  //     if (this.currElement) {
  //       this.currElement.classList.add('item-slided')
  //     }
  //   })
  // }

  render () {
    const { market } = this.props
    return (
      <div className='root rates-panel'>
        <style jsx>{styles}</style>
        <div className='content'>
          {Object.entries(market).filter(([, m]) => m !== null).map(([name, m]) => (
            <div key={name}>{name} ~ {m.market} ~ {m.price}</div>
          ))}
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    market: state.marketDropin
  }
}

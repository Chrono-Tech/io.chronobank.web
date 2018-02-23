import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { StatisticModel } from 'src/models'
import styles from './StatisticsSection.sass'

@connect(mapStateToProps)
export default class StatisticsSection extends React.Component {

  static propTypes = {
    statistics: PropTypes.arrayOf(StatisticModel),
  }

  render () {
    const { statistics } = this.props
    return (
      <div className='root statistics-section'>
        <style jsx>{styles}</style>
        <div className='wrap'>
          <div className='content'>
            <ul>
              {statistics.slice(0).reverse().map((feature) => (
                <li key={feature.id}>
                  <div className='image'>
                    <img src={feature.image.url} />
                  </div>
                  <div className='text' dangerouslySetInnerHTML={{ __html: feature.brief }} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    statistics: state.pages.statistics.array,
  }
}

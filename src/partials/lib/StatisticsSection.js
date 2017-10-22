import React from 'react'
import PropTypes from 'prop-types'

import styles from './StatisticsSection.sass'

export default class StatisticsSection extends React.Component {

  static propTypes = {
    statistics: PropTypes.object,
  }

  render () {
    const { statistics } = this.props
    return (
      <div className='root statistics-section'>
        <style jsx>{styles}</style>
        <div className='wrap'>
          <div className='content'>
            <ul>
              {statistics.statistics.slice(0).reverse().map((feature) => (
                <li key={feature._id}>
                  <div className='image'>
                    <img src={feature.image.secure_url} />
                  </div>
                  <div className='text' dangerouslySetInnerHTML={{ __html: feature.brief}}></div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

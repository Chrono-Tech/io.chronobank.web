import React from 'react'
import PropTypes from 'prop-types'

import styles from './FeaturesSection.sass'

export default class FeaturesSection extends React.Component {

  static propTypes = {
    features: PropTypes.object,
  }

  render () {
    const { features } = this.props
    return (
      <div className='root features-section'>
        <style jsx>{styles}</style>
        <div className='wrap'>
          <div className='content'>
            <h3>Labour–Hour Features</h3>
            <ul>
              {features.features.map((feature) => (
                <li key={feature._id}>
                  <img src={feature.image.secure_url} />
                  <h4>{feature.title}</h4>
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

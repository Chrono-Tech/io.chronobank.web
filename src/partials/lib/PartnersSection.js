import React from 'react'
import PropTypes from 'prop-types'

import styles from './PartnersSection.sass'

export default class PartnersSection extends React.Component {

  static propTypes = {
    partners: PropTypes.object,
  }

  render () {
    const { partners } = this.props
    return (
      <div className='root partners-section'>
        <style jsx>{styles}</style>
        <div className='wrap'>
          <div className='content'>
            {partners.partners.map(partner => (
              <div className='item' key={partner._id}>
                {!partner.icon ? null : (
                  <div className='icon'>
                    <img alt={partner.title} {...{
                      src: partner.icon ? `${partner.icon.secure_url}` : undefined,
                      srcSet: partner.icon2x ? `${partner.icon2x.secure_url} 2x` : undefined
                    }}/>
                  </div>
                )}
                <div className='text' dangerouslySetInnerHTML={{ __html: partner.brief}}></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
}

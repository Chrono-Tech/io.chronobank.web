import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { PartnerModel } from 'src/models'
import styles from './PartnersSection.sass'

@connect(mapStateToProps)
export default class PartnersSection extends React.Component {

  static propTypes = {
    partners: PropTypes.arrayOf(PartnerModel),
  }

  render () {
    const { partners } = this.props
    return (
      <div className='root partners-section'>
        <style jsx>{styles}</style>
        <div className='wrap'>
          <div className='content'>
            {partners.map(partner => (
              <div className='item' key={partner.id}>
                {!partner.icon ? null : (
                  <div className='icon'>
                    <img alt={partner.title} {...{
                      src: partner.icon ? `${partner.icon.url}` : undefined,
                      srcSet: partner.icon2x ? `${partner.icon2x.url} 2x` : undefined
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

function mapStateToProps (state) {
  return {
    partners: state.pages.partners,
  }
}

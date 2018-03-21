import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import cn from 'classnames'

import { constantSelector } from 'src/store'

import styles from './ProductDescriptionsSection.sass'

@connect(mapStateToProps)
export default class ProductDescriptionsSection extends React.Component {

  static propTypes = {
    descriptions: PropTypes.array,
    productSlug: PropTypes.string,
  }

  render () {
    const { descriptions, productSlug } = this.props
    return (
      <div className={cn('root', 'product-descriptions-section', {
        [`product-page-${productSlug}`]: productSlug,
      })}
      >
        <style jsx>{styles}</style>
        <div className='wrap'>
          <div className='content'>
            <ul>
              {descriptions.map((description) => (
                <li key={description.id} id={description.slug}>
                  {description.title ?
                    (<p className='title'>{description.title}</p>)
                    : null
                  }
                  {description.subtitle ?
                    (<div className='subtitle' dangerouslySetInnerHTML={{ __html: description.subtitle }} />)
                    : null
                  }
                  {description.details ?
                    (<div className='details' dangerouslySetInnerHTML={{ __html: description.details }} />)
                    : null
                  }
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
    constants: constantSelector(state),
  }
}

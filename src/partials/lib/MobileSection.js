import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import cn from 'classnames'

import { ProductModel } from 'src/models'
import { productSelector } from 'src/store'

import styles from './MobileSection.sass'

@connect(mapStateToProps)
export default class MobileSection extends React.Component {

  static propTypes = {
    productSlug: PropTypes.string,
    product: PropTypes.instanceOf(ProductModel)
  }

  render () {
    const { product } = this.props
    return (
      <div className={cn('root', 'mobile-section', {
        'background-dark': product.background === 'dark',
        'background-light': product.background === 'light',
        'stereotype-default': product.stereotype === 'dark',
        'stereotype-mirrored': product.stereotype === 'mirrored'
      })}>
        <style jsx>{styles}</style>
        <div className='wrap'>
          <div className='content'>
            <div className='left'>
              <h3>{product.title}</h3>
              {!product.image ? null : (
                <img {...{
                  src: product.image ? `${product.image.url}` : undefined,
                  srcSet: product.image2x ? `${product.image2x.url} 2x` : undefined
                }}/>
              )}
            </div>
            <div className='right'>
              <div className='text' dangerouslySetInnerHTML={{ __html: product.brief}}></div>
            </div>
          </div>
          {product.downloads && product.downloads.length
            ? (
              <nav className='downloads'>
                <h4>Downloads</h4>
                <ul>
                  {product.downloads.map(download => (
                    <li key={download.id}>
                      <a href={download.url} target='_blank'>
                        <img src={download.icon.url} />
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            )
            : null
          }
        </div>
      </div>
    )
  }
}
function mapStateToProps (state, op) {
  return {
    product: productSelector(op.productSlug)(state)
  }
}

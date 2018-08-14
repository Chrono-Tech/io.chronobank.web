import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import cn from 'classnames'

import { ProductModel } from 'src/models'
import { productSelector, constantSelector } from 'src/store'

import styles from './ProductSection.sass'

@connect(mapStateToProps)
export default class ProductSection extends React.Component {

  static propTypes = {
    productSlug: PropTypes.string,
    product: PropTypes.instanceOf(ProductModel),
    constants: PropTypes.func,
  }

  render () {
    const { product, constants } = this.props

    if (!product) {
      return null
    }

    return (
      <div className={cn('root', 'product-section', {
        'background-dark': product.background === 'dark',
        'background-light': product.background === 'light',
        'stereotype-default': product.stereotype === 'default',
        'stereotype-mirrored': product.stereotype === 'mirrored',
      })}
      >
        <style jsx>{styles}</style>
        <div className='wrap'>
          <div className='heading'>
            <h2>
              {!product.icon ? null : (
                <img {...{
                  src: product.icon ? `${product.icon.url}` : undefined,
                  srcSet: product.icon2x ? `${product.icon2x.url} 2x` : undefined,
                }}
                />
              )}
              {product.title}
            </h2>
          </div>
          <div className='content'>
            <div className='left'>
              <div className='text' dangerouslySetInnerHTML={{ __html: product.brief }} />
            </div>
            <div className='right'>
              {!product.image ? null : (
                <img {...{
                  src: product.image ? `${product.image.url}` : undefined,
                  srcSet: product.image2x ? `${product.image2x.url} 2x` : undefined,
                }}
                />
              )}
            </div>
          </div>
          {product.downloads && product.downloads.length
            ? (
              <nav className='downloads'>
                <h4>{constants('downloads')}</h4>
                <ul>
                  {product.downloads.map((download) => (
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
    product: productSelector(op.productSlug)(state),
    constants: constantSelector(state),
  }
}

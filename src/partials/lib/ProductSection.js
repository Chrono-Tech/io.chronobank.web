import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import styles from './ProductSection.sass'

export default class ProductSection extends React.Component {

  static propTypes = {
    product: PropTypes.object
  }

  render () {
    const { product } = this.props
    return (
      <div className={cn('root', 'product-section', {
        'background-dark': product.background === 'dark',
        'background-light': product.background === 'light',
        'stereotype-default': product.stereotype === 'default',
        'stereotype-mirrored': product.stereotype === 'mirrored'
      })}>
        <style jsx>{styles}</style>
        <div className='wrap'>
          <div className='heading'>
            <h2>
              {!product.icon ? null : (
                <img {...{
                  src: product.icon ? `${product.icon.secure_url}` : undefined,
                  srcSet: product.icon2x ? `${product.icon2x.secure_url} 2x` : undefined
                }}/>
              )}
              {product.title}
            </h2>
          </div>
          <div className='content'>
            <div className='left'>
              <div className='text' dangerouslySetInnerHTML={{ __html: product.brief}}></div>
            </div>
            <div className='right'>
              {!product.image ? null : (
                <img {...{
                  src: product.image ? `${product.image.secure_url}` : undefined,
                  srcSet: product.image2x ? `${product.image2x.secure_url} 2x` : undefined
                }}/>
              )}
            </div>
          </div>
          {product.downloads && product.downloads.length
            ? (
              <nav className='downloads'>
                <h4>Downloads</h4>
                <ul>
                  {product.downloads.map(download => (
                    <li key={download._id}>
                      <a href={download.url} target='_blank'>
                        <img src={download.icon.secure_url} />
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

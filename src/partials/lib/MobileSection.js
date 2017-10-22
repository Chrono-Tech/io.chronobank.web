import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import styles from './MobileSection.sass'

export default class MintDark extends React.Component {

  static propTypes = {
    product: PropTypes.object
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
                  src: product.image ? `${product.image.secure_url}` : undefined,
                  srcSet: product.image2x ? `${product.image2x.secure_url} 2x` : undefined
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
                    <li key={download._id}>
                      <a href={download.url}>
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

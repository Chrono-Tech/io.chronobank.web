import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import cn from 'classnames'

import { Link } from 'src/router'
import * as dialogs from 'src/dialogs'
import * as snackbars from 'src/snackbars'
import { EventsRotator } from 'src/components'
import { modalsOpen, snackbarsOpen } from 'src/store'

import styles from './TheHeader.sass'

@connect(null, mapDispatchToProps)
export default class TheHeader extends React.Component {

  static propTypes = {
    header: PropTypes.object,
    products: PropTypes.array,
    showVideo: PropTypes.func,
    showMobileMenu: PropTypes.func
  }

  render () {
    const { products, header } = this.props
    return (
      <header className={cn('root', 'the-header', {
        'background-dark': header.background === 'dark',
        'background-light': header.background === 'light',
        'stereotype-default': header.stereotype === 'default',
        'stereotype-splash': header.stereotype === 'splash',
        'stereotype-product': header.stereotype === 'product',
        'stereotype-text': header.stereotype === 'text'
      })}>
        <style jsx>{styles}</style>
        <div className='wrap'>
          <div className='top'>
            <div className='logo'>
              <Link route='/'>
                <a>
                  <img className='logo-mobile' src='/static/images/logo/logo-mobile-header.svg' />
                  <img className='logo-desktop' src='/static/images/logo/logo-desktop-header.svg' />
                </a>
              </Link>
            </div>
            <div className='menu-desktop'>
              <ul>
                {!(products && products.length) ? null : (
                  <li>
                    <div className='dropdown'>
                      <a className='link'>Products</a>
                      <ul className='dropdown-panel'>
                        {products.map(product => (
                          <li key={product._id}>
                            <Link route={`/products/${product.slug}`}>
                              <div className='product'>
                                <div className='product-icon'>
                                  {!product.icon ? null : (
                                    <img {...{
                                      src: product.icon ? `${product.icon.secure_url}` : undefined,
                                      srcSet: product.icon2x ? `${product.icon2x.secure_url} 2x` : undefined
                                    }}/>
                                  )}
                                </div>
                                <div className='product-info'>
                                  <div className='info-title'>{product.title}</div>
                                  {!product.mission ? null : (
                                    <div className='info-details' dangerouslySetInnerHTML={{ __html: product.mission}}></div>
                                  )}
                                </div>
                              </div>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                )}
                <li><Link href='/team'><a className='link'>Team</a></Link></li>
                <li><Link href='/faq'><a className='link'>FAQ</a></Link></li>
                <li><a className='link' href='https://blog.chronobank.io/' target='_blank' rel='noopener noreferrer'>Blog</a></li>
                <li><a className='link' href='https://mint.chronobank.io'><img src='/static/images/symbols/login.svg' />Login</a></li>
              </ul>
            </div>
            <div className='menu-mobile'>
              <a className='dropdown-toggle dropdown-toggle-light' onClick={() => this.props.showMobileMenu({ products })}><img src='/static/images/symbols/menu.svg' /></a>
              <a className='dropdown-toggle dropdown-toggle-dark' onClick={() => this.props.showMobileMenu({ products })}><img src='/static/images/symbols/menu-dark.svg' /></a>
            </div>
          </div>
          <div className='news'>
            <EventsRotator />
          </div>
          <div className='content'>
            <div className='text' dangerouslySetInnerHTML={{ __html: header.brief}}></div>
            {!header.video ? null : (
              <div className='video'>
                <a onClick={() => this.props.showVideo(header.video)}>
                  <img src='/static/images/symbols/video.svg' />
                  <span>Watch the Introduction</span>
                </a>
              </div>
            )}
          </div>
        </div>
        <div className='image'>
          {!header.image ? null : (
            <img className='image-1280' { ...{
              src: header.image.secure_url,
              srcSet: header.image2x ? `${header.image2x.secure_url} 2x` : undefined
            }} />
          )}
          {!header.image320 ? null : (
            <img className='image-320' { ...{
              src: header.image320.secure_url,
              srcSet: header.image2x320 ? `${header.image2x320.secure_url} 2x` : undefined
            }} />
          )}
          {!header.image480 ? null : (
            <img className='image-480' { ...{
              src: header.image480.secure_url,
              srcSet: header.image2x480 ? `${header.image2x480.secure_url} 2x` : undefined
            }} />
          )}
          {!header.image640 ? null : (
            <img className='image-640' { ...{
              src: header.image640.secure_url,
              srcSet: header.image2x640 ? `${header.image2x640.secure_url} 2x` : undefined
            }} />
          )}
        </div>
      </header>
    )
  }
}

function mapDispatchToProps (dispatch) {
  return {
    showVideo: (url) => {
      dispatch(modalsOpen({
        component: dialogs.VideoDialog,
        props: {
          url
        }
      }))
    },
    showMobileMenu: ({ products }) => [
      dispatch(snackbarsOpen({
        component: snackbars.MobileMenu,
        props: {
          products
        }
      }))
    ]
  }
}

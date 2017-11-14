import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { Link } from 'src/router'
import { SnackbarPanel } from 'src/components'
import { snackbarsClose } from 'src/store'

import styles from './MobileMenu.sass'

export class MobileMenu extends React.Component {

  static propTypes = {
    url: PropTypes.string,
    products: PropTypes.array,
    onClose: PropTypes.func
  }

  render () {
    const { products } = this.props
    return (
      <SnackbarPanel onClose={() => this.props.onClose()} side='top'>
        <style jsx>{styles}</style>
        <div className='root mobile-menu'>
          <div className='wrap'>
            <div className='top'>
              <Link route='/'>
                <a className='logo'>
                  <img className='logo-mobile' src='/static/images/logo/logo-mobile-header.svg' />
                </a>
              </Link>
            </div>
            <div className='content'>
              <ul>
                {!(products && products.length) ? null : (
                  <li className='border-bottom'>
                    <label>Products</label>
                    <ul className='compact'>
                      {products.map(product => (
                        <li key={product._id}>
                          <Link route={`/products/${product.slug}`}>
                            <a>
                              {!product.icon ? null : (
                                <img className='icon-large' {...{
                                  src: product.icon ? `${product.icon.secure_url}` : undefined,
                                  srcSet: product.icon2x ? `${product.icon2x.secure_url} 2x` : undefined
                                }}/>
                              )}
                              <b>{product.title}</b>
                            </a>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                )}
                <li>
                  <Link route='/team'>
                    <a>Team</a>
                  </Link>
                </li>
                <li>
                  <a href='https://blog.chronobank.io/'>Blog</a>
                </li>
                <li>
                  <Link route='/faq'>
                    <a>FAQ</a>
                  </Link>
                </li>
                <li>
                  <ul className='compact'>
                    <li className='highlight'>
                      <a href='https://mint.chronobank.io'>
                        <img src='/static/images/symbols/login.svg' />
                        Login
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </SnackbarPanel>
    )
  }
}

function mapDispatchToProps (dispatch) {
  return {
    onClose: () => dispatch(snackbarsClose())
  }
}

export default connect(null, mapDispatchToProps)(MobileMenu)

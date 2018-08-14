import React from 'react'
import withRedux from 'next-redux-wrapper'
import Head from 'next/head'
import PropTypes from 'prop-types'
import cn from 'classnames'

import { ProductModel } from 'src/models'
import initStore, { modalsClear, snackbarsClear, initUserLanguage, initAnyPage, productSelector, constantSelector } from 'src/store'
import * as components from 'src/components'
import * as partials from 'src/partials'

import globalStyles from 'src/styles/globals/globals.sass'
import styles from './products-details.sass'

class ProductsDetails extends React.Component {

  static propTypes = {
    productSlug: PropTypes.string,
    product: PropTypes.instanceOf(ProductModel),
    constants: PropTypes.func,
  }

  static async getInitialProps ({ store, query, req }) {
    await store.dispatch(initUserLanguage(req))
    await store.dispatch(initAnyPage())
    await store.dispatch(modalsClear())
    await store.dispatch(snackbarsClear())
    return {
      productSlug: query.slug,
    }
  }

  render () {
    const { product, constants } = this.props

    if (!product) {
      return null
    }

    return (
      <div className='root'>
        <style global jsx>{globalStyles}</style>
        <style jsx>{styles}</style>
        <Head>
          <title>ChronoBank.io: {product.title}</title>
          <link rel='shortcut icon' type='image/x-icon' href='/static/images/favicon.png' />
          <meta name='viewport' content='initial-scale=1.0, maximum-scale=1.0, user-scalable=no, width=device-width' />
        </Head>
        <components.ModalStack />
        <components.SnackbarStack />
        <partials.TheHeader productSlug={product.slug} headerSlug={`${product.slug}-page`} />
        <main className={cn('main', `${product.slug}-page`)}>
          {(product.descriptions && product.descriptions.length)
            ? (
              <partials.ProductDescriptionsSection
                descriptions={product.descriptions}
                productSlug={product.slug}
              />)
            : null
          }
          {(product.features && product.features.length)
            ? (
              <partials.ProductFeaturesSection
                features={product.features}
                mode={product.featuresMode}
                productSlug={product.slug}
              />)
            : null
          }
          {
            Array.isArray(product.links) ? (
              <div className='nav-link-wrapper'>
                {product.links.filter((link) => link.isVisibleInContent).map((link) => {
                  return (
                    <a className={cn('nav-link', `nav-link-${link.slug}`)} href={link.link}>
                      {link.text}
                    </a>
                  )
                })}
              </div>) : null
          }

        </main>
        <partials.TheFooter productSlug='chronowallet' />
        <partials.TelegramSection />
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

export default withRedux(initStore, mapStateToProps)(ProductsDetails)

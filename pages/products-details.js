import React from 'react'
import withRedux from 'next-redux-wrapper'
import Head from 'next/head'
import PropTypes from 'prop-types'
import { zipObjectDeep } from 'lodash'

import initStore from 'src/store'
import { modalsClear, snackbarsClear } from 'src/store'
import * as components from 'src/components'
import * as partials from 'src/partials'
import { BACKEND } from 'src/endpoints'

import globalStyles from 'src/styles/globals/globals.sass'
import styles from './products-details.sass'

class ProductsDetails extends React.Component {

  static propTypes = {
    header:  PropTypes.object,
    details:  PropTypes.object,
    products: PropTypes.object,
  }

  static async getInitialProps ({ store, query }) {
    const promises = {
      header:       BACKEND.get(`headers/s/${query.slug}-page`),
      details:      BACKEND.get(`products/s/${query.slug}`),
      'products.chronomint':        BACKEND.get('products/s/chronomint'),
      'products.laborx':            BACKEND.get('products/s/laborx')
    }

    const results = await Promise.all(Object.values(promises))

    await store.dispatch(modalsClear())
    await store.dispatch(snackbarsClear())

    return zipObjectDeep(
      Object.keys(promises),
      results.map(res => res.data)
    )
  }

  render () {
    return (
      <div className='root'>
        <style global jsx>{globalStyles}</style>
        <style jsx>{styles}</style>
        <Head>
          <title>ChronoBank.io: {this.props.details.title}</title>
          <meta name='viewport' content='initial-scale=1.0, maximum-scale=1.0, user-scalable=no, width=device-width' />
        </Head>
        <components.ModalStack />
        <components.SnackbarStack />
        <partials.TheHeader header={this.props.header} products={[
          this.props.products.chronomint,
          this.props.products.laborx
        ]} />
        <main className='main'>
        </main>
        <partials.TheFooter />
      </div>
    )
  }
}

export default withRedux(initStore)(ProductsDetails)

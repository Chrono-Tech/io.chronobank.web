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
import styles from './faq.sass'

class FAQ extends React.Component {

  static propTypes = {
    header:  PropTypes.object,
    topics: PropTypes.array,
    products: PropTypes.object,
  }

  static async getInitialProps ({ store }) {

    const promises = {
      header:       BACKEND.get('headers/s/faq-page'),
      topics:       BACKEND.get('faq-topics'),
      'products.chronomint':        BACKEND.get('products/s/chronomint'),
      'products.laborx':            BACKEND.get('products/s/laborx'),
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
          <title>ChronoBank.io: FAQ</title>
          <meta name='viewport' content='initial-scale=1.0, maximum-scale=1.0, user-scalable=no, width=device-width' />
        </Head>
        <components.ModalStack />
        <components.SnackbarStack />
        <partials.TheHeader header={this.props.header} products={[
          this.props.products.chronomint,
          this.props.products.laborx
        ]} />
        <main>
          <partials.FaqSection topics={this.props.topics} />
        </main>
        <partials.TheFooter />
      </div>
    )
  }
}

export default withRedux(initStore)(FAQ)

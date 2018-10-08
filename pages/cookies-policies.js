import React from 'react'
import withRedux from 'next-redux-wrapper'
import Head from 'next/head'
import PropTypes from 'prop-types'

import initStore, { modalsClear, snackbarsClear, initUserLanguage, constantSelector, initAnyPage } from 'src/store'
import * as components from 'src/components'
import * as partials from 'src/partials'

import globalStyles from 'src/styles/globals/globals.sass'
import styles from './faq.sass'

class CookiesPolicies extends React.Component {

  static propTypes = {

    constants: PropTypes.func,

  }

  static async getInitialProps ({ store, req }) {
    await store.dispatch(initUserLanguage(req))
    await store.dispatch(initAnyPage())
    await store.dispatch(modalsClear())
    await store.dispatch(snackbarsClear())
  }

  render () {
    const { constants } = this.props
    return (
      <div className='root'>
        <style global jsx>{globalStyles}</style>
        <style jsx>{styles}</style>
        <Head>
          <title>ChronoBank.io: {constants('cookies-our-policy')}</title>
          <link rel='shortcut icon' type='image/x-icon' href='/static/images/favicon.png' />
          <meta name='viewport' content='initial-scale=1.0, maximum-scale=1.0, user-scalable=no, width=device-width' />
        </Head>
        <components.ModalStack />
        <components.SnackbarStack />
        <partials.TheCookies />
        <partials.TheHeader headerSlug='our-cookies-policy' />
        <main>
          <partials.CookiesPoliciesSection />
        </main>
        <partials.TheFooter productSlug='chronowallet' />
        <partials.TelegramSection />
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    constants: constantSelector(state),
  }
}

export default withRedux(initStore, mapStateToProps)(CookiesPolicies)

import React from 'react'
import withRedux from 'next-redux-wrapper'
import Head from 'next/head'

import initStore from 'src/store'
import { modalsClear, snackbarsClear, initTeamPage, initUserLanguage } from 'src/store'
import * as components from 'src/components'
import * as partials from 'src/partials'

import globalStyles from 'src/styles/globals/globals.sass'
import styles from './team.sass'

class Team extends React.Component {

  static async getInitialProps ({ store, req }) {
    store.dispatch(initUserLanguage(req && req.headers))
    await store.dispatch(initTeamPage())
    await store.dispatch(modalsClear())
    await store.dispatch(snackbarsClear())
  }

  render () {
    return (
      <div className='root'>
        <style global jsx>{globalStyles}</style>
        <style jsx>{styles}</style>
        <Head>
          <title>ChronoBank.io: Team</title>
          <link rel='shortcut icon' type='image/x-icon' href='/static/images/favicon.png' />
          <meta name='viewport' content='initial-scale=1.0, maximum-scale=1.0, user-scalable=no, width=device-width' />
        </Head>
        <components.ModalStack />
        <components.SnackbarStack />
        <partials.TheHeader headerSlug='team-page' />
        <partials.GallerySection />
        <main>
          <div className='statistics'>
            <partials.TheTitle title='ChronoBank is' />
            <partials.StatisticsSection />
          </div>
          <partials.MembersSection />
          <div className='jobs'>
            <partials.TheTitle title='Jobs at Chronobank.io' />
            <partials.JobsSection />
          </div>
        </main>
        <partials.TheFooter productSlug='chronomint' />
      </div>
    )
  }
}

export default withRedux(initStore)(Team)

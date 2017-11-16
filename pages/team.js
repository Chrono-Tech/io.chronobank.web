import React from 'react'
import withRedux from 'next-redux-wrapper'
import Head from 'next/head'
import PropTypes from 'prop-types'
import { zipObjectDeep } from 'lodash'

import initStore from 'src/store'
import { modalsClear, snackbarsClear, initTeamPage } from 'src/store'
import * as components from 'src/components'
import * as partials from 'src/partials'
import { BACKEND } from 'src/endpoints'

import globalStyles from 'src/styles/globals/globals.sass'
import styles from './team.sass'

class Team extends React.Component {

  static propTypes = {
    header:  PropTypes.object,
    statistics:  PropTypes.object,
    members:  PropTypes.object,
    products: PropTypes.object,
    jobs:  PropTypes.object,
  }

  static async getInitialProps ({ store }) {

    const promises = {
      header:       BACKEND.get('headers/s/team-page'),
      statistics:   BACKEND.get('statistics'),
      members:      BACKEND.get('members'),
      jobs:         BACKEND.get('jobs'),
      'products.chronomint':        BACKEND.get('products/s/chronomint'),
      'products.laborx':            BACKEND.get('products/s/laborx'),
    }

    const results = await Promise.all(Object.values(promises))

    await store.dispatch(initTeamPage())

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
          <title>ChronoBank.io: Team</title>
          <link rel='shortcut icon' type='image/x-icon' href='/static/images/favicon.png' />
          <meta name='viewport' content='initial-scale=1.0, maximum-scale=1.0, user-scalable=no, width=device-width' />
        </Head>
        <components.ModalStack />
        <components.SnackbarStack />
        <partials.TheHeader header={this.props.header} products={[
          this.props.products.chronomint,
          this.props.products.laborx
        ]} />
        <partials.GallerySection />
        <main>
          <div className='statistics'>
            <partials.TheTitle title='ChronoBank is' />
            <partials.StatisticsSection statistics={this.props.statistics} />
          </div>
          <partials.MembersSection members={this.props.members} />
          <div className='jobs'>
            <partials.TheTitle title='Jobs at Chronobank.io' />
            <partials.JobsSection jobs={this.props.jobs} />
          </div>
        </main>
        <partials.TheFooter />
      </div>
    )
  }
}

export default withRedux(initStore)(Team)

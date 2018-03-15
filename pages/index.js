import React from 'react'
import withRedux from 'next-redux-wrapper'
import Head from 'next/head'
import PropTypes from 'prop-types'

import initStore, { modalsClear, snackbarsClear, initUserLanguage, initIndexPage, titleSelector } from 'src/store'
import { watchInitMarket, unwatchInitMarket } from 'dropins/market/src/store'
import * as components from 'src/components'
import * as partials from 'src/partials'

import globalStyles from 'src/styles/globals/globals.sass'
import styles from './index.sass'

class Index extends React.Component {

  static propTypes = {

    testimonials: PropTypes.array,
    stories: PropTypes.array,

    watchInitMarket: PropTypes.func,
    unwatchInitMarket: PropTypes.func,

    titles: PropTypes.func,
  }

  static async getInitialProps ({ store, isServer, req }) {
    await store.dispatch(initUserLanguage(req))
    await store.dispatch(initIndexPage())
    await store.dispatch(modalsClear())
    await store.dispatch(snackbarsClear())

    if (!isServer) {
      store.dispatch(watchInitMarket())
    }
  }

  componentDidMount () {
    this.props.watchInitMarket()
  }

  componentWillUnmount () {
    this.props.unwatchInitMarket()
  }

  render () {
    const { titles } = this.props
    return (
      <div className='root'>
        <style global jsx>{globalStyles}</style>
        <style jsx>{styles}</style>
        <Head>
          <title>ChronoBank.io</title>
          <link rel='shortcut icon' type='image/x-icon' href='/static/images/favicon.png' />
          <meta name='viewport' content='initial-scale=1.0, maximum-scale=1.0, user-scalable=no, width=device-width' />
        </Head>
        <components.ModalStack />
        <components.SnackbarStack />
        <div className='svg'>
          {/* <svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'></svg> */}
        </div>
        <div className='page'>
          <partials.TheHeader headerSlug='main-page' />
          <main className='main'>
            <div className='about'>
              <partials.TheTitle title={titles('what-is-chronobank-io')} />
              {this.props.stories && this.props.stories.map((story) => (
                <partials.StorySection key={story.id} story={story} />
              ))}
              <partials.FeaturesSection />
            </div>
            <div className='app'>
              <partials.ProductSection productSlug='chronomint' />
              <partials.MobileSection productSlug='chronomint-mobile' />
              <partials.JoinSection />
              <partials.ProductSection productSlug='laborx' />
            </div>
            <div className='roadmap'>
              <partials.TheTitle title={titles('roadmap')} />
              <partials.RoadmapSection />
            </div>
            <div className='ceo'>
              {this.props.testimonials && this.props.testimonials.map((testimonial) => (
                <partials.TestimonialSection key={testimonial.id} testimonial={testimonial} />
              ))}
            </div>
            <div className='partners'>
              <partials.TheTitle title={titles('partners')} />
              <partials.PartnersSection />
            </div>
            <div className='press'>
              <partials.TheTitle title={titles('press')} />
              <partials.ArticlesSection />
            </div>
            <div className='posts'>
              <partials.TheTitle title={titles('latest-news')} />
              <partials.PostsSection />
            </div>
            <partials.ContactsSection />
          </main>
          <partials.TheFooter productSlug='chronomint' />
          <partials.TelegramSection />
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    stories: state.pages.stories.array,
    testimonials: state.pages.testimonials.array,
    titles: titleSelector(state),
  }
}

function mapDispatchToProps (dispatch) {
  return {
    watchInitMarket: () => dispatch(watchInitMarket()),
    unwatchInitMarket: () => dispatch(unwatchInitMarket()),
  }
}

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(Index)

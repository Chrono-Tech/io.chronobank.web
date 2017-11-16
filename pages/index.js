import React from 'react'
import withRedux from 'next-redux-wrapper'
import Head from 'next/head'
import PropTypes from 'prop-types'
import { zipObjectDeep } from 'lodash'

import initStore from 'src/store'
import { EventModel } from 'src/models'
import { modalsClear, snackbarsClear, eventsEnqueue, initIndexPage } from 'src/store'
import * as components from 'src/components'
import * as partials from 'src/partials'
import { BACKEND } from 'src/endpoints'

import globalStyles from 'src/styles/globals/globals.sass'
import styles from './index.sass'

class Index extends React.Component {

  static propTypes = {
    header:  PropTypes.object,

    posts:  PropTypes.array,
    testimonials: PropTypes.array,
    stories: PropTypes.array,

    products: PropTypes.object,

    eventsShow: PropTypes.func,
  }

  static async getInitialProps ({ store }) {

    const promises = {
      header:       BACKEND.get('headers/s/main-page'),
      'products.chronomint':        BACKEND.get('products/s/chronomint'),
      'products.chronomintMobile':  BACKEND.get('products/s/chronomint-mobile'),
      'products.laborx':            BACKEND.get('products/s/laborx'),
    }

    const results = await Promise.all(Object.values(promises))

    await store.dispatch(initIndexPage())

    await store.dispatch(modalsClear())
    await store.dispatch(snackbarsClear())

    return zipObjectDeep(
      Object.keys(promises),
      results.map(res => res.data)
    )
  }

  componentDidMount () {
    const events = this.props.posts.map(p => new EventModel({
      id: p.id,
      status: 'new',
      url: p.url,
      title: p.title,
      date: p.publishedDate
    }))

    let index = 0
    this.props.eventsShow(events[index % events.length])
    index++
    this.eventsInterval = setInterval(() => {
      this.props.eventsShow(events[index % events.length])
      index++
    }, 5000)
  }

  componentWillUnmount () {
    clearInterval(this.eventsInterval)
    this.eventsInterval = null
  }

  render () {
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
          <partials.TheHeader header={this.props.header} products={[
            this.props.products.chronomint,
            this.props.products.laborx
          ]} />
          <main className='main'>
            <div className='about'>
              <partials.TheTitle
                title='What is ChronoBank.io?'
                subtitle='ChronoBank.io is an ambitious and wide-ranging
                  blockchain project, aimed at disrupting the
                  HR/recruitment/finance industries in a similar way to how
                  Uber disrupted the taxi business and how Upwork represented
                  an evolution in freelancing.'
              />
              {this.props.stories && this.props.stories.map(story => (
                <partials.StorySection key={story.id} story={story} />
              ))}
              <partials.FeaturesSection />
            </div>
            <div className='app'>
              <partials.ProductSection key={this.props.products.chronomint._id} product={this.props.products.chronomint} />
              <partials.MobileSection key={this.props.products.chronomintMobile._id} product={this.props.products.chronomintMobile} />
              <partials.JoinSection />
              <partials.ProductSection key={this.props.products.laborx._id} product={this.props.products.laborx} />
            </div>
            <div className='roadmap'>
              <partials.TheTitle
                title='Roadmap'
              />
              <partials.RoadmapSection />
            </div>
            <div className='ceo'>
              {this.props.testimonials && this.props.testimonials.map((testimonial) => (
                <partials.TestimonialSection key={testimonial.id} testimonial={testimonial} />
              ))}
            </div>
            <div className='partners'>
              <partials.TheTitle
                title='Partners'
                subtitle='We are proud of our partners'
              />
              <partials.PartnersSection />
            </div>
            <div className='press'>
              <partials.TheTitle
                title='Press'
              />
              <partials.ArticlesSection />
            </div>
            <div className='posts'>
              <partials.TheTitle
                title='Latest news'
              />
              <partials.PostsSection />
            </div>
            <partials.ContactsSection />
          </main>
          <partials.TheFooter />
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    posts: state.pages.posts,
    stories: state.pages.stories,
    testimonials: state.pages.testimonials,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    eventsShow: async (event: EventModel) => {
      await dispatch(eventsEnqueue(event, 1))
    }
  }
}

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(Index)

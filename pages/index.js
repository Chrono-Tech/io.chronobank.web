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
import styles from './index.sass'

class Index extends React.Component {

  static propTypes = {
    header:  PropTypes.object,
    features: PropTypes.object,
    partners: PropTypes.object,
    stories: PropTypes.object,
    products: PropTypes.object,
    articles: PropTypes.object,
    testimonials: PropTypes.object,
    posts: PropTypes.object,
    iterations: PropTypes.object
  }

  static async getInitialProps ({ store }) {

    const promises = {
      header:       BACKEND.get('headers/s/main-page'),
      posts:        BACKEND.get('posts'),
      features:     BACKEND.get('features'),
      partners:     BACKEND.get('partners'),
      stories:      BACKEND.get('stories'),
      articles:     BACKEND.get('articles'),
      testimonials: BACKEND.get('testimonials'),
      iterations:   BACKEND.get('iterations'),
      'products.chronomint':        BACKEND.get('products/s/chronomint'),
      'products.chronomintMobile':  BACKEND.get('products/s/chronomint-mobile'),
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
          <title>ChronoBank.io</title>
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
              {this.props.stories && this.props.stories.stories.map(story => (
                <partials.StorySection key={story._id} story={story} />
              ))}
              <partials.FeaturesSection features={this.props.features} />
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
              <partials.RoadmapSection iterations={this.props.iterations} />
            </div>
            <div className='ceo'>
              {this.props.testimonials && this.props.testimonials.testimonials.map((testimonial) => (
                <partials.TestimonialSection key={testimonial._id} testimonial={testimonial} />
              ))}
            </div>
            <div className='partners'>
              <partials.TheTitle
                title='Partners'
                subtitle='We are proud of our partners'
              />
              <partials.PartnersSection partners={this.props.partners} />
            </div>
            <div className='press'>
              <partials.TheTitle
                title='Press'
              />
              <partials.ArticlesSection articles={this.props.articles} />
            </div>
            <partials.TheTitle
              title='Latest news'
            />
            <partials.PostsSection posts={this.props.posts} />
            <partials.ContactsSection />
          </main>
          <partials.TheFooter />
        </div>
      </div>
    )
  }
}

export default withRedux(initStore)(Index)

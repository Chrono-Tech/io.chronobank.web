import React from 'react'
import PropTypes from 'prop-types'

import { TestimonialModel } from 'src/models'
import styles from './TestimonialSection.sass'

export default class TestimonialSection extends React.Component {

  static propTypes = {
    testimonial: PropTypes.instanceOf(TestimonialModel),
  }

  render () {
    const { testimonial } = this.props
    return (
      <div className='root testimonial-section'>
        <style jsx>{styles}</style>
        <div className='background' />
        <div className='wrap'>
          <div className='content'>
            <div className='left'>
              {!testimonial.image ? null : (
                <img
                  className='image-1024'
                  {...{
                    src: testimonial.image ? `${testimonial.image.url}` : undefined,
                    srcSet: testimonial.image2x ? `${testimonial.image2x.url} 2x` : undefined,
                  }}
                />
              )}
              {!testimonial.image448 ? null : (
                <img
                  className='image-480'
                  {...{
                    src: testimonial.image448 ? `${testimonial.image448.url}` : undefined,
                    srcSet: testimonial.image2x448 ? `${testimonial.image2x448.url} 2x` : undefined,
                  }}
                />
              )}
            </div>
            <div className='right'>
              {!testimonial.name ? null : (
                <h3>{testimonial.name}</h3>
              )}
              {!testimonial.position ? null : (
                <h4>{testimonial.position}</h4>
              )}
              {!testimonial.brief ? null : (
                <blockquote>
                  <div className='text' dangerouslySetInnerHTML={{ __html: testimonial.brief }} />
                </blockquote>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

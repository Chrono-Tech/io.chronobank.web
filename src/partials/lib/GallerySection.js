import React from 'react'
import PropTypes from 'prop-types'

import { Swiper } from 'src/plugins'

import styles from './GallerySection.sass'
import swiperStyles from 'swiper/dist/css/swiper.css'

export default class GallerySection extends React.Component {

  static propTypes = {
    note: PropTypes.object
  }

  static defaultProps = {
    note: {
      brief: `
        <h4>Searching for interesting job?<br/><a href='https://chronobank.herokuapp.com/' target='_blank' rel='noopener noreferrer'>Join us!</a></h4>
      `,
      action: 'View openings',
      url: '#global-jobs-section'
    }
  }

  componentDidMount () {
    this.swiper = new Swiper(this.swiperElement, {
      grabCursor: true,
      loop: true,
      freeMode: true,
      slidesPerView: 'auto',
      loopedSlides: 2,
      touchEventsTarget: 'wrapper',
      preventClicks: false,
      preventClicksPropagation: false,
      onTouchStart: () => {
        if (this.popupElement) {
          this.popupElement.style.opacity = 0
        }
      },
      onTouchEnd: () => {
        if (this.popupElement) {
          this.popupElement.style.opacity = 1
        }
      }
    })
  }

  render () {
    const { note } = this.props
    return (
      <div className='root gallery-section'>
        <style jsx>{styles}</style>
        <style jsx>{swiperStyles}</style>
        <div className='wrap'>
          <div className='content'>
            {!note ? null : (
              <div className='popup' ref={(popup) => { this.popupElement = popup }}>
                <div className='inner'>
                  <div className='text' dangerouslySetInnerHTML={{ __html: note.brief}}></div>
                  <div className='buttons'>
                    <a className='button' href={note.url}>{note.action}</a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className='swiper-container' ref={(swiper) => { this.swiperElement = swiper }}>
          <div className='swiper-wrapper'>
            <img className='swiper-slide' src='/static/uploads/slider/img-team-1.png' />
            <img className='swiper-slide' src='/static/uploads/slider/img-team-2.png' />
          </div>
        </div>
      </div>
    )
  }
}

import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import swiperStyles from 'swiper/dist/css/swiper.css'

import { Swiper } from 'src/plugins'
import { GalleryModel } from 'src/models'

import styles from './GallerySection.sass'
import { constantSelector } from 'src/store'

@connect(mapStateToProps)
export default class GallerySection extends React.Component {

  static propTypes = {
    note: PropTypes.object,
    galleries: PropTypes.arrayOf(GalleryModel),
    constants: PropTypes.func,
  }

  componentDidMount () {
    this.swiper = new Swiper(this.swiperElement, {
      grabCursor: true,
      loop: true,
      // setWrapperSize: true,
      calculateWidth: true,
      slidesPerView: 'auto',
      freeMode: true,
      freeModeFluid: true,
      onTouchStart: () => {
        if (this.popupElement) {
          this.popupElement.style.opacity = 0
        }
      },
      onTouchEnd: () => {
        if (this.popupElement) {
          this.popupElement.style.opacity = 1
        }
      },
    })
  }

  render () {
    const { galleries, note, constants } = this.props
    return (
      <div className='root gallery-section'>
        <style jsx>{styles}</style>
        <style jsx>{swiperStyles}</style>
        <div className='wrap'>
          <div className='content'>
            {!note ? null : (
              <div className='popup' ref={(popup) => { this.popupElement = popup }}>
                <div className='inner'>
                  <div className='text'>
                    <h4>
                      { constants('searching-for-interesting-job') }
                      <br />
                      <a href='https://chronobank.herokuapp.com/' target='_blank' rel='noopener noreferrer'>
                        { constants('join-us') }
                      </a>
                    </h4>
                  </div>
                  <div className='buttons'>
                    <a className='button' href='#global-jobs-section'>{ constants('view-openings') }</a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className='swiper-container' ref={(swiper) => { this.swiperElement = swiper }}>
          <div className='swiper-wrapper'>
            {galleries.map((g) => (
              (g.images || []).map((i) => (
                <img key={`${g.id}/${i.id}`} className='swiper-slide' src={i.image.url} />
              ))
            ))}
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    galleries: state.pages.galleries.array,
    constants: constantSelector(state),
  }
}

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { Swiper } from 'src/plugins'
import { ModalDialog } from 'src/components'
import { modalsClose } from 'src/store'

import styles from './MemberDialog.sass'
import swiperStyles from 'swiper/dist/css/swiper.css'

export class MemberDialog extends React.Component {

  static propTypes = {
    member: PropTypes.object,
    members: PropTypes.array,
    onClose: PropTypes.func
  }

  componentDidMount () {
    const active = this.props.members.indexOf(this.props.member)
    this.swiper = new Swiper(this.swiperElement, {
      loop: true,
      grabCursor: true,
      nextButton: '.swiper-button-next',
      prevButton: '.swiper-button-prev',
      pagination: '.swiper-pagination',
      paginationClickable: true,
      spaceBetween: 30,
      initialSlide: Math.max(active, 0)
    })
  }

  render () {

    return (
      <ModalDialog onClose={() => this.props.onClose()}>
        <style jsx>{styles}</style>
        <style jsx>{swiperStyles}</style>
        <div className='root member-dialog'>
          <div className='swiper-container' ref={(swiper) => { this.swiperElement = swiper }}>
            <div className='swiper-wrapper'>
              {this.props.members.map((member) => (
                <div key={member._id} className='swiper-slide'>
                  {!member.avatar ? null : (
                    <img {...{
                      src: member.avatar ? `${member.avatar.secure_url}` : undefined,
                      srcSet: member.avatar2x ? `${member.avatar2x.secure_url} 2x` : undefined
                    }} />
                  )}
                  <h4>{member.name}</h4>
                  <h5>{member.position}</h5>
                  <div className='text' dangerouslySetInnerHTML={{ __html: member.brief}}></div>
                </div>
              ))}
            </div>
            <div className='swiper-pagination'></div>
            <div className='swiper-button-prev'>
              <img src='/static/images/symbols/chevron-left.svg' />
            </div>
            <div className='swiper-button-next'>
              <img src='/static/images/symbols/chevron-right.svg' />
            </div>
          </div>
        </div>
      </ModalDialog>
    )
  }
}

function mapDispatchToProps (dispatch) {
  return {
    onClose: () => dispatch(modalsClose())
  }
}

export default connect(null, mapDispatchToProps)(MemberDialog)

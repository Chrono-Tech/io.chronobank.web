import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import styles from './StorySection.sass'

export default class StorySection extends React.Component {

  static propTypes = {
    story: PropTypes.object
  }

  render () {
    const { story } = this.props
    return (
      <div className={cn('root', 'story-section', {
        'background-dark': story.background === 'dark',
        'background-light': story.background === 'light',
        'stereotype-default': story.stereotype === 'dark',
        'stereotype-mirrored': story.stereotype === 'mirrored'
      })}>
        <style jsx>{styles}</style>
        <div className='wrap'>
          <div className='content'>
            <div className='left'>
              <div className='inner-wrap'>
                <div className='picture'>
                  { !story.image ? null : (
                    <img {...{
                      src: story.image ? `${story.image.secure_url}` : undefined,
                      srcSet: story.image2x ? `${story.image2x.secure_url} 2x` : undefined
                    }}/>
                  )}
                </div>
                <div className='legend'>{story.legend}</div>
              </div>
            </div>
            <div className='right'>
              <div className='inner-wrap'>
                <div className='text' dangerouslySetInnerHTML={{ __html: story.brief}}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

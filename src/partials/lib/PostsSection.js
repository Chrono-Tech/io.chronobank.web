import React from 'react'
import PropTypes from 'prop-types'

import styles from './PostsSection.sass'

export default class PostsSection extends React.Component {

  static propTypes = {
    posts: PropTypes.object,
  }

  navigate (url) {
    if (global.document) {
      global.document.location.href = url
    }
  }

  render () {
    const { posts } = this.props
    return (
      <div className='root posts-section'>
        <style jsx>{styles}</style>
        <div className='wrap'>
          <div className='content'>
            {posts.posts.map(post => (
              <div className='item' key={post._id} onClick={() => { post.url && this.navigate(post.url) }}>
                {!post.image ? null : (
                  <div className='image'>
                    <img alt={post.title} {...{
                      src: post.image ? `${post.image.secure_url}` : undefined,
                      srcSet: post.image2x ? `${post.image2x.secure_url} 2x` : undefined
                    }}/>
                  </div>
                )}
                <h3>{post.title}</h3>
                <div className='text' dangerouslySetInnerHTML={{ __html: post.content.brief}}></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
}

import React from 'react'
import PropTypes from 'prop-types'
import styles from './PostsSection.sass'

export default class PostsSection extends React.Component {

  static propTypes = {
    posts: PropTypes.array,
  }

  navigate (url) {
    if (global.document) {
      global.document.location.href = url
    }
  }

  render () {
    const posts = this.props.posts.slice(0,4)
    return (
      <div className='root posts-section'>
        <style jsx>{styles}</style>
        <div className='wrap'>
          <div className='content'>
            {posts.map(post => (
              <div className='item' key={post.guid} onClick={() => { post.url && this.navigate(post.url) }}>
                {!post.image ? null : (
                  <div className='image'>
                    <img alt={post.title} src={post.image} />
                  </div>
                )}
                <h3>{post.title}</h3>
                <div className='text'>...</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
}

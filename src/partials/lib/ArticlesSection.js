import React from 'react'
import PropTypes from 'prop-types'

import styles from './ArticlesSection.sass'

export default class ArticlesSection extends React.Component {

  static propTypes = {
    articles: PropTypes.object,
  }

  render () {
    const { articles } = this.props
    return (
      <div className='root articles-section'>
        <style jsx>{styles}</style>
        <div className='wrap'>
          <div className='content'>
            {articles.articles.map(article => (
              <div className='item' key={article._id}>
                <div className='left'>
                  {!article.icon ? null : (
                    <div className='icon'>
                      <img alt={article.title} {...{
                        src: article.icon ? `${article.icon.secure_url}` : undefined,
                        srcSet: article.icon2x ? `${article.icon2x.secure_url} 2x` : undefined
                      }}/>
                    </div>
                  )}
                </div>
                <div className='right'>
                  <div className='text' dangerouslySetInnerHTML={{ __html: article.brief}}></div>
                  <a className='more' href={article.url}>
                    <img src='/static/images/symbols/more.svg' />
                    <span>Read the full article</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
          <div className='buttons'>
            <a className='button' href='#'>All articles about us</a>
          </div>
        </div>
      </div>
    )
  }
}

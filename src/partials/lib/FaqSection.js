import React from 'react'
import PropTypes from 'prop-types'
import { debounce } from 'lodash'

import { BACKEND } from 'src/endpoints'
import { AccordeonPanel, ReferencePanel, SearchPanel, SectionsPanel } from 'src/components'

import styles from './FaqSection.sass'

export default class FaqSection extends React.Component {

  static propTypes = {
    topics: PropTypes.object
  }

  constructor (props) {
    super(props)
    this.handleSearchDebounced = debounce(this.handleSearch, 500)
  }

  render () {
    const { topics } = this.props
    return (
      <div className='root faq-section'>
        <style jsx>{styles}</style>
        <div className='wrap'>
          <div className='content'>
            <div className='left'>
              <div className='search'>
                <SearchPanel onChange={(value) => this.handleSearchDebounced(value)} />
              </div>
              <div className='topics'>
                <ReferencePanel items={topics['faq-topics'].map(t => ({
                  id: t._id,
                  title: t.title,
                  route: ''
                }))} />
              </div>
            </div>
            <div className='right'>
              <div className='search'>
                <SearchPanel onChange={(value) => this.handleSearchDebounced(value)} />
              </div>
              <div className='results'>
                <SectionsPanel styleName='topics' className='topics' items={topics['faq-topics'].map(topic => ({
                  id: topic._id,
                  title: topic.title,
                  content: (
                    <AccordeonPanel items={topic.questions.map(question => ({
                      id: question._id,
                      title: question.title,
                      content: (
                        <div className='text' dangerouslySetInnerHTML={{ __html: question.brief}}></div>
                      )
                    }))} />
                  )
                }))} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  async handleSearch (query) {
    // eslint-disable-next-line
    const { data } = await BACKEND.get('faq-questions/search', {
      params: {
        query
      }
    })
    // this.setState({
    //   topics: data.elements.map(q => )
    //   questions: data.elements
    // })
  }
}

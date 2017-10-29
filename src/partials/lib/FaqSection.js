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

    const topics = new Map()
    for (const t of props.topics) {
      if (t.questions && t.questions.length) {
        topics.set(t._id, {
          id: t._id,
          title: t.title,
          route: '',
          questions: t.questions.map(q => ({
            id: q._id,
            title: q.title,
            brief: q.brief
          }))
        })
      }
    }

    this.state = {
      topics,
      reference: [...topics.values()],
      results: [...topics.values()]
    }
  }

  render () {
    const { reference, results } = this.state
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
                <ReferencePanel items={reference} />
              </div>
            </div>
            <div className='right'>
              <div className='search'>
                <SearchPanel onChange={(value) => this.handleSearchDebounced(value)} />
              </div>
              <div className='results'>
                <SectionsPanel styleName='topics' className='topics' items={results.map(topic => ({
                  id: topic.id,
                  title: topic.title,
                  content: (
                    <AccordeonPanel items={topic.questions.map(question => ({
                      id: question.id,
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
    const state = this.state
    // eslint-disable-next-line
    const { data } = await BACKEND.get('faq-questions/search', {
      params: {
        query
      }
    })

    if (query !== '' && query !== '*') {
      const results = data.elements
        .reduce(
          (m, q) => {
            if (q.score > 1 && q.document.topic) {
              const topic = state.topics.get(q.document.topic)
              if (topic) {
                const questions = m.get(q.document.topic) || []
                m.set(topic.id, {
                  ...topic,
                  questions: [...questions, {
                    id: q.document._id,
                    title: q.document.title,
                    brief: q.document.brief
                  }]
                })
              }
            }
            return m
          },
          new Map()
        )
      this.setState({
        results: [...results.values()]
      })

    } else {
      this.setState({
        reference: [...state.topics.values()],
        results: [...state.topics.values()]
      })
    }
  }
}

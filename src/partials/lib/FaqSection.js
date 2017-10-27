import React from 'react'
import PropTypes from 'prop-types'

import { ReferencePanel, SectionsPanel, AccordeonPanel } from 'src/components'

import styles from './FaqSection.sass'

export default class FaqSection extends React.Component {

  static propTypes = {
    topics: PropTypes.object
  }

  render () {
    const { topics } = this.props
    return (
      <div className='root faq-section'>
        <style jsx>{styles}</style>
        <div className='wrap'>
          <div className='content'>
            <div className='left'>
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
              </div>
              <div className='results'>
                <SectionsPanel items={topics['faq-topics'].map(topic => ({
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
}

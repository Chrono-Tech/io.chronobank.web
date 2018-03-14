import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { JobModel } from 'src/models'
import * as dialogs from 'src/dialogs'
import { modalsOpen, constantSelector } from 'src/store'

import styles from './JobsSection.sass'

@connect(mapStateToProps, mapDispatchToProps)
export default class JobsSection extends React.Component {

  static propTypes = {
    jobs: PropTypes.arrayOf(JobModel),
    showJob: PropTypes.func,
    constants: PropTypes.func,
  }

  render () {
    const { jobs, constants } = this.props
    return (
      <div className='root jobs-section' id='global-jobs-section'>
        <style jsx>{styles}</style>
        <div className='wrap'>
          <div className='content'>
            <ul>
              {jobs.map((job) => (
                <li key={job.id}>
                  <div className='text' dangerouslySetInnerHTML={{ __html: job.brief }} />
                  <div className='buttons'>
                    <a className='button' onClick={() => this.props.showJob({ job })}>{constants('apply')}</a>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

function mapDispatchToProps (dispatch) {
  return {
    showJob: ({ job }) => {
      dispatch(modalsOpen({
        component: dialogs.JobDialog,
        props: {
          job,
        },
      }))
    },
  }
}

function mapStateToProps (state) {
  return {
    jobs: state.pages.jobs.array,
    constants: constantSelector(state),
  }
}

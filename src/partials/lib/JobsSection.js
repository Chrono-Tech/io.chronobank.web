import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import * as dialogs from 'src/dialogs'
import { modalsOpen } from 'src/store'

import styles from './JobsSection.sass'

@connect(null, mapDispatchToProps)
export default class JobsSection extends React.Component {

  static propTypes = {
    jobs: PropTypes.object,
    showJob: PropTypes.func
  }

  render () {
    const { jobs } = this.props
    return (
      <div className='root jobs-section' id='global-jobs-section'>
        <style jsx>{styles}</style>
        <div className='wrap'>
          <div className='content'>
            <ul>
              {jobs.jobs.map((job) => (
                <li key={job._id}>
                  <div className='text' dangerouslySetInnerHTML={{ __html: job.brief}}></div>
                  <div className='buttons'>
                    <a className='button' onClick={() => this.props.showJob({ job })}>Apply</a>
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
          job
        }
      }))
    },
  }
}

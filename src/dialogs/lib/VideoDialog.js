import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { ModalDialog } from 'src/components'
import { modalsClose } from 'src/store'

import styles from './VideoDialog.sass'

export class VideoDialog extends React.Component {

  static propTypes = {
    url:PropTypes.string,
    onClose: PropTypes.func
  }

  render () {

    return (
      <ModalDialog onClose={() => this.props.onClose()}>
        <style jsx>{styles}</style>
        <div className='root video-dialog'>
          <iframe src={this.props.url} frameBorder='0' allowFullScreen></iframe>
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

export default connect(null, mapDispatchToProps)(VideoDialog)

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { ModalDialog } from 'src/components'
import { modalsClose, titleSelector, constantSelector } from 'src/store'

import styles from './ConfirmationDialog.sass'

export class ConfirmationDialog extends React.Component {

  static propTypes = {
    onClose: PropTypes.func,
    titles: PropTypes.func,
    constants: PropTypes.func,
    dialogTitle: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    dialogContent: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  }

  render () {
    const { constants, dialogTitle, dialogContent, onClose } = this.props
    return (
      <ModalDialog onClose={() => onClose()}>
        <style jsx>{styles}</style>
        <div className='root confirmation-dialog'>
          <div className='wrap'>
            <div className='separator' />
            <div className='icon-wrapper'>
              <div className='icon' />
            </div>
            <div className='content'>
              { dialogTitle ? <div className='title'>{dialogTitle}</div> : null}
              { dialogContent || null }
              <div className='button-wrapper'>
                <button onClick={() => onClose()}>{constants('ok')}</button>
              </div>
            </div>
          </div>
        </div>
      </ModalDialog>
    )
  }
}

function mapDispatchToProps (dispatch) {
  return {
    onClose: () => dispatch(modalsClose()),

  }
}

function mapStateToProps (state) {
  return {
    titles: titleSelector(state),
    constants: constantSelector(state),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmationDialog)

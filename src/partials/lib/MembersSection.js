import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { MemberModel } from 'src/models'
import * as dialogs from 'src/dialogs'
import { modalsOpen, constantSelector } from 'src/store'

import styles from './MembersSection.sass'

@connect(mapStateToProps, mapDispatchToProps)
export default class MembersSection extends React.Component {

  static propTypes = {
    members: PropTypes.arrayOf(
      PropTypes.instanceOf(MemberModel)
    ),
    showMember: PropTypes.func,
    constants: PropTypes.func,
  }

  render () {
    const { members, constants } = this.props
    return (
      <div className='root members-section'>
        <style jsx>{styles}</style>
        <div className='wrap'>
          <div className='content'>
            <ul>
              <li className='general'>
                <h3>{ constants('we-are-making-revolution-for-the-recruitment-industry') }</h3>
                <div className='text'>
                  <p>{ constants('we-are-making-revolution-for-the-recruitment-industry-text') }</p>
                </div>
              </li>
              {members.map((member) => (
                <li key={member.id}>
                  {!member.avatar ? null : (
                    <img
                      {...{
                        src: member.avatar ? `${member.avatar.url}` : undefined,
                        srcSet: member.avatar2x ? `${member.avatar2x.url} 2x` : undefined,
                      }}
                      onClick={() => this.props.showMember({
                        member,
                        members,
                      })}
                    />
                  )}
                  <h4>{member.name}</h4>
                  <h5>{member.position}</h5>
                  <div className='actions'>
                    <a
                      className='arrow'
                      onClick={() => this.props.showMember({
                        member,
                        members,
                      })}
                    >{ constants('read-bio') } <img src='/static/images/symbols/arrow.svg' />
                    </a>
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

function mapStateToProps (state) {
  return {
    members: state.pages.members.array,
    constants: constantSelector(state)
  }
}

function mapDispatchToProps (dispatch) {
  return {
    showMember: ({ member, members }) => {
      dispatch(modalsOpen({
        component: dialogs.MemberDialog,
        props: {
          member,
          members,
        },
      }))
    },
  }
}

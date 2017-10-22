import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import * as dialogs from 'src/dialogs'
import { modalsOpen } from 'src/store'

import styles from './MembersSection.sass'

@connect(null, mapDispatchToProps)
export default class MembersSection extends React.Component {

  static propTypes = {
    members: PropTypes.object,
    showMember: PropTypes.func
  }

  render () {
    const { members } = this.props
    return (
      <div className='root members-section'>
        <style jsx>{styles}</style>
        <div className='wrap'>
          <div className='content'>
            <ul>
              <li className='general'>
                <h3>We are making revolution for the recruitment industry</h3>
                <div className='text'>
                  <p>
                    {`ChronoBank’s vision is to create a peer-to-peer
                      marketplace for short-term recruitment in which there are
                      no unnecessary costs and no arbitrary gatekeepers. We
                      believe that blockchain technology is the key to unlocking
                      this new world of employment opportunities that anyone can
                      access, wherever they are in the world, and make sure they
                      get paid promptly and fairly. We want to pioneer best
                      practice in both the blockchain and labour-hire
                      industries, and work with a range of highly-qualified
                      partners to ensure our solution is secure, robust and
                      user-friendly for all.`}
                  </p>
                </div>
              </li>
              {members.members.map((member) => (
                <li key={member._id}>
                  {!member.avatar ? null : (
                    <img {...{
                      src: member.avatar ? `${member.avatar.secure_url}` : undefined,
                      srcSet: member.avatar2x ? `${member.avatar2x.secure_url} 2x` : undefined
                    }} onClick={() => this.props.showMember({
                      member,
                      members: members.members
                    })} />
                  )}
                  <h4>{member.name}</h4>
                  <h5>{member.position}</h5>
                  <div className='actions'>
                    <a className='arrow' onClick={() => this.props.showMember({
                      member,
                      members: members.members
                    })}>Read bio <img src='/static/images/symbols/arrow.svg' /></a>
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
    showMember: ({ member, members }) => {
      dispatch(modalsOpen({
        component: dialogs.MemberDialog,
        props: {
          member,
          members
        }
      }))
    },
  }
}

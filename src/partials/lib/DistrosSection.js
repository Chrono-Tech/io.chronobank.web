import React from 'react'
import PropTypes from 'prop-types'

import styles from './DistrosSection.sass'

export default class DistrosSection extends React.Component {

  static propTypes = {
    title: PropTypes.string,
    distros: PropTypes.array
  }

  render () {
    const { title, distros } = this.props
    return (
      <div className='root distros-section'>
        <style jsx>{styles}</style>
        <div className='wrap'>
          <div className='heading'>
            <img src='/static/images/symbols/download-dark.svg' />
            <h2>{title}</h2>
          </div>
          <div className='content'>
            <div className='group'>
              <div className='downloads'>
                <h4>Desktop App</h4>
                <ul>
                  {distros.filter(distro => distro.stereotype === 'desktop').map(distro => (
                    <li key={distro._id}>
                      <a href={distro.url} target='_blank'>
                        <img src={distro.icon.secure_url} />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className='group'>
              <div className='downloads'>
                <h4>Mobile App</h4>
                <ul>
                  {distros.filter(distro => distro.stereotype === 'mobile').map(distro => (
                    <li key={distro._id}>
                      <a href={distro.url} target='_blank'>
                        <img src={distro.icon.secure_url} />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

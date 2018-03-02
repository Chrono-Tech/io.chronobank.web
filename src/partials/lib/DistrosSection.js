import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {titleSelector} from 'src/store'

import { ProductDistroModel } from 'src/models'
import styles from './DistrosSection.sass'

@connect(mapStateToProps)
export default class DistrosSection extends React.Component {

  static propTypes = {
    title: PropTypes.string,
    distros: PropTypes.arrayOf(
      PropTypes.instanceOf(ProductDistroModel)
    ),
    constants: PropTypes.func,
    titles: PropTypes.func
  }

  render () {
    const { title, distros, titles } = this.props
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
                <h4>{ titles('desktop-app') }</h4>
                <ul>
                  {distros.filter((distro) => distro.type === 'desktop').map((distro) => (
                    <li key={distro.id}>
                      <a href={distro.url} target='_blank'>
                        <img src={distro.icon.url} />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className='group'>
              <div className='downloads'>
                <h4>{ titles('mobile-app') }</h4>
                <ul>
                  {distros.filter((distro) => distro.type === 'mobile').map((distro) => (
                    <li key={distro.id}>
                      <a href={distro.url} target='_blank'>
                        <img src={distro.icon.url} />
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

function mapStateToProps (state) {
  return {
    titles: titleSelector(state)
  }
}

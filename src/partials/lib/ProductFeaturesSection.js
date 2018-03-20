import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Transition } from 'react-transition-group'
import { constantSelector } from 'src/store'

import styles from './ProductFeaturesSection.sass'

const transitionStyles = {
  entering: { opacity: 0 },
  entered:  { opacity: 1 },
}

@connect(mapStateToProps)
export default class ProductFeaturesSection extends React.Component {

  static propTypes = {
    features: PropTypes.array.isRequired,
    interval: PropTypes.number,
    constants: PropTypes.func,
    mode: PropTypes.string,
  }

  static defaultProps = {
    interval: 5000,
  }

  constructor (props) {
    super(props)
    this.state = {
      active: 0,
    }
  }

  componentDidMount () {
    if (this.props.features.length && this.props.mode === 'list') {
      this.interval = setInterval(() => {
        this.setState({
          active: (this.state.active + 1) % this.props.features.length,
        })
      }, this.props.interval)
    }
  }

  componentWillUnmount () {
    if (this.interval) {
      clearInterval(this.interval)
      this.interval = null
    }
  }

  handleSelect (index) {
    if (index < this.props.features.length) {
      this.setState({
        active: index,
      })
      if (this.interval) {
        clearInterval(this.interval)
      }
      this.interval = setInterval(() => {
        this.setState({
          active: (this.state.active + 1) % this.props.features.length,
        })
      }, this.props.interval)
    }
  }

  getContent (){
    const { mode } = this.props

    switch(mode){
      case 'tile':
        return this.renderFeaturesTile()
      case 'list':
        return this.renderFeaturesList()
      default:
        return this.renderFeaturesList()
    }
  }

  renderFeaturesList (){
    const { features, constants } = this.props
    const activeFeature = features[this.state.active]

    return (
      <div className='root product-features-section'>
        <style jsx>{styles}</style>
        <div className='wrap'>
          <div className='heading'>
            <h3>{ constants('key-features') }</h3>
          </div>
          <div className='content'>
            <div className='left'>
              <ul>
                {features.map((feature, index) => (
                  <li
                    key={feature.id}
                    className={(index === this.state.active) ? 'active' : null}
                    onClick={() => this.handleSelect(index)}
                  >
                    <a>{feature.title}</a>
                    <div className='inline'>
                      <img {...{
                        src: activeFeature.image ? `${activeFeature.image.url}` : undefined,
                        srcSet: activeFeature.image2x ? `${activeFeature.image2x.url} 2x` : undefined,
                      }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className='main'>
              <div className='image'>
                <Transition in key={activeFeature.id} timeout={300} appear>
                  {(state) => (
                    <img
                      style={transitionStyles[state]}
                      {...{
                        src: activeFeature.image ? `${activeFeature.image.url}` : undefined,
                        srcSet: activeFeature.image2x ? `${activeFeature.image2x.url} 2x` : undefined,
                      }}
                    />
                  )}
                </Transition>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  renderFeaturesTile (){
    const { features } = this.props

    return (
      <div className='root product-features-section'>
        <style jsx>{styles}</style>
        <div className='wrap'>
          <div className='content'>
            <ul>
              {features.map((feature) => (
                <li key={feature.id} className='tile'>
                  {
                    feature.image ?
                      <div className='image'>
                        <img src={feature.image.url} width='118' />
                      </div>: null
                  }
                  <div className='title'>{feature.title}</div>
                  <div className='brief'>{feature.brief}</div>
                </li>
              ))}
            </ul>
          </div>
          <div className='feedback'>
            <a className='link' href='/#contact-us'>Contact us</a>
            <p className='notice'>Yes, and it’s easy to deploy!</p>
          </div>
        </div>
      </div>
    )
  }

  render () {
    return this.getContent()
  }
}

function mapStateToProps (state) {
  return {
    constants: constantSelector(state),
  }
}

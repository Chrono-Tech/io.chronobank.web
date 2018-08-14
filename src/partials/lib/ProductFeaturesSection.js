import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Transition } from 'react-transition-group'
import cn from 'classnames'

import { ContactSendDialog } from 'src/dialogs'
import { constantSelector, modalsOpen } from 'src/store'

import styles from './ProductFeaturesSection.sass'

const transitionStyles = {
  entering: { opacity: 0 },
  entered:  { opacity: 1 },
}

@connect(mapStateToProps, mapDispatchToProps)
export default class ProductFeaturesSection extends React.Component {

  static propTypes = {
    features: PropTypes.array.isRequired,
    interval: PropTypes.number,
    constants: PropTypes.func,
    openContactDialog: PropTypes.func,
    mode: PropTypes.string,
    productSlug: PropTypes.string,
  }

  static defaultProps = {
    interval: 5000,
    productSlug: '',
    constants: () => {},
    mode: '',
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
    const { features, constants, productSlug } = this.props
    const activeFeature = features[this.state.active]

    return (
      <div className={cn('root', 'product-features-section', {
        [`product-page-${productSlug}`]: productSlug,
      })}
      >
        <style jsx>{styles}</style>
        <div className='wrap'>
          <div className='content'>
            <div className='main'>
              {
                features.map((feature, index) => (
                  <li
                    key={feature.id}
                    className='feature'
                  >
                    <div className='image-wrapper'>
                      <img {...{
                        className: cn('image'),
                        src: feature.image ? `${feature.image.url}` : undefined,
                        srcSet: feature.image2x ? `${feature.image2x.url} 2x` : undefined,
                      }}
                      />
                    </div>
                    <div className='title-wrapper'>
                      <div className='title'>
                        {feature.title}
                      </div>
                      <div className='brief'>
                        {feature.brief}
                      </div>
                    </div>
                  </li>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    )
  }

  renderFeaturesTile (){
    const { features, constants, openContactDialog, productSlug } = this.props

    return (
      <div className={cn('root', 'product-features-section', {
        [`product-page-${productSlug}`]: productSlug,
      })}
      >
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
            <button className='link' onClick={openContactDialog}>{constants('contact-us-button-middleware')}</button>
            <p className='notice'>{constants('and-yes-its-easy-to-deploy')}</p>
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

function mapDispatchToProps (dispatch) {
  return {
    openContactDialog: () => {
      dispatch(modalsOpen({
        component: ContactSendDialog,
        props: {},
      }))
    },
  }
}

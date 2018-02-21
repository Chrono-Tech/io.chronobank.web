import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import cn from 'classnames'

import { MenuModel } from 'src/models'
import { Link } from 'src/router'
import { SnackbarPanel } from 'src/components'
import { snackbarsClose } from 'src/store'

import styles from './MobileMenu.sass'
import { getLanguagesList } from 'src/store/lib/pages/helpers'
import { changeUserLanguage } from '../../store/lib/pages/actions'

@connect(mapStateToProps, mapDispatchToProps)
export default class MobileMenu extends React.Component {

  static propTypes = {
    url: PropTypes.string,
    menus: PropTypes.arrayOf(MenuModel),
    onClose: PropTypes.func,
    changeLanguage: PropTypes.func,
    userLanguage: PropTypes.string,
  }

  getLangsOptionsList(){
    const langList = getLanguagesList()

    return langList.map((lang, i) => (<option key={i} value={lang.code}>{lang.name}</option>))
  }

  render () {
    const { menus, userLanguage } = this.props
    return (
      <SnackbarPanel onClose={() => this.props.onClose()} side='top'>
        <style jsx>{styles}</style>
        <div className='root mobile-menu'>
          <div className='wrap'>
            <div className='top'>
              <Link route='/'>
                <a className='logo'>
                  <img className='logo-mobile' src='/static/images/logo/logo-mobile-header.svg' />
                </a>
              </Link>
            </div>
            <div className='content'>
              <ul>
                {menus.map(m => (
                  <li key={m.id} className={cn({
                    'border-bottom': m.isComposite()
                  })}>
                    {m.isComposite()
                      ? [
                          <label key={1} className='product-item-wrapper'>
                            <span>Products</span>
                            <span className='lang-select-wrapper'>
                              <select className='form-group lang-select' value={userLanguage} onChange={(e) => this.props.changeLanguage(e.target.value)}>
                                { this.getLangsOptionsList() }
                              </select>
                              <span className='select-icon-wrapper'>
                                <svg className='select-icon' viewBox='0 0 24 24'>
                                  <path d='M7 10l5 5 5-5z'></path>
                                </svg>
                              </span>
                            </span>
                          </label>,
                        <ul key={2} className='compact'>
                          {m.children.map(child => (
                            <li key={child.id}>
                              {m.isRoute()
                                ? (
                                  <Link route={child.url}>
                                    <a>
                                      {!child.icon32x32 ? null : (
                                        <img className='icon-large' src={child.icon32x32.url} />
                                      )}
                                      <b>{child.title}</b>
                                    </a>
                                  </Link>
                                )
                                : (
                                  <a href={child.url} target='_blank' rel='noopener noreferrer'>
                                    {!child.icon32x32 ? null : (
                                      <img className='icon-large' src={child.icon32x32.url} />
                                    )}
                                    <b>{child.title}</b>
                                  </a>
                                )
                              }
                            </li>
                          ))}
                        </ul>
                      ]
                      : (
                        m.isRoute()
                          ? (
                            <Link route={m.url}>
                              <a>{m.title}</a>
                            </Link>
                          )
                          : (
                            m.symbol != null
                              ? (
                                <ul className='compact'>
                                  <li className='highlight'>
                                    <a href={m.url} target='_blank' rel='noopener noreferrer'>
                                      <img src={m.symbol.url} />
                                      {m.title}
                                    </a>
                                  </li>
                                </ul>
                              )
                              : (
                                <a href={m.url} target='_blank' rel='noopener noreferrer'>
                                  {m.title}
                                </a>
                              )
                          )
                      )
                    }
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </SnackbarPanel>
    )
  }
}

function mapStateToProps (state) {
  return {
    menus: state.pages.menus.array.filter(m => m.isVisibleInHeader),
    userLanguage: state.pages.userLanguage
  }
}

function mapDispatchToProps (dispatch) {
  return {
    onClose: () => dispatch(snackbarsClose()),
    changeLanguage: (value) => {
      dispatch(changeUserLanguage(value))
    },
  }
}

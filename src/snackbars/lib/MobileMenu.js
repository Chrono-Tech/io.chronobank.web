import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import cn from 'classnames'

import { MenuModel } from 'src/models'
import { Link } from 'src/router'
import { SnackbarPanel } from 'src/components'
import { snackbarsClose } from 'src/store'

import styles from './MobileMenu.sass'

@connect(mapStateToProps, mapDispatchToProps)
export default class MobileMenu extends React.Component {

  static propTypes = {
    url: PropTypes.string,
    menus: PropTypes.arrayOf(MenuModel),
    onClose: PropTypes.func
  }

  render () {
    const { menus } = this.props
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
                        <label key={1}>Products</label>,
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
    menus: state.pages.menus.array.filter(m => m.isVisibleInHeader)
  }
}

function mapDispatchToProps (dispatch) {
  return {
    onClose: () => dispatch(snackbarsClose())
  }
}

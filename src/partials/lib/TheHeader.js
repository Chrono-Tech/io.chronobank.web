import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import cn from 'classnames'
import moment from 'moment'

import { Link } from 'src/router'
import { DropdownMenuWithOptions, DropdownMenu } from 'src/components'
import * as dialogs from 'src/dialogs'
import * as snackbars from 'src/snackbars'
import { EventsRotator } from 'dropins/events/src/components'
import { HeaderModel, MenuModel, PostModel, LanguageModel, ProductModel } from 'src/models'
import { EventModel } from 'dropins/events/src/models'
import { eventsEnqueue } from 'dropins/events/src/store'
import { modalsOpen, snackbarsOpen, headerSelector, productSelector, changeUserLanguage, constantSelector, menuSelector, monthsShortSelector } from 'src/store'
import ExchangesPanel from './ExchangesPanel'

import styles from './TheHeader.sass'

@connect(mapStateToProps, mapDispatchToProps)
export default class TheHeader extends React.Component {

  static propTypes = {
    headerSlug: PropTypes.string,
    productSlug: PropTypes.string,
    header: PropTypes.instanceOf(HeaderModel),
    product: PropTypes.instanceOf(ProductModel),
    showVideo: PropTypes.func,
    showMobileMenu: PropTypes.func,
    eventsShow: PropTypes.func,
    changeLanguage: PropTypes.func,
    menuSelector: PropTypes.func,
    openContactDialog: PropTypes.func,
    userLanguage: PropTypes.string,
    languages: PropTypes.arrayOf(LanguageModel),
    menus: PropTypes.arrayOf(
      PropTypes.instanceOf(MenuModel)
    ),
    posts: PropTypes.arrayOf(
      PropTypes.instanceOf(PostModel)
    ),
    constants: PropTypes.func,
  }

  componentDidMount () {
    const events = this.props.posts.map((p) => new EventModel({
      id: p.id,
      status: 'new',
      url: p.url,
      title: p.title,
      date: p.publishedDate,
    }))

    let index = 0
    this.props.eventsShow(events[index % events.length])
    index++
    this.eventsInterval = setInterval(() => {
      this.props.eventsShow(events[index % events.length])
      index++
    }, 5000)
  }

  componentWillUnmount () {
    clearInterval(this.eventsInterval)
    this.eventsInterval = null
  }

  render () {
    const { menus, header, languages, userLanguage, constants, headerSlug, menuSelector, product } = this.props
    const loginMenuItem = menuSelector('Login')
    const productsMenuItem = menuSelector('Our Products')

    return (
      <header className={cn('root', 'the-header', headerSlug, {
        'background-dark': header.background === 'dark',
        'background-light': header.background === 'light',
        'stereotype-default': header.stereotype === 'default',
        'stereotype-splash': header.stereotype === 'splash',
        'stereotype-product': header.stereotype === 'product',
        'stereotype-text': header.stereotype === 'text',
      })}
      >
        <style jsx>{styles}</style>
        <div className='image'>
          {!header.image ? null : (
            <img
              className='image-1280'
              {...{
                src: header.image.url,
                srcSet: header.image2x ? `${header.image2x.url} 2x` : undefined,
              }}
            />
          )}
          {!header.image320 ? null : (
            <img
              className='image-320'
              {...{
                src: header.image320.url,
              }}
            />
          )}
          {!header.image480 ? null : (
            <img
              className='image-480'
              {...{
                src: header.image480.url,
              }}
            />
          )}
          {!header.image640 ? null : (
            <img
              className='image-640'
              {...{
                src: header.image640.url,
                srcSet: header.image2x640 ? `${header.image2x640.url} 2x` : undefined,
              }}
            />
          )}
        </div>
        { !(product && product.icon) ? null : (
          <div className='project-icon-block-wrapper'>
            <div className='project-icon-block'>
              <div className='project-icon-wrapper'>
                <img
                  className='project-icon'
                  {...{
                    src: product.icon.url,
                  }}
                />
              </div>
              {
                product.iconText ? (<div className='project-icon-text' dangerouslySetInnerHTML={{ __html: product.iconText }} />) : null
              }
            </div>
          </div>
        )}
        <div className='wrap'>
          <div className='top'>
            <div className='logo'>
              <Link route='/'>
                <a>
                  <img className='logo-desktop' src='/static/images/logo/logo-chrono-bank-full.svg' />
                </a>
              </Link>
            </div>
            <div className='menu-desktop'>
              <ul>
                {menus.map((m) => (
                  <li key={m.id}>
                    {m.isComposite()
                      ? (
                        <div className='dropdown'>
                          <a className='link'>{m.title}</a>
                          <ul className='dropdown-panel'>
                            {m.children.map((child) => (
                              <li key={child.id}>
                                {child.isRoute()
                                  ? (
                                    <Link route={child.url}>
                                      <div className='product'>
                                        <div className='product-icon'>
                                          {!child.icon40x40 ? null : (
                                            <img src={child.icon40x40.url} />
                                          )}
                                        </div>
                                        <div className='product-info'>
                                          <div className='info-title'>{child.title}</div>
                                          {!child.subtitle ? null : (
                                            <div className='info-details' dangerouslySetInnerHTML={{ __html: child.subtitle }} />
                                          )}
                                        </div>
                                      </div>
                                    </Link>
                                  )
                                  : (
                                    <a href={child.url} className={cn({ 'link-rounded': m.style === 'rounded' })} target='_blank' rel='noopener noreferrer'>
                                      <div className='product'>
                                        <div className='product-icon'>
                                          {!child.icon40x40 ? null : (
                                            <img src={child.icon40x40.url} />
                                          )}
                                        </div>
                                        <div className='product-info'>
                                          <div className='info-title'>{child.title}</div>
                                          {!child.subtitle ? null : (
                                            <div className='info-details' dangerouslySetInnerHTML={{ __html: child.subtitle }} />
                                          )}
                                        </div>
                                      </div>
                                    </a>
                                  )
                                }
                              </li>
                            ))}
                          </ul>
                        </div>
                      )
                      : (
                        m.isRoute()
                          ? (
                            <Link route={m.url}>
                              <a className={cn('link', { 'link-rounded': m.style === 'rounded' })}>
                                {m.symbol == null ? null : (
                                  <img src='/static/images/symbols/login.svg' />
                                )}
                                <span>{m.title}</span>
                              </a>
                            </Link>
                          )
                          : (
                            <a className={cn('link', { 'link-rounded': m.style === 'rounded' })} href={m.url} target='_blank' rel='noopener noreferrer'>
                              {m.symbol == null ? null : (
                                <img src='/static/images/symbols/login.svg' />
                              )}
                              <span>{m.title}</span>
                            </a>
                          )
                      )
                    }
                  </li>
                ))}
                <li className='lang-selector'>
                  <DropdownMenuWithOptions
                    value={userLanguage}
                    options={languages.map((lang) => ({
                      value: lang.key,
                      title: `${lang.key && lang.key.toUpperCase()} - ${lang.title}`,
                    }))}
                    className='language'
                    onChange={(value) => this.props.changeLanguage(value)}
                  />
                </li>
                {
                  productsMenuItem ?
                    (<li className='our-products'>
                      <DropdownMenu
                        buttonText={productsMenuItem.title}
                        buttonClassName={cn('our-products-button')}
                        menu={
                          <div className='our-products-wrapper'>
                            {productsMenuItem.children.map((child, i) => (
                              <Link key={i} route={child.url}>
                                <div className='our-products-inner'>
                                  <div className='our-products-content'>
                                    <div className='our-products-img'>
                                      {!child.icon40x40 ? null : (
                                        <img src={child.icon40x40.url} width='40' />
                                      )}
                                    </div>
                                    <div className='our-products-text'>
                                      <div className='our-products-title'>{child.title}</div>
                                      <div className='our-products-subtitle'>{constants('learn-more')}</div>
                                    </div>
                                  </div>
                                  { child.projectLink ? (
                                    <a href={child.projectLink} onClick={(e) => {
                                      e.stopPropagation()
                                      e.nativeEvent.stopImmediatePropagation()
                                      return false
                                    }} className='our-products-project-nav'>
                                      <div className='our-products-project-nav-text'>{child.projectLinkText}</div>
                                    </a>
                                  ): null }
                                </div>
                              </Link>
                            ))}
                          </div>
                        }
                      />
                    </li>)
                    : null
                }
              </ul>
            </div>
            <div className='menu-mobile'>
              <a className='dropdown-toggle dropdown-toggle-light' onClick={() => this.props.showMobileMenu()}><img src='/static/images/symbols/menu-white.svg' /></a>
              <a className='dropdown-toggle dropdown-toggle-dark' onClick={() => this.props.showMobileMenu()}><img src='/static/images/symbols/menu-blue.svg' /></a>
              <div className='menu-buttons'>
                <DropdownMenuWithOptions
                  value={userLanguage}
                  options={languages.map((lang) => ({
                    value: lang.key,
                    title: `${lang.key && lang.key.toUpperCase()} - ${lang.title}`,
                  }))}
                  className='language'
                  onChange={(value) => this.props.changeLanguage(value)}

                />
                {
                  productsMenuItem ?
                    (<li className='our-products'>
                      <DropdownMenu
                        buttonText={productsMenuItem.title}
                        buttonClassName={cn('our-products-button')}
                        menu={
                          <div className='our-products-wrapper'>
                            {productsMenuItem.children.map((child, i) => (
                              <Link key={i} route={child.url}>
                                <div className='our-products-inner'>
                                  <div className='our-products-content'>
                                    <div className='our-products-img'>
                                      {!child.icon40x40 ? null : (
                                        <img src={child.icon40x40.url} width='40' />
                                      )}
                                    </div>
                                    <div className='our-products-text'>
                                      <div className='our-products-title'>{child.title}</div>
                                      <div className='our-products-subtitle'>{constants('learn-more')}</div>
                                    </div>
                                  </div>
                                  { child.projectLink ? (
                                    <a href={child.projectLink} onClick={(e) => {
                                      e.stopPropagation()
                                      e.nativeEvent.stopImmediatePropagation()
                                      return false
                                    }} className='our-products-project-nav'>
                                      <div className='our-products-project-nav-text'>{child.projectLinkText}</div>
                                    </a>
                                  ): null }
                                </div>
                              </Link>
                            ))}
                          </div>
                        }
                      />
                    </li>)
                    : null
                }

              </div>
            </div>
          </div>
          <div className='news'>
            <EventsRotator />
          </div>
          <div className='content'>
            <div className='text' dangerouslySetInnerHTML={{ __html: header.brief }} />
            {
              product && Array.isArray(product.links) ? product.links.filter((link) => link.isVisibleInHeader).map((link, i) => {
                return (
                  <a
                    key={i}
                    id={`nav-link-${link.slug}`}
                    className={cn('nav-link')}
                    href={link.link}
                  >
                    {link.text}
                  </a>
                )
              }) : null
            }
            {!header.video ? null : (
              <div className='video'>
                <a onClick={() => this.props.showVideo(header.video)}>
                  <img src='/static/images/svg/play-circle.svg' />
                  <span>{ constants('watch-the-introduction') }</span>
                </a>
              </div>
            )}
          </div>
        </div>
        {headerSlug !== 'main-page' ? null : (
          <div className='index-panel'>
            <div className='wrap'>

              <div className='panel-news'>
                <div className='panel-header'>
                  <div className='header-wrapper'>
                    <div className='header-news'>{constants('news')}</div>
                  </div>
                </div>
                <div className='panel-content'>
                  {this.props.posts.map((post) => (
                    <div key={post.id} className='news-item'>
                      <div className='news-item-date'>{moment(post.publishedDate).format('MMM D')}</div>
                      <a className='news-item-text' href={post.url}>{post.title}</a>
                    </div>
                  ))}
                </div>
              </div>

              <div className='panel-rates'>
                <div className='panel-header'>
                  <div className='header-wrapper'>
                    <div className='header-exchange'>{constants('buy-time-tokens')}</div>
                  </div>
                </div>
                <div className='panel-content'>
                  <ExchangesPanel />
                </div>
              </div>

            </div>
          </div>
        )}
      </header>
    )
  }
}

function mapStateToProps (state, op) {
  return {
    header: headerSelector(op.headerSlug)(state),
    product: productSelector(op.productSlug)(state),
    menus: state.pages.menus.array.filter((m) => m.isVisibleInHeader),
    menuSelector: menuSelector(state),
    posts: state.pages.posts.array,
    languages: state.pages.languages.array,
    userLanguage: state.pages.userLanguage,
    constants: constantSelector(state),
  }
}

function mapDispatchToProps (dispatch) {
  return {
    monthsShortSelector: (lang) => monthsShortSelector(lang),
    changeLanguage: (value) => {
      dispatch(changeUserLanguage(value))
    },
    showVideo: (url) => {
      dispatch(modalsOpen({
        component: dialogs.VideoDialog,
        props: {
          url,
        },
      }))
    },
    showMobileMenu: () => [
      dispatch(snackbarsOpen({
        component: snackbars.MobileMenu,
        props: {},
      })),
    ],
    eventsShow: (event: EventModel) => dispatch(eventsEnqueue(event, 1)),
    openContactDialog: () => {
      dispatch(modalsOpen({
        component: dialogs.ContactSendDialog,
        props: {},
      }))
    },
  }
}

import {
  PAGES_INIT_ARTICLES,
  PAGES_INIT_CONTACTS,
  PAGES_INIT_FAQ_TOPICS,
  PAGES_INIT_FEATURES,
  PAGES_INIT_GALLERIES,
  PAGES_INIT_HEADERS,
  PAGES_INIT_ITERATIONS,
  PAGES_INIT_JOBS,
  PAGES_INIT_MEMBERS,
  PAGES_INIT_MENUS,
  PAGES_INIT_PAPERS,
  PAGES_INIT_PARTNERS,
  PAGES_INIT_POSTS,
  PAGES_INIT_PRODUCTS,
  PAGES_INIT_SOCIALS,
  PAGES_INIT_STATISTICS,
  PAGES_INIT_STORIES,
  PAGES_INIT_TESTIMONIALS,
} from './actions'

import Cookies from 'universal-cookie'
let jsonData = require('cldr-data')
import Cldr from 'cldrjs'
// console.log('reducer', Cookies, Cldr)
import { makeArrayState, fromJS } from './helpers'

export {
  makeArrayState,
  fromJS
}

const cookies = new Cookies();
console.log('cookies', cookies.get('language'))
const cldr = new Cldr(cookies.get('language'))
console.log('reducer', cookies.get('language'), cldr.attributes.language)

const initialState = {
  articles: makeArrayState(false, []),
  contacts: makeArrayState(false, []),
  faqTopics: makeArrayState(false, []),
  features: makeArrayState(false, []),
  galleries: makeArrayState(false, []),
  headers: makeArrayState(false, []),
  iterations: makeArrayState(false, []),
  jobs: makeArrayState(false, []),
  members: makeArrayState(false, []),
  menus: makeArrayState(false, []),
  papers: makeArrayState(false, []),
  partners: makeArrayState(false, []),
  posts: makeArrayState(false, []),
  products: makeArrayState(false, []),
  socials: makeArrayState(false, []),
  statistics: makeArrayState(false, []),
  stories: makeArrayState(false, []),
  testimonials: makeArrayState(false, []),
  locale: cldr && cldr.attributes.language
}

export default (state = initialState, action) => {
  switch (action.type) {
    case PAGES_INIT_HEADERS:
      return { ...state, headers: makeArrayState(true, action.headers) }
    case PAGES_INIT_MENUS:
      return { ...state, menus: makeArrayState(true, action.menus) }
    case PAGES_INIT_JOBS:
      return { ...state, jobs: makeArrayState(true, action.jobs) }
    case PAGES_INIT_FAQ_TOPICS:
      return { ...state, faqTopics: makeArrayState(true, action.faqTopics) }
    case PAGES_INIT_FEATURES:
      return { ...state, features: makeArrayState(true, action.features) }
    case PAGES_INIT_STATISTICS:
      return { ...state, statistics: makeArrayState(true, action.statistics) }
    case PAGES_INIT_MEMBERS:
      return { ...state, members: makeArrayState(true, action.members) }
    case PAGES_INIT_PARTNERS:
      return { ...state, partners: makeArrayState(true, action.partners) }
    case PAGES_INIT_POSTS:
      return { ...state, posts: makeArrayState(true, action.posts) }
    case PAGES_INIT_STORIES:
      return { ...state, stories: makeArrayState(true, action.stories) }
    case PAGES_INIT_ARTICLES:
      return { ...state, articles: makeArrayState(true, action.articles) }
    case PAGES_INIT_ITERATIONS:
      return { ...state, iterations: makeArrayState(true, action.iterations) }
    case PAGES_INIT_TESTIMONIALS:
      return { ...state, testimonials: makeArrayState(true, action.testimonials) }
    case PAGES_INIT_CONTACTS:
      return { ...state, contacts: makeArrayState(true, action.contacts) }
    case PAGES_INIT_SOCIALS:
      return { ...state, socials: makeArrayState(true, action.socials) }
    case PAGES_INIT_PAPERS:
      return { ...state, papers: makeArrayState(true, action.papers) }
    case PAGES_INIT_PRODUCTS:
      return { ...state, products: makeArrayState(true, action.products) }
    case PAGES_INIT_GALLERIES:
      return { ...state, galleries: makeArrayState(true, action.galleries) }
    default:
      return state
  }
}

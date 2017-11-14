import {
  PAGES_INIT_MENUS,
  PAGES_INIT_ARTICLES,
  PAGES_INIT_FEATURES,
  PAGES_INIT_PARTNERS,
  PAGES_INIT_POSTS,
  PAGES_INIT_STORIES,
  PAGES_INIT_TESTIMONIALS,
  PAGES_INIT_ITERATIONS,
  PAGES_INIT_CONTACTS,
  PAGES_INIT_SOCIALS,
  PAGES_INIT_PAPERS,
  PAGES_INIT_GALLERIES
} from './actions'

const initialState = {
  menus: Object.freeze([]),
  articles: Object.freeze([]),
  features: Object.freeze([]),
  partners: Object.freeze([]),
  posts: Object.freeze([]),
  iterations: Object.freeze([]),
  testimonials: Object.freeze([]),
  stories: Object.freeze([]),
  contacts: Object.freeze([]),
  socials: Object.freeze([]),
  papers: Object.freeze([]),
  galleries: Object.freeze([]),
}

export default (state = initialState, action) => {
  switch (action.type) {
    case PAGES_INIT_MENUS:
      return { ...state, menus: Object.freeze([...action.menus]) }
    case PAGES_INIT_FEATURES:
      return { ...state, features: Object.freeze([...action.features]) }
    case PAGES_INIT_PARTNERS:
      return { ...state, partners: Object.freeze([...action.partners]) }
    case PAGES_INIT_POSTS:
      return { ...state, posts: Object.freeze([...action.posts]) }
    case PAGES_INIT_STORIES:
      return { ...state, stories: Object.freeze([...action.stories]) }
    case PAGES_INIT_ARTICLES:
      return { ...state, articles: Object.freeze([...action.articles]) }
    case PAGES_INIT_ITERATIONS:
      return { ...state, iterations: Object.freeze([...action.iterations]) }
    case PAGES_INIT_TESTIMONIALS:
      return { ...state, testimonials: Object.freeze([...action.testimonials]) }
    case PAGES_INIT_CONTACTS:
      return { ...state, contacts: Object.freeze([...action.contacts]) }
    case PAGES_INIT_SOCIALS:
      return { ...state, socials: Object.freeze([...action.socials]) }
    case PAGES_INIT_PAPERS:
      return { ...state, papers: Object.freeze([...action.papers]) }
    case PAGES_INIT_GALLERIES:
      return { ...state, galleries: Object.freeze([...action.galleries]) }
    default:
      return state
  }
}

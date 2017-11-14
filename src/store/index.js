import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'

import modals from './lib/modals/reducer'
import snackbars from './lib/snackbars/reducer'
import events from './lib/events/reducer'
import pages from './lib/pages/reducer'

export * from './lib/modals/actions'
export * from './lib/snackbars/actions'
export * from './lib/events/actions'
export * from './lib/pages/actions'

import {
  ArticleModel,
  FeatureModel,
  PartnerModel,
  PostModel,
  IterationModel,
  TestimonialModel,
  StoryModel,
  ContactModel,
  SocialModel,
  PaperModel,
  MenuModel
} from 'src/models'

export default (initialState = {}) => {
  const reducer = combineReducers({
    modals,
    snackbars,
    events,
    pages
  })
  const p = initialState.pages
  return createStore(reducer, {
    pages: !p ? null : {
      ...p,
      menus: p.menus.map(MenuModel.fromJS),
      articles: p.articles.map(ArticleModel.fromJS),
      features: p.features.map(FeatureModel.fromJS),
      partners: p.partners.map(PartnerModel.fromJS),
      posts: p.posts.map(PostModel.fromJS),
      iterations: p.iterations.map(IterationModel.fromJS),
      testimonials: p.testimonials.map(TestimonialModel.fromJS),
      stories: p.stories.map(StoryModel.fromJS),
      contacts: p.contacts.map(ContactModel.fromJS),
      socials: p.socials.map(SocialModel.fromJS),
      papers: p.papers.map(PaperModel.fromJS),
    }
  }, composeWithDevTools(applyMiddleware(thunkMiddleware)))
}

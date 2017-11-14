import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import { omitBy, isNil } from 'lodash'

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
  MenuModel,
  GalleryModel
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
    pages: !p ? null : omitBy({
      ...p,
      menus: p.menus && p.menus.map(MenuModel.fromJS),
      articles: p.articles && p.articles.map(ArticleModel.fromJS),
      features: p.features && p.features.map(FeatureModel.fromJS),
      partners: p.partners && p.partners.map(PartnerModel.fromJS),
      posts: p.posts && p.posts.map(PostModel.fromJS),
      iterations: p.iterations && p.iterations.map(IterationModel.fromJS),
      testimonials: p.testimonials && p.testimonials.map(TestimonialModel.fromJS),
      stories: p.stories && p.stories.map(StoryModel.fromJS),
      contacts: p.contacts && p.contacts.map(ContactModel.fromJS),
      socials: p.socials && p.socials.map(SocialModel.fromJS),
      papers: p.papers && p.papers.map(PaperModel.fromJS),
      galleries: p.galleries && p.galleries.map(GalleryModel.fromJS),
    }, isNil)
  }, composeWithDevTools(applyMiddleware(thunkMiddleware)))
}

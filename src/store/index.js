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

import { ArticleModel, FeatureModel, PartnerModel, PostModel, IterationModel, TestimonialModel, StoryModel } from 'src/models'

export default (initialState = {}) => {
  // console.log(initialState)
  const reducer = combineReducers({
    modals,
    snackbars,
    events,
    pages
  })
  return createStore(reducer, {
    pages: !initialState.pages ? null : {
      ...initialState.pages,
      articles: initialState.pages.articles.map(ArticleModel.fromJS),
      features: initialState.pages.features.map(FeatureModel.fromJS),
      partners: initialState.pages.partners.map(PartnerModel.fromJS),
      posts: initialState.pages.posts.map(PostModel.fromJS),
      iterations: initialState.pages.iterations.map(IterationModel.fromJS),
      testimonials: initialState.pages.testimonials.map(TestimonialModel.fromJS),
      stories: initialState.pages.stories.map(StoryModel.fromJS),
    }
  }, composeWithDevTools(applyMiddleware(thunkMiddleware)))
}

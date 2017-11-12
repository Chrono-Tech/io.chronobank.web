import { BACKEND } from 'src/endpoints'

import { ArticleModel, FeatureModel, PartnerModel, PostModel, IterationModel, TestimonialModel, StoryModel } from 'src/models'

export const PAGES_INIT_FEATURES = 'pages/INIT_FEATURES'
export const PAGES_INIT_PARTNERS = 'pages/INIT_PARTNERS'
export const PAGES_INIT_STORIES = 'pages/INIT_STORIES'
export const PAGES_INIT_ARTICLES = 'pages/INIT_ARTICLES'
export const PAGES_INIT_TESTIMONIALS = 'pages/INIT_TESTIMONIALS'
export const PAGES_INIT_ITERATIONS = 'pages/INIT_ITERATIONS'
export const PAGES_INIT_POSTS = 'pages/INIT_POSTS'
export const PAGES_INIT_CONTACTS = 'pages/INIT_CONTACTS'
export const PAGES_INIT_SOCIALS = 'pages/INIT_SOCIALS'
export const PAGES_INIT_PAPERS = 'pages/INIT_PAPERS'

export const initFeatures = () => async (dispatch) => {
  const { data } = await BACKEND.get('features')
  return dispatch({
    type: PAGES_INIT_FEATURES,
    features: data.features.map(FeatureModel.fromServerModel)
  })
}

export const initPartners = () => async (dispatch) => {
  const { data } = await BACKEND.get('partners')
  return dispatch({
    type: PAGES_INIT_PARTNERS,
    partners: data.partners.map(PartnerModel.fromServerModel)
  })
}

export const initStories = () => async (dispatch) => {
  const { data } = await BACKEND.get('stories')
  return dispatch({
    type: PAGES_INIT_STORIES,
    stories: data.stories.map(StoryModel.fromServerModel)
  })
}

export const initArticles = () => async (dispatch) => {
  const { data } = await BACKEND.get('articles')
  return dispatch({
    type: PAGES_INIT_ARTICLES,
    articles: data.articles.map(ArticleModel.fromServerModel)
  })
}

export const initTestimonials = () => async (dispatch) => {
  const { data } = await BACKEND.get('testimonials')
  return dispatch({
    type: PAGES_INIT_TESTIMONIALS,
    testimonials: data.testimonials.map(TestimonialModel.fromServerModel)
  })
}

export const initIterations = () => async (dispatch) => {
  const { data } = await BACKEND.get('iterations')
  return dispatch({
    type: PAGES_INIT_ITERATIONS,
    iterations: data.iterations.map(IterationModel.fromServerModel)
  })
}

export const initPosts = () => async (dispatch) => {
  const { data } = await BACKEND.get('medium/feed')
  return dispatch({
    type: PAGES_INIT_POSTS,
    posts: data.map(PostModel.fromServerModel)
  })
}

export const initContacts = () => async (dispatch) => {
  const { data } = await BACKEND.get('contacts')
  return dispatch({type: PAGES_INIT_CONTACTS, contacts: data.contacts })
}

export const initSocials = () => async (dispatch) => {
  const { data } = await BACKEND.get('socials')
  return dispatch({type: PAGES_INIT_SOCIALS, socials: data.socials })
}

export const initPapers = () => async (dispatch) => {
  const { data } = await BACKEND.get('papers')
  return dispatch({type: PAGES_INIT_PAPERS, papers: data.papers })
}

export const initIndexPage = () => (dispatch) => {
  return Promise.all([
    dispatch(initFeatures()),
    dispatch(initPartners()),
    dispatch(initStories()),
    dispatch(initArticles()),
    dispatch(initPosts()),
    dispatch(initTestimonials()),
    dispatch(initIterations()),
    dispatch(initContacts()),
    dispatch(initSocials()),
    dispatch(initPapers())
  ])
}

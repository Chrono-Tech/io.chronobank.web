import { BACKEND } from 'src/endpoints'
BACKEND.get('stories').then((stories) => {
  console.log('stories', stories)
})
import Cookies from 'universal-cookie'

import {
  ArticleModel,
  ContactModel,
  FaqTopicModel,
  FeatureModel,
  GalleryModel,
  HeaderModel,
  IterationModel,
  JobModel,
  MemberModel,
  MenuModel,
  PaperModel,
  PartnerModel,
  PostModel,
  ProductModel,
  SocialModel,
  StatisticModel,
  StoryModel,
  TestimonialModel,
} from 'src/models'

export const PAGES_INIT_ARTICLES = 'pages/INIT_ARTICLES'
export const PAGES_INIT_CONTACTS = 'pages/INIT_CONTACTS'
export const PAGES_INIT_FAQ_TOPICS = 'pages/INIT_FAQ_TOPICS'
export const PAGES_INIT_FEATURES = 'pages/INIT_FEATURES'
export const PAGES_INIT_GALLERIES = 'pages/INIT_GALLERIES'
export const PAGES_INIT_HEADERS = 'pages/INIT_HEADERS'
export const PAGES_INIT_ITERATIONS = 'pages/INIT_ITERATIONS'
export const PAGES_INIT_JOBS = 'pages/INIT_JOBS'
export const PAGES_INIT_MEMBERS = 'pages/INIT_MEMBERS'
export const PAGES_INIT_MENUS = 'pages/INIT_MENUS'
export const PAGES_INIT_PAPERS = 'pages/INIT_PAPERS'
export const PAGES_INIT_PARTNERS = 'pages/INIT_PARTNERS'
export const PAGES_INIT_POSTS = 'pages/INIT_POSTS'
export const PAGES_INIT_PRODUCTS = 'pages/INIT_PRODUCTS'
export const PAGES_INIT_SOCIALS = 'pages/INIT_SOCIALS'
export const PAGES_INIT_STATISTICS = 'pages/INIT_STATISTICS'
export const PAGES_INIT_STORIES = 'pages/INIT_STORIES'
export const PAGES_INIT_TESTIMONIALS = 'pages/INIT_TESTIMONIALS'

export const initMenus = () => async (dispatch, getState) => {
  const state = getState()
  if (state.pages.menus.isLoaded) {
    return
  }
  const { data } = await BACKEND.get('menus')
  return dispatch({
    type: PAGES_INIT_MENUS,
    menus: data.map(MenuModel.fromServerModel)
  })
}

export const initFeatures = () => async (dispatch, getState) => {
  const state = getState()

  const locale = state.locale

  if (state.pages.features.isLoaded) {
    return
  }
  const { data } = await BACKEND.get('features')
  return dispatch({
    type: PAGES_INIT_FEATURES,
    features: data.features.map((feature) => FeatureModel.fromServerModel(feature, { locale }))
  })
}

export const initFaqTopics = () => async (dispatch, getState) => {
  const state = getState()
  if (state.pages.faqTopics.isLoaded) {
    return
  }
  const { data } = await BACKEND.get('faq-topics')
  return dispatch({
    type: PAGES_INIT_FAQ_TOPICS,
    faqTopics: data.map(FaqTopicModel.fromServerModel)
  })
}

export const initJobs = () => async (dispatch, getState) => {
  const state = getState()
  if (state.pages.jobs.isLoaded) {
    return
  }
  const { data } = await BACKEND.get('jobs')
  return dispatch({
    type: PAGES_INIT_JOBS,
    jobs: data.jobs.map(JobModel.fromServerModel)
  })
}

export const initStatistics = () => async (dispatch, getState) => {
  const state = getState()

  const locale = state.locale

  if (state.pages.statistics.isLoaded) {
    return
  }
  const { data } = await BACKEND.get('statistics')
  return dispatch({
    type: PAGES_INIT_STATISTICS,
    statistics: data.statistics.map((statistic) => StatisticModel.fromServerModel(statistic, { locale }))
  })
}

export const initMembers = () => async (dispatch, getState) => {
  const state = getState()
  if (state.pages.members.isLoaded) {
    return
  }
  const { data } = await BACKEND.get('members')
  return dispatch({
    type: PAGES_INIT_MEMBERS,
    members: data.members.map(MemberModel.fromServerModel)
  })
}

export const initHeaders = () => async (dispatch, getState) => {
  const state = getState()

  const locale = state.locale

  if (state.pages.headers.isLoaded) {
    return
  }
  const { data } = await BACKEND.get('headers')
  return dispatch({
    type: PAGES_INIT_HEADERS,
    headers: data.headers.map((header) => HeaderModel.fromServerModel(header, { locale }))
  })
}

export const initPartners = () => async (dispatch, getState) => {
  const state = getState()
  if (state.pages.partners.isLoaded) {
    return
  }
  const { data } = await BACKEND.get('partners')
  return dispatch({
    type: PAGES_INIT_PARTNERS,
    partners: data.partners.map(PartnerModel.fromServerModel)
  })
}

export const initProducts = () => async (dispatch, getState) => {
  const state = getState()
  if (state.pages.products.isLoaded) {
    return
  }
  const { data } = await BACKEND.get('products')
  return dispatch({
    type: PAGES_INIT_PRODUCTS,
    products: data.products.map(ProductModel.fromServerModel)
  })
}

export const initStories = () => async (dispatch, getState) => {
  const state = getState()

  const locale = state.locale

  if (state.pages.stories.isLoaded) {
    return
  }
  const { data } = await BACKEND.get('stories')
  return dispatch({
    type: PAGES_INIT_STORIES,
    stories: data.stories.map((story) => StoryModel.fromServerModel(story, { locale }))
  })
}

export const initArticles = () => async (dispatch, getState) => {
  const state = getState()
  if (state.pages.articles.isLoaded) {
    return
  }
  const { data } = await BACKEND.get('articles')
  return dispatch({
    type: PAGES_INIT_ARTICLES,
    articles: data.articles.map(ArticleModel.fromServerModel)
  })
}

export const initTestimonials = () => async (dispatch, getState) => {
  const state = getState()
  if (state.pages.testimonials.isLoaded) {
    return
  }
  const { data } = await BACKEND.get('testimonials')
  return dispatch({
    type: PAGES_INIT_TESTIMONIALS,
    testimonials: data.testimonials.map(TestimonialModel.fromServerModel)
  })
}

export const initIterations = () => async (dispatch, getState) => {
  const state = getState()

  const locale = state.locale

  if (state.pages.iterations.isLoaded) {
    return
  }
  const { data } = await BACKEND.get('iterations')
  return dispatch({
    type: PAGES_INIT_ITERATIONS,
    iterations: data.iterations.map((iteration) => IterationModel.fromServerModel(iteration, { locale }))
  })
}

export const initPosts = () => async (dispatch, getState) => {
  const state = getState()
  if (state.pages.posts.isLoaded) {
    return
  }
  const { data } = await BACKEND.get('medium/feed')
  return dispatch({
    type: PAGES_INIT_POSTS,
    posts: data.map(PostModel.fromServerModel)
  })
}

export const initContacts = () => async (dispatch, getState) => {
  const state = getState()
  if (state.pages.contacts.isLoaded) {
    return
  }
  const { data } = await BACKEND.get('contacts')
  return dispatch({
    type: PAGES_INIT_CONTACTS,
    contacts: data.contacts.map(ContactModel.fromServerModel)
  })
}

export const initSocials = () => async (dispatch, getState) => {
  const state = getState()
  if (state.pages.socials.isLoaded) {
    return
  }
  const { data } = await BACKEND.get('socials')
  return dispatch({
    type: PAGES_INIT_SOCIALS,
    socials: data.socials.map(SocialModel.fromServerModel)
  })
}

export const initPapers = () => async (dispatch, getState) => {
  const state = getState()
  if (state.pages.papers.isLoaded) {
    return
  }
  const { data } = await BACKEND.get('papers')
  return dispatch({
    type: PAGES_INIT_PAPERS,
    papers: data.papers.map(PaperModel.fromServerModel)
  })
}

export const initGalleries = () => async (dispatch, getState) => {
  const state = getState()
  if (state.pages.galleries.isLoaded) {
    return
  }
  const { data } = await BACKEND.get('galleries')
  return dispatch({
    type: PAGES_INIT_GALLERIES,
    galleries: data.galleries.map(GalleryModel.fromServerModel)
  })
}

export const initAnyPage = () => (dispatch) => {
  return Promise.all([
    dispatch(initHeaders()),
    dispatch(initMenus()),
    dispatch(initContacts()),
    dispatch(initSocials()),
    dispatch(initPapers()),
    dispatch(initPosts()),
    dispatch(initProducts())
  ])
}

export const initIndexPage = () => (dispatch) => {
  return Promise.all([
    dispatch(initFeatures()),
    dispatch(initPartners()),
    dispatch(initStories()),
    dispatch(initArticles()),
    dispatch(initTestimonials()),
    dispatch(initIterations()),
    dispatch(initAnyPage())
  ])
}

export const initTeamPage = () => (dispatch) => {
  return Promise.all([
    dispatch(initGalleries()),
    dispatch(initMembers()),
    dispatch(initStatistics()),
    dispatch(initJobs()),
    dispatch(initAnyPage())
  ])
}

export const initFaqPage = () => (dispatch) => {
  return Promise.all([
    dispatch(initFaqTopics()),
    dispatch(initAnyPage())
  ])
}

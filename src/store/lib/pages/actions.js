import moment from 'moment'
import { BACKEND } from 'src/endpoints'

import {
  ArticleModel,
  ConstantModel,
  ContactModel,
  FaqTopicModel,
  FeatureModel,
  GalleryModel,
  HeaderModel,
  IterationModel,
  JobModel,
  LanguageModel,
  MemberModel,
  MenuModel,
  PaperModel,
  PartnerModel,
  ExchangeModel,
  PostModel,
  ProductModel,
  SocialModel,
  StatisticModel,
  StoryModel,
  TestimonialModel,
  TitleModel,
} from 'src/models'

import {
  userLanguageFromCookies,
  userLanguageFromBrowser,
  USER_LANGUAGE_COOKIE_KEY,
  STORAGE_TELEGRAM_PIN,
  getLanguageByKey,
  getFirstLanguage,
  getValueLocalStorage,
  monthsShortSelector,
} from './selectors'

export const PAGES_INIT_ARTICLES = 'pages/INIT_ARTICLES'
export const PAGES_INIT_CONTACTS = 'pages/INIT_CONTACTS'
export const PAGES_INIT_CONSTANTS = 'pages/INIT_CONSTANTS'
export const PAGES_INIT_FAQ_TOPICS = 'pages/INIT_FAQ_TOPICS'
export const PAGES_INIT_FEATURES = 'pages/INIT_FEATURES'
export const PAGES_INIT_GALLERIES = 'pages/INIT_GALLERIES'
export const PAGES_INIT_HEADERS = 'pages/INIT_HEADERS'
export const PAGES_INIT_ITERATIONS = 'pages/INIT_ITERATIONS'
export const PAGES_INIT_JOBS = 'pages/INIT_JOBS'
export const PAGES_INIT_LANGUAGES = 'pages/INIT_LANGUAGES'
export const PAGES_INIT_MEMBERS = 'pages/INIT_MEMBERS'
export const PAGES_INIT_MENUS = 'pages/INIT_MENUS'
export const PAGES_INIT_PAPERS = 'pages/INIT_PAPERS'
export const PAGES_INIT_PARTNERS = 'pages/INIT_PARTNERS'
export const PAGES_INIT_EXCHANGES = 'pages/INIT_EXCHANGES'
export const PAGES_INIT_POSTS = 'pages/INIT_POSTS'
export const PAGES_INIT_PRODUCTS = 'pages/INIT_PRODUCTS'
export const PAGES_INIT_SOCIALS = 'pages/INIT_SOCIALS'
export const PAGES_INIT_STATISTICS = 'pages/INIT_STATISTICS'
export const PAGES_INIT_STORIES = 'pages/INIT_STORIES'
export const PAGES_INIT_TESTIMONIALS = 'pages/INIT_TESTIMONIALS'
export const PAGES_INIT_TITLES = 'pages/INIT_TITLES'
export const PAGES_SET_VISIBLE_TELEGRAM_BAR = 'pages/SET_VISIBLE_TELEGRAM_BAR'
export const PAGES_SET_USER_LANGUAGE = 'pages/SET_USER_LANGUAGE'

export const initMenus = () => async (dispatch, getState) => {
  const state = getState()
  if (state.pages.menus.isLoaded) {
    return
  }
  const locale = state.pages.userLanguage

  const { data } = await BACKEND.get('menus')
  return dispatch({
    type: PAGES_INIT_MENUS,
    menus: data.map((item) => MenuModel.fromServerModel(item, { locale })),
  })
}

export const initFeatures = () => async (dispatch, getState) => {
  const state = getState()

  const locale = state.pages.userLanguage

  if (state.pages.features.isLoaded) {
    return
  }
  const { data } = await BACKEND.get('features')
  return dispatch({
    type: PAGES_INIT_FEATURES,
    features: data.features.map((feature) => FeatureModel.fromServerModel(feature, { locale })),
  })
}

export const initFaqTopics = () => async (dispatch, getState) => {
  const state = getState()

  const locale = state.pages.userLanguage

  if (state.pages.faqTopics.isLoaded) {
    return
  }
  const { data } = await BACKEND.get('faq-topics')
  return dispatch({
    type: PAGES_INIT_FAQ_TOPICS,
    faqTopics: data.map((topic) => FaqTopicModel.fromServerModel(topic, { locale })),
  })
}

export const initJobs = () => async (dispatch, getState) => {
  const state = getState()

  const locale = state.pages.userLanguage

  if (state.pages.jobs.isLoaded) {
    return
  }
  const { data } = await BACKEND.get('jobs')
  return dispatch({
    type: PAGES_INIT_JOBS,
    jobs: data.jobs.map((job) => JobModel.fromServerModel(job, { locale })),
  })
}

export const initStatistics = () => async (dispatch, getState) => {
  const state = getState()

  const locale = state.pages.userLanguage

  if (state.pages.statistics.isLoaded) {
    return
  }
  const { data } = await BACKEND.get('statistics')
  return dispatch({
    type: PAGES_INIT_STATISTICS,
    statistics: data.statistics.map((statistic) => StatisticModel.fromServerModel(statistic, { locale })),
  })
}

export const initMembers = () => async (dispatch, getState) => {
  const state = getState()

  const locale = state.pages.userLanguage

  if (state.pages.members.isLoaded) {
    return
  }
  const { data } = await BACKEND.get('members')
  return dispatch({
    type: PAGES_INIT_MEMBERS,
    members: data.members.map((member) => MemberModel.fromServerModel(member, { locale })),
  })
}

export const initTitles = () => async (dispatch, getState) => {
  const state = getState()

  const locale = state.pages.userLanguage

  if (state.pages.members.isLoaded) {
    return
  }
  const { data } = await BACKEND.get('titles')
  return dispatch({
    type: PAGES_INIT_TITLES,
    titles: data.titles.map((title) => TitleModel.fromServerModel(title, { locale })),
  })
}

export const initHeaders = () => async (dispatch, getState) => {
  const state = getState()

  const locale = state.pages.userLanguage

  if (state.pages.headers.isLoaded) {
    return
  }
  const { data } = await BACKEND.get('headers')
  return dispatch({
    type: PAGES_INIT_HEADERS,
    headers: data.headers.map((header) => HeaderModel.fromServerModel(header, { locale })),
  })
}

export const initPartners = () => async (dispatch, getState) => {
  const state = getState()

  const locale = state.pages.userLanguage

  if (state.pages.partners.isLoaded) {
    return
  }
  const { data } = await BACKEND.get('partners')
  return dispatch({
    type: PAGES_INIT_PARTNERS,
    partners: data.partners.map((data) => PartnerModel.fromServerModel(data, { locale })),
  })
}

export const initExchanges = () => async (dispatch, getState) => {
  const state = getState()

  const locale = state.pages.userLanguage

  if (state.pages.exchanges.isLoaded) {
    return
  }
  const { data } = await BACKEND.get('exchanges')
  return dispatch({
    type: PAGES_INIT_EXCHANGES,
    exchanges: data.exchanges.map((data) => ExchangeModel.fromServerModel(data, { locale })),
  })
}

export const initProducts = () => async (dispatch, getState) => {
  const state = getState()

  const locale = state.pages.userLanguage

  if (state.pages.products.isLoaded) {
    return
  }
  const { data } = await BACKEND.get('products')
  return dispatch({
    type: PAGES_INIT_PRODUCTS,
    products: data.products.map((product) => ProductModel.fromServerModel(product, { locale })),
  })
}

export const initStories = () => async (dispatch, getState) => {
  const state = getState()

  const locale = state.pages.userLanguage

  if (state.pages.stories.isLoaded) {
    return
  }
  const { data } = await BACKEND.get('stories')
  return dispatch({
    type: PAGES_INIT_STORIES,
    stories: data.stories.map((story) => StoryModel.fromServerModel(story, { locale })),
  })
}

export const initArticles = () => async (dispatch, getState) => {
  const state = getState()

  const locale = state.pages.userLanguage

  if (state.pages.articles.isLoaded) {
    return
  }

  const { data } = await BACKEND.get('articles')
  return dispatch({
    type: PAGES_INIT_ARTICLES,
    articles: data.articles.map((item) => ArticleModel.fromServerModel(item, { locale })),
  })
}

export const initTestimonials = () => async (dispatch, getState) => {
  const state = getState()

  const locale = state.pages.userLanguage

  if (state.pages.testimonials.isLoaded) {
    return
  }
  const { data } = await BACKEND.get('testimonials')
  return dispatch({
    type: PAGES_INIT_TESTIMONIALS,
    testimonials: data.testimonials.map((data) => TestimonialModel.fromServerModel(data, { locale })),
  })
}

export const initIterations = () => async (dispatch, getState) => {
  const state = getState()

  const locale = state.pages.userLanguage

  if (state.pages.iterations.isLoaded) {
    return
  }
  const { data } = await BACKEND.get('iterations')
  return dispatch({
    type: PAGES_INIT_ITERATIONS,
    iterations: data.iterations.map((iteration) => IterationModel.fromServerModel(iteration, { locale })),
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
    posts: data.map(PostModel.fromServerModel),
  })
}

export const initContacts = () => async (dispatch, getState) => {
  const state = getState()
  if (state.pages.contacts.isLoaded) {
    return
  }
  const { data } = await BACKEND.get('contacts')

  const locale = state.pages.userLanguage

  return dispatch({
    type: PAGES_INIT_CONTACTS,
    contacts: data.contacts.map((item) => ContactModel.fromServerModel(item, { locale })),
  })
}

export const initConstants = () => async (dispatch, getState) => {
  const state = getState()
  if (state.pages.constants.isLoaded) {
    return
  }

  const locale = state.pages.userLanguage

  const { data } = await BACKEND.get('constants')

  return dispatch({
    type: PAGES_INIT_CONSTANTS,
    constants: data.constants.map((item) => ConstantModel.fromServerModel(item, { locale })),
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
    socials: data.socials.map(SocialModel.fromServerModel),
  })
}

export const initPapers = () => async (dispatch, getState) => {
  const state = getState()
  if (state.pages.papers.isLoaded) {
    return
  }

  const locale = state.pages.userLanguage

  const { data } = await BACKEND.get('papers')
  return dispatch({
    type: PAGES_INIT_PAPERS,
    papers: data.papers.map((item) => PaperModel.fromServerModel(item, { locale })),
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
    galleries: data.galleries.map(GalleryModel.fromServerModel),
  })
}

export const initLanguages = () => async (dispatch, getState) => {
  const state = getState()
  if (state.pages.languages.isLoaded) {
    return
  }
  const { data } = await BACKEND.get('languages')
  return dispatch({
    type: PAGES_INIT_LANGUAGES,
    languages: data.languages.map(LanguageModel.fromServerModel),
  })
}

export const initUserLanguage = (req) => async (dispatch, getState) => {
  if (req) {
    await dispatch(initLanguages())
    const state = getState()
    let language = userLanguageFromCookies(req.headers)(state)
      || userLanguageFromBrowser(req.headers)(state)

    const isLanguageAvailable = getLanguageByKey(language)(state)

    if (!isLanguageAvailable) {
      language = getFirstLanguage(state)
    }

    dispatch(setUserLanguage(language))
  }
}

export const setUserLanguage = (userLanguage) => (dispatch) => {
  return dispatch({
    type: PAGES_SET_USER_LANGUAGE,
    userLanguage,
  })
}

export const changeUserLanguage = (lang) => (dispatch) => {
  dispatch(setUserLanguage(lang))
  if (typeof window !== 'undefined') {
    window.document.cookie = `${USER_LANGUAGE_COOKIE_KEY}=${lang}`
  }

  if (typeof document !== 'undefined'){
    document.location.reload(true)
  }
}

export const setVisibleTelegramBar = (telegramPin) => (dispatch) => {
  dispatch(saveToSessionStorage(STORAGE_TELEGRAM_PIN, telegramPin))

  return dispatch({
    type: PAGES_SET_VISIBLE_TELEGRAM_BAR,
    telegramPin,
  })
}

export const saveToSessionStorage = (key, value) => () => {
  if (typeof sessionStorage !== 'undefined') {
    sessionStorage.setItem(key, value)
  }
}

export const initTelegramPin = () => (dispatch) => {
  if (typeof sessionStorage !== 'undefined') {
    let telegramPin = getValueLocalStorage(STORAGE_TELEGRAM_PIN)(sessionStorage) !== 'false'

    dispatch(setVisibleTelegramBar(telegramPin))
  }
}

export const initMomentLocale = () => (dispatch, getState) => {
  const state = getState()
  const userLang = state.pages.userLanguage
  const months = monthsShortSelector()(userLang)
  if (months) {
    moment.locale(userLang, { monthsShort: months })
  } else {
    moment.locale(userLang)
  }
}

export const initAnyPage = () => async (dispatch) => {
  return Promise.all([
    dispatch(initHeaders()),
    dispatch(initMenus()),
    dispatch(initContacts()),
    dispatch(initConstants()),
    dispatch(initSocials()),
    dispatch(initPapers()),
    dispatch(initPosts()),
    dispatch(initProducts()),
    dispatch(initExchanges()),
    dispatch(initTitles()),
    dispatch(initMomentLocale()),
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
    dispatch(initAnyPage()),
  ])
}

export const initTeamPage = () => (dispatch) => {
  return Promise.all([
    dispatch(initGalleries()),
    dispatch(initMembers()),
    dispatch(initStatistics()),
    dispatch(initJobs()),
    dispatch(initAnyPage()),
  ])
}

export const initFaqPage = () => (dispatch) => {
  return Promise.all([
    dispatch(initFaqTopics()),
    dispatch(initAnyPage()),
  ])
}

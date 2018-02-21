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
import locale from 'locale'

export const USER_LANGUAGE_COOKIE_KEY = 'userLanguage'

export const makeArrayState = (isLoaded: Boolean, array: Array, transform: Function) => Object.freeze({
  isLoaded,
  array: Object.freeze(transform ? array.map(transform) : [...array])
})

export const fromJS = p => {
  return {
    articles: p.articles && makeArrayState(p.articles.isLoaded, p.articles.array, ArticleModel.fromJS),
    contacts: p.contacts && makeArrayState(p.contacts.isLoaded, p.contacts.array, ContactModel.fromJS),
    faqTopics: p.faqTopics && makeArrayState(p.faqTopics.isLoaded, p.faqTopics.array, FaqTopicModel.fromJS),
    features: p.features && makeArrayState(p.features.isLoaded, p.features.array, FeatureModel.fromJS),
    galleries: p.galleries && makeArrayState(p.galleries.isLoaded, p.galleries.array, GalleryModel.fromJS),
    headers: p.headers && makeArrayState(p.headers.isLoaded, p.headers.array, HeaderModel.fromJS),
    iterations: p.iterations && makeArrayState(p.iterations.isLoaded, p.iterations.array, IterationModel.fromJS),
    jobs: p.jobs && makeArrayState(p.jobs.isLoaded, p.jobs.array, JobModel.fromJS),
    members: p.members && makeArrayState(p.members.isLoaded, p.members.array, MemberModel.fromJS),
    menus: p.menus && makeArrayState(p.menus.isLoaded, p.menus.array, MenuModel.fromJS),
    papers: p.papers && makeArrayState(p.papers.isLoaded, p.papers.array, PaperModel.fromJS),
    partners: p.partners && makeArrayState(p.partners.isLoaded, p.partners.array, PartnerModel.fromJS),
    posts: p.posts && makeArrayState(p.posts.isLoaded, p.posts.array, PostModel.fromJS),
    products: p.products && makeArrayState(p.products.isLoaded, p.products.array, ProductModel.fromJS),
    socials: p.socials && makeArrayState(p.socials.isLoaded, p.socials.array, SocialModel.fromJS),
    statistics: p.statistics && makeArrayState(p.statistics.isLoaded, p.statistics.array, StatisticModel.fromJS),
    stories: p.stories && makeArrayState(p.stories.isLoaded, p.stories.array, StoryModel.fromJS),
    testimonials: p.testimonials && makeArrayState(p.testimonials.isLoaded, p.testimonials.array, TestimonialModel.fromJS),
    userLocales: p.userLocales
  }
}

export const getLanguagesList = (langSelected) => {
  return [
    { code: 'en', name: 'Eng'},
    { code: 'ru', name: 'Rus'},
    { code: 'cn', name: 'Chn'},
    { code: 'de', name: 'Deu'},
    { code: 'ko', name: 'Kor'},
    { code: 'ja', name: 'Jpn'},
    { code: 'ms', name: 'Msa'},
    { code: 'th', name: 'Tha'},
    { code: 'es', name: 'Spa'},
    { code: 'vi', name: 'Vie'},
    { code: 'ar', name: 'Ara'}
  ].map((item) => ({
      ...item,
      selected: langSelected == item.code ? true : false
    }))
}


export const getUserLanguageFromCookies = (headersCookie) => {
  let cookies

  if (typeof window === 'undefined'){
    cookies = headersCookie
  } else {
    cookies = document.cookie
  }

  if (!cookies) {
    return
  }

  let langCookieSource = cookies.split('; ').find((source) => (source.indexOf(`${USER_LANGUAGE_COOKIE_KEY}=`) > -1) )

  if (!langCookieSource) {
    return
  }
  return langCookieSource.split(`${USER_LANGUAGE_COOKIE_KEY}=`)[1]
}

export const getSupposedUserLanguage = (locales) => {
  let userLocales = new locale.Locales(locales)
  let defaultLanguages = getLanguagesList().map((source) => source.code)
  let storyLanguages = Object.keys(defaultLanguages)

  let supportedLocales = new locale.Locales(storyLanguages)
  let bestLocale = userLocales.best(supportedLocales)

  let lang = bestLocale && bestLocale.language

  return lang
}
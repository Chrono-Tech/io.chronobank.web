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

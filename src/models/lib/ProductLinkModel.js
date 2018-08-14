import { LangFieldSet } from './helpers'

export default class ProductLinkModel {
  constructor ({ id, slug, name, text, link, isVisibleInContent, isVisibleInHeader }) {
    this.id = id
    this.slug = slug
    this.name = name
    this.text = text
    this.link = link
    this.isVisibleInContent = isVisibleInContent
    this.isVisibleInHeader = isVisibleInHeader

    Object.freeze(this)
  }

  static fromJS (data) {
    return data == null ? data : new ProductLinkModel({
      ...data,
    })
  }

  static fromServerModel (data, { locale }) {
    let localeModelFields = new LangFieldSet(data, locale)

    return data == null ? data : new ProductLinkModel({
      // eslint-disable-next-line no-underscore-dangle
      id: data._id,
      slug: data.slug,
      name: data.name,
      text: localeModelFields.getLocaleField('text'),
      link: data.link,
      isVisibleInHeader: data.isVisibleInHeader,
      isVisibleInContent: data.isVisibleInContent,
    })
  }
}

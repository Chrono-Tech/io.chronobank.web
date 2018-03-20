import { LangFieldSet } from './helpers'

export default class ProductDescriptionModel {
  constructor ({ id, slug, title, subtitle, details }) {
    this.id = id
    this.slug = slug
    this.title = title
    this.subtitle = subtitle
    this.details = details
    Object.freeze(this)
  }

  static fromJS (data) {
    return data == null ? data : new ProductDescriptionModel({
      ...data,
    })
  }

  static fromServerModel (data, { locale }) {
    let localeModelFields = new LangFieldSet(data, locale)

    return data == null ? data : new ProductDescriptionModel({
      // eslint-disable-next-line no-underscore-dangle
      id: data._id,
      slug: data.slug,
      title: localeModelFields.getLocaleField('title') ,
      subtitle: localeModelFields.getLocaleField('subtitle'),
      details: localeModelFields.getLocaleField('details'),

    })
  }
}

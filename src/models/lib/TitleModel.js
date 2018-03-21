import { LangFieldSet } from "./helpers"

export default class TitleModel {
  constructor ({ slug, name, title, subtitle, stereotype }) {
    this.slug = slug
    this.name = name
    this.title = title
    this.subtitle = subtitle
    this.stereotype = stereotype
    Object.freeze(this)
  }

  static fromJS (data) {
    return data == null ? null : new TitleModel({
      ...data,
    })
  }

  static fromServerModel (data, { locale }) {
    let localeModelFields = new LangFieldSet(data, locale)

    return data == null ? null : new TitleModel({
      slug: data.slug,
      name: data.name,
      title: localeModelFields.getLocaleField('title'),
      subtitle: localeModelFields.getLocaleField('subtitle'),
      stereotype: data.stereotype,
    })
  }
}

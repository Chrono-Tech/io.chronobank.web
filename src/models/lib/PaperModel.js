import { LangFieldSet } from './helpers'

export default class PaperModel {
  constructor ({ id, title, url }) {
    this.id = id
    this.title = title
    this.url = url
    Object.freeze(this)
  }

  static fromJS (data) {
    return data == null ? null : new PaperModel({
      ...data,
    })
  }

  static fromServerModel (data, { locale }) {
    let localeModelFields = new LangFieldSet(data, locale)

    return data == null ? null : new PaperModel({
      // eslint-disable-next-line no-underscore-dangle
      id: data._id,
      title: localeModelFields.getLocaleField('title'),
      url: data.url,
    })
  }
}

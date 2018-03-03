import { LangFieldSet } from './helpers'

export default class FaqQuestionModel {
  constructor ({ id, name, title, brief }) {
    this.id = id
    this.name = name
    this.title = title
    this.brief = brief
    Object.freeze(this)
  }

  static fromJS (data) {
    return data == null ? null : new FaqQuestionModel({
      ...data,
    })
  }

  static fromServerModel (data, { locale }) {
    const localeModelFields = new LangFieldSet(data, locale)
    
    return data == null ? null : new FaqQuestionModel({
      // eslint-disable-next-line no-underscore-dangle
      id: data._id,
      name: data.name,
      title: localeModelFields.getLocaleField('title'),
      brief: localeModelFields.getLocaleField('brief'),
    })
  }
}

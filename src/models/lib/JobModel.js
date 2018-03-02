import { LangFieldSet } from './helpers'

export default class JobModel {
  constructor ({ id, title, brief, details }) {
    this.id = id
    this.title = title
    this.brief = brief
    this.details = details
    Object.freeze(this)
  }

  static fromJS (data) {
    return data == null ? data : new JobModel({
      ...data,
    })
  }

  static fromServerModel (data, { locale }) {
    let localeModelFields = new LangFieldSet(data, locale)

    return data == null ? data : new JobModel({
      // eslint-disable-next-line no-underscore-dangle
      id: data._id,
      title: localeModelFields.getLocaleField('title'),
      brief: localeModelFields.getLocaleField('brief'),
      details: localeModelFields.getLocaleField('details'),
    })
  }
}

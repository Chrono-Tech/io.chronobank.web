import { getLocaleModelFields } from './helpers'

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
      ...data
    })
  }

  static fromServerModel (data, { locale }) {
    let localeModelFields = getLocaleModelFields(data, locale)

    return data == null ? data : new JobModel({
      id: data._id,
      title: localeModelFields && 'title' in localeModelFields ? localeModelFields.title : data.title,
      brief: localeModelFields && 'brief' in localeModelFields ? localeModelFields.brief : data.brief,
      details: localeModelFields && 'details' in localeModelFields ? localeModelFields.details : data.details
    })
  }
}

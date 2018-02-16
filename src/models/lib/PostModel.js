import assert from 'assert'
import { getLocaleModelFields } from './helpers'

export default class PostModel {
  constructor ({ id, title, url, image, publishedDate }) {
    this.id = id
    this.title = title
    this.url = url
    this.image = image // just a string
    assert(publishedDate == null || publishedDate instanceof Date)
    this.publishedDate = publishedDate
    Object.freeze(this)
  }

  static fromJS (data) {
    return data== null ? data : new PostModel({
      ...data,
      publishedDate: data.publishedDate == null ? null : new Date(data.publishedDate)
    })
  }

  static fromServerModel (data, { locales }) {
    let localeModelFields = getLocaleModelFields(data, locales)

    return data == null ? null : new PostModel({
      id: data.guid,
      title: localeModelFields && 'title' in localeModelFields ? localeModelFields.title : data.title,
      url: data.url,
      image: data.image,
      publishedDate: new Date(data.publishedDate)
    })
  }
}

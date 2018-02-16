import assert from 'assert'
import ImageModel from './ImageModel'
import { getLocaleModelFields } from './helpers'

export default class ProductDistroModel {
  constructor ({ id, title, type, url, icon }) {
    this.id = id
    this.title = title
    this.type = type
    this.url = url
    assert(icon == null || icon instanceof ImageModel)
    this.icon = icon
    Object.freeze(this)
  }

  static fromJS (data) {
    return data == null ? data : new ProductDistroModel({
      ...data,
      icon: ImageModel.fromJS(data.icon)
    })
  }

  static fromServerModel (data, { locales }) {
    let localeModelFields = getLocaleModelFields(data, locales)

    return data == null ? data : new ProductDistroModel({
      id: data._id,
      title: localeModelFields && 'title' in localeModelFields ? localeModelFields.title : data.title ,
      type: data.type,
      url: data.url,
      icon: data.icon
        ? ImageModel.fromServerModel(data.icon)
        : null
    })
  }
}

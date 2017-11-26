import assert from 'assert'
import ImageModel from './ImageModel'

export default class ProductDownloadModel {
  constructor ({ id, title, url, icon }) {
    this.id = id
    this.title = title
    this.url = url
    assert(icon == null || icon instanceof ImageModel)
    this.icon = icon
    Object.freeze(this)
  }

  static fromJS (data) {
    return data == null ? data : new ProductDownloadModel({
      ...data,
      icon: ImageModel.fromJS(data.icon)
    })
  }

  static fromServerModel (data) {
    return data == null ? data : new ProductDownloadModel({
      id: data._id,
      title: data.title,
      url: data.url,
      icon: data.icon
        ? ImageModel.fromServerModel(data.icon)
        : null
    })
  }
}

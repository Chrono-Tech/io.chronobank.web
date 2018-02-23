import assert from 'assert'
import ImageModel from './ImageModel'

export default class SocialModel {
  constructor ({ id, title, url, icon32x32 }) {
    this.id = id
    this.title = title
    this.url = url
    assert(icon32x32 == null || icon32x32 instanceof ImageModel)
    this.icon32x32 = icon32x32
    Object.freeze(this)
  }

  static fromJS (data) {
    return data == null ? data : new SocialModel({
      ...data,
      icon32x32: ImageModel.fromJS(data.icon32x32),
    })
  }

  static fromServerModel (data) {
    return data == null ? data : new SocialModel({
      // eslint-disable-next-line no-underscore-dangle
      id: data._id,
      title: data.title,
      url: data.url,
      icon32x32: ImageModel.fromServerModel(data.icon32x32),
    })
  }
}

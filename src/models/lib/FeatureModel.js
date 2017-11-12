import assert from 'assert'
import ImageModel from './ImageModel'

export default class FeatureModel {
  constructor ({ id, title, image, brief }) {
    this.id = id
    this.title = title
    assert(image == null || image instanceof ImageModel)
    this.image = image
    this.brief = brief
    Object.freeze(this)
  }

  static fromJS (data) {
    return data == null ? data : new FeatureModel({
      ...data,
      image: ImageModel.fromJS(data.image)
    })
  }

  static fromServerModel (data) {
    return data == null ? data : new FeatureModel({
      id: data._id,
      title: data.title,
      brief: data.brief,
      image: ImageModel.fromServerModel(data.image)
    })
  }
}

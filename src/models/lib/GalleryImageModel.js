import assert from 'assert'
import ImageModel from './ImageModel'

export default class GalleryImageModel {
  constructor ({ id, title, image }) {
    this.id = id
    this.title = title
    assert(image == null || image instanceof ImageModel)
    this.image = image
    Object.freeze(this)
  }

  static fromJS (data) {
    return data == null ? data : new GalleryImageModel({
      ...data,
      image: ImageModel.fromJS(data.image),
    })
  }

  static fromServerModel (data) {
    return data == null ? data : new GalleryImageModel({
      // eslint-disable-next-line no-underscore-dangle
      id: data._id,
      title: data.title,
      image: data.image
        ? ImageModel.fromServerModel(data.image)
        : null,
    })
  }
}

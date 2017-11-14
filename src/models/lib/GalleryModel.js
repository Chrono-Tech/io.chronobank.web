import assert from 'assert'
import ImageModel from './ImageModel'

export default class GalleryModel {
  constructor ({ id, name, images }) {
    this.id = id
    this.name = name
    assert(images == null || !images.find(child => !(child instanceof ImageModel)))
    this.images = images
    Object.freeze(this)
  }

  static fromJS (data) {
    return data == null ? data : new GalleryModel({
      ...data,
      images: data.images == null ? null : data.images.map(ImageModel.fromJS),
    })
  }

  static fromServerModel (data) {
    return data == null ? data : new GalleryModel({
      id: data._id,
      name: data.name,
      images: data.images == null ? null : data.images.map(ImageModel.fromServerModel),
    })
  }
}

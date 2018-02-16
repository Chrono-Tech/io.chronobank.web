import assert from 'assert'
import GalleryImageModel from './GalleryImageModel'
import { getLocaleModelFields } from './helpers'

export default class GalleryModel {
  constructor ({ id, name, images }) {
    this.id = id
    this.name = name
    assert(images == null || !images.find(child => !(child instanceof GalleryImageModel)))
    this.images = images
    Object.freeze(this)
  }

  static fromJS (data) {
    return data == null ? data : new GalleryModel({
      ...data,
      images: data.images == null ? null : data.images.map(GalleryImageModel.fromJS),
    })
  }

  static fromServerModel (data, { locales }) {
    let localeModelFields = getLocaleModelFields(data, locales)

    return data == null ? data : new GalleryModel({
      id: data._id,
      name: localeModelFields && 'name' in localeModelFields ? localeModelFields.name : data.name,
      images: data.images == null ? null : data.images.map(GalleryImageModel.fromServerModel),
    })
  }
}

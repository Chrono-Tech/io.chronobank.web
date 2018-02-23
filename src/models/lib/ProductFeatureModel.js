import assert from 'assert'
import ImageModel from './ImageModel'
import { getLocaleModelFields } from './helpers'

export default class ProductFeatureModel {
  constructor ({ id, title, image, image2x }) {
    this.id = id
    this.title = title
    assert(image == null || image instanceof ImageModel)
    this.image = image
    assert(image2x == null || image2x instanceof ImageModel)
    this.image2x = image2x
    Object.freeze(this)
  }

  static fromJS (data) {
    return data == null ? data : new ProductFeatureModel({
      ...data,
      image: ImageModel.fromJS(data.image),
      image2x: ImageModel.fromJS(data.image2x),
    })
  }

  static fromServerModel (data, { locales }) {
    let localeModelFields = getLocaleModelFields(data, locales)

    return data == null ? data : new ProductFeatureModel({
      // eslint-disable-next-line no-underscore-dangle
      id: data._id,
      title: localeModelFields && 'title' in localeModelFields ? localeModelFields.title : data.title ,
      image: data.image
        ? ImageModel.fromServerModel(data.image)
        : null,
      image2x: data.image2x
        ? ImageModel.fromServerModel(data.image2x)
        : null,
    })
  }
}

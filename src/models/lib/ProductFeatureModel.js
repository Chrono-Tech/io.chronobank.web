import assert from 'assert'
import ImageModel from './ImageModel'
import { LangFieldSet } from './helpers'

export default class ProductFeatureModel {
  constructor ({ id, title, brief, image, image2x }) {
    this.id = id
    this.title = title
    this.brief = brief
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

  static fromServerModel (data, { locale }) {
    let localeModelFields = new LangFieldSet(data, locale)

    return data == null ? data : new ProductFeatureModel({
      // eslint-disable-next-line no-underscore-dangle
      id: data._id,
      title: localeModelFields.getLocaleField('title') ,
      brief: localeModelFields.getLocaleField('brief') ,
      image: data.image
        ? ImageModel.fromServerModel(data.image)
        : null,
      image2x: data.image2x
        ? ImageModel.fromServerModel(data.image2x)
        : null,
    })
  }
}

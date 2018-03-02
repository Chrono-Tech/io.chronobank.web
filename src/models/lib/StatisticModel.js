import assert from 'assert'
import ImageModel from './ImageModel'
import { LangFieldSet } from './helpers'

export default class StatisticModel {
  constructor ({ id, title, image, brief }) {
    this.id = id
    this.title = title
    assert(image == null || image instanceof ImageModel)
    this.image = image
    this.brief = brief
    Object.freeze(this)
  }

  static fromJS (data) {
    return data == null ? data : new StatisticModel({
      ...data,
      image: ImageModel.fromJS(data.image),
    })
  }

  static fromServerModel (data, { locale }) {
    let localeModelFields = new LangFieldSet(data, locale)

    return data == null ? data : new StatisticModel({
      // eslint-disable-next-line no-underscore-dangle
      id: data._id,
      title: localeModelFields.getLocaleField('title') ,
      brief: localeModelFields.getLocaleField('brief') ,
      image: ImageModel.fromServerModel(data.image),
    })
  }
}

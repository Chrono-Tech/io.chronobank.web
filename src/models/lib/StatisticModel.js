import assert from 'assert'
import ImageModel from './ImageModel'

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
      image: ImageModel.fromJS(data.image)
    })
  }

  static fromServerModel (data, { locale }) {
    const isActiveLocale = locale && data.i18n[locale] && data.i18n[locale].isActive

    return data == null ? data : new StatisticModel({
      id: data._id,
      title: data.title,
      brief: isActiveLocale ? data.i18n[locale].brief : data.brief,
      image: ImageModel.fromServerModel(data.image)
    })
  }
}

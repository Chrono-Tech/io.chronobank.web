import assert from 'assert'
import ImageModel from './ImageModel'

export default class IterationModel {
  constructor ({ id, title, date, image, brief }) {
    this.id = id
    this.title = title
    assert(date == null || date instanceof Date)
    this.date = date
    assert(image == null || image instanceof ImageModel)
    this.image = image
    this.brief = brief
    Object.freeze(this)
  }

  static fromJS (data) {
    return data == null ? data : new IterationModel({
      ...data,
      date: data.date == null ? null : new Date(data.date),
      image: ImageModel.fromJS(data.image)
    })
  }

  static fromServerModel (data, { locale }) {
    const isActiveLocale = locale && data.i18n[locale] && data.i18n[locale].isActive

    return data == null ? data : new IterationModel({
      id: data._id,
      title: data.title,
      brief: isActiveLocale ? data.i18n[locale].brief : data.brief,
      date: data.date == null ? null : new Date(data.date),
      image: ImageModel.fromServerModel(data.image)
    })
  }
}

import assert from 'assert'
import ImageModel from './ImageModel'
import { getLocaleModelFields } from './helpers'

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
    let localeModelFields = getLocaleModelFields(data, locale)

    return data == null ? data : new IterationModel({
      id: data._id,
      title: localeModelFields && 'titles' in localeModelFields ? localeModelFields.title : data.title ,
      brief: localeModelFields && 'brief' in localeModelFields ? localeModelFields.brief : data.brief ,
      date: data.date == null ? null : new Date(data.date),
      image: ImageModel.fromServerModel(data.image)
    })
  }
}

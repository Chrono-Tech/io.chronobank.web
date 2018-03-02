import assert from 'assert'
import ImageModel from './ImageModel'
import { LangFieldSet } from './helpers'

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
      image: ImageModel.fromJS(data.image),
    })
  }

  static fromServerModel (data, { locale }) {
    let localeModelFields = new LangFieldSet(data, locale)

    return data == null ? data : new IterationModel({
      // eslint-disable-next-line no-underscore-dangle
      id: data._id,
      title: localeModelFields.getLocaleField('title'),
      brief: localeModelFields.getLocaleField('brief'),
      date: data.date == null ? null : new Date(data.date),
      image: ImageModel.fromServerModel(data.image),
    })
  }
}

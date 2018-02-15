import assert from 'assert'
import ImageModel from './ImageModel'
import { getLocaleModelFields } from './helpers'

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

  static fromServerModel (data, { locales }) {
    let localeModelFields = getLocaleModelFields(data, locales)
    if (localeModelFields){
      console.log('statistic', localeModelFields, data, locales)
    }

    return data == null ? data : new StatisticModel({
      id: data._id,
      title: localeModelFields && 'title' in localeModelFields ? localeModelFields.title : data.title ,
      brief: localeModelFields && 'brief' in localeModelFields ? localeModelFields.brief : data.brief ,
      image: ImageModel.fromServerModel(data.image)
    })
  }
}

import assert from 'assert'
import ImageModel from './ImageModel'
import { getLocaleModelFields } from './helpers'

export default class StoryModel {
  constructor ({ id, title, stereotype, background, image, image2x, legend, brief }) {
    this.id = id
    this.title = title
    this.stereotype = stereotype
    this.background = background
    assert(image == null || image instanceof ImageModel)
    this.image = image
    assert(image2x == null || image2x instanceof ImageModel)
    this.image2x = image2x
    this.legend = legend
    this.brief = brief
    Object.freeze(this)
  }

  static fromJS (data) {
    return data == null ? null : new StoryModel({
      ...data,
      image: ImageModel.fromJS(data.image),
      image2x: ImageModel.fromJS(data.image2x),
    })
  }

  static fromServerModel (data, { locales }) {
    let localeModelFields = getLocaleModelFields(data, locales)

    return data == null ? null : new StoryModel({
      id: data._id,
      title: data.title,
      stereotype: data.stereotype,
      background: data.background,
      brief: localeModelFields && 'brief' in localeModelFields ? localeModelFields.brief : data.brief ,
      legend: localeModelFields && 'legend' in localeModelFields ? localeModelFields.legend : data.legend,
      image: ImageModel.fromServerModel(data.image, { locales }),
      image2x: ImageModel.fromServerModel(data.image2x, { locales })
    })
  }
}

import assert from 'assert'
import ImageModel from './ImageModel'
import {LangFieldSet} from './helpers'

export default class ArticleModel {
  constructor ({ id, title, source, url, icon, icon2x, brief }) {
    this.id = id
    this.title = title
    this.source = source
    this.url = url
    assert(icon == null || icon instanceof ImageModel)
    this.icon = icon
    assert(icon2x == null || icon2x instanceof ImageModel)
    this.icon2x = icon2x
    this.brief = brief
    Object.freeze(this)
  }

  static fromJS (data) {
    return data == null ? null : new ArticleModel({
      ...data,
      icon: ImageModel.fromJS(data.icon),
      icon2x: ImageModel.fromJS(data.icon2x),
    })
  }

  static fromServerModel (data, { locale }) {
    let localeModelFields = new LangFieldSet(data, locale)

    return data == null ? null : new ArticleModel({
      // eslint-disable-next-line no-underscore-dangle
      id: data._id,
      title: localeModelFields.getLocaleField('title'),
      source: data.source,
      url: data.url,
      brief: localeModelFields.getLocaleField('brief'),
      icon: ImageModel.fromServerModel(data.icon),
      icon2x: ImageModel.fromServerModel(data.icon2x),
    })
  }
}

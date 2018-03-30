import assert from 'assert'
import ImageModel from './ImageModel'
import { LangFieldSet } from './helpers'

export default class MenuModel {
  constructor ({ id, title, subtitle, url, symbol, name, icon32x32, icon40x40, style, isVisibleInHeader, isVisibleInFooter, isVisibleInMobile, children }) {
    this.id = id
    this.title = title
    this.subtitle = subtitle
    this.url = url
    assert(symbol == null || symbol instanceof ImageModel)
    this.symbol = symbol
    assert(icon32x32 == null || icon32x32 instanceof ImageModel)
    this.icon32x32 = icon32x32
    assert(icon40x40 == null || icon40x40 instanceof ImageModel)
    this.icon40x40 = icon40x40
    assert(children == null || !children.find((child) => !(child instanceof MenuModel)))
    this.children = children
    this.name = name
    this.style = style || null
    this.isVisibleInHeader = isVisibleInHeader
    this.isVisibleInFooter = isVisibleInFooter
    this.isVisibleInMobile = isVisibleInMobile
    Object.freeze(this)
  }

  isRoute () {
    return this.url != null && this.url.indexOf('/') === 0
  }

  isComposite () {
    return this.children != null && this.children.length
  }

  static fromJS (data) {
    return data == null ? data : new MenuModel({
      ...data,
      children: data.children == null ? null : data.children.map(MenuModel.fromJS),
      symbol: ImageModel.fromJS(data.symbol),
      icon32x32: ImageModel.fromJS(data.icon32x32),
      icon40x40: ImageModel.fromJS(data.icon40x40),
    })
  }

  static fromServerModel (data, { locale }) {
    let localeModelFields = new LangFieldSet(data, locale)

    return data == null ? data : new MenuModel({
      // eslint-disable-next-line no-underscore-dangle
      id: data._id,
      name: data.title,
      title: localeModelFields.getLocaleField('title'),
      subtitle: localeModelFields.getLocaleField('subtitle'),
      url: data.url,
      children: data.children == null ? null : data.children.map((item) => MenuModel.fromServerModel(item, { locale })),
      symbol: ImageModel.fromServerModel(data.symbol),
      icon32x32: ImageModel.fromServerModel(data.icon32x32),
      icon40x40: ImageModel.fromServerModel(data.icon40x40),
      style: data.style,
      isVisibleInHeader: data.isVisibleInHeader,
      isVisibleInFooter: data.isVisibleInFooter,
      isVisibleInMobile: data.isVisibleInMobile,
    })
  }
}

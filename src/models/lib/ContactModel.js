import assert from 'assert'
import ImageModel from './ImageModel'
import { LangFieldSet } from './helpers'

export default class ContactModel {
  constructor ({ id, title, label, url, icon32x32, isVisibleInContacts, isVisibleInFooter }) {
    this.id = id
    this.title = title
    this.label = label
    this.url = url
    assert(icon32x32 == null || icon32x32 instanceof ImageModel)
    this.icon32x32 = icon32x32
    this.isVisibleInContacts = isVisibleInContacts
    this.isVisibleInFooter = isVisibleInFooter
    Object.freeze(this)
  }

  static fromJS (data) {
    return data == null ? data : new ContactModel({
      ...data,
      icon32x32: ImageModel.fromJS(data.icon32x32),
    })
  }

  static fromServerModel (data, { locale }) {
    let localeModelFields = new LangFieldSet(data, locale)

    return data == null ? data : new ContactModel({
      // eslint-disable-next-line no-underscore-dangle
      id: data._id,
      title: localeModelFields.getLocaleField('title'),
      label: data.label,
      url: data.url,
      icon32x32: ImageModel.fromServerModel(data.icon32x32),
      isVisibleInContacts: data.isVisibleInContacts,
      isVisibleInFooter: data.isVisibleInFooter,
    })
  }
}

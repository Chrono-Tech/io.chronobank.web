import assert from 'assert'
import ImageModel from './ImageModel'
import { getLocaleModelFields } from './helpers'

export default class MemberModel {
  constructor ({ id, name, avatar, avatar2x, position, brief }) {
    this.id = id
    this.name = name
    this.position = position
    this.brief = brief
    assert(avatar == null || avatar instanceof ImageModel)
    this.avatar = avatar
    assert(avatar2x == null || avatar2x instanceof ImageModel)
    this.avatar2x = avatar2x
    Object.freeze(this)
  }

  static fromJS (data) {
    return data == null ? data : new MemberModel({
      ...data,
      avatar: ImageModel.fromJS(data.avatar),
      avatar2x: ImageModel.fromJS(data.avatar2x),
    })
  }

  static fromServerModel (data, { locale }) {
    let localeModelFields = getLocaleModelFields(data, locale)

    return data == null ? data : new MemberModel({
      // eslint-disable-next-line no-underscore-dangle
      id: data._id,
      name: localeModelFields && 'name' in localeModelFields ? localeModelFields.name : data.name,
      position: localeModelFields && 'position' in localeModelFields ? localeModelFields.position : data.position,
      brief: localeModelFields && 'brief' in localeModelFields ? localeModelFields.brief : data.brief,
      avatar: ImageModel.fromServerModel(data.avatar),
      avatar2x: ImageModel.fromServerModel(data.avatar2x),
    })
  }
}

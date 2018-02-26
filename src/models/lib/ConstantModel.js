import {LangFieldSet} from "./helpers"

export default class ConstantModel {
  constructor ({ name, value }) {
    this.name = name
    this.value = value
    Object.freeze(this)
  }

  static fromJS (data) {
    return data == null ? null : new ConstantModel({
      ...data
    })
  }

  static fromServerModel (data, { locales }) {
    let localeModelFields = new LangFieldSet(data, locales)

    return data == null ? null : new ConstantModel({
      name: data.name,
      value: localeModelFields.getLocaleField('value')
    })
  }
}

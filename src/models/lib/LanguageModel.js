export default class LanguageModel {
  constructor ({ id, title, label, key }) {
    this.id = id
    this.title = title
    this.label = label
    this.key = key
    Object.freeze(this)
  }

  static fromJS (data) {
    return data == null ? data : new LanguageModel({
      ...data,
    })
  }

  static fromServerModel (data) {
    return data == null ? data : new LanguageModel({
      // eslint-disable-next-line no-underscore-dangle
      id: data._id,
      title: data.title,
      label: data.label,
      key: data.key,
    })
  }
}

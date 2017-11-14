export default class PaperModel {
  constructor ({ id, title, url }) {
    this.id = id
    this.title = title
    this.url = url
    Object.freeze(this)
  }

  static fromJS (data) {
    return data == null ? null : new PaperModel({
      ...data,
    })
  }

  static fromServerModel (data) {
    return data == null ? null : new PaperModel({
      id: data._id,
      title: data.title,
      url: data.url
    })
  }
}

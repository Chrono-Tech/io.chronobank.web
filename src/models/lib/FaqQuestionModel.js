export default class FaqQuestionModel {
  constructor ({ id, name, title, brief }) {
    this.id = id
    this.name = name
    this.title = title
    this.brief = brief
    Object.freeze(this)
  }

  static fromJS (data) {
    return data == null ? null : new FaqQuestionModel({
      ...data
    })
  }

  static fromServerModel (data) {
    return data == null ? null : new FaqQuestionModel({
      id: data._id,
      name: data.name,
      title: data.title,
      brief: data.brief,
    })
  }
}

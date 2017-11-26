export default class JobModel {
  constructor ({ id, title, brief, details }) {
    this.id = id
    this.title = title
    this.brief = brief
    this.details = details
    Object.freeze(this)
  }

  static fromJS (data) {
    return data == null ? data : new JobModel({
      ...data
    })
  }

  static fromServerModel (data) {
    return data == null ? data : new JobModel({
      id: data._id,
      title: data.title,
      brief: data.brief,
      details: data.details
    })
  }
}

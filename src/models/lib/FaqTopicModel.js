import assert from 'assert'
import FaqQuestionModel from './FaqQuestionModel'

export default class FaqTopicModel {
  constructor ({ id, name, title, questions }) {
    this.id = id
    this.name = name
    this.title = title
    assert(questions == null || !questions.find((child) => !(child instanceof FaqQuestionModel)))
    this.questions = questions
    Object.freeze(this)
  }

  static fromJS (data) {
    return data == null ? null : new FaqTopicModel({
      ...data,
      questions: data.questions == null ? null : data.questions.map(FaqQuestionModel.fromJS),
    })
  }

  static fromServerModel (data) {
    return data == null ? null : new FaqTopicModel({
      // eslint-disable-next-line no-underscore-dangle
      id: data._id,
      name: data.name,
      title: data.title,
      questions: data.questions == null ? null : data.questions.map(FaqQuestionModel.fromServerModel),
    })
  }
}

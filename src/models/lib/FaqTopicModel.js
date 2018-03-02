import assert from 'assert'
import FaqQuestionModel from './FaqQuestionModel'
import { LangFieldSet } from './helpers'

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

  static fromServerModel (data, { locale }) {
    const localeModelFields = new LangFieldSet(data, locale)

    return data == null ? null : new FaqTopicModel({
      // eslint-disable-next-line no-underscore-dangle
      id: data._id,
      name: data.name,
      title: localeModelFields.getLocaleField('title'),
      questions: data.questions == null ? null : data.questions.map((question) => FaqQuestionModel.fromServerModel(question, { locale })),
    })
  }
}

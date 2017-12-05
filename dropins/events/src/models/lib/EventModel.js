import assert from 'assert'

export default class EventModel {
  constructor ({ id, status, date, url, title }) {
    this.id = id
    this.status = status
    assert(date == null || date instanceof Date)
    this.date = date
    this.url = url
    this.title = title
    Object.freeze(this)
  }
}

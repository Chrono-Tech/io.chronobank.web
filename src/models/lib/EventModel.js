export class Event {
  constructor ({ id, status, date, url, title }) {
    this.id = id
    this.status = status
    this.date = date
    this.url = url
    this.title = title
    Object.freeze(this)
  }
}

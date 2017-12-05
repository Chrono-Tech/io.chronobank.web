import parseURL from 'url-parse'

export default class ImageModel {
  constructor ({ id, version, format, width, height, url }) {
    this.id = id
    this.version = version
    this.format = format
    this.width = width
    this.height = height
    this.url = url
    // console.log(url)
    Object.freeze(this)
  }

  static fromJS (data) {
    return data == null ? null : new ImageModel(data)
  }

  static fromServerModel (data) {
    if (data == null) return data
    return data == null ? null : new ImageModel({
      id: data.public_id,
      version: data.version,
      width: data.width,
      height: data.height,
      format: data.format,
      url: data.secure_url
        ? `${process.env.IMAGES_ENDPOINT}${parseURL(data.secure_url).pathname}`
        : null
    })
  }
}

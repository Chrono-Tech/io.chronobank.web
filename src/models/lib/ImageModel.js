export default class ImageModel {
  constructor ({ id, version, format, width, height, url }) {
    this.id = id
    this.version = version
    this.format = format
    this.width = width
    this.height = height
    this.url = url
    Object.freeze(this)
  }

  static fromJS (data) {
    return data == null ? null : new ImageModel(data)
  }

  static fromServerModel (data) {
    return data == null ? null : new ImageModel({
      id: data.public_id,
      version: data.version,
      width: data.width,
      height: data.height,
      format: data.format,
      url: data.secure_url
    })
  }
}

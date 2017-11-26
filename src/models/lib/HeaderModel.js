import assert from 'assert'
import ImageModel from './ImageModel'

export default class HeaderModel {
  constructor ({ id, slug, title, stereotype, background, video, brief, image, image2x, image320, image2x320, image480, image2x480, image640, image2x640}) {
    this.id = id
    this.slug = slug
    this.title = title
    this.stereotype = stereotype
    this.background = background
    this.video = video
    this.brief = brief

    assert(image == null || image instanceof ImageModel)
    this.image = image
    assert(image2x == null || image2x instanceof ImageModel)
    this.image2x = image2x

    assert(image320 == null || image320 instanceof ImageModel)
    this.image320 = image320
    assert(image2x320 == null || image2x320 instanceof ImageModel)
    this.image2x320 = image2x320

    assert(image480 == null || image480 instanceof ImageModel)
    this.image480 = image480
    assert(image2x480 == null || image2x480 instanceof ImageModel)
    this.image2x480 = image2x480

    assert(image640 == null || image640 instanceof ImageModel)
    this.image640 = image640
    assert(image2x640 == null || image2x640 instanceof ImageModel)
    this.image2x640 = image2x640

    Object.freeze(this)
  }

  static fromJS (data) {
    return data == null ? data : new HeaderModel({
      ...data,
      image: ImageModel.fromJS(data.image),
      image2x: ImageModel.fromJS(data.image2x),
      image320: ImageModel.fromJS(data.image320),
      image2x320: ImageModel.fromJS(data.image2x320),
      image480: ImageModel.fromJS(data.image480),
      image2x480: ImageModel.fromJS(data.image2x480),
      image640: ImageModel.fromJS(data.image640),
      image2x640: ImageModel.fromJS(data.image2x640)
    })
  }

  static fromServerModel (data) {
    return data == null ? data : new HeaderModel({
      id: data._id,
      slug: data.slug,
      title: data.title,
      stereotype: data.stereotype,
      background: data.background,
      video: data.video,
      brief: data.brief,
      image: ImageModel.fromServerModel(data.image),
      image2x: ImageModel.fromServerModel(data.image2x),
      image320: ImageModel.fromServerModel(data.image320),
      image2x320: ImageModel.fromServerModel(data.image2x320),
      image480: ImageModel.fromServerModel(data.image480),
      image2x480: ImageModel.fromServerModel(data.image2x480),
      image640: ImageModel.fromServerModel(data.image640),
      image2x640: ImageModel.fromServerModel(data.image2x640)
    })
  }
}

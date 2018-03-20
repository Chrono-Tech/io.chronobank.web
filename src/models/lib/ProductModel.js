import assert from 'assert'
import ImageModel from './ImageModel'
import ProductDownloadModel from './ProductDownloadModel'
import ProductDistroModel from './ProductDistroModel'
import ProductFeatureModel from './ProductFeatureModel'
import ProductDescriptionModel from './ProductDescriptionModel'
import { LangFieldSet } from './helpers'

export default class ProductModel {
  constructor ({ id, slug, name, title, stereotype, background, icon, icon2x, image, image2x, mission, brief, downloads, distros, features, featuresMode, descriptions }) {
    this.id = id
    this.slug = slug
    this.name = name
    this.title = title
    this.stereotype = stereotype
    this.background = background
    this.featuresMode = featuresMode
    this.mission = mission
    this.brief = brief
    assert(icon == null || icon instanceof ImageModel)
    this.icon = icon
    assert(icon2x == null || icon2x instanceof ImageModel)
    this.icon2x = icon2x
    assert(image == null || image instanceof ImageModel)
    this.image = image
    assert(image2x == null || image2x instanceof ImageModel)
    this.image2x = image2x
    assert(downloads == null || !downloads.find((child) => !(child instanceof ProductDownloadModel)))
    this.downloads = downloads
    assert(distros == null || !distros.find((child) => !(child instanceof ProductDistroModel)))
    this.distros = distros
    assert(features == null || !features.find((child) => !(child instanceof ProductFeatureModel)))
    this.features = features
    assert(descriptions == null || !descriptions.find((child) => !(child instanceof ProductDescriptionModel)))
    this.descriptions = descriptions
    Object.freeze(this)
  }

  static fromJS (data) {
    return data == null ? data : new ProductModel({
      ...data,
      icon: ImageModel.fromJS(data.icon),
      icon2x: ImageModel.fromJS(data.icon2x),
      image: ImageModel.fromJS(data.image),
      image2x: ImageModel.fromJS(data.image2x),
      downloads: data.downloads == null ? null : data.downloads.map(ProductDownloadModel.fromJS),
      distros: data.distros == null ? null : data.distros.map(ProductDistroModel.fromJS),
      features: data.features == null ? null : data.features.map(ProductFeatureModel.fromJS),
      descriptions: data.descriptions == null ? null : data.descriptions.map(ProductDescriptionModel.fromJS),
    })
  }

  static fromServerModel (data, { locale }) {
    let localeModelFields = new LangFieldSet(data, locale)

    return data == null ? data : new ProductModel({
      // eslint-disable-next-line no-underscore-dangle
      id: data._id,
      slug: data.slug,
      name: data.name,
      title: localeModelFields.getLocaleField('title'),
      stereotype: data.stereotype,
      background: data.background,
      featuresMode: data.featuresMode,
      mission: localeModelFields.getLocaleField('mission'),
      brief: localeModelFields.getLocaleField('brief'),
      icon: ImageModel.fromServerModel(data.icon),
      icon2x: ImageModel.fromServerModel(data.icon2x),
      image: ImageModel.fromServerModel(data.image),
      image2x: ImageModel.fromServerModel(data.image2x),
      downloads: data.downloads == null ? null : data.downloads.map((data) => ProductDownloadModel.fromServerModel(data, { locale })),
      distros: data.distros == null ? null : data.distros.map((data) => ProductDistroModel.fromServerModel(data, { locale })),
      features: data.features == null ? null : data.features.map((data) => ProductFeatureModel.fromServerModel(data, { locale })),
      descriptions: data.descriptions == null ? null : data.descriptions.map((data) => ProductDescriptionModel.fromServerModel(data, { locale })),
    })
  }
}

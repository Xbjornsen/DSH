import DemountableModel from '../models/baseModel';

export default class DemountableController {
  constructor(initialConfig) {
    this.demountableModel = new DemountableModel(
      initialConfig.id,
      initialConfig.name,
      initialConfig.type,
      initialConfig.length,
      initialConfig.width,
      initialConfig.height,
      initialConfig.roofStyle,
      initialConfig.material,
      initialConfig.features
    );
  }

  updateDimensions(length, width, height) {
    this.demountableModel.updateDimensions(length, width, height);
    this.validateModel();
  }

  updateFeatures(newFeatures) {
    this.demountableModel.updateFeatures(newFeatures);
    this.validateModel();
  }

  updateMaterial(material) {
    this.demountableModel.updateMaterial(material);
    this.validateModel();
  }

  updateRoofStyle(roofStyle) {
    this.demountableModel.updateRoofStyle(roofStyle);
    this.validateModel();
  }

  validateModel() {
    if (!this.demountableModel.isValid()) {
      throw new Error('Invalid demountable configuration');
    }
  }

  getConfig() {
    return this.demountableModel.toJSON();
  }

  generate3DModelData() {
    return this.demountableModel.generate3DModelData();
  }
}
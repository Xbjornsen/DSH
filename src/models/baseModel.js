export default class DemountableModel {
    constructor(id, name, type, length, width, height, roofStyle, material, features) {
      this.id = id;
      this.name = name;
      this.type = type;
      this.length = length;
      this.width = width;
      this.height = height;
      this.roofStyle = roofStyle;
      this.material = material;
      this.features = features;
    }
  
    isValid() {
      const validRoofStyles = ['gable', 'flat', 'skillion'];
      const validMaterials = ['steel', 'wood'];
      const validTypes = ['laundry', 'gym', 'accommodation'];
  
      return (
        this.id && 
        this.name &&
        validTypes.includes(this.type) &&
        this.length > 0 && this.length <= 20000 &&
        this.width > 0 && this.width <= 10000 &&
        this.height > 0 && this.height <= 3000 &&
        validRoofStyles.includes(this.roofStyle) &&
        validMaterials.includes(this.material) &&
        this.validateFeatures()
      );
    }
  
    validateFeatures() {
      switch(this.type) {
        case 'laundry':
          return this.features.washingMachines > 0 && this.features.dryers > 0;
        case 'gym':
          return this.features.treadmills > 0 || this.features.weightBenches > 0;
        case 'accommodation':
          return this.features.bedrooms > 0 && this.features.bathrooms > 0;
        default:
          return false;
      }
    }
  
    updateDimensions(length, width, height) {
      this.length = length;
      this.width = width;
      this.height = height;
    }
  
    updateFeatures(newFeatures) {
      this.features = {...this.features, ...newFeatures};
    }
  
    updateMaterial(material) {
      if (['steel', 'wood'].includes(material)) {
        this.material = material;
      }
    }
  
    updateRoofStyle(roofStyle) {
      if (['gable', 'flat', 'skillion'].includes(roofStyle)) {
        this.roofStyle = roofStyle;
      }
    }
  
    generate3DModelData() {
      // This method would generate the necessary data for the 3D visualization
      // The exact implementation would depend on what your visualization component needs
      return {
        dimensions: {
          length: this.length,
          width: this.width,
          height: this.height
        },
        roofStyle: this.roofStyle,
        material: this.material,
        features: this.features
      };
    }
  
    toJSON() {
      return {
        id: this.id,
        name: this.name,
        type: this.type,
        length: this.length,
        width: this.width,
        height: this.height,
        roofStyle: this.roofStyle,
        material: this.material,
        features: this.features
      };
    }
  }
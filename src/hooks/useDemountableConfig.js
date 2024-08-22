import { useEffect, useState } from 'react';
import baseDesigns from '../data/baseDesigns.json';

function useDemountableConfig() {
  const [demountable, setDemountable] = useState(null);

  useEffect(() => {
    initializeDemountable(baseDesigns[0]);
  }, []);

  const initializeDemountable = (design) => {
    try {
      setDemountable({
        ...design,
        material: design.material || 'steel',
        roofStyle: design.roofStyle || 'flat',
      });
    } catch (error) {
      console.error('Error initializing demountable:', error);
    }
  };

  const updateDemountable = (newDesign) => {
    initializeDemountable(newDesign);
  };

  const updateDimensions = (length, width, height) => {
    setDemountable(prev => ({
      ...prev,
      dimensions: { length, width, height }
    }));
  };

  const updateFeatures = (newFeatures) => {
    setDemountable(prev => ({
      ...prev,
      features: { ...prev.features, ...newFeatures }
    }));
  };

  const updateMaterial = (material) => {
    setDemountable(prev => ({ ...prev, material }));
  };

  const updateRoofStyle = (roofStyle) => {
    setDemountable(prev => ({ ...prev, roofStyle }));
  };

  return { 
    demountable, 
    updateDemountable, 
    updateDimensions, 
    updateFeatures, 
    updateMaterial, 
    updateRoofStyle 
  };
}

export default useDemountableConfig;
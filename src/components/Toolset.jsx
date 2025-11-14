import React, { useEffect } from 'react';
import baseDesigns from '../data/baseDesigns.json';

function Toolset({ demountable, updateDimensions, updateFeatures, updateMaterial, updateRoofStyle }) {
  const roofStyles = ['Gable', 'Flat', 'Skillion'];
  const materials = ['Steel', 'Wood'];

  useEffect(() => {
    console.log('Demountable:', demountable);
    console.log('Base Designs:', baseDesigns);
  }, [demountable]);

  if (!demountable) {
    return <div>Loading... (demountable is undefined)</div>;
  }

  const design = baseDesigns.find(d => d.id === demountable.id);

  if (!design) {
    return <div>Error: Design not found for id: {demountable.id}</div>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Customize Your {demountable.name || 'Design'}</h2>

      {/* Dimensions Section */}
      <div id="dimensions" className="bg-white rounded-lg shadow-md p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
          <span className="text-xl mr-2">📏</span>
          Dimensions
        </h3>
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700">Length (mm)</label>
            <input
              type="number"
              value={demountable.dimensions?.length || ''}
              onChange={(e) => updateDimensions(parseInt(e.target.value), demountable.dimensions?.width, demountable.dimensions?.height)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Width (mm)</label>
            <input
              type="number"
              value={demountable.dimensions?.width || ''}
              onChange={(e) => updateDimensions(demountable.dimensions?.length, parseInt(e.target.value), demountable.dimensions?.height)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Height (mm)</label>
            <input
              type="number"
              value={demountable.dimensions?.height || ''}
              onChange={(e) => updateDimensions(demountable.dimensions?.length, demountable.dimensions?.width, parseInt(e.target.value))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="bg-white rounded-lg shadow-md p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
          <span className="text-xl mr-2">⚙️</span>
          Features
        </h3>
        <div className="space-y-3">
          {Object.entries(design.features || {}).map(([key, value]) => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-700 capitalize">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </label>
              <input
                type="number"
                value={demountable.features?.[key] || ''}
                onChange={(e) => updateFeatures({ [key]: parseInt(e.target.value) })}
                min="0"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Materials Section */}
      <div id="materials" className="bg-white rounded-lg shadow-md p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
          <span className="text-xl mr-2">🔧</span>
          Materials & Roof
        </h3>
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700">Material</label>
            <select
              value={demountable.material || ''}
              onChange={(e) => updateMaterial(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            >
              {materials.map((material) => (
                <option key={material} value={material.toLowerCase()}>{material}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Roof Style</label>
            <select
              value={demountable.roofStyle || ''}
              onChange={(e) => updateRoofStyle(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            >
              {roofStyles.map((style) => (
                <option key={style} value={style.toLowerCase()}>{style}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Toolset;
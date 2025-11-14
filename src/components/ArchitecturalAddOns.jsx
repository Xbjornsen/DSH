import React from 'react';
import architecturalOptions from '../data/architecturalOptions.json';

function ArchitecturalAddOns({ demountable, updateAddOns }) {
  const handleArrayAddOn = (category, optionId) => {
    const current = demountable.addOns[category] || [];
    const index = current.findIndex(item => item.id === optionId);

    if (index >= 0) {
      // Increment quantity
      const updated = [...current];
      updated[index] = { ...updated[index], quantity: updated[index].quantity + 1 };
      updateAddOns(category, updated);
    } else {
      // Add new item
      updateAddOns(category, [...current, { id: optionId, quantity: 1 }]);
    }
  };

  const handleArrayRemove = (category, optionId) => {
    const current = demountable.addOns[category] || [];
    const index = current.findIndex(item => item.id === optionId);

    if (index >= 0) {
      const updated = [...current];
      if (updated[index].quantity > 1) {
        updated[index] = { ...updated[index], quantity: updated[index].quantity - 1 };
      } else {
        updated.splice(index, 1);
      }
      updateAddOns(category, updated);
    }
  };

  const getQuantity = (category, optionId) => {
    const current = demountable.addOns[category] || [];
    const item = current.find(i => i.id === optionId);
    return item ? item.quantity : 0;
  };

  return (
    <div id="addons" className="bg-white rounded-lg shadow-md p-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
        <span className="text-xl mr-2">🏠</span>
        Architectural Add-Ons
      </h3>

      <div className="space-y-4">
        {/* Windows */}
        <div className="border-b pb-3">
          <h4 className="font-medium text-gray-700 mb-2">{architecturalOptions.windows.name}</h4>
          <div className="space-y-2">
            {architecturalOptions.windows.options.map(option => (
              <div key={option.id} className="flex items-center justify-between">
                <label className="text-sm text-gray-600">{option.label}</label>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleArrayRemove('windows', option.id)}
                    className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded text-sm"
                    disabled={getQuantity('windows', option.id) === 0}
                  >
                    -
                  </button>
                  <span className="w-8 text-center text-sm font-medium">
                    {getQuantity('windows', option.id)}
                  </span>
                  <button
                    onClick={() => handleArrayAddOn('windows', option.id)}
                    className="px-2 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded text-sm"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Doors */}
        <div className="border-b pb-3">
          <h4 className="font-medium text-gray-700 mb-2">{architecturalOptions.doors.name}</h4>
          <div className="space-y-2">
            {architecturalOptions.doors.options.map(option => (
              <div key={option.id} className="flex items-center justify-between">
                <label className="text-sm text-gray-600">{option.label}</label>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleArrayRemove('doors', option.id)}
                    className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded text-sm"
                    disabled={getQuantity('doors', option.id) === 0}
                  >
                    -
                  </button>
                  <span className="w-8 text-center text-sm font-medium">
                    {getQuantity('doors', option.id)}
                  </span>
                  <button
                    onClick={() => handleArrayAddOn('doors', option.id)}
                    className="px-2 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded text-sm"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Verandahs */}
        <div className="border-b pb-3">
          <h4 className="font-medium text-gray-700 mb-2">{architecturalOptions.verandahs.name}</h4>
          <div className="space-y-2">
            {architecturalOptions.verandahs.options.map(option => (
              <div key={option.id} className="flex items-center justify-between">
                <label className="text-sm text-gray-600">{option.label}</label>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleArrayRemove('verandahs', option.id)}
                    className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded text-sm"
                    disabled={getQuantity('verandahs', option.id) === 0}
                  >
                    -
                  </button>
                  <span className="w-8 text-center text-sm font-medium">
                    {getQuantity('verandahs', option.id)}
                  </span>
                  <button
                    onClick={() => handleArrayAddOn('verandahs', option.id)}
                    className="px-2 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded text-sm"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Air Conditioning */}
        <div className="border-b pb-3">
          <h4 className="font-medium text-gray-700 mb-2">{architecturalOptions.airConditioning.name}</h4>
          <div className="space-y-2">
            {architecturalOptions.airConditioning.options.map(option => (
              <div key={option.id} className="flex items-center justify-between">
                <label className="text-sm text-gray-600">{option.label}</label>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleArrayRemove('airConditioning', option.id)}
                    className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded text-sm"
                    disabled={getQuantity('airConditioning', option.id) === 0}
                  >
                    -
                  </button>
                  <span className="w-8 text-center text-sm font-medium">
                    {getQuantity('airConditioning', option.id)}
                  </span>
                  <button
                    onClick={() => handleArrayAddOn('airConditioning', option.id)}
                    className="px-2 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded text-sm"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Insulation */}
        <div className="border-b pb-3">
          <h4 className="font-medium text-gray-700 mb-2">{architecturalOptions.insulation.name}</h4>
          <select
            value={demountable.addOns.insulation || ''}
            onChange={(e) => updateAddOns('insulation', e.target.value || null)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          >
            <option value="">None</option>
            {architecturalOptions.insulation.options.map(option => (
              <option key={option.id} value={option.id}>{option.label}</option>
            ))}
          </select>
        </div>

        {/* Flooring */}
        <div className="border-b pb-3">
          <h4 className="font-medium text-gray-700 mb-2">{architecturalOptions.flooring.name}</h4>
          <select
            value={demountable.addOns.flooring || ''}
            onChange={(e) => updateAddOns('flooring', e.target.value || null)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          >
            <option value="">None</option>
            {architecturalOptions.flooring.options.map(option => (
              <option key={option.id} value={option.id}>{option.label}</option>
            ))}
          </select>
        </div>

        {/* Colors */}
        <div className="border-b pb-3">
          <h4 className="font-medium text-gray-700 mb-2">{architecturalOptions.colors.name}</h4>
          <select
            value={demountable.addOns.colors || 'standard-white'}
            onChange={(e) => updateAddOns('colors', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          >
            {architecturalOptions.colors.options.map(option => (
              <option key={option.id} value={option.id}>{option.label}</option>
            ))}
          </select>
        </div>

        {/* Electrical */}
        <div className="border-b pb-3">
          <h4 className="font-medium text-gray-700 mb-2">{architecturalOptions.electrical.name}</h4>
          <select
            value={demountable.addOns.electrical || 'standard'}
            onChange={(e) => updateAddOns('electrical', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          >
            {architecturalOptions.electrical.options.map(option => (
              <option key={option.id} value={option.id}>{option.label}</option>
            ))}
          </select>
        </div>

        {/* Security */}
        <div>
          <h4 className="font-medium text-gray-700 mb-2">{architecturalOptions.security.name}</h4>
          <div className="space-y-2">
            {architecturalOptions.security.options.map(option => (
              <div key={option.id} className="flex items-center justify-between">
                <label className="text-sm text-gray-600">{option.label}</label>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleArrayRemove('security', option.id)}
                    className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded text-sm"
                    disabled={getQuantity('security', option.id) === 0}
                  >
                    -
                  </button>
                  <span className="w-8 text-center text-sm font-medium">
                    {getQuantity('security', option.id)}
                  </span>
                  <button
                    onClick={() => handleArrayAddOn('security', option.id)}
                    className="px-2 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded text-sm"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArchitecturalAddOns;

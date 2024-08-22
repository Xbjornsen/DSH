import React, { useEffect, useState } from 'react';
import Toolset from '../components/Toolset';
import Visualization from '../components/Visualization';
import baseDesigns from '../data/baseDesigns.json';
import useDemountableConfig from '../hooks/useDemountableConfig';

function DemountableBuilder() {
    const { demountable, updateDemountable, updateDimensions, updateFeatures, updateMaterial, updateRoofStyle } = useDemountableConfig();
    const [selectedDesignId, setSelectedDesignId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('DemountableBuilder - demountable:', demountable);
    if (demountable) {
      setIsLoading(false);
      setSelectedDesignId(demountable.id);
    }

    const timer = setTimeout(() => {
      if (isLoading) {
        setIsLoading(false);
        setError('Loading timed out. Please try again.');
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [demountable, isLoading]);

  const handleDesignSelect = (designId) => {
    const newDesign = baseDesigns.find(d => d.id === designId);
    if (newDesign) {
      updateDemountable(newDesign);
      setSelectedDesignId(designId);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!demountable) {
    return <div>Error: Unable to load demountable configuration</div>;
  }

  return (
    <div className="flex flex-col h-screen">
      <main className="flex flex-col md:flex-row flex-1 overflow-hidden">
        <div className="w-full md:w-2/3 h-1/2 md:h-full">
          <Visualization config={demountable} />
        </div>
        <div className="w-full md:w-1/3 h-1/2 md:h-full overflow-y-auto p-4">
          <div className="mb-4">
            <label htmlFor="design-select" className="block text-sm font-medium text-gray-700">Select Design</label>
            <select
              id="design-select"
              value={selectedDesignId || ''}
              onChange={(e) => handleDesignSelect(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            >
              {baseDesigns.map((design) => (
                <option key={design.id} value={design.id}>{design.name}</option>
              ))}
            </select>
          </div>
          <Toolset 
            demountable={demountable}
            updateDimensions={updateDimensions}
            updateFeatures={updateFeatures}
            updateMaterial={updateMaterial}
            updateRoofStyle={updateRoofStyle}
          />
        </div>
      </main>
    </div>
  );
}

export default DemountableBuilder;
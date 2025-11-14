import React, { useEffect, useState } from 'react';
import Toolset from '../components/Toolset';
import Visualization from '../components/Visualization';
import TableOfContents from '../components/TableOfContents';
import PricingPanel from '../components/PricingPanel';
import ArchitecturalAddOns from '../components/ArchitecturalAddOns';
import baseDesigns from '../data/baseDesigns.json';
import useDemountableConfig from '../hooks/useDemountableConfig';

function DemountableBuilder() {
    const { demountable, updateDemountable, updateDimensions, updateFeatures, updateMaterial, updateRoofStyle, updateAddOns } = useDemountableConfig();
    const [selectedDesignId, setSelectedDesignId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeSection, setActiveSection] = useState('design');

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

  const handleSectionClick = (sectionId) => {
    setActiveSection(sectionId);

    // Scroll to the section
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
        <div className="w-full md:w-1/3 h-1/2 md:h-full overflow-y-auto p-4 bg-gray-50">
          <TableOfContents
            activeSection={activeSection}
            onSectionClick={handleSectionClick}
          />

          {/* Design Selection Section */}
          <div id="design" className="bg-white rounded-lg shadow-md p-4 mb-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
              <span className="text-xl mr-2">🏗️</span>
              Select Design
            </h3>
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
            <p className="mt-2 text-sm text-gray-600">{demountable.description}</p>
          </div>

          <Toolset
            demountable={demountable}
            updateDimensions={updateDimensions}
            updateFeatures={updateFeatures}
            updateMaterial={updateMaterial}
            updateRoofStyle={updateRoofStyle}
          />

          {/* Architectural Add-Ons Section */}
          <div className="mt-4">
            <ArchitecturalAddOns
              demountable={demountable}
              updateAddOns={updateAddOns}
            />
          </div>

          {/* Pricing Section */}
          <div id="pricing" className="mt-4">
            <PricingPanel demountable={demountable} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default DemountableBuilder;
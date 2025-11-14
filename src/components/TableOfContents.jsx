import React from 'react';

function TableOfContents({ activeSection, onSectionClick }) {
  const sections = [
    { id: 'design', label: '1. Select Design', icon: '🏗️' },
    { id: 'dimensions', label: '2. Dimensions', icon: '📏' },
    { id: 'features', label: '3. Features', icon: '⚙️' },
    { id: 'materials', label: '4. Materials & Roof', icon: '🔧' },
    { id: 'pricing', label: '5. Pricing', icon: '💰' }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <h2 className="text-lg font-bold text-gray-800 mb-3">Configuration Steps</h2>
      <nav className="space-y-2">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => onSectionClick(section.id)}
            className={`w-full text-left px-3 py-2 rounded-md transition-colors duration-200 flex items-center space-x-2 ${
              activeSection === section.id
                ? 'bg-olive-600 text-white font-medium'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <span className="text-xl">{section.icon}</span>
            <span className="text-sm">{section.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}

export default TableOfContents;

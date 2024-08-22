import React from 'react';
import { Link } from 'react-router-dom';
import baseDesigns from '../data/baseDesigns.json';

function DesignCatalog() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Design Catalog</h1>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {baseDesigns.map(design => (
            <div key={design.id} className="border p-4 rounded-lg shadow-md flex flex-col h-full">
              <img 
                src={design.thumbnail} 
                alt={design.name} 
                className="w-full h-auto object-contain mb-4 rounded"
              />
              <h3 className="text-xl font-semibold mb-2">{design.name}</h3>
              <p className="text-sm text-gray-600 mb-4 flex-grow">{design.description}</p>
              <Link 
                to={`/customize/${design.id}`} 
                className="mt-auto inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 ease-in-out w-full text-center"
              >
                Customize This Design
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DesignCatalog;
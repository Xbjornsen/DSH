import React, { useState } from 'react';
import InteractiveVisualization from '../components/InteractiveVisualization';
import baseDesigns from '../data/baseDesigns.json';
import furnitureLibrary from '../data/furnitureLibrary.json';

function SpaceBuilder() {
  const [demountables, setDemountables] = useState([]);
  const [objects, setObjects] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [viewMode, setViewMode] = useState('perspective');
  const [showGrid, setShowGrid] = useState(true);
  const [projectName, setProjectName] = useState('My Custom Space');

  // Add a new demountable to the scene
  const addDemountable = (designId) => {
    const design = baseDesigns.find(d => d.id === designId);
    if (!design) return;

    const newDemountable = {
      ...design,
      id: `${design.id}-${Date.now()}`,
      position: {
        x: demountables.length * 15,
        y: 0,
        z: 0
      }
    };

    setDemountables([...demountables, newDemountable]);
  };

  // Add an object/furniture to the scene
  const addObject = (furnitureItem) => {
    const newObject = {
      ...furnitureItem,
      id: `${furnitureItem.type}-${Date.now()}`,
      position: {
        x: Math.random() * 10 - 5,
        y: 0,
        z: Math.random() * 10 - 5
      }
    };

    setObjects([...objects, newObject]);
  };

  // Update object position
  const handleObjectMove = (objectId, newPosition) => {
    setObjects(objects.map(obj =>
      obj.id === objectId
        ? { ...obj, position: newPosition }
        : obj
    ));
  };

  // Handle selection
  const handleObjectSelect = (userData) => {
    setSelectedItem(userData);
  };

  // Delete selected item
  const deleteSelectedItem = () => {
    if (!selectedItem) return;

    if (selectedItem.type === 'demountable') {
      setDemountables(demountables.filter(d => d.id !== selectedItem.id));
    } else if (selectedItem.type === 'object') {
      setObjects(objects.filter(o => o.id !== selectedItem.id));
    }

    setSelectedItem(null);
  };

  // Save project
  const saveProject = () => {
    const project = {
      name: projectName,
      demountables,
      objects,
      createdAt: new Date().toISOString()
    };

    const dataStr = JSON.stringify(project, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${projectName.replace(/\s+/g, '-')}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Load project
  const loadProject = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const project = JSON.parse(e.target.result);
        setProjectName(project.name || 'Loaded Project');
        setDemountables(project.demountables || []);
        setObjects(project.objects || []);
      } catch (error) {
        console.error('Error loading project:', error);
        alert('Failed to load project file');
      }
    };
    reader.readAsText(file);
  };

  // Clear all
  const clearAll = () => {
    if (window.confirm('Are you sure you want to clear everything?')) {
      setDemountables([]);
      setObjects([]);
      setSelectedItem(null);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left Sidebar - Library */}
      <div className="w-64 bg-white shadow-lg overflow-y-auto">
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">Space Builder</h2>

          {/* Project Info */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Project Name
            </label>
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Demountables Library */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Demountables</h3>
            <div className="space-y-2">
              {baseDesigns.map(design => (
                <button
                  key={design.id}
                  onClick={() => addDemountable(design.id)}
                  className="w-full px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                >
                  Add {design.name}
                </button>
              ))}
            </div>
          </div>

          {/* Furniture Library */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Furniture & Fixtures</h3>
            <div className="space-y-3">
              {['furniture', 'kitchen', 'bathroom', 'laundry', 'gym'].map(category => {
                const categoryItems = furnitureLibrary.filter(item => item.category === category);
                if (categoryItems.length === 0) return null;

                return (
                  <div key={category}>
                    <h4 className="text-sm font-medium text-gray-700 mb-1 capitalize">{category}</h4>
                    <div className="grid grid-cols-2 gap-1">
                      {categoryItems.map(item => (
                        <button
                          key={item.id}
                          onClick={() => addObject(item)}
                          className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-xs"
                          title={item.description}
                        >
                          {item.name}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* View Controls */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">View</h3>
            <div className="space-y-2">
              <button
                onClick={() => setViewMode('perspective')}
                className={`w-full px-3 py-2 rounded text-sm ${
                  viewMode === 'perspective'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                Perspective
              </button>
              <button
                onClick={() => setViewMode('top-down')}
                className={`w-full px-3 py-2 rounded text-sm ${
                  viewMode === 'top-down'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                Top-Down
              </button>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showGrid}
                  onChange={(e) => setShowGrid(e.target.checked)}
                  className="rounded"
                />
                <span className="text-sm">Show Grid</span>
              </label>
            </div>
          </div>

          {/* File Operations */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Project</h3>
            <div className="space-y-2">
              <button
                onClick={saveProject}
                className="w-full px-3 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 text-sm"
              >
                Save Project
              </button>
              <label className="block w-full px-3 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 text-sm text-center cursor-pointer">
                Load Project
                <input
                  type="file"
                  accept=".json"
                  onChange={loadProject}
                  className="hidden"
                />
              </label>
              <button
                onClick={clearAll}
                className="w-full px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
              >
                Clear All
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main 3D View */}
      <div className="flex-1 relative">
        <InteractiveVisualization
          demountables={demountables}
          objects={objects}
          onObjectSelect={handleObjectSelect}
          onObjectMove={handleObjectMove}
          viewMode={viewMode}
          showGrid={showGrid}
        />

        {/* Floating Info Panel */}
        {selectedItem && (
          <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-4 w-64">
            <h3 className="font-semibold mb-2">Selected Item</h3>
            <div className="text-sm space-y-1">
              <p>
                <span className="font-medium">Type:</span>{' '}
                {selectedItem.type}
              </p>
              <p>
                <span className="font-medium">ID:</span>{' '}
                {selectedItem.id}
              </p>
              {selectedItem.data?.name && (
                <p>
                  <span className="font-medium">Name:</span>{' '}
                  {selectedItem.data.name}
                </p>
              )}
            </div>
            <button
              onClick={deleteSelectedItem}
              className="mt-3 w-full px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
            >
              Delete
            </button>
          </div>
        )}

        {/* Stats Panel */}
        <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-4">
          <div className="text-sm space-y-1">
            <p>
              <span className="font-medium">Demountables:</span>{' '}
              {demountables.length}
            </p>
            <p>
              <span className="font-medium">Objects:</span> {objects.length}
            </p>
          </div>
        </div>

        {/* Instructions */}
        {demountables.length === 0 && objects.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="bg-white bg-opacity-90 rounded-lg shadow-lg p-8 max-w-md">
              <h2 className="text-2xl font-bold mb-4">Welcome to Space Builder!</h2>
              <p className="text-gray-700 mb-4">
                Start building your custom demountable space:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Add demountables from the left sidebar</li>
                <li>Add furniture and fixtures</li>
                <li>Click and drag objects to move them</li>
                <li>Switch between view modes</li>
                <li>Save and load your projects</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SpaceBuilder;

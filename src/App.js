import React, { useState } from 'react';
import FlowBuilder from './components/FlowBuilder';
import Sidebar from './components/Sidebar'; // Fix: Component name capitalization
import './App.css';

function App() {
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [saveMessage, setSaveMessage] = useState('');

  // Node click handler
  const handleNodeClick = (nodeId) => {
    setSelectedNodeId(nodeId);
    setSaveMessage('');
  };

  // Save flow handler
  const handleSaveFlow = () => {
    if (nodes.length <= 1) {
      setSaveMessage('Flow Saved');
      return;
    }

    // Get all node IDs that are sources of edges
    const connectedSourceIds = new Set(edges.map((edge) => edge.source));

    // Find nodes that don't have outgoing connections (unconnected end nodes)
    const unconnectedEndNodes = nodes.filter((node) => !connectedSourceIds.has(node.id));

    if (unconnectedEndNodes.length > 1) {
      setSaveMessage(
        'Error: More than one node has an empty source handle. Each flow should have only one end node.'
      );
    } else {
      setSaveMessage('Flow Saved');
    }
  };

  const clearSelection = () => {
    setSelectedNodeId(null);
    setSaveMessage('');
  };

  return (
    <div className="app">
      <div className="app-header">
        <h1>ChatBot Flow Builder</h1>
        <div className="app-controls">
          <button onClick={handleSaveFlow} className="save-button">
            Save Flow
          </button>
          <button onClick={clearSelection} className="clear-button">
            Clear Selection
          </button>
        </div>
        {saveMessage && (
          <div className={`save-message ${saveMessage.includes('Error') ? 'error' : 'success'}`}>
            {saveMessage}
          </div>
        )}
      </div>

      <div className="app-content">
        <Sidebar
          selectedNodeId={selectedNodeId}
          setNodes={setNodes}
          nodes={nodes}
        />
        <FlowBuilder
          nodes={nodes}
          setNodes={setNodes}
          edges={edges}
          setEdges={setEdges}
          onNodeClick={handleNodeClick}
        />
      </div>
    </div>
  );
}

export default App;

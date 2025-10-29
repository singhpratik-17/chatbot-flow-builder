import React, { useState, useEffect } from 'react';
import './Sidebar.css';

const Sidebar = ({ selectedNodeId, setNodes, nodes }) => {
  const [nodeText, setNodeText] = useState('');

  // Sync text area with selected node
  useEffect(() => {
    if (selectedNodeId) {
      const selectedNode = nodes.find((node) => node.id === selectedNodeId);
      setNodeText(selectedNode?.data?.text || '');
    } else {
      setNodeText('');
    }
  }, [selectedNodeId, nodes]);

  // Drag-and-drop handler for adding new nodes
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  // Handle text updates for the selected node
  const handleTextChange = (event) => {
    const newText = event.target.value;
    setNodeText(newText);

    if (selectedNodeId) {
      setNodes((nds) =>
        nds.map((node) =>
          node.id === selectedNodeId
            ? { ...node, data: { ...node.data, text: newText } }
            : node
        )
      );
    }
  };

  return (
    <div className="sidebar">
      {selectedNodeId ? (
        <div className="settings-panel">
          <h3>Node Settings</h3>
          <div className="settings-content">
            <label htmlFor="node-text">Text Content:</label>
            <textarea
              id="node-text"
              value={nodeText}
              onChange={handleTextChange}
              placeholder="Enter text message..."
              rows={4}
            />
            <div className="node-info">
              <small>Node ID: {selectedNodeId}</small>
            </div>
          </div>
        </div>
      ) : (
        <div className="nodes-panel">
          <h3>Nodes Panel</h3>
          <div className="nodes-list">
            {/* Single Node Type */}
            <div
              className="node-item"
              onDragStart={(event) => onDragStart(event, 'textMessage')}
              draggable
            >
              <div className="node-icon">💬</div>
              <div className="node-info">
                <div className="node-name">Text Message</div>
                <div className="node-description">Drag to add a text message node</div>
              </div>
            </div>

            {/* Section for extensibility */}
            <div className="nodes-section">
              <h4>Message Types</h4>
              <div
                className="node-item"
                onDragStart={(event) => onDragStart(event, 'textMessage')}
                draggable
              >
                <div className="node-icon">📝</div>
                <div className="node-info">
                  <div className="node-name">Text Message</div>
                  <div className="node-description">Basic text message</div>
                </div>
              </div>
            </div>

            <div className="nodes-section">
              <h4>Actions</h4>
              <div className="node-item disabled">
                <div className="node-icon">⚡</div>
                <div className="node-info">
                  <div className="node-name">Quick Reply</div>
                  <div className="node-description">Coming soon...</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;

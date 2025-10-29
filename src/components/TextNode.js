import React from 'react';
import { Handle, Position } from 'reactflow';
import './TextNode.css'; // Optional CSS

const TextNode = ({ data = {}, isConnectable }) => {
  const { text = 'Click to edit' } = data;

  return (
    <div className="text-node">
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
        style={{ background: '#555' }}
      />

      <div className="text-node-content">
        <div className="text-node-label">Text Message</div>
        <div className="text-node-text">{text}</div>
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
        style={{ background: '#555' }}
      />
    </div>
  );
};

export default TextNode;

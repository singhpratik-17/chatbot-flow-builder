import React, { useCallback, useRef, useState, useEffect } from 'react';
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  Background,
  Controls,
  MiniMap,
} from 'reactflow';
import 'reactflow/dist/style.css';
import TextNode from './TextNode';
import './FlowBuilder.css';

const nodeTypes = {
  textMessage: TextNode,
};

const FlowBuilder = ({ nodes: initialNodes, setNodes, edges: initialEdges, setEdges, onNodeClick }) => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  // Internal state using React Flow hooks
  const [nodes, internalSetNodes, onNodesChange] = useNodesState(initialNodes || []);
  const [edges, internalSetEdges, onEdgesChange] = useEdgesState(initialEdges || []);

  // Sync internal state with parent
  useEffect(() => {
    setNodes(nodes);
    setEdges(edges);
  }, [nodes, edges, setNodes, setEdges]);

  // Handle node connection
  const onConnect = useCallback(
    (params) => internalSetEdges((eds) => addEdge(params, eds)),
    [internalSetEdges]
  );

  // Drag over behavior
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  // Handle node drop
  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      if (!reactFlowWrapper.current || !reactFlowInstance) return;

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');

      if (!type) return;

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const newNode = {
        id: `${type}-${Date.now()}`,
        type,
        position,
        data: { text: 'New text message' },
      };

      internalSetNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, internalSetNodes]
  );

  // Handle node click
  const handleNodeClick = useCallback(
    (event, node) => {
      if (onNodeClick && node?.id) onNodeClick(node.id);
    },
    [onNodeClick]
  );

  return (
    <div className="flow-builder" ref={reactFlowWrapper} style={{ width: '100%', height: '100%' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={setReactFlowInstance}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onNodeClick={handleNodeClick}
        nodeTypes={nodeTypes}
        fitView
        attributionPosition="top-right"
      >
        <Controls />
        <MiniMap />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </div>
  );
};

export default FlowBuilder;

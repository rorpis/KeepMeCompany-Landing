import React, { useState, useCallback, useEffect } from 'react';
import ReactFlow, { 
  Background,
  useNodesState,
  useEdgesState,
  addEdge
} from 'reactflow';
import 'reactflow/dist/style.css';

import ConversationNode from './ConversationNodes';
import { initialNodes, initialEdges, nodeTemplates, createNodeFromTemplate } from './flowData';
import { autoLayoutNodes } from './layoutUtils';
import ConversationPath from './ConversationPaths';

// Define custom node and edge types
const nodeTypes = {
  conversation: ConversationNode
};

const edgeTypes = {
  custom: ConversationPath
};

export default function ConversationFlowEditor() {
  const [nodes, setNodes, onNodesChange] = useNodesState(
    initialNodes.map(node => ({
      ...node,
      data: {
        ...node.data,
        onDelete: (id) => handleNodeDelete(id),
        onUpdate: (id, newData) => handleNodeUpdate(id, newData)
      }
    }))
  );
  
  const [edges, setEdges, onEdgesChange] = useEdgesState(
    initialEdges.map(edge => ({
      ...edge,
      data: {
        ...edge.data,
        onUpdate: (id, newData) => handleEdgeUpdate(id, newData)
      }
    }))
  );

  const handleNodeDelete = useCallback((id) => {
    setNodes((nodes) => nodes.filter((node) => node.id !== id));
    setEdges((edges) =>
      edges.filter((edge) => edge.source !== id && edge.target !== id)
    );
  }, [setNodes, setEdges]);

  const handleNodeUpdate = useCallback((id, newData) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === id 
          ? { 
              ...node, 
              data: { 
                ...node.data, 
                ...newData,
                onDelete: node.data.onDelete,
                onUpdate: node.data.onUpdate
              } 
            }
          : node
      )
    );
  }, [setNodes]);

  const handleEdgeUpdate = useCallback((id, newData) => {
    setEdges((eds) =>
      eds.map((edge) =>
        edge.id === id
          ? {
              ...edge,
              data: {
                ...edge.data,
                ...newData,
                onUpdate: edge.data.onUpdate
              }
            }
          : edge
      )
    );
  }, [setEdges]);

  const onEdgeClick = useCallback((event, edge) => {
    event.stopPropagation();
    setEdges((eds) => eds.filter((e) => e.id !== edge.id));
  }, [setEdges]);

  const onConnect = useCallback((params) => {
    setEdges((eds) =>
      addEdge(
        {
          ...params,
          type: 'custom',
          animated: true,
          data: { 
            label: 'New Connection',
            onUpdate: (id, newData) => handleEdgeUpdate(id, newData)
          },
          style: { stroke: '#666', strokeWidth: 2, strokeDasharray: '5,5' }
        },
        eds
      )
    );
  }, [setEdges, handleEdgeUpdate]);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback((event) => {
    event.preventDefault();
    const type = event.dataTransfer.getData('application/reactflow');
    const template = nodeTemplates.find(t => t.type === type);
    if (!template) return;

    const reactFlowBounds = document.querySelector('.react-flow').getBoundingClientRect();
    const position = {
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    };

    const newNode = createNodeFromTemplate(template, position);
    newNode.data = {
      ...newNode.data,
      onDelete: (id) => handleNodeDelete(id),
      onUpdate: (id, newData) => handleNodeUpdate(id, newData)
    };

    setNodes((nds) => nds.concat(newNode));
  }, [setNodes, handleNodeDelete, handleNodeUpdate]);

  const handleAutoLayout = useCallback(() => {
    const newNodes = autoLayoutNodes(nodes, edges, 180, 450);
    setNodes(newNodes);
  }, [edges, nodes, setNodes]);

  // Trigger auto-layout once when the component mounts
  useEffect(() => {
    handleAutoLayout();
  }, []); // empty dependency array ensures this runs only once

  return (
    <div className="flex h-[600px] w-full">
      {/* Sidebar */}
      <div className="w-16 bg-gray-800 p-2 border-r border-gray-700 flex flex-col items-center">
        {nodeTemplates.map((template, index) => (
          <div
            key={index}
            className="w-12 h-12 bg-black hover:bg-gray-900 rounded-lg mb-2 cursor-move flex items-center justify-center transition-colors"
            draggable
            onDragStart={(event) => {
              event.dataTransfer.setData('application/reactflow', template.type);
              event.dataTransfer.effectAllowed = 'move';
            }}
          >
            <div className="text-gray-400 text-2xl">+</div>
          </div>
        ))}
        {/* Auto-Layout Button */}
        <button
          onClick={handleAutoLayout}
          className="mt-4 px-2 py-1 text-xs bg-blue-600 hover:bg-blue-500 text-white rounded"
        >
          Auto-Layout
        </button>
      </div>

      {/* Flow Editor */}
      <div className="flex-1 h-full bg-gray-900 react-flow">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onEdgeClick={onEdgeClick}
          onDragOver={onDragOver}
          onDrop={onDrop}
          defaultEdgeOptions={{
            type: 'custom',
            animated: true,
            style: { stroke: '#666', strokeWidth: 2, strokeDasharray: '5,5' }
          }}
          fitView
        >
          <Background color="#333" gap={16} />
        </ReactFlow>
      </div>
    </div>
  );
}

import React, { useState, useCallback, useEffect } from 'react';
import ReactFlow, { 
  Background,
  useNodesState,
  useEdgesState,
  addEdge
} from 'reactflow';
import 'reactflow/dist/style.css';

import ConversationNode from './ConversationNodes';
import ConversationPath from './ConversationPaths';
import { initialNodes, initialEdges, nodeTemplates, createNodeFromTemplate } from './flowData';
import { autoLayoutNodes, getHiddenNodes, getVisibleElements } from './layoutUtils';

const nodeTypes = {
  conversation: ConversationNode
};

const edgeTypes = {
  custom: ConversationPath
};

export default function ConversationFlowEditor() {
  // Existing states for nodes, edges, and node visibility.
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [hiddenNodeIds, setHiddenNodeIds] = useState(new Set());
  const [appearingNodes, setAppearingNodes] = useState(new Set());
  
  // New state for managing the current pulsing node.
  const [activePulseNodeId, setActivePulseNodeId] = useState(null);
  
  // Define the pulse animation sequence: only include the first and second node with 500ms duration each.
  const pulseSequence = [
    { nodeId: '1', duration: 2500 },
    { nodeId: '2', duration: 2500 },
  ];

  const handleNodeSelect = useCallback((nodeId) => {
    if (hiddenNodeIds.has(nodeId)) {
      // Show nodes: mark as appearing and clear hidden state.
      const nodesBecomingVisible = Array.from(hiddenNodeIds);
      setAppearingNodes(new Set(nodesBecomingVisible));
      setHiddenNodeIds(new Set());
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setAppearingNodes(new Set());
        });
      });
    } else {
      const newHiddenNodes = getHiddenNodes(nodeId, nodes, edges);
      setHiddenNodeIds(newHiddenNodes);
      setAppearingNodes(new Set());
    }
  }, [nodes, edges, hiddenNodeIds]);

  const onConnect = useCallback((params) => {
    setEdges((eds) =>
      addEdge(
        {
          ...params,
          type: 'custom',
          animated: true,
          style: { stroke: '#666', strokeWidth: 2, strokeDasharray: '5,5' }
        },
        eds
      )
    );
  }, [setEdges]);

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
    setNodes((nds) => nds.concat(newNode));
  }, [setNodes]);

  const handleAutoLayout = useCallback(() => {
    const newNodes = autoLayoutNodes(nodes, edges, 180, 450);
    setNodes(newNodes);
  }, [edges, nodes, setNodes]);

  // Sequentially animate the pulse for each node in the pulseSequence.
  const startPulseAnimation = useCallback(async () => {
    for (let i = 0; i < pulseSequence.length; i++) {
      const { nodeId, duration } = pulseSequence[i];
      setActivePulseNodeId(nodeId);
      // Wait for the specified duration.
      await new Promise(resolve => setTimeout(resolve, duration));
    }
    // Clear the active pulse indicator when done.
    setActivePulseNodeId(null);
  }, [pulseSequence]);

  useEffect(() => {
    handleAutoLayout();
  }, []);

  // Get visible elements (filtered nodes and edges) and add animation state.
  const { visibleNodes, visibleEdges } = getVisibleElements(nodes, edges, hiddenNodeIds);
  
  // When passing nodes to ReactFlow, include both the appearing state and the new isPulsing flag.
  const nodesWithAnimationState = visibleNodes.map(node => ({
    ...node,
    data: {
      ...node.data,
      appearing: appearingNodes.has(node.id),
      isPulsing: activePulseNodeId === node.id
    }
  }));

  return (
    <div className="flex h-[600px] w-full">
      {/* Sidebar */}
      <div className="w-72 bg-gray-800 p-4 border-r border-gray-700 flex flex-col">
        <div className="mb-4">
          <h3 className="text-white text-sm font-semibold mb-2">Add New Node</h3>
          <div className="flex gap-2">
            {nodeTemplates.map((template, index) => (
              <div
                key={index}
                className="w-12 h-12 bg-black hover:bg-gray-900 rounded-lg cursor-move flex items-center justify-center transition-colors"
                draggable
                onDragStart={(event) => {
                  event.dataTransfer.setData('application/reactflow', template.type);
                  event.dataTransfer.effectAllowed = 'move';
                }}
              >
                <div className="text-gray-400 text-2xl">+</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <button
            onClick={handleAutoLayout}
            className="px-3 py-1 text-xs bg-blue-600 hover:bg-blue-500 text-white rounded"
          >
            Auto-Layout
          </button>
        </div>
        
        {/* New Button to trigger the Pulse Animation */}
        <div className="mb-4">
          <button
            onClick={startPulseAnimation}
            className="px-3 py-1 text-xs bg-green-600 hover:bg-green-500 text-white rounded"
          >
            Start Pulse Animation
          </button>
        </div>

        <div>
          <h3 className="text-white text-sm font-semibold mb-2">Test Node Hiding</h3>
          <div className="space-y-2 max-h-[400px] overflow-y-auto">
            {nodes.map((node) => (
              <div key={node.id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id={`node-${node.id}`}
                  checked={hiddenNodeIds.has(node.id)}
                  onChange={() => handleNodeSelect(node.id)}
                  className="rounded border-gray-600"
                />
                <label htmlFor={`node-${node.id}`} className="text-gray-300 text-sm">
                  {node.data.label} (ID: {node.id})
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Flow Editor */}
      <div className="flex-1 h-full bg-gray-900 react-flow">
        <ReactFlow
          nodes={nodesWithAnimationState}
          edges={visibleEdges}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
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

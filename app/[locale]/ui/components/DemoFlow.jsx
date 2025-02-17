'use client';

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { ReactFlowProvider, useReactFlow } from 'reactflow';
import dynamic from 'next/dynamic';

const ConversationFlowEditor = dynamic(
  () => import('./FlowEditor'),
  { ssr: false }
);

//Original demo for Receptionist Inbound Call
const demoSequence = [
  {
    nodeId: '1',
    duration: 3000,
    pathToNext: { edgeId: 'e1-2', duration: 1500 }
  },
  {
    nodeId: '2',
    duration: 2500,
    pathToNext: { edgeId: 'e2-3', duration: 1500 }
  },
  {
    nodeId: '3',
    duration: 2500,
    pathToNext: { edgeId: 'e3-4', duration: 1500 }
  },
  {
    nodeId: '4',
    duration: 2500,
    pathToNext: { edgeId: 'e4-8', duration: 1500 }
  },
  {
    nodeId: '8',
    duration: 2500,
    pathToNext: { edgeId: 'e8-11', duration: 1500 }
  },
  {
    nodeId: '11',
    duration: 3000
  }
];

//Demo for QOF Vaccination Call
// const demoSequence = [
//   {
//     nodeId: '1',
//     duration: 2710,  // 4210 - 1500 transition time
//     pathToNext: { edgeId: 'e1-2', duration: 1500 }
//   },
//   {
//     nodeId: '2',
//     duration: 6590,  // 8090 - 1500 transition time
//     pathToNext: { edgeId: 'e2-3', duration: 1500 }
//   },
//   {
//     nodeId: '3',
//     duration: 8120,  // 8120 - 1500 transition time
//     pathToNext: { edgeId: 'e3-5', duration: 1500 }
//   },
//   {
//     nodeId: '5',
//     duration: 10470,  // Brief question about vaccines
//     pathToNext: { edgeId: 'e5-4', duration: 1500 }
//   },
//   {
//     nodeId: '4',
//     duration: 2660,  // 4160 - 1500 transition time
//     pathToNext: { edgeId: 'e4-7', duration: 1500 }
//   },
//   {
//     nodeId: '7',
//     duration: 3500  // Final node, no transition needed
//   }
// ];

function useFlowDemo(sequence) {
  const { getNode, setViewport } = useReactFlow();

  const [isPlaying, setIsPlaying] = useState(false);
  const [activeNodeId, setActiveNodeId] = useState(null);
  const [activePathId, setActivePathId] = useState(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const timeoutRef = useRef(null);

  const clearAllTimeouts = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  useEffect(() => () => clearAllTimeouts(), [clearAllTimeouts]);

  const processStep = useCallback(
    (index) => {
      if (index >= sequence.length) {
        setIsPlaying(false);
        setActiveNodeId(null);
        setActivePathId(null);
        return;
      }

      setCurrentStepIndex(index);
      const step = sequence[index];
      const node = getNode(step.nodeId);
      
      if (node) {
        setViewport(
          {
            x: -node.position.x + (window.innerWidth / 2) - 210,
            y: -node.position.y + (window.innerHeight / 2) - 160,
            zoom: 0.8
          },
          {
            duration: 1000,
            easing: (t) => t * (2 - t)
          }
        );
        
        setActiveNodeId(step.nodeId);

        if (step.pathToNext) {
          timeoutRef.current = setTimeout(() => {
            setActivePathId(step.pathToNext.edgeId);

            timeoutRef.current = setTimeout(() => {
              setActivePathId(null);
              processStep(index + 1);
            }, step.pathToNext.duration);
          }, step.duration);
        } else {
          timeoutRef.current = setTimeout(() => {
            processStep(index + 1);
          }, step.duration);
        }
      }
    },
    [getNode, sequence, setViewport]
  );

  const startDemo = useCallback(() => {
    if (!isPlaying) {
      setIsPlaying(true);
      setCurrentStepIndex(0);
      processStep(0);
    }
  }, [isPlaying, processStep]);

  const stopDemo = useCallback(() => {
    clearAllTimeouts();
    setIsPlaying(false);
    setActiveNodeId(null);
    setActivePathId(null);
    setCurrentStepIndex(0);
  }, [clearAllTimeouts]);

  return {
    isPlaying,
    activeNodeId,
    activePathId,
    currentStepIndex,
    startDemo,
    stopDemo
  };
}

export default function DemoFlow() {
  return (
    <div className="min-h-screen bg-black p-8">
      <ReactFlowProvider>
        <DemoContainer />
      </ReactFlowProvider>
    </div>
  );
}

function DemoContainer() {
  const {
    isPlaying,
    activeNodeId,
    activePathId,
    startDemo,
    stopDemo
  } = useFlowDemo(demoSequence);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-white">
        Conversation Flow Editor Demo
      </h2>

      <div className="mb-4">
        <button
          onClick={startDemo}
          disabled={isPlaying}
          className="px-3 py-1 bg-green-600 text-white rounded mr-2"
        >
          Start Demo
        </button>
        <button
          onClick={stopDemo}
          disabled={!isPlaying}
          className="px-3 py-1 bg-red-600 text-white rounded"
        >
          Stop Demo
        </button>
      </div>

      <ConversationFlowEditor
        activeNodeId={activeNodeId}
        activePathId={activePathId}
      />
    </div>
  );
}
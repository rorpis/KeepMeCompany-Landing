'use client';

import React from 'react';
import dynamic from 'next/dynamic';

// We need to dynamically import ReactFlow because it uses browser APIs
const ConversationFlowEditor = dynamic(
  () => import('../components/ConversationFlowEditor'),
  { ssr: false }
);

export default function UIShowcase() {
  return (
    <div className="min-h-screen bg-black p-8">
      
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-white">Conversation Flow Editor</h2>
        <div className="border border-gray-800 rounded-lg overflow-hidden">
          <ConversationFlowEditor />
        </div>
      </div>
    </div>
  );
}
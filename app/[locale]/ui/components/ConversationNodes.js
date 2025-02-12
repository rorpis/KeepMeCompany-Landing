import React from 'react';
import { Handle, Position } from 'reactflow';
import { PhoneCall, MessageSquare, Lock, ClipboardPlus } from 'lucide-react';

const nodeTypeColors = {
  regular: 'bg-black',
  verification: 'bg-green-900',
  anamnesis: 'bg-blue-900',
  first: 'bg-black'
};

const nodeTypeIcons = {
  regular: <MessageSquare className="w-4 h-4 text-white" />,
  verification: <Lock className="w-4 h-4 text-white" />,
  anamnesis: <ClipboardPlus className="w-4 h-4 text-white" />,
  first: <PhoneCall className="w-4 h-4 text-white" />
};

export default function ConversationNode({ data, id }) {
  // If the node is marked as pulsing, add the heartbeat animation style.
  const heartbeatStyle = data.isPulsing ? { animation: 'heartbeat 2.5s infinite' } : {};
  
  // Combine the existing appearing style with the heartbeat animation.
  const combinedStyle = {
    transform: data.appearing ? 'scale(0.9)' : 'scale(1)',
    opacity: data.appearing ? 0 : 1,
    transition: 'transform 300ms cubic-bezier(0.4, 0, 0.2, 1), opacity 300ms cubic-bezier(0.4, 0, 0.2, 1)',
    transitionDelay: data.appearing ? `${data.animationDelay}ms` : '0ms',
    ...heartbeatStyle
  };

  return (
    <div className="relative">
      <style>{`
        @keyframes heartbeat {
          0% { transform: scale(1); }
          25% { transform: scale(1.05); }
          50% { transform: scale(1); }
          75% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        @keyframes travelingStroke {
          from {
            stroke-dashoffset: 0;
          }
          to {
            stroke-dashoffset: -1000;
          }
        }
        .traveling-stroke {
          stroke-dasharray: 40, 960;
          animation: travelingStroke 3s linear infinite;
        }
      `}</style>
      <div
        className={`relative flex flex-col border-2 border-white/10 border-gray-800 rounded-lg p-4 min-w-[200px] max-w-[250px] ${nodeTypeColors[data.nodeType || 'regular']}`}
        style={combinedStyle}
      >
        <div className="flex items-center gap-2 mb-2">
          {nodeTypeIcons[data.nodeType || 'regular']}
          <h3 className="text-white font-medium">{data.label}</h3>
        </div>

        {data.description && (
          <p
            className={`text-sm text-gray-400 ${data.isFixedResponse ? 'italic' : ''}`}
            style={{
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitLineClamp: '2',
              WebkitBoxOrient: 'vertical'
            }}
          >
            {data.isFixedResponse ? `"${data.description}"` : data.description}
          </p>
        )}

        {data.nodeType !== 'first' && (
          <Handle
            type="target"
            position={Position.Top}
            className="w-3 h-3 bg-gray-500 border-2 border-dark"
          />
        )}
        <Handle
          type="source"
          position={Position.Bottom}
          className="w-3 h-3 bg-gray-500 border-2 border-dark"
        />
        {/* Conditionally render the marching ants border when pulsing */}
        {data.isPulsing && (
          <svg
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              pointerEvents: 'none'
            }}
          >
            <rect
              x="0"
              y="0"
              width="100%"
              height="100%"
              rx="8"
              fill="none"
              stroke="white"
              strokeWidth="4"
              strokeDasharray="8"
              className="traveling-stroke"
            />
          </svg>
        )}
      </div>
    </div>
  );
}

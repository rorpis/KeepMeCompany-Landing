import React from 'react';
import { BaseEdge, EdgeLabelRenderer, getBezierPath } from 'reactflow';
import { defaultEdgeLabels } from './flowData';

export default function ConversationPath(props) {
  const {
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    data,
    style = {},
    markerEnd,
    source,
    target,
  } = props;

  const key = `${source}-${target}`;
  const labelToShow = data?.label || defaultEdgeLabels[key] || '';

  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <>
      <BaseEdge
        path={edgePath}
        markerEnd={markerEnd}
        style={style}
      />

      {labelToShow && (
        <EdgeLabelRenderer>
          <div
            style={{
              position: 'absolute',
              transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
              pointerEvents: 'none',
            }}
            className="nodrag nopan"
          >
            <div className="bg-gray-200/90 border border-gray-300/90 text-gray-800/90 px-3 py-1 rounded-full">
              <span>{labelToShow}</span>
            </div>
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
}
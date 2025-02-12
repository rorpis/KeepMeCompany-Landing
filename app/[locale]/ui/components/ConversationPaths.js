import React, { useState } from 'react';
import { BaseEdge, EdgeLabelRenderer, getBezierPath } from 'reactflow';
import { Edit2 } from 'lucide-react';
import PopupEditor from './PopupEditor';
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
    onClick,
    source,
    target,
  } = props;

  // Construct the key from the source and target IDs.
  const key = `${source}-${target}`;
  const labelToShow = data?.label || defaultEdgeLabels[key] || "Click to edit";

  const [isEditing, setIsEditing] = useState(false);
  const [editLabel, setEditLabel] = useState(data?.label || '');
  const [isHovered, setIsHovered] = useState(false);

  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const handleSave = () => {
    data.onUpdate(id, { label: editLabel });
    setIsEditing(false);
  };

  return (
    <>
      <BaseEdge
        path={edgePath}
        markerEnd={markerEnd}
        style={{ ...style, cursor: 'pointer' }}
        onClick={(event) => {
          event.stopPropagation();
          if (isHovered) {
            onClick(event, { id });
          }
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="hover:stroke-2"
      />

      <EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
            pointerEvents: 'all',
          }}
          className="nodrag nopan"
          onClick={(e) => {
            e.stopPropagation();
            if (!isEditing) {
              setEditLabel(data?.label || '');
              setIsEditing(true);
            }
          }}
        >
          {isEditing ? (
            <PopupEditor onClose={() => setIsEditing(false)}>
              <input
                type="text"
                value={editLabel}
                onChange={(e) => setEditLabel(e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 rounded border border-gray-700 text-white text-sm mb-2"
                autoFocus
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-3 py-1 text-sm rounded bg-gray-800 hover:bg-gray-700 text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-3 py-1 text-sm rounded bg-blue-600 hover:bg-blue-500 text-white transition-colors"
                >
                  Save
                </button>
              </div>
            </PopupEditor>
          ) : (
            <div className="bg-gray-200/90 border border-gray-300/90 text-gray-800/90 px-3 py-1 rounded-full flex items-center gap-2 cursor-pointer hover:bg-gray-200 hover:text-gray-800 transition-colors">
              <span>{labelToShow}</span>
              <Edit2 className="w-4 h-4 text-gray-600/90" />
            </div>
          )}
        </div>
      </EdgeLabelRenderer>
    </>
  );
}

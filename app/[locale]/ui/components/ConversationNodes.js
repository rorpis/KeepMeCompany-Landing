import React, { useState, useRef } from 'react';
import { Handle, Position } from 'reactflow';
import { Lock, Trash2, Edit2,PhoneCall, MessageSquare, ClipboardPlus } from 'lucide-react';
import PopupEditor from './PopupEditor';

const nodeTypeColors = {
  regular: 'bg-black',
  verification: 'bg-green-900',
  anamnesis: 'bg-blue-900',
  // "first" nodes now use the same color as regular ones:
  first: 'bg-black'
};

const nodeTypeIcons = {
  regular: <MessageSquare className="w-4 h-4 text-white" />,
  verification: <Lock className="w-4 h-4 text-white" />,
  anamnesis: <ClipboardPlus className="w-4 h-4 text-white" />,
  first: <PhoneCall className="w-4 h-4 text-white" />
};

export default function ConversationNode({ data, id }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    label: data.label,
    description: data.description,
    nodeType: data.nodeType || 'regular',
    isFixedResponse: data.isFixedResponse || false,
  });

  const popupRef = useRef(null);

  const handleSave = () => {
    data.onUpdate(id, editData);
    setIsEditing(false);
  };

  const openEdit = () => {
    setEditData({
      label: data.label,
      description: data.description,
      nodeType: data.nodeType || 'regular',
      isFixedResponse: data.isFixedResponse || false,
    });
    setIsEditing(true);
  };

  return (
    <div className="relative">
      {/* Main Node */}
      <div
        className={`relative flex flex-col border-2 border-white/10 border-gray-800 rounded-lg p-4 min-w-[200px] max-w-[250px] ${nodeTypeColors[data.nodeType || 'regular']}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onDoubleClick={openEdit}
      >
        {/* Action Buttons */}
        {isHovered && (
          <div className="absolute -top-3 -right-3 flex gap-2">
            <button
              className="p-1 bg-blue-500 rounded-full hover:bg-blue-600 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                openEdit();
              }}
            >
              <Edit2 className="w-4 h-4 text-white" />
            </button>
            <button
              className="p-1 bg-red-500 rounded-full hover:bg-red-600 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                data.onDelete(id);
              }}
            >
              <Trash2 className="w-4 h-4 text-white" />
            </button>
          </div>
        )}

        <div className="flex items-center gap-2 mb-2">
          {nodeTypeIcons[data.nodeType || 'regular']}
          <h3 className="text-white font-medium">{data.label}</h3>
        </div>

        {/* Render the description.
            If fixed response is active, display the text in italic and wrapped in quotations. */}
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

        {/* For "First Node", do not render the top (incoming) connection handle */}
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
      </div>

      {/* Edit Popup rendered via PopupEditor */}
      {isEditing && (
        <PopupEditor onClose={() => setIsEditing(false)}>
          <div className="flex flex-col gap-4 w-[500px]">
            {/* Label Field */}
            <div>
              <label className="block text-sm text-gray-300 mb-1">Label</label>
              <input
                type="text"
                value={editData.label}
                onChange={(e) =>
                  setEditData((prev) => ({ ...prev, label: e.target.value }))
                }
                className="w-full px-3 py-2 bg-gray-800 rounded border border-gray-900 text-white text-sm"
              />
            </div>
            {/* Description (or Exact Words) Field */}
            <div>
              <label className="block text-sm text-gray-300 mb-1">
                {editData.isFixedResponse ? 'Exact Words' : 'Description'}
              </label>
              <textarea
                value={editData.description}
                onChange={(e) =>
                  setEditData((prev) => ({ ...prev, description: e.target.value }))
                }
                className="w-full px-3 py-2 bg-gray-800 rounded border border-gray-700 text-white text-sm"
                rows={3}
              />
            </div>
            {/* Fixed Response Toggle (placed immediately below the description textarea) */}
            <div className="flex items-center gap-2">
              <input
                id={`toggle-${id}`}
                type="checkbox"
                checked={editData.isFixedResponse}
                onChange={(e) =>
                  setEditData((prev) => ({
                    ...prev,
                    isFixedResponse: e.target.checked,
                  }))
                }
                className="h-4 w-4 text-blue-600"
              />
              <label htmlFor={`toggle-${id}`} className="text-sm text-gray-300">
                Fixed Response Mode
              </label>
            </div>
            {/* Node Type Selection */}
            <div>
              <label className="block text-sm text-gray-300 mb-1">Node Type</label>
              <select
                value={editData.nodeType}
                onChange={(e) =>
                  setEditData((prev) => ({ ...prev, nodeType: e.target.value }))
                }
                className="w-full px-3 py-2 bg-gray-800 rounded border border-gray-700 text-white text-sm"
              >
                <option value="regular">Regular</option>
                <option value="verification">Verification</option>
                <option value="anamnesis">Anamnesis</option>
                <option value="first">First Node</option>
              </select>
            </div>
            <div className="flex justify-end gap-2 mt-2">
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
          </div>
        </PopupEditor>
      )}
    </div>
  );
}

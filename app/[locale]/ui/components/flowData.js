import { Trash2 } from 'lucide-react';

export const initialNodes = [
  {
    id: '1',
    type: 'conversation',
    position: { x: 250, y: 0 },
    data: { 
      label: 'Greeting',
      description: 'Hello! this is Alex from the London Medical Centre',
      nodeType: 'first',
      isFixedResponse: true
    }
  },
  {
    id: '2',
    type: 'conversation',
    position: { x: 250, y: 100 },
    data: { 
      label: 'Identity Verification',
      description: 'Verify patient identity using standard procedures',
      nodeType: 'verification'
    }
  },
  {
    id: '3',
    type: 'conversation',
    position: { x: 250, y: 200 },
    data: { 
      label: 'Reason for the call',
      description: 'Ask how we can help today',
      nodeType: 'regular'
    }
  },
  {
    id: '4',
    type: 'conversation',
    position: { x: 100, y: 350 },
    data: { 
      label: 'Process Prescription Refill',
      description: 'Handle prescription refill request',
      nodeType: 'regular'
    }
  },
  {
    id: '5',
    type: 'conversation',
    position: { x: 400, y: 350 },
    data: { 
      label: 'Medical Consultation Request',
      description: 'Process request to see a doctor',
      nodeType: 'regular'
    }
  },
  {
    id: '6',
    type: 'conversation',
    position: { x: 400, y: 450 },
    data: { 
      label: 'Patient Intake',
      description: 'Gather basic information about symptoms and urgency',
      nodeType: 'anamnesis'
    }
  },
  {
    id: '7',
    type: 'conversation',
    position: { x: 250, y: 550 },
    data: { 
      label: 'Finish call',
      description: 'Thank the patient and end the call',
      nodeType: 'regular'
    }
  }
];

export const initialEdges = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    label: '',
    type: 'custom',
    animated: true,
    style: { stroke: '#666', strokeWidth: 2, strokeDasharray: '5,5' }
  },
  {
    id: 'e2-3',
    source: '2',
    target: '3',
    label: '',
    type: 'custom',
    animated: true,
    style: { stroke: '#666', strokeWidth: 2, strokeDasharray: '5,5' }
  },
  {
    id: 'e3-4',
    source: '3',
    target: '4',
    label: 'Patient needs a prescription refill',
    type: 'custom',
    animated: true,
    style: { stroke: '#666', strokeWidth: 2, strokeDasharray: '5,5' }
  },
  {
    id: 'e3-5',
    source: '3',
    target: '5',
    label: 'Patient needs to see a doctor',
    type: 'custom',
    animated: true,
    style: { stroke: '#666', strokeWidth: 2, strokeDasharray: '5,5' }
  },
  {
    id: 'e5-6',
    source: '5',
    target: '6',
    label: '',
    type: 'custom',
    animated: true,
    style: { stroke: '#666', strokeWidth: 2, strokeDasharray: '5,5' }
  },
  {
    id: 'e6-7',
    source: '6',
    target: '7',
    label: '',
    type: 'custom',
    animated: true,
    style: { stroke: '#666', strokeWidth: 2, strokeDasharray: '5,5' }
  },
  {
    id: 'e4-7',
    source: '4',
    target: '7',
    label: '',
    type: 'custom',
    animated: true,
    style: { stroke: '#666', strokeWidth: 2, strokeDasharray: '5,5' }
  }
];

// Template nodes for the sidebar – only one template now
export const nodeTemplates = [
  {
    type: 'conversation',
    data: { 
      label: 'New Conversation Node',
      description: 'Describe the conversation step',
      nodeType: 'regular'
    }
  }
];

// Function to create a new node from template
export const createNodeFromTemplate = (template, position) => {
  return {
    id: `node_${Date.now()}`,
    type: template.type,
    position,
    data: { ...template.data }
  };
};

// Default edge labels based on source-target pairs
export const defaultEdgeLabels = {
  "1-2": "Verify ID",
  "2-3": "Get reason for the call",
  "3-4": "Need prescription refill",
  "3-5": "Need to see a doctor",
  "5-6": "Assess",
  "6-7": "Finish call",
  "4-7": "Finish call"
};

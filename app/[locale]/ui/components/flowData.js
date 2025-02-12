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
    id: '6',
    type: 'conversation',
    position: { x: 400, y: 350 },
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
  },
  {
    id: '8',
    type: 'conversation',
    position: { x: 50, y: 450 },
    data: { 
      label: 'Prescription Ready for Pickup',
      description: 'Inform patient their prescription can be picked up',
      nodeType: 'regular'
    }
  },
  {
    id: '9',
    type: 'conversation',
    position: { x: 150, y: 450 },
    data: { 
      label: 'Prescription Needs Prior Authorization',
      description: 'Inform patient that prior authorization is required',
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
    id: 'e3-6',
    source: '3',
    target: '6',
    label: 'Need to see a doctor',
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
    id: 'e4-8',
    source: '4',
    target: '8',
    label: 'Prescription is available',
    type: 'custom',
    animated: true,
    style: { stroke: '#666', strokeWidth: 2, strokeDasharray: '5,5' }
  },
  {
    id: 'e4-9',
    source: '4',
    target: '9',
    label: 'Authorization needed',
    type: 'custom',
    animated: true,
    style: { stroke: '#666', strokeWidth: 2, strokeDasharray: '5,5' }
  },
  {
    id: 'e8-7',
    source: '8',
    target: '7',
    label: '',
    type: 'custom',
    animated: true,
    style: { stroke: '#666', strokeWidth: 2, strokeDasharray: '5,5' }
  }
];

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

export const createNodeFromTemplate = (template, position) => {
  return {
    id: `node_${Date.now()}`,
    type: template.type,
    position,
    data: { ...template.data }
  };
};

export const defaultEdgeLabels = {
  "1-2": "Verify ID",
  "2-3": "Get reason for the call",
  "3-4": "Need prescription refill",
  "3-6": "Need to see a doctor",
  "6-7": "Finish call",
  "4-8": "Prescription is available",
  "4-9": "Authorization needed",
  "8-7": "Finish call"
};
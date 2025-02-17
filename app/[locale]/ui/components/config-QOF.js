// File: flowData.js

export const initialNodes = [
  {
    id: '1',
    type: 'conversation',
    position: { x: 250, y: 0 },
    data: {
      label: 'Greeting',
      description: 'Hello! this is Alex from the London Medical Centre',
      nodeType: 'first',
      isFixedResponse: true,
      group: 'Initial Contact'
    }
  },
  {
    id: '2',
    type: 'conversation',
    position: { x: 250, y: 100 },
    data: {
      label: 'Baby Vaccination Status',
      description: 'Tell the patient that according to your record their child needs a vaccination',
      nodeType: 'verification',
      group: 'Context'
    }
  },
  {
    id: '3',
    type: 'conversation',
    position: { x: 250, y: 200 },
    data: {
      label: 'Booking Decision',
      description: 'Ask the patient to come to get their vaccinations',
      nodeType: 'regular',
      group: 'Decision'
    }
  },
  {
    id: '4',
    type: 'conversation',
    position: { x: 100, y: 300 },
    data: {
      label: 'Create Booking Task',
      description: 'Create task for reception to schedule vaccination appointment',
      nodeType: 'anamnesis',
      group: 'Action'
    }
  },
  {
    id: '5',
    type: 'conversation',
    position: { x: 250, y: 300 },
    data: {
      label: 'Vaccine Information',
      description: 'Provide information about recommended vaccinations',
      nodeType: 'regular',
      group: 'Information'
    }
  },
  {
    id: '6',
    type: 'conversation',
    position: { x: 400, y: 300 },
    data: {
      label: 'Note Decline',
      description: 'Record that patient declined vaccinations',
      nodeType: 'regular',
      group: 'Action'
    }
  },
  {
    id: '7',
    type: 'conversation',
    position: { x: 250, y: 400 },
    data: {
      label: 'End Call',
      description: 'Thank you for your time',
      nodeType: 'last',
      group: 'Closing'
    }
  }
];

export const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', data: { label: 'Context' }, type: 'custom', animated: true },
  { id: 'e2-3', source: '2', target: '3', data: { label: 'Get decision' }, type: 'custom', animated: true },
  
  { id: 'e3-4', source: '3', target: '4', data: { label: 'Yes' }, type: 'custom', animated: true },
  { id: 'e3-5', source: '3', target: '5', data: { label: 'Patient has questions' }, type: 'custom', animated: true },
  { id: 'e3-6', source: '3', target: '6', data: { label: 'No' }, type: 'custom', animated: true },
  
  { id: 'e5-4', source: '5', target: '4', data: { label: 'Wants to book' }, type: 'custom', animated: true },
  { id: 'e5-6', source: '5', target: '6', data: { label: 'Doesn\'t want to' }, type: 'custom', animated: true },
  
  { id: 'e4-7', source: '4', target: '7', data: { label: 'Finish' }, type: 'custom', animated: true },
  { id: 'e6-7', source: '6', target: '7', data: { label: 'Finish' }, type: 'custom', animated: true }
];

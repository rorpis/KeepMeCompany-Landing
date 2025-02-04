export const transcriptionData = [
  {
    id: 1,
    speaker: 'Assistant',
    text: "Hello! This is Alice from the London Practice. To start, could you give me your full date of birth please?",
    timestamp: 6
  },
  {
    id: 2,
    speaker: 'Patient',
    text: "Sure, it's January 1st of 1990.",
    timestamp: 11
  },
  {
    id: 3,
    speaker: 'Assistant',
    text: "Could you please tell me your full name?",
    timestamp: 17
  },
  {
    id: 4,
    speaker: 'Patient',
    text: "It's Alex Morgan.",
    timestamp: 20
  },
  {
    id: 5,
    speaker: 'Assistant',
    text: "Thank you, Alex! Now, could you share the primary reason for your visit to the doctor today?",
    timestamp: 28
  },
  {
    id: 6,
    speaker: 'Patient',
    text: "Uh, sure. So I have been losing weight and feeling constantly anxious.",
    timestamp: 36
  },
  {
    id: 8,
    speaker: 'Patient',
    text: "And jittery.",
    timestamp: 38
  },
  {
    id: 9,
    speaker: 'Assistant',
    text: "How long have you been experiencing these symptoms?",
    timestamp: 44
  },
  {
    id: 10,
    speaker: 'Patient',
    text: "Um, for about 3 months.",
    timestamp: 47
  },
  {
    id: 11,
    speaker: 'Assistant',
    text: "Got it. Have you noticed any other symptoms?",
    timestamp: 52
  },
  {
    id: 12,
    speaker: 'Patient',
    text: "Um, so I've been nervous and irritable.",
    timestamp: 56
  },
  {
    id: 13,
    speaker: 'Assistant',
    text: "Alright, have you experienced any changes in your sleep patterns?",
    timestamp: 62
  },
  {
    id: 14,
    speaker: 'Patient',
    text: "Uh, yeah, I've been having insomnia.",
    timestamp: 66
  },
  {
    id: 15,
    speaker: 'Assistant',
    text: "Okay, so you're having some insomnia. Have you experienced any recent changes in your work or personal life that may have contributed to your current symptoms?",
    timestamp: 76
  },
  {
    id: 16,
    speaker: 'Patient',
    text: "Um, not that I know of, not that I can think of right now.",
    timestamp: 81
  },
  {
    id: 17,
    speaker: 'Assistant',
    text: "Alright, have you experienced any headaches recently?",
    timestamp: 87
  },
  {
    id: 18,
    speaker: 'Patient',
    text: "Uh, nope.",
    timestamp: 89
  },
  {
    id: 19,
    speaker: 'Assistant',
    text: "Okay, how about any changes in your appetite recently?",
    timestamp: 94
  },
  {
    id: 20,
    speaker: 'Patient',
    text: "I have been needing more, a lot more.",
    timestamp: 97
  },
  {
    id: 21,
    speaker: 'Assistant',
    text: "I see. Have you had any feelings of anxiety or stress recently?",
    timestamp: 103
  },
  {
    id: 22,
    speaker: 'Patient',
    text: "Yeah, both.",
    timestamp: 105
  },
  {
    id: 23,
    speaker: 'Assistant',
    text: "Okay, I'm sorry to hear that. Is there any last message you would like me to take note of?",
    timestamp: 111
  }
];

export const timestamps = {
  patient: {
    info: 23
  },
  condition: {
    main: 35
  },
  symptoms: {
    weightLoss: 37,
    anxiety: 37,
    jitteriness: 40,
    nervousness: 55,
    irritability: 57,
    insomnia: 65
  },
  pattern: {
    duration: 47
  },
  others: {
    appetite: 97,
    headaches: 90,
    changes: 80
  }
}; 
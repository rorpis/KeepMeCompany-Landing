import React from 'react';

const TranscriptsTable = () => {
  const questions = [
    {
      question: "Any shortness of breath?",
      answers: [
        { text: "No shortness", status: "ok" },
        { text: "No shortness", status: "ok" },
        { text: "No shortness", status: "ok" }
      ]
    },
    {
      question: "What's your temperature?",
      answers: [
        { text: "39", status: "alarming" },
        { text: "36", status: "ok" },
        { text: "36", status: "ok" }
      ]
    },
    {
      question: "Did you take the antibiotics today?",
      answers: [
        { text: "Yes, but late", status: "semi" },
        { text: "Yes", status: "ok" },
        { text: "Yes", status: "ok" }
      ]
    },
    {
      question: "How much liquid did you drink today?",
      answers: [
        { text: "2 lts", status: "ok" },
        { text: "2 lts", status: "ok" },
        { text: "1.5 lts", status: "ok" }
      ]
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'ok':
        return 'bg-green-100';
      case 'semi':
        return 'bg-yellow-100';
      case 'alarming':
        return 'bg-red-100';
      default:
        return '';
    }
  };

  return (
    <div className="w-full p-2">
      {/* Title */}
      <div className="text-right mb-2">
        <span className="italic underline text-xs">
          Read Transcripts
        </span>
      </div>

      {/* Table */}
      <div className="overflow-hidden border border-gray-200 rounded-lg text-xs">
        <table className="w-full divide-y divide-gray-200">
          <colgroup>
            <col style={{ width: '40%' }} />
            <col style={{ width: '20%' }} />
            <col style={{ width: '20%' }} />
            <col style={{ width: '20%' }} />
          </colgroup>
          <thead className="bg-gray-800">
            <tr>
              <th className="px-2 py-1 text-right text-xs font-semibold text-white">Questions</th>
              <th className="px-2 py-1 text-center text-xs font-semibold text-white">2</th>
              <th className="px-2 py-1 text-center text-xs font-semibold text-white">5</th>
              <th className="px-2 py-1 text-center text-xs font-semibold text-white">7</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {questions.map((item, index) => (
              <tr key={index}>
                <td className="px-2 py-1 text-right">
                  <span className="font-semibold text-xs text-black">{item.question}</span>
                </td>
                {item.answers.map((answer, idx) => (
                  <td 
                    key={idx} 
                    className={`px-2 py-1 text-center text-xs text-black ${getStatusColor(answer.status)}`}
                  >
                    {answer.text}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TranscriptsTable;
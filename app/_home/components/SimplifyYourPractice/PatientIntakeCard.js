import React from 'react';
import styles from './PatientIntakeCard.module.css';

const PatientIntakeCard = ({ 
  symptom, 
  patientName, 
  age, 
  urgencyColor,
  onHover,
  onLeave
}) => {
  const lightenUrgencyColor = (color) => {
    let hex = color.replace('#', '');
    const num = parseInt(hex, 16);
    const r = Math.min(255, (num >> 16) + 40);
    const g = Math.min(255, ((num >> 8) & 0x00FF) + 40);
    const b = Math.min(255, (num & 0x0000FF) + 40);
    return `rgb(${r}, ${g}, ${b})`;
  };

  return (
    <div
      className={`flex items-center gap-3 rounded-full py-2 px-5 w-60 opacity-90 ${styles.float}`}
      style={{ 
        backgroundColor: 'rgba(255, 255, 255, 0.85)', 
        transition: 'background-color 0.3s ease' 
      }}
      onMouseEnter={(e) => {
        const circle = e.currentTarget.querySelector('.urgency-circle');
        circle.style.backgroundColor = lightenUrgencyColor(urgencyColor);
        onHover();
      }}
      onMouseLeave={(e) => {
        const circle = e.currentTarget.querySelector('.urgency-circle');
        circle.style.backgroundColor = urgencyColor;
        onLeave();
      }}
    >
      <div
        className="urgency-circle w-7 h-7 rounded-full flex-shrink-0 border border-gray-500"
        style={{
          backgroundColor: urgencyColor,
          transition: 'background-color 0.3s ease',
        }}
      />
      <div className="flex flex-col">
        <div className="text-base font-semibold leading-tight text-black">
          {symptom}
        </div>
        <div className="text-sm italic text-gray-600">
          {patientName}, {age}
        </div>
      </div>
    </div>
  );
};

export default PatientIntakeCard;

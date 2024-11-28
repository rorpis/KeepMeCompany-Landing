// SimplifyYourPractice.js
"use client";

import React, { useState } from 'react';
import { SteppedAreaChart, dataBefore, dataAfter } from './SimplifyYourPractice/SteppedAreaCharts';
import PatientIntakeCard from './SimplifyYourPractice/PatientIntakeCard';
import styles from '../styles/SimplifyYourPractice.module.css';

const patientData = [
  {
    symptom: "Chest Pain",
    patientName: "Sergio",
    age: 67,
    urgencyColor: "#E57373",
    callDuration: "Call Duration: 7m 20s",
    additionalSymptoms: ["Shortness of breath", "Left arm numbness"],
    startedTime: "Started 3 hours ago"
  },
  {
    symptom: "Fever",
    patientName: "Sam",
    age: 17,
    urgencyColor: "#FFD54F",
    callDuration: "Call Duration: 3m 15s",
    additionalSymptoms: ["Headache", "Fatigue"],
    startedTime: "Started 6 hours ago"
  },
  {
    symptom: "Sore Throat",
    patientName: "Adam",
    age: 25,
    urgencyColor: "#81C784",
    callDuration: "Call Duration: 4m 45s",
    additionalSymptoms: ["Cough", "Runny Nose"],
    startedTime: "Started 2 days ago"
  }
];

const PatientPanel = ({ patient, isVisible }) => {
  if (!patient) return null;

  return (
    <div className={`${styles.patientPanel} ${styles.panelTransition} ${isVisible ? styles.panelVisible : ''}`}>
      <div className={styles.panelContent}>
        <div>{patient.callDuration}</div>
        <div>
          - {patient.symptom}
          {patient.additionalSymptoms.map((sym, index) => (
            <div key={index}>- {sym}</div>
          ))}
        </div>
        <div>{patient.startedTime}</div>
      </div>
    </div>
  );
};

const PatientCardsOverlay = ({ patientData }) => {
  const [hoveredPatient, setHoveredPatient] = useState(null);

  return (
    <div className={styles.overlayContainer}>
      <div className={styles.overlayContent}>
        <div className={styles.panelContainer}>
          <PatientPanel 
            patient={hoveredPatient} 
            isVisible={!!hoveredPatient}
          />
        </div>

        <div className={styles.cardsContainer}>
          {patientData.map((patient, index) => (
            <PatientIntakeCard
              key={index}
              {...patient}
              onHover={() => setHoveredPatient(patient)}
              onLeave={() => setHoveredPatient(null)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const SimplifyYourPractice = () => (
  <div className={styles.container}>
    {/* New Parent Node to encapsulate the Title and Charts */}
    <div className={styles.contentWrapper}>
      {/* Inline Styled Title */}
      <h2 className={styles.title}>
      Patients wait seconds
      </h2>

      {/* Existing Charts Container */}
      <div className={styles.chartsContainer}>
        <div className={styles.chartItem}>
          <SteppedAreaChart
            data={dataBefore}
            theme="stress"
            showYAxisTitle={true}
          />
        </div>
        <div className={styles.chartItem}>
          <SteppedAreaChart
            data={dataAfter}
            theme="calm"
            showYAxisTitle={false}
          />
        </div>
      </div>
    </div>

    {/* Patient Cards Overlay */}
    <PatientCardsOverlay patientData={patientData} />
  </div>
);

export default SimplifyYourPractice;

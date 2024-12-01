/**
 * Calculates required staff and costs for a healthcare practice
 * Based on NHS standard ratios:
 * - 1 receptionist per 39 calls/day
 * - Calls/day = patient size / 80
 * - 1 GP per 1900 patients
 */

const COSTS = {
  RECEPTIONIST_MONTHLY: 2000,
  GP_MONTHLY: 8000
};

const RATIOS = {
  PATIENTS_PER_DAILY_CALL: 80,
  CALLS_PER_RECEPTIONIST: 39,
  PATIENTS_PER_GP: 1900,
};

export const calculateStaffNeeds = (practiceSize) => {
  // Convert practiceSize to number and default to 0 if invalid
  const size = parseInt(practiceSize) || 0;
  
  // Calculate calls per day
  const callsPerDay = size / RATIOS.PATIENTS_PER_DAILY_CALL;
  
  // Calculate staff needed
  const receptionistsNeeded = callsPerDay / RATIOS.CALLS_PER_RECEPTIONIST;
  const gpsNeeded = size / RATIOS.PATIENTS_PER_GP;
  
  return {
    receptionists: receptionistsNeeded.toFixed(1),
    gps: gpsNeeded.toFixed(1)
  };
};

export const calculateMonthlyCost = (receptionists, fullTimeGPs) => {
  const receptionistCost = parseFloat(receptionists || 0) * COSTS.RECEPTIONIST_MONTHLY;
  const gpCost = parseFloat(fullTimeGPs || 0) * COSTS.GP_MONTHLY;
  
  return (receptionistCost + gpCost).toLocaleString('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
};

export const calculateAIStaffing = (standardStaff, toggles = {}) => {
  // Calculate multipliers based on active toggles
  let gpMultiplier = 1;
  let receptionistMultiplier = 1;

  if (toggles.phoneIntake) {
    receptionistMultiplier *= 2.3;
    gpMultiplier *= 1.2;
  }

  if (toggles.scribe) {
    gpMultiplier *= 1.2;
  }

  if (toggles.followUp) {
    gpMultiplier *= 1.1;
    receptionistMultiplier *= 1.05;
  }

  // Calculate new ratios
  const newReceptionists = (parseFloat(standardStaff.receptionists) / receptionistMultiplier).toFixed(1);
  const newGPs = (parseFloat(standardStaff.gps) / gpMultiplier).toFixed(1);

  return {
    receptionists: newReceptionists,
    gps: newGPs
  };
}; 
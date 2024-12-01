import React, { useState } from 'react';
import { 
  calculateStaffNeeds, 
  calculateMonthlyCost, 
  calculateAIStaffing 
} from '@/app/utils/healthcarePracticeCalculator';
import Toggle from '@/app/components/ui/Toggle';
import useTransitionNumber from '../hooks/useTransitionNumber';

const PracticeSizeInput = ({ value, onChange }) => (
  <div className="mb-6">
    <label className="text-2xl font-bold">Practice Size: </label>
    <input
      type="text"
      name="practiceSize"
      value={Number(value).toLocaleString()}
      onChange={(e) => {
        const numericValue = e.target.value.replace(/[^0-9]/g, '');
        onChange({
          target: {
            name: 'practiceSize',
            value: numericValue
          }
        });
      }}
      className="p-2 border rounded bg-[#FFF9E6]"
      placeholder="Enter size"
    />
  </div>
);

const TableSection = ({ inputs, handleInputChange, toggles }) => {
  const averageStaff = calculateStaffNeeds(inputs.practiceSize);
  const aiStaff = calculateAIStaffing(averageStaff, toggles);
  
  // Use transition hooks for each number
  const transitionReceptionists = useTransitionNumber(Number(averageStaff.receptionists) || 0);
  const transitionGPs = useTransitionNumber(Number(averageStaff.gps) || 0);
  const transitionAIReceptionists = useTransitionNumber(Number(aiStaff.receptionists) || 0);
  const transitionAIGPs = useTransitionNumber(Number(aiStaff.gps) || 0);

  const isAnyToggleOn = Object.values(toggles).some(toggle => toggle);

  return (
    <div className="overflow-x-auto">
      <table className="w-full mb-8">
        <thead>
          <tr className="border-b">
            <th className="p-2 text-left"></th>
            <th className="p-2 text-center">Receptionists</th>
            <th className="p-2 text-center"># Full Time GPs</th>
            <th className="p-2 text-center">Monthly Cost</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b">
            <td className="p-2 font-bold">Today</td>
            <td className="p-2">
              <input
                type="number"
                name="receptionists"
                value={inputs.receptionists}
                onChange={handleInputChange}
                className="w-full p-1 border rounded bg-[#FFF9E6] text-center"
              />
            </td>
            <td className="p-2">
              <input
                type="number"
                name="fullTimeGPs"
                value={inputs.fullTimeGPs}
                onChange={handleInputChange}
                className="w-full p-1 border rounded bg-[#FFF9E6] text-center"
              />
            </td>
            <td className="p-2 font-medium text-center">
              {calculateMonthlyCost(inputs.receptionists, inputs.fullTimeGPs)}
            </td>
          </tr>
          <tr className="border-b">
            <td className="p-2 font-bold">Average for that size</td>
            <td className="p-2 text-center">{transitionReceptionists.toFixed(1)}</td>
            <td className="p-2 text-center">{transitionGPs.toFixed(1)}</td>
            <td className="p-2 text-center">
              {calculateMonthlyCost(transitionReceptionists, transitionGPs)}
            </td>
          </tr>
          <tr>
            <td className="p-2 font-bold">With AI</td>
            <td className={`p-2 text-center text-black transition-opacity duration-300 ${!isAnyToggleOn ? 'opacity-0' : 'opacity-100'}`}>
              {transitionAIReceptionists.toFixed(1)}
            </td>
            <td className={`p-2 text-center text-black transition-opacity duration-300 ${!isAnyToggleOn ? 'opacity-0' : 'opacity-100'}`}>
              {transitionAIGPs.toFixed(1)}
            </td>
            <td className={`p-2 text-center text-black transition-opacity duration-300 ${!isAnyToggleOn ? 'opacity-0' : 'opacity-100'}`}>
              {calculateMonthlyCost(transitionAIReceptionists, transitionAIGPs)}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const SavingsEstimator = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [inputs, setInputs] = useState({
    practiceSize: '10000',
    receptionists: '',
    fullTimeGPs: ''
  });
  const [toggles, setToggles] = useState({
    phoneIntake: false,
    scribe: false,
    followUp: false
  });

  // Add escape key handler
  React.useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setIsPopupVisible(false);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  // Add click outside handler
  const handleClickOutside = (e) => {
    if (e.target.classList.contains('modal-overlay')) {
      setIsPopupVisible(false);
    }
  };

  // Update toggle items with bold font
  const toggleItems = [
    { id: 'phoneIntake', label: 'AI Phone Intake', className: 'font-bold' },
    { id: 'scribe', label: 'Medical Scribe', className: 'font-bold' },
    { id: 'followUp', label: 'Automatic Follow-ups', className: 'font-bold' }
  ];

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleToggle = (toggleName) => {
    setToggles(prev => ({
      ...prev,
      [toggleName]: !prev[toggleName]
    }));
  };

  // Add this check for toggles (same as in TableSection)
  const isAnyToggleOn = Object.values(toggles).some(toggle => toggle);

  return (
    <div className="flex flex-col items-center justify-center my-8">
      <button
        onClick={togglePopup}
        className="px-12 py-12 rounded-lg bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-2 border-transparent hover:border-company-blue text-3xl font-bold text-black"
      >
        Find out how much<br/>
        you could save here
      </button>
      
      {isPopupVisible && (
        <>
          <div 
            className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center modal-overlay"
            onClick={handleClickOutside}
          >
            <div className="bg-white p-8 rounded-lg shadow-lg text-black max-w-4xl w-full relative">
              {/* Larger X button, moved left */}
              <button 
                onClick={togglePopup}
                className="absolute top-4 right-8 text-gray-800 hover:text-gray-900 text-3xl font-bold"
              >
                ×
              </button>

              <PracticeSizeInput 
                value={inputs.practiceSize}
                onChange={handleInputChange}
              />
              
              <TableSection 
                inputs={inputs}
                handleInputChange={handleInputChange}
                toggles={toggles}
              />

              {/* Added padding around Toggle component */}
              <div className="py-8">
                <Toggle 
                  items={toggleItems}
                  toggles={toggles}
                  handleToggle={handleToggle}
                />
              </div>

              {/* New Sales Button - Always present */}
              <button
                onClick={() => window.location.href = '/contact'}
                className={`
                  absolute bottom-8 right-8 
                  px-4 py-2 
                  border-2 rounded-lg
                  text-lg font-bold
                  transition-all duration-300
                  opacity-0
                  ${isAnyToggleOn 
                    ? 'opacity-100 text-black border-black hover:text-[var(--color-company-blue)] hover:border-[var(--color-company-blue)]' 
                    : 'text-white border-white'
                  }
                  transition-opacity duration-[2000ms] delay-[500ms]
                `}
              >
                Talk to Sales
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SavingsEstimator; 
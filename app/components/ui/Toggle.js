import React from 'react';

const Toggle = ({ 
  items, 
  toggles, 
  handleToggle, 
  vertical = false,
  textRight = false,
  scale = 100,
  switchOnly = false
}) => {
  const renderSwitch = (id) => (
    <label className="relative inline-block w-12 h-6 cursor-pointer">
      <input
        type="checkbox"
        className="sr-only peer"
        checked={toggles[id]}
        onChange={() => handleToggle(id)}
      />
      <div className="absolute w-full h-full bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 
                     rounded-full peer 
                     peer-checked:after:translate-x-6
                     peer-checked:bg-green-500 
                     after:content-[''] 
                     after:absolute 
                     after:top-1/2 
                     after:left-[4px] 
                     after:bg-white 
                     after:rounded-full 
                     after:h-4 
                     after:w-4
                     after:transform 
                     after:-translate-y-1/2
                     after:transition-all 
                     after:duration-300 
                     after:ease-in-out
                     border-2 
                     border-gray-300 
                     peer-checked:border-green-600
                     transition-all 
                     duration-300 
                     ease-in-out"></div>
    </label>
  );

  if (switchOnly) {
    return items.map(({ id }) => (
      <div key={id}>
        {renderSwitch(id)}
      </div>
    ));
  }

  return (
    <div className={`flex ${vertical ? 'flex-col space-y-4' : 'justify-center gap-8'}`}
         style={{ transform: `scale(${scale}%)`, transformOrigin: 'left' }}>
      {items.map(({ id, label }) => (
        <div key={id} className={`flex ${textRight ? 'items-center gap-4' : 'flex-col items-center gap-2'}`}>
          {renderSwitch(id)}
          <span className={`text-sm font-medium transition-colors duration-300 ${toggles[id] ? 'text-white' : 'text-gray-400'}`}>
            {label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Toggle; 
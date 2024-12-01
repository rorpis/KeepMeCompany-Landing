import React from 'react';

const Toggle = ({ items, toggles, handleToggle }) => (
  <div className="flex justify-center gap-8">
    {items.map(({ id, label }) => (
      <div key={id} className="flex flex-col items-center gap-2">
        <label className="relative inline-block w-16 h-8 cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={toggles[id]}
            onChange={() => handleToggle(id)}
          />
          <div className="absolute w-full h-full bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 
                         rounded-full peer 
                         peer-checked:after:translate-x-8 
                         peer-checked:bg-green-500 
                         after:content-[''] 
                         after:absolute 
                         after:top-1/2 
                         after:left-[4px] 
                         after:bg-white 
                         after:rounded-full 
                         after:h-6 
                         after:w-6 
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
        <span className="text-sm font-medium text-gray-700 text-center">
          {label}
        </span>
      </div>
    ))}
  </div>
);

export default Toggle; 
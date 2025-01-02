import React, { useState } from 'react';

const SavingsEstimator = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedPlan, setSelectedPlan] = useState('');
  const [objectives, setObjectives] = useState([]);

  const plans = {
    diabetes: {
      name: 'Control de Diabetes',
      objectives: [
        '¿Qué número marcó su medidor de azúcar esta mañana?',
        '¿Se tomó la metformina después del desayuno y la cena ayer?',
        '¿Ha sentido mareos, mucha sed o ganas frecuentes de orinar?',
        '¿Cuántos minutos caminó ayer?',
        '¿Hay algún mensaje que quisiera enviarle a su doctor?'
      ]
    },
    confirmacion: {
      name: 'Confirmación asistencia a la consulta',
      objectives: [
        'Recuérdale que su próxima consulta es pronto',
        'Pregunta si tiene algo que comunicar al doctor previo a la visita'
      ]
    },
    reagendamiento: {
      name: 'Reagendamiento hora',
      objectives: [
        'El paciente se perdió su consulta. Dile que tengo libre este martes a',
        'Si quiere recuperarla, bloquea mi calendario por favor.'
      ]
    }
  };

  const handlePlanChange = (e) => {
    const plan = e.target.value;
    setSelectedPlan(plan);
    if (plan && plans[plan]) {
      setObjectives(plans[plan].objectives.map(obj => ({ text: obj, id: Math.random() })));
    } else {
      setObjectives([]);
    }
  };

  const removeObjective = (id) => {
    setObjectives(objectives.filter(obj => obj.id !== id));
  };

  const updateObjective = (id, newText) => {
    setObjectives(objectives.map(obj => 
      obj.id === id ? { ...obj, text: newText } : obj
    ));
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/[^\d+]/g, ''); // Only allow digits and +
    setPhoneNumber(value);
  };

  return (
    <div className="flex flex-col items-center justify-center my-8 w-full max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-white mb-8">Pruébelo usted mismo</h2>
      
      <div className="flex flex-wrap justify-center gap-8 w-full mb-8">
        {/* Phone Input Section */}
        <div className="flex flex-col min-w-[300px]">
          <label className="text-white mb-2">Introduzca su número</label>
          <input
            type="tel"
            value={phoneNumber}
            onChange={handlePhoneChange}
            placeholder="+34"
            className="bg-transparent border border-gray-600 rounded-lg p-3 text-white focus:border-white outline-none"
          />
        </div>

        {/* Plan Selection */}
        <div className="flex flex-col min-w-[300px]">
          <label className="text-white mb-2">Elija su plan de seguimiento</label>
          <select 
            value={selectedPlan}
            onChange={handlePlanChange}
            className="bg-transparent border border-gray-600 rounded-lg p-3 text-white focus:border-white"
          >
            <option value="" className="bg-gray-900">Seleccione un plan</option>
            <option value="diabetes" className="bg-gray-900">Control de Diabetes</option>
            <option value="confirmacion" className="bg-gray-900">Confirmación asistencia a la consulta</option>
            <option value="reagendamiento" className="bg-gray-900">Reagendamiento hora</option>
          </select>
        </div>

        {/* Objectives Section */}
        <div className="flex flex-col min-w-[300px]">
          {objectives.length > 0 && (
            <div className="space-y-2">
              {objectives.map((objective) => (
                <div key={objective.id} className="relative group border border-gray-600 rounded-lg p-3">
                  <input
                    type="text"
                    value={objective.text}
                    onChange={(e) => updateObjective(objective.id, e.target.value)}
                    className="w-full bg-transparent text-white outline-none"
                  />
                  <button
                    onClick={() => removeObjective(objective.id)}
                    className="absolute top-2 right-2 text-gray-400 hover:text-white"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <button 
        className="px-8 py-3 bg-transparent border border-white text-white rounded-lg hover:bg-white hover:text-black transition-colors"
      >
        Llamar ahora
      </button>
    </div>
  );
};

export default SavingsEstimator; 
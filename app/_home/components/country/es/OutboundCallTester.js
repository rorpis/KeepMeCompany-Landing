import React, { useState, useEffect } from 'react';

const OutboundCallTester = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('ES');
  const [selectedLanguage, setSelectedLanguage] = useState('es');
  const [hasManuallySelectedLanguage, setHasManuallySelectedLanguage] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('');
  const [objectives, setObjectives] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  const countries = {
    ES: { name: 'España', code: '+34' },
    FR: { name: 'France', code: '+33' },
    UK: { name: 'United Kingdom', code: '+44' },
    DE: { name: 'Deutschland', code: '+49' },
    IT: { name: 'Italia', code: '+39' },
    PT: { name: 'Portugal', code: '+351' }
  };

  const languages = {
    es: 'Español',
    en: 'English'
  };

  useEffect(() => {
    if (!hasManuallySelectedLanguage) {
      setSelectedLanguage(selectedCountry === 'ES' ? 'es' : 'en');
    }
  }, [selectedCountry, hasManuallySelectedLanguage]);

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
      name: 'Confirmar asistencia',
      objectives: [
        'Recuérdale que su próxima consulta es pronto',
        'Pregunta si tiene algo que comunicar al doctor previo a la visita'
      ]
    },
    reagendamiento: {
      name: 'Reagendar consulta',
      objectives: [
        'El paciente se perdió su consulta. Dile que tengo libre este martes a las 10am',
        'Si quiere recuperarla, bloquea mi calendario para esa fecha por favor.'
      ]
    },
    otro: {
      name: 'Otro',
      objectives: [
        'Objetivo 1',
        'Objetivo 2',
        'Objetivo 3'
      ]
    }
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    
    const formatted = value.replace(/(\d{3})(?=\d)/g, '$1 ');
    setPhoneNumber(formatted);
  };

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
    setPhoneNumber('');
  };

  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
    setHasManuallySelectedLanguage(true);
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

  const handleCallNow = () => {
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 3000);
  };

  return (
    <div className="flex flex-col items-center justify-center my-8 w-full max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-white mb-8">Pruébelo usted mismo</h2>
      
      <div className="flex gap-[10vh] w-[900px] mx-auto mb-8">
        <div className="flex flex-col space-y-6 w-[300px]">
          <div className="flex flex-col">
            <label className="text-white mb-2">País</label>
            <select
              value={selectedCountry}
              onChange={handleCountryChange}
              className="bg-transparent border border-gray-600 rounded-lg p-3 text-white focus:border-white outline-none"
            >
              {Object.entries(countries).map(([code, { name }]) => (
                <option key={code} value={code} className="bg-gray-900">
                  {name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-white mb-2">Introduzca su número</label>
            <div className="relative">
              <select
                value={selectedCountry}
                onChange={handleCountryChange}
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-transparent text-white appearance-none outline-none cursor-pointer z-10"
              >
                {Object.entries(countries).map(([code, { name }]) => (
                  <option key={code} value={code} className="bg-gray-900">
                    {countries[code].code}
                  </option>
                ))}
              </select>
              
              <input
                type="tel"
                value={phoneNumber}
                onChange={handlePhoneChange}
                className="w-full bg-transparent border border-gray-600 rounded-lg p-3 pl-16 text-white focus:border-white outline-none"
                placeholder="123 456 789"
              />
            </div>
          </div>

          <div className="flex flex-col">
            <label className="text-white mb-2">Idioma de la llamada</label>
            <select
              value={selectedLanguage}
              onChange={handleLanguageChange}
              className="bg-transparent border border-gray-600 rounded-lg p-3 text-white focus:border-white outline-none"
            >
              {Object.entries(languages).map(([code, name]) => (
                <option key={code} value={code} className="bg-gray-900">
                  {name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-white mb-2">Elija su plan de seguimiento</label>
            <select 
              value={selectedPlan}
              onChange={handlePlanChange}
              className="bg-transparent border border-gray-600 rounded-lg p-3 text-white focus:border-white outline-none"
            >
              <option value="" className="bg-gray-900">Seleccione un plan</option>
              <option value="diabetes" className="bg-gray-900">Control de Diabetes</option>
              <option value="confirmacion" className="bg-gray-900">Confirmación asistencia a la consulta</option>
              <option value="reagendamiento" className="bg-gray-900">Reagendamiento hora</option>
              <option value="otro" className="bg-gray-900">Otro</option>
            </select>
          </div>
        </div>

        <div className="w-[500px]">
          <h3 className="text-white mb-4 font-semibold">Defina los objetivos de la llamada</h3>
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
        onClick={handleCallNow}
        className="px-8 py-3 bg-transparent border border-white text-white rounded-lg hover:bg-white hover:text-black transition-colors"
      >
        Llamar ahora
      </button>

      {showPopup && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm" onClick={() => setShowPopup(false)} />
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white text-black px-8 py-4 rounded-lg shadow-lg text-xl">
            Recibirá la llamada en unos segundos, asegúrese de no tener el teléfono en no molestar
          </div>
        </>
      )}
    </div>
  );
};

export default OutboundCallTester; 
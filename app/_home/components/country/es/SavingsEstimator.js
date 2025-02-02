import React, { useState, useEffect } from 'react';

const SavingsEstimator = () => {
  const [formData, setFormData] = useState({
    phoneNumber: '',
    selectedCountry: 'ES',
    selectedLanguage: 'es',
    hasManuallySelectedLanguage: false,
    selectedPlan: '',
    objectives: [],
    showPopup: false
  });

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
        'Escriba aquí',
        'Escriba aquí',
        'Escriba aquí'
      ]
    }
  };

  useEffect(() => {
    if (!formData.hasManuallySelectedLanguage) {
      setFormData(prev => ({
        ...prev,
        selectedLanguage: prev.selectedCountry === 'ES' ? 'es' : 'en'
      }));
    }
  }, [formData.selectedCountry, formData.hasManuallySelectedLanguage]);

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    const formatted = value.replace(/(\d{3})(?=\d)/g, '$1 ');
    updateFormData('phoneNumber', formatted);
  };

  const handleCountryChange = (e) => {
    updateFormData('selectedCountry', e.target.value);
    updateFormData('phoneNumber', '');
  };

  const handleLanguageChange = (e) => {
    updateFormData('selectedLanguage', e.target.value);
    updateFormData('hasManuallySelectedLanguage', true);
  };

  const handlePlanChange = (e) => {
    const plan = e.target.value;
    updateFormData('selectedPlan', plan);
    if (plan && plans[plan]) {
      updateFormData('objectives', plans[plan].objectives.map(obj => ({
        text: obj,
        id: Math.random()
      })));
    } else {
      updateFormData('objectives', []);
    }
  };

  const removeObjective = (id) => {
    updateFormData('objectives', formData.objectives.filter(obj => obj.id !== id));
  };

  const updateObjective = (id, newText) => {
    updateFormData('objectives', formData.objectives.map(obj =>
      obj.id === id ? { ...obj, text: newText } : obj
    ));
  };

  const handleCallNow = () => {
    updateFormData('showPopup', true);
    setTimeout(() => {
      updateFormData('showPopup', false);
    }, 3000);
  };

  return (
    <div className="flex flex-col items-center justify-center my-8 w-full max-w-6xl mx-auto">
      <h2 className="text-4xl font-bold text-white mb-10">Pruébelo usted mismo</h2>
      
      <div className="flex gap-[10vh] w-[900px] mx-auto mb-8">
        <div className="flex flex-col space-y-6 w-[300px]">
          <div className="flex flex-col">
            <label className="text-white mb-2">País</label>
            <select
              value={formData.selectedCountry}
              onChange={handleCountryChange}
              className="bg-transparent border border-gray-600 rounded-lg p-3 text-white focus:border-white outline-none hover:border-white"
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
                value={formData.selectedCountry}
                onChange={handleCountryChange}
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-transparent text-white appearance-none outline-none cursor-pointer z-[1]"
              >
                {Object.entries(countries).map(([code, { name }]) => (
                  <option key={code} value={code} className="bg-gray-900">
                    {countries[code].code}
                  </option>
                ))}
              </select>
              
              <input
                type="tel"
                value={formData.phoneNumber}
                onChange={handlePhoneChange}
                className="w-full bg-transparent border border-gray-600 rounded-lg p-3 pl-16 text-white focus:border-white outline-none hover:border-white"
                placeholder="123 456 789"
              />
            </div>
          </div>

          <div className="flex flex-col">
            <label className="text-white mb-2">Idioma de la llamada</label>
            <select
              value={formData.selectedLanguage}
              onChange={handleLanguageChange}
              className="bg-transparent border border-gray-600 rounded-lg p-3 text-white focus:border-white outline-none hover:border-white"
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
              value={formData.selectedPlan}
              onChange={handlePlanChange}
              className="bg-transparent border border-gray-600 rounded-lg p-3 text-white focus:border-white outline-none hover:border-white"
            >
              <option value="" className="bg-gray-900">Seleccione un plan</option>
              <option value="diabetes" className="bg-gray-900">Control de Diabetes</option>
              <option value="confirmacion" className="bg-gray-900">Confirmar asistencia a la consulta</option>
              <option value="reagendamiento" className="bg-gray-900">Reagendar hora</option>
              <option value="otro" className="bg-gray-900">Otro</option>
            </select>
          </div>
        </div>

        <div className="w-[600px]">
          <h3 className="text-white mb-4 font-semibold">Defina los objetivos de la llamada</h3>
          {formData.objectives.length > 0 && (
            <div className="space-y-2">
              {formData.objectives.map((objective) => (
                <div key={objective.id} className="relative group border border-gray-600 hover:border-white rounded-lg p-3">
                  <input
                    type="text"
                    value={objective.text}
                    onChange={(e) => updateObjective(objective.id, e.target.value)}
                    className="w-full bg-transparent text-white outline-none italic cursor-text"
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

      {formData.showPopup && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-[9999]" onClick={() => updateFormData('showPopup', false)} />
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white text-black px-8 py-4 rounded-lg shadow-lg text-xl z-[10000]">
            Recibirá la llamada en unos segundos, asegúrese de no tener el teléfono en no molestar
          </div>
        </>
      )}
    </div>
  );
};

export default SavingsEstimator;
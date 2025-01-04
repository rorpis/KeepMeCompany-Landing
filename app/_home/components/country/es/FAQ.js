import FAQBase from '../../base/FAQBase';

const faqItems = [
  {
    question: "Cómo se justifica el costo?",
    answer: "Cada consulta que usted pierde son ingresos que deja de percibir. Cada vez que tiene que llamar a un paciente para coordinar un reagendamiento es tiempo (costoso) que no podrá recuperar. Esto le genera ingresos y le da tranquilidad a una fracción del costo."
  },
  {
    question: "¿Cuánto cuesta?",
    answer: "€0.53 por llamada o consulta transcrita."
  },
  {
    question: "Hay algún mínimo por mes?",
    answer: "No hay ningún mínimo, usted paga por las llamadas que utilizó."
  },
  {
    question: "Cuáles son los beneficios para los pacientes?",
    answer: "Nuestros servicios mejoran la comunicación entre usted y sus pacientes, con respuestas más rápidas y naturales."
  },
];

const FAQ = () => {
  return <FAQBase faqItems={faqItems} />;
};

export default FAQ; 
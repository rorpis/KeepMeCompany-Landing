import FAQBase from '../../base/FAQBase';

const faqItems = [
  {
    question: "I already have an online booking forms - why do I need this?",
    answer: "Online forms are great, but they cannot serve a big percentage of your patients: your seniors. This is a more natural way of interacting with them, ensuring you will remain accesible for those who need you the most."
  },
  {
    question: "How does this justify the additional cost?",
    answer: "This can help you grow your patient size or cover any capacity deficits you may have in the short term for a fraction of the cost, on demand."
  },
  {
    question: "What decisions can the AI make?",
    answer: "None. It's only made to gather information and relay it to medical professionals."
  },
  {
    question: "I'm worried this might disrupt my operation",
    answer: "You can actually test the phone calls without involving patients. Once you are confident this is the right solution for you we can help you put it in production."
  }
];

const FAQ = () => {
  return <FAQBase faqItems={faqItems} />;
};

export default FAQ; 
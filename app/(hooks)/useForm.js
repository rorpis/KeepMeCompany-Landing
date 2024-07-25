import { useState, useCallback } from 'react';

const useForm = (initialState, validate) => {
  // used to declare functions used in signup form

  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setValues(prevValues => ({ ...prevValues, [name]: value }));
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    setIsSubmitting(true);
    if (Object.keys(validationErrors).length === 0) {
      // Submit the form
      console.log('Form submitted', values);
      // Reset form or show success message
    }
  }, [values, validate]);

  return { values, errors, isSubmitting, handleChange, handleSubmit };
};

export default useForm;
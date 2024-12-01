import { useState, useCallback } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../../lib/firebase/config';

const useForm = (initialState, validate, onSubmitSuccess) => {
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
      try {
        // Format contact methods
        const contactMethods = [
          values.call && 'Phone Call',
          values.whatsapp && 'WhatsApp',
          values.emailContact && 'Email'
        ].filter(Boolean).join(', ');

        // Create the email document
        addDoc(collection(db, 'mail/inbound/contactForm'), {
          to: ['rodrigo@keepmecompanyai.com', 'eduardo@keepmecompanyai.com'],
          message: {
            subject: 'New Contact Form Submission',
            html: `
              <h2>New Contact Form Submission</h2>
              <p><strong>Name:</strong> ${values.fullName}</p>
              <p><strong>Email:</strong> ${values.email}</p>
              <p><strong>Phone:</strong> ${values.phone}</p>
              <p><strong>Preferred Contact Methods:</strong> ${contactMethods}</p>
            `,
          },
          // Store the original submission data
          submission: {
            ...values,
            timestamp: new Date(),
          }
        });

        onSubmitSuccess();
        setValues(initialState);
      } catch (error) {
        console.error('Error submitting form:', error);
        setErrors({ submit: 'An error occurred. Please try again.' });
      }
    }
    setIsSubmitting(false);
  }, [values, validate, onSubmitSuccess]);

  return { values, errors, isSubmitting, handleChange, handleSubmit, setValues };
};

export default useForm;
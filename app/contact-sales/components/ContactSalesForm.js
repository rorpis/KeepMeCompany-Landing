'use client';

import React, { useState, useCallback } from 'react';
import useForm from '../hooks/useForm';
import styles from '../styles/ContactSalesForm.module.css';
import WhatsAppContactPanel from '@/app/components/WhatsAppContactPanel';

const validate = (values) => {
  let errors = {};
  if (!values.fullName) errors.fullName = "Full Name is required";
  if (!values.email) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Email address is invalid";
  }
  if (!values.phone) errors.phone = "Phone number is required";
  if (!values.call && !values.whatsapp && !values.emailContact) {
    errors.contactMethod = "Please select at least one contact method";
  }
  return errors;
};

const InputField = ({ label, name, type, value, onChange, error }) => (
  <div className={styles.formGroup}>
    <label htmlFor={name}>{label}</label>
    <input
      type={type}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className={styles.input}
    />
    {error && <span className={styles.error}>{error}</span>}
  </div>
);

const CheckboxGroup = ({ label, options, values, onChange, error }) => (
  <div className={styles.formGroup}>
    <label>{label}</label>
    <div className={styles.checkboxGroup}>
      {options.map((option, index) => (
        <label key={index}>
          <input
            type="checkbox"
            name={option.value}
            checked={values[option.value]}
            onChange={onChange}
          />
          {option.label}
        </label>
      ))}
    </div>
    {error && <span className={styles.error}>{error}</span>}
  </div>
);

const ContactSalesForm = () => {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const initialState = {
    fullName: '',
    email: '',
    phone: '',
    call: false,
    whatsapp: false,
    emailContact: false
  };

  const onSubmitSuccess = useCallback(() => {
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 5000);
  }, []);

  const { values, errors, isSubmitting, handleChange, handleSubmit, setValues } = useForm(initialState, validate, onSubmitSuccess);

  const handleCheckboxChange = useCallback((e) => {
    const { name, checked } = e.target;
    handleChange({ target: { name, value: checked } });
  }, [handleChange]);

  const onSubmit = useCallback((e) => {
    handleSubmit(e);
    if (Object.keys(errors).length === 0) {
      setValues(initialState);
    }
  }, [handleSubmit, errors, setValues, initialState]);

  return (
    <div className={styles.formContainer}>
      <form onSubmit={onSubmit} className={styles.form}>
        <InputField
          label="Full Name"
          name="fullName"
          type="text"
          value={values.fullName}
          onChange={handleChange}
          error={errors.fullName}
        />

        <InputField
          label="Email"
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          error={errors.email}
        />

        <InputField
          label="Phone Number"
          name="phone"
          type="tel"
          value={values.phone}
          onChange={handleChange}
          error={errors.phone}
        />

        <CheckboxGroup
          label="How would you like us to reach you?"
          options={[
            { value: 'call', label: 'Phone Call' },
            { value: 'whatsapp', label: 'WhatsApp' },
            { value: 'emailContact', label: 'Email' }
          ]}
          values={{ 
            call: values.call, 
            whatsapp: values.whatsapp,
            emailContact: values.emailContact
          }}
          onChange={handleCheckboxChange}
          error={errors.contactMethod}
        />

        <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
          Send
        </button>

        {showSuccessMessage && (
          <div className={styles.successMessage}>
            Thank you for signing up! We&apos;ll contact you very soon.
          </div>
        )}
      </form>
      
      <WhatsAppContactPanel />
    </div>
  );
};

export default ContactSalesForm;
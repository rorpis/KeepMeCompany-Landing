'use client';

import React, { useState, useCallback } from 'react';
import useForm from '../../hooks/useForm';
import styles from '../../styles/ContactSalesForm.module.css';
import WhatsAppContactPanel from '@/app/components/WhatsAppContactPanel';
import { useTranslations } from '@/app/hooks/useTranslations';

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
  const { t } = useTranslations();

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
          label={t('contact.form.fullName')}
          name="fullName"
          type="text"
          value={values.fullName}
          onChange={handleChange}
          error={errors.fullName}
        />

        <InputField
          label={t('contact.form.email')}
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          error={errors.email}
        />

        <InputField
          label={t('contact.form.phone')}
          name="phone"
          type="tel"
          value={values.phone}
          onChange={handleChange}
          error={errors.phone}
        />

        <CheckboxGroup
          label={t('contact.form.contactMethods')}
          options={[
            { value: 'call', label: t('contact.form.methods.call') },
            { value: 'whatsapp', label: t('contact.form.methods.whatsapp') },
            { value: 'emailContact', label: t('contact.form.methods.email') }
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
          {t('contact.form.submit')}
        </button>

        {showSuccessMessage && (
          <div className={styles.successMessage}>
            {t('contact.form.success')}
          </div>
        )}
      </form>
      
      <WhatsAppContactPanel />
    </div>
  );
};

export default ContactSalesForm;
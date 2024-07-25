'use client';

// app/(components)/SignupForm.js

import React from 'react';
import useForm from '../(hooks)/useForm';
import styles from '../(styles)/SignupForm.module.css';

const reasons = [
  "I'm worried about my parent's well-being",
  "I need help with day-to-day coordination",
  "I want my parent to be more entertained"
];

const validate = (values) => {
  let errors = {};
  if (!values.fullName) errors.fullName = "Full Name is required";
  if (!values.email) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Email address is invalid";
  }
  if (!values.phone) errors.phone = "Phone number is required";
  if (!values.reason) errors.reason = "Please select a reason";
  if (!values.call && !values.whatsapp) errors.contactMethod = "Please select at least one contact method";
  return errors;
};

const InputField = ({ label, name, type, value, onChange, error, joke }) => (
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
    <small className={styles.joke}>{joke}</small>
  </div>
);

const SelectField = ({ label, name, value, onChange, options, error }) => (
  <div className={styles.formGroup}>
    <label htmlFor={name}>{label}</label>
    <select
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className={styles.select}
    >
      <option value="">Select an option</option>
      {options.map((option, index) => (
        <option key={index} value={option}>{option}</option>
      ))}
    </select>
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

const SignupForm = () => {
  const { values, errors, isSubmitting, handleChange, handleSubmit } = useForm({
    fullName: '',
    email: '',
    phone: '',
    reason: '',
    call: false,
    whatsapp: false
  }, validate);

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    handleChange({ target: { name, value: checked } });
  };

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <InputField
          label="Full Name"
          name="fullName"
          type="text"
          value={values.fullName}
          onChange={handleChange}
          error={errors.fullName}
          joke="How your parent called you when you got in trouble as a kid"
        />

        <InputField
          label="Email"
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          error={errors.email}
          joke="Where your parent sends you chain emails"
        />

        <InputField
          label="Phone Number"
          name="phone"
          type="tel"
          value={values.phone}
          onChange={handleChange}
          error={errors.phone}
          joke="The number your parent calls when 'the internet is broken'"
        />

        <SelectField
          label="What do you need our help with?"
          name="reason"
          value={values.reason}
          onChange={handleChange}
          options={reasons}
          error={errors.reason}
        />

        <CheckboxGroup
          label="How would you like us to reach you?"
          options={[
            { value: 'call', label: 'Phone Call' },
            { value: 'whatsapp', label: 'WhatsApp' }
          ]}
          values={{ call: values.call, whatsapp: values.whatsapp }}
          onChange={handleCheckboxChange}
          error={errors.contactMethod}
        />

        <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
          Sign Up
        </button>

        {isSubmitting && Object.keys(errors).length === 0 && (
          <div className={styles.successMessage}>
            Thank you for signing up! We'll contact you via your preferred method soon.
          </div>
        )}
      </form>
    </div>
  );
};

export default SignupForm;
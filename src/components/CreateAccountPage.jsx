import React, { useState } from 'react';

const InputField = ({ label, name, type = 'text', placeholder, required, value, onChange, error }) => (
  <div className="relative">
    <label
      htmlFor={name}
      className="absolute -top-2.5 left-3 bg-gray-100 px-1 text-xs font-semibold text-[#6C35DE] z-10"
    >
      {label}
      {required && <span className="text-red-500 ml-0.5">*</span>}
    </label>
    <input
      id={name}
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`w-full border ${
        error ? 'border-red-400' : 'border-gray-300'
      } focus:border-[#6C35DE] rounded-lg px-4 py-4 text-sm text-gray-700 bg-gray-100 transition-colors placeholder-gray-400`}
    />
    {error && (
      <p className="mt-1 text-xs text-red-500">{error}</p>
    )}
  </div>
);

const CreateAccountPage = ({ onCreateAccount, onBack }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    emailAddress: '',
    password: '',
    companyName: '',
    isAgency: 'yes',
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.phoneNumber.trim())
      newErrors.phoneNumber = 'Phone number is required';
    else if (!/^\d{10}$/.test(formData.phoneNumber.replace(/\s/g, '')))
      newErrors.phoneNumber = 'Enter a valid 10-digit phone number';
    if (!formData.emailAddress.trim())
      newErrors.emailAddress = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.emailAddress))
      newErrors.emailAddress = 'Enter a valid email';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6)
      newErrors.password = 'Password must be at least 6 characters';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onCreateAccount(formData);
    }, 800);
  };

  return (
    <div className="page-enter flex flex-col min-h-screen bg-gray-100">
      <div className="px-6 pt-8 pb-2">
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-gray-500 hover:text-[#6C35DE] transition-colors text-sm font-medium"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back
        </button>
      </div>

      <div className="px-6 pt-4 pb-28">
        <h1 className="text-3xl font-bold text-gray-900 leading-tight mb-8">
          Create your<br />PopX account
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <InputField
            label="Full Name"
            name="fullName"
            placeholder="Marry Doe"
            required
            value={formData.fullName}
            onChange={handleChange}
            error={errors.fullName}
          />
          <InputField
            label="Phone number"
            name="phoneNumber"
            type="tel"
            placeholder="Marry Doe"
            required
            value={formData.phoneNumber}
            onChange={handleChange}
            error={errors.phoneNumber}
          />
          <InputField
            label="Email address"
            name="emailAddress"
            type="email"
            placeholder="Marry Doe"
            required
            value={formData.emailAddress}
            onChange={handleChange}
            error={errors.emailAddress}
          />
          <InputField
            label="Password"
            name="password"
            type="password"
            placeholder="Marry Doe"
            required
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
          />
          <InputField
            label="Company name"
            name="companyName"
            placeholder="Marry Doe"
            value={formData.companyName}
            onChange={handleChange}
            error={errors.companyName}
          />

          <div className="mt-1">
            <label className="block text-sm font-medium text-gray-800 mb-3">
              Are you an Agency?
              <span className="text-red-500 ml-0.5">*</span>
            </label>
            <div className="flex items-center gap-8">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="isAgency"
                  value="yes"
                  checked={formData.isAgency === 'yes'}
                  onChange={handleChange}
                  className="w-5 h-5 accent-[#6C35DE] cursor-pointer"
                />
                <span className="text-sm text-gray-700 font-medium">Yes</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="isAgency"
                  value="no"
                  checked={formData.isAgency === 'no'}
                  onChange={handleChange}
                  className="w-5 h-5 accent-[#6C35DE] cursor-pointer"
                />
                <span className="text-sm text-gray-700 font-medium">No</span>
              </label>
            </div>
          </div>
        </form>
      </div>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-sm px-6 pb-6 pt-3 bg-gray-100">
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full bg-[#6C35DE] hover:bg-[#5a28cc] active:scale-95 text-white font-semibold text-base py-4 px-6 rounded-lg transition-all duration-200 shadow-md shadow-purple-300"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              Creating Account...
            </span>
          ) : (
            'Create Account'
          )}
        </button>
        <p className="text-center text-xs text-gray-400 font-medium mt-2">
          Assignment for{' '}
          <span className="text-[#6C35DE] font-semibold">Educase India</span>
        </p>
      </div>
    </div>
  );
};

export default CreateAccountPage;

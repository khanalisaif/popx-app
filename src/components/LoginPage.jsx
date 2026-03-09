import React, { useState } from 'react';

const LoginPage = ({ onLogin, onBack }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
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
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = 'Enter a valid email';
    if (!formData.password) newErrors.password = 'Password is required';
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
      onLogin(formData);
    }, 800);
  };

  const isFormFilled = formData.email && formData.password;

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

      <div className="px-6 pt-4 pb-8">
        <h1 className="text-3xl font-bold text-gray-900 leading-tight mb-3">
          Signin to your<br />PopX account
        </h1>
        <p className="text-base text-gray-500 leading-relaxed mb-8">
          Lorem ipsum dolor sit amet,<br />
          consectetur adipiscing elit,
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="relative">
            <label
              htmlFor="email"
              className="absolute -top-2.5 left-3 bg-gray-100 px-1 text-xs font-semibold text-[#6C35DE] z-10"
            >
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter email address"
              value={formData.email}
              onChange={handleChange}
              className={`w-full border ${
                errors.email ? 'border-red-400' : 'border-gray-300'
              } focus:border-[#6C35DE] rounded-lg px-4 py-4 text-sm text-gray-700 bg-gray-100 transition-colors placeholder-gray-400`}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-500">{errors.email}</p>
            )}
          </div>

          <div className="relative">
            <label
              htmlFor="password"
              className="absolute -top-2.5 left-3 bg-gray-100 px-1 text-xs font-semibold text-[#6C35DE] z-10"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full border ${
                errors.password ? 'border-red-400' : 'border-gray-300'
              } focus:border-[#6C35DE] rounded-lg px-4 py-4 text-sm text-gray-700 bg-gray-100 transition-colors placeholder-gray-400`}
            />
            {errors.password && (
              <p className="mt-1 text-xs text-red-500">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-4 rounded-lg font-semibold text-base transition-all duration-200 mt-2 ${
              isFormFilled
                ? 'bg-[#6C35DE] text-white hover:bg-[#5a28cc] active:scale-95 shadow-md shadow-purple-300'
                : 'bg-gray-300 text-white cursor-not-allowed'
            }`}
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
                Signing in...
              </span>
            ) : (
              'Login'
            )}
          </button>
        </form>
      </div>

      <div className="mt-auto pb-6 text-center">
        <p className="text-xs text-gray-400 font-medium">
          Assignment for{' '}
          <span className="text-[#6C35DE] font-semibold">Educase India</span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;

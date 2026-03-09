import React from 'react';

const WelcomePage = ({ onCreateAccount, onLogin }) => {
  return (
    <div className="page-enter flex flex-col h-full min-h-screen bg-gray-100">
      <div className="flex-1 flex flex-col justify-end pb-10 px-6 pt-20">
        <div className="flex gap-1 mb-8 opacity-20">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-purple-600"
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-3 leading-tight">
            Welcome to PopX
          </h1>
          <p className="text-base text-gray-500 leading-relaxed">
            Lorem ipsum dolor sit amet,<br />
            consectetur adipiscing elit,
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={onCreateAccount}
            className="w-full bg-[#6C35DE] hover:bg-[#5a28cc] active:scale-95 text-white font-semibold text-base py-4 px-6 rounded-lg transition-all duration-200 shadow-md shadow-purple-300"
          >
            Create Account
          </button>

          <button
            onClick={onLogin}
            className="w-full bg-[#C9B8FF] hover:bg-[#b8a4ff] active:scale-95 text-[#3a1a8a] font-bold text-base py-4 px-6 rounded-lg transition-all duration-200"
          >
            Already Registered? Login
          </button>
        </div>

        <p className="text-center text-xs text-gray-400 mt-8 font-medium">
          Developed for{' '}
          <span className="text-[#6C35DE] font-semibold">Educase India</span>
        </p>
      </div>
    </div>
  );
};

export default WelcomePage;

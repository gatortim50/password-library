import React from 'react';
import { PasswordValidator } from 'react-password-validator';

const App: React.FC = () => {
  const handleSubmit = (password: string) => {
    console.log('Password submitted:', password);
    alert('Password submitted successfully!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Password Validator
          </h1>
          <p className="text-lg text-gray-600">
            Create a strong password that meets all requirements
          </p>
        </div>
        
        <div className="bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Password Requirements
            </h2>
            <ul className="text-sm text-gray-600 space-y-1">
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                At least 6 characters long
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Contains uppercase letter
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Contains lowercase letter
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Contains number
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Contains special character
              </li>
            </ul>
          </div>

          <PasswordValidator
            onSubmit={handleSubmit}
            submitButtonText="Create Password"
            className="space-y-6"
            inputClassName="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            buttonClassName="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium"
            errorClassName="text-red-500 text-sm font-medium"
            errorMessages={{
              passwordMismatch: "Passwords don't match",
              minLength: "Password must be at least 6 characters long",
              uppercase: "Password must contain at least one uppercase letter",
              lowercase: "Password must contain at least one lowercase letter",
              number: "Password must contain at least one number",
              special: "Password must contain at least one special character"
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default App; 
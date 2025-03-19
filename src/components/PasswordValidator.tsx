import React, { useState, useCallback } from 'react';

interface PasswordValidatorProps {
  onSubmit: (password: string) => void;
  submitButtonText?: string;
  className?: string;
  inputClassName?: string;
  buttonClassName?: string;
  errorClassName?: string;
  errorMessages?: {
    passwordMismatch?: string;
    minLength?: string;
    uppercase?: string;
    lowercase?: string;
    number?: string;
    special?: string;
  };
}

interface ValidationError {
  message: string;
  isValid: boolean;
}

const DEFAULT_ERROR_MESSAGES = {
  passwordMismatch: 'Passwords do not match',
  minLength: 'Password must be at least 6 characters long',
  uppercase: 'Password must contain at least one uppercase letter',
  lowercase: 'Password must contain at least one lowercase letter',
  number: 'Password must contain at least one number',
  special: 'Password must contain at least one special character (!@#$%^&*()_-+={[}]|:;"\'<,>.)',
};

const PasswordValidator: React.FC<PasswordValidatorProps> = ({
  onSubmit,
  submitButtonText = 'Submit',
  className = '',
  inputClassName = '',
  buttonClassName = '',
  errorClassName = '',
  errorMessages = {},
}) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [isValid, setIsValid] = useState(false);

  const messages = { ...DEFAULT_ERROR_MESSAGES, ...errorMessages };

  const validatePassword = useCallback((): ValidationError[] => {
    const newErrors: ValidationError[] = [];

    // Check if passwords match
    if (password !== confirmPassword) {
      newErrors.push({
        message: messages.passwordMismatch,
        isValid: false,
      });
    }

    // Check minimum length
    if (password.length < 6) {
      newErrors.push({
        message: messages.minLength,
        isValid: false,
      });
    }

    // Check for uppercase
    if (!/[A-Z]/.test(password)) {
      newErrors.push({
        message: messages.uppercase,
        isValid: false,
      });
    }

    // Check for lowercase
    if (!/[a-z]/.test(password)) {
      newErrors.push({
        message: messages.lowercase,
        isValid: false,
      });
    }

    // Check for number
    if (!/[0-9]/.test(password)) {
      newErrors.push({
        message: messages.number,
        isValid: false,
      });
    }

    // Check for special character
    if (!/[!@#$%^&*()_\-+={[}\]|:;"'<,>.]/.test(password)) {
      newErrors.push({
        message: messages.special,
        isValid: false,
      });
    }

    return newErrors;
  }, [password, confirmPassword, messages]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validatePassword();
    setErrors(validationErrors);
    setIsValid(validationErrors.length === 0);

    if (validationErrors.length === 0) {
      onSubmit(password);
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className={`space-y-4 ${className}`}
      role="form"
      aria-label="Password validation form"
    >
      <div className="space-y-2">
        <div>
          <label htmlFor="password" className="sr-only">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Enter password"
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${inputClassName}`}
            aria-invalid={errors.length > 0}
            aria-describedby={errors.length > 0 ? "error-messages" : undefined}
            data-testid="password-input"
          />
        </div>
        <div>
          <label htmlFor="confirm-password" className="sr-only">Confirm Password</label>
          <input
            id="confirm-password"
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            placeholder="Confirm password"
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${inputClassName}`}
            aria-invalid={errors.length > 0}
            aria-describedby={errors.length > 0 ? "error-messages" : undefined}
            data-testid="confirm-password-input"
          />
        </div>
      </div>

      {errors.length > 0 && (
        <div 
          id="error-messages"
          className={`space-y-1 ${errorClassName}`}
          role="alert"
        >
          {errors.map((error, index) => (
            <p 
              key={index} 
              className="text-red-500 text-sm"
              data-testid={`error-message-${index}`}
            >
              {error.message}
            </p>
          ))}
        </div>
      )}

      {isValid && (
        <p 
          className="text-green-500 text-sm"
          role="status"
          data-testid="success-message"
        >
          Password is valid!
        </p>
      )}

      <button
        type="submit"
        className={`w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 ${buttonClassName}`}
        data-testid="submit-button"
      >
        {submitButtonText}
      </button>
    </form>
  );
};

export default PasswordValidator; 
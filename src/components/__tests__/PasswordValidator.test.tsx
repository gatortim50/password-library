import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PasswordValidator } from '../../index';

describe('PasswordValidator', () => {
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  it('renders password input fields and submit button', () => {
    render(<PasswordValidator onSubmit={mockOnSubmit} />);
    
    expect(screen.getByPlaceholderText('Enter password')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Confirm password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  it('shows error when passwords do not match', async () => {
    render(<PasswordValidator onSubmit={mockOnSubmit} />);
    
    const passwordInput = screen.getByPlaceholderText('Enter password');
    const confirmPasswordInput = screen.getByPlaceholderText('Confirm password');
    
    await act(async () => {
      await userEvent.type(passwordInput, 'Test123!');
      await userEvent.type(confirmPasswordInput, 'Test123!!');
    });
    
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    });
    
    expect(screen.getByText('Passwords do not match')).toBeInTheDocument();
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('shows error when password is too short', async () => {
    render(<PasswordValidator onSubmit={mockOnSubmit} />);
    
    const passwordInput = screen.getByPlaceholderText('Enter password');
    const confirmPasswordInput = screen.getByPlaceholderText('Confirm password');
    
    await act(async () => {
      await userEvent.type(passwordInput, 'Test1');
      await userEvent.type(confirmPasswordInput, 'Test1');
    });
    
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    });
    
    expect(screen.getByText('Password must be at least 6 characters long')).toBeInTheDocument();
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('shows error when password lacks uppercase letter', async () => {
    render(<PasswordValidator onSubmit={mockOnSubmit} />);
    
    const passwordInput = screen.getByPlaceholderText('Enter password');
    const confirmPasswordInput = screen.getByPlaceholderText('Confirm password');
    
    await act(async () => {
      await userEvent.type(passwordInput, 'test123!');
      await userEvent.type(confirmPasswordInput, 'test123!');
    });
    
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    });
    
    expect(screen.getByText('Password must contain at least one uppercase letter')).toBeInTheDocument();
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('shows error when password lacks lowercase letter', async () => {
    render(<PasswordValidator onSubmit={mockOnSubmit} />);
    
    const passwordInput = screen.getByPlaceholderText('Enter password');
    const confirmPasswordInput = screen.getByPlaceholderText('Confirm password');
    
    await act(async () => {
      await userEvent.type(passwordInput, 'TEST123!');
      await userEvent.type(confirmPasswordInput, 'TEST123!');
    });
    
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    });
    
    expect(screen.getByText('Password must contain at least one lowercase letter')).toBeInTheDocument();
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('shows error when password lacks number', async () => {
    render(<PasswordValidator onSubmit={mockOnSubmit} />);
    
    const passwordInput = screen.getByPlaceholderText('Enter password');
    const confirmPasswordInput = screen.getByPlaceholderText('Confirm password');
    
    await act(async () => {
      await userEvent.type(passwordInput, 'TestTest!');
      await userEvent.type(confirmPasswordInput, 'TestTest!');
    });
    
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    });
    
    expect(screen.getByText('Password must contain at least one number')).toBeInTheDocument();
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('shows error when password lacks special character', async () => {
    render(<PasswordValidator onSubmit={mockOnSubmit} />);
    
    const passwordInput = screen.getByPlaceholderText('Enter password');
    const confirmPasswordInput = screen.getByPlaceholderText('Confirm password');
    
    await act(async () => {
      await userEvent.type(passwordInput, 'Test123Test');
      await userEvent.type(confirmPasswordInput, 'Test123Test');
    });
    
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    });
    
    expect(screen.getByText(/Password must contain at least one special character/)).toBeInTheDocument();
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('shows success message and calls onSubmit when password is valid', async () => {
    render(<PasswordValidator onSubmit={mockOnSubmit} />);
    
    const passwordInput = screen.getByPlaceholderText('Enter password');
    const confirmPasswordInput = screen.getByPlaceholderText('Confirm password');
    
    await act(async () => {
      await userEvent.type(passwordInput, 'Test123!');
      await userEvent.type(confirmPasswordInput, 'Test123!');
    });
    
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    });
    
    await waitFor(() => {
      expect(screen.getByText('Password is valid!')).toBeInTheDocument();
      expect(mockOnSubmit).toHaveBeenCalledWith('Test123!');
    });
  });

  it('uses custom submit button text when provided', () => {
    render(<PasswordValidator onSubmit={mockOnSubmit} submitButtonText="Create Password" />);
    
    expect(screen.getByRole('button', { name: /create password/i })).toBeInTheDocument();
  });

  it('applies custom class names when provided', async () => {
    const { container } = render(
      <PasswordValidator
        onSubmit={mockOnSubmit}
        className="custom-form"
        inputClassName="custom-input"
        buttonClassName="custom-button"
        errorClassName="custom-error"
      />
    );
    
    // Check form element
    const form = container.querySelector('form');
    expect(form).toHaveClass('custom-form');
    
    // Check input fields
    const inputs = container.querySelectorAll('input');
    inputs.forEach(input => {
      expect(input).toHaveClass('custom-input');
    });
    
    // Check button
    const button = container.querySelector('button');
    expect(button).toHaveClass('custom-button');
    
    // Check error container (by triggering an error)
    const passwordInput = screen.getByPlaceholderText('Enter password');
    const confirmPasswordInput = screen.getByPlaceholderText('Confirm password');
    
    await act(async () => {
      fireEvent.change(passwordInput, { target: { value: 'Test1!' } });
      fireEvent.change(confirmPasswordInput, { target: { value: 'Test1' } });
    });
    
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    });
    
    // Find the error container div that has both space-y-1 and custom-error classes
    const errorContainer = container.querySelector('div.space-y-1.custom-error');
    expect(errorContainer).toBeInTheDocument();
  });
}); 
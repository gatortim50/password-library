# React Password Validator

A React component for password validation with TypeScript and Tailwind CSS support. This component provides a customizable password input form with comprehensive validation rules and accessibility features.

## Features

- 🔒 Password confirmation matching
- 📏 Minimum length validation (6 characters)
- 🔠 Uppercase character requirement
- 🔡 Lowercase character requirement
- 🔢 Number requirement
- ⭐ Special character requirement
- 🎨 Customizable styles using Tailwind CSS
- 🔧 Customizable submit button text
- 🎯 Customizable error messages
- ♿ Accessibility features (ARIA labels, roles, keyboard navigation)
- 📱 Responsive design
- 📦 TypeScript support
- 🧪 Comprehensive test coverage

## Installation

```bash
npm install react-password-validator
# or
yarn add react-password-validator
```

## Usage

```tsx
import { PasswordValidator } from 'react-password-validator';

function App() {
  const handleSubmit = (password: string) => {
    console.log('Valid password:', password);
    // Handle the valid password here
  };

  return (
    <PasswordValidator
      onSubmit={handleSubmit}
      submitButtonText="Create Password"
      className="max-w-md mx-auto p-4"
      inputClassName="border-gray-300"
      buttonClassName="bg-indigo-600 hover:bg-indigo-700"
      errorClassName="text-red-600"
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| onSubmit | (password: string) => void | Required | Callback function called when password is valid |
| submitButtonText | string | 'Submit' | Text to display on the submit button |
| className | string | '' | Additional classes for the form container |
| inputClassName | string | '' | Additional classes for input fields |
| buttonClassName | string | '' | Additional classes for the submit button |
| errorClassName | string | '' | Additional classes for error messages |
| errorMessages | object | See below | Custom error messages for each validation rule |

### Custom Error Messages

You can customize all error messages by passing an `errorMessages` object:

```tsx
<PasswordValidator
  onSubmit={handleSubmit}
  errorMessages={{
    passwordMismatch: 'Your passwords do not match',
    minLength: 'Password must be at least 6 characters',
    uppercase: 'Include at least one uppercase letter',
    lowercase: 'Include at least one lowercase letter',
    number: 'Include at least one number',
    special: 'Include at least one special character'
  }}
/>
```

## Requirements

- React 16.8 or higher
- TypeScript 4.0 or higher
- Tailwind CSS 3.0 or higher

## Development

```bash
# Install dependencies
npm install

# Run tests
npm test
npm run test:watch
npm run test:coverage

# Build the library
npm run build
```

## Testing

The component includes comprehensive tests for:
- All validation rules
- Custom error messages
- Custom styling
- Accessibility features
- Form submission
- Error states

## Publishing

To publish the package to npm:

1. First, make sure you have an npm account and are logged in:
```bash
npm login
```

2. Update the version number in package.json:
```bash
npm version patch  # for small fixes
npm version minor  # for new features
npm version major  # for breaking changes
```

3. Build the package:
```bash
npm run build
```

4. Publish to npm:
```bash
npm publish
```

If you want to test the package before publishing:
```bash
npm pack
```

This will create a tarball that you can install in another project to test:
```bash
npm install ../path/to/react-password-validator-1.0.0.tgz
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT © [Your Name]

## Acknowledgments

- Built with React and TypeScript
- Styled with Tailwind CSS
- Tested with Jest and React Testing Library 
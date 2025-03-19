# React Password Validator

A modern, accessible, and customizable password validation component for React applications. Built with TypeScript and styled with Tailwind CSS.

## Features

- 🔒 Comprehensive password validation rules
- 🎨 Modern, responsive UI with Tailwind CSS
- ♿️ Fully accessible with ARIA attributes
- 📱 Mobile-friendly design
- 🎯 Customizable styling and error messages
- 🔍 Real-time validation feedback
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
    console.log('Password submitted:', password);
  };

  return (
    <PasswordValidator
      onSubmit={handleSubmit}
      submitButtonText="Create Password"
      errorMessages={{
        passwordMismatch: "Passwords don't match",
        minLength: "Password must be at least 6 characters long",
        uppercase: "Password must contain at least one uppercase letter",
        lowercase: "Password must contain at least one lowercase letter",
        number: "Password must contain at least one number",
        special: "Password must contain at least one special character"
      }}
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onSubmit` | `(password: string) => void` | Required | Callback function called when a valid password is submitted |
| `submitButtonText` | `string` | "Submit" | Text to display on the submit button |
| `className` | `string` | "" | Additional CSS classes for the form container |
| `inputClassName` | `string` | "" | Additional CSS classes for input fields |
| `buttonClassName` | `string` | "" | Additional CSS classes for the submit button |
| `errorClassName` | `string` | "" | Additional CSS classes for error messages |
| `errorMessages` | `object` | See below | Custom error messages for validation rules |

### Default Error Messages

```typescript
{
  passwordMismatch: 'Passwords do not match',
  minLength: 'Password must be at least 6 characters long',
  uppercase: 'Password must contain at least one uppercase letter',
  lowercase: 'Password must contain at least one lowercase letter',
  number: 'Password must contain at least one number',
  special: 'Password must contain at least one special character (!@#$%^&*()_-+={[}]|:;"\'<,>.)'
}
```

## Validation Rules

The component enforces the following password requirements:
- Minimum length of 6 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number
- At least one special character
- Passwords must match

## Development

This project uses a monorepo structure with the following organization:

```
react-password-validator/
├── packages/
│   └── react-password-validator/  # Main library package
│       ├── src/
│       │   ├── components/
│       │   │   └── PasswordValidator.tsx
│       │   └── index.ts
│       ├── jest.config.js
│       ├── package.json
│       └── tsconfig.json
├── example/                      # Example application
│   ├── src/
│   │   ├── App.tsx
│   │   ├── index.tsx
│   │   └── index.css
│   ├── public/
│   │   └── index.html
│   ├── package.json
│   ├── tsconfig.json
│   ├── tailwind.config.js
│   └── postcss.config.js
└── package.json
```

### Setup

1. Clone the repository:
```bash
git clone https://github.com/gatortim/password-library.git
cd react-password-validator
```

2. Install dependencies:
```bash
npm install
```

3. Build the library:
```bash
npm run build
```

4. Start the example application:
```bash
npm start
```

### Available Scripts

- `npm run build` - Build the library package
- `npm run test` - Run tests for the library
- `npm start` - Start the example application
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Generate test coverage report

### Publishing

To publish the package to npm:

1. First, make sure you're logged in to npm:
```bash
npm login
```

2. Choose the appropriate publish command based on your changes:
```bash
# For bug fixes (patch version)
npm run publish:patch

# For new features (minor version)
npm run publish:minor

# For breaking changes (major version)
npm run publish:major

# To publish without version changes
npm run publish
```

The publish commands will:
1. Build the library
2. Update the version (for patch/minor/major commands)
3. Publish the package to npm

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- React
- TypeScript
- Tailwind CSS
- Jest
- Testing Library 
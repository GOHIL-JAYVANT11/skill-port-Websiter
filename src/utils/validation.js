// Email validation
export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

// Password validation (minimum 8 characters, at least one uppercase, one lowercase, one number)
export const validatePassword = (password) => {
  if (password.length < 8) return false;
  if (!/[A-Z]/.test(password)) return false;
  if (!/[a-z]/.test(password)) return false;
  if (!/[0-9]/.test(password)) return false;
  return true;
};

// Phone validation (10 digits)
export const validatePhone = (phone) => {
  const re = /^[0-9]{10}$/;
  return re.test(phone.replace(/\D/g, ''));
};

// Full name validation
export const validateFullName = (name) => {
  return name.trim().length >= 2;
};

// Form validation helper
export const validateForm = (formData, rules) => {
  const errors = {};

  for (const field in rules) {
    const value = formData[field];
    const rule = rules[field];

    if (rule.required && !value) {
      errors[field] = `${rule.label} is required`;
      continue;
    }

    if (rule.validator && !rule.validator(value)) {
      errors[field] = rule.errorMessage || `Invalid ${rule.label}`;
    }
  }

  return errors;
};

// Specific form validation rules
export const VALIDATION_RULES = {
  LOGIN_FORM: {
    email: {
      required: true,
      label: 'Email',
      validator: validateEmail,
      errorMessage: 'Please enter a valid email address',
    },
    password: {
      required: true,
      label: 'Password',
      validator: (val) => val.length >= 6,
      errorMessage: 'Password must be at least 6 characters',
    },
  },
  REGISTER_FORM: {
    fullName: {
      required: true,
      label: 'Full Name',
      validator: validateFullName,
      errorMessage: 'Please enter a valid full name',
    },
    email: {
      required: true,
      label: 'Email',
      validator: validateEmail,
      errorMessage: 'Please enter a valid email address',
    },
    phone: {
      required: true,
      label: 'Phone',
      validator: validatePhone,
      errorMessage: 'Please enter a valid 10-digit phone number',
    },
    password: {
      required: true,
      label: 'Password',
      validator: validatePassword,
      errorMessage: 'Password must be at least 8 characters with uppercase, lowercase, and number',
    },
  },
  EDUCATION_FORM: {
    highestQualification: {
      required: true,
      label: 'Qualification',
    },
    university: {
      required: true,
      label: 'University/Institute',
    },
    startingYear: {
      required: true,
      label: 'Starting Year',
    },
    passingYear: {
      required: true,
      label: 'Passing Year',
    },
  },
};

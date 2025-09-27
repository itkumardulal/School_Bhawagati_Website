// Frontend input validation utilities

// Email validation
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Phone number validation (Nepal format)
export const validatePhone = (phone) => {
  const phoneRegex = /^[0-9+\-\s()]{10,15}$/;
  return phoneRegex.test(phone);
};

// Password validation
export const validatePassword = (password) => {
  return password && password.length >= 6;
};

// Name validation
export const validateName = (name) => {
  return name && name.trim().length >= 2 && name.trim().length <= 100;
};

// Title validation
export const validateTitle = (title) => {
  return title && title.trim().length >= 3 && title.trim().length <= 200;
};

// Content validation
export const validateContent = (content) => {
  return content && content.trim().length >= 10;
};

// Address validation
export const validateAddress = (address) => {
  return address && address.trim().length >= 10 && address.trim().length <= 500;
};

// Grade validation
export const validateGrade = (grade) => {
  const validGrades = [
    "Grade 1",
    "Grade 2",
    "Grade 3",
    "Grade 4",
    "Grade 5",
    "Grade 6",
    "Grade 7",
    "Grade 8",
    "Grade 9",
    "Grade 10",
    "+2 Program",
  ];
  return validGrades.includes(grade);
};

// Input sanitization
export const sanitizeInput = (input) => {
  if (typeof input !== "string") return input;

  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/javascript:/gi, "")
    .replace(/on\w+\s*=/gi, "")
    .trim();
};

// Form validation helper
export const validateForm = (formData, rules) => {
  const errors = {};

  Object.keys(rules).forEach((field) => {
    const value = formData[field];
    const rule = rules[field];

    if (rule.required && (!value || value.trim() === "")) {
      errors[field] = `${rule.label} is required`;
      return;
    }

    if (value && rule.validator && !rule.validator(value)) {
      errors[field] = rule.message || `Invalid ${rule.label}`;
    }

    if (value && rule.minLength && value.length < rule.minLength) {
      errors[
        field
      ] = `${rule.label} must be at least ${rule.minLength} characters`;
    }

    if (value && rule.maxLength && value.length > rule.maxLength) {
      errors[
        field
      ] = `${rule.label} must not exceed ${rule.maxLength} characters`;
    }
  });

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

// Common validation rules
export const validationRules = {
  email: {
    label: "Email",
    required: true,
    validator: validateEmail,
    message: "Please enter a valid email address",
  },
  password: {
    label: "Password",
    required: true,
    validator: validatePassword,
    message: "Password must be at least 6 characters long",
  },
  firstName: {
    label: "First Name",
    required: true,
    validator: validateName,
    message: "First name must be between 2 and 100 characters",
  },
  lastName: {
    label: "Last Name",
    required: true,
    validator: validateName,
    message: "Last name must be between 2 and 100 characters",
  },
  fullName: {
    label: "Full Name",
    required: true,
    validator: validateName,
    message: "Full name must be between 2 and 100 characters",
  },
  guardianName: {
    label: "Guardian Name",
    required: true,
    validator: validateName,
    message: "Guardian name must be between 2 and 100 characters",
  },
  phoneNumber: {
    label: "Phone Number",
    required: true,
    validator: validatePhone,
    message: "Please enter a valid phone number",
  },
  address: {
    label: "Address",
    required: true,
    validator: validateAddress,
    message: "Address must be between 10 and 500 characters",
  },
  gradeApplyingFor: {
    label: "Grade",
    required: true,
    validator: validateGrade,
    message: "Please select a valid grade",
  },
  message: {
    label: "Message",
    required: true,
    validator: validateContent,
    message: "Message must be at least 10 characters long",
  },
};

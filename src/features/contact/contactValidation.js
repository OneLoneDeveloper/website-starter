// This file contains the validation functions for the contact form. It includes functions to normalize the form data and validate the input fields, ensuring that the data meets specific criteria before submission.

// This function normalizes the contact form data by removing control characters, replacing multiple whitespace characters with a single space, and trimming leading/trailing whitespace. It also ensures that the values are strings, defaulting to an empty string if they are not.
export function normalizeContactFormData(data = {}) {
  const normalizeValue = (value) => {
    if (typeof value !== "string") {
      return "";
    }

    return value
      .replace(/[\u0000-\u001f\u007f]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  };

  return {
    name: normalizeValue(data.name),
    email: normalizeValue(data.email),
    message: normalizeValue(data.message),
  };
}

// This function validates the contact form data and returns an object containing any validation errors. It checks for required fields, length constraints, and email format.
export function validateContactForm(data = {}) {
  const errors = {};

  const name = data.name ?? "";
  const email = data.email ?? "";
  const message = data.message ?? "";

  // Name
  if (name === "") {
    errors.name = "Please enter your name.";
  } else if (name.length < 2) {
    errors.name = "Please enter a valid name.";
  } else if (name.length > 100) {
    errors.name = "Your name cannot exceed 100 characters.";
  }

  // Email
  if (email === "") {
    errors.email = "Please enter your email address.";
  } else {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      errors.email = "Please enter a valid email address.";
    }
  }

  // Message
  if (message === "") {
    errors.message = "Please enter a message.";
  } else if (message.length < 20) {
    errors.message = "Your message must be at least 20 characters.";
  } else if (message.length > 5000) {
    errors.message = "Your message cannot exceed 5000 characters.";
  }

  return errors;
}
export function validateContactForm(data) {
  const errors = {};

  const name = data.name?.trim() ?? "";
  const email = data.email?.trim() ?? "";
  const message = data.message?.trim() ?? "";

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
    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      errors.email = "Please enter a valid email address.";
    }
  }

  // Message
  if (message === "") {
    errors.message = "Please enter a message.";
  } else if (message.length < 20) {
    errors.message =
      "Your message must be at least 20 characters.";
  } else if (message.length > 5000) {
    errors.message =
      "Your message cannot exceed 5000 characters.";
  }

  return errors;
}
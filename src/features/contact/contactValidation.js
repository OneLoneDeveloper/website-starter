export function validateContactForm(data) {
  const errors = [];

  const { name, email, message } = data;

  if (!name || name.trim() === "") {
    errors.push("Name is required.");
  }

  if (!email || email.trim() === "") {
    errors.push("Email is required.");
  }

  if (!message || message.trim() === "") {
    errors.push("Message is required.");
  }

  return errors;
}

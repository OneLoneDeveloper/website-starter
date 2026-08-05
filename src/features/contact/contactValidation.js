export const CONTACT_LIMITS = {
  nameMin: 2,
  nameMax: 100,
  messageMin: 20,
  messageMax: 5000,
};

function normalizeSingleLine(value) {
  if (typeof value !== "string") {
    return "";
  }

  return value
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeMessage(value) {
  if (typeof value !== "string") {
    return "";
  }

  return value
    .replace(/\r\n?/g, "\n")
    .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, "")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export function normalizeContactFormData(data = {}) {
  return {
    name: normalizeSingleLine(data.name),
    email: normalizeSingleLine(data.email).toLowerCase(),
    message: normalizeMessage(data.message),
  };
}

export function validateContactForm(data = {}) {
  const errors = {};

  const name = typeof data.name === "string" ? data.name : "";
  const email = typeof data.email === "string" ? data.email : "";
  const message = typeof data.message === "string" ? data.message : "";

  if (!name) {
    errors.name = "Please enter your name.";
  } else if (name.length < CONTACT_LIMITS.nameMin) {
    errors.name = "Please enter a valid name.";
  } else if (name.length > CONTACT_LIMITS.nameMax) {
    errors.name = `Your name cannot exceed ${CONTACT_LIMITS.nameMax} characters.`;
  }

  if (!email) {
    errors.email = "Please enter your email address.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!message) {
    errors.message = "Please enter a message.";
  } else if (message.length < CONTACT_LIMITS.messageMin) {
    errors.message = `Your message must be at least ${CONTACT_LIMITS.messageMin} characters.`;
  } else if (message.length > CONTACT_LIMITS.messageMax) {
    errors.message = `Your message cannot exceed ${CONTACT_LIMITS.messageMax} characters.`;
  }

  return errors;
}

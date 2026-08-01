// This file contains the controller functions for handling contact form requests. It includes functions to render the contact page and handle form submissions, including data normalization, validation, and processing.

import {
  normalizeContactFormData,
  validateContactForm,
} from "./contactValidation.js";
import { processContactSubmission } from "./contactService.js";

// This function renders the contact page with an empty form and no errors.
export function getContactPage(req, res) {
  res.render("pages/contact", {
    title: "Contact Us",
    errors: [],
    formData: {},
  });
}

// This function handles the submission of the contact form. It normalizes and validates the form data, processes the submission if valid, and renders the appropriate response page. If the form data is invalid, it re-renders the contact page with error messages and the submitted form data.
export async function submitContactForm(req, res, next) {
  try {
    const normalizedData = normalizeContactFormData(req.body);
    const validationErrors = validateContactForm(normalizedData);

    if (Object.keys(validationErrors).length > 0) {
      return res.status(400).render("pages/contact", {
        title: "Contact Us",
        errors: validationErrors,
        formData: normalizedData,
      });
    }

    await processContactSubmission(normalizedData);

    res.render("pages/contactSuccess", {
      title: "Message Sent!"
    });
  } catch (error) {
    next(error);
  }
}

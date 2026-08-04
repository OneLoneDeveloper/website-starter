import {
  normalizeContactFormData,
  validateContactForm,
} from "./contactValidation.js";
import contactService from "./contactService.js";

export function getContactPage(req, res) {
  res.render("pages/contact", {
    title: "Contact Us",
    errors: [],
    formData: {},
  });
}

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

    await contactService.processContactSubmission(normalizedData);

    res.render("pages/contactSuccess", {
      title: "Message Sent!"
    });
  } catch (error) {
    next(error);
  }
}

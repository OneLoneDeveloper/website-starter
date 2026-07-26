import { validateContactForm } from "./contactValidation.js";
import { processContactSubmission } from "./contactService.js";

export function getContactPage(req, res) {
  res.render("pages/contact", {
    title: "Contact Us",
    errors: [],
    formData: {},
  });
}

export async function submitContactForm(req, res, next) {
  try {
    const validationErrors = validateContactForm(req.body);

    if (validationErrors.length > 0) {
      return res.status(400).render("pages/contact", {
        title: "Contact Us",
        errors: validationErrors,
        formData: req.body,
      });
    }

    await processContactSubmission(req.body);

    res.render("pages/contactSuccess", {
      title: "Message Sent!"
    });
  } catch (error) {
    next(error);
  }
}

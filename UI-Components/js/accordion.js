/* =========================================
   Accordion Component

   Expected HTML:
   - Accordion container: data-accordion
   - Trigger button: data-accordion-trigger
   - Trigger button needs aria-controls="panel-id"
   - Panel needs matching id="panel-id"

   Default:
   - Only one panel opens at a time.

   Optional:
   - Add data-accordion-multiple to allow multiple open panels.
========================================= */

export function initAccordion(root = document) {
  const accordions = root.querySelectorAll("[data-accordion]");

  accordions.forEach((accordion) => {
    if (accordion.dataset.accordionInitialized === "true") return;

    accordion.dataset.accordionInitialized = "true";

    accordion.addEventListener("click", (event) => {
      const trigger = event.target.closest("[data-accordion-trigger]");

      if (!trigger) return;
      if (!accordion.contains(trigger)) return;

      const panel = getAccordionPanel(trigger);

      if (!panel) return;

      const isOpen = trigger.getAttribute("aria-expanded") === "true";
      const allowsMultiplePanels = accordion.hasAttribute(
        "data-accordion-multiple"
      );

      if (!allowsMultiplePanels && !isOpen) {
        closeOtherAccordionPanels(accordion, trigger);
      }

      setAccordionPanelState(trigger, panel, !isOpen);
    });
  });
}

function getAccordionPanel(trigger) {
  const panelId = trigger.getAttribute("aria-controls");

  if (!panelId) return null;

  return document.getElementById(panelId);
}

function closeOtherAccordionPanels(accordion, currentTrigger) {
  const triggers = accordion.querySelectorAll("[data-accordion-trigger]");

  triggers.forEach((trigger) => {
    if (trigger === currentTrigger) return;

    const panel = getAccordionPanel(trigger);

    if (!panel) return;

    setAccordionPanelState(trigger, panel, false);
  });
}

function setAccordionPanelState(trigger, panel, shouldOpen) {
  trigger.setAttribute("aria-expanded", String(shouldOpen));

  if (shouldOpen) {
    panel.dataset.open = "true";
    panel.setAttribute("aria-hidden", "false");
    panel.removeAttribute("inert");
  } else {
    panel.dataset.open = "false";
    panel.setAttribute("aria-hidden", "true");
    panel.setAttribute("inert", "");
  }
}
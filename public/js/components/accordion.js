/* ================================
   Accordion Component

   Usage:
   - Add data-accordion to the accordion container.
   - Add data-accordion-trigger to each accordion button.
   - Each button needs aria-controls="panel-id".
   - Each panel needs a matching id="panel-id".

   Default behavior:
   - Only one panel opens at a time.

   Optional:
   - Add data-accordion-multiple to the accordion container
     to allow multiple panels to stay open.
================================ */

document.addEventListener("click", (event) => {
  const trigger = event.target.closest("[data-accordion-trigger]");

  if (!trigger) return;

  const accordion = trigger.closest("[data-accordion]");

  if (!accordion) return;

  const panelId = trigger.getAttribute("aria-controls");
  const panel = document.getElementById(panelId);

  if (!panel) return;

  const isOpen = trigger.getAttribute("aria-expanded") === "true";
  const allowsMultipleOpenPanels = accordion.hasAttribute("data-accordion-multiple");

  if (!allowsMultipleOpenPanels && !isOpen) {
    closeOtherAccordionPanels(accordion, trigger);
  }

  setAccordionPanelState(trigger, panel, !isOpen);
});

function closeOtherAccordionPanels(accordion, currentTrigger) {
  const triggers = accordion.querySelectorAll("[data-accordion-trigger]");

  triggers.forEach((trigger) => {
    if (trigger === currentTrigger) return;

    const panelId = trigger.getAttribute("aria-controls");
    const panel = document.getElementById(panelId);

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
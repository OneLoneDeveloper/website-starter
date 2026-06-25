/* ================================
   Modal Component

   Usage:
   - Add data-modal-open="modal-id" to any button/link that opens a modal.
   - Add data-modal-close to any button inside the modal that closes it.
   - The modal itself should be a <dialog> with a matching id.
================================ */

document.addEventListener("click", (event) => {
  const openButton = event.target.closest("[data-modal-open]");
  const closeButton = event.target.closest("[data-modal-close]");

  if (openButton) {
    const modalId = openButton.dataset.modalOpen;
    const modal = document.getElementById(modalId);

    if (!modal) return;

    openModal(modal);
  }

  if (closeButton) {
    const modal = closeButton.closest("dialog");

    if (!modal) return;

    closeModal(modal);
  }
});

document.addEventListener("click", (event) => {
  const modal = event.target.closest("dialog.modal");

  if (!modal) return;

  /*
    Close when clicking the backdrop.

    For <dialog>, clicking the backdrop makes the dialog itself
    the event target. Clicking inside .modal__panel does not.
  */
  if (event.target === modal) {
    closeModal(modal);
  }
});

function openModal(modal) {
  if (!(modal instanceof HTMLDialogElement)) return;
  if (modal.open) return;

  modal.showModal();

  document.body.style.overflow = "hidden";
}

function closeModal(modal) {
  if (!(modal instanceof HTMLDialogElement)) return;
  if (!modal.open) return;

  modal.close();

  document.body.style.overflow = "";
}

/*
  When the user presses Escape, <dialog> closes automatically.
  This keeps body scrolling restored afterward.
*/
document.addEventListener("close", (event) => {
  if (!event.target.matches("dialog.modal")) return;

  document.body.style.overflow = "";
}, true);
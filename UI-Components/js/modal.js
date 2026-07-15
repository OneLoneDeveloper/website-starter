/* =========================================
   Modal Component

   Expected HTML:
   - Open button: data-modal-open="modal-id"
   - Modal: <dialog class="modal" id="modal-id">
   - Close button inside modal: data-modal-close

   Example:
   <button data-modal-open="example-modal">Open Modal</button>

   <dialog class="modal" id="example-modal">
     <div class="modal__panel">
       <button data-modal-close>Close</button>
     </div>
   </dialog>
========================================= */

export function initModal(root = document) {
  if (document.documentElement.dataset.modalInitialized === "true") return;

  document.documentElement.dataset.modalInitialized = "true";

  root.addEventListener("click", (event) => {
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

  root.addEventListener("click", (event) => {
    const modal = event.target.closest("dialog.modal");

    if (!modal) return;

    if (event.target === modal) {
      closeModal(modal);
    }
  });

  document.addEventListener(
    "close",
    (event) => {
      if (!event.target.matches("dialog.modal")) return;

      document.documentElement.classList.remove("has-modal-open");
    },
    true
  );
}

function openModal(modal) {
  if (!(modal instanceof HTMLDialogElement)) return;
  if (modal.open) return;

  document.documentElement.classList.add("has-modal-open");
  modal.showModal();
}

function closeModal(modal) {
  if (!(modal instanceof HTMLDialogElement)) return;
  if (!modal.open) return;

  modal.close();
  document.documentElement.classList.remove("has-modal-open");
}
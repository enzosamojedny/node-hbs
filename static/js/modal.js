function modalPopUp(title, text, closeButtonLabel, saveChangesButtonLabel) {
  // Create modal element
  const modal = document.createElement("div");
  modal.classList.add("modal");
  modal.tabIndex = -1;

  // Create modal dialog
  const modalDialog = document.createElement("div");
  modalDialog.classList.add("modal-dialog");

  // Create modal content
  const modalContent = document.createElement("div");
  modalContent.classList.add("modal-content");

  // Create modal header
  const modalHeader = document.createElement("div");
  modalHeader.classList.add("modal-header");

  // Create modal title
  const modalTitle = document.createElement("h5");
  modalTitle.classList.add("modal-title");
  modalTitle.textContent = title;

  // Create close button
  const closeButton = document.createElement("button");
  closeButton.type = "button";
  closeButton.classList.add("btn-close");
  closeButton.setAttribute("data-bs-dismiss", "modal");
  closeButton.setAttribute("aria-label", "Close");

  // Append title and close button to header
  modalHeader.appendChild(modalTitle);
  modalHeader.appendChild(closeButton);

  // Create modal body
  const modalBody = document.createElement("div");
  modalBody.classList.add("modal-body");

  // Create body text
  const bodyText = document.createElement("p");
  bodyText.textContent = text;

  // Append body text to modal body
  modalBody.appendChild(bodyText);

  // Create modal footer
  const modalFooter = document.createElement("div");
  modalFooter.classList.add("modal-footer");

  // Create close button for footer
  const closeButtonFooter = document.createElement("button");
  closeButtonFooter.type = "button";
  closeButtonFooter.classList.add("btn", "btn-secondary");
  closeButtonFooter.setAttribute("data-bs-dismiss", "modal");
  closeButtonFooter.textContent = closeButtonLabel;

  // Create save changes button
  const saveChangesButton = document.createElement("button");
  saveChangesButton.type = "button";
  saveChangesButton.classList.add("btn", "btn-primary");
  saveChangesButton.textContent = saveChangesButtonLabel;

  // Append buttons to modal footer
  modalFooter.appendChild(closeButtonFooter);
  modalFooter.appendChild(saveChangesButton);

  // Append header, body, and footer to modal content
  modalContent.appendChild(modalHeader);
  modalContent.appendChild(modalBody);
  modalContent.appendChild(modalFooter);

  // Append content to modal dialog
  modalDialog.appendChild(modalContent);

  // Append dialog to modal
  modal.appendChild(modalDialog);

  // Append modal to the document body
  document.body.appendChild(modal);
}
module.exports = modalPopUp;

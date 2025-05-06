//функция открытие поп-ап

function openModal(popUp) {
  popUp.classList.add("popup_is-opened");
  document.addEventListener("keydown", EscModal);
  popUp.addEventListener("mousedown", closeOverlay);
}

//функция закрытия поп-ап

function closeModal(element) {
  element.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", EscModal);
  element.removeEventListener("mousedown", closeOverlay);
}

function closeOverlay(e) {
  if (e.target === e.currentTarget) {
      closeModal(e.currentTarget);
  }
}

function EscModal(evt) {
  if (evt.key === "Escape") {
      closeModal(document.querySelector(".popup_is-opened"));
  }
}

export { openModal, closeModal, closeOverlay, EscModal };
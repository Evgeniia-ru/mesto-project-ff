/*Открыть попап*/
function openPopup(popup) {
    popup.classList.add("popup_is-opened");
    document.addEventListener("keydown", closeEsc);
  }
  
  /*Закрыть попап*/
  function closePopup(popup) {
    popup.classList.remove("popup_is-opened");
    document.removeEventListener("keydown", closeEsc);
  }
  
  /*Закрыть попап клавишей esc*/
  function closeEsc(evt) {
    if (evt.key === "Escape") {
      const popup = document.querySelector(".popup_is-opened");
      closePopup(popup);
    }
  }
  
export {closePopup, openPopup};
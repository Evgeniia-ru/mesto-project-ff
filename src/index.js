/*Импорт*/
import "./pages/index.css";
import {initialCards} from "./cards.js";
import {createCard, pressLike, deleteCard} from "./components/card.js";
import {openPopup, closePopup} from "./components/modal.js";

/*DOM узлы*/

const content = document.querySelector(".content");
const placesList = content.querySelector(".places__list");

const formEditProfile = document.querySelector('[name="edit-profile"]');
const formNewPlace = document.querySelector('[name="new-place"]');

const profileEditButton = content.querySelector(".profile__edit-button");
const profileAddButton = content.querySelector(".profile__add-button");
const profileTitle = content.querySelector(".profile__title");
const profileDescription = content.querySelector(".profile__description");

const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const popupTypeImage = document.querySelector(".popup_type_image");

const inputPlaceName = formNewPlace.querySelector('input[name="place-name"]');
const inputPlaceImage = formNewPlace.querySelector('input[name="link"]');
const inputName = formEditProfile.querySelector('input[name="name"]');
const inputDescription = formEditProfile.querySelector('input[name="description"]');

const popupImage = popupTypeImage.querySelector(".popup__image");
const popupCaption = popupTypeImage.querySelector(".popup__caption");
const popupArray = Array.from(document.querySelectorAll(".popup"));

/*Базовые карточки для открывшейся страницы*/

initialCards.forEach(function (cardElement) {
  const createdCard = createCard(cardElement, pressLike, createImagePopup, deleteCard);
  placesList.append(createdCard);
});

/*Добавление новой карточки*/

profileAddButton.addEventListener("click", function () {
  openPopup(popupTypeNewCard);
});

function addNewCard(evt) {
  evt.preventDefault();

  const placeName = inputPlaceName.value;
  const placeLink = inputPlaceImage.value;
  const newCardsArray = {
    name: placeName,
    link: placeLink,
  };
  const newCreatedCard = createCard(newCardsArray, pressLike, createImagePopup, deleteCard);

  placesList.prepend(newCreatedCard);

  formNewPlace.reset();

  closePopup(popupTypeNewCard);
}

formNewPlace.addEventListener("submit", addNewCard);

/*Добавление картинки и подписи в попап*/

function createImagePopup(linkValue, nameValue) {
  popupImage.src = linkValue;
  popupImage.alt = nameValue;
  popupCaption.textContent = nameValue;

  openPopup(popupTypeImage);
}

/*Плавность попапов + слушатель на крестик и фон*/

popupArray.forEach(function (popup) {
  const eachCloseButton = popup.querySelector(".popup__close");

  popup.classList.add("popup_is-animated");

  eachCloseButton.addEventListener("click", () => closePopup(popup)); 
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target === popup) {
      closePopup(popup);
   }
 }); 
});

/*Редактор профиля*/

function insertCurrentProfileValues() {
  inputName.value = profileTitle.textContent;
  inputDescription.value = profileDescription.textContent;

  openPopup(popupTypeEdit);
}

function editProfileForm(evt) {
  evt.preventDefault();

  profileTitle.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;

  closePopup(popupTypeEdit);
}

profileEditButton.addEventListener("click", insertCurrentProfileValues);
formEditProfile.addEventListener("submit", editProfileForm);

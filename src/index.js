import "./pages/index.css";
// import { initialCards } from './components/cards.js';
import { createCard, deleteCard } from "./components/card.js";
import { openModal, closeModal } from "./components/modal.js";
import { enableValidation, clearValidation } from "./components/validation.js";
import { checkLink, getUserCards, getUserProfile, editProfileImage, patchUserProfile, postNewCard, deleteCardId, toogleLikeCard } from "./components/api.js";

//DOM узлы
const placesList = document.querySelector(".places__list");
const profilePopUp = document.querySelector(".popup_type_edit");
const profileActive = document.querySelector(".profile__edit-button");
const popUpClose = document.querySelector(".popup__close");
const profileForm = document.forms["edit-profile"];
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileImage = document.querySelector(".profile__image");

const profileEditAvatarForm = document.forms["new-avatar"];
const profileEditAvatarInput = profileEditAvatarForm.querySelector(".popup__input_type_url");
const profileEditAvatarPopUp = document.querySelector(".popup_type_new-avatar");

const buttonAddCard = document.querySelector(".profile__add-button");
const cardContent = document.querySelector(".popup_type_new-card");
const closeCardSection = cardContent.querySelector(".popup__close");
const popUpImg = document.querySelector(".popup_type_image");
const closeImg = popUpImg.querySelector(".popup__close");
const imageCard = popUpImg.querySelector(".popup__image");
const imageCaption = popUpImg.querySelector(".popup__caption");
const popUpList = document.querySelectorAll(".popup");
const confirmDeleteForm = document.forms["confirm-delete"];
const confirmDeletePopUp = document.querySelector(".popup_type_delete-card");

//добавление карточек

const newPlaseForm = document.forms["new-place"];
const placeName = document.querySelector(".popup__input_type_card-name");
const placeUrl = document.querySelector(".popup__input_type_url");
const imageName = document.querySelector(".popup__caption");
const imageUrl = document.querySelector(".popup__image");
const saveCard = newPlaseForm.querySelector(".popup__button");

//конфигурация валидации
const validationConfig = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_error",
    errorClass: "popup__error_shown",
};

//Карточка удаления
const cardForDelete = {
    cardId: "",
    cardElement: null,
};

// загрузка страницы
function initializePage(getUserCards, getUserProfile) {
    Promise.all([getUserCards(), getUserProfile()])
        .then(([cards, userData]) => {
            cards.forEach((cardData) => {
                placesList.append(createCard(cardData, toogleLikeCard, zoomImage, deleteModal, userData._id));
            });
            updateProfile(userData);
        })
        .catch((err) => console.error(`Ошибка: ${err}`));
}

//профиль
function inputEditProfile() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;
}

// апдейт профиля
function updateProfile(profileData) {
    profileName.textContent = profileData.name;
    profileDescription.textContent = profileData.about;
    profileImage.style.backgroundImage = `url(${profileData.avatar})`;
}

//отправка формы профиля
function handleEditProfile(evt) {
    evt.preventDefault();
    const newProfile = {
        name: nameInput.value,
        about: jobInput.value,
    };
    patchUserProfile(newProfile)
        .then((newProfile) => {
            profileName.textContent = newProfile.name;
            profileDescription.textContent = newProfile.about;
            closeModal(profilePopUp);
        })
        .catch((err) => console.error(`Ошибка ${err}`));
}

// аватар
profileImage.addEventListener("click", () => {
    profileEditAvatarForm.reset();
    openModal(profileEditAvatarPopUp);
    clearValidation(profileEditAvatarForm, validationConfig);
    profileEditAvatarInput.focus();
});

//отправка аватара
function handleAvatarFormSubmit(evt) {
    evt.preventDefault();
    const newAvatarLoad = { avatar: profileEditAvatarInput.value };
    const errorItem = profileEditAvatarForm.querySelector(`.${profileEditAvatarInput.id}-error`);
    checkLink(profileEditAvatarInput.value)
        .then((res) => {
            if (res) {
                editProfileImage(newAvatarLoad).then((profileData) => {
                    profileImage.style.backgroundImage = `url(${profileData.avatar})`;
                    closeModal(profileEditAvatarPopUp);
                    profileEditAvatarInput.classList.remove(validationConfig.inputErrorClass);
                    errorItem.classList.remove(validationConfig.errorClass);
                });
            } else {
                throw new Error("Ссылка не ведет на изображение");
            }
        })
        .catch((err) => {
            console.error(`Ошибка проверки ссылки аватара: ${err}`);
            profileEditAvatarInput.classList.add(validationConfig.inputErrorClass);
            errorItem.classList.add(validationConfig.errorClass);
            errorItem.textContent = "Ошибка ввода";
        });
}

//новая карточка
function newCardSubmit(evt) {
    evt.preventDefault();
    const newCard = {
        name: placeName.value,
        link: placeUrl.value,
    };
    postNewCard(newCard)
        .then((newCardData) => {
            placesList.prepend(createCard(newCardData, toogleLikeCard, zoomImage, deleteModal, newCardData.owner._id));
            newPlaseForm.reset();
            closeModal(cardContent);
        })
        .catch((err) => console.error(`Ошибка: ${err}`));
}

//удаление карты
function handleDeleteForm(evt) {
    evt.preventDefault();
    deleteCardId(cardForDelete.cardId)
        .then(() => {
            deleteCard(cardForDelete.cardElement);
            closeModal(confirmDeletePopUp);
        })
        .catch((err) => console.error("Ошибка:", err));
}

//zoom image

function zoomImage(name, link) {
    openModal(popUpImg);
    imageCard.src = link;
    imageCard.alt = name;
    imageCaption.textContent = name;
}

// //модал удаление карточки
function deleteModal(cardId, cardElement) {
    cardForDelete.cardId = cardId;
    cardForDelete.cardElement = cardElement;

    openModal(confirmDeletePopUp);

    confirmDeleteForm.elements["delete-button"].focus();
}

//листнеры
// buttonAddCard.addEventListener('click', () => openModal(cardContent));
profileForm.addEventListener("submit", handleEditProfile);

buttonAddCard.addEventListener("click", () => {
    placeName.value = "";
    placeUrl.value = "";
    openModal(cardContent);
    clearValidation(newPlaseForm, validationConfig);

    placeName.focus();
});

newPlaseForm.addEventListener("submit", newCardSubmit);

confirmDeleteForm.addEventListener("submit", handleDeleteForm);

popUpClose.addEventListener("click", () => closeModal(profilePopUp));
profileActive.addEventListener("click", function () {
    openModal(profilePopUp);
    inputEditProfile();
    clearValidation(profileForm, validationConfig);
});

profileEditAvatarForm.addEventListener("submit", handleAvatarFormSubmit);

//анимация
popUpList.forEach(function (element) {
    element.classList.add("popup_is-animated");
});

//закрытие всех окон
document.querySelectorAll(".popup__close").forEach((button) => {
    const buttonsPopup = button.closest(".popup");
    button.addEventListener("click", () => closeModal(buttonsPopup));
});

initializePage(getUserCards, getUserProfile);
enableValidation(validationConfig);

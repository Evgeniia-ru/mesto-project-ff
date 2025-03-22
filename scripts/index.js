// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(cardData, forDelete) {

    //клонирование шаблона
    const newCard = cardTemplate.querySelector('.card').cloneNode(true);

    //установка значения вложенных элементов
    newCard.querySelector('.card__image').src = cardData.link;
    newCard.querySelector('.card__image').alt = cardData.name;
    newCard.querySelector('.card__title').textContent = cardData.name;

    //обработчик клика для кнопки удаления
    const deleteButton = newCard.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', forDelete);
  
    return newCard;
}

// @todo: Функция удаления карточки
function deleteCard(evt) {
    evt.target.closest('.card').remove();
}

// @todo: Вывести карточки на страницу
for (const cardData of initialCards) {
    placesList.append(createCard(cardData, deleteCard));
}


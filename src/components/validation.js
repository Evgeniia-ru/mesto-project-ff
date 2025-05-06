// Валидация всех форм
function enableValidation(config) {
    const forms = document.querySelectorAll(config.formSelector);
  
    forms.forEach((formElement) => {
        const inputs = formElement.querySelectorAll(config.inputSelector);
        const submitButton = formElement.querySelector(config.submitButtonSelector);
  
        inputs.forEach((inputElement) => {
            inputElement.addEventListener("input", () => {
                isInputValid(formElement, inputElement, config.inputErrorClass, config.errorClass);
                toggleSubmitButton(inputs, submitButton, config.inactiveButtonClass);
            });
        });
  
        toggleSubmitButton(inputs, submitButton, config.inactiveButtonClass);
    });
  }
  
  // Проверка валидности полей формы
  function isInputValid(formElement, inputElement, inputErrorClass, errorClass) {
    const errorItem = formElement.querySelector(`.${inputElement.id}-error`);
    const customErrorMessage = inputElement.dataset.errorMessage;
  
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(customErrorMessage);
    } else {
        inputElement.setCustomValidity("");
    }
  
    if (!inputElement.validity.valid) {
        showError(inputElement, errorItem, inputErrorClass, errorClass);
    } else {
        hideError(inputElement, errorItem, inputErrorClass, errorClass);
    }
  }
  
  // Переключение состояния кнопки при валидации
  function toggleSubmitButton(inputs, submitButton, inactiveButtonClass) {
    const hasInvalidInput = Array.from(inputs).some((inputElement) => !inputElement.validity.valid);
  
    if (hasInvalidInput) {
        submitButton.classList.add(inactiveButtonClass);
        submitButton.disabled = true;
    } else {
        submitButton.classList.remove(inactiveButtonClass);
        submitButton.disabled = false;
    }
  }
  
  // Очистка сообщений об ошибках
  function clearValidation(formElement, config) {
    const inputs = formElement.querySelectorAll(config.inputSelector);
    const submitButton = formElement.querySelector(config.submitButtonSelector);
  
    inputs.forEach((inputElement) => {
        const errorItem = formElement.querySelector(`.${inputElement.id}-error`);
  
        inputElement.setCustomValidity("");
        hideError(inputElement, errorItem, config.inputErrorClass, config.errorClass);
    });
    toggleSubmitButton(inputs, submitButton, config.inactiveButtonClass);
  }
  
  // ошибки
  function showError(inputElement, errorItem, inputErrorClass, errorClass) {
    inputElement.classList.add(inputErrorClass);
    errorItem.classList.add(errorClass);
    errorItem.textContent = inputElement.validationMessage;
  }
  
  function hideError(inputElement, errorItem, inputErrorClass, errorClass) {
    inputElement.classList.remove(inputErrorClass);
    errorItem.classList.remove(errorClass);
    errorItem.textContent = "";
  }
  
  export { enableValidation, clearValidation };
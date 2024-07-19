function showInputError(
	formElement,
	inputElement,
	errorMessage,
	validationConfig
) {
	const errorElement = formElement.querySelector(
		`.error_type_${inputElement.name}`
	);
	inputElement.classList.add(validationConfig.inputErrorClass);
	errorElement.textContent = errorMessage;
	errorElement.classList.add(validationConfig.errorClass);
}

function hideInputError(formElement, inputElement, validationConfig) {
	const errorElement = formElement.querySelector(
		`.error_type_${inputElement.name}`
	);
	inputElement.classList.remove(validationConfig.inputErrorClass);
	errorElement.classList.remove(validationConfig.errorClass);
	errorElement.textContent = "";
}

export function checkInputValidity(
	formElement,
	inputElement,
	validationConfig
) {
	const regex = /[^a-zа-яё\s-]/i;
	if (
		(inputElement.name == "name" || inputElement.name == "place-name") &&
		regex.test(inputElement.value)
	) {
		inputElement.setCustomValidity(inputElement.dataset.errorMessage);
	} else {
		inputElement.setCustomValidity("");
	}

	if (!inputElement.validity.valid) {
		showInputError(
			formElement,
			inputElement,
			inputElement.validationMessage,
			validationConfig
		);
	} else {
		hideInputError(formElement, inputElement, validationConfig);
	}
}

function setEventListeners(formElement, validationConfig) {
	const inputList = Array.from(
		formElement.querySelectorAll(validationConfig.inputSelector)
	);
	const buttonElement = formElement.querySelector(
		validationConfig.submitButtonSelector
	);
	toggleButtonState(inputList, buttonElement, validationConfig);
	inputList.forEach((inputElement) => {
		inputElement.addEventListener("input", function () {
			checkInputValidity(formElement, inputElement, validationConfig);
			toggleButtonState(inputList, buttonElement, validationConfig);
		});
	});
}

function hasInvalidInput(inputList) {
	return inputList.some((elm) => {
		return !elm.validity.valid;
	});
}

function toggleButtonState(inputList, buttonElement, validationConfig) {
	if (hasInvalidInput(inputList)) {
		buttonElement.disabled = true;
		buttonElement.classList.add(validationConfig.inactiveButtonClass);
	} else {
		buttonElement.disabled = false;
		buttonElement.classList.remove(validationConfig.inactiveButtonClass);
	}
}

export function enableValidation(validationConfig) {
	const formList = Array.from(
		document.querySelectorAll(validationConfig.formSelector)
	);
	formList.forEach((formElement) => {
		setEventListeners(formElement, validationConfig);
	});
}

export function clearValidation(profileForm, validationConfig) {
	const inputList = Array.from(
		profileForm.querySelectorAll(validationConfig.inputSelector)
	);

	inputList.forEach((inputElement) => {
		hideInputError(profileForm, inputElement, validationConfig);

		const buttonElement = profileForm.querySelector(
			validationConfig.submitButtonSelector
		);

		buttonElement.disabled = true;
		buttonElement.classList.add(validationConfig.inactiveButtonClass);
	});
}

export const validationConfig = {
	formSelector: ".popup__form",
	inputSelector: ".popup__input",
	submitButtonSelector: ".popup__button",
	inactiveButtonClass: "popup__button_disabled",
	inputErrorClass: "popup__input_type_error",
	errorClass: "popup__error_visible",
};

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

function disableButton(buttonElement, validationConfig) {
	buttonElement.disabled = true;
	buttonElement.classList.add(validationConfig.inactiveButtonClass);
}

export function checkInputValidity(
	formElement,
	inputElement,
	validationConfig
) {
	if (inputElement.validity.patternMismatch) {
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
		disableButton(buttonElement, validationConfig);
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

		disableButton(buttonElement, validationConfig);
	});
}

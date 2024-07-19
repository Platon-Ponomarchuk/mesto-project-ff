import {
	showPopup,
	closePopup,
	closePopupByOverlay,
	loading,
} from "./modal.js";
import { clearValidation, validationConfig } from "./validation.js";
import { setUser } from "./api.js";

const editPopup = document.querySelector(".popup_type_edit");
const editButton = document.querySelector(".profile__edit-button");
const formElement = editPopup.querySelector(".popup__form");
const nameInput = formElement.querySelector(".popup__input_type_name");
const descInput = formElement.querySelector(".popup__input_type_description");

editButton.addEventListener("click", function () {
	fillInputs();
	clearValidation(formElement, validationConfig);
	showPopup(editPopup);
});

editPopup.addEventListener("click", closePopupByOverlay);

formElement.addEventListener("submit", handleFormSubmit);

function fillInputs() {
	nameInput.value = document.querySelector(".profile__title").textContent;
	descInput.value = document.querySelector(
		".profile__description"
	).textContent;
}

function handleFormSubmit(evt) {
	loading(true);
	evt.preventDefault();

	setUser(nameInput.value, descInput.value).then(() => {
		loading(false);
		closePopup();
	});
}

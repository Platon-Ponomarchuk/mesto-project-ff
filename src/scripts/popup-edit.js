import { showPopup, closePopup, closePopupByOverlay } from "./modal.js";

const editPopup = document.querySelector(".popup_type_edit");
const editButton = document.querySelector(".profile__edit-button");
const formElement = editPopup.querySelector(".popup__form");
const nameInput = formElement.querySelector(".popup__input_type_name");
const descInput = formElement.querySelector(".popup__input_type_description");

editButton.addEventListener("click", function () {
	fillInputs();
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
	evt.preventDefault();

	document.querySelector(".profile__title").textContent = nameInput.value;
	document.querySelector(".profile__description").textContent =
		descInput.value;

	closePopup();
}

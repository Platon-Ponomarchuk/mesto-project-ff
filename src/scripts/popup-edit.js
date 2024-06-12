import { showPopup, closePopup } from "./toggle-popup.js";

const editPopup = document.querySelector(".popup_type_edit");
const editButton = document.querySelector(".profile__edit-button");
const formElement = editPopup.querySelector(".popup__form");
const nameInput = formElement.querySelector(".popup__input_type_name");
const descInput = formElement.querySelector(".popup__input_type_description");

editButton.addEventListener("click", function () {
	getInputs();
	showPopup(editPopup);
	document.addEventListener("keydown", keyClose);
});

editPopup.addEventListener("click", function (evt) {
	if (
		evt.target.classList.contains("popup") ||
		evt.target.classList.contains("popup__close")
	) {
		closePopup(editPopup);
	}
});

formElement.addEventListener("submit", handleFormSubmit);

function keyClose(evt) {
	if (evt.key === "Escape") {
		closePopup(editPopup);
		document.removeEventListener("keydown", keyClose);
	}
}

function getInputs() {
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

	closePopup(editPopup);
}

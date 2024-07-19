import {
	showPopup,
	closePopup,
	closePopupByOverlay,
	loading,
} from "./modal.js";
import { clearValidation, validationConfig } from "./validation.js";
import { addCard } from "./api.js";

const createPopup = document.querySelector(".popup_type_new-card");
const createButton = document.querySelector(".profile__add-button");
const cardList = document.querySelector(".places__list");
const formElement = createPopup.querySelector(".popup__form");
const nameCardInput = formElement.querySelector(".popup__input_type_card-name");
const urlInput = formElement.querySelector(".popup__input_type_url");

createButton.addEventListener("click", function () {
	showPopup(createPopup);
});

createPopup.addEventListener("click", closePopupByOverlay);

formElement.addEventListener("submit", handleFormSubmit);

function handleFormSubmit(evt) {
	loading(true);
	evt.preventDefault();

	addCard(nameCardInput.value, urlInput.value).then(() => {
		loading(false);
		closePopup();
		formElement.reset();
		clearValidation(formElement, validationConfig);
	});
}

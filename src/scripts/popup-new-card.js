import { showPopup, closePopup, closePopupByOverlay } from "./modal.js";
import { createCard } from "./card.js";

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
	evt.preventDefault();

	cardList.prepend(createCard(nameCardInput.value, urlInput.value));
	formElement.reset();

	closePopup();
}

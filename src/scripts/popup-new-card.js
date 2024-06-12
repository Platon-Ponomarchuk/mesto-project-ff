import { showPopup, closePopup } from "./toggle-popup.js";
import { addCard } from "./create-cards.js";

const createPopup = document.querySelector(".popup_type_new-card");
const createButton = document.querySelector(".profile__add-button");
const cardList = document.querySelector(".places__list");
const formElement = createPopup.querySelector(".popup__form");
const nameCardInput = formElement.querySelector(".popup__input_type_card-name");
const urlInput = formElement.querySelector(".popup__input_type_url");

createButton.addEventListener("click", function () {
	showPopup(createPopup);
	document.addEventListener("keydown", keyClose);
});

createPopup.addEventListener("click", function (evt) {
	if (
		evt.target.classList.contains("popup") ||
		evt.target.classList.contains("popup__close")
	) {
		closePopup(createPopup);
	}
});

formElement.addEventListener("submit", handleFormSubmit);

function keyClose(evt) {
	if (evt.key === "Escape") {
		closePopup(createPopup);
		document.removeEventListener("keydown", keyClose);
	}
}

function handleFormSubmit(evt) {
	evt.preventDefault();

	cardList.prepend(addCard(nameCardInput.value, urlInput.value));
	nameCardInput.value = "";
	urlInput.value = "";

	closePopup(createPopup);
}

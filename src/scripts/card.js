import { showPopup, closePopupByOverlay } from "./modal.js";

const cardTemplate = document.querySelector("#card-template").content;
const imagePopup = document.querySelector(".popup_type_image");
const imagePopupElement = imagePopup.querySelector(".popup__image");
const captionPopupElement = imagePopup.querySelector(".popup__caption");

export function createCard(name, link) {
	const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
	const deleteButton = cardElement.querySelector(".card__delete-button");
	const imageElement = cardElement.querySelector(".card__image");
	const titleElement = cardElement.querySelector(".card__title");
	const likeButton = cardElement.querySelector(".card__like-button");

	imageElement.src = link;
	imageElement.alt = "Картинка " + name;
	titleElement.textContent = name;

	deleteButton.addEventListener("click", deleteCard);

	likeButton.addEventListener("click", like);

	imageElement.addEventListener("click", showImagePopup);

	imagePopup.addEventListener("click", closePopupByOverlay);

	return cardElement;
}

function showImagePopup(evt) {
	const currentTitle = evt.target.closest(".card").querySelector(".card__title");
	imagePopupElement.src = evt.target.src;
	imagePopupElement.alt = evt.target.alt;
	captionPopupElement.textContent = currentTitle.textContent;
	showPopup(imagePopup);
}

function like(evt) {
	evt.target.classList.toggle("card__like-button_is-active");
}

function deleteCard(evt) {
	evt.target.closest(".card").remove();
}

import { showPopup, closePopupByOverlay } from "./modal.js";

const cardTemplate = document.querySelector("#card-template").content;
const imagePopup = document.querySelector(".popup_type_image");

export function createCard(name, link, like, deleteCard, showImagePopup) {
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

export function like(evt) {
	evt.target.classList.toggle("card__like-button_is-active");
}

export function deleteCard(evt) {
	evt.target.closest(".card").remove();
}

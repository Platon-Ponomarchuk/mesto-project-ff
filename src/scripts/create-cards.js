import { initialCards } from "./cards.js";
import { showPopup, closePopup } from "./toggle-popup.js";

const cardTemplate = document.querySelector("#card-template").content;
const cardList = document.querySelector(".places__list");
const imagePopup = document.querySelector(".popup_type_image");

export function addCard(name, link) {
	const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
	const deleteButton = cardElement.querySelector(".card__delete-button");
	const imageElement = cardElement.querySelector(".card__image");
	const titleElement = cardElement.querySelector(".card__title");
	const likeButton = cardElement.querySelector(".card__like-button");
	const imagePopupElement = imagePopup.querySelector(".popup__image");
	const captionPopupElement = imagePopup.querySelector(".popup__caption");

	imageElement.src = link;
	imageElement.alt = "Картинка " + name;
	titleElement.textContent = name;

	deleteButton.addEventListener("click", function () {
		deleteCard(cardElement);
	});

	likeButton.addEventListener("click", function () {
		likeButton.classList.toggle("card__like-button_is-active");
	});

	imageElement.addEventListener("click", function (evt) {
		imagePopupElement.src = evt.target.src;
		imagePopupElement.alt = evt.target.alt;
		const currentTitle = evt.target
			.closest(".card")
			.querySelector(".card__title");
		showPopup(imagePopup);
		captionPopupElement.textContent = currentTitle.textContent;
		document.addEventListener("keydown", keyClose);
	});

	imagePopup.addEventListener("click", function (evt) {
		if (
			evt.target.classList.contains("popup") ||
			evt.target.classList.contains("popup__close")
		) {
			closePopup(imagePopup);
		}
	});

	return cardElement;
}

function deleteCard(card) {
	card.remove();
}

function keyClose(evt) {
	if (evt.key === "Escape") {
		closePopup(imagePopup);
		document.removeEventListener("keydown", keyClose);
	}
}

initialCards.forEach((item) => {
	const newCard = addCard(item.name, item.link);
	cardList.append(newCard);
});

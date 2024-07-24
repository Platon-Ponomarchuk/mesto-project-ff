import "../pages/index.css";
import { createCard, like, isLiked } from "./card.js";
import "./popup-edit.js";
import "./popup-new-card.js";
import {deleteUsersCard} from "./popup-delete.js";
import { showImagePopup } from "./popup-image.js";
import { showPopup } from "./modal.js";
import "./popup-avatar.js";
import { enableValidation } from "./validation.js";
import { getUser, getCards } from "./api.js";
import "./popup-delete.js";

export const cardList = document.querySelector(".places__list");
export const avatarElement = document.querySelector(".profile__image");
export const nameElement = document.querySelector(".profile__title");
export const descriptionElement = document.querySelector(
	".profile__description"
);

export const validationConfig = {
	formSelector: ".popup__form",
	inputSelector: ".popup__input",
	submitButtonSelector: ".popup__button",
	inactiveButtonClass: "popup__button_disabled",
	inputErrorClass: "popup__input_type_error",
	errorClass: "popup__error_visible",
};

export function loading(isLoading) {
	const openedPopup = document.querySelector(".popup_is-opened");
	const button = openedPopup.querySelector(".popup__button");
	if (isLoading) {
		button.textContent = "Сохранение...";
	} else {
		button.textContent = "Сохранить";
	}
}

Promise.all([getUser(), getCards()])
	.then(([userData, cardsArray]) => {
		avatarElement.src = userData.avatar;
		nameElement.textContent = userData.name;
		descriptionElement.textContent = userData.about;

		cardsArray.forEach((item) => {
			const newCard = createCard(
				item,
				like,
				showImagePopup,
				showPopup,
				userData,
				deleteUsersCard,
				isLiked
			);
			cardList.append(newCard);
		});
	})
	.catch((err) => console.log(err));

enableValidation(validationConfig);

import "../pages/index.css";
import { createCard, like, deleteCard } from "./card.js";
import "./popup-edit.js";
import "./popup-new-card.js";
import "./popup-delete.js";
import { showImagePopup } from "./popup-image.js";
import { showPopup } from "./modal.js";
import "./popup-avatar.js";
import { enableValidation } from "./validation.js";
import { getUser, getCards, isLiked } from "./api.js";
import "./popup-delete.js";

let user;
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

getUser()
	.then((result) => {
		avatarElement.src = result.avatar;
		nameElement.textContent = result.name;
		descriptionElement.textContent = result.about;

		user = result;

		getCards().then((result) => {
			result.forEach((item) => {
				const newCard = createCard(
					item.name,
					item.link,
					item.likes.length,
					like,
					showImagePopup,
					showPopup,
					isLiked(item.likes, user),
					user,
					item.owner._id,
					item,
					deleteCard
				);
				cardList.append(newCard);
			});
		});
	})
	.catch((err) => console.log(err));

enableValidation(validationConfig);

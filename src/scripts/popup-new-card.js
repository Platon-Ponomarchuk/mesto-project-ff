import { showPopup, closePopup, closePopupByOverlay } from "./modal.js";
import { showImagePopup } from "./popup-image.js";
import { createCard, like, deleteCard, isLiked, updateCard } from "./card.js";
import { clearValidation } from "./validation.js";
import { addCard, getCards } from "./api.js";
import { loading, cardList, validationConfig, user } from "./index.js";

const createPopup = document.querySelector(".popup_type_new-card");
const createButton = document.querySelector(".profile__add-button");
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

	addCard(nameCardInput.value, urlInput.value)
		.then(() => {
			getCards()
				.then((result) => {
					cardList.replaceChildren();
					result.forEach((item) => {
						const newCard = createCard(
							item,
							like,
							showImagePopup,
							showPopup,
							user,
							deleteCard,
							isLiked,
							updateCard
						);
						cardList.append(newCard);
					});
					closePopup();
					formElement.reset();
					clearValidation(formElement, validationConfig);
				})
				.finally(() => {
					loading(false);
				});
		})
		.catch((err) => {
			console.log(err);
		});
}

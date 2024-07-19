import { closePopupByOverlay, closePopup } from "./modal.js";
import { userCards, currentCard } from "./card.js";
import { deleteCard } from "./api.js";

const deletePopup = document.querySelector(".popup_type_delete");
const popupButton = deletePopup.querySelector(".popup__button");

deletePopup.addEventListener("click", closePopupByOverlay);

popupButton.addEventListener("click", (evt) => {
	evt.preventDefault();

	userCards.forEach((element) => {
		if (currentCard == element.card) {
			deleteCard(element.json._id);
			currentCard.remove();
		}
	});

	closePopup(deletePopup);
});

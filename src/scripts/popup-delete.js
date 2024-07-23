import { closePopupByOverlay, closePopup } from "./modal.js";
import { currentCard } from "./index.js";
import { deleteCard } from "./api.js";

const deletePopup = document.querySelector(".popup_type_delete");
const popupButton = deletePopup.querySelector(".popup__button");

deletePopup.addEventListener("click", closePopupByOverlay);

popupButton.addEventListener("click", (evt) => {
	evt.preventDefault();

	deleteCard(currentCard.info._id)
		.then(() => {
			currentCard.card.remove();

			closePopup(deletePopup);
		})
		.catch((err) => console.log(err));
});

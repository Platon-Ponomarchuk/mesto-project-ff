import { showPopup, closePopupByOverlay } from "./modal.js";

const imagePopup = document.querySelector(".popup_type_image");
const imagePopupElement = imagePopup.querySelector(".popup__image");
const captionPopupElement = imagePopup.querySelector(".popup__caption");

imagePopup.addEventListener("click", closePopupByOverlay);

export function showImagePopup(evt) {
	const currentTitle = evt.target.closest(".card").querySelector(".card__title");
	imagePopupElement.src = evt.target.src;
	imagePopupElement.alt = evt.target.alt;
	captionPopupElement.textContent = currentTitle.textContent;
	showPopup(imagePopup);
}

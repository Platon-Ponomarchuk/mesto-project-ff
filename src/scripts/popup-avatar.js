import { showPopup, closePopup, closePopupByOverlay } from "./modal.js";
import { clearValidation } from "./validation.js";
import { setUserAvatar } from "./api.js";
import { loading, validationConfig, avatarElement } from "./index.js";

const avatarPopup = document.querySelector(".popup_type_new-avatar");
const avatarButton = document.querySelector(".profile__edit-button_avatar");
const formElement = avatarPopup.querySelector(".popup__form");
const urlInput = formElement.querySelector(".popup__input_type_url");

avatarButton.addEventListener("click", function () {
	clearValidation(formElement, validationConfig);
	showPopup(avatarPopup);
});

avatarPopup.addEventListener("click", closePopupByOverlay);

formElement.addEventListener("submit", handleFormSubmit);

function handleFormSubmit(evt) {
	loading(true);
	evt.preventDefault();

	setUserAvatar(urlInput.value)
		.then((result) => {
			avatarElement.src = result.avatar;
			closePopup();
		})
		.catch((err) => {
			console.log(err);
		})
		.finally(() => {
			loading(false);
		});
}

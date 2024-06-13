export function showPopup(obj) {
	obj.classList.add("popup_is-opened", "popup_is-animated");
	setTimeout(function () {
		obj.classList.remove("popup_is-animated");
	}, 0);
	document.addEventListener("keydown", closePopupByEscape);
}

export function closePopup() {
	const obj = document.querySelector(".popup_is-opened");
	setTimeout(function () {
		obj.classList.remove("popup_is-opened", "popup_is-animated");
	}, 600);
	obj.classList.add("popup_is-animated");
	document.removeEventListener("keydown", closePopupByEscape);
}

function closePopupByEscape(evt) {
	if (evt.key === "Escape") {
		closePopup();
	}
}

export function closePopupByOverlay(evt) {
	if (
		evt.target.classList.contains("popup") ||
		evt.target.classList.contains("popup__close")
	) {
		closePopup();
	}
}

const imagePopup = document.querySelector(".popup_type_image");
const imagePopupElement = imagePopup.querySelector(".popup__image");
const captionPopupElement = imagePopup.querySelector(".popup__caption");

export function showImagePopup(evt) {
	const currentTitle = evt.target.closest(".card").querySelector(".card__title");
	imagePopupElement.src = evt.target.src;
	imagePopupElement.alt = evt.target.alt;
	captionPopupElement.textContent = currentTitle.textContent;
	showPopup(imagePopup);
}

export function showPopup(obj) {
	obj.classList.add("popup_is-opened");
	obj.style.animation = "appear 0.3s linear";
}

export function closePopup(obj) {
	setTimeout(function () {
		obj.classList.remove("popup_is-opened");
	}, 300);
	obj.style.animation = "disappear 0.3s linear";
}

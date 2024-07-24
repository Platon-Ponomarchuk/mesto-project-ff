import { addLike, deleteLike } from "./api.js";

let cardTemplate = document.querySelector("#card-template").content;

export function createCard(
	item,
	like,
	showImagePopup,
	showPopup,
	user,
	deleteUsersCard,
	isLiked
) {
	let cardElement = cardTemplate.querySelector(".card").cloneNode(true);
	let deleteButton = cardElement.querySelector(".card__delete-button");
	let imageElement = cardElement.querySelector(".card__image");
	let titleElement = cardElement.querySelector(".card__title");
	let likeButton = cardElement.querySelector(".card__like-button");
	let likeCounter = cardElement.querySelector(".card__like-count");

	imageElement.src = item.link;
	imageElement.alt = "Картинка " + item.name;
	titleElement.textContent = item.name;
	likeCounter.textContent = item.likes.length;

	if (isLiked(item.likes, user)) {
		likeButton.classList.add("card__like-button_is-active");
		likeButton.classList.remove("card__like-button");
	}

	if (user._id != item.owner._id) {
		deleteButton.remove();
	} else {
		deleteButton.addEventListener("click", () => {
			deleteUsersCard(item, showPopup, cardElement);
		});
	}

	likeButton.addEventListener("click", () => {
		like(item, likeButton, user, likeCounter, cardElement);
	});

	imageElement.addEventListener("click", showImagePopup);

	return cardElement;
}

export function like(item, likeButton, user, likeCounter) {
	if (likeButton.classList.contains("card__like-button_is-active")) {
		deleteLike(item._id, item.likes)
			.then((result) => {
				updateCard(result, likeCounter, likeButton);
			})
			.catch((err) => console.log(err));

	} else {
		addLike(item._id, item.likes)
			.then((result) => {
				updateCard(result, likeCounter, likeButton);
			})
			.catch((err) => console.log(err));
	}
}

export function isLiked(array, user) {
	let res = false;

	if (array.length > 0) {
		array.forEach((elm) => {
			if (elm._id == user._id) {
				res = true;
			}
		});
	}

	return res;
}

function updateCard(result, counter, likeButton) {
	likeButton.classList.toggle("card__like-button_is-active");
	likeButton.classList.toggle("card__like-button");
	counter.textContent = result.likes.length;
}

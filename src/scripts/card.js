import { addLike, deleteLike, getCards } from "./api.js";
import { currentCard } from "./index.js";

let cardTemplate = document.querySelector("#card-template").content;

export function createCard(
	item,
	like,
	showImagePopup,
	showPopup,
	user,
	deleteCard,
	isLiked,
	updateCard
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
			deleteCard(item, showPopup, cardElement);
		});
	}

	likeButton.addEventListener("click", () => {
		like(item, likeButton, user, likeCounter, cardElement);
	});

	imageElement.addEventListener("click", showImagePopup);

	return cardElement;
}

export function like(item, likeButton, user, likeCounter, cardElement) {
	currentCard.card = cardElement;
	currentCard.info = item;

	if (likeButton.classList.contains("card__like-button_is-active")) {
		item.likes.forEach((result, index) => {
			if (result._id == user._id) {
				item.likes.splice(index, 1);
			}
		});

		deleteLike(item._id, item.likes, likeCounter)
			.then((result) => {
				updateCard(result, likeCounter, likeButton);
			})
			.catch((err) => console.log(err));

	} else {
		item.likes.push(user);
		
		addLike(item._id, item.likes, likeCounter)
			.then((result) => {
				updateCard(result, likeCounter, likeButton);
			})
			.catch((err) => console.log(err));
	}
}

export function deleteCard(item, showPopup, cardElement) {
	currentCard.card = cardElement;
	currentCard.info = item;
	showPopup(document.querySelector(".popup_type_delete"));
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

export function updateCard(result, counter, likeButton) {
	likeButton.classList.toggle("card__like-button_is-active");
	likeButton.classList.toggle("card__like-button");
	counter.textContent = result.likes.length;
}

import { addLike, deleteLike } from "./api.js";

const cardTemplate = document.querySelector("#card-template").content;
export let currentCard = {};

export function createCard(
	name,
	link,
	likeCount,
	like,
	showImagePopup,
	showPopup,
	liked,
	user,
	creatorId,
	json,
	deleteCard
) {
	const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
	const deleteButton = cardElement.querySelector(".card__delete-button");
	const imageElement = cardElement.querySelector(".card__image");
	const titleElement = cardElement.querySelector(".card__title");
	const likeButton = cardElement.querySelector(".card__like-button");
	const likeCounter = cardElement.querySelector(".card__like-count");

	imageElement.src = link;
	imageElement.alt = "Картинка " + name;
	titleElement.textContent = name;
	likeCounter.textContent = likeCount;

	if (liked) {
		likeButton.classList.add("card__like-button_is-active");
		likeButton.classList.remove("card__like-button");
	}

	if (user._id != creatorId) {
		deleteButton.remove();
	} else {
		deleteButton.addEventListener("click", function (evt) {
			deleteCard(evt, json, showPopup);
		});
	}

	likeButton.addEventListener("click", (evt) => {
		like(evt, json, likeButton, user);
	});

	imageElement.addEventListener("click", showImagePopup);

	return cardElement;
}

export function like(evt, json, likeButton, user) {
	currentCard = {
		card: evt.target.closest(".card"),
		info: json,
	};

	if (likeButton.classList.contains("card__like-button_is-active")) {
		json.likes.forEach((result, index) => {
			if (result._id == user._id) {
				json.likes.splice(index, 1);
			}
		});
		deleteLike(
			json._id,
			json.likes,
			currentCard.card.querySelector(".card__like-count")
		).then(() => {
			evt.target.classList.toggle("card__like-button_is-active");
			evt.target.classList.toggle("card__like-button");
		});
	} else {
		json.likes.push(user);
		addLike(
			json._id,
			json.likes,
			currentCard.card.querySelector(".card__like-count")
		).then(() => {
			evt.target.classList.toggle("card__like-button_is-active");
			evt.target.classList.toggle("card__like-button");
		});
	}
}

export function deleteCard(evt, json, showPopup) {
	currentCard = {
		card: evt.target.closest(".card"),
		info: json,
	};
	showPopup(document.querySelector(".popup_type_delete"));
}

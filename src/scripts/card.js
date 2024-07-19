import { showPopup } from "./modal.js";
import { addLike, userGlobal, deleteLike } from "./api.js";

const cardTemplate = document.querySelector("#card-template").content;
export let userCards = [];
let cards = [];
export let currentCard = null;

export function createCard(
	name,
	link,
	likeCount,
	like,
	showImagePopup,
	liked,
	usersCard,
	json
) {
	const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
	const deleteButton = cardElement.querySelector(".card__delete-button");
	const imageElement = cardElement.querySelector(".card__image");
	const titleElement = cardElement.querySelector(".card__title");
	const likeButton = cardElement.querySelector(".card__like-button");
	const likeCounter = cardElement.querySelector(".card__like-count");
	const deletePopup = document.querySelector(".popup_type_delete");

	imageElement.src = link;
	imageElement.alt = "Картинка " + name;
	titleElement.textContent = name;
	likeCounter.textContent = likeCount;

	if (liked) {
		likeButton.classList.add("card__like-button_is-active");
		likeButton.classList.remove("card__like-button");
	}

	cards.push({
		json: json,
		card: cardElement,
	});

	if (!usersCard) {
		deleteButton.remove();
	} else {
		userCards.push({
			json: json,
			card: cardElement,
		});

		deleteButton.addEventListener("click", function (evt) {
			currentCard = evt.target.closest(".card");
			showPopup(deletePopup);
		});
	}

	likeButton.addEventListener("click", (evt) => {
		currentCard = evt.target.closest(".card");

		cards.forEach((element) => {
			if (currentCard == element.card) {
				if (
					likeButton.classList.contains("card__like-button_is-active")
				) {
					like(evt.target);
					element.json.likes.forEach((user, index) => {
						if (user._id == userGlobal._id) {
							element.json.likes.splice(index, 1);
						}
					});
					deleteLike(
						element.json._id,
						element.json.likes,
						currentCard.querySelector(".card__like-count")
					);
				} else {
					like(evt.target);
					element.json.likes.push(userGlobal);
					addLike(
						element.json._id,
						element.json.likes,
						currentCard.querySelector(".card__like-count")
					);
				}
			}
		});
	});

	imageElement.addEventListener("click", showImagePopup);

	return cardElement;
}

export function like(target) {
	target.classList.toggle("card__like-button_is-active");
	target.classList.toggle("card__like-button");
}

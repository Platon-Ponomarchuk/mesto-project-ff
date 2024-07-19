import { createCard, like } from "./card.js";
import { showImagePopup } from "./popup-image.js";

const config = {
	baseUrl: "https://nomoreparties.co/v1/wff-cohort-18",
	headers: {
		authorization: "4457ae31-f058-4fe9-a14e-7149a426cdd0",
		"Content-Type": "application/json",
	},
};
export let userGlobal = {};

function getUserId() {
	return fetch(`${config.baseUrl}/users/me`, {
		method: "GET",
		headers: config.headers,
	})
		.then((res) => {
			if (res.ok) {
				return res.json();
			}
			return Promise.reject(`Ошибка: ${res.status}`);
		})
		.then((user) => user._id);
}

function isLiked(array) {
	const userID = getUserId();

	return Promise.all([userID]).then(() => {
		let ans = false;
		if (array.length > 0) {
			array.forEach((elm) => {
				if (elm._id == userGlobal._id) {
					ans = true;
					return ans;
				}
			});
		}
		return ans;
	});
}

function isUsersCard(cardUserId) {
	const userID = getUserId();

	return Promise.all([userID]).then((result) => {
		if (result == cardUserId) {
			return true;
		} else {
			return false;
		}
	});
}

export function getUser() {
	return fetch(`${config.baseUrl}/users/me`, {
		method: "GET",
		headers: config.headers,
	})
		.then((res) => {
			if (res.ok) {
				return res.json();
			}
			return Promise.reject(`Ошибка: ${res.status}`);
		})
		.then((user) => {
			userGlobal = user;

			const avatarElement = document.querySelector(".profile__image");
			const nameElement = document.querySelector(".profile__title");
			const descriptionElement = document.querySelector(
				".profile__description"
			);

			avatarElement.src = user.avatar;
			nameElement.textContent = user.name;
			descriptionElement.textContent = user.about;
		});
}

export function getCards() {
	return fetch(`${config.baseUrl}/cards`, {
		method: "GET",
		headers: config.headers,
	})
		.then((res) => {
			if (res.ok) {
				return res.json();
			}
			return Promise.reject(`Ошибка: ${res.status}`);
		})
		.then((result) => {
			const cardList = document.querySelector(".places__list");
			let usersCard;
			result.forEach((item) => {
				usersCard = isUsersCard(item.owner._id);

				Promise.all([usersCard, isLiked(item.likes)]).then((result) => {
					const newCard = createCard(
						item.name,
						item.link,
						item.likes.length,
						like,
						showImagePopup,
						result[1],
						result[0],
						item
					);
					cardList.append(newCard);
				});
			});
		});
}

function updateCard(cardId, counter) {
	return fetch(`${config.baseUrl}/cards`, {
		method: "GET",
		headers: config.headers,
	})
		.then((res) => {
			if (res.ok) {
				return res.json();
			}
			return Promise.reject(`Ошибка: ${res.status}`);
		})
		.then((result) => {
			result.forEach((elm) => {
				if (elm._id == cardId) {
					counter.textContent = elm.likes.length;
				}
			});
		});
}

export function deleteCard(cardId) {
	return fetch(`${config.baseUrl}/cards/${cardId}`, {
		method: "DELETE",
		headers: config.headers,
	}).catch((err) => console.log(err));
}

export function addLike(cardId, newLikes, counter) {
	return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
		method: "PUT",
		headers: config.headers,
		body: JSON.stringify({
			likes: newLikes,
		}),
	})
		.then(() => {
			updateCard(cardId, counter);
		})
		.catch((err) => console.log(err));
}

export function deleteLike(cardId, newLikes, counter) {
	return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
		method: "DELETE",
		headers: config.headers,
		body: JSON.stringify({
			likes: newLikes,
		}),
	})
		.then(() => {
			updateCard(cardId, counter);
		})
		.catch((err) => console.log(err));
}

export function setUser(newName, newAbout) {
	return fetch(`${config.baseUrl}/users/me`, {
		method: "PATCH",
		headers: config.headers,
		body: JSON.stringify({
			name: newName,
			about: newAbout,
		}),
	})
		.then((res) => res.json())
		.then(() => {
			getUser();
		})
		.catch((err) => console.log(err));
}

export function setUserAvatar(newUrl) {
	return fetch(`${config.baseUrl}/users/me/avatar`, {
		method: "PATCH",
		headers: config.headers,
		body: JSON.stringify({
			avatar: newUrl,
		}),
	})
		.then((res) => res.json())
		.then(() => {
			getUser();
		})
		.catch((err) => console.log(err));
}

export function addCard(cardName, cardLink) {
	return fetch(`${config.baseUrl}/cards`, {
		method: "POST",
		headers: config.headers,
		body: JSON.stringify({
			name: cardName,
			link: cardLink,
		}),
	})
		.then(() => {
			document.querySelector(".places__list").replaceChildren();
			getCards();
		})
		.catch((err) => console.log(err));
}

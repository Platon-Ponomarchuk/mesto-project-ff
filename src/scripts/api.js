const config = {
	baseUrl: "https://nomoreparties.co/v1/wff-cohort-18",
	headers: {
		authorization: "4457ae31-f058-4fe9-a14e-7149a426cdd0",
		"Content-Type": "application/json",
	},
};

function checkResponse(res) {
	if (res.ok) {
		return res.json();
	}
	return Promise.reject(`Ошибка ${res.status}`);
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

export function getUser() {
	return fetch(`${config.baseUrl}/users/me`, {
		method: "GET",
		headers: config.headers,
	})
		.then((res) => {
			return checkResponse(res);
		})
		.catch((err) => console.log(err));
}

export function getCards() {
	return fetch(`${config.baseUrl}/cards`, {
		method: "GET",
		headers: config.headers,
	})
		.then((res) => {
			return checkResponse(res);
		})
		.catch((err) => console.log(err));
}

function updateCard() {
	return fetch(`${config.baseUrl}/cards`, {
		method: "GET",
		headers: config.headers,
	})
		.then((res) => {
			return checkResponse(res);
		})
		.catch((err) => console.log(err));
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
			updateCard().then((result) => {
				result.forEach((elm) => {
					if (elm._id == cardId) {
						counter.textContent = elm.likes.length;
					}
				});
			});
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
			updateCard().then((result) => {
				result.forEach((elm) => {
					if (elm._id == cardId) {
						counter.textContent = elm.likes.length;
					}
				});
			});
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

export function addCard(
	cardName,
	cardLink,
	cardList
) {
	return fetch(`${config.baseUrl}/cards`, {
		method: "POST",
		headers: config.headers,
		body: JSON.stringify({
			name: cardName,
			link: cardLink,
		}),
	})
		.then(() => {
			cardList.replaceChildren();
			getCards();
		})
		.catch((err) => console.log(err));
}

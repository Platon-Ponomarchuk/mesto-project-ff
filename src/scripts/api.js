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

export function getUser() {
	return fetch(`${config.baseUrl}/users/me`, {
		method: "GET",
		headers: config.headers,
	}).then((res) => {
		return checkResponse(res);
	});
}

export function getCards() {
	return fetch(`${config.baseUrl}/cards`, {
		method: "GET",
		headers: config.headers,
	}).then((res) => {
		return checkResponse(res);
	});
}

export function deleteCard(cardId) {
	return fetch(`${config.baseUrl}/cards/${cardId}`, {
		method: "DELETE",
		headers: config.headers,
	}).then((res) => {
		return checkResponse(res);
	});
}

export function addLike(cardId, newLikes) {
	return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
		method: "PUT",
		headers: config.headers,
		body: JSON.stringify({
			likes: newLikes,
		}),
	}).then((res) => {
		return checkResponse(res);
	});
}

export function deleteLike(cardId, newLikes) {
	return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
		method: "DELETE",
		headers: config.headers,
		body: JSON.stringify({
			likes: newLikes,
		}),
	}).then((res) => {
		return checkResponse(res);
	});
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
		.then((res) => {
			return checkResponse(res);
		})
}

export function setUserAvatar(newUrl) {
	return fetch(`${config.baseUrl}/users/me/avatar`, {
		method: "PATCH",
		headers: config.headers,
		body: JSON.stringify({
			avatar: newUrl,
		}),
	})
		.then((res) => {
			return checkResponse(res);
		})
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
		.then((res) => {
			return checkResponse(res);
		})
}

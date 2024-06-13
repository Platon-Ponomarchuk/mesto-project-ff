import "../pages/index.css";
import { initialCards } from "./cards.js";
import "./popup-edit.js";
import "./popup-new-card.js";
import { createCard, like, deleteCard } from "./card.js";
import "./modal.js";
import { showImagePopup } from "./modal.js";

const cardList = document.querySelector(".places__list");

initialCards.forEach((item) => {
	const newCard = createCard(item.name, item.link, like, deleteCard, showImagePopup);
	cardList.append(newCard);
});

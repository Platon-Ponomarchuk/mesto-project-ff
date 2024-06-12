import "../pages/index.css";
import { initialCards } from "./cards.js";
import "./popup-edit.js";
import "./popup-new-card.js";
import { createCard } from "./card.js";

const cardList = document.querySelector(".places__list");

initialCards.forEach((item) => {
	const newCard = createCard(item.name, item.link);
	cardList.append(newCard);
});

import "../pages/index.css";
import "./popup-edit.js";
import "./popup-new-card.js";
import "./popup-delete.js";
import "./modal.js";
import "./popup-avatar.js";
import { enableValidation, validationConfig } from "./validation.js";
import "./api.js";
import { getCards, getUser } from "./api.js";
import "./popup-delete.js";

getUser();
getCards();

enableValidation(validationConfig);

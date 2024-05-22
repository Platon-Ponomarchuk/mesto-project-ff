const cardTemplate = document.querySelector('#card-template').content;
const cardList = document.querySelector('.places__list');

function cardAdd(name, link) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');

  cardElement.querySelector('.card__image').src = link;
  cardElement.querySelector('.card__title').textContent = name;

  deleteButton.addEventListener('click', function() {cardDelete(deleteButton)});
  cardList.append(cardElement);
}

function cardDelete(deleteButton) {
  deleteButton.closest('.card').remove();
}

initialCards.forEach((item) => {
  cardAdd(item.name, item.link,);
})

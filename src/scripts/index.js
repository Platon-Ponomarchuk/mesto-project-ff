import '../pages/index.css';

const cardTemplate = document.querySelector('#card-template').content;
const cardList = document.querySelector('.places__list');

function addCard(name, link) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const imageElement = cardElement.querySelector('.card__image');
  const titleElement = cardElement.querySelector('.card__title');

  imageElement.src = link;
  imageElement.alt = 'Картинка ' + name;
  titleElement.textContent = name;

  deleteButton.addEventListener('click', function() {deleteCard(cardElement)});

  return cardElement;
}

function deleteCard(card) {
  card.remove();
}

initialCards.forEach((item) => {
  cardList.append(addCard(item.name, item.link,));
})

console.log('Hello, World!');

const numbers = [2, 3, 5];

// Стрелочная функция. Не запнётся ли на ней Internet Explorer?
const doubledNumbers = numbers.map(number => number * 2);

console.log(doubledNumbers); // 4, 6, 10 

const lowLevel = document.getElementById('low-level');
const middleLevel = document.getElementById('middle-level');
const complicatedLevel = document.getElementById('complicated-level');
const startButton = document.getElementById('start-button');

let numberOfCards = 3;
let allCardsAreClosed;

lowLevel.addEventListener("click", () => numberOfCards = 3);
middleLevel.addEventListener("click", () => numberOfCards = 6);
complicatedLevel.addEventListener("click", () => numberOfCards = 10);
startButton.addEventListener("click", startGame);

setLevel();

const setLevel = () => {
  const levels = document.querySelectorAll('.levels-list__item');
  levels.forEach( (level) =>
    ( level.addEventListener('click', (event) => {
      levels.forEach( (level) => (level.classList.remove('levels-list__item_selected')));
      event.currentTarget.classList.add('levels-list__item_selected')} ) ) )
}

const startGame = () => {
  const menu = document.querySelector('.menu');
  const table = document.createElement('div');
  table.classList.add('table');
  document.body.prepend(table);
  menu.classList.add('hidden');
  determineAllCardsAreClosed();
  createCards();
  addCoupToCards();
}

const determineAllCardsAreClosed = () => {
  if (allCardsAreClosed === undefined) allCardsAreClosed = true
  else allCardsAreClosed = (allCardsAreClosed !== true);
  return allCardsAreClosed;
}

const createCards = () => {
  const table = document.querySelector('.table');
  let numberOfRows = (numberOfCards === 3) ? 1 : 2;
  let numberOfCardsinRow = (numberOfCards === 3) ? 3 : numberOfCards/2;
  let cardNumberWithBug =  getRandomInteger(1, numberOfCards);
  let idOfCard = 1;
  for (let i = 0; i < numberOfRows; i++) {
    let row = createRow(table);
    for (let i = 0; i < numberOfCardsinRow; i++) {
      if (idOfCard===cardNumberWithBug) idOfCard= createCard(row,'bug-card',idOfCard)
      else idOfCard = createCard(row,'game-over-card',idOfCard);
    }
  }
}

const getRandomInteger = (min, max) => {
  let random = min + Math.random() * (max + 1 - min);
  return Math.floor(random);
}

const createRow = (table) => {
  const row = document.createElement('div');
  row.classList.add('row');
  table.append(row);
  return row;
}

const createCard = (row,classOfOpen,idOfCard) => {
  idOfCard++;
  const card = document.createElement('div');
  card.classList.add('card','card_animated');
  row.append(card);
  const closedCard = document.createElement('div');
  closedCard.classList.add('closed-card');
  card.append(closedCard);
  const openCard = document.createElement('div');
  openCard.classList.add('open-card',classOfOpen);
  card.append(openCard);
  return idOfCard;
}

const addCoupToCards = () => {
  const cards = document.querySelectorAll('.card');
  cards.forEach( (card) => ( card.addEventListener('click', coup) ) )
}

const coup = (event) => {
  if (allCardsAreClosed) {
    event.currentTarget.classList.add('card_inverted');
    event.currentTarget.classList.remove('card_animated');
    determineAllCardsAreClosed();
  }
  else {
    startOver();
  }
}

const startOver = () => {
  const menu = document.querySelector('.menu');
  const table = document.querySelector('.table');
  menu.classList.remove('hidden');
  table.remove();
}
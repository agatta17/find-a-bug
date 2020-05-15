const lowLevel = document.getElementById('low-level');
const middleLevel = document.getElementById('middle-level');
const complicatedLevel = document.getElementById('complicated-level');
let numberOfCards = 3;
lowLevel.addEventListener("click", () => numberOfCards = 3);
middleLevel.addEventListener("click", () => numberOfCards = 6);
complicatedLevel.addEventListener("click", () => numberOfCards = 10);


const createCard = (row) => {
  const card = document.createElement('div');
  card.classList.add('card','card_animated');
  row.append(card);
  const closedCard = document.createElement('div');
  closedCard.classList.add('closed-card');
  card.append(closedCard);
  const openCard = document.createElement('div');
  openCard.classList.add('open-card');
  card.append(openCard);
}
const createRow = (table) => {
  const row = document.createElement('div');
  row.classList.add('row');
  table.append(row);
  return row;
}
const createCards = () => {
  const table = document.querySelector('.table');
  let numberOfRows = (numberOfCards === 3) ? 1 : 2;
  let numberOfCardsinRow = (numberOfCards === 3) ? 3 : numberOfCards/2;
  for (let i = 0; i < numberOfRows; i++) {
    let row = createRow(table);
    for (let i = 0; i < numberOfCardsinRow; i++) {
      createCard(row);
    }
  }
}
let allCardsAreClosed;
const determineAllCardsAreClosed = () => {
  if (allCardsAreClosed === undefined) allCardsAreClosed = true
  else allCardsAreClosed = (allCardsAreClosed !== true);
  return allCardsAreClosed;
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

const startButton = document.getElementById('start-button');
startButton.addEventListener("click", startGame);



const setLevel = () => {
  const levels = document.querySelectorAll('.levels-list__item');
  levels.forEach( (level) =>
    ( level.addEventListener('click', (event) => {
      levels.forEach( (level) => (level.classList.remove('levels-list__item_selected')));
      event.currentTarget.classList.add('levels-list__item_selected')} ) ) )
}
setLevel();








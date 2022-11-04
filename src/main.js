// import updateCurrentText from './scripts/updateCurrentText';
// import { cardsData } from './scripts/cardsData';

const cardsContainer = document.getElementById('cards-container');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const currentEl = document.getElementById('current');
const showBtn = document.getElementById('show');
const hideBtn = document.getElementById('hide');
const questionEl = document.getElementById('question');
const answerEl = document.getElementById('answer');
const addCardBtn = document.getElementById('add-card');
const clearBtn = document.getElementById('clear');
const addContainer = document.getElementById('add-container');
const clearCards = document.querySelector('.btn-clear');
const modalButton = document.getElementById('id01');
const delCurrentCard = document.getElementById('delete');

const knownCard = document.getElementById('known');
const learnedCards = document.getElementById('show-known');

// Keep track of current card
let currentActiveCard = 0;

// Store DOM cards
const cardsEl = [];
const iKnowThisCards = [];

// Store card data
const cardsData = getCardsData();

// Create all cards
function createCards() {
  cardsData.forEach((data, index) => createCard(data, index));
}

// Create a single card in DOM
function createCard(data, index) {
  const card = document.createElement('div');
  card.classList.add('card');

  if (index === 0) {
    card.classList.add('active');
  }

  card.innerHTML = `
    <div class="inner-card">
      <div class="inner-card-front">
        <p>${data.question}</p>
      </div>

      <div class="inner-card-back">
        <p>${data.answer}</p>
      </div>
    </div>
  `;

  card.addEventListener('click', () => card.classList.toggle('show-answer'));

  cardsEl.push(card);

  cardsContainer.appendChild(card);

  updateCurrentText();
}

// Show number of cards
function updateCurrentText() {
  currentEl.innerText = `${currentActiveCard + 1} / ${cardsEl.length}`;
}

// Get cards from local storage
function getCardsData() {
  const cards = JSON.parse(localStorage.getItem('cards'));
  return cards === null ? [] : cards;
}

// Add card to local storage
function setCardsData(cards) {
  localStorage.setItem('cards', JSON.stringify(cards));
  window.location.reload();
}

createCards();

// Next Button
nextBtn.addEventListener('click', () => {
  cardsEl[currentActiveCard].className = 'card left';

  currentActiveCard = currentActiveCard + 1;

  if (currentActiveCard > cardsEl.length - 1) {
    currentActiveCard = cardsEl.length - 1;
  }
  // У нас карты начинаются с единицы, а массив cardsEl начинается с нуля, поэтому мы от длины массива вычитаем 1.

  cardsEl[currentActiveCard].className = 'card active';

  updateCurrentText();
});

// Previous Button
prevBtn.addEventListener('click', () => {
  cardsEl[currentActiveCard].className = 'card right';

  currentActiveCard = currentActiveCard - 1;

  if (currentActiveCard < 0) {
    currentActiveCard = 0;
  }
  cardsEl[currentActiveCard].className = 'card active';

  updateCurrentText();
});

// Show add container
showBtn.addEventListener('click', () => addContainer.classList.add('show'));
// Hide add container
hideBtn.addEventListener('click', () => addContainer.classList.remove('show'));

// Add a new card
addCardBtn.addEventListener('click', () => {
  const question = questionEl.value;
  const answer = answerEl.value;
  // console.log(question, answer);

  if (question.trim() && answer.trim()) {
    // trim() method removes whitespace from both sides of a string
    const newCard = { question, answer };
    // const newCard = {question: question, answer: answer} // the same
    createCard(newCard);

    questionEl.value = '';
    answerEl.value = '';

    addContainer.classList.remove('show');

    cardsData.push(newCard);
    setCardsData(cardsData);
  }
});

// Open modal
clearCards.onclick = function () {
  modalButton.style.display = 'block';
};

// Delete all cards
clearBtn.addEventListener('click', () => {
  localStorage.clear();
  cardsContainer.innerHTML = '';
  window.location.reload();
});

// Delete a current card
delCurrentCard.addEventListener('click', () => {
  cardsData.splice(currentActiveCard, 1);
  localStorage.setItem('cards', JSON.stringify(cardsData));

  window.location.reload();
});

// knownCard.addEventListener('click', () => {
//   iKnowThisCards.push(cardsData[currentActiveCard]);
//   console.log(iKnowThisCards);
//   localStorage.setItem('known-cards', JSON.stringify(iKnowThisCards[currentActiveCard]));
// });

// learnedCards.addEventListener('click', () => {
//   const newCards = JSON.parse(localStorage.getItem('known-cards'));
//   return newCards === null ? [] : newCards;
// });

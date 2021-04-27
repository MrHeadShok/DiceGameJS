`use strict`;

const player1 = document.querySelector(`.player--0`);
const player2 = document.querySelector(`.player--1`);

const score1 = document.querySelector(`#score--0`);
const score2 = document.querySelector(`#score--1`);
const diceEl = document.querySelector(`.dice`);
score1.textContent = 0;
score2.textContent = 0;
diceEl.classList.add(`hidden`);

const btnNew = document.querySelector(`.btn--new`);
const btnRoll = document.querySelector(`.btn--roll`);
const btnHold = document.querySelector(`.btn--hold`);

const scores = [0, 0];

let score = 0;
let activePlayer = 0;
let playing = true;

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  score = 0;
  player1.classList.toggle(`player--active`);
  player2.classList.toggle(`player--active`);
};

const currentScore1 = document.getElementById(`current--0`);
const currentScore2 = document.getElementById(`current--1`);

btnRoll.addEventListener(`click`, function () {
  if (playing) {
    let dice = Math.trunc(Math.random() * 6) + 1;

    diceEl.classList.remove(`hidden`);
    console.log(dice);
    diceEl.src = `img/dice-${dice}.png`;

    if (dice !== 1) {
      score += dice;
      document.getElementById(`current--${activePlayer}`).textContent = score;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener(`click`, function () {
  if (playing) {
    scores[activePlayer] = score + scores[activePlayer];
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 5) {
      let playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add(`player--winner`);

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove(`.player--active`);
      btnRoll.classList.add(`hidden`);
      btnHold.classList.add(`hidden`);
      diceEl.classList.add(`hidden`);
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener(`click`, function () {
  score1.textContent = 0;
  score2.textContent = 0;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove(`.player--active`);

  player1.classList.add(`.player--active`);

  document.getElementById(`current--${activePlayer}`).textContent = 0;
  btnRoll.classList.remove(`hidden`);
  btnHold.classList.remove(`hidden`);
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove(`player--winner`);
});

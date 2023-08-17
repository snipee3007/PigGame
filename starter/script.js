'use strict';

//Selecting elements
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');

const player0 = document.querySelector('.player--0');

const dice = document.querySelector('.dice');
const roll = document.querySelector('.btn--roll');
const hold = document.querySelector('.btn--hold');
const newGame = document.querySelector('.btn--new');

//Creating function
const showDice = function (number) {
  dice.src = `dice-${number}.png`;
  dice.classList.remove('hidden');
};

const setActive = function (number) {
  document.querySelector(`.player--${number}`).classList.add('player--active');
  document
    .querySelector(`.player--${Number(!Boolean(number))}`)
    .classList.remove('player--active');
};
const getActive = function () {
  if (player0.classList.contains('player--active')) {
    return 0;
  } else {
    return 1;
  }
};

const resetScore = function () {
  score0El.textContent = 0;
  score1El.textContent = 0;
};

//Code
resetScore();
let ifWin = 0;
dice.classList.add('hidden');
let scoreUpdate = 0;
roll.addEventListener('click', function () {
  if (!ifWin) {
    const diceNumber = Math.trunc(Math.random() * 6) + 1;
    showDice(diceNumber);
    const currentScore = document.getElementById(`current--${getActive()}`);
    if (diceNumber !== 1) {
      currentScore.textContent = Number(currentScore.textContent) + diceNumber;
    } else {
      currentScore.textContent = 0;
      setActive(Number(!Boolean(getActive())));
    }
    scoreUpdate = Number(currentScore.textContent);
  }
});

hold.addEventListener('click', function () {
  if (!ifWin) {
    const score = document.getElementById(`score--${getActive()}`);
    score.textContent = Number(score.textContent) + scoreUpdate;
    document.getElementById(`current--${getActive()}`).textContent = 0;
    scoreUpdate = 0;
    if (Number(score.textContent) >= 100) {
      document.getElementById(
        `name--${getActive()}`
      ).textContent += ` WIN THE GAME 🥇`;
      ifWin = 1;
    } else {
      setActive(Number(!Boolean(getActive())));
    }
  }
});

newGame.addEventListener('click', function () {
  resetScore();
  setActive(0);
  document.querySelector('#current--0').textContent = 0;
  document.querySelector('#current--1').textContent = 0;
  dice.classList.add('hidden');
  scoreUpdate = 0;
  ifWin = 0;
  document.getElementById('name--0').textContent = 'PLAYER 1';
  document.getElementById('name--1').textContent = 'PLAYER 2';
});

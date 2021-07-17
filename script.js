'use strict';


let player0Score = 0; 
let player1Score = 0;
let player0CurrScore = 0;
let player1CurrScore = 0;

const dice = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const player_0 = document.querySelector('.player--0');
const player_1 = document.querySelector('.player--1');
const current_0 = document.querySelector('#current--0');
const current_1 = document.querySelector('#current--1');
const score_0 = document.querySelector('#score--0');
const score_1 = document.querySelector('#score--1');


//Setting Both Players Score to 0 initially
const bothPlayerScore = document.querySelectorAll('.score');
bothPlayerScore[0].textContent = player0CurrScore;
bothPlayerScore[1].textContent = player1CurrScore;


const calculateScore = function(currScore)
{
        let temp;
        temp = Math.trunc(Math.random()*6 + 1);
        let diceName = 'dice-'+temp+'.png';
        dice.classList.remove('hidden');
        document.querySelector('img').setAttribute('src', diceName);

        if(temp == 1)
        {
            currScore = 0;
        }
        else{
        currScore += temp;
        }
        return currScore;
}


const updateActivePlayerScore = function(){
    if(player_0.classList.contains('player--active'))
    {
        player0CurrScore = calculateScore(player0CurrScore);
        document.querySelector('#current--0').textContent = player0CurrScore;

        if(player0CurrScore === 0)
          {
              player_0.classList.remove('player--active');
              player_1.classList.add('player--active');
          }
    }
    else if(player_1.classList.contains('player--active'))
    {
        player1CurrScore = calculateScore(player1CurrScore);
        document.querySelector('#current--1').textContent = player1CurrScore;

        if(player1CurrScore === 0)
          {
              player_1.classList.remove('player--active');
              player_0.classList.add('player--active');
          }
    }
}

const updateScoreAtHold = function()
{
    if(player_0.classList.contains('player--active'))
    {
      score_0.textContent = Number(score_0.textContent) + Number(current_0.textContent);
      player0CurrScore = 0;
      current_0.textContent = '0';

      if(Number(score_0.textContent) >= 10)
      {
          player_0.classList.add('player--winner');
          dice.classList.add('hidden');
          btnHold.removeEventListener('click',updateScoreAtHold);
          btnRoll.removeEventListener('click', updateActivePlayerScore)
      }
      player_0.classList.remove('player--active');
      player_1.classList.add('player--active');
    }
    else if(player_1.classList.contains('player--active'))
    {
      score_1.textContent = Number(score_1.textContent)+Number(current_1.textContent);
      current_1.textContent = '0';
      player1CurrScore = 0;
      if(Number(score_1.textContent) >= 10)
      {
          player_1.classList.add('player--winner');
          dice.classList.add('hidden');
          btnHold.removeEventListener('click', updateScoreAtHold);
          btnRoll.removeEventListener('click', updateActivePlayerScore);
      }
      player_1.classList.remove('player--active');
      player_0.classList.add('player--active');
    }

}

const resetEverything = function()
{
    score_1.textContent = '0';
    score_0.textContent = '0';
    player0Score = 0; 
    player1Score = 0;
    player0CurrScore = 0;
    player1CurrScore = 0;
    btnRoll.addEventListener('click', updateActivePlayerScore);
    btnHold.addEventListener('click', updateScoreAtHold);
    if(player_1.classList.contains('player--active'))
    {
         player_0.classList.add('player--active');
         player_1.classList.remove('player--active');
    }
    player_0.classList.remove('player--winner');
    player_1.classList.remove('player--winner');


}

btnRoll.addEventListener('click', updateActivePlayerScore);
btnHold.addEventListener('click', updateScoreAtHold);

btnNew.addEventListener('click', resetEverything);



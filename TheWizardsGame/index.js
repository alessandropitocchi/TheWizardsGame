const spellButton = document.querySelectorAll('.spellButton');
const round = document.querySelector('.rounds');
const duelText = document.querySelector('.duelText')
const playAgainBtn = document.querySelector('.playAgain')

let rounds = 0;
let pPoints = 0;
let cPoints = 0;

function nRound(){
  rounds += 1;
  round.innerText = `Round: ${rounds}`;
  return rounds;
}

function cSelection() {
  const spells = ['Fire', 'Water', 'Leaf'];
  const cSel = spells[Math.floor(Math.random() * spells.length)];
  
  return cSel;
}

function gameOutput(pSel, cSel){
  const enemyIcon = document.querySelector('.enemySpell')
  const yourIcon = document.querySelector('.yourSpell')

  enemyIcon.classList.remove('fa-spinner',  'fa-fire', 'fa-droplet', 'fa-leaf');
  if (cSel === 'Fire') {
    enemyIcon.classList.add('fa-fire');
    enemyIcon.style.color = '#e71837';
  } else if (cSel === 'Water') {
    enemyIcon.classList.add('fa-droplet');
    enemyIcon.style.color = '#60b5e5';
  } else if (cSel === 'Leaf') {
    enemyIcon.classList.add('fa-leaf');
    enemyIcon.style.color = '#32b667';
  }

  yourIcon.classList.remove('fa-spinner',  'fa-fire', 'fa-droplet', 'fa-leaf');
  if (pSel === 'Fire') {
    yourIcon.classList.add('fa-fire');
    yourIcon.style.color = '#e71837';
  } else if (pSel === 'Water') {
    yourIcon.classList.add('fa-droplet');
    yourIcon.style.color = '#60b5e5';
  } else if (pSel === 'Leaf') {
    yourIcon.classList.add('fa-leaf');
    yourIcon.style.color = '#32b667';
  }

}

function countPoints(pSel, cSel){
  const duelOutput = document.querySelector('.duelSpeel');

  switch(true){
    case (pSel === cSel):
      duelText.innerText = `${pSel} and ${cSel}, It's a draw!`;
      break;
    case (pSel === 'Fire' && cSel === 'Leaf'):
    case (pSel === 'Water' && cSel === 'Fire'):
    case (pSel === 'Leaf' && cSel === 'Water'):
      duelText.innerText = `${pSel} beats ${cSel}, You won!`;
      pPoints += 1;
      break;
    case (pSel === 'Leaf' && cSel === 'Fire'):
    case (pSel === 'Fire' && cSel === 'Water'):
    case (pSel === 'Water' && cSel === 'Leaf'):
      duelText.innerText = `${cSel} beats ${pSel}, You lost!`;
      cPoints += 1;
      break;
   } 
   const result = document.querySelector('.result')
   result.innerText = `Your points: ${pPoints} | Enemy points: ${cPoints}`
   return [ pPoints, cPoints ]
}

function finalResult(pPoints, cPoints){
  if( pPoints === 5 || cPoints === 5){
    spellButton.forEach((button) =>  {
      button.setAttribute('disabled', '');
      button.classList.add('disabledButton', 'opacity');
    })

    const  duelResult = document.querySelector('.duelResult')
    if (pPoints > cPoints){
      duelText.innerText = 'Poor Enemy!';
      duelResult.classList.add('greenColor')
      duelResult.innerText ='Congrats! You have won this duel!'
    } else {
      duelText.innerText = 'Retry!';
      duelResult.classList.add('redColor')
      duelResult.innerText ='Retry! You have lost this duel!'
    }
    playAgainBtn.style.visibility = 'visible'
  }
}

function resetGame() {
  playAgainBtn.addEventListener('click', () => {
    window.location.reload();
  });
}

function playGame(){
  let pSel;
  let cSel;
  spellButton.forEach((spell) => {
    spell.addEventListener('click', () => {
    const spellIcons = document.querySelectorAll('.spellIcon');
    if(spell.classList.contains('fireButton')){
      spellIcons[0].style.color = '#e71837';
      spellIcons[1].style.color = 'gray';
      spellIcons[2].style.color = 'gray';
      pSel = 'Fire';
    } else  if(spell.classList.contains('waterButton')){
      spellIcons[0].style.color = 'gray';
      spellIcons[1].style.color = '#6db1d8';
      spellIcons[2].style.color = 'gray';
      pSel = 'Water';
    } else {
      spellIcons[0].style.color = 'gray';
      spellIcons[1].style.color = 'gray';
      spellIcons[2].style.color = '#32b667';
      pSel = 'Leaf';
    }
    cSel = cSelection();
    nRound();
    gameOutput(pSel, cSel)
    countPoints(pSel, cSel);
    finalResult(pPoints, cPoints);
    resetGame();
    })
  })
}

playGame()

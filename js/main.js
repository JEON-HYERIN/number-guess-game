const game = (function() {
  let randomNumber;
  let userChance = 5;
  let gameHistory = [];
  let isGameOver = false;
  let els = {};
  
  const init = function() {
    setElements();
    bindEvents();
    createRandomNumber();
  }
  
  const setElements = function() {
    els.section = document.querySelector('.game');
    if(!!els.section) {
      els.gameInput = els.section.querySelector('.game-input');
      els.playBtn = els.section.querySelector('.play-btn');
      els.gameResult = els.section.querySelector('.game-result');
      els.gameChance = els.section.querySelector('.game-chance');
      els.resetBtn = els.section.querySelector('.reset-btn');
    }
  }
  
  const bindEvents = function() {
    els.playBtn.addEventListener('click', gameHandler.play);
    els.resetBtn.addEventListener('click', gameHandler.reset);
    els.gameInput.addEventListener('focus', gameHandler.clearInput);
  }
  
  const gameHandler = {
    clearInput: function() {
      els.gameInput.value = '';
    },
    play: function() {
      let userValue = els.gameInput.value;
    
      if(userValue < 1 || userValue > 100) {
        els.gameResult.innerText = '1부터 100사이의 숫자를 입력해 주세요.';
        return;
      }
      if(gameHistory.includes(userValue)) {
        els.gameResult.innerText = '이미 입력한 숫자입니다. 다른 숫자를 입력해주세요.';
        return;
      }
    
      gameHistory.push(userValue);
    
      userChance --;
      els.gameChance.innerText = `${userChance}번`;
    
      if(userValue < randomNumber) {
        els.gameResult.innerText = 'Up 👍';
      } else if(userValue > randomNumber) {
        els.gameResult.innerText = 'Down 👎';
      } else {
        isGameOver = true;
        els.gameResult.innerText = '정답! 🎉';
      }
    
      if(userChance === 0) {
        isGameOver = true;
        els.gameResult.innerText = '게임 종료 😥';
      }
    
      if(isGameOver === true) {
        els.playBtn.disabled = true;
      }
    },
    reset: function() {
      console.clear();
      createRandomNumber();
      gameHandler.clearInput();
    
      gameHistory = [];
      userChance = 5;
      isGameOver = false;
      els.playBtn.disabled = false;
    
      els.gameChance.innerText = `${userChance}번`;
      els.gameResult.innerText = '게임 결과';
    }
  }
  
  function createRandomNumber() {
    randomNumber = Math.floor(Math.random() * 100) + 1;
  
    console.log(`정답: ${randomNumber}`);
  }

  return {
    init: init
  }
})();

game.init();

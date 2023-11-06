// 페이지 열자마자 랜덤 숫자 실행
// go 버튼을 누르면 게임 실행
// 1~100까지 사이의 숫자 입력하고 그렇지 않으면 경고(기회차감 x)
// 동일한 숫자 입력해도 경고(기회차감 x)
// 5번 모두 소진하면 게임종료
// reset 버튼 누르면 게임다시실행 초기화!!!
const gameInput = document.querySelector('.game-input');
const playBtn = document.querySelector('.play-btn');
const gameResult = document.querySelector('.game-result');
const gameChance = document.querySelector('.game-chance');
const resetBtn = document.querySelector('.reset-btn');

let randomNumber;
let userChance = 5;
let gameHistory = [];
let isGameOver = false;

playBtn.addEventListener('click', playGame);
resetBtn.addEventListener('click', resetGame);
gameInput.addEventListener('focus', clearInput);

function clearInput() {
  gameInput.value = '';
}

function playGame() {
  let userValue = gameInput.value;

  if(userValue < 1 || userValue > 100) {
    gameResult.innerText = '1부터 100사이의 숫자를 입력해 주세요.';
    return;
  }
  if(gameHistory.includes(userValue)) {
    gameResult.innerText = '이미 입력한 숫자입니다. 다른 숫자를 입력해주세요.';
    return;
  }

  gameHistory.push(userValue);

  userChance --;
  gameChance.innerText = `${userChance}번`;

  if(userValue < randomNumber) {
    gameResult.innerText = 'Up!';
  } else if(userValue > randomNumber) {
    gameResult.innerText = 'Down!';
  } else {
    isGameOver = true;
    gameResult.innerText = '정답!';
  }

  if(userChance === 0) {
    isGameOver = true;
    gameResult.innerText = '게임 종료';
  }

  if(isGameOver === true) {
    playBtn.disabled = true;
  }
}

function resetGame() {
  console.clear();
  createRandomNumber();
  clearInput();

  gameHistory = [];
  userChance = 5;
  isGameOver = false;
  playBtn.disabled = false;

  gameChance.innerText = `${userChance}번`;
  gameResult.innerText = '게임 결과';
}

function createRandomNumber() {
  randomNumber = Math.floor(Math.random() * 100) + 1;

  console.log(`정답: ${randomNumber}`);
}

createRandomNumber();
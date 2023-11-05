// 랜덤번호 지정
// 유저가 번호를 입력한다. 그리고 go라는 버튼을 누름
// 만약에 유저가 랜덤번호를 맞추면 맞췄습니다.
// 랜덤번호 < 유저번호 Down
// 랜덤번호 > 유저번호 Up
// reset 버튼을 누르면 게임이 리셋된다
// 5번의 기회를 다쓰면 게임이 종료된다(더이상 추측불가, 버튼 disable)
// 유저가 1~100 범위 밖의 숫자를 입력하면 알려준다. 기회를 깎지 않는다.
// 유저가 이미 입력한 숫자를 또 입력하면 알려준다. 기회를 깎지 않는다.

let computerNum = 0;
const playButton = document.querySelector('.play-button'); 
const userInput = document.querySelector('.user-input');
const resultArea = document.querySelector('.result-area');
const resetButton = document.querySelector('.reset-button');
let chances = 5;
let gameOver = false;
const chanceArea = document.querySelector('.chance-area');
let history = [];

playButton.addEventListener('click', play); // 함수가 매개변수로 들어가면 () 빼야함 이유: 함수가 실행됨
resetButton.addEventListener('click', reset);
userInput.addEventListener('focus', () => userInput.value = ''); // 잠깐 쓰고 끝날 함수, 즉 다른 곳에서 사용되지 않을 경우. 로직이 단순한경우 익명함수사용

function pickRandomNum() {
  computerNum = Math.floor(Math.random() * 100) + 1; // Math.random() 함수 -> 0~1 사이 숫자를 반환
  console.log('정답', computerNum);
}

function play() {
  const userValue = userInput.value;
  
  if(userValue < 1 || userValue > 100) {
    resultArea.textContent = '1과 100 사이 숫자를 입력해 주세요.';
    return; // 함수종료
  }

  if(history.includes(userValue)) {
    resultArea.textContent = '이미 입력한 숫자입니다. 다른 숫자를 입력해 주세요';
    return;
  }

  chances --;
  chanceArea.textContent = `남은기회: ${chances}번`;

  if(userValue < computerNum) {
    resultArea.textContent = 'Up!!!';
  } else if(userValue > computerNum) {
    resultArea.textContent = 'DOWN!!!';
  } else {
    resultArea.textContent = '정답입니다';
    gameOver = true;
  }

  history.push(userValue);
  console.log(history);
  if(chances < 1) {
    gameOver = true;
  }

  if(gameOver === true) {
    playButton.disabled = true;
  }
}

function reset() {
  // user input창이 깨끗하게 정리되고
  userInput.value = '';
  // 새로운 번호가 생성
  pickRandomNum();

  resultArea.textContent = '결과값이 여기 나옵니다';
}

pickRandomNum();

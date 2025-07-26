const themeToggleBtn = document.querySelector('.themeToggle');
const bodyElement = document.body;
const lightCal = document.querySelector('.iconoir--calculator');
const darkCal = document.querySelector('.iconoir--calculator-black');
const moon = document.querySelector('.material-symbols-light--dark-mode');
const sun = document.querySelector('.material-symbols-light--light-mode-rounded')
const histories = document.querySelector('.histories');
const history = document.querySelector('.history');
const historyText = document.querySelector('.historyText h1');
window.addEventListener('load', changeLogo());

themeToggleBtn.addEventListener('click', () => {
  if (bodyElement.classList.contains('dark-mode')) {
    bodyElement.classList.remove('dark-mode');
    bodyElement.classList.add('light-mode');
  } else {
    bodyElement.classList.remove('light-mode');
    bodyElement.classList.add('dark-mode');
  }
  changeLogo();
});
function changeLogo(){
  if(bodyElement.classList.contains('dark-mode')){
    darkCal.style.display = 'none';
    lightCal.style.display = 'inline-block';
    moon.style.display = 'inline-block';
    sun.style.display = 'none';
  }
  else if(bodyElement.classList.contains('light-mode')){
    lightCal.style.display = 'none'
    darkCal.style.display = 'inline-block'
    moon.style.display = 'none';
    sun.style.display = 'inline-block';
  }
}

function showHistory(){
  if(histories){
    histories.style.display = 'inline-block';
    historyText.style.display = 'flex';
    history.style.height = '450px';
  }
}
function closeHistory(){
  histories.style.display = 'none';
  historyText.style.display = 'none';
  history.style.height = 'auto';
  if(window.innerWidth<=700){
    history.style.top = '90%';
  }
}
document.addEventListener('click',function (event){
  if(!history.contains(event.target)  && !event.target.closest('.delHistory')){
    closeHistory();
  }
})
function forSmallDevices(){
  if(window.innerWidth<=700){
    history.style.top = '50%'
  }
}


//! Starting CalculatorFunctionality
const js_add         = document.querySelector('.add');
const js_sub         = document.querySelector('.sub');
const js_del         = document.querySelector('.del');
const js_mul         = document.querySelector('.mul');
const js_div         = document.querySelector('.div');
const js_btn8        = document.querySelector('.btn8');
const js_btn1        = document.querySelector('.btn1');
const js_btn2        = document.querySelector('.btn2');
const js_btn3        = document.querySelector('.btn3');
const js_btn4        = document.querySelector('.btn4');
const js_btn5        = document.querySelector('.btn5');
const js_btn6        = document.querySelector('.btn6');
const js_btn7        = document.querySelector('.btn7');
const js_btn9        = document.querySelector('.btn9');
const js_btn0        = document.querySelector('.btn0');
const js_equal       = document.querySelector('.equal');
const js_decimal     = document.querySelector('.decimal');
const js_reset       = document.querySelector('.reset');
const js_small_value = document.querySelector('.value');
const js_operation   = document.querySelector('.op');
const js_big_value      = document.querySelector('.black');

let operation  = '' ;
let bigValue   = '0';
let smallValue = '' ;
updateBigValue();
updateSmallValue();
displayOperation();
function updateBigValue(){    //? update big value in big text
  js_big_value.textContent = bigValue;
}
function displayOperation(){   //? update operation on ansbox
  js_operation.textContent = operation;
}
function updateSmallValue(){   //? update small value in small text
  js_small_value.textContent = smallValue;
}
function changeBigValue(num){ //? fun for getting num value for big text
  if(num === '.' && bigValue.includes('.')) return;
  if(bigValue == '0' && bigValue.length<=20){
    bigValue = num
  }
  else if(bigValue.length<=20){
    bigValue = bigValue + num
  }
  updateBigValue();
}

function removeLastChar() {
  if (bigValue.length > 1) {
    bigValue = bigValue.slice(0, -1); // remove last character
  } else {
    bigValue = '0'; // reset to 0 if nothing left
  }
  updateBigValue();
}

function resetAllValues(){
  bigValue = '0';
  smallValue = '';
  operation = '';
  updateBigValue();
  updateSmallValue();
  displayOperation();
}

function updateOperation(op){
  if(smallValue == ''){
    operation = op;
    smallValue = bigValue;
    bigValue = '0';
  }
  else{
    operation = op;
  }
  displayOperation();
  updateBigValue();
  updateSmallValue();
}

js_del.addEventListener('click', removeLastChar);
js_btn0.addEventListener('click', () => changeBigValue('0'));
js_btn1.addEventListener('click', () => changeBigValue('1'));
js_btn2.addEventListener('click', () => changeBigValue('2'));
js_btn3.addEventListener('click', () => changeBigValue('3'));
js_btn4.addEventListener('click', () => changeBigValue('4'));
js_btn5.addEventListener('click', () => changeBigValue('5'));
js_btn6.addEventListener('click', () => changeBigValue('6'));
js_btn7.addEventListener('click', () => changeBigValue('7'));
js_btn8.addEventListener('click', () => changeBigValue('8'));
js_btn9.addEventListener('click', () => changeBigValue('9'));
js_decimal.addEventListener('click', () => changeBigValue('.'));
js_reset.addEventListener('click',()=>{resetAllValues()});
js_add.addEventListener('click', ()=> {updateOperation('+')});
js_sub.addEventListener('click', ()=> {updateOperation('-')});
js_mul.addEventListener('click', ()=> {updateOperation('X')});
js_div.addEventListener('click', ()=> {updateOperation('/')});
js_equal.addEventListener('click', ()=>{calculateAnswerEqual()})

//? function for keyboard input
document.addEventListener('keydown', function(event) {
  const key = event.key;

  // Check if key is a digit 0-9
  if (!isNaN(key) && key !== ' '  && bigValue.length<=20) {
    changeBigValue(key);
  }

  // Optional: Handle other keys like + - * / . and Enter
  if (key === '.') {
    if(key === '.' && bigValue.includes('.')) return;
    changeBigValue(key);
  } else if (key === '+') {
    updateOperation('+')
  }
  else if (key === '-') {
    updateOperation('-')
  }
  else if (key === '*') {
    updateOperation('X')
  }
  else if (key === '/') {
    updateOperation('/')
  }
  else if (key === 'Enter') {
    calculateAnswerEqual();
  }
  else if(key == 'Backspace' && !event.ctrlKey) {
    removeLastChar();
  }
  else if(key == 'Backspace' && event.ctrlKey) {
    resetAllValues();
  }
  else if(key == '='){
    calculateAnswerEqual();
    displayHistory();
  }
});
function calculateAnswerEqual(){
  let answer;
  if(operation == '+'){
    answer = Number(bigValue) + Number(smallValue);
  }
  else if(operation == '-'){
    answer = Number(smallValue) - Number(bigValue);
  }
  else if(operation == 'X'){
    answer = Number(bigValue) * Number(smallValue);
  }
  else if(operation == '/'){
    if(bigValue === '0') {
      answer = 'Cannot divide by 0'; // <--- NEW SAFETY LINE
    } else {
      answer = Number(smallValue) / Number(bigValue);
    }
    answer = Number(smallValue) / Number(bigValue);
  }
  else if (operation == ''){
    answer = (smallValue == '')?bigValue:smallValue;
  }
  function displayAnswer(){
    smallValue = '';
    bigValue = `${answer}`;
    operation = '';
    updateBigValue();
    updateSmallValue();
    displayOperation();
  }
  function updateHistory(){
    storedHistory.push(
      {
      small : `${smallValue}`,
      big : `${bigValue}`,
      op : `${operation}`,
      ans : `${answer}`
    }
    )
    displayHistory();
    saveHistoryToLocal();
  }
  displayAnswer();
  updateHistory();
}

let storedHistory = [];
function displayHistory(){
  histories.innerHTML = ''; // Clear first, then add

  if(storedHistory.length === 0){
    histories.innerHTML = '<h3>Do some calculations to view history🙃</h3>';
    return;
  }

  storedHistory.forEach((item, index) => {
    const html = `
      <div class="history${index} historyn">
        <div class="calculation">
          <div class="historyValues">${item.big} ${item.op} ${item.small}</div>
          <div class="historyAns">=${item.ans}</div>
        </div>
        <div class="delHistory delHistory${index}" title="Delete this from history">
          <span class="material-symbols--delete"></span>
        </div>
      </div>
    `;
    // Inject HTML
    histories.insertAdjacentHTML('beforeend', html);

    // Attach event listener after the element is in the DOM
    document.querySelector(`.delHistory${index}`).addEventListener('click', () => {
      storedHistory.splice(index, 1);
      displayHistory();
    });
  });
}

displayHistory();
function saveHistoryToLocal() {
  localStorage.setItem('history', JSON.stringify(storedHistory));
}
function loadHistoryFromLocal() {
  const historyFromStorage = localStorage.getItem('history');
  if (historyFromStorage) {
    storedHistory = JSON.parse(historyFromStorage);
    displayHistory();
  }
}
loadHistoryFromLocal();
saveHistoryToLocal();


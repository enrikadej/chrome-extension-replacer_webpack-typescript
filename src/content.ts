
type Input = HTMLInputElement | HTMLTextAreaElement
type Button = HTMLButtonElement;

const allInputs = document.querySelectorAll('input');
const allTextArea = document.querySelectorAll('textarea');
const allContentEditable = document.querySelectorAll('[contenteditable="true"]');
const allAreas: Input[] = [...allInputs, ...allTextArea]

let arrOfReplacingWords: string[];
let index: number;
let stringArr: string[];
let word: string;
let currentField: Input;

for (let i = 0; i < allAreas.length; i++) {
  allInputs[i].addEventListener('input', (event) => {
    if (event && event.data && isSpace(event.data)) {
      currentField = allInputs[i];
      checkWordInString(allInputs[i].value);
    }
  })
}

const showModal = (words: string[]) => {
  const modal = document.createElement("dialog");
  modal.setAttribute(
    "style",`
    position: fixed; 
    top: 0;
    height:120px;
    border: none;
    border-radius:20px;
    background-color:white;
    box-shadow: 0px 12px 48px rgba(29, 5, 64, 0.32);
    `
  );

  modal.innerHTML = `
  <div style="position:absolute; top:0px; left:5px;">
  <button id="btn-close" style="padding: 8px 12px; font-size: 16px; border: none; border-radius: 20px;">x</button>
  </div>
  <h3 style="text-align:center">Replace:</h3>
  <button id="first" class="replacedWord" style="padding: 15px 15px; font-size: 14px; border-radius: 20px;">first</button>
  <button id="second" class="replacedWord" style="padding: 15px 15px; font-size: 14px; border-radius: 20px;">second</button>
  <button id="third" class="replacedWord" style="padding: 15px 15px; font-size: 14px; border-radius: 20px;">third</button>
  `;

  document.body.appendChild(modal);
  const dialog = document.querySelector("dialog");

  if (dialog === null) {
    return;
  }

  dialog.showModal();

  const closingBtn = dialog.querySelector("[id='btn-close']");

  if (closingBtn === null) {
    return;
  }
  
  closingBtn.addEventListener("click", () => {
    dialog.close();
  });

  const btns = dialog.querySelectorAll("button");
  
  const setRaplacingWords = () => {
    arrOfReplacingWords = words;
    console.log(btns, 'btns');
  
    for (let i = 0; i < btns.length; i++) {
      btns[i].innerText = arrOfReplacingWords[i];
      btns[i].onclick = function replace() {
        switch(btns[i].id) {
          case 'first':
            console.log(btns[i].innerText);
            changeWord(btns[i].innerText)
            dialog.close();
            break;
          case 'second':
            console.log(btns[i].innerText);
            changeWord(btns[i].innerText)
            dialog.close();
            break;
          case 'third':
            console.log(btns[i].innerText);
            changeWord(btns[i].innerText)
            dialog.close();
            break;
        }
      }
    }
  
  }

  setRaplacingWords();
}

const isSpace = (string: string) => {
  const regexSpace = /\s/
  return regexSpace.test(string)
}

const checkWordInString = (str: string) => {
  stringArr = str.split(' ');
  index = stringArr.findLastIndex(el => {
    return el === 'cat' || el === 'helo' || el === 'heldp'
  });
  word = stringArr[index];

  if (index >= 0) {
    switch(word) {
      case 'cat':
        showModal(['dog', 'rat', 'bat']);
        break;

      case 'helo':
        showModal(['hello', 'help', 'hell']);
        break;

      case 'heldp':
        showModal(['help', 'held', 'hello']);
        break;

      default: 
        return;
    }
  }
}

const changeWord = (newWord: string) => {
  const string = currentField.value.split(' ');
  string.pop();
  string.pop();
  string.push(newWord);
  currentField.value = string.join(' ');
}


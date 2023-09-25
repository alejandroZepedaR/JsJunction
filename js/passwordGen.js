let passwordLabel = document.getElementById("password-label");
let capsCheck = document.getElementById("caps-check");
let specialCheck = document.getElementById("spceial-check");
let numbersCheck = document.getElementById("numbers-check");
let lengthSlider = document.getElementById("password-length");
let sizeLabel = document.getElementById("size-label");

const specialCharacters =  ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '-', '+', '=', '{', '}', '[', ']', ':', ';', '<', '>', ',', '.', '?', '/'];
const alphabet = [
    "a", "b", "c", "d",
    "e", "f", "g", "h",
    "i", "j", "k", "l",
    "m", "n", "o", "p",
    "q","r","s","t","u",
    "v","w","x","y","z"
];
const numbers = ['1','2','3','4','5','6','7','8','9','0'];
let passwordLength = 8;

lengthSlider.addEventListener('input', handleSliderChange);

function handleSliderChange(event){
    passwordLength = Number(event.target.value);
    sizeLabel.innerText = event.target.value;
}

function getCharacter(characterList){
    let index = Math.floor(Math.random() * characterList.length);
    return characterList[index];

}
function randomShuffleString(inputString) {
    let charArray = inputString.split('');

    for (let i = charArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [charArray[i], charArray[j]] = [charArray[j], charArray[i]];
    }

    let shuffledString = charArray.join('');

    return shuffledString;
  }
function generatePassword(){
    let password = "";
    let allCharacters = alphabet;
    if (capsCheck.checked) {
        password += alphabet[Math.floor(Math.random() * alphabet.length)].toUpperCase();
    }
    if (specialCheck.checked) {
        password += getCharacter(specialCharacters);
        allCharacters = [...allCharacters, ...specialCharacters]
    }
    if (numbersCheck.checked) {
        password += getCharacter(numbers);
        allCharacters = [...allCharacters, ...numbers];
    }
    let length = passwordLength - password.length;

    for (let i = 0; i < length; i++){
        password += getCharacter(allCharacters);
    }

    password = randomShuffleString(password);
    
    passwordLabel.innerText = password;
}
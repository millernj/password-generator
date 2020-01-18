let letters = 'abcdefghijklmnopqrstuvwxyz';
letters += letters.toUpperCase();
const digits = '1234567890';
const symbols = ' !"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~';

const passwordArea = document.getElementById('password-area');

const passwordLengthSlider = document.getElementById('password-length-slider');
const passwordLengthOutput = document.getElementById('password-length-display');

const digitCountSlider = document.getElementById('digit-count-slider');
const digitCountOutput = document.getElementById('digit-count-display');

const symbolCountSlider = document.getElementById('symbol-count-slider');
const symbolCountOutput = document.getElementById('symbol-count-display');

const copyButton = document.getElementById('copy-button');

const generateButton = document.getElementById('generate-button');
generateButton.onclick = () => {
  generatePassword();
}

const handlePasswordLength = () => {
  const { value: symbolCount } = symbolCountSlider;
  const { value: digitCount } = digitCountSlider;
  const { value: passwordLength, min: minimumLength } = passwordLengthSlider;

  if (Number(symbolCount) + Number(digitCount) >= 8) {
    passwordLengthSlider.min = Number(symbolCount) + Number(digitCount);
  }

  if (minimumLength >= Number(passwordLength)) {
    passwordLengthSlider.value = Number(digitCountSlider.value) + Number(symbolCountSlider.value);
  }

  passwordLengthOutput.innerHTML = passwordLengthSlider.value;
}

handlePasswordLength();

// setting up sliders to update values appropriately
const sliderArray = [
  [passwordLengthSlider, passwordLengthOutput],
  [digitCountSlider, digitCountOutput],
  [symbolCountSlider, symbolCountOutput]
]

sliderArray.forEach(([slider, display]) => {
  display.innerHTML = slider.value;
  slider.oninput = () => {
    display.innerHTML = slider.value;
    handlePasswordLength();
    generatePassword();
  }
});

const getRandomStringSelection = (string, count) => {

  let selection = '';
  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor((string.length - 1) * Math.random())
    selection += string[randomIndex];
  }

  return selection;
}

const generatePassword = () => {

  const { value: passwordLength } = passwordLengthSlider;
  const { value: symbolCount } = symbolCountSlider;
  const { value: digitCount } = digitCountSlider;

  const letterCount = passwordLength - digitCount - symbolCount;

  const selectedLetters = getRandomStringSelection(letters, letterCount);
  const selectedDigits = getRandomStringSelection(digits, digitCount);
  const selectedSymbols = getRandomStringSelection(symbols, symbolCount);

  let password = selectedLetters + selectedDigits + selectedSymbols;
  password = password.split('').sort(() => 0.5 - Math.random()).join('');
  passwordArea.innerHTML = renderPassword(password);

  copyButton.onclick = () => {
    if (passwordArea.value !== 'Your secure password') {
      const tempElement = document.createElement('textarea');
      tempElement.value = password;
      document.body.appendChild(tempElement);
      tempElement.select();
      tempElement.setSelectionRange(0, 99999);
      document.execCommand('copy');
      document.body.removeChild(tempElement);
      handleTooltip();
    }
  }
}

const handleTooltip = () => {
  $('#copy-button').tooltip('show');
  setTimeout(() => {
    $('#copy-button').tooltip('hide');
  }, 1500)
}

const renderPassword = (password) => {
  let render = '';
  for (let i = 0; i < password.length; i++) {
    if (digits.includes(password[i])) {
      render += `<span class="digit">${password[i]}</span>`
    }
    if (symbols.includes(password[i])) {
      render += `<span class="symbol">${password[i]}</span>`
    }
    if (letters.includes(password[i])) {
      render += `<span class="letter">${password[i]}</span>`
    }
  }
  return `<p>${render}</p>`;
}
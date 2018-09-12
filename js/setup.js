'use strict';
var WIZARD_FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_LAST_NAMES = [' да Марья', ' Верон', ' Мирабелла', ' Вальц', ' Онопко', ' Топольницкая', ' Нионго', ' Ирвинг'];
var WIZARD_COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARD_FIREBALL_WRAP = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var WIZARD_NUMBERS = 4;

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

var similarListElement = userDialog.querySelector('.setup-similar-list');

var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

//  функция  генерации случайных данных
var getRandomAttribute = function (arr) {
  var randInt = Math.floor(Math.random() * arr.length);
  return arr[randInt];
};

//  функция создания DOM-элемента на основе JS-объекта
var getCharacters = function () {
  var wizards = [];
  for (var i = 0; i < WIZARD_NUMBERS; i++) {
    wizards.push({
      name: getRandomAttribute(WIZARD_FIRST_NAMES) + ' ' + getRandomAttribute(WIZARD_LAST_NAMES),
      coatColor: getRandomAttribute(WIZARD_COAT_COLOR),
      eyeColor: getRandomAttribute(WIZARD_EYES),
    });
  }
  return wizards;
};

var wizards = getCharacters();

//  наполнение блока по шаблону
function renderWizard(wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyeColor;

  return wizardElement;
}
//  функцию заполнения блока DOM-элементами на основе массива JS-объектов
var fragment = document.createDocumentFragment();
var appendWizards = function () {

  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }
};
appendWizards();

// вставляем fragment в setup-similar-list
similarListElement.appendChild(fragment);

userDialog.querySelector('.setup-similar').classList.remove('hidden');

// третья лекция

var setupOpen = document.querySelector('.setup-open');
var setup = document.querySelector('.setup');
var setupClose = setup.querySelector('.setup-close');

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

var offPopupEnterPress = function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
};


var inPopupEnterPress = function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
};

var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  setup.classList.add('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', offPopupEnterPress);

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', inPopupEnterPress);

var userNameInput = setup.querySelector('.setup-user-name');

userNameInput.addEventListener('invalid', function () {

  if (userNameInput.validity.tooShort) {
    userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else if (userNameInput.validity.tooLong) {
    userNameInput.setCustomValidity('Имя не должно превышать 25-ти символов');
  } else if (userNameInput.validity.valueMissing) {
    userNameInput.setCustomValidity('Обязательное поле');
  } else {
    userNameInput.setCustomValidity('');
  }
});

var setupWizard = document.querySelector('.setup-wizard');
var setupWizardAppearance = document.querySelector('.setup-wizard-appearance');


var wizardEyes = setupWizard.querySelector('.wizard-eyes');
var wizardEyesInput = setupWizardAppearance.querySelector('input[name="eyes-color"]');
wizardEyes.addEventListener('click', function () {
  wizardEyes.style.fill = getRandomAttribute(WIZARD_EYES);
  wizardEyesInput.value = getRandomAttribute(WIZARD_EYES);
});


var wizardCoat = setupWizard.querySelector('.wizard-coat');
var wizardCoatInput = setupWizardAppearance.querySelector('input[name="coat-color"]');

wizardCoat.addEventListener('click', function () {
  wizardCoat.style.fill = getRandomAttribute(WIZARD_COAT_COLOR);
  wizardCoatInput.value = getRandomAttribute(WIZARD_COAT_COLOR);
});


var wizardFireballWrap = document.querySelector('.setup-fireball-wrap');
var wizardFireballWrapInput = wizardFireballWrap.querySelector('input[name="fireball-color"]');

wizardFireballWrap.addEventListener('click', function () {
  wizardFireballWrap.style.background = getRandomAttribute(WIZARD_FIREBALL_WRAP);
  wizardFireballWrapInput.value = getRandomAttribute(WIZARD_FIREBALL_WRAP);
});

'use strict';
var WIZARD_FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_LAST_NAMES = [' да Марья', ' Верон', ' Мирабелла', ' Вальц', ' Онопко', ' Топольницкая', ' Нионго', ' Ирвинг'];
var WIZARD_COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES = ['black', 'red', 'blue', 'yellow', 'green'];

var WIZARD_NUMBERS = 4;

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

var similarListElement = userDialog.querySelector('.setup-similar-list');

var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

//  функция выбора рандомного элемента массива
function getRandomAttribute(arr) {
  var randInt = Math.floor(Math.random() * arr.length);
  return arr[randInt];
}
//  функция наполнения массива
function getCharacters() {
  var wizards = [];
  for (var i = 0; i < WIZARD_NUMBERS; i++) {
    wizards.push({
      name: getRandomAttribute(WIZARD_FIRST_NAMES) + ' ' + getRandomAttribute(WIZARD_LAST_NAMES),
      coatColor: getRandomAttribute(WIZARD_COAT_COLOR),
      eyeColor: getRandomAttribute(WIZARD_EYES),
    });
  }
  return wizards;
}

var wizards = getCharacters();

//  наполнение блока по шаблону
function renderWizard(wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyeColor;

  return wizardElement;
}
//  наполнение блока по шаблону
var fragment = document.createDocumentFragment();
for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}
// вставляем fragment в setup-similar-list
similarListElement.appendChild(fragment);

userDialog.querySelector('.setup-similar').classList.remove('hidden');

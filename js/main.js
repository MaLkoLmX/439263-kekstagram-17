'use strict';
var OBJECT_NUMBERS = 25;
var COMMENTS = ['Все отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.'];
var NAMES = ['Денис', 'Илья', 'Елена', 'Ангелина', 'Анастасия', 'Артем'];
var avatars = [];

var picture = document.querySelector('#picture').content.querySelector('.picture');
var pictures = document.querySelector('.pictures');
var fragment = document.createDocumentFragment();

function getRandomNumber(max, min) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomValue(arr) {
  return Math.floor(Math.random() * arr.length);
}

function getRandomPhoto() {
  var avatar = {
    photo: 'photos/' + getRandomNumber(1, OBJECT_NUMBERS) + '.jpg',
    comment: {
      avatar: 'img/avatar-' + getRandomNumber(1, 7) + '.svg',
      message: COMMENTS[getRandomValue(COMMENTS)],
      name: NAMES[getRandomValue(NAMES)]
    },
    like: getRandomNumber(15, 200)
  };
  return avatar;
}

for (var i = 0; i < OBJECT_NUMBERS; i++) {
  var avatar = getRandomPhoto();
  avatars.push(avatar);
}

function renderAvatar(arr) {
  for (i = 0; i < OBJECT_NUMBERS; i++) {
    var element = picture.cloneNode(true);
    element.querySelector('.picture__comments').textContent = arr[i].comment.message.length;
    element.querySelector('.picture__likes').textContent = arr[i].like;
    element.querySelector('.picture__img').src = arr[i].photo;
    fragment.appendChild(element);
  }
  return fragment;
}

pictures.appendChild(renderAvatar(avatars));

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var uploadFile = document.querySelector('#upload-file');
var uploadClose = document.querySelector('#upload-cancel');
var overlay = document.querySelector('.img-upload__overlay');
var description = overlay.querySelector('.text__description');

function onPopupEscPress(evt) {
  if (evt.keyCode === ESC_KEYCODE && !(document.activeElement === description)) {
    closeOverlay();
  }
}

function openOverlay() {
  overlay.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
}

function closeOverlay() {
  overlay.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
}

uploadFile.addEventListener('change', function () {
  openOverlay();
});

uploadClose.addEventListener('click', function () {
  closeOverlay();
});

uploadClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closeOverlay();
  }
});

var value = overlay.querySelector('input');
var imgWrapper = overlay.querySelector('img');
var uploadForm = document.querySelector('.img-upload__form');
var uploadScale = uploadForm.querySelector('.img-upload__scale');
var effectsList = uploadForm.querySelector('.effects__list');
var effectValue = uploadForm.querySelector('.effect-level__value');
var effectSlider = uploadForm.querySelector('.img-upload__effect-level');
var currentEffect = '';

function onScaleLevelClick(evt) {
  var target = evt.target;
  if (target.classList.contains('scale__control--smaller') && value.value > 0) {
    value.value = Number(value.value) - 25;
    var valueNumber = value.value * 0.01;
    imgWrapper.style.transform = 'scale(' + valueNumber + ')';
  } else if (target.classList.contains('scale__control--bigger') && value.value < 100) {
    value.value = Number(value.value) + 25;
    valueNumber = value.value * 0.01;
    imgWrapper.style.transform = 'scale(' + valueNumber + ')';
  }
}

function onEffectsChange(evt) {
  var effect = evt.target.value;
  effectValue.value = effectValue.defaultValue;
  if (currentEffect !== '') {
    imgWrapper.classList.remove(currentEffect);
  }
  if (effect !== 'none') {
    if (effectSlider.classList.contains('hidden')) {
      effectSlider.classList.remove('hidden');
    }
    currentEffect = 'effects__preview--' + effect;
    imgWrapper.classList.add(currentEffect);
  } else if (effect === 'none') {
    effectSlider.classList.add('hidden');
  }
}

var imgEffect = overlay.querySelector('.img-upload__effects');
var effectLevelPin = overlay.querySelector('.effect-level__pin');
var effectLevelDepth = overlay.querySelector('.effect-level__depth');
var checkedInput = imgEffect.querySelector('input:checked');

function getPinEffect(number) {
  var filterValue;
  switch (checkedInput.value) {
    case 'chrome':
      filterValue = 'grayscale(' + number / 100 + ')';
      break;
    case 'sepia':
      filterValue = 'sepia(' + number / 100 + ')';
      break;
    case 'marvin':
      filterValue = 'invert(' + number + '%)';
      break;
    case 'phobos':
      filterValue = 'blur(' + 3 * number / 100 + 'px)';
      break;
    case 'heat':
      filterValue = 'brightness(' + 3 * number / 100 + ')';
      break;
    default:
      imgWrapper.style.filter = 'none';
  }
  imgWrapper.style.filter = filterValue;
  effectLevelPin.style.left = number + '%';
  effectLevelDepth.style.width = number + '%';
}


uploadScale.addEventListener('click', onScaleLevelClick);
effectsList.addEventListener('change', onEffectsChange);
effectLevelPin.addEventListener('mouseup', function (evt) {
  evt.preventDefault();
  getPinEffect(60);
});

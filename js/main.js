'use strict';
var OBJECT_NUMBERS = 25;
var COMENTS = ['Все отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.'];
// var NAMES = ['Денис', 'Илья', 'Елена', 'Ангелина', 'Анастасия', 'Артем'];

var picture = document.querySelector('#picture').content.querySelector('.picture');
var pictures = document.querySelector('.pictures');
var fragment = document.createDocumentFragment();

// var avatars = [
//   {
//     avatar: 'photos/' + getRandomNumber(1, OBJECT_NUMBERS) + '.jpg',
//     message: COMENTS[getRandomValue(COMENTS)],
//     like: getRandomNumber(15, 200),
//     name: NAMES[getRandomValue(NAMES)]
//   },
//   {
//     avatar: 'photos/' + getRandomNumber(1, OBJECT_NUMBERS) + '.jpg',
//     message: COMENTS[getRandomValue(COMENTS)],
//     like: getRandomNumber(15, 200),
//     name: NAMES[getRandomValue(NAMES)]
//   },
//   {
//     avatar: 'photos/' + getRandomNumber(1, OBJECT_NUMBERS) + '.jpg',
//     message: COMENTS[getRandomValue(COMENTS)],
//     like: getRandomNumber(15, 200),
//     name: NAMES[getRandomValue(NAMES)]
//   },
//   {
//     avatar: 'photos/' + getRandomNumber(1, OBJECT_NUMBERS) + '.jpg',
//     message: COMENTS[getRandomValue(COMENTS)],
//     like: getRandomNumber(15, 200),
//     name: NAMES[getRandomValue(NAMES)]
//   },
//   {
//     avatar: 'photos/' + getRandomNumber(1, OBJECT_NUMBERS) + '.jpg',
//     message: COMENTS[getRandomValue(COMENTS)],
//     like: getRandomNumber(15, 200),
//     name: NAMES[getRandomValue(NAMES)]
//   },
//   {
//     avatar: 'photos/' + getRandomNumber(1, OBJECT_NUMBERS) + '.jpg',
//     message: COMENTS[getRandomValue(COMENTS)],
//     like: getRandomNumber(15, 200),
//     name: NAMES[getRandomValue(NAMES)]
//   }
// ];

function getRandomNumber(max, min) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomValue(arr) {
  return Math.floor(Math.random() * arr.length);
}

function renderAvatar() {
  var element = picture.cloneNode(true);
  element.querySelector('.picture__comments').textContent = COMENTS[getRandomValue(COMENTS)];
  element.querySelector('.picture__likes').textContent = getRandomNumber(15, 200);
  element.querySelector('.picture__img').src = 'photos/' + getRandomNumber(1, OBJECT_NUMBERS) + '.jpg';
  return element;
}

for (var i = 0; i < OBJECT_NUMBERS; i++) {
  fragment.appendChild(renderAvatar());
}
pictures.appendChild(fragment);

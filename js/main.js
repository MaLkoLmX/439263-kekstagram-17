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

// for (var i = 0; i < OBJECT_NUMBERS; i++) {
//   var avatar = getRandomPhoto();
//   avatars.push(avatar);
// }

function renderAvatar() {
  for (var i = 0; i < OBJECT_NUMBERS; i++) {
    var avatar = getRandomPhoto();
    var element = picture.cloneNode(true);
    avatars.push(avatar);

    element.querySelector('.picture__comments').textContent = avatars[i].comment.message.length;
    element.querySelector('.picture__likes').textContent = avatars[i].like;
    element.querySelector('.picture__img').src = avatars[i].photo;
    fragment.appendChild(element);
  }
  // var element = picture.cloneNode(true);
  // element.querySelector('.picture__comments').textContent = avatars[i].comment.message.length;
  // element.querySelector('.picture__likes').textContent = avatars[i].like;
  // element.querySelector('.picture__img').src = avatars[i].photo;
  //
  // for (i = 0; i < OBJECT_NUMBERS; i++) {
  //   fragment.appendChild(element);
  // }

  return fragment;
}

pictures.appendChild(renderAvatar());

// for (i = 0; i < OBJECT_NUMBERS; i++) {
//   fragment.appendChild(renderAvatar(avatars));
// }
// pictures.appendChild(fragment);

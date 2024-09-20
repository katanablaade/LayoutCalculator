'use strict';

let title;
let screens;
let screenPrice;
let adaptive;

let rollback = 25;
let fullPrice;
let servicePercentPrice;
let allServicePrices;
let service1;
let service2;

const isNumber = function (num) {
  return String(parseFloat(num)) === String(num) && isFinite(num);
};

const asking = function () {
  title = prompt('Как называется ваш проект?', 'Калькулятор верстки');
  screens = prompt(
    'Какие типы экранов нужно разработать?',
    'Простые, Сложные, Интерактивные'
  );
  do {
    screenPrice = prompt('Сколько будет стоить данная работа?');
  } while (!isNumber(screenPrice));

  adaptive = confirm('Нужен ли адаптив на сайте?');
};

const showTypeOf = function (variable) {
  console.log(variable, typeof variable);
};

const getAllServicePrices = function () {
  let sum = 0;
  for (let i = 0; i < 2; i++) {
    if (i === 0) {
      service1 = prompt('Какой дополнительный тип услуги нужен?');
    } else if (i === 1) {
      service2 = prompt('Какой дополнительный тип услуги нужен?');
    }
    do {
      allServicePrices = prompt('Сколько это будет стоить?');
    } while (!isNumber(allServicePrices));

    sum += +allServicePrices;
  }
  return sum;
};

function getFullPrice() {
  return +screenPrice + allServicePrices;
}

const getTitle = function () {
  title = title.trim();
  const firstChar = title.charAt(0).toUpperCase();
  const otherChar = title.slice(1).toLowerCase();
  title = firstChar + otherChar;
  return title;
};

const getServicePercentPrices = function () {
  return Math.ceil(fullPrice - rollback);
};

const getRollBackMessage = function (price) {
  if (price >= 30000) {
    return 'Даем скидку в 10%';
  } else if (price >= 15000 && price < 30000) {
    return 'Даем скидку 5%';
  } else if (price >= 0 && price < 15000) {
    return 'Скидка не предусмотрена';
  } else if (price < 0) {
    return 'Что-то пошло не так';
  }
};

asking();
allServicePrices = getAllServicePrices();
fullPrice = getFullPrice();
title = getTitle();
servicePercentPrice = getServicePercentPrices();

console.log('allServicePrices', allServicePrices);

showTypeOf(title);
showTypeOf(fullPrice);
showTypeOf(adaptive);

console.log(screens);
console.log(getRollBackMessage(fullPrice));
console.log(getServicePercentPrices());

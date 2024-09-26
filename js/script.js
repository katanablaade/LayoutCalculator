'use strict';
const titleCalc = document.getElementsByTagName('h1')[0];
const handlerBtnStart = document.getElementsByClassName('handler_btn')[0];
const handlerBtnReset = document.getElementsByClassName('handler_btn')[1];
const plusBtn = document.querySelector('.screen-btn');
const itemsPercent = document.querySelectorAll('.other-items.percent');
const itemsNumber = document.querySelectorAll('.other-items.number');
const input = document.querySelector('.rollback input[type="range"]');
const span = document.querySelector('.rollback span.range-value');
const total = document.getElementsByClassName('total-input')[0];
const totalCount = document.getElementsByClassName('total-input')[1];
const totalCountOther = document.getElementsByClassName('total-input')[2];
const totalFullCount = document.getElementsByClassName('total-input')[3];
const totalCountRollback = document.getElementsByClassName('total-input')[4];
const screenSearch = document.querySelectorAll('.screen');

const appData = {
  title: '',
  screens: [],
  screenPrice: 0,
  adaptive: true,
  rollback: 25,
  fullPrice: 0,
  servicePercentPrice: 0,
  allServicePrices: 0,
  services: {},

  start: function () {
    appData.asking();
    appData.addPrices();
    appData.getTitle();
    appData.getFullPrice();
    appData.getServicePercentPrices();

    appData.logger();
  },

  isNumber: function (num) {
    return String(parseFloat(num)) === String(num) && isFinite(num);
  },
  isString: function (num) {
    return isNaN(num);
  },

  asking: function () {
    do {
      appData.title = prompt(
        'Как называется ваш проект?',
        'Калькулятор верстки'
      );
    } while (!appData.isString(appData.title));

    for (let i = 0; i < 2; i++) {
      let name;
      let price = 0;

      do {
        name = prompt('Какие типы экранов нужно разработать?');
      } while (!appData.isString(name));

      do {
        price = prompt('Сколько будет стоить данная работа?');
      } while (!appData.isNumber(price));

      appData.screens.push({ id: i, name: name, price: price });
    }

    for (let i = 0; i < 2; i++) {
      let name;
      let price = 0;

      do {
        name = prompt('Какой дополнительный тип услуги нужен?');
      } while (!appData.isString(name));

      do {
        price = prompt('Сколько это будет стоить?');
      } while (!appData.isNumber(price));

      appData.services[name + i] = +price;
    }

    appData.adaptive = confirm('Нужен ли адаптив на сайте?');
  },

  addPrices: function () {
    appData.screenPrice = appData.screens.reduce(function (acc, item) {
      return acc + Number(item.price);
    }, 0);

    for (let key in appData.services) {
      appData.allServicePrices += appData.services[key];
    }
  },

  getFullPrice: function () {
    appData.fullPrice = +appData.screenPrice + appData.allServicePrices;
  },

  getTitle: function () {
    appData.title = appData.title.trim();
    const firstChar = appData.title.charAt(0).toUpperCase();
    const otherChar = appData.title.slice(1).toLowerCase();
    appData.title = firstChar + otherChar;
    return appData.title;
  },

  getServicePercentPrices: function () {
    appData.servicePercentPrice = Math.ceil(
      appData.fullPrice - appData.rollback
    );
  },

  getRollBackMessage: function (price) {
    if (price >= 30000) {
      return 'Даем скидку в 10%';
    } else if (price >= 15000 && price < 30000) {
      return 'Даем скидку 5%';
    } else if (price >= 0 && price < 15000) {
      return 'Скидка не предусмотрена';
    } else if (price < 0) {
      return 'Что-то пошло не так';
    }
  },
  logger: function () {
    for (let key in appData) {
      console.log(key + ' ' + appData[key]);
    }
    console.log(appData.screens);
  },
};

appData.start();

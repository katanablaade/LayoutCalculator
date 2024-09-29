'use strict';
const titleCalc = document.getElementsByTagName('h1')[0];
const handlerBtnStart = document.getElementsByClassName('handler_btn')[0];

const handlerBtnReset = document.getElementsByClassName('handler_btn')[1];

const plusBtn = document.querySelector('.screen-btn');

const itemsPercent = document.querySelectorAll('.other-items.percent');
const itemsNumber = document.querySelectorAll('.other-items.number');

const inputRange = document.querySelector('.rollback input[type="range"]');
const spanRange = document.querySelector('.rollback span.range-value');

const inputSelect = document.querySelectorAll('.screen input[type = text]');
const viewsSelect = document.querySelectorAll('.screen select');

const total = document.getElementsByClassName('total-input')[0];
const totalCount = document.getElementsByClassName('total-input')[1];
const totalCountOther = document.getElementsByClassName('total-input')[2];
const totalFullCount = document.getElementsByClassName('total-input')[3];
const totalCountRollback = document.getElementsByClassName('total-input')[4];

let screenSearch = document.querySelectorAll('.screen');

const appData = {
  title: '',
  screens: [],
  screenPrice: 0,
  adaptive: true,
  rollback: 0,
  fullPrice: 0,
  servicePercentPrice: 0,
  servicePricesPercent: 0,
  servicePricesNumber: 0,
  servicesPercent: {},
  servicesNumber: {},
  countScreens: 0,

  checkField: function () {
    screenSearch = document.querySelectorAll('.screen');
    appData.isError = false;

    screenSearch.forEach(function (screen) {
      const select = screen.querySelector('select');
      const input = screen.querySelector('input');

      if (select.value === '' || input.value === '') {
        appData.isError = true;
      }
    });
    if (!appData.isError) {
      appData.start();
    }
  },

  init: function () {
    appData.addTitle();
    appData.checkField();
    handlerBtnStart.addEventListener('click', appData.checkField);
    plusBtn.addEventListener('click', appData.addScreenBlock);
    inputRange.addEventListener('input', appData.getRollback);
  },

  getRollback: function (event) {
    spanRange.textContent = event.target.value + '%';
    appData.rollback = event.target.value;

    if (appData.fullPrice > 0) {
      appData.servicePercentPrice = Math.ceil(
        appData.fullPrice - appData.fullPrice * (appData.rollback / 100)
      );
      totalCountRollback.value = appData.servicePercentPrice;
      console.log(appData.servicePercentPrice);
    }
  },

  addTitle: function () {
    document.title = titleCalc.textContent;
  },

  start: function () {
    console.log('start');
    appData.addScreens();
    appData.addServices();
    appData.addPrices();
    appData.logger();
    appData.showResult();
  },

  showResult: function () {
    total.value = appData.screenPrice;
    totalCountOther.value =
      appData.servicePricesPercent + appData.servicePricesNumber;
    totalFullCount.value = appData.fullPrice;
    totalCountRollback.value = appData.servicePercentPrice;
    totalCount.value = appData.countScreens;
  },

  isString: function (num) {
    return isNaN(num);
  },

  addScreens: function () {
    screenSearch = document.querySelectorAll('.screen');

    screenSearch.forEach(function (screen, index) {
      const select = screen.querySelector('select');
      const input = screen.querySelector('input');
      const selectName = select.options[select.selectedIndex].textContent;

      appData.screens.push({
        id: index,
        name: selectName,
        price: +select.value * +input.value,
        count: +input.value,
      });
    });
    console.log(appData.screens);
  },
  addServices: function () {
    itemsPercent.forEach(function (item) {
      const check = item.querySelector('input[type=checkbox]');
      const label = item.querySelector('label');
      const input = item.querySelector('input[type=text]');

      if (check.checked) {
        appData.servicesPercent[label.textContent] = +input.value;
      }
    });

    itemsNumber.forEach(function (item) {
      const check = item.querySelector('input[type=checkbox]');
      const label = item.querySelector('label');
      const input = item.querySelector('input[type=text]');

      if (check.checked) {
        appData.servicesNumber[label.textContent] = +input.value;
      }
    });
  },

  addScreenBlock: function () {
    let cloneScreen = screenSearch[0].cloneNode(true);
    screenSearch[screenSearch.length - 1].after(cloneScreen);
  },

  addPrices: function () {
    appData.screenPrice = appData.screens.reduce(function (acc, item) {
      return acc + Number(item.price);
    }, 0);

    for (let key in appData.servicesNumber) {
      appData.servicePricesNumber += appData.servicesNumber[key];
    }

    for (let key in appData.servicesPercent) {
      appData.servicePricesPercent +=
        appData.screenPrice * (appData.servicesPercent[key] / 100);
    }
    appData.fullPrice =
      +appData.screenPrice +
      appData.servicePricesPercent +
      appData.servicePricesNumber;

    appData.servicePercentPrice =
      appData.fullPrice - appData.fullPrice * (appData.rollback / 100);

    appData.countScreens = appData.screens.reduce(function (acc, item) {
      return acc + +item.count;
    }, 0);
  },

  logger: function () {
    // for (let key in appData) {
    //   console.log(key + ' ' + appData[key]);
    // }
    console.log(appData.screens);
  },
};

appData.init();

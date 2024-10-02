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

const cmsCheckBox = document.querySelector('#cms-open');
const cmsVariants = document.querySelector('.hidden-cms-variants');
const otherInput = document.querySelector(
  '.hidden-cms-variants .main-controls__input'
);
const cmsOtherInput = document.querySelector('#cms-other-input');

const optionOther = document.querySelector(
  '.hidden-cms-variants #cms-select option[value = other]'
);
const optionWordPress = document.querySelector(
  '.hidden-cms-variants #cms-select option[value = "50"]'
);
const customCheckBox = document.querySelectorAll('.custom-checkbox');

const cmsSelect = document.querySelector('.hidden-cms-variants #cms-select ');
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
  wordPress: 1,
  other: 0,

  init: function () {
    this.addTitle();
    handlerBtnStart.addEventListener('click', () => {
      this.checkField();
    });
    handlerBtnReset.addEventListener('click', this.reset.bind(appData));
    plusBtn.addEventListener('click', this.addScreenBlock);
    inputRange.addEventListener('input', this.getRollback.bind(appData));
    cmsCheckBox.addEventListener('change', this.cmsOpen.bind(appData));
    cmsVariants.addEventListener('change', this.otherOpen.bind(appData));
  },

  reset: function () {
    appData.removeScreens();
    appData.removeValue();
  },

  checkField: function () {
    screenSearch = document.querySelectorAll('.screen');
    this.isError = false;
    screenSearch.forEach((screen) => {
      const select = screen.querySelector('select');
      const input = screen.querySelector('input');

      if (select.value === '' || input.value === '') {
        this.isError = true;
      }
    });

    if (!this.isError) {
      screenSearch.forEach((item) => {
        const select = item.querySelector('select');
        const input = item.querySelector('input');
        input.disabled = true;
        select.disabled = true;
      });

      this.start();
      handlerBtnStart.style.display = 'none';
      handlerBtnReset.style.display = 'block';
    }
  },

  removeScreens: function () {
    const totalInput = document.querySelectorAll('.total-input');
    screenSearch.forEach((item, index) => {
      if (index !== 0) {
        item.remove();
      }
    });

    totalInput.forEach((item) => {
      item.value = 0;
    });
  },

  removeValue: function () {
    const select = document.querySelector('select');
    const input = document.querySelector('input');

    this.other = 0;
    this.wordPress = 1;
    this.title = '';
    this.screens = [];
    this.adaptive = true;
    this.servicesPercent = {};
    this.servicesNumber = {};
    this.screenPrice = 0;
    this.rollback = 0;
    this.fullPrice = 0;
    this.servicePercentPrice = 0;
    this.servicePricesPercent = 0;
    this.servicePricesNumber = 0;
    this.countScreens = 0;

    handlerBtnStart.style.display = 'block';
    handlerBtnReset.style.display = 'none';
    cmsVariants.style.display = 'none';
    otherInput.style.display = 'none';
    input.value = '';
    select.value = '';
    cmsOtherInput.value = '';

    customCheckBox.forEach((item) => {
      item.checked = false;
    });
    spanRange.textContent = 0 + '%';
    cmsSelect.selectedIndex = 0;
    inputRange.value = 0;
    input.disabled = false;
    select.disabled = false;
  },

  cmsOpen: function () {
    if (cmsCheckBox.checked) {
      cmsVariants.style.display = 'flex';
    } else {
      cmsVariants.style.display = 'none';
      this.wordPress = 1;
    }
  },

  otherOpen: function () {
    if (optionOther.selected) {
      otherInput.style.display = 'block';
      this.wordPress = 1;
      this.other = this.other + +cmsOtherInput.value;
    } else if (optionWordPress.selected) {
      otherInput.style.display = 'none';
      this.wordPress = 1.5;
      this.other = 0;
    } else {
      otherInput.style.display = 'none';
      this.wordPress = 1;
      this.other = 0;
    }
  },

  getRollback: function (event) {
    spanRange.textContent = event.target.value + '%';
    this.rollback = event.target.value;

    if (this.fullPrice > 0) {
      this.servicePercentPrice = Math.ceil(
        this.fullPrice - this.fullPrice * (this.rollback / 100)
      );
      totalCountRollback.value = this.servicePercentPrice;
    }
  },

  addTitle: function () {
    document.title = titleCalc.textContent;
  },

  start: function () {
    console.log('start');
    this.addScreens();
    this.addServices();
    this.addPrices();
    this.logger();
    this.showResult();
  },

  showResult: function () {
    total.value = this.screenPrice;
    totalCountOther.value =
      this.servicePricesPercent + this.servicePricesNumber;
    totalFullCount.value = this.fullPrice;
    totalCountRollback.value = this.servicePercentPrice;
    totalCount.value = this.countScreens;
  },

  isString: function (num) {
    return isNaN(num);
  },

  addScreens: function () {
    screenSearch = document.querySelectorAll('.screen');

    screenSearch.forEach((screen, index) => {
      const select = screen.querySelector('select');
      const input = screen.querySelector('input');
      const selectName = select.options[select.selectedIndex].textContent;

      this.screens.push({
        id: index,
        name: selectName,
        price: +select.value * +input.value,
        count: +input.value,
      });
    });
  },

  addServices: function () {
    itemsPercent.forEach((item) => {
      const check = item.querySelector('input[type=checkbox]');
      const label = item.querySelector('label');
      const input = item.querySelector('input[type=text]');

      if (check.checked) {
        this.servicesPercent[label.textContent] = +input.value;
      }
    });

    itemsNumber.forEach((item) => {
      const check = item.querySelector('input[type=checkbox]');
      const label = item.querySelector('label');
      const input = item.querySelector('input[type=text]');

      if (check.checked) {
        this.servicesNumber[label.textContent] = +input.value;
      }
    });
  },

  addScreenBlock: function () {
    screenSearch = document.querySelectorAll('.screen');
    let cloneScreen = screenSearch[0].cloneNode(true);
    screenSearch[screenSearch.length - 1].after(cloneScreen);
  },

  addPrices: function () {
    this.screenPrice = this.screens.reduce((acc, item) => {
      return acc + Number(item.price);
    }, 0);

    for (let key in this.servicesNumber) {
      this.servicePricesNumber += this.servicesNumber[key];
    }

    for (let key in this.servicesPercent) {
      this.servicePricesPercent +=
        this.screenPrice * (this.servicesPercent[key] / 100);
    }
    this.fullPrice = Math.ceil(
      (+this.screenPrice +
        this.servicePricesPercent +
        this.servicePricesNumber) *
        (1 + this.other / 100) *
        this.wordPress
    );
    this.servicePercentPrice =
      this.fullPrice - this.fullPrice * (this.rollback / 100);

    this.countScreens = this.screens.reduce((acc, item) => {
      return acc + +item.count;
    }, 0);
  },

  logger: function () {
    // for (let key in appData) {
    //   console.log(key + ' ' + appData[key]);
    // }
  },
};

appData.init();

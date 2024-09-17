"use strict";

let title = prompt("Как называется ваш проект?");
let screens = prompt(
  "Какие типы экранов нужно разработать?",
  "Простые, Сложные, Интерактивные"
);
let screenPrice = +prompt("Сколько будет стоить данная работа?", 1200);
let rollback = 25;
let adaptive = confirm("Нужен ли адаптив на сайте?");
let service1 = prompt("Какой дополнительный тип услуги нужен?");
let servicePrice1 = +prompt("Сколько это будет стоить?");
let service2 = prompt("Какой дополнительный тип услуги нужен?");
let servicePrice2 = +prompt("Сколько это будет стоить?");
let fullPrice;
let servicePercentPrice;
let allServicePrices;

const showTypeOf = function (variable) {
  console.log(variable, typeof variable);
};

const getAllServicePrices = function () {
  allServicePrices = servicePrice1 + servicePrice2;
  return allServicePrices;
};

function getFullPrice() {
  fullPrice = screenPrice + allServicePrices;
  return fullPrice;
}

const getTitle = function () {
  title = title.trim();
  const firstChar = title.charAt(0).toUpperCase();
  const otherChar = title.slice(1).toLowerCase();
  title = firstChar + otherChar;
  return title;
};

const getServicePercentPrices = function () {
  servicePercentPrice = Math.ceil(fullPrice - rollback);
  return servicePercentPrice;
};

const getRollBackMessage = function (price) {
  if (price >= 30000) {
    return "Даем скидку в 10%";
  } else if (price >= 15000 && price < 30000) {
    return "Даем скидку 5%";
  } else if (price >= 0 && price < 15000) {
    return "Скидка не предусмотрена";
  } else if (price < 0) {
    return "Что-то пошло не так";
  }
};

getAllServicePrices();
getFullPrice();
getTitle();
getServicePercentPrices();
showTypeOf(title);
showTypeOf(fullPrice);
showTypeOf(adaptive);

console.log(screens);
console.log(getRollBackMessage(fullPrice));
console.log(getServicePercentPrices());

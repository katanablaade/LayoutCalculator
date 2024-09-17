"use strict";

let title = prompt("Как называется ваш проект?");
let screens = prompt(
  "Какие типы экранов нужно разработать?",
  "Простые, Сложные, Интерактивные"
);
let screenPrice = +prompt("Сколько будет стоить данная работа?", 1200);
let rollback = 25;
let adaptive = confirm("Нужен ли адаптив на сайте?", "Да/Нет");
let service1 = prompt("Какой дополнительный тип услуги нужен?");
let sevucePrice1 = +prompt("Сколько это будет стоить?");
let service2 = prompt("Какой дополнительный тип услуги нужен?");
let sevucePrice2 = +prompt("Сколько это будет стоить?");
let fullPrice = screenPrice + sevucePrice1 + sevucePrice2;
let servicePercentPrice = Math.ceil(fullPrice - rollback);

// 1 вариант
if (fullPrice >= 30000) {
  console.log("Даем скидку в 10%");
} else if (fullPrice >= 15000 && fullPrice < 30000) {
  console.log("Даем скидку 5%");
} else if (fullPrice >= 0 && fullPrice < 15000) {
  console.log("Скидка не предусмотрена");
} else if (fullPrice < 0) {
  console.log("Что-то пошло не так");
}

// 2 вариант
switch (true) {
  case fullPrice >= 30000:
    console.log("Даем скидку в 10%");
    break;
  case fullPrice >= 15000 && fullPrice < 30000:
    console.log("Даем скидку 5%");
    break;
  case fullPrice >= 0 && fullPrice < 15000:
    console.log("Скидка не предусмотрена");
    break;
  case fullPrice < 0:
    console.log("Что-то пошло не так");
    break;
}

console.log(typeof title);
console.log(typeof fullPrice);
console.log(typeof adaptive);

console.log(screens.length);

console.log("Стоимость верстки экранов " + screenPrice + "$");
console.log("Стоимость разработки сайта " + fullPrice + "$");

console.log(screens.toLocaleLowerCase().split(", "));

console.log(fullPrice * (rollback / 100));

console.log(title);
console.log(screens);
console.log(screenPrice);
console.log(adaptive);

console.log(service1);
console.log(sevucePrice1);
console.log(service2);
console.log(sevucePrice2);
console.log(fullPrice);
console.log(servicePercentPrice);

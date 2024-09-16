"use strict";

let title = "projectJS";
let screens = "Простые, Сложные, Интерактивные";
let screenPrice = 52;
const rollback = 25;
let fullPrice = 10000;
let adaptive = true;

console.log(typeof title);
console.log(typeof fullPrice);
console.log(typeof adaptive);

console.log(screens.length);

console.log("Стоимость верстки экранов " + screenPrice + "$");
console.log("Стоимость разработки сайта " + fullPrice + "$");

console.log(screens.toLocaleLowerCase().split(", "));

console.log(fullPrice * (rollback / 100));

title = prompt("Как называется ваш проект?");
console.log(title);

screens = prompt(
  "Какие типы экранов нужно разработать?",
  "Простые, Сложные, Интерактивные"
);
console.log(screens);

screenPrice = +prompt("Сколько будет стоить данная работа?", 1200);
console.log(screenPrice);

adaptive = !!prompt("Нужен ли адаптив на сайте?", "Да/Нет");
if (adaptive == "Да") {
  console.log(true);
} else if (adaptive == "да") {
  console.log(true);
} else {
  console.log(false);
}

let service1 = prompt("Какой дополнительный тип услуги нужен?");
console.log(service1);
let sevucePrice1 = +prompt("Сколько это будет стоить?");
console.log(sevucePrice1);
let service2 = prompt("Какой дополнительный тип услуги нужен?");
console.log(service2);
let sevucePrice2 = +prompt("Сколько это будет стоить?");
console.log(sevucePrice2);

fullPrice = screenPrice + sevucePrice1 + sevucePrice2;
console.log(fullPrice);

let servicePercentPrice = Math.ceil(fullPrice - rollback);
console.log(servicePercentPrice);

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

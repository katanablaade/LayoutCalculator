const title = "projectJS";
const screens = "Простые, Сложные, Интерактивные";
const screenPrice = 52;
const rollback = 25;
const fullPrice = 10000;
const adaptive = true;

console.log(typeof title);
console.log(typeof fullPrice);
console.log(typeof adaptive);

console.log(screens.length);

console.log("Стоимость верстки экранов " + screenPrice + "$");
console.log("Стоимость разработки сайта " + fullPrice + "$");

console.log(screens.toLocaleLowerCase().split(", "));

console.log(fullPrice * (rollback / 100));

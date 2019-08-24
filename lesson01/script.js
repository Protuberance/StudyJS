const money = 100000,
    income = 'freelance',
    addExpenses = 'Cinema, Travels, Extreme Activities',
    deposit = true,
    mission = 5000000,
    period = 10;

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);

console.log(income.length);

console.log('Период ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' рублей');

addExpenses.split(', ').forEach(expense => {
    console.log(expense.toLocaleLowerCase());
});
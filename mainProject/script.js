'use strict'

let money,
    income,
    addExpenses,
    deposit,
    mission = 5000000,
    period;

money = prompt('Ваш месячный доход?');

let succes = false;
while (!succes) {
    let response = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
    if (response != null) {
        addExpenses = response.split(', ');
        addExpenses.forEach(element => {
            console.log(element);
        });
        console.log(addExpenses);
        succes = true;
    } else
        alert('необходимо ввести данные');

}

deposit = confirm('Есть ли у вас депозит в банке?');

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);

let monthlyExpenseName1 = prompt('Какие обязательные ежемесячные расходы у вас есть?');
let monthlyExpenseValue1 = +prompt('Во сколько это обойдется?');
let monthlyExpenseName2 = prompt('Какие обязательные ежемесячные расходы у вас есть?');
let monthlyExpenseValue2 = +prompt('Во сколько это обойдется?');

console.log(monthlyExpenseName1);
console.log(monthlyExpenseValue1);
console.log(typeof monthlyExpenseValue1);

let budgetMonth = money - (monthlyExpenseValue1 === NaN ? 0 : monthlyExpenseValue1) - (monthlyExpenseValue2 === NaN ? 0 : monthlyExpenseValue2);
console.log(budgetMonth);

period = Math.ceil(mission / budgetMonth);
console.log('Вы накопите ' + mission + ' за ' + period + ' месяцев');

let budgetDay = Math.floor(budgetMonth / 30);
console.log(budgetDay);

if (budgetDay >= 800)
    console.log('Высокий уровень дохода');
else if (budgetDay >= 300 && budgetDay < 800)
    console.log('Средний уровень дохода');
else if (budgetDay > 0 && budgetDay < 300)
    console.log('Низкий уровень дохода');
else if (budgetDay <= 0)
    console.log('Что то пошло не так');
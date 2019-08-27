'use strict'

let money,
    income = 'freelance',
    addExpenses,
    deposit,
    mission = 5000000,
    period,
    accumulatedMonth;

money = prompt('Ваш месячный доход?', 300000);

let succes = false;
while (!succes) {
    let response = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'clothes', 'cinema');
    if (response != null) {
        addExpenses = response.split(', ');
        succes = true;
    } else
        alert('необходимо ввести данные');

}

deposit = confirm('Есть ли у вас депозит в банке?');

const showTypeof  = function(data){
console.log(data, typeof data);
}

showTypeof(money);
showTypeof(income);
showTypeof(deposit);

let monthlyExpenseName1 = prompt('Какие обязательные ежемесячные расходы у вас есть?', 'flat rent'),
    monthlyExpenseValue1 = +prompt('Во сколько это обойдется?', 35000),
    monthlyExpenseName2 = prompt('Какие обязательные ежемесячные расходы у вас есть?', 'iiieeeyhhaaaa'),
    monthlyExpenseValue2 = +prompt('Во сколько это обойдется?', 60000);

let budgetMonth = money - (monthlyExpenseValue1 === NaN ? 0 : monthlyExpenseValue1) - (monthlyExpenseValue2 === NaN ? 0 : monthlyExpenseValue2);
period = Math.ceil(mission / budgetMonth);

let budgetDay = Math.floor(budgetMonth / 30);

const getStatusIncome = function () {
    if (budgetDay >= 800)
        console.log('Высокий уровень дохода');
    else if (budgetDay >= 300 && budgetDay < 800)
        console.log('Средний уровень дохода');
    else if (budgetDay > 0 && budgetDay < 300)
        console.log('Низкий уровень дохода');
    else if (budgetDay <= 0)
        console.log('Что то пошло не так');
}

getStatusIncome();

const getExpensesMonth = function () {
    return (monthlyExpenseValue1 === NaN ? 0 : monthlyExpenseValue1) + (monthlyExpenseValue2 === NaN ? 0 : monthlyExpenseValue2);
}
//console.log("Сумма всех обязательных расходов за месяц равна " + getExpensesMonth());

const getAccumulatedMonth = function () {
    return money - getExpensesMonth();
}
accumulatedMonth = getAccumulatedMonth();
console.log("Сумма ваших накоплений за месяц равна " + accumulatedMonth);

const getTargetMonth = function () {
    return Math.floor(mission / accumulatedMonth);
}
console.log('Вы накопите ' + mission + ' за ' + getTargetMonth() + ' месяцев')
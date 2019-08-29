'use strict'

let money,
    income = 'freelance',
    addExpenses,
    deposit,
    mission = 5000000,
    period,
    accumulatedMonth;

let start = function () {
    do {
        money = prompt('Ваш месячный доход?', 300000);
    }
    while (money === null || money === '' || isNaN(money))
}
start();
let succes = false;
while (!succes) {
    let response = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'clothes', 'cinema');
    if (!IsNotOrEmpty(response)) {
        addExpenses = response.split(', ');
        succes = true;
    } else
        alert('необходимо ввести данные');

}

deposit = confirm('Есть ли у вас депозит в банке?');

const showTypeof = function (data) {
    console.log(data, typeof data);
}

showTypeof(money);
showTypeof(income);
showTypeof(deposit);

let monthlyExpenseName1,
    monthlyExpenseName2;

const getExpensesMonth = function () {
    let sum = 0,
        counter;

    for (let i = 0; i < 2; i++) {
        if (i === 0) {
            monthlyExpenseName1 = prompt('Какие обязательные ежемесячные расходы у вас есть?', 'iiieeeyhhaaaa');
        }
        if (i === 1) {
            monthlyExpenseName2 = prompt('Какие обязательные ежемесячные расходы у вас есть?', 'Flat rent');
        }
        do
            counter = prompt('Во сколько это обойдется?', 35000);
        while (IsNotNumber(counter))
        sum += +counter;
    }
    return sum;
}
let expensesAmout = getExpensesMonth();


let budgetMonth = money - expensesAmout;
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

const getAccumulatedMonth = function () {
    return money - expensesAmout;
}
accumulatedMonth = getAccumulatedMonth();
getStatusIncome();
console.log("Сумма ваших накоплений за месяц равна " + accumulatedMonth);

const getTargetMonth = function () {
    let result = Math.floor(mission / accumulatedMonth);
    if (result < 0) {
        return 'Цель не будет достигнута';
    } else
        return 'Вы накопите ' + mission + ' за ' + result + ' месяцев';
}
console.log(getTargetMonth());

function IsNotOrEmpty(str) {
    if (str === '' || str === null || str === undefined)
        return true;
    else return false;
}

function IsNotNumber(isNumber) {
    if (isNumber === null || isNaN(isNumber))
        return true;
    else return false;

}
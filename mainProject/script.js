'use strict'

let money,
    start = function () {
        do {
            money = prompt('Ваш месячный доход?', 300000);
        }
        while (money === null || money === '' || isNaN(money))
    }
start();

let appData = {
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    income: {},
    addIncome: [],
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    mission: 5000000,
    period: 5,
    expenses: {},
    asking: function () {
        if (confirm('Есть ли у вас дополнительный заработок?')) {
            let itemIncome,
                cashIncome;
            do {
                itemIncome = prompt('Какой у вас есть дополнительный заработок',
                    'Такси');
                cashIncome = prompt('Сколько вы зарабатываете?',
                    '10000');
            }
            while (IsNotOrEmpty(itemIncome) || IsZeroOrNotNumber(cashIncome));
            this.income[itemIncome] = cashIncome;
        }
        let succes = false;
        while (!succes) {
            let response = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'clothes\, cinema');
            if (response !== '' && response !== null && response !== undefined) {
                appData.addExpenses = response.split(', ');
                succes = true;
            } else
                alert('необходимо ввести данные');
        }
        appData.deposit = confirm('Есть ли у вас депозит в банке?');

        let expenseValue,
            expensesName;
        for (let i = 0; i < 2; i++) {
            do {
                expensesName = prompt('Какие обязательные ежемесячные расходы у вас есть?', 'iiieeeyhhaaaa');
                expenseValue = +prompt('Во сколько это обойдется?', 35000);
                console.log(expenseValue);
            }
            while (IsZeroOrNotNumber(expenseValue) || IsNotOrEmpty(expensesName))
            this.expenses[expensesName] = expenseValue;
        }
    },
    getExpensesMonth: function () {
        for (let key in this.expenses) {
            this.expensesMonth += +this.expenses[key];
        }
    },
    getBudget: function () {
        this.budgetMonth = this.budget - this.expensesMonth;
        this.budgetDay = Math.floor(this.budgetMonth / 30);
    },
    getTargetMonth: function () {
        this.period = Math.floor(this.mission / this.budgetMonth);
        if (this.period < 0) {
            return 'Цель не будет достигнута';
        } else
            return 'Вы накопите ' + this.mission + ' за ' + this.period + ' месяцев';
    },
    getStatusIncome: function () {
        if (this.budgetDay >= 800)
            console.log('Высокий уровень дохода');
        else if (this.budgetDay >= 300 && this.budgetDay < 800)
            console.log('Средний уровень дохода');
        else if (this.budgetDay > 0 && this.budgetDay < 300)
            console.log('Низкий уровень дохода');
        else if (this.budgetDay <= 0)
            console.log('Что то пошло не так');
    },
    getInfoDepost: function () {
        if (this.deposit) {
            do {
                this.percentDeposit = prompt('Какой годовой процент?', '10');
                this.moneyDeposit = prompt('Какая сумма заложена?', '10000');
            }
            while (IsZeroOrNotNumber(this.percentDeposit) || IsZeroOrNotNumber(this.moneyDeposit))
        }
    },
    calcSavedMoney: function () {
        return this.budgetMonth * this.period;
    }
}
appData.asking();
appData.getBudget();
appData.getExpensesMonth();
console.log('Сумма расходов за месяц равна ' + appData.expensesMonth);
console.log(appData.getTargetMonth());
appData.getStatusIncome();

for (let key in appData) {
    console.log(key + ' : ' + appData[key]);
}


function getExpensesTxt() {
    let array = new Array(appData.addExpenses.length),
        text;
    for (let i = 0; i < appData.addExpenses.length; i++) {
        let row = appData.addExpenses[i];
        let firstLetter = row.slice(0, 1);
        array[i] = row.replace(firstLetter, firstLetter.toUpperCase());
    }
    return array.join(', ');
}

console.log(getExpensesTxt());

function IsNotOrEmpty(str) {
    if (str === '' || str === null || str === undefined)
        return true;
    else return false;
}

function IsZeroOrNotNumber(isNumber) {
    if (isNumber === 0 || isNumber === null || isNaN(isNumber) || isNumber === undefined)
        return true;
    else return false;
}
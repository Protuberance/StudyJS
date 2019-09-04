let start = document.getElementById('start');

let buttons = document.getElementsByTagName('button');
let incomePlus = buttons[0];
let expensesPlus = buttons[1];

let deposit = document.querySelector('#deposit-check');

let additionalIncomeItem = document.querySelectorAll('.additional_income-item');

let budgetMonthValue = document.querySelector('.budget_month-value'),
    budgetDayValue = document.querySelector('.budget_day-value'),
    expensesMonthValue = document.querySelector('.expenses_month-value'),
    additionalIncomeValue = document.querySelector('.additional_income-value'),
    additionalExpensesValue = document.querySelector('.additional_expenses-value'),
    incomePeriodValue = document.querySelector('.income_period-value'),
    targetMonthValue = document.querySelector('.target_month-value'),

    salaryAmount = document.querySelector('.salary-amount'),
    incomeTitle = document.querySelector('.income-title'),
    expensesTitle = document.querySelector('.expenses-title'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'),
    incomeItems = document.querySelectorAll('.income-items'),
    periodAmount = document.querySelector('.period-amount'),
    cancel = document.querySelector('#cancel');

let appData = {
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    income: {},
    incomeMonth: 0,
    addIncome: [],
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    mission: 5000000,
    expenses: {},
    start: function () {
        appData.budget = +salaryAmount.value;

        appData.getExpenses();
        appData.getIncome();
        appData.getExpensesMonth();
        appData.getAddExpenses();
        appData.getAddIncome();
        appData.getBudget();

        appData.showResult();

        let inputs = document.querySelectorAll('input');
        inputs.forEach(element => {
            if (element.getAttribute('type') === 'text')
                element.setAttribute('disabled', 'true');
        });
        start.setAttribute('style', 'display:none');
        cancel.setAttribute('style', 'display:block');
    },
    showResult: function () {
        budgetMonthValue.value = appData.budgetMonth;
        budgetDayValue.value = appData.budgetDay;
        expensesMonthValue.value = appData.expensesMonth;
        additionalExpensesValue.value = appData.addExpenses.join(', ');
        additionalIncomeValue.value = appData.addIncome.join(', ');
        targetMonthValue.value = appData.getTargetMonth();
        incomePeriodValue.value = appData.calcPeriod();

        periodSelect.addEventListener('change', function (event) {
            incomePeriodValue.value = appData.calcPeriod();
        });
    },
    addExpensesBlock: function () {
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);

        expensesItems = document.querySelectorAll('.expenses-items');
        if (expensesItems.length === 3) {
            expensesPlus.style.display = 'none';
        }
    },
    addIncomeBlock: function () {
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);

        incomeItems = document.querySelectorAll('.income-items');
        if (incomeItems.length === 3) {
            incomePlus.style.display = 'none';
        }
    },
    rangeListener: function (event) {
        periodAmount.textContent = event.target.value;
    },
    getExpenses: function () {
        expensesItems.forEach(function (item) {
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if (itemExpenses !== '' && cashExpenses !== '')
                appData.expenses[itemExpenses] = cashExpenses;
        });
    },
    getIncome: function () {
        incomeItems.forEach(function (item) {
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;
            if (itemIncome !== '' && cashIncome !== '')
                appData.income[itemIncome] = cashIncome;
        });
        for (let key in appData.income) {
            appData.incomeMonth += +appData.income[key];
        }
    },
    getAddExpenses: function () {
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(function (item) {
            item = item.trim();
            if (item !== '')
                appData.addExpenses.push(item);
        });
    },
    getAddIncome: function () {
        additionalIncomeItem.forEach(function (item) {
            let itemValue = item.value.trim();
            if (itemValue !== '')
                appData.addIncome.push(itemValue);
        });
    },
    getExpensesMonth: function () {
        for (let key in appData.expenses) {
            appData.expensesMonth += +appData.expenses[key];
        }
    },
    getBudget: function () {
        appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);
    },
    getTargetMonth: function () {
        appData.period = Math.ceil(targetAmount.value / appData.budgetMonth);
        if (appData.period < 0) {
            return 'Цель не будет достигнута';
        } else
            return 'Вы накопите ' + targetAmount.value + ' за ' + appData.period + ' месяцев';
    },
    getStatusIncome: function () {
        if (appData.budgetDay >= 800)
            console.log('Высокий уровень дохода');
        else if (appData.budgetDay >= 300 && appData.budgetDay < 800)
            console.log('Средний уровень дохода');
        else if (appData.budgetDay > 0 && appData.budgetDay < 300)
            console.log('Низкий уровень дохода');
        else if (appData.budgetDay <= 0)
            console.log('Что то пошло не так');
    },
    getInfoDepost: function () {
        if (appData.deposit) {
            do {
                appData.percentDeposit = prompt('Какой годовой процент?', '10');
                appData.moneyDeposit = prompt('Какая сумма заложена?', '10000');
            }
            while (IsZeroOrNotNumber(appData.percentDeposit) || IsZeroOrNotNumber(appData.moneyDeposit))
        }
    },
    calcPeriod: function () {
        return appData.budgetMonth * periodSelect.value;
    }
};

start.addEventListener('click', appData.start);
expensesPlus.addEventListener('click', appData.addExpensesBlock);
incomePlus.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('change', appData.rangeListener);
salaryAmount.addEventListener('blur', function (event) {
    if (event.target.value !== '')
        start.setAttribute('style', 'display:block');

});

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
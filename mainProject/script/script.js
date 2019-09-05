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
    incomeTitle = document.querySelector('input.income-title'),
    expensesTitle = document.querySelector('input.expenses-title'),
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
        this.budget = +salaryAmount.value;

        this.getExpenses();
        this.getIncome();
        this.getExpensesMonth();
        this.getAddExpenses();
        this.getAddIncome();
        this.getBudget();

        this.showResult();

        let inputs = document.querySelectorAll('.data input');
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
    reset: function () {
        this.budget = 0;
        this.budgetDay = 0;
        this.budgetMonth = 0;
        this.expensesMonth = 0;
        this.income = {};
        this.incomeMonth = 0;
        this.addIncome = [];
        this.addExpenses = [];
        this.deposit = false;
        this.percentDeposit = 0;
        this.moneyDeposit = 0;
        this.mission = 5000000;
        this.expenses = {};


        let inputs = document.querySelectorAll('input');
        inputs.forEach(element => {
            if (element.type === 'text') {
                element.value = '';
                element.removeAttribute('disabled');
            }
            if (element.type === 'range')
                element.value = 1;
        });


        //location.reload();
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
        for (let key in this.income) {
            appData.incomeMonth += +this.income[key];
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
        for (let key in this.expenses) {
            appData.expensesMonth += +this.expenses[key];
        }
    },
    getBudget: function () {
        appData.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
        appData.budgetDay = Math.floor(this.budgetMonth / 30);
    },
    getTargetMonth: function () {
        this.period = Math.ceil(targetAmount.value / this.budgetMonth);
        if (this.period < 0) {
            return 'Цель не будет достигнута';
        } else
            return 'Вы накопите ' + targetAmount.value + ' за ' + this.period + ' месяцев';
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
    calcPeriod: function () {
        return this.budgetMonth * periodSelect.value;
    }
};

start.addEventListener('click', appData.start.bind(appData));
cancel.addEventListener('click', appData.reset.bind(appData));
expensesPlus.addEventListener('click', appData.addExpensesBlock);
incomePlus.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('change', appData.rangeListener);
salaryAmount.addEventListener('blur', function (event) {
    if (event.target.value !== '')
        start.setAttribute('style', 'display:block');
});

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
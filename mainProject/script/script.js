const start = document.getElementById('start'),
    buttons = document.getElementsByTagName('button'),
    incomePlus = buttons[0],
    expensesPlus = buttons[1],
    depositCheck = document.querySelector('#deposit-check'),
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
    budgetMonthValue = document.querySelector('.budget_month-value'),
    budgetDayValue = document.querySelector('.budget_day-value'),
    expensesMonthValue = document.querySelector('.expenses_month-value'),
    additionalIncomeValue = document.querySelector('.additional_income-value'),
    additionalExpensesValue = document.querySelector('.additional_expenses-value'),
    incomePeriodValue = document.querySelector('.income_period-value'),
    targetMonthValue = document.querySelector('.target_month-value'),
    salaryAmount = document.querySelector('.salary-amount'),
    incomeTitle = document.querySelector('input.income-title'),
    expensesTitle = document.querySelector('input.expenses-title'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'),
    periodAmount = document.querySelector('.period-amount'),
    cancel = document.querySelector('#cancel'),
    depositBank = document.querySelector('.deposit-bank'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent');

let expensesItems = document.querySelectorAll('.expenses-items'),
    incomeItems = document.querySelectorAll('.income-items');


//#region AppData
const AppData = function () {
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
};
AppData.prototype.start = function () {
    this.budget = +salaryAmount.value;

    this.getExpenses();
    this.getIncome();
    this.getExpensesMonth();
    this.getInfoDepost();
    this.getBudget();
    this.getAddField(additionalExpensesItem, this.addExpenses, true);
    this.getAddField(additionalIncomeItem, this.addIncome, false);

    this.showResult();

    let inputs = document.querySelectorAll('.data input');
    inputs.forEach(element => {
        if (element.getAttribute('type') === 'text')
            element.setAttribute('disabled', 'true');
    });
    start.setAttribute('style', 'display:none');
    cancel.setAttribute('style', 'display:block');
};
AppData.prototype.showResult = function () {
    let _this = this;
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = this.getTargetMonth();
    incomePeriodValue.value = this.calcPeriod();
    periodSelect.addEventListener('change', function (event) {
        incomePeriodValue.value = _this.calcPeriod();
    });
};
AppData.prototype.reset = function () {
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
    periodAmount.textContent = 1;

    let inputs = document.querySelectorAll('input');
    inputs.forEach(element => {
        if (element.type === 'text') {
            element.value = '';
            element.removeAttribute('disabled');
        }
        if (element.type === 'range')
            element.value = 1;
        if (element.type === 'checkbox')
            element.checked = false;
    });
    start.setAttribute('style', 'display:block');
    cancel.setAttribute('style', 'display:none');
};
AppData.prototype.addBlock = function (items, button) {
    return function () {
        let cloneItem = items[0].cloneNode(true);
        items[0].parentNode.insertBefore(cloneItem, button);

        items = document.querySelectorAll(`.${items[0].classList.item(0)}`);
        if (items.length === 3) {
            button.style.display = 'none';
        }
    };
};
AppData.prototype.rangeListener = function (event) {
    periodAmount.textContent = event.target.value;
};
AppData.prototype.getExpenses = function () {
    expensesItems = document.querySelectorAll('.expenses-items');
    expensesItems.forEach((item) => {
        let itemExpenses = item.querySelector('.expenses-title').value;
        let cashExpenses = item.querySelector('.expenses-amount').value;
        if (itemExpenses !== '' && cashExpenses !== '')
            this.expenses[itemExpenses] = cashExpenses;
    });
};
AppData.prototype.getIncome = function () {
    incomeItems = document.querySelectorAll('.income-items');
    incomeItems.forEach((item) => {
        let itemIncome = item.querySelector('.income-title').value;
        let cashIncome = item.querySelector('.income-amount').value;
        if (itemIncome !== '' && cashIncome !== '')
            this.income[itemIncome] = cashIncome;
    });
    for (let key in this.income) {
        this.incomeMonth += +this.income[key];
    }
};
AppData.prototype.getAddField = function (addedItems, arrayToAdd, toSplit) {
    let items;

    if (toSplit) {
        items = addedItems.value.split(',')
    } else {
        items = addedItems;
    }

    items.forEach((item) => {
        let itemValue = toSplit === true ? item.trim() : item.value.trim();
        if (itemValue !== '')
            arrayToAdd.push(itemValue);
    });
};
AppData.prototype.getExpensesMonth = function () {
    for (let key in this.expenses) {
        this.expensesMonth += +this.expenses[key];
    }
};
AppData.prototype.getBudget = function () {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + (this.moneyDeposit * this.percentDeposit) / 12;
    this.budgetDay = Math.floor(this.budgetMonth / 30);
};
AppData.prototype.getTargetMonth = function () {
    this.period = Math.ceil(targetAmount.value / this.budgetMonth);
    if (this.period < 0) {
        return 'Цель не будет достигнута';
    } else
        return 'Вы накопите ' + targetAmount.value + ' за ' + this.period + ' месяцев';
};
AppData.prototype.getStatusIncome = function () {
    if (this.budgetDay >= 800)
        console.log('Высокий уровень дохода');
    else if (this.budgetDay >= 300 && this.budgetDay < 800)
        console.log('Средний уровень дохода');
    else if (this.budgetDay > 0 && this.budgetDay < 300)
        console.log('Низкий уровень дохода');
    else if (this.budgetDay <= 0)
        console.log('Что то пошло не так');
};
AppData.prototype.getInfoDepost = function () {
    if (this.deposit) {
        this.percentDeposit = depositPercent.value;
        this.moneyDeposit = depositAmount.value;
    }
};
AppData.prototype.calcPeriod = function () {
    return this.budgetMonth * periodSelect.value;
};
AppData.prototype.eventsListeners = function () {
    start.addEventListener('click', this.start.bind(this));
    cancel.addEventListener('click', this.reset.bind(this));
    expensesPlus.addEventListener('click', this.addBlock(expensesItems, expensesPlus));
    incomePlus.addEventListener('click', this.addBlock(incomeItems, incomePlus));
    periodSelect.addEventListener('change', this.rangeListener);
    salaryAmount.addEventListener('keyup', function (event) {
        if (this.value !== '')
            start.removeAttribute('disabled');
        else
            start.setAttribute('disabled', 'true');
    });
};

depositCheck.addEventListener('change', function () {
    if (depositCheck.checked) {
        depositBank.style.display = 'inline-block';
        depositAmount.style.display = 'inline-block';
        appData.deposit = 'true';
        depositBank.addEventListener('change', function () {
            let selectIndex = this.options[this.selectedIndex].value;
            if (selectIndex === 'other') {
                depositPercent.style.display = 'inline-block';
                depositPercent.value = '';
            } else {
                depositPercent.style.display = 'none';
                depositPercent.value = selectIndex;
            }

        });
    } else {
        depositBank.style.display = 'none';
        depositAmount.style.display = 'none';
        depositAmount.value = '';
        appData.deposit = 'false';
    }
});

const appData = new AppData();
appData.eventsListeners();
//#endregion
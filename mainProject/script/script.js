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
};
AppData.prototype.addExpensesBlock = function () {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);

    expensesItems = document.querySelectorAll('.expenses-items');
    if (expensesItems.length === 3) {
        expensesPlus.style.display = 'none';
    }
};
AppData.prototype.addIncomeBlock = function () {
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);

    incomeItems = document.querySelectorAll('.income-items');
    if (incomeItems.length === 3) {
        incomePlus.style.display = 'none';
    }
};
AppData.prototype.rangeListener = function (event) {
    periodAmount.textContent = event.target.value;
};
AppData.prototype.getExpenses = function () {
    let _this = this;
    expensesItems.forEach(function (item) {
        let itemExpenses = item.querySelector('.expenses-title').value;
        let cashExpenses = item.querySelector('.expenses-amount').value;
        if (itemExpenses !== '' && cashExpenses !== '')
            _this.expenses[itemExpenses] = cashExpenses;
    });
};
AppData.prototype.getIncome = function () {
    let _this = this;
    incomeItems.forEach(function (item) {
        let itemIncome = item.querySelector('.income-title').value;
        let cashIncome = item.querySelector('.income-amount').value;
        if (itemIncome !== '' && cashIncome !== '')
            _this.income[itemIncome] = cashIncome;
    });
    for (let key in this.income) {
        this.incomeMonth += +this.income[key];
    }
};
AppData.prototype.getAddExpenses = function () {
    let _this = this;
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach(function (item) {
        item = item.trim();
        if (item !== '')
            _this.addExpenses.push(item);
    });
};
AppData.prototype.getAddIncome = function () {
    let _this = this;
    additionalIncomeItem.forEach(function (item) {
        let itemValue = item.value.trim();
        if (itemValue !== '')
            _this.addIncome.push(itemValue);
    });
};
AppData.prototype.getExpensesMonth = function () {
    for (let key in this.expenses) {
        this.expensesMonth += +this.expenses[key];
    }
};
AppData.prototype.getBudget = function () {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
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
        do {
            this.percentDeposit = prompt('Какой годовой процент?', '10');
            this.moneyDeposit = prompt('Какая сумма заложена?', '10000');
        }
        while (this.IsZeroOrNotNumber(this.percentDeposit) || this.IsZeroOrNotNumber(this.moneyDeposit))
    }
};
AppData.prototype.calcPeriod = function () {
    return this.budgetMonth * periodSelect.value;
};
AppData.prototype.eventsListeners = function () {
    start.addEventListener('click', this.start.bind(this));
    cancel.addEventListener('click', this.reset.bind(this));
    expensesPlus.addEventListener('click', this.addExpensesBlock);
    incomePlus.addEventListener('click', this.addIncomeBlock);
    periodSelect.addEventListener('change', this.rangeListener);
    salaryAmount.addEventListener('blur', function (event) {
        if (event.target.value !== '')
            start.setAttribute('style', 'display:block');
    });
};
AppData.prototype.IsZeroOrNotNumber = function (isNumber) {
    if (isNumber === 0 || isNumber === null || isNaN(isNumber) || isNumber === undefined)
        return true;
    else return false;
};

const appData = new AppData();
appData.eventsListeners();
//#endregion

const DomElement = function (selector, height, width, bg, fontSize) {
    this.selector = selector;
    this.height = height;
    this.width = width;
    this.bg = bg;
    this.fontSize = fontSize;
};
DomElement.prototype.createElement = function () {
    let tagName;
    if (this.selector.substring(0, 1) === '.') {
        tagName = 'div';
    } else if (this.selector.substring(0, 1) === '#') {
        tagName = 'p';
    } else
        console.log('uncorrect selector');
    let styleTxt = 'height:' + this.height + '; width:' + this.width + '; background:' + this.bg + '; font-size:' + this.fontSize + ';';
    let element = document.createElement(tagName);
    element.className = this.selector.substring(1);
    element.style.cssText = styleTxt;
    document.body.append(element);
};

const domElement = new DomElement('#newClass', '100px', '100px', 'red', '16px');
console.log(domElement);
domElement.createElement();